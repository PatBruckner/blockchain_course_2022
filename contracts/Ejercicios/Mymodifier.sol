// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ModifierExample {
    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddresses;

    function setValue(uint index, bool value) public {
        myMapping[index] = value;
    }

    function setMyAddresses(address wallet, uint amount) public {
        myAddresses[wallet] = amount;
    }
}