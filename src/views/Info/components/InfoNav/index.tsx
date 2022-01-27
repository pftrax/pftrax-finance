import React from 'react'
import styled from 'styled-components'
import { Link, useRouteMatch } from 'react-router-dom'
import { Box, Flex, useMatchBreakpoints, ButtonGroup, ButtonGroupItem } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Search from 'views/Info/components/InfoSearch'

const NavWrapper = styled(Flex)`
  // background: ${({ theme }) => theme.colors.gradients.cardHeader};
  justify-content: space-between;
  padding: 20px 16px;
  flex-direction: column-reverse;
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 40px;
    flex-direction: row;
  }
`

const InfoNav = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const { url } = useRouteMatch()
  const isPools = useRouteMatch(['/info/pools', '/info/pool', '/info/pair'])
  const isTokens = useRouteMatch(['/info/tokens', '/info/token'])
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  const width = true;
  return (
    <NavWrapper>
      <Box>
      <ButtonGroup fullWidth={width} style={{ height: 40 }} activeIndex={activeIndex} scale={isMobile?'sm':'md'}>
        <ButtonGroupItem style={isMobile?{ margin: 0, padding:'0 8px' }:{}} className="toggle-button-group" as={Link} to={`${url}`}>
        {t('Overview')}
        </ButtonGroupItem>
        <ButtonGroupItem style={isMobile?{ margin: 0, padding:'0 8px' }:{}}  className="toggle-button-group" as={Link} to={`${url}/pools`}>
            {t('Pools')}
        </ButtonGroupItem>
        <ButtonGroupItem style={isMobile?{ margin: 0, padding:'0 8px' }:{}}  className="toggle-button-group" as={Link} to={`${url}/tokens`}>
             {t('Tokens')}
        </ButtonGroupItem>
      </ButtonGroup>
      </Box>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>
    </NavWrapper>
  )
}

export default InfoNav
