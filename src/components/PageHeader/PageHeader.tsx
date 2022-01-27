import React from 'react'
import styled from 'styled-components'
import { Box } from '@rimauswap-libs/uikit'
import Container from '../Layout/Container'

// <{ background?: string }>
const Outer = styled(Box)`
`

const Inner = styled(Container)`
  padding-top: 12px;
  padding-bottom: 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`

const PageHeader: React.FC<{ background?: string }> = ({ children, ...props }) => (
  <Outer {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
