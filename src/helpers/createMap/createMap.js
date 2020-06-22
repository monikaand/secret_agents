import { getRandomNumbers } from '../getRandomNumbers/getRandomNumbers';

export function createMap({
  tilesNumber = 25,
  blueAmount = 9,
  redAmount = 8,
  killersAmount = 1,
}) {
  if (blueAmount + redAmount + killersAmount > tilesNumber) {
    throw Error('too few tiles to given condition');
  }

  const blueTilesIndices = getRandomNumbers({
    max: tilesNumber,
    amount: blueAmount,
  });

  const redTilesIndices = getRandomNumbers({
    max: tilesNumber,
    amount: redAmount,
    excluded: blueTilesIndices,
  });

  const killersTilesIndices = getRandomNumbers({
    max: tilesNumber,
    amount: killersAmount,
    excluded: [...blueTilesIndices, ...redTilesIndices],
  });

  return {
    blueTilesIndices,
    redTilesIndices,
    killersTilesIndices,
  };
}