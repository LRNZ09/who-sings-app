import AsyncStorage from '@react-native-async-storage/async-storage'

import { RANKING_KEY, USER_KEY } from '../keys'
import Ranking from '../typings/ranking'
import User from '../typings/user'

const getRankingAsync = async (): Promise<Ranking> => {
	const storageRanking = await AsyncStorage.getItem(RANKING_KEY)
	if (!storageRanking) return []
	return JSON.parse(storageRanking)
}

const getUserAsync = async (): Promise<User> => {
	const storageUser = await AsyncStorage.getItem(USER_KEY)
	if (!storageUser) return { scores: [], username: '' }
	return JSON.parse(storageUser)
}

export { getRankingAsync, getUserAsync }
