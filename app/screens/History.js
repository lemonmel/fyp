import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, Touchable, Button} from 'react-native';
import { styles, primary, } from '../element/style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loadAllHistory } from '../loader/historyManager.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../element/Loading.js';

function History({navigation}) {
  console.log("History page run");

  const [history, setHistory] = useState([]);

  const fetchData = async() => {
    try {
      const testResults = await loadAllHistory();
      setHistory(testResults);
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const delay = 1000; // Delay in milliseconds (adjust as needed)

      const timer = setTimeout(() => {
        fetchData();
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [])
  );

  // useEffect(() => {
  //   fetchData();
  // }, [])

  console.log(history);
  if (history.length == 0){
    return(
      <View style={[styles.content, styles.center]}>
        {Loading("You don't have any test result", "card-bulleted-off-outline")}
        {/* <Button onPress={addDataNew} title='add Data'/> */}
      </View>
    );
  }

  const handleNavigate = (doc_id, doc_date, doc_type) => {
    navigation.navigate('Report', {id: doc_id, type: doc_type, page: "history"})
  }

  const renderIcon = (status) => {
    if(status == 'pass'){
      return (<MaterialCommunityIcons size = {50} color = {primary} name="check-circle-outline"/>);
    }
    return (<MaterialCommunityIcons size = {50} color = 'salmon' name="alert-circle-outline"/>);
  }

  const renderCard = () => {
    return(
      history.map((item, index) => (
        <TouchableOpacity 
          style={[styles.card, styles.shadow_container, {marginBottom: 5}]} 
          key = {index}
          onPress={() => handleNavigate(item.id, item.date, item.type)}
        >
          <View style={[styles.text_in_card, {marginHorizontal: 10}]}>
            <Text style={{fontSize: 30}}>{item.side.charAt(0).toUpperCase() + item.side.slice(1)}</Text>
            <Text style={{fontSize: 15}}>{item.status.toUpperCase()}: {item.date} </Text>
          </View>
          {renderIcon(item.status)}
        </TouchableOpacity>
      ))
    );
  }

  return (
    <ScrollView style={[styles.content]}>
      <View style={currentStyle.tab}>
        <Text style={currentStyle.word_in_tab}> Most Recent Test: </Text>
        <Text style={currentStyle.word_in_tab}> {history[0].date}</Text>
      </View>
      <View style={{marginBottom: 20}}>
        {renderCard()}
      </View>
      {/* <Button onPress={addDataNew} title='add Data'/> */}
    </ScrollView>
  );
};

const currentStyle = StyleSheet.create({
  tab:{
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 7,
    backgroundColor: primary, 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical:20, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  word_in_tab: {
    fontSize: 20,
    color: 'white',
    fontWeight: 600,
  }

})

export default History;