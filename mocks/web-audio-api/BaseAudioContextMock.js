import AudioBufferMock from './AudioBufferMock';
import ConvolverNodeMock from './ConvolverNodeMock';
import GainNodeMock from './GainNodeMock';

class BaseAudioContextMock {
  createBuffer() {
    return new AudioBufferMock();
  }

  createConvolver() {
    return new ConvolverNodeMock();
  }

  createGain() {
    return new GainNodeMock();
  }
}

export default BaseAudioContextMock;
