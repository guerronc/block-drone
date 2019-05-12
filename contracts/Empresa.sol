pragma solidity 0.5.8;

import "./Drone.sol";
import "./IronToken.sol";
import "./SafeMath.sol";

///@title Smart Contract
///@notice Administra empresas y drones
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract Empresa is Drone{

    //Variables generales
    using SafeMath for uint256;
    uint256 private contador;
    IronToken private tokenContract;

    //Mappings para drones, empresas y pesticidas
    mapping(address => string) empresas;
    mapping(uint256 => DatosDrone) drones;

    ///@notice Contructor empresa
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _tokenContract Contrato token ERC20
    constructor (IronToken _tokenContract) public{
        tokenContract = _tokenContract;
        contador = 1;
    }

    ///@notice Agregar nueva empresa
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _nombre Nombre de la empresa
    ///@return Retorna true cuando la empresa se agrega
    function addEmpresa(string memory _nombre) public returns (bool) {
        empresas[msg.sender] = _nombre;   
        emit LogAddEmpresa(msg.sender, _nombre);
        return true;     
    }

    ///@notice Consultar saldo de tokens
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@return Cantidad de tokens
    function getSaldo() public returns(uint256){
        uint256 _saldo = tokenContract.balanceOf(msg.sender);
        emit LogSaldoEmpresa(msg.sender,_saldo);
        return _saldo;
    }

    ///@notice Consultar empresa
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _empresa Address de la empresa
    ///@return Nombre de la empresa
    function getEmpresa(address _empresa) public view returns(string memory){
        return empresas[_empresa];
    }
    
    ///@notice Agregar un nuevo drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _alturaMaxima Altura maxima que vuela el drone (metros)
    ///@param _alturaMinima Altura minima que vuela el drone (metros)
    ///@param _autonomia Autonomia de vuela (metros)
    ///@param _costo Costo por la fumigacion (IronToken)
    ///@param _empresa Address de la empresa que agrega el drone
    ///@param _pesticida Identificador del pesticida (Struct Pesticida)
    ///@return Retorna true cuando se agrega el drone
    function addDrone(uint256 _alturaMaxima,uint256 _alturaMinima,uint256 _autonomia,uint256 _costo,address _empresa, uint256 _pesticida) 
        public returns(bool)
    {
        require(_empresa == msg.sender, "Debe ser la misma direccion de la empresa");
        require(_costo > 0, "El costo debe ser mayor a cero");
        require(_pesticida >= 1 && _pesticida <= 5, "Pesticida no existe");
        drones[contador] = DatosDrone(contador,_alturaMaxima, _alturaMinima, _autonomia, _costo, _empresa, true, _pesticida);
        emit LogAddDrone(_empresa, contador);
        contador = contador.add(1);
        return true;
    }

    ///@notice Cambiar disponibilidad del drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _pesticida Pesticida que acepta la parcela
    ///@return Retorna identificador del drone que esta disponible, si no hay drone disponible retorna 0
    function getDroneDisponible(uint256 _pesticida) public returns(uint256, uint256, address){
        require(contador > 0, "No hay drones disponibles");
        require(_pesticida >= 1 && _pesticida <= 5, "Pesticida no existe");
        uint i = 0;
        for(i = 1;i <= contador;i++){
            if(drones[i].disponible == true && drones[i].pesticida == _pesticida){
                emit LogDroneDisponible(drones[i].identificador, drones[i].costo, drones[i].empresa);
                return (drones[i].identificador,drones[i].costo, drones[i].empresa);
            }   
        }
        emit LogDroneDisponible(0, 0, address(this));
        return (0, 0, address(this));
    }

    ///@notice Cambiar disponibilidad del drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _drone Identificador del drone que se esta modificando
    ///@param _disponible Bool indicando la disponiblidad true/false
    ///@return Retorna bool con la disponibilidad actual del drone
    function setDroneDisponible(uint256 _drone, bool _disponible) public returns(bool){
        require(_drone >= 1 && _drone <= contador,"No existe el drone que esta buscando");
        drones[_drone].disponible = _disponible;
        return drones[_drone].disponible;
    }

    ///@notice Buscar datos de un drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _drone Identificador del drone
    ///@return Retorna identificador, address empresa y estado
    function getDrone(uint256 _drone) public view returns(uint256, address, bool, uint256){
        require(_drone >= 1 && _drone <= contador,"No existe el drone que esta buscando");
        return (
            drones[_drone].identificador,
            drones[_drone].empresa,
            drones[_drone].disponible,
            drones[_drone].pesticida
        );
    }
}