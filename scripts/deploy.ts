import {
  deployContract,
  executeContract,
  newClient,
  readArtifact,
  writeArtifact,
} from "./helpers.js";
import { testnet, Config } from "./deploy_configs.js";
import { join } from "path";

const FORGE_INCENTIVES = 8_000_000_000000; // 10 Million = 10%

const ARTIFACTS_PATH = "../artifacts";

async function main() {
  let CONFIGURATION: Config = testnet;

  // terra, wallet
  const { terra, wallet } = newClient();
  console.log(
    `chainID: ${terra.config.chainID} wallet: ${wallet.key.accAddress}`
  );

  // network : stores contract addresses
  let network = readArtifact(terra.config.chainID);
  console.log("network:", network);

  /*************************************** Validate deploy config file *****************************************/

  if (!CONFIGURATION.tokenContractAddress) {
    console.log(`Please deploy the CW20-base token,
                and then set this address in the deploy config before running this script...`);
    return;
  }

  if (!network.forge_address) {
    /*************************************** Deploy forge Contract *****************************************/
    console.log("Deploying forge...");
    CONFIGURATION.forge_InitMsg.config.owner = wallet.key.accAddress;
    CONFIGURATION.forge_InitMsg.config.receiver = wallet.key.accAddress;
    CONFIGURATION.forge_InitMsg.config.token =
      CONFIGURATION.tokenContractAddress;

    console.log(CONFIGURATION.forge_InitMsg);
    network.forge_address = await deployContract(
      terra,
      wallet,
      join(ARTIFACTS_PATH, "prism_forge.wasm"),
      CONFIGURATION.forge_InitMsg.config,
      "Kinetic -::- Phase 2 -::- Forge"
    );
    console.log("Forge Contract Address: " + network.forge_address);
    writeArtifact(network, terra.config.chainID);
  }

  if (!network.token_allowance) {
    /*************************************** Deploy forge Contract *****************************************/
    console.log("Allowance message forge incentives ...");

    let allowance_msg = {
      increase_allowance: {
        amount: String(FORGE_INCENTIVES),
        spender: network.forge_address,
      },
    };

    let allowance_tx = await executeContract(
      terra,
      wallet,
      CONFIGURATION.tokenContractAddress,
      allowance_msg,
      []
    );

    network.token_allowance = true;

    console.log(
      `${terra.config.chainID} : Allowance tx hash ${allowance_tx.txhash}`
    );

    writeArtifact(network, terra.config.chainID);
  }

  if (!network.forge_post_initalized) {
    /*************************************** Deploy forge Contract *****************************************/
    console.log("Post Initializing forge...");

    let transfer_msg = {
      post_initialize: {
        launch_config: {
          amount: String(FORGE_INCENTIVES),
          phase1_start: CONFIGURATION.launch_config.config.phase1_start,
          phase2_start: CONFIGURATION.launch_config.config.phase2_start,
          phase2_end: CONFIGURATION.launch_config.config.phase2_end,
        },
      },
    };

    let post_launch_config = await executeContract(
      terra,
      wallet,
      network.forge_address,
      transfer_msg,
      []
    );

    network.post_launch_config = true;

    console.log(
      `${terra.config.chainID} :: Transferring Tokens and setting incentives in forge... ${post_launch_config.txhash}`
    );
    writeArtifact(network, terra.config.chainID);
  }
}

main().catch(console.log);
