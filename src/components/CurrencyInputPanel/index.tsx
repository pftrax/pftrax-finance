import React from 'react'
import { Currency, Pair } from '@rimauswap-sdk/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, useMatchBreakpoints } from '@rimauswap-libs/uikit'
// import {  useRouteMatch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
  flex-wrap: wrap;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-flow: row nowrap;
    flex-direction: row;
  }
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 180px;
    & > div{
      text-align: left;
      justify-content: start;
      width: 100%;
    }
  }
`
const MaxButton = styled.div`
  width: 70px;
  text-align: right;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  border-bottom:${({ theme }) => `1px solid ${theme.colors.textSubtle}20` };
  padding: 0.75rem 1rem 0.75rem 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  width:100%;
  position: relative;
  flex-flow: column;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
   z-index: 1;
  
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => `${theme.colors.textSubtle}08`};
`
interface CurrencyInputPanelProps {
  value: string
  isSwap?:boolean
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  isSwap,
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

 
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="14px">{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? t('Balance: %amount%', { amount: selectedCurrencyBalance?.toSignificant(6) ?? '' })
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
         {!hideInput && !isMobile && !isSwap && (
            <>
              <NumericalInput
                isSwap={isSwap}
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              <MaxButton>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
              </MaxButton>  
            </>
          )}
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" flexDirection={isSwap?'row':isMobile?'row':'row-reverse'} justifyContent="space-between">
              {pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                // console.log("currency", currency),
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '15px', marginLeft: '15px' }} />
              ) : null}
              
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          {!hideInput && isMobile && !isSwap && (
            <>
             <MaxButton>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
              </MaxButton>
              <NumericalInput
                isSwap={isSwap}
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
            </>
          )}
          {!hideInput && isSwap && (
            <>
              {
                isMobile? <MaxButton>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
                </MaxButton>:null
              }
              <NumericalInput
                isSwap={isSwap}
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {
                isMobile?null
                :<MaxButton>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
                </MaxButton>
              }
            </>
          )}


          
        </InputRow>
      </Container>
    </InputPanel>
  )
}
