const IronToken = require('../../build/contracts/IronToken');
const Web3 = require('web3');
const Config = require('./config');

const password = Config.password;
const web3 = new Web3(Config.url);

let accountIronToken = Config.accounts[0].account;
let addressIronToken = Config.contracts[0].contract;

//Desbloquear cuenta
DesbloquearCuenta(accountIronToken)
    .then(result => console.log(`Cuenta: ${accountIronToken} desbloqueada: ${result}`), (error) => {
        console.log(error);
    });

//Contrato
const contractIronToken = new web3.eth.Contract(IronToken.abi, addressIronToken, {
    defaultAccount: accountIronToken, // default from address
    defaultGasPrice: '0' // default gas price in wei, 20 gwei in this case
});

/**
 * Obtener el valor total de tokens distribuidos
 */
exports.totalSupply = async () => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.totalSupply().call({ from: accountIronToken })
            .then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
    });
};

/**
 * Obtener el balance de una cuenta 
 * @param {address de la cuenta} address
 */
exports.balanceOf = async (address) => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.balanceOf(address).call({ from: accountIronToken })
            .then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
    });
};

/**
 * Registrar a un tercero para autorizar transferencias
 * @param {Address del propietario} propietario
 * @param {Address del tercero que autoriza el propietario} tercero
 */
exports.allowance = async (propietario, tercero) => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.allowance(propietario, tercero)
            .call({
                from: accountIronToken,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }).then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
    });
};

/**
 * Transferir token a una address
 * @param {Address para depositar} address
 * @param {Valor a transferir} valor
 */
exports.transfer = async (address, valor) => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.transfer(address, valor)
            .send({
                from: accountIronToken,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractIronToken, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Aprobar a un tercero transferir un valor
 * @param {Address de tercero autorizado} tercero
 * @param {Valor autorizado} valor
 */
exports.approve = async (tercero, valor) => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.approve(tercero, valor)
            .send({
                from: accountIronToken,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractIronToken, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
            });
    });
};

/**
 * Transferir token entre dos address
 * @param {Address desde la que transfiere} addressDe
 * @param {Address a donde transfiere} addressPara
 * @param {Valor que se transfiere} valor
 */
exports.transferFrom = async (addressDe, addressPara, valor) => {
    return new Promise((resolve, reject) => {
        contractIronToken.methods.transferFrom(addressDe, addressPara, valor)
            .send({
                from: accountIronToken,
                gas: Config.gasLimit,
                gasPrice: web3.eth.defaultGasPrice
            }, (error, transactionHash) => {
                if (error) {
                    reject(error);
                } else {
                    Events(contractIronToken, transactionHash).then((result) => {
                        resolve(result);
                    });
                }
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