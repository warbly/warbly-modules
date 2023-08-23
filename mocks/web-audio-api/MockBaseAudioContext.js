import MockAudioBuffer from './MockAudioBuffer';
import MockConvolverNode from './MockConvolverNode';
import MockGainNode from './MockGainNode';

class MockBaseAudioContext {
  createBuffer() {
    return new MockAudioBuffer();
  }

  createConvolver() {
    return new MockConvolverNode();
  }

  createGain() {
    return new MockGainNode();
  }
}

export default MockBaseAudioContext;
