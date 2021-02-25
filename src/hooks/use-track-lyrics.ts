import { useMemo } from 'react'

import TrackLyrics from '../typings/track-lyrics'

import useApi from './use-api'

const useTrackLyrics = ({ trackId }: { trackId?: number }) => {
	const config = useMemo(
		() => ({
			params: { track_id: trackId },
		}),
		[trackId],
	)

	return useApi<TrackLyrics>(trackId ? '/track.lyrics.get' : null, config)
}

export default useTrackLyrics
