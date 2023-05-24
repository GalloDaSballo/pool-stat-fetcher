/** CURVE FETCHER */
import { Contract } from "ethers";

import { PoolData } from "../../types";

import POOL_ABI from "./velo_pair.json";

/**
VELO EXAMPLE
https://optimistic.etherscan.io/address/0x985612ff2C9409174FedcFf23d4F4761AF124F88#readContract
 */

export default async function fetchValues(
  ethersProvider,
  address // Address of Pool
): Promise<PoolData> {
  const PAIR = new Contract(address, POOL_ABI, ethersProvider);

  const isStable = await PAIR.stable();
  const tokens = await PAIR.tokens();

  const reservesRes = await PAIR.getReserves();
  const reserves = [reservesRes[0], reservesRes[1]];

  return {
    poolType: "Velo",
    isStable,
    poolReserves: reserves,
    // NOTE: Velo could have custom fees, but they don't, so we return nothing for now
    tokens,
  };
}
