import React from 'react';
import {
	Alert,
	Text,
	View,
	Clipboard,
	Share,
	Linking,
	ToastAndroid
} from 'react-native';
import {compose, withProps} from 'recompose';
import ActionButton from 'react-native-action-button';
import {Title} from 'react-native-paper';
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDrawer from './MenuDrawer';
import styles, {purple} from '../styles'

const isvalidUrl = (str) => {
	regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	return regexp.test(str)
}

const enhance = compose(
	withProps(props => ({
		text: props.history.location.state.text,
		id: props.history.location.state.key
	})),
	withProps(props => ({
		askToDeleteItem: id => Alert.alert(
			'Delete item',
			'Are you sure you want to delete this entry?',
			[
				{text: 'Cancel', onPress: () => null},
				{text: 'Yes', onPress: () => {
					props.deleteItem(id);
					props.history.goBack();
				}}
			],
			{cancelable: true}
		),
		shareResult: () => Share.share({
			message: props.text
		}),
		openInBrowser: () => {
			if (isvalidUrl(props.text)) {
				return Linking.openURL(props.text)
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
			await Clipboard.setString(props.text)
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
	<MenuDrawer
		title="QR Code"
		activeItem={null}
		right={null}
		{...props}>
		<View style={styles.result}>
			<View style={{
				paddingTop: 24,
				paddingRight: 8,
				paddingLeft: 8,
				fontSize: 20
			}}>
			<QRCode
				value={props.text}
				size={200}
				bgColor='black'
				fgColor='white'
			/>
		</View>
		<View style={{
			marginTop: 32,
			alignItems: 'center',
			width: '100%',
			backgroundColor: '#eee',
			paddingBottom: 18
		}}>
		<Title style={{paddingTop: 14}}>
			{props.text}
		</Title>
		<Text style={{color: 'hsl(0, 0%, 41%)'}}>
			Scanned on: {props.niceDate(props.id)}
		</Text>
	</View>

	<ActionButton
		buttonColor={purple}
		title="Options">
		<ActionButton.Item buttonColor='#f44242' title="Delete" onPress={() => props.askToDeleteItem(props.id)}>
			<Icon name="delete" color="#f44242" reverse style={styles.actionButtonIcon}/>
		</ActionButton.Item>
		<ActionButton.Item buttonColor='#9b59b6' title="Copy to clipboard" onPress={props.copyToClipBoard}>
			<MaterialIcon reverse color="#9b59b6" name="clipboard" style={styles.actionButtonIcon}/>
		</ActionButton.Item>
		<ActionButton.Item buttonColor='#3498db' title="Open in browser" onPress={props.openInBrowser}>
			<Icon reverse color="#3498db" name="open-in-browser" style={styles.actionButtonIcon}/>
		</ActionButton.Item>
		<ActionButton.Item buttonColor='#1abc9c' title="Share" onPress={props.shareResult}>
			<Icon name="share" color="#1abc9c" reverse style={styles.actionButtonIcon}/>
		</ActionButton.Item>
	</ActionButton>

</View>
</MenuDrawer>
);

export default enhance(Result);
