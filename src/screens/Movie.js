import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

import Images from '../assets';
import api from '../services/api';
import ButtonOscar from '../components/ButtonOscar';
import reducerString from '../utils/reducerString';

const Movie = props => {

	const { name, picture, pivot } = props.navigation.state.params.movie;
	const categorie = props.navigation.state.params.item.name;

	placeBet = async (favorite = false) => {
		try {
			if (favorite) {
				await api.post(`category/${pivot.category_id}/feature/${pivot.feature_id}`, { favorite: true });
			} else {
				await api.post(`category/${pivot.category_id}/feature/${pivot.feature_id}`);
			}
			Alert.alert(
				'Congratz',
				'Successful registration',
				[
					{ text: 'OK' },
				],
				{ cancelable: false }
			)
			props.navigation.goBack();
		} catch (e) {
			Alert.alert(
				'Ops',
				'An unexpected error occurred, try again.',
				[
					{ text: 'OK' },
				],
				{ cancelable: false }
			)
		}
	}

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={Images[picture.path]} resizeMethod='scale' />
			<Text style={styles.title}>{reducerString(name, 20)}</Text>
			<Text style={styles.categorie}>{reducerString(categorie, 30)}</Text>
			<View style={styles.buttonContainer}>
				<ButtonOscar title='Bet' bg='white' colorText='black' method={() => this.placeBet()} />
				<ButtonOscar title='Favorite Bet' bg='#FFCF00' colorText='black' method={() => this.placeBet(true)} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: "#040404",
		padding: 10
	},
	image: {
		width: '100%',
		borderRadius: 5,
		width: 182,
		height: 268
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		marginTop: 10,
		fontSize: 18
	},
	categorie: {
		color: '#FFCF00',
	},
	buttonContainer: {
		paddingTop: 20
	}
});

export default Movie;