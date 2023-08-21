import AudioBufferMock from './AudioBufferMock';
import ConvolverNodeMock from './ConvolverNodeMock';

class BaseAudioContextMock {
  createBuffer() {
    return new AudioBufferMock();
  }

  createConvolver() {
    return new ConvolverNodeMock();
  }
}

export default BaseAudioContextMock;
