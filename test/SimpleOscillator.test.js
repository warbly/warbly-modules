import SimpleOscillator from '../src/SimpleOscillator';
import MockAudioContext from '../mocks/web-audio-api/MockAudioContext';
import MockAudioNode from '../mocks/web-audio-api/MockAudioNode';
import MockAudioParam from '../mocks/web-audio-api/MockAudioParam';
import MockOscillatorNode from '../mocks/web-audio-api/MockOscillatorNode';

jest.mock('../mocks/web-audio-api/MockAudioContext');
jest.mock('../mocks/web-audio-api/MockAudioNode');
jest.mock('../mocks/web-audio-api/MockAudioParam');
jest.mock('../mocks/web-audio-api/MockOscillatorNode');

describe('SimpleOscillator', () => {
  let mockAudioContext;
  let simpleOscillator;

  beforeEach(() => {
    mockAudioContext = new MockAudioContext();
    const mockOscillatorNode = new MockOscillatorNode();
    const mockAudioParam = new MockAudioParam();

    Object.defineProperty(mockOscillatorNode, 'detune', {
      get: jest.fn().mockReturnValue(mockAudioParam),
    });
    Object.defineProperty(mockOscillatorNode, 'frequency', {
      get: jest.fn().mockReturnValue(mockAudioParam),
      set: jest.fn().mockReturnValue(mockAudioParam),
    });
    Object.defineProperty(mockOscillatorNode, 'type', {
      set: jest.fn().mockReturnValue(String),
    });

    mockAudioContext.createOscillator.mockReturnValue(mockOscillatorNode);
    simpleOscillator = new SimpleOscillator(mockAudioContext);
    simpleOscillator.output.frequency = new MockAudioParam();
  });

  describe('options', () => {
    it('can be initialized with a detune option', () => {
      const parameter = 'detune';
      const options = {
        [parameter]: 10,
      };
      const instance = new SimpleOscillator(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with a frequency option', () => {
      const parameter = 'frequency';
      const options = {
        [parameter]: 1000,
      };
      const instance = new SimpleOscillator(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with a type option', () => {
      const parameter = 'type';
      const options = {
        [parameter]: 'square',
      };
      const instance = new SimpleOscillator(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });
  });

  describe('.output', () => {
    const property = 'output';

    it('should have property', () => {
      expect(simpleOscillator).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleOscillator[property]).toBeDefined();
    });

    it('should be an instance of a Web Audio OscillatorNode', () => {
      expect(simpleOscillator[property]).toBeInstanceOf(MockOscillatorNode);
    });
  });

  describe('.detune', () => {
    const property = 'detune';

    it('should have property', () => {
      expect(simpleOscillator).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleOscillator[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 5.0;
      simpleOscillator[property] = value;
      expect(simpleOscillator[property]).toBe(value);
    });
  });

  describe('.frequency', () => {
    const property = 'frequency';

    it('should have property', () => {
      expect(simpleOscillator).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleOscillator[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleOscillator[property] = value;
      expect(simpleOscillator[property]).toBe(value);
    });
  });

  describe('.type', () => {
    const property = 'type';

    it('should have property', () => {
      expect(simpleOscillator).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleOscillator[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 'square';
      simpleOscillator[property] = value;
      expect(simpleOscillator[property]).toBe(value);
    });
  });

  describe('.connect()', () => {
    it('should have method', () => {
      const property = 'connect';
      expect(simpleOscillator).toHaveProperty(property);
      expect(typeof simpleOscillator[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleOscillator.connect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.connect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleOscillator.connect(mockAudioNode);
      expect(simpleOscillator.output.connect).toHaveBeenCalled();
    });
  });

  describe('.disconnect()', () => {
    it('should have method', () => {
      const property = 'disconnect';
      expect(simpleOscillator).toHaveProperty(property);
      expect(typeof simpleOscillator[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleOscillator.disconnect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.disconnect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleOscillator.disconnect(mockAudioNode);
      expect(simpleOscillator.output.disconnect).toHaveBeenCalled();
    });
  });

  describe('.start()', () => {
    it('should have method', () => {
      const property = 'start';
      expect(simpleOscillator).toHaveProperty(property);
      expect(typeof simpleOscillator[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleOscillator.start(mockAudioNode)).toBeUndefined();
    });

    it('should call `.start` on the ouput audio node', () => {
      simpleOscillator.start();
      expect(simpleOscillator.output.start).toHaveBeenCalled();
    });
  });

  describe('.stop()', () => {
    it('should have method', () => {
      const property = 'stop';
      expect(simpleOscillator).toHaveProperty(property);
      expect(typeof simpleOscillator[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleOscillator.stop(mockAudioNode)).toBeUndefined();
    });

    it('should call `.start` on the ouput audio node', () => {
      simpleOscillator.stop();
      expect(simpleOscillator.output.stop).toHaveBeenCalled();
    });
  });
});
