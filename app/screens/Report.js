import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import { VictoryScatter, VictoryAxis, VictoryChart, VictoryArea, } from "victory-native";
import { styles, primary, graph_point_1, graph_point_2, graph_area} from '../style/style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loadCurrentTest, deleteData } from '../loader/reportManager.js';
import { Loading } from '../component/Loading.js';
import { width } from '../style/style.js';
import { ProgressBar } from '../component/ProgressBar.js';
import { generatePDF } from '../loader/pdfGenerator.js';
import { captureRef } from 'react-native-view-shot';


function Report({route, navigation}) {
  const [result, setResult] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  const [axisValue, setAxisValue] = useState([0.5, 1, 2, 4, 8]);
  const [upperBar, setUpperBar] = useState(route.params.page != "history")
  // const [loading, setLoading] = useState(true);
  const imageRef = useRef();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const testResults = await loadCurrentTest(route.params.id);
        setResult(testResults);
        console.log(testResults);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
        // setLoading(false);
      }
    }
    fetchData();
  }, [])

  const closeIcon = () => {
    if(upperBar){
      return (
        <View>
          <TouchableOpacity style={{alignSelf: 'flex-end', marginHorizontal: 10}} onPress={() => navigation.navigate('Index')}>
              <MaterialCommunityIcons name="close" color={primary} size={40} />
          </TouchableOpacity>
        </View>
    );
    }
  }

  const progress = () => {
    if(upperBar){
      return (
        <View>
            {ProgressBar(1)}
        </View>
    );
    }
  }

  const data = {notched_noise: result.notched,
        narrowband: result.narrowband,
        FS: result.FS,
        side: result.side}

  if (result.length == 0) {
    return(
      <View style={[styles.content, styles.center]}>
        {Loading("Loading", "loading")}
      </View>
    );
  }

  const area_data = Object.keys(result.nh_range).map((frequency) => ({
    x: parseInt(frequency) / 1000,
    y: result.nh_range[frequency].max,
    y0: result.nh_range[frequency].min,
  }));

  const generateData = (datasets) => {
    const data = Object.keys(datasets).map((key) => ({
      x: key/1000,
      y: datasets[key],
    }));
    return data;
  }

  const renderGraph = () => {
    let notched_line_data = generateData(data.notched_noise);
    let narrowband_data = generateData(data.narrowband);
    let fs_data =  generateData(data.FS);
    console.log(fs_data)

    return (
      <View ref={imageRef} style={[styles.shadow_container]}>
        <Text style={[styles.subtitle, {fontWeight: 'bold', alignSelf: 'center'}]}> {data.side.toUpperCase()} FS Screening Result </Text>
        <VictoryChart width={width*0.85} >
          <VictoryArea
            data={area_data}
            style={{
              data: {
                fill: 'lightcyan', strokeWidth: 0,
              },
            }}
          />
          <VictoryScatter
            data={notched_line_data}
            style={{
              data: {
                fill: graph_point_1
              },
            }}
          />
          <VictoryScatter
            data={narrowband_data}
            style={{
              data: {
                fill: graph_point_2
              },
            }}
          />
          <VictoryScatter
            data={fs_data}
            style={{
              data: {
                fill: primary
              },
            }}
          />
          <VictoryAxis
            tickValues={axisValue}
            label="Frequency (kHz)"
          />
          <VictoryAxis dependentAxis
            label="Threshold (dB)"
            domain = {[10, 70]}
            style={{ axisLabel: { padding: 35 } }}
          />
        </VictoryChart>
      </View>
    );
  };

  const renderIcon = (status) => {
    if(status == 'pass'){
      return (<MaterialCommunityIcons size = {50} color = {primary} name="check-circle-outline"/>);
    }
    return (<MaterialCommunityIcons size = {50} color = 'salmon' name="alert-circle-outline"/>);
  }

  const renderResult = () => {
    // const status_left=result.status_left;
    // const status_right=result.status_right;
    // let status_overall = 'Fail';
    // if(status_left == 'Pass' && status_right == 'Pass'){
    //   status_overall = 'Pass';
    // }

    let message = 'Your frequency selectivity (FS) measure is between the normal range';
    if(result.status == 'fail'){
      message = 'Your frequency selectivity (FS) measure at one or more frequencies falls outside (or within) the normal range (shaded in light blue). As this is only a screening test, it is possible that your results may not reflect your actual hearing ability. If you are worried about hearing loss, kindly visit an audiologist for a standard hearing test.'
    }


    return (
      <View>
        <View style={[styles.card, styles.shadow_container]}>
          <View style={[styles.text_in_card, {marginHorizontal: 10}]}>
            <Text style={{fontSize: 25, fontWeight: 500}}>{result.status.charAt(0).toUpperCase()}{result.status.slice(1)}</Text>
            {/* <Text style={{fontSize: 25, fontWeight: 500}}>Right: {status_right}</Text> */}
          </View>
          {renderIcon(result.status)}
        </View>
        <View style={{marginHorizontal: 20, alignItems: 'center'}}>
          <Text style={[styles.subtitle, {marginTop: 0}]}>{message}</Text>
        </View>
      </View>


    );
  };

  const handleDelete = async() => {
    Alert.alert('Confirmation of Delete', 'Confirm to delete this record? This action cannot be undo.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {
        deleteData(route.params.id)
        navigation.navigate('History Main')
      }},
    ]);
  }

  const handleShare = async() => {
    const localUri = await captureRef(imageRef, {
      height: 440,
      quality: 1,
    });
    generatePDF(result, localUri)
  }

  return (
    <SafeAreaView style={[styles.full_screen_content]}>
      {closeIcon()}
      {progress()}
      <ScrollView style={[styles.content]}>
      <View style={styles.center}>
        <Text style={styles.subtitle}>{result.date}</Text>
      </View>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.side}
        renderItem={renderGraph}
        horizontal={true}
        pagingEnabled={true} // Enable pagination effect
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const { contentOffset, layoutMeasurement } = event.nativeEvent;
          const page = Math.floor(contentOffset.x / layoutMeasurement.width);
          setCurrentPage(page);
        }}
      /> */}
      {renderGraph()}
      <View style={[styles.indicatorContainer]}>
        <View
          style={[styles.indicatorDot, {backgroundColor: primary}]}
        />
        <Text>FS </Text>
        <View
          style={[styles.indicatorDot, {backgroundColor: graph_point_2}]}
        />
        <Text>Narrowband Test</Text>
        <View
          style={[styles.indicatorDot, {backgroundColor: graph_point_1}]}
        />
        <Text>Notched Noise Test</Text>
      </View>
      <View style={[styles.indicatorContainer]}>
        <View
          style={[styles.indicatorDot, {backgroundColor: graph_area}]}
        />
        <Text>Normal Hearing Range</Text>
      </View>
      {/* <View style={styles.indicatorContainer}>
        <View
          style={[styles.indicatorDot, currentPage === 0 && styles.activeDot]}
        />
        <View
          style={[styles.indicatorDot, currentPage === 1 && styles.activeDot]}
        />
      </View> */}
      {renderResult()}
      <View style={[styles.center, styles.indicatorContainer]}>
        <TouchableOpacity style = {[styles.small_button, {backgroundColor: 'salmon'}]} onPress = {handleDelete}>
          <Text style = {styles.text_in_button}>Delete</Text>
        </TouchableOpacity>
        <Text>   </Text>
        <TouchableOpacity style = {[styles.small_button]} onPress = {handleShare}>
          <Text style = {styles.text_in_button}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default Report;