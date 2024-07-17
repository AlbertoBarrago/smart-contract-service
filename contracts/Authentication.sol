// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {
    mapping(string => address) private users;

    event UserRegistered(string username, address publicKey);

    function registerUser(string memory username) public {
        require(users[username] == address(0), "Username already taken");
        users[username] = msg.sender;
        emit UserRegistered(username, msg.sender);
    }

    function authenticateUser(string memory username) public view returns (bool) {
        return users[username] == msg.sender;
    }

    function getPublicKey(string memory username) public view returns (address) {
        return users[username];
    }
}
