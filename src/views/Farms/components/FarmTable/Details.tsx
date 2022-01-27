import React from 'react'
import styled from 'styled-components'
import {  EyeIcon } from '@rimauswap-libs/uikit'
// import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
  viewMode?: boolean
}

const Container = styled.div<{ viewMode: boolean }>`
  display: flex;
  width: 100%;
  justify-content:${({ viewMode }) => viewMode? 'flex-start':'flex-end'};
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(EyeIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  background:${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}10` : `${theme.colors.primary}20`)};
  border-radius: 4px;
  fill: ${({ theme, toggled }) => (toggled ? `${theme.colors.textSubtle}30` : `${theme.colors.primary}`)};
  height: 30px;
  width: 30px;
  padding: 5px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled, viewMode = false }) => {
  // const { t } = useTranslation()
  // const { isXl } = useMatchBreakpoints()
  // const isMobile = !isXl

  return (
    <Container viewMode={viewMode}>
      {/* {!isMobile && t('Details')} */}
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
