import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
import Listagem from './src/Listagem';
export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    async function createUser() {
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(( value ) => {
          alert('Bem vindo '+ value.user.email);
          setUser(value.user.email);
          setEmail('');
          setPassword('');
        }).catch((error) => {
          alert(error.message);
          return;
        }
      )
    
    }

    async function logout() {
        await firebase.auth().signOut();
        setUser('');
        alert('Você saiu');
    }
  return (
    <View style={styles.container}>
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
        title="Login"
        style={styles.button}
        color="#b4f737"
        onPress={createUser}
      />
      <Text style={styles.textUser}>{user}</Text>
      { user && <Button
        title="Logout"
        color="#fa4922"
        style={styles.button}
        onPress={logout}
      />}
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


