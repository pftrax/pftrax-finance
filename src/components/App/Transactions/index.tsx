import React from 'react'
import { HistoryIcon, IconButton, useModal } from '@rimauswap-libs/uikit'
import TransactionsModal from './TransactionsModal'
import useTheme from '../../../hooks/useTheme'


const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const { theme } = useTheme()
  return (
    <>
      <IconButton style={{ background: `${theme.colors.textSubtle}08`, borderRadius:4, margin:2}} variant="text" scale="sm" onClick={onPresentTransactionsModal} ml="16px">
        <HistoryIcon color="primary" width="24px" />
      </IconButton>
    </>
  )
}

export default Transactions
