import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Drawer } from '../../widgets';
import { Card, Icon } from '../../components';
import { SCREENS } from '../../constants';

const Index = ({ songs, playlists, navigation }) => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="playlist" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer),
						},
						middle: {
							show: true,
							text: 'Playlists',
						},
						right: {
							show: false,
						},
					}}
				/>
				{playlists && playlists?.length > 0 ? (
					<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.sections} showsVerticalScrollIndicator={false}>
						{playlists.map((playlist, key) => (
							<Card.Playlist
								key={key}
								style={styles.item}
								overlayStyle={{ height: 200 }}
								imageURL={songs[playlist?.songs[0]]?.img}
								title={playlist?.name}
								subtitle={`${playlist?.songs.length} Songs`}
								onPress={() => {
									const playlistIndex = playlists.findIndex((i) => i?.name.toLowerCase() === playlist?.name.toLowerCase());
									navigation.push(SCREENS.PLAYLIST, { playlistIndex });
								}}
							/>
						))}
					</ScrollView>
				) : (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>No playlists yet!</Text>
					</View>
				)}
			</SafeAreaView>
		</Drawer>
	);
};

const mapStateToProps = (state) => ({ songs: state?.player.songs, playlists: state?.storage?.playlists });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		marginTop: Dimensions.get('screen').height * 0.025,
		marginHorizontal: 20,
		paddingBottom: 20,
	},
	item: {
		width: '100%',
		height: 200,
		marginBottom: 20,
	},
});
