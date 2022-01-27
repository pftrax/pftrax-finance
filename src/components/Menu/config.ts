import { MenuEntry } from '@rimauswap-libs/uikit'
import { ContextApi } from 'contexts/Localization/types'



const config: (t: ContextApi['t'], currentLang:string) => MenuEntry[] = (t, currentLang) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Farming'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: t('Prediction (BETA)'),
  //   icon: 'PredictionsIcon',
  //   href: '/prediction',
  // },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  //   status: {
  //     text: t('Win').toLocaleUpperCase(),
  //     color: 'success',
  //   },
  // },
  // {
  //   label: t('Collectibles'),
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: t('Team Battle'),
  //   icon: 'TeamBattleIcon',
  //   href: '/competition',
  // },
  // {
  //   label: t('Teams & Profile'),
  //   icon: 'GroupsIcon',
  //   items: [
  //     {
  //       label: t('Leaderboard'),
  //       href: '/teams',
  //     },
  //     {
  //       label: t('Task Center'),
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: t('Your Profile'),
  //       href: '/profile',
  //     },
  //   ],
  // },
  // info
  {
    label: `${t('Info')}`,
    icon: 'InfoIcon',
    href: '/info'
  },
  // {
  //   label: t('Info'),
  //   icon: 'InfoIcon',
  //   href: '/info',
  // },
  // {
  //   label: t('IFO'),
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Github'),
        href: 'https://github.com/rimauswap',
      },
      {
        label: t('Audit'),
        // icon: 'InfoIcon',
        href: currentLang === 'en' ? 'https://docs-en.rimauswap.finance/security-1/audits' : currentLang === 'zh-cn' ? 'https://docs-zh.rimauswap.finance/bao-wei/shen-ji' : currentLang === 'my' || currentLang === 'id' ? 'https://docs-bm.rimauswap.finance/keselamatan/audit' : 'https://docs-en.rimauswap.finance/security-1/audits',
        // items:[
        //   {
        //     label: t('EN'),
        //     href: 'https://docs-en.rimauswap.finance/security-1/audits',
        //   },
        //   {
        //     label: t('BM'),
        //     href: 'https://docs-bm.rimauswap.finance/keselamatan/audit',
        //   },
        //   {
        //     label: t('ZH'),
        //     href: 'https://docs-zh.rimauswap.finance/bao-wei/shen-ji',
        //   }
        // ]
      },
      {
        label: t('Liquidity Lock'),
        href: 'https://docs-en.rimauswap.finance/amm-launch#liquidity-lock',
      },
      // {
      //   label: t('Buy Rimau'),
      //   href: 'https://rimauswap.finance/swap?inputCurrency=0x2170ed0880ac9a755fd29b2688956bd959f933f8&outputCurrency=0x098dCbf3518856E45BB4e65E7fCc7C5Ff4a2C16e',
      // },
      // {
      //   label: t('How to farm'),
      //   href: '#',
      // },
      // {
      //   label: t('Help'),
      //   href: 'https://docs-en.rimauswap.finance/how-to-guides/how-to-get-rimau',
      // },
      // {
      //   label: t('Voting'),
      //   href: '/voting',
      // },
      {
        label: t('Contact'),
        href: 'https://docs-en.rimauswap.finance/contact-us',
      },
      // {
      //   label: t('Merch'),
      //   href: 'https://pancakeswap.creator-spring.com/',
      // },
    ],
  },
]

export default config
