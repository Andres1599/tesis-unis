// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NoDeliveryOrder {

    // this is the owner of the contract
    address private owner;
    
    // struct to define a order to be processed and have issues
    struct OrderInConflict {
        uint state;
        uint timestamp;
    }

    // mapping of orderId to order
    mapping(string => OrderInConflict) private orders;

    // count orders
    uint private orderCount;

    // modify only owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    } 
    
    // constructor of the contract
    constructor() public {
        owner = msg.sender;
    }

    // create a new order
    function createOrder(string memory _orderToken, uint _state, uint _timestamp) public payable{
        orders[_orderToken] = OrderInConflict(_state, _timestamp);
    }

    // get order in conflict 
    function getOrderInConflict(string memory _orderToken) public view  returns (uint timestamp, uint state) {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // return timestamp and state
        return (order.timestamp, order.state);
    }
}