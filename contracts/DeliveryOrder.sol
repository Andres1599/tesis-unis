// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeliveryOrder {

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
    Order public order;

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
    constructor(uint256 _user, uint256 _orderId, uint256 _time) public  isStimedTime(_time) {
        // set the owner of the contract on the global variable owner
        owner = msg.sender;
        // set the order
        order.userId = _user;
        order.orderId = _orderId;
        order.payOrder = false;
        order.wasDelivery = false;
        order.wasRecived = false;
        order.stimedTime = _time;
        order.state = "created";
    }

    // create a privete function to execute a update of the order state after stimedtime is passed 
    function updateOrderState() private {
        // get the time of the execution
        uint256 time = block.timestamp;
        // get the time of the order
        uint256 orderTime = order.stimedTime;
        // get the time difference between the execution and the order
        uint256 timeDiff = time - orderTime;
        
        // if the time difference is greater than the stimed time
        if(timeDiff > order.stimedTime) {
            // update the state of the order
            order.state = "delayed order";
            // if the time difference is grated than 20% of the stimed time
            /* if(timeDiff > (order.stimedTime * 20/100)) {
                // update the state of the order
                order.state = "canceled order";
                order.payOrder = false;
            } */
        }

        // if the order is delivery and recived
        if (order.wasDelivery && order.wasRecived) {
            order.state = "finished order";
            order.payOrder = true;
        }

        // if the order is delivery and not recived
        if (order.wasDelivery && !order.wasRecived) {
            order.state = "delivered order conflic | cancel";
            order.payOrder = false;
        }

        emit __OrderState(order);
    }

    // create a function to consult the state of the order
    function getOrderState(uint256 _orderId) public view isOrder(_orderId) returns(Order memory) {
        return order;
    }

    // update state delivery
    function updateDelivery(uint256 _orderId) public isOrder(_orderId) {
        order.wasDelivery = true;
        updateOrderState();
    }
    
    // update state consumer
    function updateRecived(uint256 _orderId) public isOrder(_orderId) {
        order.wasRecived = true;
        updateOrderState();
    }

}