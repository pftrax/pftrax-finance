import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Box, Text, Heading, Card, Skeleton, CardHeader, CardBody  } from '@rimauswap-libs/uikit'
import { format, fromUnixTime } from 'date-fns'
import { useTranslation } from 'contexts/Localization'
import { ChainId } from '@rimauswap-sdk/sdk'
import { RIMAU } from 'config/constants/tokens'
import Page from 'components/Layout/Page'
import Balance from 'components/Balance'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import BarChart from 'views/Info/components/InfoCharts/BarChart'
import {
  useAllPoolData,
  useAllTokenData,
  useProtocolChartData,
  useProtocolData,
  useProtocolTransactions,
} from 'state/info/hooks'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import { usePriceCakeBusd } from 'state/farms/hooks'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import { RIMAU_PER_BLOCK } from 'config'
import useTokenBalance, { useBurnedBalance, useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import { getAddress, getCakeAddress } from 'utils/addressHelpers'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;
  
  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`
const ScheduleInner = styled(Flex)`
  flex-direction: column;
  width:100%;
  & > div{
    flex:1;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  } ;
`

const Overview: React.FC = () => {
  const { t } = useTranslation()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [volumeDateHover, setVolumeDateHover] = useState<string | undefined>()
  const [balancecakePriceBusd, setBalancecakePriceBusd] = useState<number | undefined>()
  const [protocolData] = useProtocolData()
  const [chartData] = useProtocolChartData()
  const [transactions] = useProtocolTransactions()
  const cakePriceBusd = usePriceCakeBusd();
  const { earningsSum } = useFarmsWithBalance();
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd)
 
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()));
  // const earningsBusd =  new BigNumber(earningsSum).multipliedBy(cakePriceBusd)
  const totalSupply = useTotalSupply();
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) : 0;
  // console.log("rimau price", cakePriceBusd.toNumber())
  // RIMAU[ChainId.MAINNET].address

   const { balance } = useTokenBalance(getAddress({56:RIMAU[ChainId.MAINNET].address,97:''}))
  //  const { balance } = useTokenBalance("0xe671A04130e2401E6BD251412341ab8aD5cf62FA")
   const formatedBalance = getBalanceAmount(balance)
   const displayBalanceUsd = getBalanceAmount(balance).toFixed(3, BigNumber.ROUND_DOWN)
   
  //  useTokenBalance(RIMAU[ChainId.MAINNET].address);

  // console.log("earningsBusd", earningsSum)
  useEffect(() => {
    if(formatedBalance && cakePriceBusd){
      setBalancecakePriceBusd(formatedBalance.multipliedBy(cakePriceBusd).toNumber())
    }
  }, [formatedBalance, cakePriceBusd])

  const currentDate = format(new Date(), 'MMM d, yyyy')
  // Getting latest liquidity and volumeUSD to display on top of chart when not hovered
  useEffect(() => {
    if (volumeHover == null && protocolData) {
      setVolumeHover(protocolData.volumeUSD)
    }
  }, [protocolData, volumeHover])

  useEffect(() => {
    if (liquidityHover == null && protocolData) {
      setLiquidityHover(protocolData.liquidityUSD)
    }
  }, [liquidityHover, protocolData])


  const formattedLiquidityData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.liquidityUSD,
        }
      })
    }
    return []
  }, [chartData])


  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])

  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
  }, [allTokens])

  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter((pool) => pool)
  }, [allPoolData])
  const somePoolsAreLoading = useMemo(() => {
    return Object.values(allPoolData).some((pool) => !pool.data)
  }, [allPoolData])

  // console.log("volumeHover", volumeHover)
  return (
    <Page>
       <ChartCardsContainer>
          <Card>
            <CardHeader pb="0px !important" variant="transparent">
              <Heading fontSize="28px !important">{t('Farms & Staking')}</Heading>
            </CardHeader>
            <CardBody>
              <ScheduleInner>
                <Flex flexDirection="column" justifyContent="center" mb="20px">
                  <img src="/images/icon.svg"  alt={t('Rimau Icon')} style={{width:60, marginBottom:10}} />
                  <Text fontSize="14px" mb="10px">{t('Rimau to Harvest')}</Text>
                  {/* <Text fontSize="20px" mb="10px" fontWeight="600">{Number(earningsSum).toFixed(3)}</Text> */}
                  {
                    earningsSum || earningsSum===0?(
                      <Text fontSize="20px" mb="0px" fontWeight="600">{Number(earningsSum).toFixed(3)}</Text> 
                      // <Balance decimals={0} lineHeight="1.1" fontSize="22px" bold value={earningsSum} />
                    )
                    :(
                      <Skeleton width="128px" height="36px" />
                    )
                  }
                 
                 
                  {
                    earningsBusd && earningsBusd.toNumber()===0 ?
                    <>
                    <Balance decimals={3} lineHeight="2.1" prefix="$"  fontSize="12px" bold value={earningsBusd.toNumber()} />
                    {/* <Balance decimals={3} lineHeight="2.1" prefix="$"  fontSize="12px" bold value={223121.2342342} /> */}
                    </>
                    // <Text fontSize="12px" mb="10px" style={{opacity:0.5}} >$ {Number(earningsBusd.toNumber().toFixed(3))}</Text>
                    : <Skeleton width="128px" height="36px" />
                  }
                </Flex>
                <Flex flexDirection="column" justifyContent="center" mb="20px">
                  <img src="/images/icon.svg"  alt={t('Rimau Icon')} style={{width:60, marginBottom:10}} />
                  <Text fontSize="14px" mb="10px">{t('Rimau in Wallet')}</Text>
                 
                  {
                    balance.toNumber() || balance.toNumber()===0 ?
                    <Text fontSize="22px" mb="0px" fontWeight="600">{Number(displayBalanceUsd).toFixed(3)}</Text> 
                    // <Balance decimals={0} lineHeight="1.1" fontSize="22px" bold value={Number(displayBalanceUsd)} />
                    :<Skeleton width="128px" height="36px" />
                  }
                 
                  {
                   
                    balancecakePriceBusd || balancecakePriceBusd===0 ?
                    <>
                    <Balance decimals={3} prefix="$" lineHeight="2.1" color="text" fontSize="12px" bold value={balancecakePriceBusd} />
                    {/* <Balance decimals={3} prefix="$" lineHeight="2.1" color="text" fontSize="12px" bold value={1213123121.12121} /> */}
                    </>
                    // <Text fontSize="12px" mb="10px" style={{opacity:0.5}} >$ {Number(Number(balance.toNumber())*Number(cakePriceBusd)).toFixed(3)}</Text>
                    : <Skeleton width="128px" height="36px" />
                  }
                  
                </Flex>
              </ScheduleInner>
              {/* <Button width="100%" p="0" variant="primary"> {t('Harvest')}(0)</Button> */}
            </CardBody>
          </Card>
          <Card>
            <CardHeader pb="0px !important" variant="transparent">
              <Heading fontSize="28px !important">{t('Rimau Stats')}</Heading>
            </CardHeader>
            <CardBody paddingTop={[0,0,0,50]}>
              <Flex flexDirection="row" justifyContent="space-between">
                <Text fontSize="14px" mb="10px">{t('Total Rimau Supply')}</Text>
                {cakeSupply? (
                   <Balance decimals={3} lineHeight="1.1" fontSize="16px" bold value={cakeSupply} />
                  ):
                  <Skeleton height={24} width={126} my="4px" />
                }
                {/* <Text fontSize="16px" mb="10px" fontWeight="600">{cakeSupply.toFixed(3)}</Text> */}
              </Flex>
              <Flex flexDirection="row" justifyContent="space-between">
                <Text fontSize="14px" mb="10px">{t('Total Rimau Burned')}</Text>
                {burnedBalance  ? (
                    <Balance decimals={3} lineHeight="1.1" fontSize="16px" bold value={burnedBalance} />
                  ) : (
                    <Skeleton height={24} width={126} my="4px" />
                  )}
              </Flex>
              <Flex flexDirection="row" justifyContent="space-between">
                <Text fontSize="14px" mb="10px">{t('New Rimau/block')}</Text>
                <Text fontSize="16px" mb="10px" fontWeight="600">{RIMAU_PER_BLOCK.toNumber()}</Text>
              </Flex>
            </CardBody>
          </Card>
      </ChartCardsContainer>

      <Heading scale="lg" mt="16px" mb="16px">
        {t('RimauSwap Info & Analytics')}
      </Heading>
      <ChartCardsContainer>
        <Card>
          <Box p={['16px', '16px', '24px']}>
            <Text bold color="secondary">
              {t('Liquidity')}
            </Text>
            {liquidityHover || liquidityHover >= 0 ? (
              <Text bold fontSize="24px">
                ${formatAmount(liquidityHover)}
              </Text>
            ) : (
              <Skeleton width="128px" height="36px" />
            )}
            <Text>{liquidityDateHover ?? currentDate}</Text>
            <Box height="250px">
              <LineChart
                data={formattedLiquidityData}
                setHoverValue={setLiquidityHover}
                setHoverDate={setLiquidityDateHover}
              />
            </Box>
          </Box>
        </Card>
        <Card>
          <Box p={['16px', '16px', '24px']}>
            <Text bold color="secondary">
              {t('Volume 24H')}
            </Text>
            {volumeHover  || Number(volumeHover) >= 0  ? (
              <Text bold fontSize="24px">
                ${formatAmount(volumeHover)}
              </Text>
            ) : (
              <Skeleton width="128px" height="36px" />
            )}
            <Text>{volumeDateHover ?? currentDate}</Text>
            <Box height="250px">
              <BarChart data={formattedVolumeData} setHoverValue={setVolumeHover} setHoverDate={setVolumeDateHover} />
            </Box>
          </Box>
        </Card>
      </ChartCardsContainer>
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Tokens')}
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Pools')}
      </Heading>
      <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} />
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Transactions')}
      </Heading>
      <TransactionTable transactions={transactions} />
    </Page>
  )
}

export default Overview
