const CryptoScripture = artifacts.require("CryptoScripture");

module.exports = function(deployer) {
  deployer.deploy(CryptoScripture);
};
