class SimpleGain {
  #context;

  #input;

  #output;

  #gainValue;

  constructor(context, opts = {}) {
    this.#context = context;
    this.#gainValue = opts.gain || 1;

    const gainNode = context.createGain();
    this.#input = gainNode;
    this.#output = gainNode;

    this.#setGain();
  }

  #setGain() {
    this.#output.gain.value = this.#gainValue;
  }

  get input() {
    return this.#input;
  }

  get output() {
    return this.#output;
  }

  get gain() {
    return this.#gainValue;
  }

  set gain(value) {
    this.#gainValue = value;
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
