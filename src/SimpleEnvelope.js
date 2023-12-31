class SimpleEnvelope {
  #context;

  #destination;

  #attack;

  #release;

  constructor(context, opts = {}) {
    this.#context = context;
    this.#destination = undefined;
    this.#attack = opts.attack || 0.1;
    this.#release = opts.release || 0.4;
  }

  #run(stages, time) {
    this.#destination.setValueAtTime(0, time);

    let timeAccumulator = time;
    for (let i = 0; i < stages.length; i += 1) {
      const stage = stages[i];
      timeAccumulator += stage.time;
      this.#destination.linearRampToValueAtTime(stage.value, timeAccumulator);
    }
  }

  get attack() {
    return this.#attack;
  }

  set attack(value) {
    this.#attack = value;
  }

  get release() {
    return this.#release;
  }

  set release(value) {
    this.#release = value;
  }

  get length() {
    return this.#attack + this.#release;
  }

  connect(destination) {
    this.#destination = destination.input || destination;
  }

  disconnect() {
    this.#destination = undefined;
  }

  trigger(time = this.#context.currentTime) {
    const stages = [
      { value: 1, time: this.#attack },
      { value: 0, time: this.#release },
    ];

    this.#run(stages, time);
  }
}

export default SimpleEnvelope;
