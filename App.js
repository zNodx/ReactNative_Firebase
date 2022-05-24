import { StyleSheet, Text, TextInput, Button, View} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
export default function App() {
    const [name, setName] = useState('');
    const [idade, setIdade] = useState('');

    useEffect(() => { 

      //async function setData() {
      // Create a reference to the database service
      // await firebase.database().ref('type').set('Client')

      //Remove
      // await firebase.database().ref('type').remove();

      // Create with reference
      /*  await firebase.database().ref('user').child(3).set({
          name: 'João',
          idade: '30',
          cargo: 'Programador Junior'
        })*/
      //Update
      /*  await firebase.database().ref('user').child(3).update({
          name: 'João Pacheco',
        })*/
      //}
      //setData()
    }, []);

    async function saveData() {
      if (name === '' || idade === '') {
        alert('Preencha todos os campos')
      }else {
        let user = await firebase.database().ref('user');
        let key =  user.push().key;
        await user.child(key).set({
          name: name,
          idade: idade,
        })

        alert('Dados salvos com sucesso')
        setName('');
        setIdade('');
        
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput style={styles.input}
        placeholder="Name"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text style={styles.text}>Idade</Text>
      <TextInput style={styles.input}
        placeholder="Idade"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setIdade(text)}
        value={idade}
      />
      <Button 
        title="Save Data"
        onPress={saveData}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: '90%',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    padding: 10,
    marginTop: 10,
  }
});


