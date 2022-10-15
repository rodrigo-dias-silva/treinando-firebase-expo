import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from './src/firebaseConnection';
import Listagem from './src/Listagem';

export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function dados() {

      // {
      //   Olheiro da database elemento ".on"
      //   await firebase.database().ref('name').on('value', (snapshot) => {
      //     setNome(snapshot.val());
      //   })

      // Once busca uma unica vez no banco de dados ".once"
      //   await firebase.database().ref('name').once('value', (snapshot) => {
      //     setNome(snapshot.val());
      //   })

      //   await firebase.database().ref('user/1').on('value', (snapshot) => {
      //     setNome(snapshot.val().name);
      //     setIdade(snapshot.val().age);
      //   })

      // Criar um nó
      //   await firebase.database().ref('type').set('Client');

      // Remover um nó
      //   await firebase.database().ref('type').remove();

      // Adicionar Child em nó existente
      //   await firebase.database().ref('user').child(3).set({
      //     name: 'Jeremias',
      //     office: 'Programador'
      //   })

      // Atualizar informaçao em nó existente sem interferir nas demais
      //   await firebase.database().ref('user').child(3).update({
      //     name: 'Jeremias Silva'
      //   })
      // }

      await firebase.database().ref('user').on('value', (snapshot) => {
        setUsers([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            name: childItem.val().name,
            office: childItem.val().office,
          };

          setUsers(oldArray => [...oldArray, data].reverse());
        });

        setLoading(false);
      })

    }

    dados();

  }, []);

  async function cadastrar() {
    if (nome !== '' & cargo !== '') {
      let usuarios = await firebase.database().ref('user');
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        name: nome,
        office: cargo
      });

      alert('Cadastrado com sucesso');
      setCargo('');
      setNome('');
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <Text style={styles.textHeader}>Cadastro de Funcionários</Text>

      <Text style={styles.text}>Insira o nome:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setNome(text)} value={nome} />
      <Text style={styles.text}>Insira o cargo:</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" onChangeText={(text) => setCargo(text)} value={cargo} />

      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={styles.textBtn}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.textHeaderFunc}>Lista dos Funcionários</Text>

      {loading ? (<ActivityIndicator color={'#d3d3d3'} size={45} />) : (<FlatList
        keyExtractor={item => item.key}
        data={users}
        renderItem={({ item }) => (<Listagem data={item} />)}
      />)}

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
