import React from 'react'
import styled from 'styled-components'
import { Link } from '@rimauswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'

const FixedButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100000000;
  & > div a{
    background: #ffffff;
    border-radius: 45px;
    display:flex;
    color:#202020;
    justify-content: center;
    padding: 6px;
    padding-left: 20px;
    align-items: center;
    img{
      width:32px;
      margin-left:10px;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div a{
      img{
        width:58px;
      }
    }
  }
`
const imagePath = '/images/'
const imageSrc = 'icon'

const HowToGet: React.FC = () => {
  const { t } = useTranslation()

  return (
    <FixedButton>
      <Link external href="https://docs-en.rimauswap.finance/how-to-guides/how-to-get-rimau">
      {t('How to Get Rimau?')}
      <img src={`${imagePath}${imageSrc}.svg`} alt="Rimau Icon" />
      </Link>
    </FixedButton>
  )
}

export default HowToGet
