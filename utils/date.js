export const formatTime = (time) => {
  const split = time.split('/');
  const requiredFormat = [split[1], split[0], split[2]].join('/');

  return new Date(requiredFormat).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
