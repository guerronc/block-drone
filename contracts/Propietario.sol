pragma solidity 0.5.8;

import "./Parcela.sol";
import "./IronToken.sol";
import "./SafeMath.sol";

///@title Smart Contract
///@notice Administra empresas y drones
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract Propietario is Parcela{

    //Variables generales
    IronToken private tokenContract;
    using SafeMath for uint256;
    uint256 private contador;

    //Mappings para proíetarios, parcelas y pesticidas
    mapping(address => string) propietarios;
    mapping(uint256 => DatosParcela) parcelas;

    ///@notice Contructor propietario
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _tokenContract Contrato token ERC20
    constructor (IronToken _tokenContract) public{
        tokenContract = _tokenContract;
        contador = 1;
    }

    ///@notice Agregar nuevo propietario
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _nombre Nombre del propietario
    ///@return Retorna true cuando el propietario se agrego
    function addPropietario(string memory _nombre) public returns (bool) {
        propietarios[msg.sender] = _nombre;   
        emit LogAddPropietario(msg.sender, _nombre);
        return true;     
    }

    ///@notice Consultar saldo de tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Cantidad de tokens
    function getSaldo() public returns(uint256){
        uint256 _saldo = tokenContract.balanceOf(msg.sender);
        emit LogSaldoPropietario(msg.sender,_saldo);
        return _saldo;
    }

    ///@notice Consultar propietarios
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _propietario Address de la empresa
    ///@return Nombre del propietario
    function getPropietario(address _propietario) public view returns(string memory){
        return propietarios[_propietario];
    }

    ///@notice Agregar una nueva parcela
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _longitud Longitud de la parcela en metros
    ///@param _alturaMaxima Altura maxima
    ///@param _alturaMinima Altura minima
    ///@param _propietario Address del propietario de la parcela
    ///@return Retorna true si la parcela se creo exitosamente
    function addParcela(uint256 _longitud, uint256 _alturaMaxima, uint256 _alturaMinima, address _propietario, uint256 _pesticida) 
    public returns(bool){
        require(_propietario == msg.sender, "Debe ser la misma direccion de la empresa");
        require(_pesticida >= 1 && _pesticida <= 5, "Pesticida no existe");
        parcelas[contador] = DatosParcela(contador,_longitud,_alturaMaxima,_alturaMinima,_propietario, _pesticida);
        emit LogAddParcela(_propietario, contador);
        contador = contador.add(1);
        return true;
    }

    ///@notice Buscar parcela por identificados
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _parcela Identificador de la parcela
    ///@return Retorna identificador, address propietario y pesticida
    function getParcela(uint256 _parcela) public view returns(uint256, address, uint256){
        require(_parcela >= 1 && _parcela <= contador,"No existe el parcela que esta buscando");
        return (
            parcelas[_parcela].identificador,
            parcelas[_parcela].propietario,
            parcelas[_parcela].pesticida
        );
    }

    ///@notice Confirmar trabajo terminado de un drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Retorna true para confirma trabajo terminado
    function confirmarTrabajo() public pure returns(bool){
        //Agregar logica para confirmar o no el trabajo de un drone
        //Para este avance del TFE no aplica
        return true;
    }    
}