import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Entry from './Entry'

const Exit = ({navigate}) => {

  const [parkUUID, setParkUUID] = useState('000');
  const [entryTimestamp, setEntryTimestamp] = useState()
  const [exitTimestamp, setExitTimestamp] = useState("")
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

  const processExit = async () => {
        
    //get parking detail
    AsyncStorage.getItem(selected)
    .then(details => {
        setParkUUID(selected)
        let obj = JSON.parse(details)
        //{"status":1,"lotentry":"2/3/2023 - 12::9","lotexit":"","designation":"Small","rate":20}
        //is exiting vehicle over 24 hours
        const then = new Date(obj.epoch)
        const now = new Date()
        var msBetweenDates = (now.getTime() - then.getTime())/1000;
        msBetweenDates /= (60*60)
        let hours = Math.abs(Math.round(msBetweenDates))
        let rate = obj.rate
        console.log(`${hours}::${rate}`)
        if(hours >= 24) {
          const fee = (rate*hours)+5000
          console.log(`over time charge ${fee}`)
        }
        else {
          const fee = rate * hours
          console.log(`normal charge ${fee}`)
        }
    })
  }

    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Exit Lot</Text>
        </View>
        <View>
              <Text>Ticket UUID</Text>
              <SelectList 
                onSelect={() => processExit()}
                setSelected={(val) => setSelected(val)}
                data={uuidlist}
                save="value"
              />
          </View>
        <TouchableOpacity onPress={() => navigation.navigate(Entry)}>
          <Text>Entry</Text>
        </TouchableOpacity>
        </>
      );
}

export default Exit