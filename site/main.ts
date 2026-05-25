import '@grizzshutsdown/simpleplayer';
import simplePlayerPackage from './node_modules/@grizzshutsdown/simpleplayer/package.json';

const version = document.querySelector('[data-simpleplayer-version]');

if (version) {
  version.textContent = `v${simplePlayerPackage.version}`;
}
