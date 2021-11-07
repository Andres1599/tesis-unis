// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrderIssuePayment {

    // this is the owner of the contract
    address private owner;
   
    // struct to define a order
    struct Order {
        uint orderId;
        bool payOrder;
        bool reversionPayment;
        string state; 
        uint256 userId;
    }
    
    // order 
    Order public order;
    string issues;
    bool reviewed;
    uint256 private limitTime;

    // modify the order is correct 
    modifier isOrder(uint256 _orderId) {
        require(order.orderId == _orderId, "Order not found");
        _;
    }

    // modify only owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // create event to emit current state of order by orderId
    event __OrderState(Order _order, bool _reviewed, string _issues);
    
    // constructor of the contract
    constructor(uint256 _user, uint256 _orderId, uint256 _limitTime) public {
        // set the owner of the contract on the global variable owner
        owner = msg.sender;
        // set the order
        order.userId = _user;
        order.orderId = _orderId;
        order.payOrder = true;
        order.reversionPayment = false;
        order.state = "order issue payment";
        reviewed = false;
        limitTime = _limitTime;
    }

    // function to get the order
    function getOrderState(uint256 _orderId) public view isOrder(_orderId) returns(Order memory, bool, string memory) {
        return (order, reviewed, issues);
    }

    // create function to set state order as reviewd by customer service
    function setOrderReviewd(uint256 _orderId) public isOrder(_orderId) {
        require(!reviewed, "Order already reviewed");
        require(order.payOrder, "Order not payed");
        order.state = "order reviewd";
        emit __OrderState(order, reviewed, issues);
    }

    // create function to set state order as make reversion payment
    function setOrderMakeReversionPayment(uint256 _orderId) public isOrder(_orderId) {
        require(reviewed, "Order not reviewed");
        require(!order.reversionPayment, "Order already make reversion payment");
        order.state = "order make reversion payment";
        order.reversionPayment = true;
        emit __OrderState(order, reviewed, issues);
    }

    //  craete a function to cancel revision and set state order as make reversion payment
    function cancelReversionPayment(uint256 _orderId) public isOrder(_orderId) onlyOwner() {
        require(limitTime > block.timestamp, "Order time limit expired");
        order.state = "order issue payment revision time limit";
        order.reversionPayment = false;
        emit __OrderState(order, reviewed, issues);
    }


}

