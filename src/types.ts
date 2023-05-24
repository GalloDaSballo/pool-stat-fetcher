export interface PoolData {
  poolType: string;
  isStable: boolean;
  poolReserves: number[];
  poolExtraSettings?: ExtraSettings;
  // timeForReplenishment: number; // NOTE: We cannot determine this so we don't return it

  // NOTE: Extra so you can build your own data structures
  tokens: string[];
}

export interface ExtraSettings {
  customA?: number;
  customFees?: number;
  customRates?: number[];
  // customDecimals?: number[]; // We do not return decimals since we don't check the tokens
}
