import { useLinkProps } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Button, FAB } from 'react-native-paper'

import Quiz from '../components/quiz'
import useTrackCardIndex from '../hooks/use-track-card-index'
import { RANKING_ROUTE } from '../routes'
import styles from '../styles'

const HomeScreen: React.FC = () => {
	const rankingLinkProps = useLinkProps({ to: RANKING_ROUTE })

	const [trackCardIndex, setTrackCardIndex] = useTrackCardIndex()

	const handleOnQuizStartPress = useCallback(() => {
		setTrackCardIndex(0)
	}, [setTrackCardIndex])

	return (
		<>
			<View style={styles.container}>
				{trackCardIndex != null && trackCardIndex >= 0 ? (
					<Quiz />
				) : (
					<Button icon='play' mode='contained' onPress={handleOnQuizStartPress}>
						Start quiz
					</Button>
				)}
			</View>

			<FAB
				{...rankingLinkProps}
				icon='trophy'
				label='Ranking'
				style={styles.fab}
			/>
		</>
	)
}

export default HomeScreen
