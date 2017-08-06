import Component from '@glimmer/component';
import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: synth-volume', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function(assert) {
    await this.render(hbs`<synth-volume @volume=0 />`);

    assert.ok(this.containerElement.querySelector('.synth-volume'));

    assert.ok(this.containerElement.querySelector('.synth-volume__ctrl'));

    assert.equal(
      this.containerElement
        .querySelector('.synth-volume__ctrl')
        .style.transform.match(/[0-9]+/)[0],
      '0'
    );

    assert.equal(
      this.containerElement.querySelectorAll('.synth-volume__tick').length,
      11
    );

    [...Array(11).keys()].forEach(n =>
      assert.equal(
        this.containerElement.querySelector(
          `.synth-volume__tick:nth-child(${n + 1})`
        ).title,
        `${n}`
      )
    );
  });

  test('it rotates volume dial correctly', async function(assert) {
    await this.render(hbs`<synth-volume @volume=2 />`);

    assert.equal(
      parseInt(
        this.containerElement
          .querySelector('.synth-volume__ctrl')
          .style.transform.match(/[0-9]+/)[0],
        10
      ),
      60
    );
  });

  test('it does not rotate volume dial beyond max value', async function(
    assert
  ) {
    await this.render(hbs`<synth-volume @volume=100 />`);

    assert.equal(
      parseInt(
        this.containerElement
          .querySelector('.synth-volume__ctrl')
          .style.transform.match(/[0-9]+/)[0],
        10
      ),
      300
    );
  });
});
