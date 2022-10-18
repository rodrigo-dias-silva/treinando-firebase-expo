import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from './src/firebaseConnection';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Usuário criado: ' + value.user.email);
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Sua senha deve ter pelo menos 6 caracteres')
          return
        }
        if (error.code === 'auth/invalid-email') {
          alert('E-mail inválido')
          return
        } else {
          alert('Ops... Algo deu errado: ' + error)
          return
        }
      })

    setEmail('');
    setPassword('')
  }


  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      <Text style={styles.text}>E-mail:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setEmail(text)} value={email} />
      <Text style={styles.text}>Senha:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setPassword(text)} value={password} />

      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={styles.textBtn}>Cadastrar</Text>
      </TouchableOpacity>



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
    fontSize: 24,
    marginBottom: 25,
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
