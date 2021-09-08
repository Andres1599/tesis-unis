const OrderIssuePayment = artifacts.require("OrderIssuePayment");
const fs = require("fs");
module.exports = deployer => {
  deployer
    .deploy(OrderIssuePayment)
    .then(() => {
      // create a new json file with the contract address
      let newMigration = {
        "address": OrderIssuePayment.address,
        "transactionHash": OrderIssuePayment.transactionHash
      };
      let newMigrationStr = JSON.stringify(newMigration, null, 4);
      // write the new json file in the build/data folder
      fs.writeFileSync("./build/data/OrderDelayed.json", newMigrationStr);
    });
}