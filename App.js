import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [parkUUID, setParkUUID] = useState('000');
  const [entryTimestamp, setEntryTimestamp] = useState()

  useEffect(() => {
    setParkUUID('000')
    var current = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()
    //military time format
    setEntryTimestamp(`${month}/${current}/${year} - ${hour}::${minutes}`)
  },[])

  return (
    <View style={styles.container}>
      <Text>{parkUUID}</Text>
      <Text>{entryTimestamp}</Text>
      <StatusBar style="auto" />
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
