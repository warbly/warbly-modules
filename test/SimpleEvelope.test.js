import SimpleEnvelope from '../src/SimpleEnvelope';
import AudioContextMock from '../mocks/web-audio-api/AudioContextMock';
import AudioNodeMock from '../mocks/web-audio-api/AudioNodeMock';
import AudioParamMock from '../mocks/web-audio-api/AudioParamMock';

jest.mock('../mocks/web-audio-api/AudioContextMock');
jest.mock('../mocks/web-audio-api/AudioNodeMock');
jest.mock('../mocks/web-audio-api/AudioParamMock');

describe('SimpleEnvelope', () => {
  let audioContext;
  let simpleEnvelope;

  beforeEach(() => {
    audioContext = new AudioContextMock();
    simpleEnvelope = new SimpleEnvelope(audioContext);
  });

  describe('options', () => {
    it('can be initialized with an output option', () => {
      const parameter = 'output';
      const options = {
        [parameter]: new AudioParamMock(),
      };
      const instance = new SimpleEnvelope(audioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with an attack option', () => {
      const parameter = 'attack';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleEnvelope(audioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with an release option', () => {
      const parameter = 'release';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleEnvelope(audioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });
  });

  describe('.output', () => {
    it('should have property', () => {
      const property = 'output';
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should not define a default value', () => {
      expect(simpleEnvelope.output).toBeUndefined();
    });

    it('should be assignable to a Web Audio node', () => {
      const node = new AudioNodeMock();
      simpleEnvelope.output = node;
      expect(simpleEnvelope.output).toBe(node);
    });

    it('should be assignable to a Web Audio parameter', () => {
      const parameter = new AudioParamMock();
      simpleEnvelope.output = parameter;
      expect(simpleEnvelope.output).toBe(parameter);
    });
  });

  describe('.attack', () => {
    it('should have property', () => {
      const property = 'attack';
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleEnvelope.attack).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleEnvelope.attack = value;
      expect(simpleEnvelope.attack).toBe(value);
    });
  });

  describe('.release', () => {
    it('should have property', () => {
      const property = 'release';
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleEnvelope.release).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleEnvelope.release = value;
      expect(simpleEnvelope.release).toBe(value);
    });
  });

  describe('.length', () => {
    it('should have property', () => {
      const property = 'length';
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should calculate length correctly', () => {
      const attack = 0.1;
      const release = 0.9;
      const expected = attack + release;
      simpleEnvelope.attack = attack;
      simpleEnvelope.release = release;
      expect(simpleEnvelope.length).toBe(expected);
    });

    it('should update when attack and release properties change', () => {
      const attack1 = 0.1;
      const release1 = 0.9;
      simpleEnvelope.attack = attack1;
      simpleEnvelope.release = release1;
      const length1 = simpleEnvelope.length;

      const attack2 = 0.2;
      const release2 = 1.0;
      simpleEnvelope.attack = attack2;
      simpleEnvelope.release = release2;
      const length2 = simpleEnvelope.length;

      const expected1 = attack1 + release1;
      const expected2 = attack2 + release2;

      expect(length1).toBe(expected1);
      expect(length2).toBe(expected2);
    });
  });

  describe('.connect()', () => {
    it('should have method', () => {
      const property = 'connect';
      expect(simpleEnvelope).toHaveProperty(property);
      expect(typeof simpleEnvelope[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const audioNode = new AudioNodeMock();
      expect(simpleEnvelope.connect(audioNode)).toBeUndefined();
    });
  });

  describe('.disconnect()', () => {
    it('should have method', () => {
      const property = 'disconnect';
      expect(simpleEnvelope).toHaveProperty(property);
      expect(typeof simpleEnvelope[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const node = new AudioNodeMock();
      expect(simpleEnvelope.disconnect(node)).toBeUndefined();
    });
  });

  describe('.trigger()', () => {
    it('should have method', () => {
      const property = 'trigger';
      expect(simpleEnvelope).toHaveProperty(property);
      expect(typeof simpleEnvelope[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const parameter = new AudioParamMock();
      simpleEnvelope.connect(parameter);
      expect(simpleEnvelope.trigger()).toBeUndefined();
    });
  });
});
