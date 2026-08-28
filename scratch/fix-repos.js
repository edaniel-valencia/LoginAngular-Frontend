const fs = require('fs');
const path = require('path');

const backendSrcDir = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src';

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
  let originalContent = content;

  // strip include: { company: true }
  content = content.replace(/company:\s*true,?\s*/g, '');
  
  // strip company: { connect: ... }
  content = content.replace(/company:\s*rest\.edxCompanyId\s*\?[^:]+:\s*undefined,?\s*/g, '');

  if (content !== originalContent) {
    console.log('Fixed:', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

try {
  processDirectory(backendSrcDir);
  console.log('Deep repository cleanup completed!');
} catch(e) {
  console.error(e);
}
