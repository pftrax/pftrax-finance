import React from 'react'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import SalesSection from './components/SalesSection'
import UserBanner from './components/UserBanner'
import Welcome from './components/Welcome'

// import HomeButtonGroup from './components/HomeButtonGroup'
// import WinSection from './components/WinSection'
// import Footer from './components/Footer'
// import MetricsSection from './components/MetricsSection'
// import CakeDataRow from './components/CakeDataRow'
// import HomeBanner from './components/HomeBanner'
// import Container from 'components/Layout/Container'
// import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px !important;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0px !important;
  }
`



// const UserBannerWrapper = styled(Container)`
//   z-index: 1;
//   position: absolute;
//   width: 100%;
//   top: 0px;
//   left: 50%;
//   transform: translate(-50%, 0);
//   padding-left: 0px;
//   padding-right: 0px;
//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding-left: 12px;
//     padding-right: 12px;
//   }
//   ${({ theme }) => theme.mediaQueries.xl} {
//     padding-left: 24px;
//     padding-right: 24px;
//   }
// `

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const HomeSectionContainerStyles = { margin: '0', width: '100%' }

  return (
    <>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'transparent'
            : 'transparent'
        }
        index={2}
        hasCurvedDivider={false}
      >
        {/* <HomeButtonGroup /> */}
        {/* { account && (
            <UserBannerWrapper>
              <UserBanner />
            </UserBannerWrapper>
          ) // comment out for removing user profile 
        } */}
        {
          account?
          <UserBanner />
          :null
        }
        {/* <HomeBanner  /> */}
        <Welcome />
        <Hero />
      </StyledHeroSection>
      <PageSection
        className="mobile-container"
        innerProps={{ style: HomeSectionContainerStyles }}
        index={2}
        hasCurvedDivider={false}
      >
        {/* <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top fill={theme.colors.background}>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper> */}
        <SalesSection {...earnSectionData} />
      </PageSection>
      <PageSection
        className="mobile-container"
        innerProps={{ style: HomeSectionContainerStyles }}
        index={2}
        hasCurvedDivider={false}
      >
        {/* <OuterWedgeWrapper>
          <InnerWedgeWrapper top fill={theme.isDark ? '#201335' : '#D8CBED'}>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper> */}
        <SalesSection {...swapSectionData} />
      </PageSection>
      <PageSection
        className="mobile-container"
        innerProps={{ style: HomeSectionContainerStyles }}
        index={2}
        hasCurvedDivider={false}
      >
        {/* <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top fill={theme.colors.background}>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper> */}
        <SalesSection {...cakeSectionData} />
      </PageSection>
    </>
  )
}

export default Home
