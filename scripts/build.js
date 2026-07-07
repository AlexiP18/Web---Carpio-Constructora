import { execSync } from 'child_process';

const isNetlify = process.env.NETLIFY === 'true';

// Si está en Netlify, compila en modo Cloud. Si está en local, compila en modo local.
const cmd = isNetlify
  ? 'npx tinacms build --skip-cloud-checks && npx astro build'
  : 'npx tinacms build --local --skip-indexing --skip-cloud-checks && npx astro build';

console.log(`[Build Script] Detectado Netlify: ${isNetlify}`);
console.log(`[Build Script] Ejecutando: ${cmd}`);

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (error) {
  console.error('[Build Script] Error durante la compilación:', error);
  process.exit(1);
}
