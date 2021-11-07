// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeliveryOrder {

    // this is the owner of the contract
    address private owner;
    
    // struct to define a order
    struct Order {
        uint256 orderId;
        bool wasDelivery;
        bool wasReceived;
        bool payOrder;
        uint256 stimedTime;
        string state; 
        uint256 userId;
    }
    
    // order 
    Order public order;
    uint256 limitTime;

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

    // modifyer stimed time is grate than now
    modifier isStimedTime(uint256 _stimedTime) {
        require(_stimedTime > block.timestamp);
        _;
    }

    // create event to emit current state of order by orderId
    event __OrderState(Order _order);
    
    // constructor of the contract
        constructor(uint256 _user, uint256 _orderId, uint256 _stimedTime, uint256 _limitTime) public  isStimedTime(_stimedTime) {
        owner = msg.sender;
        order.userId = _user;
        order.orderId = _orderId;
        order.payOrder = false;
        order.wasDelivery = false;
        order.wasReceived = false;
        order.stimedTime = _stimedTime;
        order.state = "created";
        limitTime = _limitTime;
    }

    // create a privete function to execute a update of the order state after stimedtime is passed 
    function updateOrderState(uint256 _time) private {
        // get the time of the execution
        uint256 time = block.timestamp + order.stimedTime;
        if(time < _time) {
            // update the state of the order
            order.state = "delayed order";
        }
        
        if (order.wasDelivery) {
            order.state = "delivered";
        }
        
        if (order.wasReceived) {
            order.state = "recived";
        }
        // if the order is delivery and recived
        if (order.wasDelivery && order.wasReceived) {
            order.state = "finished order";
            order.payOrder = true;
        }
        emit __OrderState(order);
    }

    // create a function to consult the state of the order
    function getOrderState(uint256 _orderId) public view isOrder(_orderId) returns(Order memory) {
        return order;
    }

    // update state delivery
    function updateDelivery(uint256 _orderId, uint256 _time) public isOrder(_orderId) {
        require(!order.wasDelivery, "Order already delivered");
        order.wasDelivery = true;
        order.state = "order delivery";
        updateOrderState(_time);
    }
    
    // update state consumer
    function updateRecived(uint256 _orderId, uint256 _time) public isOrder(_orderId) {
        require(!order.wasReceived, "Order already recived");
        order.wasReceived = true;
        order.state = "order recived";
        updateOrderState(_time);   
    }

    // cancel order if the order is not delivery and expired limit time
    function cancelOrder(uint256 _orderId) public isOrder(_orderId) onlyOwner() {
        require(block.timestamp < limitTime, "Order not expired");
        require(!order.wasDelivery, "Order not delivery");
        require(!order.wasReceived, "Order not recived");
        
        order.state = "canceled order";
        order.payOrder = false;
        
        emit __OrderState(order);
    }

}