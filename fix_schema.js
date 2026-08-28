const fs = require('fs');
let content = fs.readFileSync('scratch_schema.prisma', 'utf8');

// Remove EdxCompany model
content = content.replace(/model EdxCompany \{[\s\S]*?\n\}/g, '');

// Remove fields referencing EdxCompany
content = content.replace(/.*edxCompanyId.*@map\("edx_company_id"\).*\n/g, '');
content = content.replace(/.*company\s+EdxCompany\?.*\n/g, '');
content = content.replace(/.*@@unique\(\[.*edxCompanyId.*\].*\n/g, '');
content = content.replace(/.*companies\s+EdxCompany\[\].*\n/g, '');

fs.writeFileSync('scratch_schema.prisma', content);
