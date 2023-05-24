import * as dotenv from "dotenv";
import { providers } from "ethers";
import { PoolData } from "./types";
import balancerFetcher from "./fetchers/bal";
import curveFetcher from "./fetchers/curve";
import veloFetcher from "./fetchers/velo";

const RPC_URLS: Record<number, string> = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  5: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  11155111: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
};

dotenv.config();
// Interfaces

// ENV for RPC URL

// Type

// Fetch

interface ExtraInfo {
  poolId: string; // Bytes32 for Bal
}

// Balancer vault is always same addy

export default async function fetchValues(
  chainId: number,
  type: string,
  address: string, // Address of Pool
  extraInfo?: ExtraInfo
): Promise<PoolData> {
  // Provider for given chain
  const ALCHEMY_PROVIDER = new providers.JsonRpcProvider(RPC_URLS[chainId]);

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

async function main() {
  // const res = await fetchValues(
  //   10,
  //   "Balancer",
  //   "0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2",
  //   {
  //     poolId:
  //       "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb200020000000000000000008b",
  //   }
  // );

  // console.log("res", res);

  // const resC = await fetchValues(
  //   10,
  //   "Curve",
  //   "0x1337BedC9D22ecbe766dF105c9623922A27963EC"
  // );

  // console.log("resC", resC);

  const resV = await fetchValues(
    10,
    "Velo",
    "0x985612ff2C9409174FedcFf23d4F4761AF124F88"
  );

  console.log("resV", resV);
}

main();
