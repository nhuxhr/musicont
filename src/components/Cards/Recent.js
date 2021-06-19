import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Played = ({ style = {}, imageURL, title = 'Song Title', author = `Artist Name`, onPress = () => {} }) => (
	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
		<View>
			<Image
				style={{
					width: 130,
					height: 130,
					borderRadius: 10,
					position: 'absolute',
					bottom: -6,
					opacity: 0.5,
					alignSelf: 'center',
				}}
				source={{ uri: imageURL }}
				resizeMode="cover"
				borderRadius={10}
				blurRadius={100}
			/>
			<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={10} />
		</View>
		<View style={styles.content}>
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			<Text style={styles.author} numberOfLines={1}>
				{author}
			</Text>
		</View>
	</TouchableOpacity>
);

export default Played;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	coverArt: {
		width: 150,
		height: 150,
	},
	content: {
		width: 140,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	title: {
		color: '#555555',
		fontSize: 20,
		fontWeight: '900',
		letterSpacing: 1,
	},
	author: {
		color: '#555555',
	},
});
