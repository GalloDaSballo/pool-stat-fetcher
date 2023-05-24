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

// async function main() {
//   // const res = await fetchValues(
//   //   10,
//   //   "Balancer",
//   //   "0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2",
//   //   {
//   //     poolId:
//   //       "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb200020000000000000000008b",
//   //   }
//   // );

//   // console.log("res", res);

//   // const resC = await fetchValues(
//   //   10,
//   //   "Curve",
//   //   "0x1337BedC9D22ecbe766dF105c9623922A27963EC"
//   // );

//   // console.log("resC", resC);

//   const resV = await fetchValues(
//     10,
//     "Velo",
//     "0x985612ff2C9409174FedcFf23d4F4761AF124F88"
//   );

//   console.log("resV", resV);
// }

// main();
