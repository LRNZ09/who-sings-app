import createGlobalState from 'react-use/lib/factory/createGlobalState'

const useTrackCardIndex = createGlobalState<number>(-1)

export default useTrackCardIndex
