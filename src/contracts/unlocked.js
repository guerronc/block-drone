const Web3 = require('web3');
const Config = require('./config');

const password = Config.password;
const web3 = new Web3(Config.url);


start();

async function start(){

    await web3.eth.getAccounts().then((accounts) => {
        console.log('Accounts: ', accounts);
    });

    await web3.eth.getAccounts().then((accounts) => {
        accounts.forEach(account => {
            //Desbloquear cuenta
            DesbloquearCuenta(account)
                .then(result => console.log(`Cuenta: ${account} desbloqueada: ${result}`), (error) => {
                    console.log(error);
                });
        });
    });
}



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