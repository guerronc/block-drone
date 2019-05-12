pragma solidity 0.5.8;

///@title SafeMath
///@dev Math operations with safety checks that revert on error
library SafeMath{

    ///@notice Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    ///@notice benefit is lost if 'b' is also tested.
    ///@dev See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    ///@param a Numero uno
    ///@param b Numero dos
    ///@return Resultado de la multiplicacion
    function mul(uint256 a, uint256 b) internal pure returns(uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "Multiplicacion");
        return c;
    }

    ///@notice Division de dos numeros
    ///@dev Integer division of two numbers truncating the quotient, reverts on division by zero.
    ///@param a Numero uno
    ///@param b Numero dos
    ///@return Resultado de la division
    function div(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b > 0, "No se puede dividir para cero"); // Solidity only automatically asserts when dividing by 0
        uint256 c = a / b;
        return c;
    }

    ///@notice Resta de dos numeros
    ///@dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    ///@param a Numero uno
    ///@param b numero dos
    ///@return Resultado de la resta
    function sub(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b <= a, "b tiene que ser menor o igual que a");
        uint256 c = a - b;
        return c;
    }

    ///@notice Suma de dos numeros
    ///@dev Adds two numbers, reverts on overflow.
    ///@param a Numero unos
    ///@param b Numero dos
    ///@return Resultado de la suma
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        require(c >= a, "El resultado debe ser ser mayor de a");
        return c;
    }

    ///@notice Modulo de la division
    ///@dev Divides two numbers and returns the remainder (unsigned integer modulo), reverts when dividing by zero.
    ///@param a Numero uno
    ///@param b Numero dos
    ///@return Modulo de la division
    function mod(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b != 0,"No se puede dividir para cero");
        return a % b;
    }
}