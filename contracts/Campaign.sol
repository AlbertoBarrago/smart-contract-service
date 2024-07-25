// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.4;

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    mapping(address => bool) public approvers;
    uint public minimalContribution;
    uint public approversCount;

    event ManagerSet(address indexed oldOwner, address indexed newOwner);

    constructor(uint minimum) {
        manager = msg.sender;
        minimalContribution = minimum;
        emit ManagerSet(manager, msg.sender);
    }

    modifier restricted() {
        if (msg.sender == manager) _;
    }


    function contribute() public payable {
        require(msg.value > minimalContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        //if approvers exist
        require(approvers[msg.sender]);
        //if has already vote do nothing
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }


}