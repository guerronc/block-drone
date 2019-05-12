pragma solidity 0.5.8;

import "./IronToken.sol";
import "./Empresa.sol";
import "./Propietario.sol";
import "./SafeMath.sol";

///@title Contrato de solicitudes
///@notice Contrato para administrar solicitudes
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract Solicitud{

    using SafeMath for uint256;
    IronToken private tokenContract;
    Empresa private empresaContract;
    Propietario private propietarioContract;

    uint256 private contador;

    //Structs
    struct Pesticida{
        string nombre;
    }
    struct DatosSolicitud{
        uint256 identificador;
        address empresa;
        address propietario;
        uint256 valor_pago;
        uint256 drone;
        uint256 parcela;
        bool estado_pago;
        bool estado_trabajo;
        bool estado_solicitud;
    }

    mapping(uint256 => DatosSolicitud) solicitudes;
    mapping(uint256 => Pesticida) pesticidas;

    event LogAddSolicitud(uint256 solicitud, address empresa, address propietario, bool estadoSolicitud);
    event LogBuscarDroneDisponible(uint256 solicitud, uint256 drone, bool estadoSolicitud);
    event LogProcesarSolicitud(uint256 solicitud, bool estadoPago, bool estadoTrabajo);

    ///@notice Constructor
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _tokenContract Contrato IronToken para comprar o vender tokens
    ///@param _empresaContract Contrato para administrar empresas y drones
    ///@param _propietarioContract Contrato para administrar propietarios y parcelas
    constructor(IronToken _tokenContract, Empresa _empresaContract, Propietario _propietarioContract) public{
        contador = 1;
        tokenContract = _tokenContract;
        empresaContract = _empresaContract;
        propietarioContract = _propietarioContract;
        pesticidas[1] = Pesticida("Pesticida A");
        pesticidas[2] = Pesticida("Pesticida B");
        pesticidas[3] = Pesticida("Pesticida C");
        pesticidas[4] = Pesticida("Pesticida D");
        pesticidas[5] = Pesticida("Pesticida E");
    }

    ///@notice Agregar solicitud para drone
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _propietario Address del propietario
    ///@param _parcela Identificador de la empresa
    ///@return Retorna true si la solicitud se guardo exitosamente
    function addSolicitud(address _propietario, uint256 _parcela) public returns(bool){
        uint256 _drone;
        uint256 _costo;
        address _empresa;
        bool _estadoSolicitud = false;
        uint256 _identificador;
        address _addressPropietario;
        uint256 _pesticida;
        (_identificador, _addressPropietario, _pesticida) = propietarioContract.getParcela(_parcela);
        (_drone, _costo, _empresa) = empresaContract.getDroneDisponible(_pesticida);
        if(_drone > 0){
            _estadoSolicitud = true;
            empresaContract.setDroneDisponible(_drone, false);
        }
        solicitudes[contador] = DatosSolicitud(contador, _empresa, _propietario, _costo, _drone, _parcela, false, false, _estadoSolicitud);
        emit LogAddSolicitud(contador, _empresa, _propietario, _estadoSolicitud);
        contador = contador.add(1);
        return true;
    }

    ///@notice Volver a buscar drone de una solicitud no procesada
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _solicitud Identificador de la solicitud
    ///@return Retorna true si se encontro un drone disponible
    function buscarDroneDisponible(uint256 _solicitud) public returns(bool){
        require(solicitudes[_solicitud].estado_solicitud == false, "Solicitud ya fue aceptada");
        uint256 _drone;
        uint256 _costo;
        address _empresa;
        uint256 _identificador;
        address _propietario;
        uint256 _pesticida;
        (_identificador, _propietario, _pesticida) = propietarioContract.getParcela(solicitudes[_solicitud].parcela);
        (_drone, _costo, _empresa) = empresaContract.getDroneDisponible(_pesticida);
        if(_drone > 0){
            solicitudes[_solicitud].estado_solicitud = true;
            solicitudes[_solicitud].drone = _drone;
            empresaContract.setDroneDisponible(_drone, false);
        }
        emit LogBuscarDroneDisponible(_solicitud, solicitudes[_solicitud].drone, solicitudes[_solicitud].estado_solicitud);
        return true;
    }

    ///@notice Procesar la solicitud 
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _solicitud Identificador de la solicitud
    ///@return Retorna true si se proceso la solicitud
    function procesarSolicitud(uint256 _solicitud) public returns(bool){
        require(propietarioContract.confirmarTrabajo(),"El trabajo no esta terminado");
        solicitudes[_solicitud].estado_trabajo = true;
        solicitudes[_solicitud].estado_pago = true;
        emit LogProcesarSolicitud(_solicitud, solicitudes[_solicitud].estado_pago, solicitudes[_solicitud].estado_trabajo);
        return true;
    }

    ///@notice Buscar pesticida
    ///@dev https://gitlab.com/CsarG/unir-tfe.git
    ///@param _pesticida Identificador del pesticida que se esta buscando
    ///@return Retorna string con el nombre del pesticida
    function getPesticida(uint256 _pesticida) public view returns(string memory){
        require(_pesticida >= 1 && _pesticida <= 5, "Pesticida no existe");
        return pesticidas[_pesticida].nombre;
    }    
}