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
        console.log(`${hours}::${rate}`)
        if(hours > 1) {
          console.log(`provide new ticket`)
        }
        else {
          console.log(`Aloow entry and continue from lot entry timestamp`)
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Re-Entry</Text>
        </View>
        <View>
              <Text>Ticket UUID</Text>
              <SelectList 
                onSelect={() => processReentry()}
                setSelected={(val) => setSelected(val)}
                data={uuidlist}
                save="value"
              />
          </View>
          <View>
            <Text>Ticket Status: {ticketStatus == 1 ? 'Open Ended' : 'Closed'}</Text>
            <Text>Parking Entry Identifier: {parkUUID}</Text>
            <Text>Lot Entry Timestamp: {entryTimestamp}</Text>
            <Text>Lot Exit Timestamp: {exitTimestamp}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => pay()}><Text>Pay</Text></TouchableOpacity>
          </View>
        <TouchableOpacity onPress={() => navigation.navigate(Entry)}>
          <Text>Entry</Text>
        </TouchableOpacity>
        </>
      );
}

export default Return