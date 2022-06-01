// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract PrimerParcial {
    address private owner;
    bool private closed = false;
    event clientBuy(string name, address wallet, uint quantity);

    struct Product {
        uint id;
        string name;
        uint stock;
        uint price;
    }

    mapping(uint => Product) public listProducts;
    constructor() {
        owner = msg.sender;
    }

    function addProduct(Product memory productData) public onlyOwner(msg.sender) closedAmazon {
        require(bytes(productData.name).length > 5, "the name of product must be longer than 5 characters.");
        listProducts[productData.id] = Product(productData.id, productData.name, 0, productData.price);
    }

    function addQuantity(uint id, uint stock) public onlyOwner(msg.sender) closedAmazon {
        listProducts[id].stock += stock;
    }

    function closeOrOpenAmazon(bool value) public onlyOwner(msg.sender) {
        closed = value;
    }

    function withdrawAllMoney() public onlyOwner(msg.sender) closedAmazon {
        payable(msg.sender).transfer(address(this).balance);
    }

    function buyProduct(uint id, uint quantity) public payable closedAmazon {
        Product memory productData = listProducts[id];
        require((quantity * productData.price) <= convertWeiToEther(msg.value), "Insufficient funds");
        require(quantity <= productData.stock, "Insufficient units in stock");
        listProducts[productData.id].stock -= quantity;
        emit clientBuy(productData.name , msg.sender, quantity);
        if(quantity > 10) {
            payable(msg.sender).transfer(productData.price *quantity-1);
        }else{
            payable(msg.sender).transfer(productData.price *quantity);
        }
    }

    modifier onlyOwner(address wallet) {
        require(owner == wallet, "Only the owner is able to do this action");
        _;
    }

    modifier closedAmazon() {
        require(!closed, "Amazon store is closed at this moment ");
        _;
    }
    function convertWeiToEther(uint amountInWei) private pure returns(uint) {
        return amountInWei / 1 ether;
    }
}