import _ from 'lodash'
import React, { useMemo } from 'react'
import { ActivityIndicator } from 'react-native-paper'

import useChartTracks from '../hooks/use-chart-tracks'
import useTrackCardIndex from '../hooks/use-track-card-index'

import Score from './score'
import TrackCard from './track-card'

const Quiz: React.FC = () => {
	const { data: chartTracks } = useChartTracks()

	const [trackCardIndex = 0] = useTrackCardIndex()

	const tracks = useMemo(() => _.shuffle(chartTracks?.track_list), [
		chartTracks?.track_list,
	])

	if (!chartTracks) return <ActivityIndicator size='large' />

	if (trackCardIndex === tracks.length) return <Score />

	const track = tracks[trackCardIndex]

	return <TrackCard track={track.track} />
}

export default Quiz
