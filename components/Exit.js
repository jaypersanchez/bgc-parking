import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Exit = ({navigate}) => {
    return (
        <>
        <Pressable
          android_ripple={{color:'#ccc'}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]} 
        >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Exit Lot</Text>
        </View>
        </Pressable>
        </>
      );
}

export default Exit