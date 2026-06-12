import { existsSync, readFileSync } from 'node:fs';

function readJson(filename) {
  return JSON.parse(readFileSync(filename, 'utf8'));
}

const packageJson = readJson('package.json');
const npmrc = existsSync('.npmrc') ? readFileSync('.npmrc', 'utf8') : '';
const vercelJson = existsSync('vercel.json') ? readJson('vercel.json') : null;
const envExample = existsSync('.env.example') ? readFileSync('.env.example', 'utf8') : '';

const checks = [
  {
    label: 'engines.node',
    value: packageJson.engines?.node ?? 'missing',
    ok: typeof packageJson.engines?.node === 'string' && packageJson.engines.node.includes('20'),
  },
  {
    label: '.npmrc registry',
    value: npmrc.includes('registry=https://registry.npmjs.org/')
      ? 'registry.npmjs.org'
      : 'missing/changed',
    ok: npmrc.includes('registry=https://registry.npmjs.org/'),
  },
  {
    label: 'package-lock.json',
    value: existsSync('package-lock.json') ? 'present' : 'missing',
    ok: existsSync('package-lock.json'),
  },
  {
    label: 'vercel framework',
    value: vercelJson?.framework ?? 'missing',
    ok: vercelJson?.framework === 'nextjs',
  },
  {
    label: 'vercel installCommand',
    value: vercelJson?.installCommand ?? 'missing',
    ok: typeof vercelJson?.installCommand === 'string' && vercelJson.installCommand.startsWith('npm ci'),
  },
  {
    label: 'vercel buildCommand',
    value: vercelJson?.buildCommand ?? 'missing',
    ok: vercelJson?.buildCommand === 'npm run build',
  },
  {
    label: '.env.example secret',
    value: envExample.includes('CMS_REVALIDATE_SECRET=replace-with-')
      ? 'safe placeholder'
      : 'review required',
    ok: envExample.includes('CMS_REVALIDATE_SECRET=replace-with-'),
  },
];

console.log('Deploy config check:');
console.log(`- package: ${packageJson.name}@${packageJson.version}`);

for (const check of checks) {
  console.log(`- ${check.label}: ${check.value}${check.ok ? '' : ' [FAIL]'}`);
}

const failedChecks = checks.filter((check) => !check.ok);
if (failedChecks.length > 0) {
  console.error(`\nDeploy config is invalid: ${failedChecks.map((check) => check.label).join(', ')}`);
  process.exit(1);
}

console.log('\nDeploy config is valid.');
