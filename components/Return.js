import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Entry from './Entry'

const Return = ({navigate}) => {

    const [parkUUID, setParkUUID] = useState('000');
    const [entryTimestamp, setEntryTimestamp] = useState()
    const [exitTimestamp, setExitTimestamp] = useState("")
    const [selected, setSelected] = useState()
    const [designationRate, setDesignationRate] = useState()
    const [ticketStatus, setTicketStatus] = useState(1)
    const [uuidlist, setuuidlist] = useState([])

    //load all active tickets
    useMemo(() => {
        AsyncStorage.getAllKeys()
        .then(allkeys => {
            allkeys.forEach((key) => {
                console.log(`key ${key}`)
                setuuidlist(uuidlist => [...uuidlist, {key:key, value:key}])
            })
        })
    }, [])

    const getTicketDetail = async () => {
        
        AsyncStorage.getItem(selected)
        .then(details => {
            setParkUUID(selected)
            let obj = JSON.parse(details)
            console.log(`${obj.status}::${obj.lotentry}`)
            //{"status":1,"lotentry":"2/3/2023 - 12::9","lotexit":"","designation":"Small","rate":20}
            //is returning car within one hour of exit
            
        })
        
    }

    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Returning Vehicle</Text>
        </View>
        <View>
              <Text>Ticket UUID</Text>
              <SelectList 
                onSelect={() => getTicketDetail()}
                setSelected={(val) => setSelected(val)}
                data={uuidlist}
                save="value"
              />
          </View>
          <View>

          </View>
        <TouchableOpacity onPress={() => navigation.navigate(Entry)}>
          <Text>Entry</Text>
        </TouchableOpacity>
        </>
      );
}

export default Return