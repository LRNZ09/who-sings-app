import React from 'react'
import { ActivityIndicator, Card } from 'react-native-paper'

import useArtistRelated from '../hooks/use-artist-related'
import useTrackLyrics from '../hooks/use-track-lyrics'
import Track from '../typings/track'

import TrackCardContent from './track-card-content'

const TrackCard: React.FC<{ track: Track }> = ({ track }) => {
	const artistId = track.artist_id
	const trackId = track.track_id

	const { data: artistRelated } = useArtistRelated({ artistId })
	const { data: trackLyrics } = useTrackLyrics({ trackId })

	return (
		<Card>
			{!artistRelated || !trackLyrics ? (
				<Card.Content>
					<ActivityIndicator />
				</Card.Content>
			) : (
				<TrackCardContent
					artistRelated={artistRelated}
					track={track}
					trackLyrics={trackLyrics}
				/>
			)}
		</Card>
	)
}

export default TrackCard
