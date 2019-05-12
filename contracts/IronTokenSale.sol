pragma solidity 0.5.8;

import "./IronToken.sol";
import "./SafeMath.sol";

///@title Smart Contract
///@notice Realizar ventas de tokens por ethers
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract IronTokenSale{

    using SafeMath for uint256;

    //Variable con la address del administrador
    address payable admin;
    //Inicializar contrato
    IronToken public tokenContract;
    //Valor del token en weis
    uint256 public tokenPrice;
    //Cantidad de tokens vendidos
    uint256 public tokensSold;

    //Evento luego de la venta
    event Sell(address buyer, uint256 value);

    ///@notice Contructor del contrato
    ///@dev Inicializa el contrato IronToken y address del administrador
    ///@param _tokenContract Address del contrato IronToken
    ///@param _tokenPrice Precio de token en weis
    constructor(IronToken _tokenContract, uint256 _tokenPrice) public{
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    ///@notice Venta de tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param value Valor que se vende
    function buyTokens(uint256 value) public payable {
        require(msg.value == value.mul(tokenPrice), "buyTokens: Valor incorrecto");
        require(tokenContract.balanceOf(address(this)) >= value, "buyTokens: No tiene tokens suficientes");
        require(tokenContract.transfer(msg.sender, value), "buyTokens: Error en la transferencia");
        tokensSold = tokensSold.add(value);
        emit Sell(msg.sender, value);
        return;
    }

    ///@notice Finalizar venta, transfiere los token al admin y destruye el contrato
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    function endSale() public{
        require(msg.sender == admin, "endSale: No es el administrador");
        uint256 balance = tokenContract.balanceOf(address(this));
        require(tokenContract.transfer(admin, balance),"endSale: Error al transferir");
        selfdestruct(admin);
    }
}