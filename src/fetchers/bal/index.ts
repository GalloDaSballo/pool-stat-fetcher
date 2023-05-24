/** BAL FETCHER */
import { Contract } from "ethers";

import { PoolData } from "../../types";

import VAULT_ABI from "./bal_vault.json";
import POOL_ABI from "./bal_pool.json";

const BALANCER_VAULT_ADDRESS = "0xba12222222228d8ba445958a75a0704d566bf2c8";

/**
BALANCE EXAMPLE
https://optimistic.etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#code
0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb200020000000000000000008b
https://optimistic.etherscan.io/address/0x9aa3cd420f830E049e2b223D0b07D8c809C94d15
 */

export default async function fetchValues(
  ethersProvider,
  address, // Address of Pool
  poolId = ""
): Promise<PoolData> {
  if (poolId === "") {
    throw Error("Balancer needs PoolId");
  }

  const VAULT = new Contract(BALANCER_VAULT_ADDRESS, VAULT_ABI, ethersProvider);
  const POOL = new Contract(address, POOL_ABI, ethersProvider);

  // Pool tokens
  // Pool balances
  // From vault
  const vaultData = await VAULT.getPoolTokens(poolId);
  const { tokens, balances } = vaultData;

  // Fees and A from Pool
  const fee = await POOL.getSwapFeePercentage();
  const ampRes = await POOL.getAmplificationParameter();
  const amp = ampRes.value;

  // Rate providers don't always exist
  let rates = [-1];
  try {
    rates = await POOL.getScalingFactors();
  } catch (e) {
    console.log("e in fetching rate proviers", e);
  }

  // Rate from Pool (If available)

  return {
    poolType: "Balancer",
    isStable: true,
    poolReserves: balances,
    poolExtraSettings: {
      customA: amp,
      customFees: fee,
      customRates: rates[0] === -1 ? undefined : rates,
    },
    tokens,
  };
}
