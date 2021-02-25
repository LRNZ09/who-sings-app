import axios, { AxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'

const defaultFetcher = async <TData>(
	url: string,
	config: AxiosRequestConfig,
): Promise<TData> => {
	// * Bypass cors when in development mode
	const corsUrl =
		__DEV__ && Platform.OS === 'web' ? `//localhost:8080/${url}` : url

	const response = await axios(corsUrl, config)

	return response.data
}

export default defaultFetcher
