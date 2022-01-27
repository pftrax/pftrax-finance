import React from 'react'
import { TuneIcon, NotificationDot, useModal, IconButton } from '@rimauswap-libs/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import SettingsModal from './SettingsModal'
import useTheme from '../../../hooks/useTheme'

export default function SettingsTab() {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const [expertMode] = useExpertModeManager()
  const { theme } = useTheme()
  return (
    <NotificationDot show={expertMode}>
      <IconButton style={{ background: `${theme.colors.textSubtle}08`, borderRadius:4, margin:2}} variant="text" scale="sm" onClick={onPresentSettingsModal} id="open-settings-dialog-button">
        <TuneIcon color="primary" width="24px" />
      </IconButton>
    </NotificationDot>
  )
}
