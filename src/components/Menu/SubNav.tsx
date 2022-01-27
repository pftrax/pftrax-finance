import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledNav = styled.nav`
  margin-bottom: 0px;
  width: 100%;
  a{
    padding: 0 16px;
    height: 40px;
    border-radius: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    a{
      padding: 0 24px;
      height: 48px;
      border-radius: 16px;
    }
  }
  
`

const getActiveIndex = (pathname: string): number => {
 
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  return 0
}

const Nav = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale={isMobile?'md':'md'}>
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {t('Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {t('Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
