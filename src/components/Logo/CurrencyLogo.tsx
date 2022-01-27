import { Currency, ETHER, Token } from '@rimauswap-sdk/sdk'
import { BinanceIcon } from '@rimauswap-libs/uikit'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'
import { RIMAU } from '../../config/constants/tokens'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: '2px solid #ffffff';
  border-radius:100%;
`
export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []
    if (currency instanceof Token) {
      if(currency?.symbol === 'RIMAU') {
        if(currency?.symbol === RIMAU[currency.chainId].symbol && currency.address === RIMAU[currency.chainId].address) {
          return [`${window.location.origin}/images/tokens/${RIMAU[currency.chainId].address}.png`]
        }
      }
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <BinanceIcon width={size} style={{...style, borderRadius:'100%', border:'2px solid #ffffff'}} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} /> 
}