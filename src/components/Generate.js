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
import styles from '../styles'


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
	<View style={styles.container}>
		<Text>
			{props.result}
		</Text>
		<Button title="Copy to clipboard" onPress={props.copyToClipBoard}/>
		<Button title="Share" onPress={props.shareResult}/>
		<Button title="Open in browser" onPress={props.openInBrowser}/>
	</View>
);

export default enhance(Result);
