import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
