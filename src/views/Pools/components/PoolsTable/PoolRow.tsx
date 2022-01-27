import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@rimauswap-libs/uikit'
import { Pool } from 'state/types'
import { useCakeVault } from 'state/pools/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'

interface PoolRowProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.tr`
cursor: pointer;
background:${({ theme }) => theme.colors.tableRow};
border-bottom: 1px solid ${({ theme }) => `${theme.colors.textSubtle}1a`};
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const {
    fees: { performanceFee },
  } = useCakeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <td>
           <NameCell pool={pool} />
        </td>
        <td>
           <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        </td>
        <td>
           <AprCell pool={pool} performanceFee={performanceFeeAsDecimal} />
        </td>
        
        <td>
        {(isLg || isXl) && <TotalStakedCell pool={pool} />}
        </td>
        <td>
        {isXl && <EndsInCell pool={pool} />}
        </td>
        <td>
        <ExpandActionCell expanded={expanded} isFullLayout={isMd || isLg || isXl} />
        </td>
       
       
      </StyledRow>
      {shouldRenderActionPanel && (
         <tr>
           <td colSpan={6}>
              <ActionPanel
                account={account}
                pool={pool}
                userDataLoaded={userDataLoaded}
                expanded={expanded}
                breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
              />
            </td>
        </tr>
      )}
    </>
  )
}

export default PoolRow
