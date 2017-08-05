import _if from './helper';

const { module, test } = QUnit;

module('Helper: if', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(_if([]), undefined);

    assert.equal(_if([true, 'foo', 'bar']), 'foo');

    assert.equal(_if([false, 'foo', 'bar']), 'bar');
  });
});
