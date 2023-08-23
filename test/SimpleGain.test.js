import SimpleGain from '../src/SimpleGain';
import AudioContextMock from '../mocks/web-audio-api/AudioContextMock';
import AudioNodeMock from '../mocks/web-audio-api/AudioNodeMock';
import AudioParamMock from '../mocks/web-audio-api/AudioParamMock';
import GainNodeMock from '../mocks/web-audio-api/GainNodeMock';

jest.mock('../mocks/web-audio-api/AudioContextMock');
jest.mock('../mocks/web-audio-api/AudioNodeMock');
jest.mock('../mocks/web-audio-api/AudioParamMock');
jest.mock('../mocks/web-audio-api/GainNodeMock');

describe('SimpleEnvelope', () => {
  let audioContext;
  let simpleGain;

  beforeEach(() => {
    audioContext = new AudioContextMock();
    const gainNodeMock = new GainNodeMock();
    const audioParamMock = new AudioParamMock();

    // TODO: Set up manual mocks correctly
    // https://jestjs.io/docs/manual-mocks
    // Then replace `Object.defineProperty` with `jest.spyOn`
    Object.defineProperty(gainNodeMock, 'gain', {
      get: jest.fn().mockReturnValue(audioParamMock),
    });
    // jest.spyOn(gainNodeMock, 'gain', 'get').mockReturnValue(audioParamMock);

    audioContext.createGain.mockReturnValue(gainNodeMock);
    simpleGain = new SimpleGain(audioContext);
  });

  describe('options', () => {
    it('can be initialized with a gain option', () => {
      const parameter = 'gain';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleGain(audioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });
  });

  describe('.input', () => {
    const property = 'input';

    it('should have property', () => {
      expect(simpleGain).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleGain[property]).toBeDefined();
    });

    it('should be an instance of a Web Audio GainNode', () => {
      expect(simpleGain[property]).toBeInstanceOf(GainNodeMock);
    });
  });

  describe('.output', () => {
    const property = 'output';

    it('should have property', () => {
      expect(simpleGain).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleGain[property]).toBeDefined();
    });

    it('should be an instance of a Web Audio GainNode', () => {
      expect(simpleGain[property]).toBeInstanceOf(GainNodeMock);
    });
  });

  describe('.gain', () => {
    const property = 'gain';

    it('should have property', () => {
      expect(simpleGain).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleGain[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 0.5;
      simpleGain[property] = value;
      expect(simpleGain[property]).toBe(value);
    });
  });

  describe('.connect()', () => {
    it('should have method', () => {
      const property = 'connect';
      expect(simpleGain).toHaveProperty(property);
      expect(typeof simpleGain[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const audioNode = new AudioNodeMock();
      expect(simpleGain.connect(audioNode)).toBeUndefined();
    });

    it('should call `.connect` on the ouput audio node', () => {
      const audioNode = new AudioNodeMock();
      simpleGain.connect(audioNode);
      expect(simpleGain.output.connect).toHaveBeenCalled();
    });
  });

  describe('.disconnect()', () => {
    it('should have method', () => {
      const property = 'disconnect';
      expect(simpleGain).toHaveProperty(property);
      expect(typeof simpleGain[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const node = new AudioNodeMock();
      expect(simpleGain.disconnect(node)).toBeUndefined();
    });

    it('should call `.disconnect` on the ouput audio node', () => {
      const audioNode = new AudioNodeMock();
      simpleGain.disconnect(audioNode);
      expect(simpleGain.output.disconnect).toHaveBeenCalled();
    });
  });
});
