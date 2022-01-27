import { MenuEntry } from '@rimauswap-libs/uikit'
import { ContextApi } from 'contexts/Localization/types'

const helps: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Buy Rimau'),
    icon: "RimauIcon",
    href: '/swap?inputCurrency=0x2170ed0880ac9a755fd29b2688956bd959f933f8&outputCurrency=0x098dCbf3518856E45BB4e65E7fCc7C5Ff4a2C16e',
  },
  {
    label: t("How to farm"),
    icon: "FarmsIcon",
    href: 'https://docs-en.rimauswap.finance/products/how-to-farm-rimau',
  },
  {
    label: t("Help"),
    icon: "QuestionIcon",
    href: 'https://docs-en.rimauswap.finance/how-to-guides/how-to-get-rimau',
  },
];

export default helps