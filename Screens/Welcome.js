import React from 'react';
import {ProductsContext} from './Store/ProductsContext';

import {FlatList, Button, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function Welcome({navigation}) {
  const useCtx = React.useContext(ProductsContext);

  React.useEffect(() => {
    AsyncStorage.getItem('storage', (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // for (let x of item) {
        //   console.log(x);
        // }
        console.log(typeof item);
        console.log(item);
        var strObj = item;

        var jsonStr = strObj.replace(/(\w+:)|(\w+ :)/g, function (s) {
          return '"' + s.substring(0, s.length - 1) + '":';
        });

        var obj = JSON.parse(jsonStr);
        console.log(obj);
        Object.keys(obj).forEach(key => {
          console.log(obj[key]);
          useCtx.setproducts2(obj[key]);
        });
      }
    });
  }, []);

  console.log(useCtx.products2);
  function PressHandler() {
    navigation.navigate('EntryScreen');
  }
  function renderDiaryItem(entrydata) {
    return (
      <View style={styles.EntryItem}>
        <View style={styles.EntryDate}>
          <Text style={styles.EntryDate}>{entrydata.item.date}</Text>
        </View>
        <Text style={styles.goalText}>{entrydata.item.text}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <FlatList
          data={useCtx.products2}
          keyExtractor={item => item.id}
          renderItem={renderDiaryItem}
        />

        <Pressable style={styles.button} onPress={PressHandler}>
          <Text style={styles.btntext}>+</Text>
        </Pressable>
      </View>
    </>
  );
}

export default Welcome;
const styles = StyleSheet.create({
  EntryItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acf',
  },
  goalText: {
    color: 'white',
    padding: 8,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#0B032D',
  },
  EntryDate: {
    fontSize: 24,
    margin: 4,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btntext: {
    fontSize: 50,
    lineHeight: 50,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'white',
  },
});
