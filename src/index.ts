import { providers } from "ethers";

import { PoolData } from "./types";
import balancerFetch from "./fetchers/bal";
import curveFetch from "./fetchers/curve";
import veloFetch from "./fetchers/velo";
import fromOnChainPoolDataToAdjusted from "./format";

// Interfaces

// ENV for RPC URL

// Type

// Fetch

interface ExtraInfo {
  poolId: string; // Bytes32 for Bal
}

// Balancer vault is always same addy

export default async function fetchValues(
  alchemyKey: string,
  chainId: number,
  type: string,
  address: string, // Address of Pool
  extraInfo?: ExtraInfo,
  format = true // Do you want the values to be formatted back to integers? False will return w/e is returned from onChain (prob BN)
): Promise<PoolData> {
  // Provider for given chain
  const ALCHEMY_PROVIDER = new providers.JsonRpcProvider(alchemyKey);
  let res = null;

  // Pass to fetcher
  if (type === "Balancer") {
    res = await balancerFetch(ALCHEMY_PROVIDER, address, extraInfo?.poolId);
  }

  if (type === "Curve") {
    res = await curveFetch(ALCHEMY_PROVIDER, address);
  }

  if (type === "Velo") {
    res = await veloFetch(ALCHEMY_PROVIDER, address);
  }

  // Null case
  if (res == null) {
    throw Error("Something went wrong");
  }

  // Format
  if (format) {
    res = fromOnChainPoolDataToAdjusted(res);
  }

  // Return value
  return res;
}
