import { MenuEntry } from '@rimauswap-libs/uikit'
import { ContextApi } from 'contexts/Localization/types'

const socials: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  
  {
    label: t("Telegram"),
    icon: "TelegramIcon",
    items: [
      {
        label: `${t('Community')} (${t('EN')})`,
        href: "https://t.me/RimauSwap",
      },
      {
        label:`${t('Community')} (${t('BM')})`,
        href: "https://t.me/RimauSwapBM/",
      },
      {
        label:`${t('Community')} (${t('ZH')})`,
        href: "https://t.me/RimauSwapZH/",
      },
      {
        label: t("Announcement"),
        href: "https://t.me/RimauSwapAnnouncement",
      }
    ],
  },
  {
    label: t("Twitter"),
    icon: "TwitterIcon",
    href: "https://twitter.com/RimauSwap",
  },
  {
    label: t("Facebook"),
    icon: "FacebookIcon",
    href: "https://www.facebook.com/rimauswap/",
  },
  {
    label: t("Medium"),
    icon: "MediumIcon",
    href: "https://medium.com/@rimauswap/",
  },
  {
    label: t("Docs"),
    icon: "DocsIcon",
    items: [
      {
        label: t("BM"),
        href: "https://docs-bm.rimauswap.finance/",
      },
      {
        label: t("EN"),
        href: "https://docs-en.rimauswap.finance/",
      },
      {
        label: t("ZH"),
        href: "https://docs-zh.rimauswap.finance/",
      },
    ],
  },
  {
    label: t("Whitepaper"),
    icon: "WhitepaperIcon",
    items: [
      {
        label: t("BM"),
        href: `${window.location.origin}/whitepaper/Kertas-Putih-RimauSwap.pdf`, // "https://www.whitepaper-bm.rimauswap.finance/",
      },
      {
        label: t("EN"),
        href: `${window.location.origin}/whitepaper/RimauSwap-Whitepaper.pdf`, // "https://www.whitepaper-en.rimauswap.finance/",
      },
      {
        label: t("ZH"),
        href: `${window.location.origin}/whitepaper/RimauSwap-Whitepaper-ZH.pdf`, // "https://whitepaper-zh.rimauswap.finance/",
      },
    ],
  },
  {
    label: t("CoinMarketCap Listing"),
    icon: "CoinMarketCapIcon",
    items: [
      {
        label: t("BM"),
        href: "https://docs-bm.rimauswap.finance/penyenaraian-coinmarketcap",
      },
      {
        label: t("EN"),
        href: "https://docs-en.rimauswap.finance/coinmarketcap-listing",
      },
      {
        label: t("ZH"),
        href: "https://docs-zh.rimauswap.finance/zheng-shi-deng-lu-coinmarketcap",
      },
    ],
  },
  
  
];
export default socials;
