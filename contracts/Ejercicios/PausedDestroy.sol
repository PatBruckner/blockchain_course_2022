// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PausedDestroy {
    address private owner;
    bool public paused;

    constructor() {
        owner = msg.sender;
    }

    function depositMoney() public payable {

    }

    function setPaused(bool value) public {
        paused = value;
    }

    function withdrawAllMoney(address payable to) public {
        require(owner == msg.sender, "No es el duenho");
        require(!paused, "Contract is pasued");
        to.transfer(address(this).balance);
    }

    function destroyContract(address payable to) public {
        //require(owner == msg.sender, "No es el duenho");
        //require(!paused, "Contract is pasued");
        selfdestruct(to);
    }
}