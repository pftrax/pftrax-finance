import React from 'react'
import { Flex, useMatchBreakpoints, Button } from '@rimauswap-libs/uikit'
import { ChainId } from '@rimauswap-sdk/sdk'
import { useTranslation } from 'contexts/Localization'
import { registerToken } from 'utils/wallet'
import { RIMAU } from 'config/constants/tokens'



const HomeButtonGroup = () => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  
  return (
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'flex-end']}
        justifyContent="flex-end"
        style={{marginBottom:10}}
        >
        <Flex flex="1" justifyContent="flex-end" width="100%" flexDirection="row">
            <Button as="a"  style={{fontSize:isXs ? 12 : isSm ? 14 : 16, padding: '0 12px',}} href="https://telegram.rimauswap.finance/" target="_blank" mr="5px" variant="secondary" scale={isXs ||  isSm ? "md" : "md"}>
              {t('Join Telegram')}
            </Button>
            <Button as="a" style={{fontSize:isXs ? 12 : isSm ? 14 : 16, padding: '0 12px'}} onClick={() => registerToken(RIMAU[ChainId.MAINNET].address, RIMAU[ChainId.MAINNET].symbol, RIMAU[ChainId.MAINNET].decimals)} mr="0px" variant="danger" scale={isXs ||  isSm ? "md" : "md"}>
              {t('Add RIMAU to MetaMask')}
            </Button>
        </Flex>
      </Flex>
  )
}
export default HomeButtonGroup
