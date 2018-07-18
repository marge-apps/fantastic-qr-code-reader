import {withProps} from 'recompose';

import { AsyncStorage } from 'react-native';

	const saveItem = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
		return true;
	}
	catch(error) {
		console.log(error)
		return false;
	}
}

const deleteItem = async key => {
	try {
		await AsyncStorage.removeItem(key);
		return true;
	}
	catch(error) {
		console.log(error)
		return false;
	}
}

const getHistory = async () => {
	const keys = await AsyncStorage.getAllKeys()

	const storedItems = await AsyncStorage.multiGet(keys);

	return storedItems.map(item => ({
		key: item[0],
		text: item[1]
	})).sort((a, b) => a.key - b.key)
}

export default withProps(props => ({
	saveItem: saveItem,
	deleteItem: deleteItem,
	getHistory: getHistory,
}))
