import React from 'react';
import {
	Text,
	View,
	Clipboard,
	Share,
	Linking,
	Button,
	ToastAndroid
} from 'react-native';
import {compose, withProps} from 'recompose';
import QRCode from 'react-native-qrcode';
import {Icon} from 'react-native-elements';
import styles, {gray} from '../styles'

const enhance = compose(
	withProps(props => ({
		result: props.navigation.state.params.result,
	})),
	withProps(props => ({
		shareResult: () => Share.share({
			message: props.result
		}),
		openInBrowser: () => Linking.openURL(props.result),
		copyToClipBoard: async () => {
			await Clipboard.setString(props.result)
			ToastAndroid.showWithGravity(
				'Copied to clipboard!',
				ToastAndroid.SHORT,
				ToastAndroid.CENTER
			);
		}
	}))
);

const Result = props => (
	<View style={styles.result}>
			<Text style={{
				paddingTop: 4,
				paddingRight: 8,
				paddingLeft: 8,
			}}>
				{props.result}
			</Text>
		<View>
			<QRCode
				value={props.result}
				size={200}
				bgColor='black'
				fgColor='white'
			/>
		</View>
		<View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
			<View>
				<Icon
					type="material-community"
					name="clipboard"
					reverse
					onPress={props.copyToClipBoard}
				/>
			</View>
			<View>
				<Icon
					reverse
					name="share"
					color="green"
					onPress={props.shareResult}
				/>
			</View>
			<View>
				<Icon
					reverse
					name="open-in-browser"
					color="orange"
					onPress={props.openInBrowser}
				/>
			</View>
		</View>
	</View>
);

export default enhance(Result);
