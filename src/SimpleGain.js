function SimpleGain(context, opts = { connect: context.destination }) {
  const gainNode = context.createGain();
  gainNode.connect(opts.connect);

  if (opts.gain && typeof opts.gain === 'number') {
    gainNode.gain.value = opts.gain;
  }

  return gainNode;
}

export default SimpleGain;
