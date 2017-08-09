/* tslint:disable: no-console */
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(
      `component-manager:/${app.rootName}/component-managers/main`,
      ComponentManager
    );
  },
});

app.renderComponent('synth-app', containerElement, null);

app.boot();

console.log(
  `%cWelcome To GLMR Synth!
%c
 _______________________________________'
| GLMR-SYNTH  |...  .       |           |
|  :::        |... ....  .  |           |
|  :::        |.............|           |
|_______________________________________|
|  |█| |█|  |  |█| |█| |█|  |  |█| |█|  |
|  |█| |█|  |  |█| |█| |█|  |  |█| |█|  |
|  |█| |█|  |  |█| |█| |█|  |  |█| |█|  |
|   |   |   |   |   |   |   |   |   |   |
|___|___|___|___|___|___|___|___|___|___|
`,
  'color: #222; text-shadow: 1px 1px 1px #bada55;',
  'background: #222; color: #bada55'
);
