const ARCHIVED_FARMS_START_PID = 0
const ARCHIVED_FARMS_END_PID = -1
const ARCHIVED_FARMS_PID = [1,2,3,5,6]

const isArchivedPid = (pid: number) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID && ARCHIVED_FARMS_PID.includes(pid)

export default isArchivedPid
