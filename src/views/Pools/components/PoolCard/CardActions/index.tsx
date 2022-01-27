import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'
import { ActionContainer } from '../../PoolsTable/ActionPanel/styles'

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
  pool: Pool
  stakedBalance: BigNumber
}

const CardActions: React.FC<CardActionsProps> = ({ pool, stakedBalance }) => {
  const { sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <ActionContainer style={{margin:'10px 0'}}>
            <Box display="inline">
              <InlineText color="textSubtle" textTransform="uppercase" fontSize="14px">
                {`${earningToken.symbol} `}
              </InlineText>
              <InlineText color="textSubtle" textTransform="uppercase" fontSize="14px">
                {t('Earned')}
              </InlineText>
            </Box>
            <HarvestActions
              earnings={earnings}
              earningToken={earningToken}
              sousId={sousId}
              earningTokenPrice={earningTokenPrice}
              isBnbPool={isBnbPool}
              isLoading={isLoading}
            />
          </ActionContainer>
        )}
        <ActionContainer style={{margin:'10px 0'}}>
          <Box display="inline">
            <InlineText color={isStaked ? 'textSubtle' : 'textSubtle'} fontSize="14px">
              {isStaked ? stakingToken.symbol : t('Stake')}{' '}
            </InlineText>
            <InlineText color={isStaked ? 'textSubtle' : 'textSubtle'} fontSize="14px">
              {isStaked ? t('Staked') : `${stakingToken.symbol}`}
            </InlineText>
          </Box>
          {needsApproval ? (
              <ApprovalAction pool={pool} isLoading={isLoading} />
          ) : (
              <StakeActions
                isLoading={isLoading}
                pool={pool}
                stakingTokenBalance={stakingTokenBalance}
                stakedBalance={stakedBalance}
                isBnbPool={isBnbPool}
                isStaked={isStaked}
              />
            
          )}
        </ActionContainer>
      </Flex>
    </Flex>
  )
}

export default CardActions
