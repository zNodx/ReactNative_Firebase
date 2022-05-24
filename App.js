import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
import Listagem from './src/Listagem';
export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function createUser() {
      await firebase.auth().createUserWithEmailAndPassword(email, password).then(
        ( value ) => {
          alert('Usuário criado com sucesso '+ value.user.email);
          setEmail('');
          setPassword('');
        }).catch((error) => {
          if(error.code === 'auth/email-already-in-use') {
            alert('Email já cadastrado');
          }else if(error.code === 'auth/invalid-email') {
            alert('Email inválido');
          }else if (error.code === 'auth/weak-password') {
            alert('Senha fraca');
          }
        }
      )
    
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput style={styles.input}
        placeholder="example@gmail.com"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.text}>Idade</Text>
      <TextInput style={styles.input}
        placeholder="password"
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button 
        title="Save Data"
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


