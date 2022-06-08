const Lottery = artifacts.require('Lottery');

contract("Lottery",accounts=>{

    let instance;

    beforeEach("Deploy contract from 0",async ()=>{
         instance = await Lottery.new();
    })

    it("Allows an account to enter lottery", async()=>{

        await instance.enter({from:accounts[1], value: web3.utils.toWei("3","ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1],players[0]);
        assert.equal(1,players.length);
    })

    it("Allows multiple accounts to enter lottery", async()=>{

        await instance.enter({from:accounts[0], value: web3.utils.toWei("3","ether")});
        await instance.enter({from:accounts[1], value: web3.utils.toWei("3","ether")});
        await instance.enter({from:accounts[2], value: web3.utils.toWei("3","ether")});
        const players = await instance.getPlayers.call();

        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
    })

    it("Requires a min amount of ether", async()=>{

        try {
            await instance.enter({from: accounts[1], value: 0});
            assert(false);
        }catch (e) {
            assert.equal("Necesitas minimo 2.1 Eth para entrar",e.reason)
        }
    })

    it("Only manager can picka  winner", async()=>{
        try {
            await instance.pickWinner({from: accounts[8]})
            assert(false);
        }catch (e) {
            assert.equal("No eres el owner",e.reason)
        }

    })

    it("Send money to winnner then reset lottery game", async()=>{
        const initialBalancePlayer= web3.eth.getBalance(accounts[1]);
        await instance.enter({from:accounts[1], value: web3.utils.toWei("3","ether")});
        const initialBalanceContract= web3.eth.getBalance(instance.address);
        await instance.pickWinner({from: accounts[0]})

        const finalBalancePlayer=web3.eth.getBalance(accounts[1]);
        const finalBalanceContract=web3.eth.getBalance(instance.address);
        const difference = finalBalancePlayer- initialBalanceContract;
        assert(difference > web3.utils.toWei("2.5","ether"));

    })

})