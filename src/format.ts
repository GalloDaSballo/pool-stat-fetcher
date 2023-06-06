import { PoolData } from "./types";

/**
 * Formats all the values into TS integers
 */
const fromOnChainPoolDataToAdjusted = (poolData: PoolData): PoolData => {
  let adjustedPoolData = {
    ...poolData,
    poolReserves: poolData.poolReserves.map((res) =>
      parseInt(res.toString(), 10)
    ),
    timeForReplenishment: 60 * 60 * 24,
  };
  const extraSettingsFixed = {
    customA: poolData?.poolExtraSettings?.customA
      ? parseInt(poolData?.poolExtraSettings.customA.toString(), 10)
      : undefined,
    customFees: poolData?.poolExtraSettings?.customFees
      ? parseInt(poolData?.poolExtraSettings.customFees.toString(), 10)
      : undefined,

    // TODO: DIRTY HACK HERE FOR CURVE, JUST HARDCODE RATES MANUALLY
    customRates: poolData?.poolExtraSettings?.customRates
      ? poolData?.poolExtraSettings.customRates.map((rate) =>
          parseInt(rate.toString(), 10)
        )
      : undefined,
  };
  adjustedPoolData = {
    ...adjustedPoolData,
    poolExtraSettings: {
      ...adjustedPoolData?.poolExtraSettings,
      ...extraSettingsFixed,
    },
  };

  return adjustedPoolData;
};

export default fromOnChainPoolDataToAdjusted;
