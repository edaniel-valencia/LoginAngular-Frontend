const fs = require('fs');
const supportPath = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src/modules/support/support.service.ts';
let support = fs.readFileSync(supportPath, 'utf8');

support = support.replace('where.user = { edxCompanyId: companyId };', 'where.user = {};');
support = support.replace('include: { user: { select: { edxCompanyId: true } } }', '');
support = support.replace('if (isSupportUser && companyId && ticket.user?.edxCompanyId !== companyId)', 'if (false)');
support = support.replace(/\(ticket\.user as any\)\?\.edxCompanyId/g, 'undefined');

fs.writeFileSync(supportPath, support, 'utf8');
console.log('Fixed support.service.ts safely');
