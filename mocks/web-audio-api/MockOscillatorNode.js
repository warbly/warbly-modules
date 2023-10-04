import MockAudioNode from './MockAudioNode';
import MockAudioParam from './MockAudioParam';

class MockOscillatorNode extends MockAudioNode {
  get frequency() {
    return new MockAudioParam();
  }

  set frequency(value) {}

  start() {}

  stop() {}
}

export default MockOscillatorNode;
