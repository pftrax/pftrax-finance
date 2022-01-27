import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Skeleton } from '@rimauswap-libs/uikit'
import { Farm } from 'state/types'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
// import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import Details from '../FarmTable/Details'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  max-width: 352px;
  align-self: baseline;
  max-width:352px;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ isPromotedFarm }) => (isPromotedFarm ? '12px' : '12px')};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`


const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
  margin:-24px;
  padding-bottom:${(props) => (props.expanded ? '0px' : '24px')};
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, cakePrice, account }) => {
  const { t } = useTranslation()
  const viewMode = true;
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('RIMAU + Fees')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'RIMAU'
  const earningBigNumber = new BigNumber(farm.userData.earnings);
  const rawEarningsBalance = account ? getBalanceNumber(earningBigNumber) : BIG_ZERO

  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {/* {isPromotedFarm && <StyledCardAccent />} */}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        token={farm.token}
        quoteToken={farm.quoteToken}
      />
      <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
        <Text  style={{ flex: 1, alignItems: 'center' }}>{t('Earn')}:</Text>
        <Text bold style={{ flex: 1, alignItems: 'center' }}>{earnLabel}</Text>
      </Flex>
      <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
          <Text style={{ flex: 1, alignItems: 'center' }}>{t('Earned')}:</Text>
          <Text bold style={{ flex: 1, alignItems: 'center' }}>
            {
              rawEarningsBalance.toLocaleString()
            }
          </Text>
      </Flex>

      {!removed && (
        <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
          <Text style={{ flex: 1, alignItems: 'center' }}>{t('APR')}:</Text>
          <Text bold style={{ flex: 1, alignItems: 'center' }}>
            {farm.apr ? (
              <>
               {displayApr}%
                <ApyButton
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  cakePrice={cakePrice}
                  apr={farm.apr}
                  displayApr={displayApr}
                />
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}

      <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
          <Text style={{ flex: 1, alignItems: 'center' }}>{t('Liquidity')}:</Text>
          <Text bold style={{ flex: 1, alignItems: 'center' }}>
            {totalValueFormatted}
          </Text>
      </Flex>
      {/* <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
          <Text style={{ flex: 1, alignItems: 'center' }}>{t('Multiplier')}:</Text>
          <Text bold style={{ flex: 1, alignItems: 'center' }}>
            {farm.multiplier}
          </Text>
      </Flex> */}
      <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
          <Text style={{ flex: 1, alignItems: 'center' }}>{t('Details')}:</Text>
          <Text bold style={{ flex: 1, alignItems: 'center' }}>
            {/* <ExpandableSectionButton
                onClick={() => setShowExpandableSection(!showExpandableSection)}
                expanded={showExpandableSection}
              /> */}
              <Text onClick={() => setShowExpandableSection(!showExpandableSection)}>
              <Details viewMode={viewMode} actionPanelToggled={showExpandableSection} />
              </Text>
          </Text>
      </Flex>
      
      {/* <Flex justifyContent="space-between">
        <Text>{t('Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex> */}
      {/* <Divider /> */}
      {/* <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      /> */}
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={getBscScanLink(lpAddress, 'address')}
          // TODO: change later
          farm={farm} 
          account={account}
          infoAddress={`/info/pool/${lpAddress}`}
          totalValueFormatted={totalValueFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
