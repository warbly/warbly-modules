import MockAudioBuffer from './MockAudioBuffer';
import MockConvolverNode from './MockConvolverNode';
import MockGainNode from './MockGainNode';
import MockOscillatorNode from './MockOscillatorNode';

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

  createOscillator() {
    return new MockOscillatorNode();
  }
}

export default MockBaseAudioContext;
