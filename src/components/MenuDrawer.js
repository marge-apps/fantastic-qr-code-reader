import React from 'react';
import {View, DrawerLayoutAndroid, Image} from 'react-native';
import {Appbar, Drawer, Title} from 'react-native-paper'
import {purple} from '../styles'
import logo from '../../logo-small.png'

const DrawerItem = props => (
	<Drawer.Item
		onPress={props.onClick}
		label={props.label}
		active={props.active}
		icon={props.icon}
	/>
)

const NavigationView = props => (
	<View style={{flex: 1}}>
		<View style={{
			height: 150,
			backgroundColor: purple,
			justifyContent: 'flex-end'
		}}>
			<View style={{justifySelf: 'flex-start', alignItems: 'center'}}>
				<Image source={logo} style={{height: 64, width: 64, backgroundColor: '#fff', marginBottom: 16, borderRadius: 8}}/>
			</View>

			<View style={{alignItems: 'flex-start', justifyContent: 'flex-end'}}>
				<Title style={{color: 'white', paddingBottom: 6, paddingLeft: 18}}>
					Fantastic QR Code Reader
				</Title>
			</View>

	</View>

	<DrawerItem
		label="Camera"
		icon="camera"
		active={props.activeItem === 'camera'}
		onClick={() => {
			props.closeDrawer()
			if (props.history.location.pathname !== '/') {
				props.history.push('/')
			}
		}}
	/>
	<DrawerItem
		label="History"
		icon="list"
		active={props.activeItem === 'history'}
		onClick={() => {
			props.closeDrawer()
			if (props.history.location.pathname !== '/history') {
				props.history.push('/history')
			}
		}}
	/>
	<DrawerItem
		label="About"
		icon="info"
		active={props.activeItem === 'about'}
		onClick={() => {
			props.closeDrawer()
			if (props.history.location.pathname !== '/about') {
				props.history.push('/about')
			}
		}}
	/>
</View>
)

const Bar = props => (
	<Appbar.Header style={{backgroundColor: purple}}>
		<Appbar.Action icon="menu" onPress={() => {
			props.action();
		}} />

		<Appbar.Content title={props.title} />
		{props.right}
	</Appbar.Header>
);

export default class MenuDrawer extends React.Component {
	constructor() {
		super();
		this.openDrawer = this.openDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
	}
	openDrawer() {
		this.drawer.openDrawer();
	}
	closeDrawer() {
		this.drawer.closeDrawer();
	}
	render() {
		const children = React.Children.map(this.props.children, child => {
			return React.cloneElement(child, { drawer: this.drawer });
		});
		return (
			<DrawerLayoutAndroid
				drawerWidth={300}
				ref={_drawer => (this.drawer = _drawer)}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={
					() => <NavigationView {...this.props} closeDrawer={this.closeDrawer} openDrawer={this.drawer}/>
				}>
				<Bar action={this.openDrawer} {...this.props}/>
				{this.props.children}
			</DrawerLayoutAndroid>
		)
	}
}
