import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from 'config/constants/endpoints'
import { TOKEN_BLACKLIST } from 'config/constants/info'
import { getDeltaTimestamps } from 'views/Info/utils/infoQueryHelpers'

interface TopPoolsResponse {
  pairDayDatas: {
    id: string
  }[],
  pairs: {
    id: string
  }[]
}

/**
 * Initial pools to display on the home page
 */
 // where: { dailyTxns_gt: 300, token0_not_in: $blacklist, token1_not_in: $blacklist, date_gt: $timestamp24hAgo } TODO Remove Where : 2021-09-09
const fetchTopPools = async (timestamp24hAgo: number): Promise<string[]> => {
  try {
    // first: 30
    // const query = gql`
    //   query topPools($blacklist: [String!], $timestamp24hAgo: Int) {
    //     pairDayDatas(
    //       orderBy: dailyVolumeUSD
    //       orderDirection: desc
    //     ) {
    //       id
    //     }
    //   }
    // `
    const query = gql`
      query topPools($blacklist: [String!], $timestamp24hAgo: Int) {
        pairs(
          orderBy: volumeUSD
          orderDirection: desc
          where: { token0_not_in: $blacklist, token1_not_in: $blacklist }
        ) {
          id
          name
          volumeUSD
        } 
      }
    `

    const data = await request<TopPoolsResponse>(INFO_CLIENT, query, { blacklist: TOKEN_BLACKLIST, timestamp24hAgo })
    // pairDayDatas id has compound id "0xPOOLADDRESS-NUMBERS", extracting pool address with .split('-')
    return data.pairs.map((p) => p.id.split('-')[0])
  } catch (error) {
    console.error('Failed to fetch top pools', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopPoolAddresses = (): string[] => {
  const [topPoolAddresses, setTopPoolAddresse] = useState([])
  const [timestamp24hAgo] = getDeltaTimestamps()

  useEffect(() => {
    const fetch = async () => {
      const addresses = await fetchTopPools(timestamp24hAgo);
      setTopPoolAddresse(addresses)
    }
    if (topPoolAddresses.length === 0) {
      fetch()
    }
  }, [topPoolAddresses, timestamp24hAgo])

  return topPoolAddresses
}

export default useTopPoolAddresses
