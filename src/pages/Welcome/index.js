import React, { Component } from 'react';
import api from '../../services/api';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class Welcome extends Component {
  state = {
    userName: '',
    loading: false,
    error: false,
  };

  checkExists = async userName => {
    const user = await api.get(`/users/${userName}`);
    return user;
  };

  saveUser = async userName => {
    await AsyncStorage.setItem('@Githuber:username', userName);
  };
  signIn = async () => {
    const { userName } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });

    try {
      await this.checkExists(userName);
      await this.saveUser(userName);

      navigation.navigate('Repositories');
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.tron.log(error);
    }
  };

  render() {
    const { userName, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>Informe seu usuário no github</Text>

        {error && <Text style={styles.error}>Usuário não encontrado</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeHolder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={userName}
            onChangeText={text => this.setState({ userName: text })}
          />

          <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
