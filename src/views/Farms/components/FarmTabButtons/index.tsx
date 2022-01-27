import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonGroup, ButtonGroupItem, NotificationDot, useMatchBreakpoints } from '@rimauswap-libs/uikit'
// import { ButtonGroup, ButtonGroupItem } from '@rimauswap-libs/uikit/dist/components/ButtonMenu'
import { useTranslation } from 'contexts/Localization'

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()
  // const theme = useTheme()
  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  const width = true;
  return (
    <Wrapper>
      <ButtonGroup  fullWidth={width} activeIndex={activeIndex} scale={isMobile?'sm':'md'}>
        <ButtonGroupItem className="toggle-button-group" as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonGroupItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonGroupItem className="toggle-button-group" as={Link} to={`${url}/history`}>
            {t('Finished')}
          </ButtonGroupItem>
        </NotificationDot>
      </ButtonGroup>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 10px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom:10px;
  }
`
