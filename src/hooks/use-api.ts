import { AxiosRequestConfig } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'

import { API_KEY } from '../constants'
import defaultFetcher from '../utils/default-fetcher'

const apiFetcher = async (...args: Parameters<typeof defaultFetcher>) => {
	const data = await defaultFetcher<{
		message: { body: any; header: { status_code: number } }
	}>(...args)

	if (
		data.message.header.status_code < 200 ||
		data.message.header.status_code > 299
	)
		throw new Error('An error occurred.')

	return data
}

const useApi = <TData>(path: string | null, config?: AxiosRequestConfig) => {
	const authConfig = useMemo(
		() => ({
			...config,
			params: {
				...config?.params,
				apikey: API_KEY,
			},
		}),
		[config],
	)

	const { data, ...rest } = useSWR<{ message: { body: TData } }>(
		path ? [`https://api.musixmatch.com/ws/1.1${path}`, authConfig] : null,
		apiFetcher,
	)

	return { ...rest, data: data?.message.body }
}

export default useApi
