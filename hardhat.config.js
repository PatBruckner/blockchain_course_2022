require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/ZFmshJhiI9c2qKBWG8r90Emgz0sU55lg",
      accounts: ['5d6684cf2b450e1fc9282ce1d9612cd5b6b444f91bb0e707b924ad488f04d477']
    }
  },
  paths:{
    sources: "./src/ethereum-hardhat/contracts",
    tests: "./src/ethereum-hardhat/tests",
    cache: "./src/ethereum-hardhat/cache",
    artifacts: "./src/ethereum-hardhat/artifacts",
  } 
};
