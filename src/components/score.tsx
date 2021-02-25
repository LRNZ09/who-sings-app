import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, Button, TextInput } from 'react-native-paper'

import useScore from '../hooks/use-score'
import useTrackCardIndex from '../hooks/use-track-card-index'
import useUser from '../hooks/use-user'
import { RANKING_KEY, USER_KEY } from '../keys'
import { getRankingAsync, getUserAsync } from '../utils'

import Spacer from './spacer'

const Score: React.FC = () => {
	const [, setTrackCardIndex] = useTrackCardIndex()
	const [score = 0, setScore] = useScore()

	const user = useUser()
	const [username, setUsername] = useState<string>()

	const handleOnUsernameChangeText = useCallback((text) => {
		setUsername(text)
	}, [])

	const handleOnSavePress = useCallback(async () => {
		// Save the new score to the user
		const { scores } = await getUserAsync()
		scores.unshift(score)
		await AsyncStorage.mergeItem(USER_KEY, JSON.stringify({ scores, username }))

		// Find the hiscore, sort the ranking and save it
		const hiscore = _.max(scores)
		const ranking = await getRankingAsync()
		const newRanking = _.reject(ranking, { username })
		const sortedRanking = _.orderBy(
			[...newRanking, { hiscore, username }],
			['hiscore'],
			['desc'],
		)
		await AsyncStorage.setItem(RANKING_KEY, JSON.stringify(sortedRanking))

		// Reset score for next round
		setScore(0)
		// And go back to the start
		setTrackCardIndex(-1)
	}, [score, setScore, setTrackCardIndex, username])

	useEffect(() => {
		if (!user.loading) {
			const { username: initialUsername } = user.value ?? {}
			setUsername(initialUsername)
		}
	}, [user.loading, user.value])

	if (user.loading) return <ActivityIndicator />

	return (
		<ScrollView>
			<TextInput
				editable={!user.value?.username}
				left={<TextInput.Icon name='account' />}
				label='Username'
				onChangeText={handleOnUsernameChangeText}
				value={username ?? ''}
			/>

			<Spacer size={8} />

			<TextInput
				editable={false}
				label='Score'
				left={<TextInput.Icon name='music-note' />}
				value={`${score}`}
			/>

			<Spacer size={16} />

			<Button
				disabled={!username}
				icon='plus'
				mode='contained'
				onPress={handleOnSavePress}
			>
				Save score
			</Button>
		</ScrollView>
	)
}

export default Score
