import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
import Listagem from './src/Listagem';
export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    async function createUser() {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((value) => {
          firebase.database().ref('users').child(value.user.uid).set({
            name: name,
            lastName: lastName
          })
          alert('Usuário criado com sucesso!');
          setEmail('');
          setPassword('');
          setName('');
          setLastName('');
        }).catch(error => {
          alert(error.message)
        })
      
    }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>First name</Text>
      <TextInput style={styles.input}
        placeholder="Your first name"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setName(text)}
        value={name}
      /> 
      <Text style={styles.text}>Last name</Text>
      <TextInput style={styles.input}
        placeholder="Your last name"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.input}
        placeholder="example@gmail.com"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input}
        placeholder="password"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button 
        title="Create new User"
        style={styles.button}
        color="#b4f737"
        onPress={createUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  textUser: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '40%',
    padding: 10,
    marginTop: 10,
  }
});


