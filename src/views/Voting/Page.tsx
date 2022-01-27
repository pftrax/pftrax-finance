import React from 'react'
import styled from 'styled-components'
// import { Flex } from '@rimauswap-libs/uikit'
// import Footer from 'components/Menu/Footer'
// import SubNav from 'components/Menu/SubNav'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  // background: ${({ theme }) => theme.colors.background};
  .card-body{
    padding-left:0;
    padding-right:0;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left:24px;
      padding-right:24px;
    }
   
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    min-height: calc(100vh - 64px);
  }
`

const SwapCard = styled.div`
  background-color: ${({ theme }) => `${theme.colors.backgroundAlt}70` };
  border-radius: 1rem;
  position:relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width:600px;
  width: 100%;
  padding: 12px;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 32px;
  }
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <StyledPage {...props}>
      <SwapCard>
      {/* <SubNav /> */}
      {children}
      </SwapCard>
      {/* <Flex flexGrow={1} /> */}
      {/* <Footer /> */}
    </StyledPage>
  )
}

export default Page
