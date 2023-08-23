import SimpleEnvelope from '../src/SimpleEnvelope';
import MockAudioContext from '../mocks/web-audio-api/MockAudioContext';
import MockAudioNode from '../mocks/web-audio-api/MockAudioNode';
import MockAudioParam from '../mocks/web-audio-api/MockAudioParam';

jest.mock('../mocks/web-audio-api/MockAudioContext');
jest.mock('../mocks/web-audio-api/MockAudioNode');
jest.mock('../mocks/web-audio-api/MockAudioParam');

describe('SimpleEnvelope', () => {
  let mockAudioContext;
  let simpleEnvelope;

  beforeEach(() => {
    mockAudioContext = new MockAudioContext();
    simpleEnvelope = new SimpleEnvelope(mockAudioContext);
  });

  describe('options', () => {
    it('can be initialized with an attack option', () => {
      const parameter = 'attack';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleEnvelope(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });

    it('can be initialized with an release option', () => {
      const parameter = 'release';
      const options = {
        [parameter]: 0.5,
      };
      const instance = new SimpleEnvelope(mockAudioContext, options);
      expect(instance[parameter]).toBe(options[parameter]);
    });
  });

  describe('.attack', () => {
    const property = 'attack';

    it('should have property', () => {
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleEnvelope[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleEnvelope[property] = value;
      expect(simpleEnvelope[property]).toBe(value);
    });
  });

  describe('.release', () => {
    const property = 'release';

    it('should have property', () => {
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should define a default value', () => {
      expect(simpleEnvelope[property]).toBeDefined();
    });

    it('should be assignable', () => {
      const value = 1.0;
      simpleEnvelope[property] = value;
      expect(simpleEnvelope[property]).toBe(value);
    });
  });

  describe('.length', () => {
    const property = 'length';

    it('should have property', () => {
      expect(simpleEnvelope).toHaveProperty(property);
    });

    it('should calculate length correctly', () => {
      const attack = 0.1;
      const release = 0.9;
      const expected = attack + release;
      simpleEnvelope.attack = attack;
      simpleEnvelope.release = release;
      expect(simpleEnvelope[property]).toBe(expected);
    });

    it('should update when attack and release properties change', () => {
      const attack1 = 0.1;
      const release1 = 0.9;
      simpleEnvelope.attack = attack1;
      simpleEnvelope.release = release1;
      const length1 = simpleEnvelope[property];

      const attack2 = 0.2;
      const release2 = 1.0;
      simpleEnvelope.attack = attack2;
      simpleEnvelope.release = release2;
      const length2 = simpleEnvelope[property];

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
      const mockAudioNode = new MockAudioNode();
      expect(simpleEnvelope.connect(mockAudioNode)).toBeUndefined();
    });
  });

  describe('.disconnect()', () => {
    it('should have method', () => {
      const property = 'disconnect';
      expect(simpleEnvelope).toHaveProperty(property);
      expect(typeof simpleEnvelope[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioNode = new MockAudioNode();
      expect(simpleEnvelope.disconnect(mockAudioNode)).toBeUndefined();
    });
  });

  describe('.trigger()', () => {
    it('should have method', () => {
      const property = 'trigger';
      expect(simpleEnvelope).toHaveProperty(property);
      expect(typeof simpleEnvelope[property]).toBe('function');
    });

    it('should return `undefined`', () => {
      const mockAudioParam = new MockAudioParam();
      simpleEnvelope.connect(mockAudioParam);
      expect(simpleEnvelope.trigger()).toBeUndefined();
    });
  });
});
