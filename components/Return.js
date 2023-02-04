import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Entry from './Entry'

const Return = ({navigate}) => {

  const [parkUUID, setParkUUID] = useState('000');
  const [overtimefee, setovertimefee] = useState(5000)
  const [entryTimestamp, setEntryTimestamp] = useState()
  const [exitTimestamp, setExitTimestamp] = useState("")
  const [epoch, setEpoch] = useState()
  const [selected, setSelected] = useState()
  const [designationRate, setDesignationRate] = useState()
  const [ticketStatus, setTicketStatus] = useState(1)
  const [uuidlist, setuuidlist] = useState([])

  useMemo(() => {
    AsyncStorage.getAllKeys()
    .then(allkeys => {
          allkeys.forEach((key) => {
          console.log(`key ${key}`)
          setuuidlist(uuidlist => [...uuidlist, {key:key, value:key}])
        })
    })
  }, [])

  const processReentry = async () => {
        
    //get parking detail
    AsyncStorage.getItem(selected)
    .then(details => {
        setParkUUID(selected)
        let obj = JSON.parse(details)
        //{"status":1,"lotentry":"2/3/2023 - 12::9","lotexit":"","designation":"Small","rate":20,"epoch":}
        setEntryTimestamp(obj.lotentry)
        var current = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        var hour = new Date().getHours()
        var minutes = new Date().getMinutes()
        var seconds = new Date().getSeconds()
        //military time format - '2022-01-24T09:30:20'
        setExitTimestamp(`${year}-${month}-${current}T${hour}:${minutes}:${seconds}`)
        setEpoch(new Date())
        //is exiting vehicle over 24 hours
        const then = new Date(obj.epoch)
        const now = new Date()
        var msBetweenDates = (now.getTime() - then.getTime())/1000;
        msBetweenDates /= (60*60)
        let hours = Math.abs(Math.round(msBetweenDates))
        let rate = obj.rate
        let balance = obj.balance
        console.log(`${hours}::${rate}`)
        if(hours > 1) {
          console.log(`provide new ticket`)
          navigation.navigate(Entry)
          
        }
        else {
          console.log(`Allow entry and continue from lot entry timestamp`)
          AsyncStorage.removeItem(parkUUID,(error, result) => {
            if(!error) {
              const fee = (rate * hours)
              setTicketStatus(1) //set to close
              AsyncStorage.setItem(parkUUID, JSON.stringify({status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate,epoch:epoch,balance:balance}))
            }
            else {
              console.log(`Error.  Unable to remove`)
            }
          })
        }
    })
  }

  const pay = async() => {
    //first remove record then add newly edited record
    AsyncStorage.removeItem(parkUUID,(error, result) => {
      if(!error) {
        setTicketStatus(0) //set to close
        AsyncStorage.setItem(parkUUID, JSON.stringify({status:ticketStatus, lotentry:entryTimestamp,lotexit:exitTimestamp, designation:selected, rate:designationRate,epoch:epoch}))
      }
      else {
        console.log(`Error.  Unable to remove`)
      }
    })
    
    
  }

    return (
        <>
        <View style={styles.container}>
          <View><Text style={styles.fieldlabels}>Re-Entry</Text></View>
          
          <View style={styles.view2}>
            <Text style={styles.fieldlabels}>Ticket Status:</Text><Text style={styles.fieldvalues}>{ticketStatus == 1 ? 'Open Ended' : 'Closed'}</Text>
            <Text style={styles.fieldlabels}>Parking Entry Identifier:</Text><Text style={styles.fieldvalues}> {parkUUID}</Text>
            <Text style={styles.fieldlabels}>Lot Entry Timestamp:</Text><Text style={styles.fieldvalues}>{entryTimestamp}</Text>
            <Text style={styles.fieldlabels}>Lot Exit Timestamp:</Text><Text style={styles.fieldvalues}>{exitTimestamp}</Text>
          </View>

          <View style={styles.view1}>
              <Text style={styles.fieldlabels}>Ticket UUID</Text>
              <SelectList 
                onSelect={() => processReentry()}
                setSelected={(val) => setSelected(val)}
                data={uuidlist}
                save="value"
              />
          </View>

          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.button1} onPress={() => pay()}><Text>Pay</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate(Entry)}>
              <Text>Entry</Text>
            </TouchableOpacity>
          </View>

        </View>
        </>
      );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'lightgray',
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
    borderRadius: 10,
    elevation: 1,
    backgroundColor: 'green',
  },
  button2: {
    alignItems: 'left',
    justifyContent: 'left',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: 'orange',
  },
  button3: {
    alignItems: 'left',
    justifyContent: 'left',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 10,
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


export default Return