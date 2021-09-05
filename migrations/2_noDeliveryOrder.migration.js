const NoDeliveryOrder = artifacts.require("NoDeliveryOrder");
const fs = require("fs");
module.exports = deployer => {
    deployer
        .deploy(NoDeliveryOrder)
        .then(() => {
            // create a new json file with the contract address
            let newMigration = {
                "address": NoDeliveryOrder.address,
                "transactionHash": NoDeliveryOrder.transactionHash
            };
            let newMigrationStr = JSON.stringify(newMigration, null, 4);
            // write the new json file in the build/data folder
            fs.writeFileSync("./build/data/NoDeliveryOrder.json", newMigrationStr);
        });
}