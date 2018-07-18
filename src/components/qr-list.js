import React from 'react';
import {withStateHandlers, compose} from 'recompose';
import {List, ListItem, Icon, CheckBox} from 'react-native-elements';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {gray} from '../styles'

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
		title={`${props.item.text}`}
		onPress={() => props.goToResult(props.item.text)}
		rightIcon={props.toBeDeleted ?
			<ConfirmDelete {...props}/> :
			<DeleteButton {...props}/>
		}
	/>
))

export default props => (
	<List>
		<FlatList
			data={props.list}
			renderItem={data => <DeletableListItem {...data} {...props} />}
		/>
	</List>
);
