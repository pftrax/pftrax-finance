import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'RIMAU',
    lpAddresses: {
      97: '',
      56: '0x098dCbf3518856E45BB4e65E7fCc7C5Ff4a2C16e',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'RIMAU-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x18d82764d5806B2eC7Df4E89f42d0c3d6eB145D4',
    },
    token: tokens.rimau,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'RIMAU-BTCB LP',
    lpAddresses: {
      97: '',
      56: '0xC1BeD912aC46581f2927e60EF7e79a473FAa6579',
    },
    token: tokens.rimau,
    quoteToken: tokens.btcb,
  },
  {
    pid: 8,
    lpSymbol: 'RIMAU-ETH LP',
    lpAddresses: {
      97: '',
      56: '0x434F4463A56e95feDA02a47c1B2D13255fE38871',
    },
    token: tokens.rimau,
    quoteToken: tokens.eth,
  },
  {
    pid: 10,
    lpSymbol: 'RIMAU-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x5160b9cFb4467D8B245F56E4B5BaB25d557517EC',
    },
    token: tokens.usdt,
    quoteToken: tokens.rimau,
  },
  {
    pid: 12,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 13,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: tokens.wbnb,
    quoteToken: tokens.usdt,
  },
  {
    pid: 14,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x54632E239C63dA1973E63F66CE96077C8D15aF2d',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 15,
    lpSymbol: 'ETH-USDT LP',
    lpAddresses: {
      97: '',
      56: '0xF419cF360174E185575D04B045C8D18b59d2Fa38',
    },
    token: tokens.eth,
    quoteToken: tokens.usdt,
  },
  {
    pid: 16,
    lpSymbol: 'BTCB-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x4aa9520e34f97ce991a3a6d1b9a5095cf6c4a611',
    },
    token: tokens.btcb,
    quoteToken: tokens.usdt,
  },
  {
    pid: 17,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x277cF8EBEcD8343612b4eBfC1070a40539d0046d',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 18,
    lpSymbol: 'BNB-USDT LP',
    lpAddresses: {
      97: '',
      56: '0xde5c3DD19894b5a919bb68C323e447B0d4CEc7d5',
    },
    token: tokens.wbnb,
    quoteToken: tokens.usdt,
  },
  {
    pid: 19,
    lpSymbol: 'DOGE-RIMAU LP',
    lpAddresses: {
      97: '',
      56: '0xd74cd09b880b1b9cdd6e37ac535ecdcc5b1e0334',
    },
    token: tokens.doge,
    quoteToken: tokens.rimau,
  },
  {
    pid: 20,
    lpSymbol: 'LTC-RIMAU LP',
    lpAddresses: {
      97: '',
      56: '0x47F6fa6a5192C5F9C06346A0D6aEDE5Bd1f40F11',
    },
    token: tokens.ltc,
    quoteToken: tokens.rimau,
  }
]

export default farms
