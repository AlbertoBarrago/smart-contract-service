// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {
    // Mapping of usernames to public keys
    mapping(string => address) private users;

    event UserRegistered(string username, address publicKey);

    // Register a new user with a username and public key, cost Gas === 462931
    function registerUser(string memory username) public {
        require(users[username] == address(0), "Username already taken");
        users[username] = msg.sender;
        emit UserRegistered(username, msg.sender);
    }

    // Authenticate user by verifying their public key, cost Gas === 55232
    function authenticateUser(string memory username) public view returns (bool) {
        return users[username] == msg.sender;
    }

    // Retrieve the public key associated with a username, cost Gas === No cost
    function getPublicKey(string memory username) public view returns (address) {
        return users[username];
    }
}
