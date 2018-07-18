import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import styles, {purple} from '../styles';

export default () => (
	<View style={{justifyContent: 'center', ...styles.container}}>
		<ActivityIndicator size="large" color={purple}/>
	</View>
)
