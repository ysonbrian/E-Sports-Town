const Migrations = artifacts.require('./contract/Migrations.sol');
const KlayErc20 = artifacts.require('./contract/KlayErc20.sol');
const KlayErc721 = artifacts.require('./contract/KlayErc721.sol');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlayErc20, 'KlayErc20');
  deployer.deploy(KlayErc721, 'KlayErc721');
};
