import SimpleReverb from '../src/SimpleReverb';
import AudioBufferMock from '../mocks/web-audio-api/AudioBufferMock';
import AudioContextMock from '../mocks/web-audio-api/AudioContextMock';
import AudioNodeMock from '../mocks/web-audio-api/AudioNodeMock';
import ConvolverNodeMock from '../mocks/web-audio-api/ConvolverNodeMock';

jest.mock('../mocks/web-audio-api/AudioBufferMock');
jest.mock('../mocks/web-audio-api/AudioContextMock');
jest.mock('../mocks/web-audio-api/AudioNodeMock');
jest.mock('../mocks/web-audio-api/ConvolverNodeMock');

describe('SimpleReverb', () => {
  let audioContext;
  let simpleReverb;

  beforeEach(() => {
    audioContext = new AudioContextMock();
    audioContext.createBuffer.mockReturnValue(new AudioBufferMock());
    audioContext.createConvolver.mockReturnValue(new ConvolverNodeMock());
    simpleReverb = new SimpleReverb(audioContext);
  });

  describe('options', () => {
    it('can be initialized with a seconds option', () => {
      const parameter = 'seconds';
      const options = {
        [parameter]: 4.0,
      };
      const instance = new SimpleReverb(audioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with a decay option', () => {
      const parameter = 'decay';
      const options = {
        [parameter]: 3.0,
      };
      const instance = new SimpleReverb(audioContext, options);
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
  });

  describe('.output', () => {
    const property = 'output';

    it('should have property', () => {
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb[property]).toBeDefined();
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
      const audioNode = new AudioNodeMock();
      expect(simpleReverb.connect(audioNode)).toBeUndefined();
    });

    it('should call `.connect` on the ouput audio node', () => {
      const audioNode = new AudioNodeMock();
      simpleReverb.connect(audioNode);
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
      const node = new AudioNodeMock();
      expect(simpleReverb.disconnect(node)).toBeUndefined();
    });

    it('should call `.disconnect` on the ouput audio node', () => {
      const audioNode = new AudioNodeMock();
      simpleReverb.disconnect(audioNode);
      expect(simpleReverb.output.disconnect).toHaveBeenCalled();
    });
  });
});
