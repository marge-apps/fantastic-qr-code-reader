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

const isvalidUrl = (str) => {
	regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	return regexp.test(str)
}

const enhance = compose(
	withProps(props => ({
		result: props.navigation.state.params.result,
	})),
	withProps(props => ({
		shareResult: () => Share.share({
			message: props.result
		}),
		openInBrowser: () => {
			if (isvalidUrl(props.result)) {
				return Linking.openURL(props.result)
			}
			ToastAndroid.showWithGravityAndOffset(
				'Not a valid url',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				0,
				50
			);
		},
		copyToClipBoard: async () => {
			await Clipboard.setString(props.result)
			ToastAndroid.showWithGravityAndOffset(
				'Copied to clipboard!',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				0,
				50
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
			fontSize: 20
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
		<Icon
			type="material-community"
			name="clipboard"
			reverse
			onPress={props.copyToClipBoard}
		/>
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
