// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Inbox {

    string public message;
    address private ownerAdress;

    constructor(string memory initialMessage) {
        ownerAdress = msg.sender;
        message = initialMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        require(msg.sender == ownerAdress, "Solo el owner puede modificar sus caracteristicas.");
        message = newMessage;
    }
}