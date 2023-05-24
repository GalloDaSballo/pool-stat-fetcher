import { providers } from "ethers";

import { PoolData } from "./types";
import balancerFetcher from "./fetchers/bal";
import curveFetcher from "./fetchers/curve";
import veloFetcher from "./fetchers/velo";

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
  extraInfo?: ExtraInfo
): Promise<PoolData> {
  // Provider for given chain
  const ALCHEMY_PROVIDER = new providers.JsonRpcProvider(alchemyKey);

  // Pass to fetcher
  if (type === "Balancer") {
    return balancerFetcher(ALCHEMY_PROVIDER, address, extraInfo?.poolId);
  }

  if (type === "Curve") {
    return curveFetcher(ALCHEMY_PROVIDER, address);
  }

  if (type === "Velo") {
    return veloFetcher(ALCHEMY_PROVIDER, address);
  }

  // Return value
}
