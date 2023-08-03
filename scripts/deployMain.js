// const hre = require("hardhat");
const hre = require("hardhat");

const { Web3 } = require("web3");
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const web3 = new Web3();
const namehash = require("eth-ens-namehash");

function getRootNodeFromTLD(tld) {
  return {
    namehash: namehash.hash(tld),
    sha3: web3.utils.sha3(tld),
  };
}

async function main() {
  var rootNode = getRootNodeFromTLD("eth");

  const ens = await hre.ethers.deployContract("ENSRegistry");
  await ens.deployed();

  const registrar = await hre.ethers.deployContract("FIFSRegistrar", [
    ens.address,
    rootNode.namehash,
  ]);
  await registrar.deployed();

  console.log("ens address: ", ens.address);
  console.log("registrar address: ", registrar.address);
  const padded = ethers.utils.hexZeroPad("0x00", 32);
  await ens.setSubnodeOwner(padded, rootNode.sha3, registrar.address);
}

main();
