
let truffleAssert = require('truffle-assertions');
let IronTokenSale = artifacts.require('IronTokenSale');
let IronToken = artifacts.require('IronToken');

contract('IronTokenSale', async (accounts) => {
    //Variables generales
    let tokenInstance;
    let token;
    let tokenPrice;
    let buyer;
    let numberOfTokens;
    let valueTokens;
    let admin;
    let tokensAvailable;
    let balanceAdmin;
    //Antes de cada test se inicializan
    beforeEach(async()=>{
        token = await IronToken.deployed();
        tokenInstance = await IronTokenSale.deployed();
        tokenPrice = 7270000000000000; //in wei
        buyer = accounts[5];
        numberOfTokens = 10;
        valueTokens = numberOfTokens * tokenPrice;
        admin = accounts[0];
        balanceAdmin = await token.balanceOf(admin);
        tokensAvailable = 100000;
    });

    it('Test1: Inicializar contrato con los valores correctos', async () => {
        let address = tokenInstance.address;
        assert.notEqual(address, 0x0, 'Se genero la direccion correcta');
        let contract = await tokenInstance.tokenContract();
        assert.notEqual(contract, 0x0, 'Se genero la direccion correcta del contrato');
        let price = await tokenInstance.tokenPrice();
        assert.equal(price, tokenPrice, "El precio es el correcto");
    });

    it('Test2: Coprar tokens', async () => {

        await token.transfer(tokenInstance.address, tokensAvailable, {from: admin});

        let buyTokens = await tokenInstance.buyTokens(numberOfTokens, { from: buyer, value: valueTokens });
        truffleAssert.eventEmitted(buyTokens, 'Sell', (result) => {
            return result.buyer === buyer && result.value.toNumber() == 10;
        });
  
        let amount = await tokenInstance.tokensSold();
        assert.equal(amount.toNumber(), numberOfTokens, 'Incrementa tokens vendidos');
        await tokenInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, "Error: Mensaje contiene Revert");
        });
        await tokenInstance.buyTokens(8000000, { from: buyer, value: 1 }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, "Error: Mensaje contiene Revert");
        });
        let balance = await token.balanceOf(tokenInstance.address);
        let balanceBuyer = await token.balanceOf(buyer);

        assert.equal(balance.toNumber(), 100000 - balanceBuyer, "tokenInstance.address: El monto no es el correcto");
        assert.equal(balanceBuyer.toNumber(), numberOfTokens, "buyer: El monto no es el correcto");
    });

    /*it('Test3: Finalizar venta', async ()=>{
        await tokenInstance.endSale({from: buyer}).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, "Error: Mensaje contiene Revert");
        });
        await tokenInstance.endSale({from: admin});
        let balance = await token.balanceOf(admin);
        assert.equal(balance.toNumber(), balanceAdmin.toNumber() + (tokensAvailable - numberOfTokens), "El balance no es correcto");
        let price = await tokenInstance.tokenPrice();
        assert.equal(price.toNumber(), 0, "No se reinicio el precio");
    });*/
})