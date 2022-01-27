import React from 'react'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  MetamaskIcon,
  Text,
  TooltipText,
  LinkExternal,
  TimerIcon,
  Skeleton,
  useTooltip,
  Box,
  Button,
  Link,
} from '@rimauswap-libs/uikit'
import { BASE_BSC_SCAN_URL } from 'config'
import { useBlock } from 'state/block/hooks'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { getAddress, getRimauVaultAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import { getBscScanLink } from 'utils'
import Balance from 'components/Balance'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import VaultCardActions from '../../CakeVaultCard/VaultCardActions'
import CardActions from '../CardActions'
import { ActionContainer} from '../../PoolsTable/ActionPanel/styles'
import RecentCakeProfitRow from '../../CakeVaultCard/RecentCakeProfitRow'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'

interface ExpandedFooterProps {
  pool: Pool
  account: string
}

const ExpandedWrapper = styled(Flex)`
  background: ${({ theme }) => `${theme.colors.background}70`};
  padding:20px;
  svg {
    height: 14px;
    width: 14px;
  }
`
const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  padding-bottom:0px;
  color: ${({ theme }) => theme.colors.primary};
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useCakeVault()

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  // const boldFalse=false;
  const {
    stakingToken,
    earningToken,
    startBlock,
    userData,
    endBlock,
    stakingLimit,
    contractAddress,
    isAutoVault,
  } = pool

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''
  const poolContractAddress = getAddress(contractAddress)
  const cakeVaultContractAddress = getRimauVaultAddress()
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask
  // const isManualCakePool = sousId === 0

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

  // const getTotalStakedBalance = () => {
  //   if (isAutoVault) {
  //     return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
  //   }
  //   if (isManualCakePool) {
  //     const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
  //     return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
  //   }
  //   return getBalanceNumber(totalStaked, stakingToken.decimals)
  // }

  return (
    <ExpandedWrapper flexDirection="column">
      {stakingLimit && stakingLimit.gt(0) && (
        <Flex mb="2px" justifyContent="space-between">
          <Text small>{t('Max. stake per user')}:</Text>
          <Text small>{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${stakingToken.symbol}`}</Text>
        </Flex>
      )}
      {shouldShowBlockCountdown && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          <Text small>{hasPoolStarted ? t('Ends in') : t('Starts in')}:</Text>
          {blocksRemaining || blocksUntilStart ? (
            <Flex alignItems="center">
              <Link external href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}>
                <Balance small value={blocksToDisplay} decimals={0} color="primary" />
                <Text small ml="4px" color="primary" textTransform="lowercase">
                  {t('Blocks')}
                </Text>
                <TimerIcon ml="4px" color="primary" />
              </Link>
            </Flex>
          ) : (
            <Skeleton width="54px" height="21px" />
          )}
        </Flex>
      )}
      {isAutoVault && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          {tooltipVisible && tooltip}
          <TooltipText ref={targetRef} small>
            {t('Performance Fee')}
          </TooltipText>
          <Flex alignItems="center">
            <Text ml="4px" small>
              {performanceFee / 100}%
            </Text>
          </Flex>
        </Flex>
      )}
     
      <Flex mb="2px" justifyContent="flex-start">
        <StyledLinkExternal color="primary" href={`/info/token/${getAddress(earningToken.address)}`} small>
          {t('See Token Info')}
        </StyledLinkExternal>
      </Flex>
      <Flex mb="2px" justifyContent="flex-start">
        <StyledLinkExternal color="primary" href={earningToken.projectLink} small>
          {t('View Project Site')}
        </StyledLinkExternal>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-start">
          <StyledLinkExternal
            href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? cakeVaultContractAddress : poolContractAddress}`}
            small
            color="primary" 
          >
            {t('View Contract')}
          </StyledLinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-start">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
          >
            <Text color="primary" fontSize="14px">
              {t('Add to Metamask')}
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
      {isAutoVault ? (
        <>
          <ActionContainer style={{margin:'10px 0'}}>
            <Box>
                <RecentCakeProfitRow />
            </Box>
            <Box mt="8px">
                <UnstakingFeeCountdownRow />
            </Box>
          </ActionContainer>
          <Flex flexDirection="column">
            {account ? (
              <ActionContainer style={{margin:'10px 0'}}>
                <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
              </ActionContainer>
            ) : (
              <ActionContainer style={{margin:'10px 0'}}>
                <Text mb="10px" textTransform="uppercase" fontSize="14px" color="textSubtle" bold>
                  {t('Start earning')}
                </Text>
                <ConnectWalletButton mt="8px" width="100%" />
              </ActionContainer>
            )}
          </Flex>
        </>
      ): <Flex mt="24px" flexDirection="column">
        {account ? (
          
            <CardActions pool={pool} stakedBalance={stakedBalance} />
        ) : (
          <ActionContainer  style={{margin:'10px 0'}}>
            <Text mb="10px" textTransform="uppercase" fontSize="14px" color="textSubtle">
              {t('Start earning')}
            </Text>
            <ConnectWalletButton mt="8px" width="100%" />
          </ActionContainer>
        )}
      </Flex>
      
      }
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
