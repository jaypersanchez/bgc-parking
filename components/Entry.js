import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { SelectList } from 'react-native-dropdown-select-list'
import Exit from './Exit';
import Return from './Return';


const Entry = ({navigation}) => {

    const [parkUUID, setParkUUID] = useState('000');
    const [entryTimestamp, setEntryTimestamp] = useState()
    const [exitTimestamp, setExitTimestamp] = useState("")
    const [epoch, setEpoch] = useState()
    const [balance, setBalance] = useState(0)
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
        setEpoch(new Date())
        var current = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        var hour = new Date().getHours()
        var minutes = new Date().getMinutes()
        var seconds = new Date().getSeconds()
        //military time format - '2022-01-24T09:30:20'
        setEntryTimestamp(`${year}-${month}-${current}T${hour}:${minutes}:${seconds}`)
        setParkUUID(uuid.v4())
      },[])

      //get all keys stored in AsyncStorage
      /*useMemo(() => {
        AsyncStorage.getAllKeys()
        .then(allkeys => {
          console.log(`allkeys ${allkeys}`)
        })
      },[])*/

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
        console.log(`${JSON.stringify({uuid: parkUUID, status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate,epoch:epoch, balance:balance})}`)
          AsyncStorage.setItem(parkUUID, JSON.stringify({status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate,epoch:epoch,balance:balance}))
          .then(error => {
            if(error) console.log(`Unable to save ticket information`)
          })
      }

      return (
        <>
        
        <View style={styles.container}>

          <View><Text style={styles.fieldlabels}>Arriving Vehicle</Text></View>
          
          <View style={styles.view1}>
              <Text style={styles.fieldlabels}>Ticket Status:</Text><Text style={styles.fieldvalues}>{ticketStatus == 1 ? 'Open Ended' : 'Closed'}</Text>
              <Text style={styles.fieldlabels}>Parking Entry Identifier:</Text><Text style={styles.fieldvalues}>{parkUUID}</Text>
              <Text style={styles.fieldlabels}>Lot Entry Timestamp:</Text><Text style={styles.fieldvalues}>{entryTimestamp}</Text>
              <Text style={styles.fieldlabels}>Lot Exit Timestamp:</Text><Text style={styles.fieldvalues}>{exitTimestamp}</Text>
              <StatusBar style="auto" />
              <Text style={styles.fieldlabels}>Vehicle Size Designation -</Text><Text style={styles.fieldvalues}>{selected} Rate {designationRate}</Text>
              <SelectList 
                onSelect={() => setHourlyRate()}
                setSelected={(val) => setSelected(val)}
                data={vehicleDesignationList}
                save="value"
              />
          </View>

          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.button1} onPress={() => saveTicket()}>
                  <Text>Save Ticket</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Return")}>
              <Text>Returning Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate("Exit")}>
              <Text>Exit Lot</Text>
            </TouchableOpacity>
          </View>

        </View>
        </>
      );
        
}

const styles = StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fieldlabels: {
      fontWeight:"bold"
    },
    fieldvalues: {
      color:"steelblue"
    },
    button1: {
      alignItems: 'left',
      justifyContent: 'left',
      paddingVertical: 20,
      paddingHorizontal: 32,
      borderRadius: 1,
      elevation: 1,
      backgroundColor: 'green',
    },
    button2: {
      alignItems: 'left',
      justifyContent: 'left',
      paddingVertical: 20,
      paddingHorizontal: 32,
      borderRadius: 1,
      elevation: 1,
      backgroundColor: 'orange',
    },
    button3: {
      alignItems: 'left',
      justifyContent: 'left',
      paddingVertical: 20,
      paddingHorizontal: 32,
      borderRadius: 1,
      elevation: 1,
      backgroundColor: 'yellow',
    },
    view1: {
      flex: 1,
      padding:30
    },
    view2: {
      flex: 2,
      padding:30
    },
    view3: {
      flex:3,
      padding:30
    }
  });

  export default Entry