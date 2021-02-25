import createGlobalState from 'react-use/lib/factory/createGlobalState'

const useScore = createGlobalState<number>(0)

export default useScore
