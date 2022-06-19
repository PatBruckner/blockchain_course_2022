const Notes = artifacts.require('Notes');

contract("Notes",accounts=>{

    let instance;

    beforeEach("Deploy contract from 0",async ()=>{
        instance = await Notes.new();
    })

    it("Evaluar", async () => {
        await instance.Evaluar("Ricardo Pari", 5, { from: accounts[0] });
        const id = web3.utils.keccak256("Ricardo Pari");
        const note = await instance.Notas.call(id);
        assert.equal(5, note);
    });
})