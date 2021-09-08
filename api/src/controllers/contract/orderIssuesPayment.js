module.exports = ({web3Instance,app,response,message, services}) => {
    return {
        createIssue: (req, res) => { createIssue({req, res, response, message, services, web3Instance}) },
        getStateOrder: (req, res) => { getStateOrder({req, res, response, message, services, web3Instance}) },
        updateReview: (req, res) => { updateStateReview({req, res, response, message, services, web3Instance}) },
        updateReverse: (req, res) => { updateReversePayment({req, res, response, message, services, web3Instance}) },
    }
}

// craete and deploy contract of issues
async function createIssue({req, res, response, message, services, web3Instance}) {
    try {
        const { account, bytecode, interface, userId, orderId  } = req.body;

        const result = await new web3Instance.eth.Contract(interface)
            .deploy({ 
                data: bytecode,
                arguments: [userId, orderId]
            })
            .send({ 
                from: account,
                gas: '3000000',
                gasPrice: '20000000000',
            });

        const issue = {
            userId: userId,
            orderId: orderId,
            address: result.options.address,
            interface: interface,
            payOrder: true,
            reversionPayment:false,
            state:"order issue payment",
        }
      
        const issueCreated = services.issueService.saveOrderIssues(issue);

        res.status(200).json(response.success(issueCreated,message.MESSAGE_CREATED))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

// get current state of order
async function getStateOrder({req, res, response, message, services, web3Instance}) {
    try {
        const orderId = (req.params.id*1);
        const {account} = req.body;
        const issue = await services.issueService.getOrderById(orderId);

        const instanceContract = await new web3Instance.eth.Contract(issue.interface, issue.address);

        instanceContract.methods.getOrderState(issue.orderId).call({from: account}, function(error, result){
            
            if (error) {
                res.status(500).send(response.fail(error))
            }
            
            res.status(200).json(response.success(result,message.MESSAGE_GET))
            
        });

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

// update review of order
async function updateStateReview({req, res, response, message, services, web3Instance}) {
    try {
        const { account, orderId } = req.body;
        const issueNumber = (orderId*1);
        // obtain information about the order to make a transaction on the current contract
        const order = await services.issueService.getOrderById(issueNumber);
        // create the instance of the contract
        const instanceContract = await new web3Instance.eth.Contract(order.interface, order.address);
        // invoke the method to update the state of the order
        instanceContract.methods
            .setOrderReviewd(order.orderId)
            .send({from: account})
            .then(transactionHash => {
                res.status(200).json(response.success(transactionHash,message.MESSAGE_UPDATE))
            })
            .catch(error => res.status(500).send(response.fail(error)))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

// update reverse payment of order
async function updateReversePayment({req, res, response, message, services, web3Instance}) {
    try {
        const { account, orderId } = req.body;
        const issueNumber = (orderId*1);
        // obtain information about the order to make a transaction on the current contract
        const order = await services.issueService.getOrderById(issueNumber);
        // create the instance of the contract
        const instanceContract = await new web3Instance.eth.Contract(order.interface, order.address);
        // invoke the method to update the state of the order
        instanceContract.methods
            .setOrderMakeReversionPayment(order.orderId)
            .send({from: account})
            .then(transactionHash => {
                res.status(200).json(response.success(transactionHash,message.MESSAGE_UPDATE))
            })
            .catch(error => res.status(500).send(response.fail(error)))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}
