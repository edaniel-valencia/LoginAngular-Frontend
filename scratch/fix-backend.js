const fs = require('fs');
const path = require('path');

const backendSrcDir = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src';

const regexReplacements = [
  // Remove edxCompanyId from where clauses and selects
  { rx: /edxCompanyId\s*:\s*[a-zA-Z0-9_?.!]+,?/g, replacement: '' },
  { rx: /edxCompanyId\s*=\s*[a-zA-Z0-9_?.!]+;?/g, replacement: '' },
  { rx: /\bcompanyId\s*:\s*user\.edxCompanyId,?/g, replacement: 'companyId: null,' },
  // Remove company includes and selects
  { rx: /company\s*:\s*true,?/g, replacement: '' },
  { rx: /companyName\s*:\s*[^,]+,/g, replacement: 'companyName: null,' },
  { rx: /companyLogo\s*:\s*[^,]+,/g, replacement: 'companyLogo: null,' },
  { rx: /\bcompanyId\b/g, replacement: 'null' }, // DANGEROUS, let's limit it
  // More specific ones
  { rx: /where\.user\s*=\s*\{\s*\};/g, replacement: '' }, // cleanup empty where.user
  { rx: /\.\.\.\(companyId\s*\?\s*\{\s*\}\s*:\s*\{\}\)/g, replacement: '' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Manual cleanup based on previous grep
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Auth Service specific
    if (filePath.includes('auth.service.ts')) {
      if (line.includes('company: true')) { changed = true; continue; }
      if (line.includes('companyId: user.edxCompanyId')) { line = 'companyId: null,'; changed = true; }
      if (line.includes('companyName: user.company?.edxCompanyName')) { line = 'companyName: null,'; changed = true; }
      if (line.includes('companyLogo: user.company?.edxCompanyLogo')) { line = 'companyLogo: null,'; changed = true; }
      if (line.includes('companyId: user.companyId')) { line = 'companyId: null,'; changed = true; }
    }
    
    // Support Service specific
    if (filePath.includes('support.service.ts')) {
      if (line.includes('where.user = { edxCompanyId: companyId };')) { changed = true; continue; }
      if (line.includes('edxCompanyId: true')) { changed = true; continue; }
      if (line.includes('ticket.user?.edxCompanyId !== companyId')) { line = line.replace('ticket.user?.edxCompanyId !== companyId', 'false'); changed = true; }
      if (line.includes('(ticket.user as any)?.edxCompanyId')) { line = line.replace('(ticket.user as any)?.edxCompanyId', 'null'); changed = true; }
    }

    // Contacts Service specific
    if (filePath.includes('contacts.service.ts')) {
      if (line.includes('edxCompanyId: companyId')) { changed = true; continue; }
      if (line.includes('where.edxCompanyId = companyId')) { changed = true; continue; }
      if (line.includes('userWhere.edxCompanyId = companyId')) { changed = true; continue; }
      if (line.includes('company: true')) { changed = true; continue; }
    }

    // Campaigns Service specific
    if (filePath.includes('campaigns.service.ts')) {
      if (line.includes('edxCompanyId: companyId')) { changed = true; continue; }
      if (line.includes('where.edxCompanyId = companyId')) { changed = true; continue; }
      if (line.includes('company: true')) { changed = true; continue; }
      if (line.includes('campaign.edxCompanyId!')) { line = line.replace(/campaign\.edxCompanyId!/g, '"dummy-company"'); changed = true; }
      if (line.includes('campaignData.edxCompanyId')) { line = line.replace('campaignData.edxCompanyId', 'null'); changed = true; }
      if (line.includes('campaignAny.edxCompanyId')) { line = line.replace('campaignAny.edxCompanyId', 'null'); changed = true; }
    }
    
    // Whatsapp service
    if (filePath.includes('whatsapp.service.ts')) {
      // keep it as is, we just replaced the arguments with dummy strings
    }
    
    // Popups service (if exists)
    if (filePath.includes('popups.service.ts')) {
      if (line.includes('edxCompanyId: companyId')) { changed = true; continue; }
      if (line.includes('where.edxCompanyId = companyId')) { changed = true; continue; }
    }
    
    // Banners service (if exists)
    if (filePath.includes('banners.service.ts') || filePath.includes('banner.service.ts')) {
      if (line.includes('edxCompanyId: companyId')) { changed = true; continue; }
      if (line.includes('where.edxCompanyId = companyId')) { changed = true; continue; }
    }

    newLines.push(line);
  }
  
  content = newLines.join('\n');
  
  if (changed) {
    console.log('Fixed:', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

try {
  processDirectory(backendSrcDir);
  console.log('Cleanup completed!');
} catch(e) {
  console.error(e);
}
