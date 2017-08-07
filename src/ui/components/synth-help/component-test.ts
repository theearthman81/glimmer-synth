import Component from '@glimmer/component';
import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: synth-help', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    await this.render(hbs`<synth-help />`);

    assert.ok(this.containerElement.querySelector('.synth-help'));

    assert.ok(this.containerElement.querySelector('.synth-help__content'));
  });
});
