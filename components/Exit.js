import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import Entry from './Entry'

const Exit = ({navigate}) => {
    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Exit Lot</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(Entry)}>
          <Text>Entry</Text>
        </TouchableOpacity>
        </>
      );
}

export default Exit