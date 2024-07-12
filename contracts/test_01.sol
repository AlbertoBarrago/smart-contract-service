// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract InBox {
    string public message;
    address public owner;

    constructor() {
        message = "";
        owner = msg.sender;
    }

    function setMessage(string calldata newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}