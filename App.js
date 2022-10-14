import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './src/firebaseConnection';

export default function App() {
  const [nome, setNome] = useState('Buscando...');
  const [idade, setIdade] = useState('');

  useEffect(() => {

    async function dados() {

      // Olheiro da database elemento ".on"
      // await firebase.database().ref('name').on('value', (snapshot) => {
      //   setNome(snapshot.val());
      // })

      // Once busca uma unica vez no banco de dados ".once"
      // await firebase.database().ref('name').once('value', (snapshot) => {
      //   setNome(snapshot.val());
      // })

      await firebase.database().ref('user/1').on('value', (snapshot) => {
        setNome(snapshot.val().name);
        setIdade(snapshot.val().age);
      })
    }

    dados();

  }, []);


  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <Text style={styles.text}>Olá {nome}</Text>
      <Text style={styles.text}>Você tem {idade} anos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
