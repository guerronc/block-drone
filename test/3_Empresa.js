let truffleAssert = require('truffle-assertions');
let Empresa = artifacts.require('Empresa');
let IronToken = artifacts.require('IronToken');

contract('Empresa', async (accounts) => {

    //Variables generales
    let tokenInstance;
    let admin;
    let tokenIron;
    let saldoPrueba;
    let empresa;
    
    //Antes de cada test se inicializan
    beforeEach(async()=>{
        tokenInstance = await Empresa.deployed();
        tokenIron = await IronToken.deployed();
        admin = accounts[0];
        saldoPrueba = 100;
        empresa = accounts[5];
        let balance = await tokenIron.balanceOf(empresa);
        if(balance.toNumber()>0)
            await tokenIron.transfer(admin, balance, {from: empresa});
    });

    it('Test1: Crear Drone', async () => {
        let value = await tokenInstance.addDrone.call(12,12,100,20, empresa, 1, {from:empresa});
        assert.equal(value, true, 'No se agrego el drone');
        value = await tokenInstance.addDrone(12,12,100,20, empresa, 1, {from:empresa});
        truffleAssert.eventEmitted(value, 'LogAddDrone', (result) => {
            return result.empresa === empresa && result.drone.toNumber() === 1;
        });
    });

    it('Test2: Validar disponibilidad drone', async ()=>{
        let value = await tokenInstance.getDroneDisponible.call(1,{from:empresa});
        assert.equal(value[0].toNumber(), 1, 'No esta disponible');
        value = await tokenInstance.getDroneDisponible(1,{from:empresa});
        truffleAssert.eventEmitted(value, 'LogDroneDisponible', (result) => {
            return result.drone.toNumber() > 0;
        });
    });

    it('Test3: Cambiar disponibilidad', async ()=>{
        let value = await tokenInstance.setDroneDisponible.call(1, true, {from:empresa});
        assert.equal(value, true, 'No cambio disponiblidad');
        value = await tokenInstance.setDroneDisponible.call(1, false, {from:empresa});
        assert.equal(value, false, 'No cambio disponiblidad');
    });

    it('Test5: Crear empresa', async () =>{
        let value = await tokenInstance.addEmpresa.call("Empresa A", {from:empresa});
        assert.equal(value, true, 'No se creo la empresa');
        value = await tokenInstance.addEmpresa("Empresa A", {from:empresa});
        truffleAssert.eventEmitted(value, 'LogAddEmpresa', (result) => {
            return result.empresa === empresa && result.nombre === "Empresa A";
        });
    });

    it('Test6: Saldo tokens empresa', async ()=>{
        let transfer = await tokenIron.transfer(empresa, saldoPrueba, {from:admin});
        truffleAssert.eventEmitted(transfer, 'Transfer', (result) => {
            return result.from === admin && result.to === empresa && result.value.toNumber() == saldoPrueba;
        });
        let balance = await tokenInstance.getSaldo({from: empresa});
        truffleAssert.eventEmitted(balance, 'LogSaldoEmpresa', (result) => {
            return result.empresa === empresa && result.valor.toNumber() === saldoPrueba;
        });
    });

    it('Test7: Obtener nombre de la empresa', async () =>{
        let value = await tokenInstance.getEmpresa.call(empresa); 
        assert.equal(value, "Empresa A", "No existe empresa");
    });

})