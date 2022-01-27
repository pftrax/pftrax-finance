import { useEffect, useState } from 'react'
import { Tokens } from './tokensJson';
import { Pools } from './poolsJson';

// const apiurl = 
export const useGetInfoToken = () => {
  const [data, setData] = useState([])

  // useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/tokens')
        // const responseData = await response.json();
        const responseData = Tokens;
        const res = [];
        Object.entries(responseData.data).forEach(([key, value]) => {
          res.push({
            ...value,
            priceBNB:value.price_BNB,
            address:key
          });
        });
        setData(res);
        // setData(responseData);
      } catch (error) {
        setData([]);
        console.error('Unable to fetch data:', error)
      }
    }
    if(data.length===0){
      fetchData()
    }

  // }, [setData])
  return data
}

export const useGetInfoPairs = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/pairs')
        // const responseData = await response.json()
        const responseData = Pools;
        const res = [];
        Object.entries(responseData.data).forEach(([key, value]) => {
          // key
          res.push({ ...value, id:key });
        });
        setData(res);
        // setData(responseData)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])
  return data
}

export const useGetInfoSummary = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/summary')
        const responseData = await response.json()

        setData(responseData)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])
  return data
}
