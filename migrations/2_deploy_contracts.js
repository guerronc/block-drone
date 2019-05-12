const IronToken = artifacts.require("IronToken");
const IronTokenSale = artifacts.require("IronTokenSale");
const SafeMath = artifacts.require("SafeMath");
const IERC20 = artifacts.require("IERC20");
const Drone = artifacts.require("Drone");
const Empresa = artifacts.require("Empresa");
const Propietario = artifacts.require("Propietario");
const Parcela = artifacts.require("Parcela");
const Solicitud = artifacts.require("Solicitud");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SafeMath);
  deployer.deploy(IERC20);
  deployer.deploy(Drone);
  deployer.deploy(Parcela);
};

//Deployar en grupos por el gasLimit de cada bloque (Depende de la red)
module.exports = function (deployer, network, accounts) {

  let tokenPrice = 7270000000000000; //Token price is 0.00727 Ether / 1 Dolar USD

  deployer.deploy(IronToken, 1000000, { from: accounts[0] }).then(() => {
    return deployer.deploy(IronTokenSale, IronToken.address, tokenPrice, { from: accounts[0] });
  }).then(() => {
    return deployer.deploy(Empresa, IronToken.address, { from: accounts[1] });
  }).then(() => {
    return deployer.deploy(Propietario, IronToken.address, { from: accounts[2] });
  }).then(() => {
    return deployer.deploy(Solicitud, IronToken.address, Empresa.address, Propietario.address, { from: accounts[3] });
  });

};