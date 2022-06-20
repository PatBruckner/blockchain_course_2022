const Notes = artifacts.require("Notes");

contract("Notes", accounts => {
    let instance;
    beforeEach("deploys a contract", async () => {
        instance = await Notes.new();
    })

    it ("Evaluar", async () => {
        await instance. Evaluar ("Ricardo Pari", 5, {from: accounts[0]});
        const id = web3.utils.keccak256("Ricardo Pari");
        const note = await instance.Notas.call(id);
        assert.equal(5, note);
    })

    it("Only teacher", async () => {
        try {
            const id = web3.utils.keccak256("Paco Luis");
            await instance.Evaluar(id, 70, {from: accounts[8]});
            assert(false)
        } catch (e) {
            assert.equal("No tienes permisos para ejecutar esta funcion.", e.reason)
        }
    })
})