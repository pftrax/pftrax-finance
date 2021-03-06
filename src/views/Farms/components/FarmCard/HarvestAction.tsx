import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text } from '@rimauswap-libs/uikit'
// import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import useToast from 'hooks/useToast'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import useHarvestFarm from '../../hooks/useHarvestFarm'




interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const cakePrice = usePriceCakeBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  return (
    <Flex mb="8px" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
      <Flex flexDirection="row" alignItems="flex-start" mb="10px">
        <Text fontSize="14px"  color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Text>
        {earningsBusd > 0 && (
          <Balance fontWeight="400" fontSize="14px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
        )}
      </Flex>
      <Button
        width="100%"
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          try {
            await onReward()
            toastSuccess(
              `${t('Harvested')}!`,
              t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'RIMAU' }),
            )
          } catch (e) {
            toastError(
              t('Error'),
              t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            )
            console.error(e)
          } finally {
            setPendingTx(false)
          }
          dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
