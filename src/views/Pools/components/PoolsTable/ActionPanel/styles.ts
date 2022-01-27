import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  background: ${({ theme }) => `${theme.colors.textSubtle}08`};
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: 100%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 32px;
    margin-right: 0;
    margin-bottom: 0;
    height: 100%;
  }
`

export const ActionTitles = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom:10px
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
