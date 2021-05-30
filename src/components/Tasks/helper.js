export const formatId = (id) => {
  let result = '';
  const digitsReversed = id.toString().split('').reverse();
  for (let i = 0; i < digitsReversed.length; i++) {
    result = digitsReversed[i] + result;
    if ((i + 1) % 3 === 0 && i !== digitsReversed.length - 1) {
      result = ' ' + result;
    }
  }
  return result;
};
