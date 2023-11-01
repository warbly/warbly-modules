class SimpleOscillator {
  #context;

  #output;

  #detune;

  #frequency;

  #type;

  constructor(context, opts = {}) {
    this.#context = context;
    this.#detune = opts.detune || 0;
    this.#frequency = opts.frequency || 440;
    this.#type = opts.type || 'sine';

    const oscillator = context.createOscillator();
    this.#output = oscillator;

    this.#setDetune();
    this.#setFrequency();
    this.#setType();
  }

  #setDetune() {
    this.#output.detune.value = this.#detune;
  }

  #setFrequency() {
    this.#output.frequency.value = this.#frequency;
  }

  #setType() {
    this.#output.type = this.#type;
  }

  get output() {
    return this.#output;
  }

  get detune() {
    return this.#detune;
  }

  set detune(value) {
    this.#detune = value;
    this.#setDetune();
  }

  get frequency() {
    return this.#frequency;
  }

  set frequency(value) {
    this.#frequency = value;
    this.#setFrequency();
  }

  get type() {
    return this.#type;
  }

  set type(value) {
    this.#type = value;
    this.#setType();
  }

  connect(destination) {
    this.#output.connect(destination.input || destination);
  }

  disconnect() {
    this.#output.disconnect();
  }

  start() {
    this.#output.start();
  }

  stop() {
    this.#output.stop();
  }
}

export default SimpleOscillator;
