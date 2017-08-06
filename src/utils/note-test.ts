import sinon from 'sinon';
import { Note } from './note';

const { module, test } = QUnit;
// const mockOscillator = () => ({
//   type: '',
//   detune: {
//     value: 0,
//   },
//   frequency: {
//     value: 0,
//   },
//   connect: sinon.spy(),
//   disconnect: sinon.spy(),
//   start: sinon.spy(),
//   stop: sinon.spy(),
// });

module('Util: Note', function(hook) {
  test('it can be created', function(assert) {
    const context: AudioContext = new AudioContext();
    const gain: GainNode = context.createGain();
    const note: Note = new Note('c', 4, context, gain);

    assert.equal(note.isPlaying, false);
    assert.equal(note.context, context);
    assert.equal(note.destination, gain);
    assert.equal(Math.floor(note.frequency), 261);
  });

  // test('it can start note', function(assert) {
  //   const context: AudioContext = new AudioContext();
  //   const gain: GainNode =  context.createGain();
  //   const note: Note = new Note('c', 4, context, gain);
  //   const primaryMock = mockOscillator();
  //   const secondaryMock = mockOscillator();
  //
  //   context.createOscillator = sinon.stub()
  //     .onFirstCall().returns(primaryMock)
  //     .onSecondCall().returns(secondaryMock);
  //
  //   note.start();
  //
  //   assert.equal(note.isPlaying, true);
  //   assert.equal(note.primary, primaryMock);
  //   assert.equal(note.secondary, secondaryMock);
  //
  //   assert.equal(context.createOscillator.callCount, 2);
  //
  //   assert.equal(primaryMock.type, 'sawtooth');
  //   assert.equal(primaryMock.detune.value, -4);
  //   assert.equal(Math.floor(primaryMock.frequency.value), 261);
  //   assert.ok(primaryMock.connect.calledWith(gain));
  //   assert.ok(primaryMock.start.calledWith(0));
  //
  //   assert.equal(secondaryMock.type, 'triangle');
  //   assert.equal(secondaryMock.detune.value, -4);
  //   assert.equal(Math.floor(secondaryMock.frequency.value), 261);
  //   assert.ok(secondaryMock.connect.calledWith(gain));
  //   assert.ok(secondaryMock.start.calledWith(0));
  // });

  // test('it can stop note', function(assert) {
  //   const context: AudioContext = new AudioContext();
  //   const gain: GainNode =  context.createGain();
  //   const note: Note = new Note('c', 4, context, gain);
  //   const primaryMock = mockOscillator();
  //   const secondaryMock = mockOscillator();
  //
  //   note.isPlaying = true;
  //   note.primary = primaryMock;
  //   note.secondary = secondaryMock;
  //
  //   note.stop();
  //
  //   assert.equal(note.isPlaying, false);
  //   assert.equal(note.primary, null);
  //   assert.equal(note.secondary, null);
  //
  //   assert.ok(primaryMock.stop.calledWith(0));
  //   assert.equal(primaryMock.disconnect.callCount, 1);
  //
  //   assert.ok(secondaryMock.stop.calledWith(0));
  //   assert.equal(secondaryMock.disconnect.callCount, 1);
  // });
});
