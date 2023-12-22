import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { light, primary, width } from '../element/style'

export function ProgressBar(percentage) {
    console.log('Progress Bar called!')

    return (
      <View style={styles.container}>
        <View style={[styles.bar, { width: width*percentage }]} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      height: 10,
      backgroundColor: light,
    },
    bar: {
      height: 10,
      backgroundColor: primary,
    },
});
  
  