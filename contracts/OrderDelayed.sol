// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrderDelayed {

    address owner;
    uint public numberAsteroids;

    event __callBackNewData();

    // struct to define the current state of a order
    struct StateOrder {
        uint256 times;
        string status;
    }
    
    // struct to define a order to be processed
    struct Order {
        uint orderToken;
        StateOrder state;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can do this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // function to emit the event on externarl application
    function updateData() public onlyOwner {
        emit __callBackNewData();
    }

    // function to set the informetion about the current state
    function setData(uint _numberAsteroids) public onlyOwner {
        numberAsteroids = _numberAsteroids;
    }

}

