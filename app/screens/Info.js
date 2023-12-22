import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, } from 'react-native';
import { styles } from '../element/style.js';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loadInfo } from '../loader/infoManager.js';
function Info(props) {
    const [activeSections, setActiveSections] = useState([]);
    const [SECTIONS, setSECTIONS] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
          try {
            const infos = await loadInfo();
            setSECTIONS(infos);
          } catch (error) {
            console.error("Error fetching test results:", error);
          }
        }
        fetchData();
      }, [])

    const renderHeader = (section) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text_in_card}>{section.title}</Text>
            <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-down"/>
        </View>
    );
    };

    const renderContent = (section) => {
        const contentWithLineBreak = section.content.replace(/<br\/>/g, '\n');
        return (
            <View style={styles.collapsible}>
                <Text style={styles.collapsible}>{contentWithLineBreak}</Text>
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };
    
    return (
        <ScrollView style={[styles.content]}>
            <View style={{marginHorizontal: 20, marginBottom: 20}}>
                <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={updateSections}
                    expandMultiple={false}
                    touchableComponent={TouchableOpacity}
                />
            </View>
        </ScrollView>
    );
}

export default Info;