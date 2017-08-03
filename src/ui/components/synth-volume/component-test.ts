import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';
import Component from '@glimmer/component';
import sinon from 'sinon';

const { module, test } = QUnit;

class WrapperComponent extends Component {
  myAction() {
  }
}

module('Component: synth-volume', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    await this.render(
      hbs`<synth-volume @volume=0 />`
    );
    assert.ok(
      this.containerElement.querySelector('.synth-volume')
    );

    assert.ok(
      this.containerElement.querySelector('.synth-volume__ctrl')
    );

    assert.equal(
      this.containerElement.querySelectorAll('.synth-volume__tick').length,
      11
    );

    [...Array(11).keys()].forEach((n) =>
      assert.equal(
        this.containerElement.querySelector(`.synth-volume__tick:nth-child(${n + 1})`).title,
        `${n}`
      )
    );
  });
});
