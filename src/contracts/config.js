exports.url = "HTTP://127.0.0.1:8545"; //Dev: HTTP://127.0.0.1:8545 Unir: http://138.4.143.82:8545
exports.password = ""; //Dev: "" Unir: Alumnos_2018_Q4_IKx5srvT
exports.gasLimit = 996721975;

exports.options = {
  defaultBlock: 'latest',
  defaultGas: 1,
  defaultGasPrice: 0,
  transactionBlockTimeout: 50,
  transactionConfirmationBlocks: 1,
  transactionPollingTimeout: 480
}


exports.accounts = [
  {
    id: 1,
    account: '0x6be4f4D9034c88e5D0bB2Ca78F32b9255F71452C',
    unlocked: false
  },
  {
    id: 2,
    account: '0xE762E386F1870217FDC2f668aD37ee2C9e0f201c',
    unlocked: false
  },
  {
    id: 3,
    account: '0x088672a67d2c90e36568753f97775ECE4ED8D963',
    unlocked: false
  },
  {
    id: 4,
    account: '0xd3A09e4c8e10163C93E995e73b743af8541671ce',
    unlocked: false
  }
];

exports.contracts = [
  {
    detalle: 'IronToken',
    contract: '0xC02f8a8a97a0B9D2277BFEe82FA594C7E5550e05'
  },
  {
    detalle: 'Empresa',
    contract: '0xaa05496bdAdaA1bCB5e3297513856A045E301Ef8',
  },
  {
    detalle: 'Propietario',
    contract: '0x7838Cc2E8fa2Af0fAa1e81d086225aFd26d4ba50',
  },
  {
    detalle: 'Solicitud',
    contract: '0x91218b175F619947DC68291E61B43F93706175BC',
  },
];

