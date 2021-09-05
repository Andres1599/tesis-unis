// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NoDeliveryOrder {

    // this is the owner of the contract
    address private owner;
    
    // struct to define a order to be processed and have issues
    struct OrderInConflict {
        string state;
        bool isDelivery;
        bool isRecivedByConsumer;
        bool isDeliveryBySupplier;
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

    // modifier that verifies if the order exist on the list
    modifier orderExist(string memory _orderToken) {
        // get order 
        OrderInConflict storage order = orders[_orderToken];
        // if order exist
        if (order.state) {
            _;
        } else {
            revert();
        }
    }

    // create event to emit current state of order
    event OrderState(string indexed _orderToken, string indexed _state);
    
    // constructor of the contract
    constructor() public {
        owner = msg.sender;
    }

    // create a new order
    function createOrder(string memory _orderToken, string memory _state) public payable onlyOwner {
        orders[_orderToken] = OrderInConflict(_state, true, false, false);
    }

    // get order in conflict 
    function getOrderInConflict(string memory _orderToken) public view  returns (string memory) {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // return timestamp and state
        return order.state;
    }

    // function to update the state of the order
    function updateOrderState(string memory _orderToken, string memory _state) external {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // update state
        order.state = _state;
        // update order
        orders[_orderToken] = order;
        // emit event
        emit OrderState(_orderToken, _state);
    }

    // function tu update isRecivedByConsumer
    function updateIsRecivedByConsumer(string memory _orderToken, bool _isRecivedByConsumer) external {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // update isRecivedByConsumer
        order.isRecivedByConsumer = _isRecivedByConsumer;
        // update order
        orders[_orderToken] = order;
    }

    // function to update isDeliveryBySupplier
    function updateIsDeliveryBySupplier(string memory _orderToken, bool _isDeliveryBySupplier) external {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // update isDeliveryBySupplier
        order.isDeliveryBySupplier = _isDeliveryBySupplier;
        // update order
        orders[_orderToken] = order;
    }

    // function to close order conflict 
    // then the order is closed
    function closeOrderConflict(string memory _orderToken) public payable onlyOwner {
        // get order
        OrderInConflict memory order = orders[_orderToken];
        // if the order isDelivery and isRecivedByConsumer is false and isDeliveryBySupplier is true
        // update order
        orders[_orderToken] = order;
    }

}