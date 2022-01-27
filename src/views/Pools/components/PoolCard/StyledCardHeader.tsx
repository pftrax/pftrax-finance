import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@rimauswap-libs/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'
import CakeVaultTokenPairImage from '../CakeVaultCard/CakeVaultTokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background:transparent;
  border-radius: '12px';
  padding-bottom:0px;
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false }) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'RIMAU' && stakingToken.symbol === 'RIMAU'
  // const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn RIMAU, stake RIMAU')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished}>
      <Flex alignItems="center" justifyContent="space-between" style={{textAlign:'left'}}>
        <Text style={{flex:1, alignItems:'center'}}>{t('Token')}</Text>
        <Flex flex="1" flexDirection="row" alignItems="center">
          {isAutoVault ? (
            <CakeVaultTokenPairImage width={44} height={44} />
          ) : (
            <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={44} height={44} />
          )}
         <Flex flexDirection="column" ml="10px !important">
          <Heading color={isFinished ? 'textDisabled' : 'text'} fontSize="14px !important">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text style={{opacity:0.6, fontSize:12}} color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
         </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
