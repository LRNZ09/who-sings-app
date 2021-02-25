import React from 'react'
import { View } from 'react-native'

interface SpacerProps {
	size: number
}

const Spacer: React.FC<SpacerProps> = ({ size }) => (
	<View style={{ height: size }} />
)

export default Spacer
