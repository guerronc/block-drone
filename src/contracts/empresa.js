const Empresa = require("../../build/contracts/Empresa");
const Web3 = require("web3");
const Config = require("./config");

const password = Config.password;
const web3 = new Web3(Config.url,null,Config.options);

let accountEmpresa = Config.accounts[1].account;
let addressEmpresa = Config.contracts[1].contract;

//Desbloquear cuenta
DesbloquearCuenta(accountEmpresa).then(
  result => console.log(`Cuenta: ${accountEmpresa} desbloqueada: ${result}`),
  error => {
    console.log(error);
  }
);

//Contrato
const contractEmpresa = new web3.eth.Contract(Empresa.abi, addressEmpresa, {
  defaultAccount: accountEmpresa, // default from address
  defaultGasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
});

exports.addEmpresaPromise = async nombre => {
  // using the promise
  contractEmpresa.methods
    .addEmpresa(nombre)
    .send({
      from: accountEmpresa,
      gas: Config.gasLimit,
      gasPrice: web3.eth.defaultGasPrice
    })
    .then(receipt => {
      console.log(receipt);
      // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    })
    .catch(error => {
      console.log(error);
    });
};

exports.addEmpresaEvent = async nombre => {
  // using the event emitter
  contractEmpresa.methods
    .addEmpresa(nombre)
    .send({
      from: accountEmpresa,
      gas: Config.gasLimit,
      gasPrice: web3.eth.defaultGasPrice
    })
    .on("transactionHash", hash => {
      console.log("transactionHash: ", hash);
    })
    .on("receipt", receipt => {
      // receipt example
      console.log("receipt: ", receipt);
    })
    .on("confirmation", confirmationNumber => {
      console.log("confirmation: ", confirmationNumber);
    })
    //.on("error", console.error)
    .then(receipt => {
      console.log(receipt);
    })
    .catch(error => {
      console.log(error);
    }); // If there's an out of gas error the second parameter is the receipt.
};

/**
 * Agregar una empresa
 * @param {Nombre de la empresa} nombre
 */
exports.addEmpresa = async nombre => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods.addEmpresa(nombre).send(
      {
        from: accountEmpresa,
        gas: Config.gasLimit,
        gasPrice: web3.eth.defaultGasPrice
      },
      (error, transactionHash) => {
        if (error) {
          reject(error);
        } else {
          Events(contractEmpresa, transactionHash).then(result => {
            resolve(result);
          });
        }
      }
    );
  });
};

/**
 * Obtener nombre de la empresa
 */
exports.getEmpresa = async () => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods
      .getEmpresa(accountEmpresa)
      .call({ from: accountEmpresa })
      .then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
  });
};

/**
 * Obtener saldo de la empresa
 */
exports.getSaldo = async () => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods.getSaldo().send(
      {
        from: accountEmpresa,
        gas: Config.gasLimit,
        gasPrice: web3.eth.defaultGasPrice
      },
      (error, transactionHash) => {
        if (error) {
          reject(error);
        } else {
          Events(contractEmpresa, transactionHash).then(result => {
            resolve(result);
          });
        }
      }
    );
  });
};

/**
 * Agregar un drone
 * @param {Altura maxima del drone} alturaMaxima
 * @param {Altura altura del drone} alturaMinima
 * @param {Autonomia de vuelo del drone} autonomia
 * @param {Costo por el vuelo realizado} costo
 * @param {Identificador del pesticida que suministra} pesticida
 */
exports.addDrone = async (
  alturaMaxima,
  alturaMinima,
  autonomia,
  costo,
  pesticida
) => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods
      .addDrone(
        alturaMaxima,
        alturaMinima,
        autonomia,
        costo,
        accountEmpresa,
        pesticida
      )
      .send(
        {
          from: accountEmpresa,
          gas: Config.gasLimit,
          gasPrice: web3.eth.defaultGasPrice
        },
        (error, transactionHash) => {
          if (error) {
            reject(error);
          } else {
            Events(contractEmpresa, transactionHash).then(result => {
              resolve(result);
            });
          }
        }
      );
  });
};

exports.getDrone = async drone => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods
      .getDrone(drone)
      .call({ from: accountEmpresa })
      .then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
  });
};

exports.getDroneDisponible = async pesticida => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods.getDroneDisponible(pesticida).send(
      {
        from: accountEmpresa,
        gas: Config.gasLimit,
        gasPrice: web3.eth.defaultGasPrice
      },
      (error, transactionHash) => {
        if (error) {
          reject(error);
        } else {
          Events(contractEmpresa, transactionHash).then(result => {
            resolve(result);
          });
        }
      }
    );
  });
};

exports.setDroneDisponible = async (drone, disponible) => {
  return new Promise((resolve, reject) => {
    contractEmpresa.methods.setDroneDisponible(drone, disponible).send(
      {
        from: accountEmpresa,
        gas: Config.gasLimit,
        gasPrice: web3.eth.defaultGasPrice
      },
      (error, transactionHash) => {
        if (error) {
          reject(error);
        } else {
          Events(contractEmpresa, transactionHash).then(result => {
            resolve(result);
          });
        }
      }
    );
  });
};

/**
 * Desbloquear cuentas
 * @param {Cuenta ethereum para desbloquear} account
 */
function DesbloquearCuenta(account) {
  return new Promise((resolve, reject) => {
    web3.eth.personal.unlockAccount(account, password, 6000).then(
      result => {
        resolve(result);
      },
      error => {
        reject(error);
      }
    );
  });
}

/**
 * Metodo para buscar eventos de un contrato por hash
 * @param {Contrato para buscar eventos} myContract
 * @param {Hash de la transaccion} txHash
 */
function Events(myContract, txHash) {
  return new Promise((resolve, reject) => {
    myContract
      .getPastEvents(
        "allEvents",
        {
          fromBlock: 0,
          toBlock: "latest"
        },
        (error, events) => {
          if (error) {
            console.log(error);
          }
        }
      )
      .then(events => {
        events.forEach(event => {
          if (event.transactionHash == txHash) {
            resolve(event.returnValues);
          }
        });
      });
  });
}
