# @warbly/modules

Reusable synthesis components.

## SimpleEnvelope

The `SimpleEnvelope` is a linear response Attack-Release (AR) envelope.

### Constructor

`new SimpleEnvelope(context, [options])`

Create a `SimpleEnvelope` instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  attack: 0.1,
  release: 0.4,
};
```

### Instance properties

- `SimpleEnvelope.attack`
- `SimpleEnvelope.release`

### Instance methods

- `SimpleEnvelope.connect()`
- `SimpleEnvelope.disconnect()`
- `SimpleEnvelope.trigger()`

## SimpleGain

The `SimpleGain` is a linear amplitude processor that applies gain to input data.

### Constructor

`new SimpleGain(context, [options])`

Create a `SimpleGain` instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  gain: 1,
};
```

### Instance properties

- `SimpleGain.gain`
- `SimpleGain.input` (Read only)
- `SimpleGain.output` (Read only)

### Instance methods

- `SimpleGain.connect()`
- `SimpleGain.disconnect()`

## SimpleOscillator

The `SimpleOscillator` is a variable wave shape oscillator capable of CV and audio rate frequencies.

### Constructor

`new SimpleOscillator(context, [options])`

Create a `SimpleOscillator` instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  frequency: 440,
  type: 'sine',
};
```

### Instance properties

- `SimpleOscillator.frequency`
- `SimpleOscillator.output` (Read only)
- `SimpleOscillator.type`

### Instance methods

- `SimpleOscillator.connect()`
- `SimpleOscillator.disconnect()`
- `SimpleOscillator.start()`
- `SimpleOscillator.stop()`

## SimpleReverb

The `SimpleReverb` is a linear convolution reverb.

### Constructor

`new SimpleReverb(context, [options])`

Create a `SimpleReverb` instance. `context` must reference an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) instance. `options` is an object containing configuration settings for the instance. Configurable options and their default values:

```js
const defaults = {
  seconds: 3,
  decay: 2,
};
```

### Instance properties

- `SimpleReverb.decay`
- `SimpleReverb.input` (Read only)
- `SimpleReverb.output` (Read only)
- `SimpleReverb.seconds`

### Instance methods

- `SimpleReverb.connect()`
- `SimpleReverb.disconnect()`
