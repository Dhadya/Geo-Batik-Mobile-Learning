const fs = require('fs');

fs.writeFileSync('.husky/pre-commit', `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`, 'utf8');

fs.writeFileSync('.husky/pre-push', `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint && npx tsc --noEmit && npm run build
`, 'utf8');

console.log('done');