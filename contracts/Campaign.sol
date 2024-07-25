// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

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

    constructor(uint minimum, address creator) {
        manager = creator;
        minimalContribution = minimum;
        emit ManagerSet(address(0), manager);
    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function contribute() public payable {
        require(msg.value > minimalContribution, "Contribution is less than minimum amount");
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
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

        require(approvers[msg.sender], "You must be an approver to approve this request");
        require(!request.approvals[msg.sender], "You have already approved this request");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2), "Request must have majority approvals");
        require(!request.complete, "Request is already complete");

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
