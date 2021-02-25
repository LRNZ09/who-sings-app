import _ from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { Card, Paragraph } from 'react-native-paper'

import useCountdown from '../hooks/use-countdown'
import useScore from '../hooks/use-score'
import styles from '../styles'
import ArtistRelated from '../typings/artist-related'
import Track from '../typings/track'
import TrackLyrics from '../typings/track-lyrics'

import ArtistButton from './artist-button'

const TrackCardContent: React.FC<{
	artistRelated: ArtistRelated
	track: Track
	trackLyrics: TrackLyrics
}> = ({ artistRelated, track, trackLyrics }) => {
	const counter = useCountdown()
	const [score = 0, setScore] = useScore()

	const handleOnArtistPress = useCallback(
		async ({ artist }) => {
			if (artist.artist_id === track.artist_id) {
				// TODO function not supported yet
				// setScore((prevScore) => prevScore + counter * 100)
				setScore(score + counter * 100)
			}
		},
		[counter, score, setScore, track.artist_id],
	)

	const artists = useMemo(
		() =>
			_.shuffle([
				track,
				artistRelated.artist_list[0].artist,
				artistRelated.artist_list[1].artist,
			]),
		[artistRelated.artist_list, track],
	)

	const lyric = useMemo(
		() =>
			_.sample(
				trackLyrics.lyrics.lyrics_body
					.split('\n')
					.filter(
						(value: string) => value.length > 12 && !value.includes('*******'),
					),
			),
		[trackLyrics.lyrics.lyrics_body],
	)

	return (
		<>
			<Card.Title
				title={lyric}
				titleNumberOfLines={4}
				subtitle={trackLyrics.lyrics.lyrics_copyright}
				subtitleNumberOfLines={3}
			/>
			<Card.Content>
				<Paragraph>
					{counter !== 0
						? `Time remaining: ${counter}`
						: "Time's out! You're not getting any point."}
				</Paragraph>
			</Card.Content>
			<Card.Actions style={styles.wrap}>
				{artists.map((artist) => (
					<ArtistButton
						key={artist.artist_id}
						artist={artist}
						onPress={handleOnArtistPress}
					/>
				))}
			</Card.Actions>
		</>
	)
}

export default TrackCardContent
