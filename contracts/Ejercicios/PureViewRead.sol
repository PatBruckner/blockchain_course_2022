// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PureViewRead {
    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddresses;

    function receiveMoney() public payable {
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMoney(uint amount) public {
        require (convertWeiToEther(amount) <= myAddresses[msg.sender], "Not enough money");
        myAddresses[msg.sender] -= convertWeiToEther(amount);
        address myWallet = msg.sender;
        payable(myWallet).transfer(convertWeiToEther(amount));
    }

    function convertWeiToEther(uint amount) public pure returns(uint) {
        return amount / 1 ether;
    }   

    function convertEtherToWei(uint amount) public pure returns(uint) {
        return amount * 1 ether;
    }   

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    function setMyAddresses(address wallet, uint amount) public {
        myAddresses[wallet] = amount;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}