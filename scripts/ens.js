// scripts/deploy.js
// async function main() {
//   // We get the contract to deploy
//   const ENS = await ethers.getContractFactory("contracts/ENS.sol");
//   console.log("Deploying ENS...");
//   const ens = await ENS.deploy();
//   await ens.deployed();
//   console.log("ENS deployed to:", ens.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const ens = await hre.ethers.deployContract("ENSRegistry");

  //   await ens.waitForDeployment();
  await ens.deployed();

  console.log(`deployed to ${ens.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
