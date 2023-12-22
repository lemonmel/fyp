import { StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const primary = 'mediumturquoise';
const light = 'paleturquoise';
const dark = 'darkturquoise';
const graph_point_1 = 'darkolivegreen';
const graph_point_2 = 'darkorange';
const graph_area = 'lightcyan';

const styles = StyleSheet.create({
    content:{
        flex: 1,
        backgroundColor: 'white',
    },

    full_screen_content:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },

    center:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    small_text:{
        color: primary,
        fontSize: 15,
        marginTop: 15,
    },

    button:{
        width: width * 0.8,
        height: 50,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 50, 
        marginTop: height * 0.035,
    },

    small_button:{
        width: width * 0.4,
        height: 50,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 50, 
        marginTop: height * 0.025,
        marginBottom: height * 0.035,
    },

    button_in_button:{
        width: width * 0.8 * 0.3,
        height: 50,
        borderColor: 'white',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text_in_button:{
        color: 'white',
        fontSize: width * 0.05, 
        fontWeight:500,
    },
    
   input:{
        width: width * 0.78,
        height: width * 0.12,
        backgroundColor: 'whitesmoke',
        paddingVertical: 10, //padding let placeholder text in left-center
        paddingHorizontal: 15,
        borderRadius: 10, 
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },

    heading:{
        fontSize: width * 0.08, 
        paddingTop: height * 0.01, 
        fontWeight: 'bold',
    },

    subtitle:{
        fontSize: width * 0.04,
        marginTop: height * 0.02,
    },

    question:{
        fontSize: width * 0.04,
        marginTop: height * 0.02,
        alignSelf: 'flex-start',
        paddingStart: height * 0.01,
    },

    center_text:{
        fontSize: width * 0.04,
        marginTop: height * 0.02,
        alignSelf: 'center',
        textAlign: 'justify',
        paddingStart: height * 0.01,
    },

    row:{
        height: width * 0.18,
        borderBottomWidth: 0.25,
        borderBottomColor: 'grey',
        alignItems: 'center',
        paddingHorizontal: 30,
        flexDirection: 'row',
    },

    text_in_row:{
        fontSize: width * 0.05,
        fontWeight: '500',
        color: '#333333',
        flex: 1,
    },

    card:{
        height: width * 0.25,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'whitesmoke',
    },

    text_in_card:{
        fontSize: width * 0.046,
        fontWeight: '500',
        color: 'black',
        flex: 1,
    },

    collapsible:{
        fontSize: width * 0.04,
        marginHorizontal: 5,
        paddingTop: 5,
    },

    modal:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    text_in_modal:{
        fontSize: width * 0.04,
        textAlign: 'center',
    },

    shadow_container:{
        margin: 20, 
        backgroundColor: 'white',
        borderRadius: 20,
        paddingStart: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    indicatorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: light,
        marginHorizontal: 5,
    },

    activeDot: {
        backgroundColor: dark,
    },
});

export { styles, width, height, primary, light, dark, graph_point_1, graph_point_2, graph_area }
