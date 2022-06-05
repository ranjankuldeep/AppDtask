import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  View,
  Button,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// this is used for storing data locally..
import {ProductsContext} from './Store/ProductsContext';
const Entryscreen = ({navigation}) => {
  const useCtx = React.useContext(ProductsContext);

  const [enteredtext, setenteredtext] = React.useState('');

  const goalInputHandler = enteredText => {
    setenteredtext(enteredText);
  };
  function makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function addGoalHandler(entered) {
    let KEY1 = 'test_merge';
    let KEY2 = 'test_assign'; // I'll use this in the next example
    let ORIG = {
      product1: {
        name: 'kuldeep',
      },
    };

    let DELTA = {
      product2: {
        title: 'ranjan',
      },
    };
    AsyncStorage.setItem(KEY1, JSON.stringify(ORIG), () => {
      AsyncStorage.mergeItem(KEY1, JSON.stringify(DELTA), () => {
        AsyncStorage.getItem(KEY1, (err, result) => {
          let data = JSON.parse(result);
          console.log(typeof data);
          console.log('KEY1 result of merged object: %O', data.product2);
        });
      });
    });
    console.log(ORIG);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let id = makeid(3);

    useCtx.updateid(id);
    var obj = {[id]: {id: id, date: today, text: entered}};
    AsyncStorage.mergeItem('storage3', JSON.stringify(obj));

    // useCtx.setproducts2({[id]: {id: id, date: today, text: entered}});
    useCtx.setproducts2({id: id, date: today, text: entered});
    setenteredtext('');
  }
  AsyncStorage.setItem('intial', JSON.stringify({id: 6, date: 8, text: 'hj'}));

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={goalInputHandler}
        value={enteredtext}
        multiline={true}
        placeholder="Enter your activity here....."
      />
      <View>
        <Button
          title="Add"
          onPress={addGoalHandler.bind(this, enteredtext)}
          color="#f31282"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 140,
    margin: 12,
    fontSize: 24,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 10,
  },
});

export default Entryscreen;
