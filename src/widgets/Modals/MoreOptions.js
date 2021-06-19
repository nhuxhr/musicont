import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');

const MoreOptions = ({
	visible = false,
	onClose = () => {},
	title = 'Song Title',
	moreOptions = [
		{
			text: 'Play',
			onPress: () => alert('Play song'),
		},
		{
			text: 'Add to favorite',
			onPress: () => alert('Add song to favorite'),
		},
		{
			text: 'Add to playlist',
			onPress: () => alert('Add song to playlist'),
		},
	],
}) => {
	const [animation, setAnimation] = useState('slideInUp');

	const closeModal = () => {
		setAnimation('fadeOutDown');

		const x = setTimeout(() => {
			onClose(false);
			clearTimeout(x);
		}, 300);
	};

	useEffect(() => {
		if (visible) {
			setAnimation('slideInUp');
		}
	}, [visible]);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<TouchableOpacity
				style={[{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width, height, backgroundColor: 'rgba(0, 0, 0, .5)', zIndex: 999 }]}
				activeOpacity={1}
				onPress={closeModal}
			/>
			<Animatable.View style={styles.modal} animation={animation} duration={300}>
				<Text style={{ color: 'rgba(0, 0, 0, .5)', fontSize: 24, fontWeight: 'bold', letterSpacing: 1, marginBottom: 20 }}>{title}</Text>
				{moreOptions.map(({ text, onPress }, key) => (
					<TouchableOpacity key={key} style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#E6E6E6', marginBottom: 10, borderRadius: 5 }} onPress={onPress} activeOpacity={0.6}>
						<Text style={{ color: 'rgba(0, 0, 0, .5)', fontSize: 16, letterSpacing: 1 }}>{text}</Text>
					</TouchableOpacity>
				))}
			</Animatable.View>
		</Modal>
	);
};

export default MoreOptions;

const styles = StyleSheet.create({
	modal: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		zIndex: 9999,
	},
});
