const fs = require('fs');
const dashboardPath = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src/modules/admin/dashboard/dashboard.service.ts';
let content = fs.readFileSync(dashboardPath, 'utf8');

content = content.replace(/company:\s*true,?\s*/g, '');
content = content.replace(/edxCompanyId:\s*[a-zA-Z0-9_?.!]+,?\s*/g, '');
content = content.replace(/where\.edxCompanyId\s*=\s*[a-zA-Z0-9_?.!]+;?\s*/g, '');

fs.writeFileSync(dashboardPath, content, 'utf8');
console.log('Fixed dashboard.service.ts');
