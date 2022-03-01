#!/usr/bin/env node

/**
 * This script simply checks whether the version we are releasing is either the first NPM version for any new major version or
 * a beta version. For both, we do not want to run backward compatibility checks since both will have backward in-compatible breaking changes.
 * 
 * For e.g: 3.0.0, 3.0.0-beta.0, 4.0.0 and so on.
 */

 const { logger, spawnOrFail, path } = require('./cli-utils');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const versionToRelease = require('../package.json').version;
logger.log('Building package...');
spawnOrFail('npm', ['run build']);
logger.log('Packaging ...');
spawnOrFail('npm', ['pack']);
const prevRelease = spawnOrFail('npm', ['view amazon-chime-sdk-js@latest version']);
logger.log(`Previous release is: ${prevRelease}`);

logger.log(`Git checking out tags/v${prevRelease}`);
spawnOrFail('git', [`checkout tags/v${prevReleaseBranch}`]);
logger.log(`changing directory into demos/browser`);
process.chdir(path.join(__dirname, '../demos/browser'));
spawnOrFail('npm', ['uninstall amazon-chime-sdk-js']);
spawnOrFail('npm', [`install ../../amazon-chime-sdk-js-${versionToRelease}`]);
