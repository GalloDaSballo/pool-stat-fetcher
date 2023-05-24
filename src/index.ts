import { AlchemyProvider } from "ethers";
import * as dotenv from "dotenv";
import { PoolData } from "./types";
import balancerFetcher from "./fetchers/bal";

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
  type,
  address, // Address of Pool
  extraInfo
): Promise<PoolData> {
  // Provider for given chain
  const ALCHEMY_PROVIDER = new AlchemyProvider(
    chainId,
    process.env.ALCHEMY_API_KEY
  );

  // Pass to fetcher
  if (type === "Balancer") {
    return balancerFetcher(ALCHEMY_PROVIDER, address, extraInfo?.poolId);
  }

  // Return value
}

async function main() {
  const res = await fetchValues(
    10,
    "Balancer",
    "0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2",
    {
      poolId:
        "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb200020000000000000000008b",
    }
  );

  console.log("res", res);
}

main();
