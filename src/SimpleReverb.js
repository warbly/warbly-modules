class SimpleReverb {
  #context;
  #seconds;
  #decay;

  constructor(context, opts = {}) {
    this.#context = context;
    this.#seconds = opts.seconds || 3;
    this.#decay = opts.seconds || 2;

    const convolver = context.createConvolver();
    this.input = convolver;
    this.output = convolver;

    this.#buildImpulse();
  }

  #buildImpulse() {
    const rate = this.#context.sampleRate;
    const length = rate * this.seconds;
    const decay = this.decay;
    const impulse = this.#context.createBuffer(2, length, rate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);

    for (let i = 0; i < length; i += 1) {
      impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }

    this.input.buffer = impulse;
  }

  get seconds() {
    return this.#seconds;
  }

  set seconds(value) {
    this.#seconds = value;
    this.#buildImpulse();
  }

  get decay() {
    return this.#decay;
  }

  set decay(value) {
    this.#decay = value;
    this.#buildImpulse();
  }

  connect(destination) {
    this.output.connect(destination.input || destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default SimpleReverb;
