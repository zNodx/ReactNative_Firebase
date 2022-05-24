import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
import Listagem from './src/Listagem';
export default function App() {
    const [name, setName] = useState('');
    const [idade, setIdade] = useState('');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    useEffect(() => { 

      async function setData() {
    
        await firebase.database().ref('/user').on('value', (snapshot) => {
          setUsers([]);
          snapshot.forEach((child) => {
            let data = {
              id: child.key,
              name: child.val().name,
              idade: child.val().idade
            }
            setUsers(oldArray => [...oldArray, data].reverse());
          })
          setLoading(false);
        })

      }
      setData()
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

    console.log(users);

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
    {loading ? 
    <ActivityIndicator size="large" color="#0000ff" />
     :
     <FlatList
        keyExtractor={(item) => item.id}
        data={users}
        renderItem = {({item}) => ( <Listagem data={item} />)}
      />
      }
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


