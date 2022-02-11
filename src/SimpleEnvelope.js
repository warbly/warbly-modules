import { InterfaceParam } from '@warbly/core';

function SimpleEnvelope(context, opts = {}) {
  this.context = context;
  this.output = opts.connect;

  this.attack = new InterfaceParam({
    defaultValue: 0.1,
    value: opts.attack,
  });

  this.release = new InterfaceParam({
    defaultValue: 0.4,
    value: opts.release,
  });

  this.runEnvelope = (time, stages) => {
    this.output.setValueAtTime(0, time);

    let t = time;
    stages.forEach((stage) => {
      t += stage.time;
      this.output.linearRampToValueAtTime(stage.value, t);
    });
  };
}

SimpleEnvelope.prototype = {
  trigger(time = this.context.currentTime) {
    const stages = [
      { value: 1, time: this.attack.value },
      { value: 0, time: this.release.value },
    ];

    this.runEnvelope(time, stages);
  },

  getLength() {
    return this.attack.value + this.release.value;
  },
};

export default SimpleEnvelope;
