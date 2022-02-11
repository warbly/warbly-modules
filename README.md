# @warbly/modules

Reusable synthesis components.

## Audio Modules

### SimpleGain

The `SimpleGain` is a linear amplitude processor that applies gain to input data.

#### Constructor

`new SimpleGain(context, [options])`

Create a SimpleGain instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  connect: context.destination,
  gain: 1,
};
```

### SimpleOscillator

The `SimpleOscillator` is a variable wave shape oscillator capable of CV and audio rate frequencies.

#### Constructor

`new SimpleOscillator(context, [options])`

Create a SimpleOscillator instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  connect: context.destination,
  frequency: 440,
  detune: 0,
  type: 'sine',
};
```

## Control Modules

### SimpleEnvelope

The `SimpleEnvelope` is a linear response Attack-Release (AR) envelope.

#### Constructor

`new SimpleEnvelope([options])`

Create a SimpleEnvelope instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  connect: undefined,
  attack: 0.1,
  release: 0.4,
};
```

#### Properties

- `SimpleEnvelope.attack`: `InterfaceParam` representing the time in seconds for the envelope to rise from a value of 0 to 1. Set with `attack` in the constructor options or with `AudioParam.value`.
- `SimpleEnvelope.release`: `InterfaceParam` representing the time in seconds for the envelope to fall from a value of 1 to 0. Set with `release` in the constructor options or with `AudioParam.value`.

#### Methods

- `SimpleEnvelope.trigger()`: Run the envelope's generated stages.
- `SimpleEnvelope.getLength()`: Return the sum of the AR stages.
