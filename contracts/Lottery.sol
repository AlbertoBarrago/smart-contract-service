// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    event ManagerSet(address indexed oldOwner, address indexed newOwner);

    constructor() {
        manager = msg.sender;
        emit ManagerSet(manager, msg.sender);
    }

    function enter() public payable  {
        require(msg.value > .01 ether, "You need to send at least 0.01 ether to enter");
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
    }

    function pickWinner() public requireManager {
        require(msg.sender == manager, "Only manager can pick winner");
        uint256 randomIndex = random() % players.length;
        address payable winner = payable(players[randomIndex]);
        winner.transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier requireManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }
}
