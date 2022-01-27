import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { CardBody, Flex, Text, CardRibbon, HelpIcon, Skeleton, useTooltip, EyeIcon } from '@rimauswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useCakeVault } from 'state/pools/hooks'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner } from './StyledCard'

// import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
// import ExpandableSection from '../PoolsTable/Cells/ExpandActionCell'
import ExpandedFooter from './CardFooter/ExpandedFooter'

const ArrowIcon = styled(EyeIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  background:${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}10` : `${theme.colors.primary}20`)};
  border-radius: 4px;
  fill: ${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}30` : `${theme.colors.primary}`)};
  height: 30px;
  width: 30px;
  padding: 5px;
`

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, totalStaked, isFinished, userData, isAutoVault } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isManualCakePool = sousId === 0
  const {
    totalCakeInVault,
    // fees: { performanceFee },
  } = useCakeVault()
  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: 'bottom',
  })

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
    placement: 'bottom',
  })

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasStakedBalance}
          earningToken={earningToken}
          stakingToken={stakingToken}
          isFinished={isFinished && sousId !== 0}
        />
        <CardBody>
          <AprRow pool={pool} />
          <Flex mb="20px" justifyContent="space-between" alignItems="center">
            <Text style={{ flex: 1, alignItems: 'center' }} small>{t('Total staked')}:</Text>
            <Flex flex="1" alignItems="center" style={{textAlign:'left'}}>
              {totalStaked && totalStaked.gte(0) ? (
                <>
                  <Balance small value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
                  <span ref={totalStakedTargetRef}>
                    <HelpIcon color="textSubtle" width="20px" ml="6px" mt="4px" />
                  </span>
                </>
              ) : (
                <Skeleton width="90px" height="21px" />
              )}
              {totalStakedTooltipVisible && totalStakedTooltip}
            </Flex>
          </Flex>
          {/* <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
              <Text style={{ flex: 1, alignItems: 'center' }}>{t('Earned')}:</Text>
              <Text style={{ flex: 1, alignItems: 'center' }} onClick={() => setIsExpanded(!isExpanded)}>
                  {`${earningToken.symbol} `}
              </Text>
          </Flex> */}
          <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
              <Text style={{ flex: 1, alignItems: 'center' }}>{t('Details')}:</Text>
              <Text style={{ flex: 1, alignItems: 'center' }} onClick={() => setIsExpanded(!isExpanded)}>
                <ArrowIcon color="primary" toggled={isExpanded} />
              </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag />}
            {tooltipVisible && tooltip}
            <Flex ref={targetRef}>
              <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
            </Flex>
          </Flex>
        </CardBody>
        {isExpanded && <ExpandedFooter pool={pool} account={account} />}
        {/* <CardFooter pool={pool} account={account} /> */}
      </StyledCardInner>
    </StyledCard>
  )
}

export default PoolCard
