let truffleAssert = require('truffle-assertions');
let Solicitud = artifacts.require('Solicitud');
let Propietario = artifacts.require('Propietario');
let Empresa = artifacts.require('Empresa');

contract('Solicitud', async (accounts) => {

    //Variables generales
    let tokenInstance;
    let empresa;
    let propietario;
    let solicitud;

    //Antes de cada test se inicializan
    beforeEach(async()=>{
        tokenInstance = await Solicitud.deployed();
        tokenPropietario = await Propietario.deployed();
        tokenEmpresa = await Empresa.deployed();
        empresa = accounts[5];
        propietario = accounts[6];
        solicitud = accounts[7];
        await tokenPropietario.addParcela(12,12,100, propietario, 1, {from:propietario});
        await tokenEmpresa.addDrone(12,12,100,20, empresa, 1, {from:empresa});
    });

    it('Test1: Crear Solicitud', async () => {
        let value = await tokenInstance.addSolicitud.call(propietario,1, {from:propietario});
        assert.equal(value, true, 'No se agrego la solicitud');
        value = await tokenInstance.addSolicitud(propietario,1, {from:propietario});
        truffleAssert.eventEmitted(value, 'LogAddSolicitud', (result) => {
            return result.solicitud.toNumber() > 0;
        }); 
    });

    it('Test2: Procesar solicitud', async () => {
        //Solicitud con drone disponible
        //Solicitud sin drone disponible
        //Validar evento
        //Validar cambio de estado drone
    });
})