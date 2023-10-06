class SimpleGain {
  #context;

  #input;

  #output;

  #gain;

  constructor(context, opts = {}) {
    this.#context = context;
    this.#gain = opts.gain || 1;

    const gainNode = context.createGain();
    this.#input = gainNode;
    this.#output = gainNode;

    this.#setGain();
  }

  #setGain() {
    this.#output.gain.value = this.#gain;
  }

  get input() {
    return this.#input;
  }

  get output() {
    return this.#output;
  }

  get gain() {
    return this.#gain;
  }

  set gain(value) {
    this.#gain = value;
    this.#setGain();
  }

  connect(destination) {
    this.#output.connect(destination.input || destination);
  }

  disconnect() {
    this.#output.disconnect();
  }
}

export default SimpleGain;
