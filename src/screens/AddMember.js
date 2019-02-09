import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';

import api from '../services/api';
import Loading from '../components/Loading';
import ButtonOscar from '../components/ButtonOscar';

take = '';

class AddMember extends Component {

	static navigationOptions = () => ({
		headerTitle: <TextInput
			textContentType='name'
			placeholder='Search'
			style={{ color: 'white', width: '100%', fontSize: 18 }}
			returnKeyType='search'
			onSubmitEditing={() => take.searchName()}
			placeholderTextColor='white'
			placeholderStyle={{ marginLeft: 50 }}
			onChange={(event) => take.textHandler(event.nativeEvent.text)} />
	});

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeout: 0,
			text: "",
			users: [],
			usersSelect: [],
			suggestions: true
		}
	}

	async componentDidMount() {
		const request = await api.get('user');
		const token = await AsyncStorage.getItem('userToken');
		api.defaults.headers.common['Authorization'] = token;

		const users = request.data.result.data;
		this.setState({ users, loading: true });
	}

	textHandler = async (value) => {
		if (this.state.text.length != null) {
			this.setState({ text: value, suggestions: false });
		}

		this.setState({ text: value });
	}

	removeUser = (item) => {
		let { usersSelect } = this.state;

		usersSelect = usersSelect.filter(obj => {
			return (
				obj.id != item.id
			)
		});

		this.setState({ usersSelect });
	}

	handleUser = (item) => {
		let { usersSelect } = this.state;

		let find = false;

		for (let i = 0; i < usersSelect.length; i++) {
			if (usersSelect[i].id == item.id) {
				find = true;
				break;
			}
		}

		if (find) {
			this.removeUser(item);
		} else {
			this.setState({ usersSelect: [...usersSelect, item] });
		}
	}

	async searchName() {
		this.setState({ loading: false });
		const request = await api.get(`user?q=${this.state.text}`);

		const users = request.data.result.data;

		if (this.state.text.length == 0) {
			this.setState({ users, loading: true, suggestions: true });
		}

		this.setState({ users, loading: true });
	}

	async addMembers() {
		this.setState({ loading: false });

		let users_id = this.state.usersSelect.map(item => {
			return item.id
		});

		const idGroup = this.props.navigation.state.params.id;

		await api.post(`group/${idGroup}/add`, { users_id });

		this.props.navigation.navigate('Group', this.props.navigation.state.params);

		this.setState({ loading: true });
	}

	render() {

		take = this;

		const { users, loading, suggestions, usersSelect } = this.state;

		return (
			<>
				<View style={{ maxHeight: 100, backgroundColor: "#040404" }} >
					{usersSelect.length != 0 ?
						<Text style={{ color: 'gray', fontSize: 14, marginBottom: 10, marginTop: 10, paddingLeft: 15 }}>Selected users:</Text>
						: null}
					<FlatList
						horizontal
						data={usersSelect}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity onPress={() => this.removeUser(item)}>
									<View key={item.id} style={{ paddingLeft: 15, backgroundColor: '#040404' }}>
										<Text style={{ color: 'black', fontSize: 16, backgroundColor: "white", borderRadius: 50, padding: 10 }}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							)
						}}
						keyExtractor={(item) => item.toString()} />
				</View>
				{loading && users.length == 0 ?
					<View style={styles.container}>
						<Text style={{ color: 'gray', fontSize: 16, marginBottom: 10, marginTop: 10, paddingLeft: 15 }}>No data found</Text>
					</View> :
					loading && users.length != 0 ?
						<View style={styles.container}>
							{suggestions ? <Text style={{ color: 'gray', fontSize: 14, marginBottom: 10, marginTop: 10, paddingLeft: 15 }}>Suggestions</Text> : null}
							<FlatList
								data={users}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity onPress={() => this.handleUser(item)}>
											<View style={{ paddingLeft: 15, paddingBottom: 10 }}>
												<Text style={styles.item}>{item.name}</Text>
											</View>
										</TouchableOpacity>
									)
								}}
								keyExtractor={(item) => item.toString()} />
							{usersSelect.length != 0 ?
								<ButtonOscar title='Add' bg='white' colorText='black' method={() => this.addMembers()} />
								: null}
						</View>
						: <Loading background='#040404' size='large' color='#FFCF00' />}
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#040404"
	},
	input: {
		color: 'white',

		height: 45,
		borderWidth: 2,
		borderColor: 'rgba(255,255,255,0.5)',
		borderRadius: 50,
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	item: {
		color: "white",
		fontSize: 18,
	}
});

export default AddMember;