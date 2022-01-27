import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'RimauSwap (BSC)',
  description:
    'RimauSwap - DEX Built For Global Crypto Communities via Sustainable ESG. Earn RIMAU through yield farming, then stake it in Syrup Pools to earn more tokens!.',
  image: 'https://rimauswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/swap':
      return {
        title: `${t('Swap')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/info':
      return {
        title: `${t('Info')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('RimauSwap')} (${t('BSC')})`,
      }
    default:
      return null
  }
}
