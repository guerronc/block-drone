pragma solidity 0.5.8;

import "./IERC20.sol";
import "./SafeMath.sol";

///@title Smart Contract
///@notice Crear token con el estandar ERC20 para pagos
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract IronToken is IERC20{

    using SafeMath for uint256;
    
    //Variable para almacenar el valor total de tokens
    uint256 private _totalSupply;

    //Mapping para guardar address y saldo de tokens
    mapping(address => uint256) private _balances;
    //Mapping para guardar address propietario y address de terceros autorizados con el valor
    mapping(address => mapping(address => uint256)) private _allowed;

    ///@notice Constructor del contrato
    ///@dev Inicializa total supply y el saldo de la cuenta de creacion
    ///@param _initialSupply Total de tokens que se van a crear
    constructor(uint256 _initialSupply) public{
        _balances[msg.sender] = _initialSupply;
        _totalSupply = _initialSupply;
    }

    ///@notice Nombre del token
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Retorna nombre del token
    function name() public pure returns (string memory){
        return "Iron Token";
    }

    ///@notice Simbolo para el token
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Retorna simbolo del token
    function symbol() public pure returns (string memory){
        return "IRN";
    }

    ///@notice Version del token
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Retorna la version del token
    function standar() public pure returns(string memory){
        return "Iron Token v1.0";
    }

    ///@notice Consulta el total de tokens creados
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Retorna el valor total de tokens
    function totalSupply() external view returns(uint256){
        return _totalSupply;
    }

    ///@notice Consulta el saldo de token por cuenta
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param who Address para consultar saldo
    ///@return Retorna el saldo de tokens de la address ingresada
    function balanceOf(address who) external view returns(uint256){
        return _balances[who];
    }

    ///@notice Consulta el valor aprobado para transferir
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param owner Address propietario de tokens
    ///@param spender Address tercero que se autoriza para transferir
    ///@return Retorna valor autorizado de tokens
    function allowance(address owner, address spender) external view returns(uint256){
        return _allowed[owner][spender];
    }

    ///@notice Transferir tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param to Address a la que se transfiere los tokens
    ///@param value Valor de tokens que se transfiere
    ///@return Retorna true si la transferencia fue exitosa
    function transfer(address to, uint256 value) external returns(bool){
        require(_balances[msg.sender] >= value, "transfer: No tiene saldo disponible");
        require(to != address(0),"transfer: No se puede enviar a la misma direccion");
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(msg.sender, to, value);
        return true;
    }

    ///@notice Aprobar a un tercero transferir tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param spender Address que va a transferir
    ///@param value Valor que se autoriza transferir
    ///@return Retorna true si fue autorizado
    function approve(address spender, uint256 value) external returns(bool){
        require(spender != address(0),"approve: No se puede aprovar a la misma cuenta");
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value); 
        return true;
    }

    ///@notice Transferir tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param from Address desde la que se transfiere
    ///@param to Address que recibe la transferencia
    ///@param value Valor a transferir
    ///@return Retorna true si la transferencia fue exitosa
    function transferFrom(address from, address to, uint256 value) external returns(bool){
        require(value <= _balances[from], "transferFrom: Debe tener saldo");
        require(value <= _allowed[from][msg.sender], "transferFrom: Debe estar autorizado");
        require(to != address(0),"transferFrom: No se puede aprovar a la misma cuenta");
        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }
}
