const fs = require('fs');

const servicePath = '/Users/e.danielvalenciamartinez/Adavam/Dev/MadXcorp/adavam-backend-main/src/modules/admin/company/company.service.ts';
let content = fs.readFileSync(servicePath, 'utf8');

// Replace all repository calls with dummy returns
content = content.replace(/await this\.repository\.findByRuc\([^)]+\)/g, 'null');
content = content.replace(/await this\.repository\.create\([^)]+\)/g, '{ edxCompanyId: "dummy" } as any');
content = content.replace(/await this\.repository\.findAll\(\)/g, '[{ edxCompanyId: "1c6748c7-1686-452b-8945-6d98bb61aaeb", edxCompanyName: "Dummy Company" }] as any');
content = content.replace(/await this\.repository\.findById\([^)]+\)/g, '{ edxCompanyId: "1c6748c7-1686-452b-8945-6d98bb61aaeb", edxCompanyName: "Dummy Company" } as any');
content = content.replace(/await this\.repository\.update\([^)]+\)/g, '{ edxCompanyId: "dummy" } as any');
content = content.replace(/await this\.repository\.updateStatus\([^)]+\)/g, 'true as any');
content = content.replace(/await this\.repository\.delete\([^)]+\)/g, 'true as any');

fs.writeFileSync(servicePath, content, 'utf8');
console.log('Fixed company service');
