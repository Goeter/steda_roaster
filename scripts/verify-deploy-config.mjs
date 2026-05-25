import { readFileSync, existsSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const npmrc = existsSync('.npmrc') ? readFileSync('.npmrc', 'utf8') : '';
const vercelJson = existsSync('vercel.json') ? JSON.parse(readFileSync('vercel.json', 'utf8')) : null;

console.log('Deploy config check:');
console.log(`- package: ${packageJson.name}@${packageJson.version}`);
console.log(`- engines.node: ${packageJson.engines?.node ?? 'not set; Vercel Project Settings will apply'}`);
console.log(`- .npmrc registry: ${npmrc.includes('registry=https://registry.npmjs.org/') ? 'registry.npmjs.org' : 'missing/changed'}`);
console.log(`- vercel installCommand: ${vercelJson?.installCommand ?? 'missing'}`);
