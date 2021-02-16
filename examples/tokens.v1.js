require("dotenv/config");

const { WebSocketProvider } = require("@ethersproject/providers");
const { tab } = require("./helpers");

const sdk = require("..");
const yearn = sdk.protocols.yearn;

const provider = new WebSocketProvider(process.env.WEB3_PROVIDER_WSS);
const etherscan = process.env.ETHERSCAN_KEY;

const ctx = new sdk.Context({ provider, etherscan });

async function main() {
  const v1 = await yearn.vault.fetchV1Addresses(ctx);
  console.log(`Fetching ${v1.length} v1 vaults`);
  for (const address of v1) {
    const vault = await yearn.vault.resolveV1(address, ctx);
    tab(vault.token.address, vault.symbol);
  }

  await provider.destroy();
}

main();