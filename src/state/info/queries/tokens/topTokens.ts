import { useEffect, useState } from 'react'
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from 'config/constants/endpoints'
import { TOKEN_BLACKLIST } from 'config/constants/info'
import { getDeltaTimestamps } from 'views/Info/utils/infoQueryHelpers'

interface TopTokensResponse {
  tokens: {
    id: string
    tokenDayData:any
  }[]
}

/**
 * Tokens to display on Home page
 * The actual data is later requested in tokenData.ts
 * Note: dailyTxns_gt: 300 is there to prevent fetching incorrectly priced tokens with high dailyVolumeUSD
 */
const fetchTopTokens = async (timestamp24hAgo: number): Promise<string[]> => {
  try {
    // tokenDayDatas(
    //   orderBy: dailyVolumeUSD
    //   orderDirection: desc
    // ) {
    //   id
    // }
    const query = gql`
      query topTokens($blacklist: [String!], $timestamp24hAgo: Int) {
        tokens(
          where: { id_not_in: $blacklist }
        ) {
          id
          name
          totalLiquidity
          derivedBNB
          derivedUSD
          tokenDayData {
            id
            date
            dailyVolumeBNB
            dailyVolumeToken
          }
        }
      }
    `
    const data = await request<TopTokensResponse>(INFO_CLIENT, query, { blacklist: TOKEN_BLACKLIST, timestamp24hAgo })
    
    return data.tokens.map((t) => t.id.split('-')[0])
  } catch (error) {
    console.error('Failed to fetch top tokens', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopTokenAddresses = (): string[] => {
  const [topTokenAddresses, setTopTokenAddresses] = useState([])
  const [timestamp24hAgo] = getDeltaTimestamps()

  useEffect(() => {
    const fetch = async () => {
      const addresses = await fetchTopTokens(timestamp24hAgo)
      setTopTokenAddresses(addresses)
    }
    if (topTokenAddresses.length === 0) {
      fetch()
    }
  }, [topTokenAddresses, timestamp24hAgo])

  return topTokenAddresses
}

export default useTopTokenAddresses
