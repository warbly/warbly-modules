import MockAudioNode from './MockAudioNode';
import MockAudioParam from './MockAudioParam';

class MockGainNode extends MockAudioNode {
  get gain() {
    return new MockAudioParam();
  }
}

export default MockGainNode;
