const Inbox = artifacts.require('Inbox')

contract('inbox',accounts=>{
 //Tarea1 unit test getMesssage() setMessage()
    it('getMessage',async ()=>{

        const instance = await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message,'HI')

    });

    it('setMessage', async () =>{
        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Paolo',{from:accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message,'Hi Paolo')
    });

})