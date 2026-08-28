const fs = require('fs');

const authPath = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src/modules/auth/auth.service.ts';
let auth = fs.readFileSync(authPath, 'utf8');

auth = auth.replace('company: true,', '');
auth = auth.replace('companyId: user.edxCompanyId,', 'companyId: null,');
auth = auth.replace('companyName: user.company?.edxCompanyName || null,', 'companyName: null,');
auth = auth.replace('companyLogo: user.company?.edxCompanyLogo || user.company?.edxCompanyIconDay || null,', 'companyLogo: null,');
fs.writeFileSync(authPath, auth, 'utf8');


const userPath = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src/modules/admin/user/user.service.ts';
let user = fs.readFileSync(userPath, 'utf8');

user = user.replace('if (companyId) where.edxCompanyId = companyId;', '');
user = user.replace('else if (params.edxCompanyId) where.edxCompanyId = params.edxCompanyId;', '');
user = user.replace('if (companyId && user.edxCompanyId && user.edxCompanyId !== companyId)', 'if (false)');

fs.writeFileSync(userPath, user, 'utf8');

console.log('Fixed syntax safely');
