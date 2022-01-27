import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { CardBody, Flex, Text, useMatchBreakpoints, Skeleton, EyeIcon, HelpIcon, useTooltip } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
// import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceNumber } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import Balance from 'components/Balance'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import AprRow from '../PoolCard/AprRow'
import { StyledCard, StyledCardInner } from '../PoolCard/StyledCard'
// import CardFooter from '../PoolCard/CardFooter'

import StyledCardHeader from '../PoolCard/StyledCardHeader'
// import VaultCardActions from './VaultCardActions'
// import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
// import ExpandableSection from '../PoolsTable/Cells/ExpandActionCell'
// import RecentCakeProfitRow from './RecentCakeProfitRow'
import ExpandedFooter from '../PoolCard/CardFooter/ExpandedFooter'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
`

interface CakeVaultProps {
  pool: Pool
  showStakedOnly: boolean
}

const ArrowIcon = styled(EyeIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  background:${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}10` : `${theme.colors.primary}20`)};
  border-radius: 4px;
  fill: ${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}30` : `${theme.colors.primary}`)};
  height: 30px;
  width: 30px;
  padding: 5px;
`

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const { account } = useWeb3React()

  const [isExpanded, setIsExpanded] = React.useState(false)
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    totalCakeInVault,
    fees: { performanceFee },
  } = useCakeVault()

  const { isAutoVault, sousId, stakingToken, totalStaked } = pool
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

  const isManualCakePool = sousId === 0

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
  

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isPromoted={{ isDesktop: isXl }}>
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasSharesStaked}
          isAutoVault
          earningToken={tokens.rimau}
          stakingToken={tokens.rimau}
        />
        <StyledCardBody isLoading={isLoading}>
          <AprRow pool={pool} performanceFee={performanceFeeAsDecimal} />
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
        </StyledCardBody>
        {isExpanded && <ExpandedFooter pool={pool} account={account} />}
        {/* <CardFooter pool={pool} account={account} /> */}
      </StyledCardInner>
    </StyledCard>
  )
}

export default CakeVaultCard
