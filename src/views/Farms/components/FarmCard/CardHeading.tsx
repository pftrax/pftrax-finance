import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@rimauswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

// const MultiplierTag = styled(Tag)`
//   margin-left: 4px;
// `

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, isCommunityFarm, token, quoteToken }) => {
  const { t } = useTranslation()
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Flex style={{width:"100%", textAlign:'left'}} justifyContent="space-between" alignItems="center">
        <Text style={{flex:1, alignItems:'center'}}>{t('Tokens')}:</Text>
        <Flex flex="1" flexDirection="row" alignItems="center">
          <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={44} height={44} />
          <Flex flexDirection="column" alignItems="flex-start" ml="10px">
            <Heading fontSize="16px !important" mb="4px">{lpLabel.split(' ')[0]}</Heading>
            <Flex justifyContent="center">
              {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
              {/* <MultiplierTag variant="secondary">{multiplier}</MultiplierTag> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
