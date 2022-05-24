import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Listagem({ data}) {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      /
      <Text>{data.idade}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
})