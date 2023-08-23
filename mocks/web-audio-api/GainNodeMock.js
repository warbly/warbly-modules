import AudioNodeMock from './AudioNodeMock';
import AudioParamMock from './AudioParamMock';

class GainNodeMock extends AudioNodeMock {
  get gain() {
    return new AudioParamMock();
  }
}

export default GainNodeMock;
