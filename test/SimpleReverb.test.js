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
    it('should have property', () => {
      const property = 'input';
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb.input).toBeDefined();
    });
  });

  describe('.output', () => {
    it('should have property', () => {
      const property = 'output';
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb.output).toBeDefined();
    });
  });

  describe('.seconds', () => {
    it('should have property', () => {
      const property = 'seconds';
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb.seconds).toBeDefined();
    });
  });

  describe('.decay', () => {
    it('should have property', () => {
      const property = 'decay';
      expect(simpleReverb).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleReverb.decay).toBeDefined();
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
