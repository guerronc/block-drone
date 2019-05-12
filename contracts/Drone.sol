pragma solidity 0.5.8;

///@title Smart contract
///@notice Adminstracion de drones
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract Drone{

    //Structs
    struct DatosDrone{
        uint256 identificador;
        uint256 alturaMaxima;
        uint256 alturaMinima;
        uint256 autonomia;
        uint256 costo;
        address empresa;
        bool disponible;
        uint256 pesticida;
    }
    
    //Eventos 
    event LogAddDrone(address empresa, uint256 drone);
    event LogDroneDisponible(uint256 drone, uint256 costo, address empresa);
    event LogAddEmpresa(address empresa, string nombre);
    event LogSaldoEmpresa(address empresa, uint256 valor);

    //Metodos
    function addDrone(uint256 _alturaMaxima,uint256 _alturaMinima,uint256 _autonomia,uint256 _costo,address _empresa, uint256 _pesticida) 
        public returns(bool);
    function getDroneDisponible(uint256 _pesticida) public returns(uint256, uint256, address);
    function setDroneDisponible(uint256 _drone, bool _disponible) public returns(bool);
    function addEmpresa(string memory _nombre) public returns (bool);
    function getSaldo() public returns(uint256);
    function getEmpresa(address _empresa) public view returns(string memory);
    function getDrone(uint256 _drone) public view returns(uint256, address, bool, uint256);
}


