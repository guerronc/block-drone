pragma solidity 0.5.8;

///@title Smart contract
///@notice Adminstrar parcelas
///@dev https://gitlab.com/CsarG/unir-tfe.git
contract Parcela{

    //Structs
    struct DatosParcela{
        uint256 identificador;
        uint256 longitud;
        uint256 alturaMaxima;
        uint256 alturaMinima;
        address propietario;
        uint256 pesticida;
    }    
    //Eventos 
    event LogAddParcela(address propietario, uint256 parcela);
    event LogAddPropietario(address propietario, string nombre);
    event LogSaldoPropietario(address propietario, uint256 valor);
    
    //Metodos
    function addPropietario(string memory _nombre) public returns (bool);    
    function getSaldo() public returns(uint256);
    function getPropietario(address _propietario) public view returns(string memory);
    function addParcela(uint256 _longitud, uint256 _alturaMaxima, uint256 _alturaMinima, address _propietario, uint256 _pesticida) 
        public returns(bool);
    function getParcela(uint256 _parcela) public view returns(uint256, address, uint256);
}