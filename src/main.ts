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
