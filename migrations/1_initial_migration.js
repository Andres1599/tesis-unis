
const Migrations = artifacts.require("Migrations");
const NoDeliveryOrder = artifacts.require("NoDeliveryOrder");
const OrderDelayed = artifacts.require("OrderDelayed");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NoDeliveryOrder);
  deployer.deploy(OrderDelayed);
};
