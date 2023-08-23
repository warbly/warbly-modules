import SimpleReverb from '../src/SimpleReverb';
import MockAudioBuffer from '../mocks/web-audio-api/MockAudioBuffer';
import MockAudioContext from '../mocks/web-audio-api/MockAudioContext';
import MockAudioNode from '../mocks/web-audio-api/MockAudioNode';
import MockConvolverNode from '../mocks/web-audio-api/MockConvolverNode';

jest.mock('../mocks/web-audio-api/MockAudioBuffer');
jest.mock('../mocks/web-audio-api/MockAudioContext');
jest.mock('../mocks/web-audio-api/MockAudioNode');
jest.mock('../mocks/web-audio-api/MockConvolverNode');

describe('SimpleReverb', () => {
  let mockAudioContext;
  let simpleReverb;

  beforeEach(() => {
    mockAudioContext = new MockAudioContext();
    mockAudioContext.createBuffer.mockReturnValue(new MockAudioBuffer());
    mockAudioContext.createConvolver.mockReturnValue(new MockConvolverNode());
    simpleReverb = new SimpleReverb(mockAudioContext);
  });

  describe('options', () => {
    it('can be initialized with a seconds option', () => {
      const parameter = 'seconds';
      const options = {
        [parameter]: 4.0,
      };
      const instance = new SimpleReverb(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with a decay option', () => {
      const parameter = 'decay';
      const options = {
        [parameter]: 3.0,
      };
      const instance = new SimpleReverb(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });
  });

  describe('.input', () => {
    const property = 'input';

    it('should have property', () => {
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb[property]).toBeDefined();
    });

    it('should be an instance of a Web Audio ConvolverNode', () => {
      expect(simpleReverb[property]).toBeInstanceOf(MockConvolverNode);
    });
  });

  describe('.output', () => {
    const property = 'output';

    it('should have property', () => {
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb[property]).toBeDefined();
    });

    it('should be an instance of a Web Audio ConvolverNode', () => {
      expect(simpleReverb[property]).toBeInstanceOf(MockConvolverNode);
    });
  });

  describe('.seconds', () => {
    const property = 'seconds';

    it('should have property', () => {
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleReverb[property] = value;
      expect(simpleReverb[property]).toBe(value);
    });
  });

  describe('.decay', () => {
    const property = 'decay';

    it('should have property', () => {
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleReverb[property] = value;
      expect(simpleReverb[property]).toBe(value);
    });
  });

  describe('.connect()', () => {
    it('should have method', () => {
      const property = 'connect';
      expect(simpleReverb).toHaveProperty(property);
      expect(typeof simpleReverb[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleReverb.connect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.connect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleReverb.connect(mockAudioNode);
      expect(simpleReverb.output.connect).toHaveBeenCalled();
    });
  });

  describe('.disconnect()', () => {
    it('should have method', () => {
      const property = 'disconnect';
      expect(simpleReverb).toHaveProperty(property);
      expect(typeof simpleReverb[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleReverb.disconnect(mockAudioNode)).toBeUndefined();
    });

    it('should call `.disconnect` on the ouput audio node', () => {
      const mockAudioNode = new MockAudioNode();
      simpleReverb.disconnect(mockAudioNode);
      expect(simpleReverb.output.disconnect).toHaveBeenCalled();
    });
  });
});
