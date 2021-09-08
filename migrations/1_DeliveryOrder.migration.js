const DeliveryOrder = artifacts.require("DeliveryOrder");
const fs = require("fs");
module.exports = deployer => {
    deployer
        .deploy(DeliveryOrder)
        .then(() => {
            // create a new json file with the contract address
            let newMigration = {
                "address": DeliveryOrder.address,
                "transactionHash": DeliveryOrder.transactionHash
            };
            let newMigrationStr = JSON.stringify(newMigration, null, 4);
            // write the new json file in the build/data folder
            fs.writeFileSync("./build/data/NoDeliveryOrder.json", newMigrationStr);
        });
}