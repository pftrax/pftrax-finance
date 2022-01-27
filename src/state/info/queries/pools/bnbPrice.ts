import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from 'config/constants/endpoints'

/**
 * Initial pools to display on the home page
 */
 // where: { dailyTxns_gt: 300, token0_not_in: $blacklist, token1_not_in: $blacklist, date_gt: $timestamp24hAgo } TODO Remove Where : 2021-09-09
const fetchTopPools = async () => {
  try {
    const query = gql`
      {
        pair(id: "0xde5c3dd19894b5a919bb68c323e447b0d4cec7d5") {
          id
          name
          token0Price
        }
      }
    `
    const data = await request(INFO_CLIENT, query, { })
    // pairDayDatas id has compound id "0xPOOLADDRESS-NUMBERS", extracting pool address with .split('-')
    return data
  } catch (error) {
    console.error('Failed to fetch top pools', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useBNBPrice = ()  => {
  const [bnbPrice, setBNBPrice] = useState({
    pair:{
      id:'',
      name:'',
      token0Price:0
    }
  })
  useEffect(() => {
    const fetch = async () => {
      const addresses = await fetchTopPools();
      setBNBPrice(addresses)
    }
    if (bnbPrice.pair.id === '') {
      fetch()
    }
  }, [bnbPrice])
  return bnbPrice
}

export default useBNBPrice
