import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rimauswap-libs/uikit'
// import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import useTheme from 'hooks/useTheme'
import HarvestCard from './HarvestCard'
import UserDetail from './UserDetail'

// ${({ theme }) => theme.colors.gradients.gold}
const BannerWrapper = styled.div`
  background: transprent;
  border-radius: 30px;
  overflow: hidden;
  padding-left: 30px;
  text-align: right;
  padding-right: 30px;
  margin-bottom:20px;
  .right-image{
    display:none;
    img{
      height:100%;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom:20px;
    padding-left:30px;
    padding-right:30px;
    .right-image{
      display:block;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom:20px;
    padding-left:60px;
    padding-right:60px;
    .right-image{
      display:block;
    }
  }
`

const imagePath = '/images/home/lunar-tomcat/'
const imageSrc = 'banner'

const HomeBanner = () => {
  const { t } = useTranslation()
  // const { account } = useWeb3React()
  // const { theme } = useTheme()

  return (
    <BannerWrapper>
      <Flex
        position="relative"
        flexDirection={['row', null, null, 'row']}
        alignItems={['stretch', null, null, 'stretch']}
        justifyContent="center"
      >
        <Flex flex="1" flexDirection="column" style={{paddingTop:15, paddingBottom:15}}>
          <UserDetail />
          <HarvestCard />
        </Flex>
        <Flex
          flex={[null, null, null, '1']}
          position="relative"
          justifyContent="flex-end"
          className="right-image"
        >
          <img src={`${imagePath}${imageSrc}.svg`}  alt={t('Lunar bunny')} />
        </Flex>
      </Flex>
    </BannerWrapper>
  )
}

export default HomeBanner
