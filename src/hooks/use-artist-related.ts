import _ from 'lodash'
import { useMemo } from 'react'

import ArtistRelated from '../typings/artist-related'

import useApi from './use-api'

const SPARE_ARTISTS = [
	{ artist: { artist_id: 0, artist_name: 'Elton John' } },
	{ artist: { artist_id: 1, artist_name: 'Elvis Presley' } },
	{ artist: { artist_id: 2, artist_name: 'Led Zeppelin' } },
	{ artist: { artist_id: 3, artist_name: 'Madonna' } },
	{ artist: { artist_id: 4, artist_name: 'Michael Jackson' } },
	{ artist: { artist_id: 5, artist_name: 'Pink Floyd' } },
	{ artist: { artist_id: 6, artist_name: 'Rihanna' } },
	{ artist: { artist_id: 7, artist_name: 'The Beatles' } },
]

const useArtistRelated = ({ artistId }: { artistId?: number }) => {
	const config = useMemo(
		() => ({
			params: { artist_id: artistId },
		}),
		[artistId],
	)

	const { data, ...rest } = useApi<ArtistRelated>(
		artistId ? '/artist.related.get' : null,
		config,
	)

	// * Sometimes artists list can be empty
	if (data && data.artist_list.length < 2)
		data.artist_list = [
			...data.artist_list,
			..._.sampleSize(SPARE_ARTISTS, 2 - data.artist_list.length),
		]

	return { ...rest, data }
}

export default useArtistRelated
