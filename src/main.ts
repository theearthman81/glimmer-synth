/* tslint:disable: no-console */
import Application from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import moduleMap from '../config/module-map';
import resolverConfiguration from '../config/resolver-configuration';

export default class App extends Application {
  constructor() {
    const moduleRegistry = new BasicModuleRegistry(moduleMap);
    const resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      resolver,
      rootName: resolverConfiguration.app.rootName,
    });
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(({ scope }) => {
        console.log(`ServiceWorker success: ${scope}`);
      })
      .catch(err => {
        console.log(`ServiceWorker failed: ${err}`);
      });
  });
}
