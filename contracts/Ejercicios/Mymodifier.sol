// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ModifierExample {
    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddresses;

    function receiveMoney() public payable {
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMoney(uint amount) public {
        uint amountToEther = amount * (10 ** 18);
        require (amountToEther <= myAddresses[msg.sender], "Not enough money");
        myAddresses[msg.sender] -= amount * (10**18);
        address myWallet = msg.sender;
        payable(myWallet).transfer(amount * (10**18));

        //  if (amountToEther <= myAddresses[msg.sender]) {
        //      myAddresses[msg.sender] -= amount * (10**18);
        //      address myWallet = msg.sender;
        //      payable(myWallet).transfer(amount * (10**18));
        //  }
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