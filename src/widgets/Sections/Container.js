import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Container = ({
	style = {},
	title = 'Section',
	options = {
		scrollView: {
			use: true,
			horizontal: true,
			pagingEnabled: false,
		},
	},
	children,
}) => {
	return (
		<View style={style}>
			<Text style={styles.title}>{title}</Text>
			{options?.scrollView?.use ? (
				<ScrollView horizontal={options?.scrollView?.horizontal} pagingEnabled={options?.scrollView?.pagingEnabled} showsHorizontalScrollIndicator={false}>
					{children}
				</ScrollView>
			) : (
				<View>{children}</View>
			)}
		</View>
	);
};

export default Container;

const styles = StyleSheet.create({
	title: {
		color: '#444444',
		fontSize: 20,
		letterSpacing: 1,
		marginBottom: 10,
		marginLeft: 20,
	},
});
