import SimpleGain from '../src/SimpleGain';
import MockAudioContext from '../mocks/web-audio-api/MockAudioContext';
import MockAudioNode from '../mocks/web-audio-api/MockAudioNode';
import MockAudioParam from '../mocks/web-audio-api/MockAudioParam';
import MockGainNode from '../mocks/web-audio-api/MockGainNode';

jest.mock('../mocks/web-audio-api/MockAudioContext');
jest.mock('../mocks/web-audio-api/MockAudioNode');
jest.mock('../mocks/web-audio-api/MockAudioParam');
jest.mock('../mocks/web-audio-api/MockGainNode');

describe('SimpleEnvelope', () => {
  let mockAudioContext;
  let simpleGain;

  beforeEach(() => {
    mockAudioContext = new MockAudioContext();
    const mockGainNode = new MockGainNode();
    const mockAudioParam = new MockAudioParam();

    // TODO: Set up manual mocks correctly
    // https://jestjs.io/docs/manual-mocks
    // Then replace `Object.defineProperty` with `jest.spyOn`
    Object.defineProperty(mockGainNode, 'gain', {
      get: jest.fn().mockReturnValue(mockAudioParam),
    });
    // jest.spyOn(gainNodeMock, 'gain', 'get').mockReturnValue(audioParamMock);

    mockAudioContext.createGain.mockReturnValue(mockGainNode);
    simpleGain = new SimpleGain(mockAudioContext);
  });

  describe('options', () => {
    it('can be initialized with a gain option', () => {
      const parameter = 'gain';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleGain(mockAudioContext, options);
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
      expect(simpleGain[property]).toBeInstanceOf(MockGainNode);
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
      expect(simpleGain[property]).toBeInstanceOf(MockGainNode);
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
      const mockAudioNode = new MockAudioNode();
      expect(simpleGain.connect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.connect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleGain.connect(mockAudioNode);
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
      const mockAudioNode = new MockAudioNode();
      expect(simpleGain.disconnect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.disconnect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleGain.disconnect(mockAudioNode);
      expect(simpleGain.output.disconnect).toHaveBeenCalled();
    });
  });
});
