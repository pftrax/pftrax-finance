import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { LinkExternal } from '@rimauswap-libs/uikit'
import CardActionsContainer from './CardActionsContainer'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  farm?:any
  account:any
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
  padding:24px;
  background: ${({ theme }) => `${theme.colors.background}70`};
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  padding-bottom:5px;
  color: ${({ theme }) => theme.colors.primary};
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  farm,
  account,
  removed,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      {/* <Flex mb="5px" justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex> */}
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
      <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal>

      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
    </Wrapper>
  )
}

export default DetailsSection
