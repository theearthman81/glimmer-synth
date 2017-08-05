import _concat from './helper';

const { module, test } = QUnit;

module('Helper: concat', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(_concat([]), '');

    assert.equal(_concat(['foo', 'bar']), 'foobar');
  });
});
