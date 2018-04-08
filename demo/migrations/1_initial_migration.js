const Migrations = artifacts.require("./Migrations.sol");
const Organization = artifacts.require("./Organization.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Organization, 4, 4);
};
