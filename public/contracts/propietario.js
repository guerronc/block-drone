const Propietario = require('../../build/contracts/Propietario');
const Web3 = require('web3');
const Config = require('./config');

const password = Config.password;
const web3 = new Web3(Config.url);

let accountPropietario = Config.accounts[2].account;
let addressPropietario = Config.contracts[2].contract;

//Desbloquear cuenta
DesbloquearCuenta(accountPropietario)
    .then(result => console.log(`Cuenta: ${accountPropietario} desbloqueada: ${result}`), (error) => {
        console.log(error);
    });

//Contrato
const contractPropietario = new web3.eth.Contract(Propietario.abi, addressPropietario, {
    defaultAccount: accountPropietario, // default from address
    defaultGasPrice: '0', // default gas price in wei, 20 gwei in this case
});

/**
 * Agregar un nuevo propietario
 * @param {Nombre del propietario} nombre
 */
exports.addPropietario = async (nombre) => {
    return new Promise((resolve, reject) => {
        contractPropietario.methods.addPropietario(nombre)
            .send({
                from: accountPropietario,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractPropietario, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Obtener el saldo del propietario
 */
exports.getSaldo = async () => {
    return new Promise((resolve, reject) => {
        contractPropietario.methods.getSaldo()
            .send({
                from: accountPropietario,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractPropietario, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Obtener el nombre del propietario
 */
exports.getPropietario = async () => {
    return new Promise((resolve, reject) => {
        contractPropietario.methods.getPropietario(accountPropietario).call({ from: accountPropietario })
            .then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
    });
};

/**
 * Agregar una nueva parcela
 * @param {Longitud de la parcela en metros} longitud
 * @param {Altuma maxima permitida por la parcela} alturaMaxima
 * @param {Altura minima permitida por la parcela} alturaMinima
 * @param {Identificador del pesticida} pesticida
 */
exports.addParcela = async (longitud, alturaMaxima, alturaMinima, pesticida) => {
    return new Promise((resolve, reject) => {
        contractPropietario.methods.addParcela(longitud, alturaMaxima, alturaMinima, accountPropietario, pesticida)
            .send({
                from: accountPropietario,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractPropietario, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Obtener datos de una parcela
 * @param {Identificador de la parcela} parcela
 */
exports.getParcela = async (parcela) => {
    return new Promise((resolve, reject) => {
        contractPropietario.methods.getParcela(parcela).call({ from: accountPropietario })
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