import { createMap } from './createMap';

describe('createMap functionality', () => {
  test('should throw from an error due to too few tiles to given conditions', () => {
    expect(() => {
      createMap({
        tilesNumber: 10,
        blueAmount: 5,
        redAmount: 5,
        killersAmount: 2,
      }).toThrow();
    });
  });

  test('should return object with arrays with a regard for given quantity  conditions', () => {
    const config = {
      tilesNumber: 25,
      blueAmount: 9,
      redAmount: 8,
      killersAmount: 1,
    };

    const {
      killersTilesIndices,
      redTilesIndices,
      blueTilesIndices,
    } = createMap(config);

    expect(killersTilesIndices).toHaveLength(config.killersAmount);
    expect(redTilesIndices).toHaveLength(config.redAmount);
    expect(blueTilesIndices).toHaveLength(config.blueAmount);
  });

  test('should return object with arrays with a unique values', () => {
    const config = {
      tilesNumber: 25,
      blueAmount: 9,
      redAmount: 8,
      killersAmount: 1,
    };

    const {
      killersTilesIndices,
      redTilesIndices,
      blueTilesIndices,
    } = createMap(config);

    const indicesSet = new Set([...killersTilesIndices, ...blueTilesIndices, ...redTilesIndices]);
    expect(indicesSet.size).toEqual(config.blueAmount + config.redAmount + config.killersAmount);
  });
});