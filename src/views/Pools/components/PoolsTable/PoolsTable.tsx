import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, ChevronUpIcon, Text, useMatchBreakpoints } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import PoolRow from './PoolRow'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

interface PoolsTableProps {
  pools: Pool[]
  userDataLoaded: boolean
  account: string
  columns?:any
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => `${theme.card.background}70`};
  border-radius: 18px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableHead = styled.thead`
  & tr {
    td {
      font-size: 14px;
      vertical-align: middle;
      padding: 25px 0px;
      text-transform: capitalize;
      &:first-child{
        padding-left:25px;
      }
    }
  }
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`



const PoolsTable: React.FC<PoolsTableProps> = ({ pools, userDataLoaded, account }) => {
  // const { t } = useTranslation()
  // const tableWrapperEl = useRef<HTMLDivElement>(null)

  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { isXl } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.label)
  const { t } = useTranslation()
  // const { data, columns, userDataReady } = props

  // const { rows } = useTable(columns, pools, { sortable: true, sortColumn: 'pool' })
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
           <TableHead>
              <tr >
                {columnNames.map((column) => {
                  return <td key={`table-head-${column}`}>
                    <Text fontSize="14px">{t(column)}</Text>
                  </td>
                })}
              </tr>
            </TableHead>
            <TableBody>
              {pools.map((pool) => (
                <PoolRow
                  key={pool.isAutoVault ? 'auto-cake' : pool.sousId}
                  pool={pool}
                  account={account}
                  userDataLoaded={userDataLoaded}
                />
              ))}
              </TableBody>
          </StyledTable>
          </TableWrapper>
          <ScrollButtonContainer>
              <Button variant="text" onClick={scrollToTop}>
                {t('To Top')}
                <ChevronUpIcon color="primary" />
              </Button>
            </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default PoolsTable
