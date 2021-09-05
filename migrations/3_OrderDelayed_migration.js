const OrderDelayed = artifacts.require("OrderDelayed");
const fs = require("fs");
module.exports = deployer => {
  deployer
    .deploy(OrderDelayed)
    .then(() => {
      // create a new json file with the contract address
      let newMigration = {
        "address": OrderDelayed.address,
        "transactionHash": OrderDelayed.transactionHash
      };
      let newMigrationStr = JSON.stringify(newMigration, null, 4);
      // write the new json file in the build/data folder
      fs.writeFileSync("./build/data/OrderDelayed.json", newMigrationStr);
    });
}