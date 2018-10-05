import React from 'react'
import {Text, View, Image, Linking} from 'react-native'
import styles, {orange} from '../styles';
import MenuDrawer from './MenuDrawer';
import marge from '../../marge-logo-big.png';

export default props => (
	<MenuDrawer
		{...props}
		title="About"
		activeItem="about">
		<View style={{
			alignItems: 'center',
			justifyContent: 'flex-start',
			...styles.container
		}}>
		<View>
			<Image source={marge} resizeMode="center" />
		</View>
		<View style={{alignItems: 'center', textAlign: 'center', padding: 20}}>
			<Text style={{textAlign: 'center', marginBottom: 6}}>
				We are two developers crafting open source projects for fun and maybe profit.
			</Text>
			<Text>
				Wanna talk with us?
			</Text>
			<Text style={{color: orange}} onPress={() => Linking.openURL('https://spectrum.chat/marge-apps')}>
			We are available at Spectrum
		</Text>
	</View>
</View>
</MenuDrawer>
)
