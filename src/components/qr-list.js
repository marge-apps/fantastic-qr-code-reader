import React from 'react';
import {withStateHandlers, compose, branch, renderComponent} from 'recompose';
import {List, ListItem, Icon, CheckBox} from 'react-native-elements';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {gray} from '../styles'
import Loading from './Loading'

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const niceDate = timestamp => {
	const date = new Date(Number(timestamp));
	return (`${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`);
}

const ConfirmDelete = props => (
	<View style={{
		width: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}}>
	<Icon
		name="close"
		color="gray"
		onPress={props.toggleDeleteMode}
	/>
	<Icon
		name="done"
		color="gray"
		onPress={() => props.handleDeleteItem(props.item.key)}
	/>
</View>
)

const DeleteButton = props => (
	<View>
		<Icon
			name="delete"
			color="gray"
			onPress={props.toggleDeleteMode}
		/>
	</View>
)

const CreationTime = props => (
	<View style={{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}}>
		<Icon
			color="gray"
			type="evilicon"
			size={16}
			name="calendar"/>
		<Text style={{
			paddingLeft: 4,
			fontSize: 12
		}}>
			{niceDate(props.item.key)}
		</Text>
	</View>
)

const DeletableListItem = compose(
	withStateHandlers(
		() => ({
			toBeDeleted: false
		}),
		{
			toggleDeleteMode: ({toBeDeleted}) => () => ({toBeDeleted: !toBeDeleted})
		}
	)
)(props => (
	<ListItem
		title={
			<Text style={{fontWeight: 'bold'}}>
				{props.item.text}
			</Text>
		}
		subtitle={<CreationTime {...props}/>}
		onPress={() => props.goToResult(props.item.text)}
		rightIcon={props.toBeDeleted ?
			<ConfirmDelete {...props}/> :
			<DeleteButton {...props}/>
		}
	/>
))

const isEmpty = props => props.list.length === 0;
const isLoading = props => props.isLoading;

const Empty = () => (
	<View style={{
		flex: 1,
		alignItems: 'center'
	}}>
	<View style={{paddingTop: 40, paddingBottom: 20}}>
		<Icon
			name="list"
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

export default compose(
	branch(isLoading, renderComponent(Loading)),
	branch(isEmpty, renderComponent(Empty))
)(props => (
	<List>
		<FlatList
			data={props.list}
			renderItem={data => <DeletableListItem {...data} {...props} />}
		/>
	</List>
));
