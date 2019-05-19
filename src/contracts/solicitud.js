const Solicitud = require('../../build/contracts/Solicitud');
const Web3 = require('web3');
const Config = require('./config');

const password = Config.password;
const web3 = new Web3(Config.url);

let accountSolicitud = Config.accounts[3].account;
let addressSolicitud = Config.contracts[3].contract;

let accountPropietario = Config.accounts[2].account;
let accountEmpresa = Config.accounts[1].account;

//Desbloquear cuenta
DesbloquearCuenta(accountSolicitud)
    .then(result => console.log(`Cuenta: ${accountSolicitud} desbloqueada: ${result}`), (error) => {
        console.log(error);
    });

//Contrato
const contractSolicitud = new web3.eth.Contract(Solicitud.abi, addressSolicitud, {
    defaultAccount: accountSolicitud, // default from address
    defaultGasPrice: '0', // default gas price in wei, 20 gwei in this case
});

/**
 * Agregar una nueva solicitud por el propietario
 * @param {Identificador de la parcela} parcela
 */
exports.addSolicitud = async (parcela) => {
    return new Promise((resolve, reject) => {
        contractSolicitud.methods.addSolicitud(accountPropietario, parcela)
            .send({
                from: accountPropietario,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractSolicitud, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Buscar drones disponibles para una solicitud
 * @param {Identificador de la solicitud} solicitud
 */
exports.buscarDroneDisponible = async (solicitud) => {
    return new Promise((resolve, reject) => {
        contractSolicitud.methods.buscarDroneDisponible(solicitud)
            .send({
                from: accountPropietario,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error.message);
                } else {
                    Events(contractSolicitud, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Procesar solicitud de una empresa
 * @param {Identificador de la solicitud} solicitud
 */
exports.procesarSolicitud = async (solicitud) => {
    return new Promise((resolve, reject) => {
        contractSolicitud.methods.procesarSolicitud(solicitud)
            .send({
                from: accountEmpresa,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractSolicitud, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Buscar pesticida por identificador
 * @param {Identificador de pesticida} pesticida
 */
exports.getPesticida = async (pesticida) => {
    return new Promise((resolve, reject) => {
        contractSolicitud.methods.getPesticida(pesticida).call({ from: accountSolicitud })
            .then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
    });

};

/**
 * Desbloquear cuentas
 * @param {Cuenta ethereum para desbloquear} account 
 */
function DesbloquearCuenta(account) {
    return new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(account, password, 6000).then((result) => {
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

/**
 * Metodo para buscar eventos de un contrato por hash
 * @param {Contrato para buscar eventos} myContract 
 * @param {Hash de la transaccion} txHash 
 */
function Events(myContract, txHash) {
    return new Promise((resolve, reject) => {
        myContract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => {
            if (error) {
                console.log(error);
            }
        }).then((events) => {
            events.forEach(event => {
                if (event.transactionHash == txHash) {
                    resolve(event.returnValues);
                }
            });
        });
    });
};