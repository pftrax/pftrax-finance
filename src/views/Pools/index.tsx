import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Text, useMatchBreakpoints, Toggle} from '@rimauswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchPublicPoolsData, usePools, useFetchCakeVault, useCakeVault } from 'state/pools/hooks'
import { usePollFarmsData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
// import BountyCard from './components/BountyCard'   // Not required
// import HelpButton from './components/HelpButton'
import PoolsTable from './components/PoolsTable/PoolsTable'
import ToggleView, { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'
import { DesktopColumnSchema } from './components/types'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`


const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`


const PoolControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 16px 0;
    margin-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
  }
`



const ToggleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction:column;
  & > div:nth-child(1){
    margin-right:0;
  }
  & > div:nth-child(2){
    margin: 10px 0;
  }
  ${Text} {
    margin-left: 8px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    align-items: center;
    flex-direction:row;
    & > div:nth-child(1){
      margin-right: 10px;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom:10px;
  }
`

const LabelWrapper = styled.div`
  margin-bottom:10px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom:0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: 8px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    justify-content: space-between;
    padding: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
    padding: 0;
    margin-bottom:10px;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  
  > div {
    padding: 8px 0px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    margin-bottom:10px;
    justify-content: space-between;
    > div {
      padding: 0;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
    margin-bottom:0px;
    > div {
      padding: 0;
    }
  }
`

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { isXs } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'rimauswap_pool_staked' })
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'rimauswap_pool_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
          if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
            return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
          }
          return poolsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool) =>
        pool.isAutoVault ? (
          <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )
    const columnSchema = DesktopColumnSchema;

    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      
      sort: (a, b) => {
        switch (column.name) {
          case 'farm':
            return b.id - a.id
          case 'apr':
            if (a.original.apr.value && b.original.apr.value) {
              return Number(a.original.apr.value) - Number(b.original.apr.value)
            }

            return 0
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))


  const tableLayout = <PoolsTable pools={chosenPools} columns={columns} account={account} userDataLoaded={userDataLoaded} />
  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h2" scale="xl" fontSize="30px !important" color="textSubtle" mb={isXs?'0px':'16px'}>
              {t('Belang Pools')}
            </Heading>
            <Text textAlign="left" style={{opacity:0.5}}  mt="10px" color="textSubtle">
              {t('Just stake some tokens to earn.')}
            </Text>
            {/* <Heading scale="md" color="text">
              {t('Just stake some tokens to earn.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading> */}
          </Flex>
          {/* <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <HelpButton />
            <BountyCard />
          </Flex> */}
        </Flex>
      </PageHeader>
      <Page>
        <PoolControls>
        {
            isXs ?
              <>
               <LabelWrapper>
                {/* <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                  {t('Search')}
                </Text> */}
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
              </LabelWrapper>
                
                  <FilterContainer>
                    <LabelWrapper>
                      <Text fontSize="14px" mr="10px" color="textSubtle" textTransform="uppercase">
                        {t('Sort by')}
                      </Text>
                      <ControlStretch>
                        <Select
                          options={[
                            {
                              label: t('Hot'),
                              value: 'hot',
                            },
                            {
                              label: t('APR'),
                              value: 'apr',
                            },
                            {
                              label: t('Earned'),
                              value: 'earned',
                            },
                            {
                              label: t('Total staked'),
                              value: 'totalStaked',
                            },
                          ]}
                          onChange={handleSortOptionChange}
                        />
                      </ControlStretch>
                    </LabelWrapper>
                    <LabelWrapper>
                      <ToggleWrapper>
                        {/* <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} /> */}
                        <Text> {t('Staked only')}</Text>
                        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
                        
                      </ToggleWrapper>
                      
                    </LabelWrapper>
                  </FilterContainer>
                  <LabelWrapper>
                    <PoolTabButtons hasStakeInFinishedPools={hasStakeInFinishedPools}/>
                  </LabelWrapper>
                  
              </>
              :
              <>
                 <ViewControls>
                  <ToggleWrapper>
                    <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                    <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
                    <Text> {t('Staked only')}</Text>
                  </ToggleWrapper>
                  <PoolTabButtons hasStakeInFinishedPools={hasStakeInFinishedPools}/>
                </ViewControls>
                  <FilterContainer>
                    <LabelWrapper>
                      <Text fontSize="14px" mr="10px" color="textSubtle" textTransform="uppercase">
                        {t('Sort by')}
                      </Text>
                      {/* <ControlStretch> */}
                        <Select
                          options={[
                            {
                              label: t('Hot'),
                              value: 'hot',
                            },
                            {
                              label: t('APR'),
                              value: 'apr',
                            },
                            {
                              label: t('Earned'),
                              value: 'earned',
                            },
                            {
                              label: t('Total staked'),
                              value: 'totalStaked',
                            },
                          ]}
                          onChange={handleSortOptionChange}
                        />
                      {/* </ControlStretch> */}
                    </LabelWrapper>
                    <LabelWrapper style={{ marginLeft: 16 }}>
                      {/* <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                        {t('Search')}
                      </Text> */}
                      <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
                    </LabelWrapper>
                  </FilterContainer>
              </>
          }
         </PoolControls>
        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD  || isXs ? cardLayout : tableLayout}
          <div ref={loadMoreRef} />
        {/* <Image
          mx="auto"
          mt="12px"
          src="/images/decorations/3d-syrup-bunnies.png"
          alt="Rimauswap illustration"
          width={192}
          height={184.5}
        /> */}
      </Page>
    </>
  )
}

export default Pools
