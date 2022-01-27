import React from 'react'
import styled from 'styled-components'
import { EyeIcon } from '@rimauswap-libs/uikit'
// import { useTranslation } from 'contexts/Localization'
import BaseCell from './BaseCell'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout?: boolean
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-right: 32px;
    padding-left: 8px;
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

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded }) => {
  // const { t } = useTranslation()
  return (
    <StyledCell role="cell">
      {/* {isFullLayout && (
        <Text color="primary" bold>
          {expanded ? t('Hide') : t('Details')}
        </Text>
      )} */}
      <ArrowIcon color="primary" toggled={expanded} />
    </StyledCell>
  )
}

export default TotalStakedCell
