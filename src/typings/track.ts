import Artist from './artist'

interface Track extends Artist {
	track_id: number
	track_name: string
}

export default Track
