
let truffleAssert = require('truffle-assertions');
let IronToken = artifacts.require('IronToken');

contract('IronToken', async (accounts) => {
    //Variables generales
    let tokenInstance;
    let fromAccount;
    let toAccount;
    let spendingAccount;
    //Antes de cada test se inicializan
    beforeEach(async()=>{
        tokenInstance = await IronToken.deployed();
        fromAccount = accounts[2];
        toAccount = accounts[3];
        spendingAccount = accounts[4];
    });

    it('Test1: Inicializando el contrato con los valores correctos', async () => {
        let values = await tokenInstance.name();
        assert.equal(values, 'Iron Token', 'Tiene el nombre correcto');
        values = await tokenInstance.symbol();
        assert.equal(values, 'IRN', 'Tiene el simbolo correcto');
        values = await tokenInstance.standar();
        assert.equal(values, 'Iron Token v1.0', 'Tiene el estandar correcto');
    });

    it('Test2: Asignando el valor total de monedas', async () => {
        let totalSupply = await tokenInstance.totalSupply();
        assert.equal(totalSupply.toNumber(), 1000000, 'Validar el valor total de 1.000.000');
        let adminBalance = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber(), 1000000, 'Validar si la cuenta tiene el valor total');
    });

    it('Test3: Transferir tokens a un propietario', async () => {
        let transfer = await tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        assert.equal(transfer, true, "It returns true");
        transfer = await tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        truffleAssert.eventEmitted(transfer, 'Transfer', (result) => {
            return result.from === accounts[0] && result.to === accounts[1] && result.value.toNumber() == 250000;
        });
        let balance = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 250000, "adds the amount to the receiving account");
        balance = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(balance.toNumber(), 750000, "deduncts the amount from the sending account");
    });

    it('Test4: Aprobar la transferencia a un tercero', async () => {
        let approve = await tokenInstance.approve.call(accounts[1], 100);
        assert.equal(approve, true, "Transferencia aprovada");
        approve = await tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        truffleAssert.eventEmitted(approve, 'Approval', (result) => {
            return result.owner === accounts[0] && result.spender === accounts[1] && result.value.toNumber() == 100;
        });
        let allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowance.toNumber(), 100, "Tiene autorizado transferir ese valor");
    });

    it('Test5: Transferir tokens a otra cuenta', async () => {        
        let transfer = await tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
        truffleAssert.eventEmitted(transfer, 'Transfer', (result) => {
            return result.from === accounts[0] && result.to === fromAccount && result.value.toNumber() == 100;
        });
        let approve = await tokenInstance.approve(spendingAccount, 100, {from: fromAccount});
        truffleAssert.eventEmitted(approve, 'Approval', (result) => {
            return result.owner === fromAccount && result.spender === spendingAccount && result.value.toNumber() == 100;
        });
        await tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount}).then((response)=>{
            console.log(response);
        }, (error)=>{
            assert(error.message.indexOf('revert') >= 0, "Error: Mensaje contiene Revert");
        });
        let allowance = await tokenInstance.allowance(fromAccount, spendingAccount);
        assert.equal(allowance.toNumber(), 100, "Allowance correcto");

        let transferFrom = await tokenInstance.transferFrom(fromAccount, toAccount,67, {from: spendingAccount});
        truffleAssert.eventEmitted(transferFrom, 'Transfer', (result) => {
            return result.from === fromAccount && result.to === toAccount && result.value.toNumber() == 67;
        });
        let balance = await tokenInstance.balanceOf(fromAccount);
        assert.equal(balance.toNumber(), 33, "Saldo correcto fromAccount");
        balance = await tokenInstance.balanceOf(toAccount);
        assert.equal(balance.toNumber(), 67, "Saldo correcto toAccount");
        allowance = await tokenInstance.allowance(fromAccount, spendingAccount);
        assert.equal(allowance.toNumber(), 33, "Allowance correcto");
    });
})

