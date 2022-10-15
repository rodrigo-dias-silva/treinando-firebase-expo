import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Listagem({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.name}</Text>
      <Text style={styles.text}>{data.office}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    padding: 15,
    width: 300
  },
  text: {
    color: '#121214'
  }
})