// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrderDelayed {

    // this is the owner of the contract
    address private owner;
    
   
    // struct to define a order
    struct Order {
        uint orderId;
        bool wasDelivery;
        bool wasRecived;
        bool payOrder;
        uint256 stimedTime;
        string state; 
        uint256 userId;
    }
    
    // order 
    Order order;

    // modify only owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // create event to emit current state of order by orderId
    event __OrderState(Order _order);

    constructor() public {
        owner = msg.sender;
    }

}

