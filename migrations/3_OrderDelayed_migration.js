const OrderDelayed = artifacts.require("OrderDelayed");

module.exports = deployer => {
  deployer.deploy(OrderDelayed);
}
