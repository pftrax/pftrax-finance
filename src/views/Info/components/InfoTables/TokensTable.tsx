import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, ArrowBackIcon, ArrowForwardIcon } from '@rimauswap-libs/uikit'
import { TokenData } from 'state/info/types'
import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'



/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
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
  padding: 0 24px;
  grid-template-columns: 20px 3fr repeat(4, 1fr);
  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 2fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 2fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr 1fr;
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
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

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<{ tokenData: TokenData; index: number }> = ({ tokenData, index }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  // console.log("tokenDayData", tokenData?.tokenDayData)
  return (
    <LinkWrapper to={`/info/token/${tokenData.address}`}>
      <ResponsiveGrid>
        <Flex>
          <Text>{index + 1}</Text>
        </Flex>
        <Flex alignItems="center">
          <ResponsiveLogo address={tokenData.address} />
          {(isXs || isSm) && <Text ml="8px">{tokenData.symbol}</Text>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <Text>{tokenData.name}</Text>
              <Text ml="8px">({tokenData.symbol})</Text>
            </Flex>
          )}
        </Flex>
        {/* *Number(bnbPrice.pair.token0Price) */}
        <Text fontWeight={400}>${formatAmount(tokenData.priceUSD, { notation: 'standard' })}</Text>
        <Text fontWeight={400}>
          <Percent value={tokenData.priceUSDChange} fontWeight={400} />
        </Text>
        <Text fontWeight={400}>${formatAmount(tokenData.volumeUSD)}</Text>
        <Text fontWeight={400}>${formatAmount(tokenData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const SORT_FIELD = {
  name: 'name',
  volumeUSD: 'volumeUSD',
  tvlUSD: 'tvlUSD',
  priceUSD: 'priceUSD',
  priceUSDChange: 'priceUSDChange',
  priceUSDChangeWeek: 'priceUSDChangeWeek',
}

const MAX_ITEMS = 10

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
  maxItems?: number
}> = ({ tokenDatas, maxItems = MAX_ITEMS }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { isXs, isSm } = useMatchBreakpoints()
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenDatas) {
      if (tokenDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenDatas])

  const sortedTokens = useMemo(() => {
    if(isXs || isSm){
      return tokenDatas
      ? tokenDatas
          .slice(0, page * maxItems)
      : []
    }
    return tokenDatas
      ? tokenDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [tokenDatas, maxItems, page, sortDirection, sortField, isXs, isSm])

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

  if (!tokenDatas) {
    return <Skeleton />
  }

  return (
   <>
     {isXs || isSm ?
            sortedTokens.length > 0 ? (
              <>
                {sortedTokens.map((data) => {
                  if (data) {
                    return (
                      <FCard key={data.address}>
                         <LinkWrapper to={`/info/token/${data.address}`}>
                          <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                            <Text  style={{ flex: 1, alignItems: 'center' }}>{t('Name')}:</Text>
                            <Flex flex="1" justifyContent="flex-start" alignItems="center">
                              <ResponsiveLogo address={data.address} />
                              <Text ml="8px">
                                  {data.name} ({data.symbol})
                              </Text>
                            </Flex>
                            
                          </Flex>
                          <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                              <Text style={{ flex: 1, alignItems: 'center' }}>{t('Price')}:</Text>
                              <Text style={{ flex: 1, alignItems: 'center' }}>
                              ${formatAmount(data.priceUSD, { notation: 'standard' })}
                              </Text>
                          </Flex>
                          <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                              <Text style={{ flex: 1, alignItems: 'center' }}>{t('Price Change')}:</Text>
                              <Text style={{ flex: 1, alignItems: 'center' }}>
                                <Percent value={data.priceUSDChange} fontWeight={400} />
                              </Text>
                          </Flex>
                          <Flex mb="20px" justifyContent="space-between" alignItems="center" style={{textAlign:'left'}}>
                              <Text style={{ flex: 1, alignItems: 'center' }}>{t('Volume 24H')}:</Text>
                              <Text style={{ flex: 1, alignItems: 'center' }}>
                              ${formatAmount(data.volumeUSD)}
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
          <ClickableColumnHeader
            color="secondary"
            fontSize="12px"
            bold
            onClick={() => handleSort(SORT_FIELD.name)}
            textTransform="uppercase"
          >
            {t('Name')} {arrow(SORT_FIELD.name)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="secondary"
            fontSize="12px"
            bold
            onClick={() => handleSort(SORT_FIELD.priceUSD)}
            textTransform="uppercase"
          >
            {t('Price')} {arrow(SORT_FIELD.priceUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="secondary"
            fontSize="12px"
            bold
            onClick={() => handleSort(SORT_FIELD.priceUSDChange)}
            textTransform="uppercase"
          >
            {t('Price Change')} {arrow(SORT_FIELD.priceUSDChange)}
          </ClickableColumnHeader> 
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
            onClick={() => handleSort(SORT_FIELD.tvlUSD)}
            textTransform="uppercase"
          >
            {t('Liquidity')} {arrow(SORT_FIELD.tvlUSD)}
          </ClickableColumnHeader>
        </ResponsiveGrid>

        <Break />
        {sortedTokens.length > 0 ? (
          <>
            {sortedTokens.map((data, i) => {
              if (data) {
                return (
                  <React.Fragment key={data.address}>
                    <DataRow index={(page - 1) * MAX_ITEMS + i} tokenData={data} />
                    <Break />
                  </React.Fragment>
                )
              }
              return null
            })}
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
            <Box />
          </>
        )}
        </TableWrapper>
      }
    </>
  )
}

export default TokenTable
