import {
	StyleSheet,
} from 'react-native';

export const purple = '#4B0082';
export const gray = '#cccccc';
export const statusColor = '#2c004d';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	center: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	result: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 30,
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	buttonsContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between'
	},
	textInput: {
		minWidth: '80%',
		padding: 10,
		textAlign: 'center'
	},
	button: {
		padding: 6,
		margin: 8,
		borderRadius: 4,
	},
	url: {
		flex: 1,
	},
	urlText: {
		color: '#fff',
		fontSize: 20,
	}
});

export default styles;
