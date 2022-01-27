import React from 'react'
import { Menu as UikitMenu } from '@rimauswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceCakeBusd } from 'state/farms/hooks'
// import { useProfile } from 'state/profile/hooks'
import { ChainId } from '@rimauswap-sdk/sdk'
import { RIMAU } from 'config/constants/tokens'
import { registerToken } from 'utils/wallet'
import config from './config'
import ConnectWalletButton from '../ConnectWalletButton'
import helps from './helpConfig'
import socials from './socialConfig'


const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  // const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const addMetaMask = () =>{
    registerToken(RIMAU[ChainId.MAINNET].address, RIMAU[ChainId.MAINNET].symbol, RIMAU[ChainId.MAINNET].decimals)
  }
  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      registerToken={addMetaMask}
      ConnectWalletButton={<ConnectWalletButton />}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t, currentLanguage.code)}
      helps={helps(t)}
      socials={socials(t)}
      /*
        // Remove Profile from displaying.
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      */
      {...props}
    />
  )
}

export default Menu
