export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APR: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'pool',
    sortable: true,
    label: 'Pool',
  },
  {
    id: 2,
    name: 'Earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'APR',
    sortable: true,
    label: '',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: 'Details',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'pool',
    sortable: true,
    label: 'Pool',
  },
  {
    id: 2,
    name: 'Earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'APR',
    sortable: true,
    label: '',
  },
  {
    id: 4,
    name: 'Total Staked',
    sortable: true,
    label: 'Total staked',
  },
  {
    id: 5,
    name: 'Ends in',
    sortable: true,
    label: 'Ends in',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: 'Details',
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
