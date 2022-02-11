function SimpleOscillator(context, opts = { connect: context.destination }) {
  const oscNode = context.createOscillator();
  oscNode.connect(opts.connect);

  if (opts.frequency && typeof opts.frequency === 'number') {
    oscNode.frequency.value = opts.frequency;
  }

  if (opts.detune && typeof opts.detune === 'number') {
    oscNode.detune.value = opts.detune;
  }

  if (opts.type && typeof opts.type === 'string') {
    oscNode.type = opts.type;
  }

  return oscNode;
}

export default SimpleOscillator;
