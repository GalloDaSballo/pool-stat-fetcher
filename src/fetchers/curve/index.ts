/** CURVE FETCHER */
import { Contract } from "ethers";

import { PoolData } from "../../types";

import POOL_ABI from "./curve_pool.json";

/**
CURVE EXAMPLE
https://optimistic.etherscan.io/address/0x1337BedC9D22ecbe766dF105c9623922A27963EC#code
 */

export default async function fetchValues(
  ethersProvider,
  address // Address of Pool
): Promise<PoolData> {
  const POOL = new Contract(address, POOL_ABI, ethersProvider);

  const mockBalances = [0, 1, 2, 3];
  const balances = [];
  const tokens = [];

  // This is just a for loop
  // We need to await so we use this pattern
  await Promise.all(
    // JS doesn't need to push, length is dynamically increased
    await mockBalances.map(async (bal, i) => {
      try {
        tokens[i] = await POOL.coins(i);
        balances[i] = await POOL.balances(i);
      } catch (e) {}
    })
  );

  const A = await POOL.A_precise();
  const FEE = await POOL.fee();

  return {
    poolType: "Curve",
    isStable: true, // NOTE: This may not be true
    poolReserves: balances,
    poolExtraSettings: {
      customA: A,
      customFees: FEE,
      // customRates: [], // TODO: WE NEED TO FIND A WAY TO GET THESE
    },
    tokens,
  };
}
