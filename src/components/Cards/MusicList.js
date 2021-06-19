import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from '../Icon';
import * as Modal from '../../widgets/Modals';
import { millisToMin } from '../../helpers';

const MusicList = ({ style = {}, imageURL, title = 'Song Title', author = `Author Name`, duration = '03:22', onPlayPress = () => {}, moreOptions = [] }) => {
	const [moreOptionsModal, setMoreOptionsModal] = useState(false);

	return (
		<>
			<TouchableOpacity style={[styles.container, style]} onLongPress={() => setMoreOptionsModal(true)} activeOpacity={0.8}>
				<View style={styles.left}>
					<Image
						style={{
							width: 70,
							height: 70,
							position: 'absolute',
							bottom: -3,
							opacity: 0.5,
							alignSelf: 'center',
						}}
						source={{ uri: imageURL }}
						resizeMode="cover"
						borderRadius={6}
						blurRadius={100}
					/>
					<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={6} />
				</View>
				<View style={styles.middle}>
					<View>
						<Text style={styles.title} numberOfLines={2}>
							{title}
						</Text>
						<Text style={styles.author}>{author}</Text>
					</View>
					<Text style={styles.duration}>{millisToMin(duration)}</Text>
				</View>
				<View style={styles.right}>
					<TouchableOpacity onPress={onPlayPress}>
						<LinearGradient style={styles.playBtn} colors={['#939393', '#000']}>
							<Icon name="play" color="#C4C4C4" />
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>

			<Modal.MoreOptions visible={moreOptionsModal} onClose={setMoreOptionsModal} title={title} moreOptions={moreOptions} />
		</>
	);
};

export default MusicList;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	left: {},
	middle: {
		flex: 1,
		height: 80,
		marginLeft: 10,
		marginRight: 20,
		justifyContent: 'space-between',
	},
	right: {},
	coverArt: {
		width: 80,
		height: 80,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	author: {
		color: '#888',
	},
	duration: {
		color: '#A4A4A4',
	},
	playBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		paddingLeft: 4,
		borderRadius: 100,
		borderWidth: 1.5,
		borderColor: '#FFF',
	},
});
