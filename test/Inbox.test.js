const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi');
    })

    it('setMessage', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage("Hi Ricardo", {from: accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi Ricardo');
    })

    it('setMessage should not change var message', async () => {
        try {
            const instance = await Inbox.deployed();
            await instance.setMessage("just owner", {from: accounts[1]});
        } catch (e) {
            assert.equal(e.reason, "Solo el owner puede modificar sus caracterisitcas");
        }
    })
})