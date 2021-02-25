import useAsync from 'react-use/lib/useAsync'

import { getUserAsync } from '../utils'

const useUser = () => useAsync(getUserAsync)

export default useUser
