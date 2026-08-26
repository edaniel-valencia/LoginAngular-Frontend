const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isProduction = process.argv[2] === 'production';

const envFile = `export const environments = {
  production: ${isProduction},
  endpoint: '${process.env['API_ENDPOINT'] || 'http://localhost:3001/'}'
};
`;

const targetPath = path.join(
  __dirname,
  '..',
  'src',
  'environments',
  isProduction ? 'environment.ts' : 'environment.development.ts'
);

fs.writeFileSync(targetPath, envFile);
console.log(`Environment generado en ${targetPath}`);
