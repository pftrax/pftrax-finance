import React from 'react'
import { HelpIcon, useTooltip, Box, BoxProps, useMatchBreakpoints } from '@rimauswap-libs/uikit'
import styled from 'styled-components'

interface Props extends BoxProps {
  text: string | React.ReactNode
}

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
    width:100%
  }
`

const QuestionHelper: React.FC<Props> = ({ text, ...props }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement: isXs || isSm ? 'bottom': 'right-end', trigger: 'hover' })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color="textSubtle" width="16px" />
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
