import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Flex, Box, Skeleton, ArrowBackIcon, ArrowForwardIcon , useMatchBreakpoints} from '@rimauswap-libs/uikit'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { PoolData } from 'state/info/types'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'


/**
 *  Columns on different layouts
 *  5 = | # | Pool | TVL | Volume 24H | Volume 7D |
 *  4 = | # | Pool |     | Volume 24H | Volume 7D |
 *  3 = | # | Pool |     | Volume 24H |           |
 *  2 = |   | Pool |     | Volume 24H |           |
 */

 const FCard = styled.div`
  width: 100%;
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 12px;
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  margin: 10px 0;
  text-align: center;
`
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 20px 3.5fr repeat(5, 1fr);
  padding: 0 24px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(3, 1fr);
    & :nth-child(4),
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 20px 1.5fr repeat(1, 1fr);
    & :nth-child(4),
    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
      display: none;
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  tvlUSD: 'tvlUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
}

const LoadingRow: React.FC = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)


const DataRow = ({ poolData, index }: { poolData: PoolData; index: number }) => {
  return (
    <LinkWrapper to={`/info/pool/${poolData.address}`}>
      <ResponsiveGrid>
        <Text>{index + 1}</Text>
        <Flex>
          <DoubleCurrencyLogo address0={poolData.token0.address} address1={poolData.token1.address} />
          <Text ml="8px">
            {poolData.token0.symbol}/{poolData.token1.symbol}
          </Text>
        </Flex>
        <Text>
          ${formatAmount(poolData.volumeUSD)}
        </Text>
        <Text>${formatAmount(poolData.volumeUSDWeek)}</Text>
        <Text>${formatAmount(poolData.lpFees24h)}</Text>
        <Text>{formatAmount(poolData.lpApr7d)}%</Text>
        <Text>${formatAmount(poolData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
}

const PoolTable: React.FC<PoolTableProps> = ({ poolDatas, loading }) => {
  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { isXs, isSm } = useMatchBreakpoints()
  const { t } = useTranslation()

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(poolDatas.length / ITEMS_PER_INFO_TABLE_PAGE) + extraPages)
  }, [poolDatas])

  const sortedPools = useMemo(() => {
    if(isXs || isSm){
      return poolDatas
      ? poolDatas
          .slice(0, page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
    }

    return poolDatas
      ? poolDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [page, poolDatas, sortDirection, sortField, isXs, isSm])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  return (
    <>
      {isXs || isSm ?
           sortedPools.length > 0 ? (
             <>
               {sortedPools.map((data) => {
                 if (data) {
                   return (
                     <FCard key={data.address}>
                        <LinkWrapper to={`/info/pool/${data.address}`}>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                           <Text  style={{ flex: 1, alignItems: 'center' }}>{t('Pool Name')}:</Text>
                           <Flex flex="1" justifyContent="flex-start" alignItems="center">
                              <DoubleCurrencyLogo address0={data.token0.address} address1={data.token1.address} />
                              <Text ml="8px">
                              {data.token0.symbol}/{data.token1.symbol}
                              </Text>
                           </Flex>
                         </Flex>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                             <Text style={{ flex: 1, alignItems: 'center' }}>{t('Volume 24H')}:</Text>
                             <Text style={{ flex: 1, alignItems: 'center' }}>
                             ${formatAmount(data.volumeUSD)}
                             </Text>
                         </Flex>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                             <Text style={{ flex: 1, alignItems: 'center' }}>{t('Volume 7D')}:</Text>
                             <Text style={{ flex: 1, alignItems: 'center' }}>
                               ${formatAmount(data.volumeUSDWeek)}
                             </Text>
                         </Flex>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                             <Text style={{ flex: 1, alignItems: 'center' }}>{t('LP reward fees 24H')}:</Text>
                             <Text style={{ flex: 1, alignItems: 'center' }}>
                             ${formatAmount(data.lpFees24h)}
                             </Text>
                         </Flex>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                             <Text style={{ flex: 1, alignItems: 'center' }}>{t('LP reward APR')}:</Text>
                             <Text style={{ flex: 1, alignItems: 'center' }}>
                             {formatAmount(data.lpApr7d)}%
                             </Text>
                         </Flex>
                         <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                             <Text style={{ flex: 1, alignItems: 'center' }}>{t('Liquidity')}:</Text>
                             <Text style={{ flex: 1, alignItems: 'center' }}>
                             ${formatAmount(data.liquidityUSD)}
                             </Text>
                         </Flex>
                       </LinkWrapper>
                   </FCard>
                   )
                 }
                 return null
               })}
               <PageButtons>
                 {
                   page !== maxPage?
                      <Text bold fontSize="16px" onClick={() => {
                        setPage(page === maxPage ? page : page + 1)
                      }}>
                        See More
                      </Text>
                   :null
                 }
               </PageButtons>
             </>
           ) : (
             <>
               <TableLoader />
               <Box />
             </>
           )
      :
        <TableWrapper>
          <ResponsiveGrid>
            <Text color="secondary" fontSize="12px" bold>
              #
            </Text>
            <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
              {t('Pool')}
            </Text>
            <ClickableColumnHeader
              color="secondary"
              fontSize="12px"
              bold
              onClick={() => handleSort(SORT_FIELD.volumeUSD)}
              textTransform="uppercase"
            >
              {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
            </ClickableColumnHeader>
            <ClickableColumnHeader
              color="secondary"
              fontSize="12px"
              bold
              onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}
              textTransform="uppercase"
            >
              {t('Volume 7D')} {arrow(SORT_FIELD.volumeUSDWeek)}
            </ClickableColumnHeader>
            <ClickableColumnHeader
              color="secondary"
              fontSize="12px"
              bold
              onClick={() => handleSort(SORT_FIELD.lpFees24h)}
              textTransform="uppercase"
            >
              {t('LP reward fees 24H')} {arrow(SORT_FIELD.lpFees24h)}
            </ClickableColumnHeader>
            <ClickableColumnHeader
              color="secondary"
              fontSize="12px"
              bold
              onClick={() => handleSort(SORT_FIELD.lpApr7d)}
              textTransform="uppercase"
            >
              {t('LP reward APR')} {arrow(SORT_FIELD.lpApr7d)}
            </ClickableColumnHeader>
            <ClickableColumnHeader
              color="secondary"
              fontSize="12px"
              bold
              onClick={() => handleSort(SORT_FIELD.tvlUSD)}
              textTransform="uppercase"
            >
              {t('Liquidity')} {arrow(SORT_FIELD.tvlUSD)}
            </ClickableColumnHeader>
          </ResponsiveGrid>
          <Break />
          {sortedPools.length > 0 ? (
            <>
              {sortedPools.map((poolData, i) => {
                if (poolData) {
                  return (
                    <React.Fragment key={poolData.address}>
                      <DataRow index={(page - 1) * ITEMS_PER_INFO_TABLE_PAGE + i} poolData={poolData} />
                      <Break />
                    </React.Fragment>
                  )
                }
                return null
              })}
              {loading && <LoadingRow />}
              <PageButtons>
                <Arrow
                  onClick={() => {
                    setPage(page === 1 ? page : page - 1)
                  }}
                >
                  <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
                </Arrow>

                <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>

                <Arrow
                  onClick={() => {
                    setPage(page === maxPage ? page : page + 1)
                  }}
                >
                  <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
                </Arrow>
              </PageButtons>
            </>
          ) : (
            <>
              <TableLoader />
              {/* spacer */}
              <Box />
            </>
          )}
        </TableWrapper>
    }
    </>
  )
}

export default PoolTable
