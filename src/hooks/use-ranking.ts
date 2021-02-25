import useAsync from 'react-use/lib/useAsync'

import { getRankingAsync } from '../utils'

const useRanking = () => useAsync(getRankingAsync)

export default useRanking
