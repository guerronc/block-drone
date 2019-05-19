var IronToken = require('./ironToken');
var Empresa = require('./empresa');
var Propietario = require('./propietario');
var Solicitud = require('./solicitud');
const Config = require('./config');

let accountIronToken = Config.accounts[0].account;
let accountEmpresa = Config.accounts[1].account;
let accountPropietario = Config.accounts[2].account;

async function startIronToken() {

    await IronToken.totalSupply().then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado totalSupply: ', result);
    }, (error) => {
        console.log(error);
    });

    await IronToken.balanceOf(accountIronToken).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado balanceOf: ', result);
    }, (error) => {
        console.log(error);
    });

    await IronToken.allowance(accountIronToken, accountPropietario).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado allowance: ', result);
    }, (error) => {
        console.log(error);
    });

    result = await IronToken.transfer(accountPropietario, 100).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado transfer: ', result);
    }, (error) => {
        console.log(error);
    });

    result = await IronToken.approve(accountPropietario, 100).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado approve: ', result);
    }, (error) => {
        console.log(error);
    });

    /*  result = await IronToken.transferFrom(accountPropietario, accountEmpresa, 50).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado transferFrom: ', result);
     }, (error) => {
         console.log(error);
     }); */
}

async function startEmpresa() {

    await Empresa.addEmpresaEvent("Empresa B").then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado addEmpresa: ', result);
    }, (error) => {
        console.log(error);
    });

    // await Empresa.addEmpresa("Empresa B").then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado addEmpresa: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.getEmpresa().then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado getEmpresa: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.getSaldo().then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado getSaldo: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.addDrone(100, 100, 200, 10, 1).then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado addDrone: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.getDrone(1).then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado getDrone: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.getDroneDisponible(1).then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado getDroneDisponible: ', result);
    // }, (error) => {
    //     console.log(error);
    // });

    // result = await Empresa.setDroneDisponible(1, true).then((result) => {
    //     console.log('-----------------------------------------------------------');
    //     console.log('Resultado setDroneDisponible: ', result);
    // }, (error) => {
    //     console.log(error);
    // });
}

async function startPropietario() {

    await Propietario.addPropietario("Propietario 1").then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado addPropietario: ', result);
    }, (error) => {
        console.log(error);
    });

    await Propietario.getSaldo().then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado getSaldo: ', result);
    }, (error) => {
        console.log(error);
    });

    await Propietario.getPropietario().then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado getPropietario: ', result);
    }, (error) => {
        console.log(error);
    });

    await Propietario.addParcela(100, 100, 200, 1).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado addParcela: ', result);
    }, (error) => {
        console.log(error);
    });

    await Propietario.getParcela(1).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado getParcela: ', result);
    }, (error) => {
        console.log(error);
    });
}

async function startSolicitud() {

    await Solicitud.addSolicitud(1).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado addSolicitud: ', result);
    }, (error) => {
        console.log(error);
    });

    await Solicitud.buscarDroneDisponible(1).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado buscarDroneDisponible: ', result);
    }, (error) => {
        console.log(error);
    });

    await Solicitud.procesarSolicitud(2).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado procesarSolicitud: ', result);
    }, (error) => {
        console.log(error);
    });

    await Solicitud.getPesticida(1).then((result) => {
        console.log('-----------------------------------------------------------');
        console.log('Resultado getPesticida: ', result);
    }, (error) => {
        console.log(error);
    });
}

// startIronToken();
startEmpresa();
// startPropietario();
//startSolicitud();