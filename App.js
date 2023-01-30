import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import uuid from 'react-native-uuid';
import { SelectList } from 'react-native-dropdown-select-list'
import Entry from './components/Entry'
import Exit from './components/Exit'

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Entry">
            <Stack.Screen name="Entry" component={Entry} />
          </Stack.Navigator>
        </NavigationContainer>  
      
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
