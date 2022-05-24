import { StyleSheet, Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import firebase from './src/config/firebase';
export default function App() {
    const [name, setName] = useState('Carregando...');
    const [idade, setIdade] = useState('Carregando...');

    useEffect(() => {

      async function Date () {
        //On atualiza o dado a toda alteração feita no DB 
        //Once é para pegar apenas uma vez
          await firebase.database().ref('user/1').once('value', (snapshot) => {
          setName(snapshot.val().name);
          setIdade(snapshot.val().idade);
        })
      }

      Date();
 
    }, []);

  return (
    <View style={styles.container}>
      <Text>Olá {name}</Text>
      <Text>Sua idade é {idade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
