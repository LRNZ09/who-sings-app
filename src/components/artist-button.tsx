import React, { useCallback } from 'react'
import { Button } from 'react-native-paper'

import useTrackCardIndex from '../hooks/use-track-card-index'
import Artist from '../typings/artist'

const ArtistButton: React.FC<{
	artist: Artist
	onPress?: ({ artist }: { artist: Artist }) => void
}> = ({ artist, onPress }) => {
	const [trackCardIndex = 0, setTrackCardIndex] = useTrackCardIndex()

	const handleOnPress = useCallback(() => {
		// TODO function not supported yet
		// setTrackCardIndex((value) => value + 1)
		setTrackCardIndex(trackCardIndex + 1)

		onPress?.({ artist })
	}, [artist, onPress, setTrackCardIndex, trackCardIndex])

	return (
		<Button compact onPress={handleOnPress}>
			{artist.artist_name}
		</Button>
	)
}

export default ArtistButton
