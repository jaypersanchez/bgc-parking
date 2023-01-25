import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import { SelectList } from 'react-native-dropdown-select-list'

export default function App() {

  const [parkUUID, setParkUUID] = useState('000');
  const [entryTimestamp, setEntryTimestamp] = useState()
  const [selected, setSelected] = useState()
  const vehicleDesignationList = [
    {key:'s', value:'Small'},
    {key:'m', value:'Medium'},
    {key:'l', value:'Large'}
  ]

  useEffect(() => {
    setParkUUID('000')
    var current = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()
    //military time format
    setEntryTimestamp(`${month}/${current}/${year} - ${hour}::${minutes}`)
    setParkUUID(uuid.v4())
  },[])

  return (
    <View style={styles.container}>
      <Text>`Parking Entry Identifier: {parkUUID}`</Text>
      <Text>`Lot Entry Timestamp: {entryTimestamp}`</Text>
      <StatusBar style="auto" />
      <View>
          <Text>`Vehicle Size Designation - {selected}`</Text>
          <SelectList 
            setSelected={(val) => setSelected(val)}
            data={vehicleDesignationList}
            save="value"
          />
      </View>
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
