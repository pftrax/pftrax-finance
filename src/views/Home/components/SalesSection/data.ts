import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Stake RIMAU, Earn More RIMAU',
  bodyText: 'Stake your RIMAU tokens with attractive APR in our Belang Pool and compound your asset quantity.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  images: {
    path: '/images/home/decentralized/',
    src: 'decentralized',
    alt: 'Decentralized',
    attributes: [
      { src: 'decentralized', alt: 'Decentralized' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Now Everyone Can Share the DeFi Economy!',
  bodyText: 'Why pay when you can share a piece of the DEX revenue? Get enriched and make common good at the same time. It doesn’t get any better than this!',
  reverse: true,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  images: {
    path: '/images/home/benefitting/',
    src: 'benefitting',
    alt: 'Benefitting',
    attributes: [
      { src: 'benefitting', alt: 'Benefitting' }
    ],
  },
}
export const cakeSectionData: SalesSectionProps = {
  headingText: 'Support sustainable Environment, Social and Governance (ESG).',
  bodyText:
    'Be part of an ecosystem designed to fund sustainable contributions to the communities through DeFi yield farming.',
  reverse: true,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  // secondaryButton: {
  //   to: 'https://docs.pancakeswap.finance/tokenomics/cake',
  //   text: 'Learn',
  //   external: true,
  // },
  images: {
    path: '/images/home/environmental/',
    src: 'environmental',
    alt: 'Small 3d rimau',
    attributes: [
      // { src: 'Vector', alt: 'Small 3d rimau' },
      { src: 'environmental', alt: 'Small 3d rimau' },
      // { src: 'Vector-1', alt: 'CAKE token' },
  ],
  },
}
