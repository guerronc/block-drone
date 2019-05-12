let truffleAssert = require('truffle-assertions');
let Propietario = artifacts.require('Propietario');
let IronToken = artifacts.require('IronToken');

contract('Propietario', async (accounts) => {

    //Variables generales
    let tokenInstance;
    let admin;
    let tokenIron;
    let propietario;
    let empresa;
    let valorCompra;
    let valorPago;
    
    //Antes de cada test se inicializan
    beforeEach(async()=>{
        tokenInstance = await Propietario.deployed();
        tokenIron = await IronToken.deployed();
        admin = accounts[0];
        empresa = accounts[5];
        propietario = accounts[6];
        valorCompra = 100;
        valorPago = 55;
        let balance = await tokenIron.balanceOf(empresa);
        if(balance.toNumber()>0)
            await tokenIron.transfer(admin, balance, {from: empresa});
    });

    it('Test1: Crear propietario', async () =>{
        let value = await tokenInstance.addPropietario.call("Propietario A", {from:propietario});
        assert.equal(value, true, 'No se creo el propietario');
        value = await tokenInstance.addPropietario("Propietario A", {from:propietario});
        truffleAssert.eventEmitted(value, 'LogAddPropietario', (result) => {
            return result.propietario === propietario && result.nombre === "Propietario A";
        });
    });

    it('Test2: Comprar tokens', async ()=>{
        let transfer = await tokenIron.transfer(propietario, valorCompra, {from: admin});
        truffleAssert.eventEmitted(transfer, 'Transfer', (result) => {
            return result.from === admin && result.to === propietario && result.value.toNumber() == valorCompra;
        });
    });

    it('Test3: Saldo tokens propietario', async ()=>{
        let balance = await tokenInstance.getSaldo({from: propietario});
        truffleAssert.eventEmitted(balance, 'LogSaldoPropietario', (result) => {
            return result.propietario === propietario && result.valor.toNumber() === valorCompra;
        });
    });

    it('Test4: Pago a la empresa', async () =>{
        let transfer = await tokenIron.transfer(empresa, valorPago, {from:propietario});
        truffleAssert.eventEmitted(transfer, 'Transfer', (result) => {
            return result.from === propietario && result.to === empresa && result.value.toNumber() == valorPago;
        });
        let balance = await tokenIron.balanceOf(empresa);
        assert.equal(balance.toNumber(), valorPago);
        balance = await tokenIron.balanceOf(propietario);
        assert.equal(balance.toNumber(), valorCompra - valorPago)
    });

    it('Test5: Consultar propietarios', async ()=>{
        let value = await tokenInstance.getPropietario.call(propietario);
        assert.equal(value, "Propietario A", "No existe propietario");
    });

    it('Test6: Crear Parcela', async () => {
        let value = await tokenInstance.addParcela.call(12,12,100, propietario, 1, {from:propietario});
        assert.equal(value, true, 'No se agrego el drone');
        value = await tokenInstance.addParcela(12,12,100, propietario, 1, {from:propietario});
        truffleAssert.eventEmitted(value, 'LogAddParcela', (result) => {
            return result.propietario === propietario && result.parcela.toNumber() === 1;
        });
    });
})