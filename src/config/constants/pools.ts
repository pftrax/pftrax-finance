import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.rimau,
    earningToken: tokens.rimau,
    contractAddress: {
      97: '',
      56: '0xafd546e7bcE1E7d60C7fC7FCf9F101639b09763D',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00475',   // this is 25% of RIMAU EMISSION to fix APR
    sortOrder: 1,
    isFinished: false,
  }
]

export default pools
