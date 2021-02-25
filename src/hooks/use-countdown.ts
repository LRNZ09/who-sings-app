// * https://github.com/streamich/react-use/issues/829
import useCounter from 'react-use/lib/useCounter'
import useInterval from 'react-use/lib/useInterval'

const useCountdown = (seconds = 10): number => {
	const [counter, { dec: decrementCounter }] = useCounter(seconds)

	useInterval(decrementCounter, counter === 0 ? null : 1000)

	return counter
}

export default useCountdown
