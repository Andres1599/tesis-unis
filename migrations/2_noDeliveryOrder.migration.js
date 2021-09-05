const NoDeliveryOrder = artifacts.require("NoDeliveryOrder");

module.exports = deployer => {
    deployer.deploy(NoDeliveryOrder);
}