const throwDice = () => {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

module.exports = { throwDice };
