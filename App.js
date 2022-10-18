import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from './src/firebaseConnection';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState('')


  async function logar() {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Bem vindo ' + value.user.email);
        setUsers(value.user.email)
      })
      .catch((error) => {
        alert('Ops... Algo deu errado: ' + error)
        return

      })

    setEmail('');
    setPassword('')
  }

  async function sair() {
    await firebase.auth().signOut();
    setUsers('')
    alert('Você saiu!')
  }


  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      <Text style={styles.text}>E-mail:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setEmail(text)} value={email} />
      <Text style={styles.text}>Password:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setPassword(text)} value={password} />

      <TouchableOpacity style={styles.btn} onPress={logar}>
        <Text style={styles.textBtn}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{users}</Text>

      {users.length > 0 ? (
        <TouchableOpacity style={styles.btn} onPress={sair}>
          <Text style={styles.textBtn}>Logout</Text>
        </TouchableOpacity>
      ) : ''}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35
  },
  textHeader: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 35,
    fontWeight: 'bold',

  },
  text: {
    color: '#fff',
    fontSize: 18
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#4f4f4f',
    width: 250,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  btn: {
    width: 250,
    height: 40,
    backgroundColor: '#f43',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5,

  },
  textBtn: {
    color: '#fff'
  },
  textHeaderFunc: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20
  }
});
