// SPDX-License-Identifier:GPL-3.0
pragma solidity 0.8.14;
contract Inbox{
    string public message;
    address private ownerAddress;
    constructor(string memory initialMessage){
        ownerAddress=msg.sender;
        message=initialMessage;
    }
    function getMessage()public view onlyOwner(msg.sender)returns(string memory){
        return message;
    }
    function setMessage(string memory newMessage)public onlyOwner(msg.sender){
        message=newMessage;
    }
    modifier onlyOwner(address client){
        require(client== ownerAddress,"Solo el Owner puede modificar el mensaje.");
        _;
    }
}
