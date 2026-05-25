import '@grizzshutsdown/simpleplayer';
import simplePlayerPackage from '../package.json';

const version = document.querySelector('[data-simpleplayer-version]');

if (version) {
  version.textContent = `v${simplePlayerPackage.version}`;
}
