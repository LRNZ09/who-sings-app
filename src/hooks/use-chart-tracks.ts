import { useMemo } from 'react'

import ChartTracks from '../typings/chart-tracks'

import useApi from './use-api'

const useChartTracks = () => {
	const config = useMemo(
		() => ({
			params: {
				chart_name: 'mxmweekly_new',
				// country: 'XW',
				f_has_lyrics: 1,
				page_size: 10,
			},
		}),
		[],
	)

	return useApi<ChartTracks>('/chart.tracks.get', config)
}

export default useChartTracks
