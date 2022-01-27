import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonGroup, ButtonGroupItem, NotificationDot, useMatchBreakpoints } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'
// import ToggleView, { ViewMode } from './ToggleView/ToggleView'

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

const PoolTabButtons = ({  hasStakeInFinishedPools }) => {
  const { url, isExact } = useRouteMatch()
  const { isXl } = useMatchBreakpoints()

  const isMobile = !isXl
  const { t } = useTranslation()
  const width = true;
  return (
    <Wrapper>
    <ButtonGroup fullWidth={width} activeIndex={isExact ? 0 : 1} scale={isMobile?'sm':'md'}>
      <ButtonGroupItem className="toggle-button-group" as={Link} to={`${url}`}>
        {t('Live')}
      </ButtonGroupItem>
      <NotificationDot show={hasStakeInFinishedPools}>
        <ButtonGroupItem className="toggle-button-group" as={Link} to={`${url}/history`}>
          {t('Finished')}
        </ButtonGroupItem>
      </NotificationDot>
    </ButtonGroup>
  </Wrapper>
  )
}

export default PoolTabButtons
