  const RIMAUSWAP_EXTENDED = `${window.location.origin}/tokens/rimauswap-extended.json`
  const RIMAUSWAP_TOP100 = `${window.location.origin}/tokens/rimauswap-top-100.json`

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  RIMAUSWAP_TOP100,
  RIMAUSWAP_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
