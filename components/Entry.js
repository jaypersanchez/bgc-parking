import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { SelectList } from 'react-native-dropdown-select-list'
import Exit from './Exit';


const Entry = ({navigation}) => {

    const [parkUUID, setParkUUID] = useState('000');
    const [entryTimestamp, setEntryTimestamp] = useState()
    const [exitTimestamp, setExitTimestamp] = useState("")
    const [selected, setSelected] = useState()
    const [designationRate, setDesignationRate] = useState()
    const [ticketStatus, setTicketStatus] = useState(1)
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

      useMemo(() => {
        AsyncStorage.getAllKeys()
        .then(allkeys => {
          console.log(`allkeys ${allkeys}`)
        })
      },[])

      const setHourlyRate = () => {
        if(selected === "Small") {
          setDesignationRate(20)
        }
    
        if(selected === "Medium") {
          setDesignationRate(60)
        }
    
        if(selected === "Large") {
          setDesignationRate(100)
        }
      }

      const saveTicket = () => {
        console.log(`${JSON.stringify({uuid: parkUUID, status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate})}`)
          AsyncStorage.setItem(parkUUID, JSON.stringify({status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate}))
          .then(error => {
            if(error) console.log(`Unable to save ticket information`)
          })
      }

      return (
        <>
        <View style={styles.container}>
          <Text>Ticket Status: {ticketStatus == 1 ? 'Open Ended' : 'Closed'}</Text>
          <Text>Parking Entry Identifier: {parkUUID}</Text>
          <Text>Lot Entry Timestamp: {entryTimestamp}</Text>
          <Text>Lot Exit Timestamp: {exitTimestamp}</Text>
          <StatusBar style="auto" />
          <View>
              <Text>Vehicle Size Designation - {selected} Rate {designationRate}</Text>
              <SelectList 
                onSelect={() => setHourlyRate()}
                setSelected={(val) => setSelected(val)}
                data={vehicleDesignationList}
                save="value"
              />
          </View>
          <View>
                <Button onPress={saveTicket}>Save Ticket</Button>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Exit")}>
              <Text>Exit Lot</Text>
            </TouchableOpacity>
          </View>
        </View>
        </>
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

  export default Entry