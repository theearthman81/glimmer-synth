import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';
import Component from '@glimmer/component';

const { module, test } = QUnit;

module('Component: synth-app', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    await this.render(
      hbs`<synth-app />`
    );

    assert.ok(
      this.containerElement.querySelector('.synth')
    );

    assert.ok(
      this.containerElement.querySelector('.synth__ctrl-wrapper')
    );

    assert.ok(
      this.containerElement.querySelector('.synth__keyboard-wrapper')
    );
  });
});
