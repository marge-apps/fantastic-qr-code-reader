import React from 'react';
import {lifecycle, compose, branch, withProps, renderComponent} from 'recompose';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {List, Appbar, Divider} from 'react-native-paper'
import {DrawerLayoutAndroid, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {withCameraPermissionsAndResultNavigator} from '../enhancers';
import styles, {gray, purple} from '../styles';
import Loading from './Loading';
import MenuDrawer from './MenuDrawer';

const CreationTime = ({id, niceDate}) => (
	<View style={{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}}>
		<Icon
			color="gray"
			type="evilicon"
			size={16}
			name="md-calendar"
		/>
		<Text style={{
			paddingLeft: 4,
			fontSize: 12
		}}>
			{niceDate(id)}
		</Text>
	</View>
)

const isEmpty = props => props.list && props.list.length === 0;
const isLoading = props => props.isLoading;

const Empty = props => (
	<View
		style={{
			flex: 1,
			alignItems: 'center'
		}}>
		<View style={{paddingTop: 40, paddingBottom: 20}}>
			<Icon
				name="md-list"
				type="entypo"
				size={36}
			/>
		</View>
		<Text style={{fontSize: 26}}>
			No history
		</Text>
		<Text style={{paddingTop: 8}}>
			You could start adding by tapping the camera button.
		</Text>
	</View>
)

const MyListItem = props => (
	<TouchableOpacity
		onPress={props.onPress}
		style={{
			borderBottomColor: '#ddd',
			borderBottomWidth: 1,
			paddingBottom: 12,
			paddingTop: 12,
			display: 'flex',
		}}>
		<View style={{paddingLeft: 6}}>
			<Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
				{props.title}
			</Text>
		</View>
		<View style={{paddingLeft: 6}}>
			<CreationTime niceDate={props.niceDate} id={props.id}/>
		</View>
	</TouchableOpacity>
);

const MyList = compose(
	branch(isLoading, renderComponent(Loading)),
	branch(isEmpty, renderComponent(Empty))
)(props => (
	<FlatList
		data={props.list}
		keyExtractor={item => item.key}
		renderItem={data => (
			<MyListItem
				onPress={() => props.goToResult(data.item)}
				title={data.item.text}
				id={data.item.key}
				niceDate={props.niceDate}
				left={props => <List.Icon {...props} icon="folder" />}
			/>
		)}
	/>
));
let list = [];
const initializeList = lifecycle({
	async componentDidMount() {
		this.props.setLoading(true)
		list = await this.props.getHistory();
		this.props.setLoading(false)
	}
})

export default compose(
	initializeList,
	withProps(props => ({list})),
	withCameraPermissionsAndResultNavigator
)(props => (
	<MenuDrawer
		{...props}
		title="History"
		activeItem="history">
		<MyList {...props}/>
		<ActionButton
			buttonColor={purple}
			title="Scan"
			renderIcon={() => <Icon name="md-camera" style={styles.actionButtonIcon} />}
			onPress={props.askCameraPermission}
		/>
	</MenuDrawer>
));
