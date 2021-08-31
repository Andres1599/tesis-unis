// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NoDeliveryOrder {

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
    
    constructor() {}
}