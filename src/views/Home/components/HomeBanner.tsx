import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Flex, Heading, Text, Link, Button } from '@rimauswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './CompositeImage'


const BannerWrapper = styled.div`
  background:${({ theme }) => theme.colors.gradients.gold};
  border-radius: 30px;
  overflow: hidden;
  padding-left:60px;
  padding-right:60px;
  margin-bottom:130px;
`

const imagePath = '/images/home/lunar-tomcat/'
const imageSrc = 'banner'

const HomeBanner = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()

  return (
    <BannerWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex flex="1" flexDirection="column" style={{paddingTop:20, paddingBottom:20}}>
          <Text textAlign="left" fontSize="20px" color="white" mb="16px">
            {t('20 Contenders')}
          </Text>
          <Heading fontSize="50px !important" color="white" mb="0px" style={{ display: 'flex', justifyContent: "start", alignItems: 'center'}}>
            {t('5 Winners')}
            <Link  href="/">
              <Button style={{marginLeft:"30px"}} scale="md" variant="tertiary">{t('Farm Auctions')}</Button>
            </Link>
          </Heading>
        </Flex>
        <Flex
          flex={[null, null, null, '1']}
          position="relative"
          justifyContent="flex-end"
        >
          <img src={`${imagePath}${imageSrc}.svg`}  alt={t('Lunar bunny')} />
        </Flex>
      </Flex>
    </BannerWrapper>
  )
}

export default HomeBanner
