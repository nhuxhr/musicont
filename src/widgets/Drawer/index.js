import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import { useAssets } from 'expo-asset';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { SCREENS } from '../../constants';

const menus = [
	{ name: 'home', title: 'Home', screen: SCREENS.HOME },
	{ name: 'songs', title: 'songs', screen: SCREENS.SONGS },
	{ name: 'favourite', title: 'Favourite', screen: SCREENS.FAVOURITE },
	{ name: 'recent', title: 'Recently Played', screen: SCREENS.RECENT },
	{ name: 'playlist', title: 'Playlist', screen: SCREENS.PLAYLISTS },
];

const Index = ({
	appName,
	active = false,
	current = '',
	onItemPressed = () => {},
	bottomBtn = {
		text: 'Source Code',
		onPress: () => Linking.openURL('https://github.com/jsxclan/musicont'),
	},
	children,
}) => {
	const { navigate } = useNavigation();
	useAssets([require('../../assets/logo.png')]);
	const screenScale = useRef(new Animated.Value(1)).current;
	const screenLeft = useRef(new Animated.Value(0)).current;
	const screenRadius = useRef(new Animated.Value(0)).current;

	const anim = (anim, toValue) => {
		return Animated.timing(anim, {
			toValue,
			duration: 1000,
			useNativeDriver: true,
		});
	};

	useEffect(() => {
		anim(screenScale, active ? 0.8 : 1).start();
		anim(screenLeft, active ? Dimensions.get('screen').width * 0.6 : 0).start();
		anim(screenRadius, active ? 15 : 0).start();
	}, [active]);

	return (
		<>
			<StatusBar style={active ? 'light' : 'dark'} />
			<LinearGradient style={styles.container} colors={['#C07037', '#C55234']}>
				<View style={styles.menuContainer}>
					<Animatable.View style={styles.header} animation={active ? 'slideInDown' : 'slideOutUp'} duration={2000}>
						<Image style={styles.logo} source={require('../../assets/logo.png')} />
						<Text style={styles.appName}>{appName}</Text>
					</Animatable.View>
					<View style={styles.middle}>
						{menus.map((menu, key) => (
							<Animatable.View key={key} animation={active ? 'zoomInDown' : 'zoomOutDown'} duration={1000 + key * 400}>
								<TouchableOpacity
									style={[styles.item, current.toLowerCase() === menu.name && styles.itemActive]}
									onPress={async () => {
										onItemPressed();
										const x = setTimeout(() => {
											menu.screen && navigate(menu.screen);
											menu.onPress && menu.onPress();
											clearTimeout(x);
										}, 850);
									}}
								>
									<Text style={[styles.itemTxt, current.toLowerCase() === menu.name && styles.itemTxtActive]}>{menu.title}</Text>
								</TouchableOpacity>
							</Animatable.View>
						))}
					</View>
					<Animatable.View style={styles.bottom} animation={active ? 'slideInUp' : 'slideOutDown'} duration={2000}>
						<TouchableOpacity style={styles.bottomBtn} activeOpacity={0.7} onPress={bottomBtn?.onPress}>
							<Text style={styles.bottomBtnTxt}>{bottomBtn?.text}</Text>
						</TouchableOpacity>
						<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
							<TouchableOpacity style={styles.bottomBtn} activeOpacity={0.7} onPress={() => Linking.openURL('https://ko-fi.com/jsxclan')}>
								<Text style={styles.bottomBtnTxt}>Buy me a coffee ☕</Text>
							</TouchableOpacity>
						</Animatable.View>
					</Animatable.View>
				</View>

				<View style={styles.screenBackDrop} />
				<Animated.View
					style={[
						StyleSheet.absoluteFill,
						styles.screen,
						{
							transform: [
								{
									scale: screenScale,
								},
								{
									translateX: screenLeft,
								},
							],
							borderRadius: screenRadius,
						},
					]}
				>
					{children}
				</Animated.View>
			</LinearGradient>
		</>
	);
};

const mapStateToProps = (state) => ({ appName: state?.app?.appName });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	menuContainer: {
		flex: 1,
		justifyContent: 'space-between',
		width: Dimensions.get('screen').width * 0.6 - 35,
		paddingVertical: Constants.statusBarHeight,
		paddingLeft: 15,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	logo: {
		width: 70,
		height: 70,
		marginBottom: 10,
	},
	appName: {
		color: 'rgba(255, 255, 255, .5)',
		fontSize: 20,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: 2,
	},
	middle: {
		flex: 1,
		justifyContent: 'center',
	},
	item: {
		justifyContent: 'center',
		width: null,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
		marginBottom: 10,
	},
	itemActive: {
		backgroundColor: 'rgba(0, 0, 0, .3)',
	},
	itemTxt: {
		color: 'rgba(255, 255, 255, .45)',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	itemTxtActive: {
		color: 'rgba(255, 255, 255, .8)',
	},
	bottom: {},
	bottomBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		backgroundColor: 'rgba(0, 0, 0, .4)',
		paddingVertical: 10,
		borderRadius: 6,
		marginBottom: 5,
	},
	bottomBtnTxt: {
		color: 'rgba(255, 255, 255, .8)',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	screen: {
		flex: 1,
		position: 'absolute',
		backgroundColor: '#FFF',
		zIndex: 9999,
	},
	screenBackDrop: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'rgba(0, 0, 0, .15)',
		transform: [
			{
				scale: 0.7,
			},
			{
				translateX: Dimensions.get('screen').width * 0.58,
			},
		],
		borderRadius: 15,
	},
});
