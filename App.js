import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Dimensions, ImageBackground, Switch, View } from 'react-native';
import {Picker} from '@react-native-community/picker';

import { ButtonGroup, Button, Text, Image } from 'react-native-elements';

import Genelet from './genelet.jsx';
import p_car_topics from './p/car/topics.jsx';
import p_car_history from './p/car/history.jsx';
import p_car_edit from './p/car/edit.jsx';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      makes: [],
      selectedIndex: 0,
      selectedYear: "",
      selectedMake: ""
    };
  }

  updateIndex = (currentIndex) => {
    // console.log(10000, currentIndex);
    this.setState({selectedIndex: currentIndex});
  }

  setSelectedYear = (currentYear) => {
    // console.log(20000, currentYear);
    this.setState({selectedYear:currentYear});
  }

  setSelectedMake = (currentValue) => {
    // console.log(30000, currentValue);
    this.setState({selectedMake:currentValue});
  }

  fyear = (f, data) => {
    this.setState({
      years: data.data.map( (s,i)=>{
        return <Picker.Item key={i} value={s.year} label={s.year} />
      })
    });
  }

  capitalize = (s) => {
    s = s.toLowerCase();
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  fmake = (f, data) => {
    this.setState({
      makes: data.data.map( (s,i)=>{
        return <Picker.Item key={i} value={s.MAKE_NAME_NM} label={this.capitalize(s.MAKE_NAME_NM)} />
      })
    });
  }

  render() {
    const {years, makes, selectedIndex, selectedYear, selectedMake} = this.state;
    const DeviceWidth = Dimensions.get('window').width;

    var navigation = this.props.navigation;
    // var route = this.props.route;
    var genelet = new Genelet({handler:"https://www.tabilet.com/jenny/app.php"});
//console.log("00000");
    if (years.length === 0) {
//console.log("aaaaa");
      genelet.go(navigation, "p", "car", "years", {}, this.fyear);
    }
    if (makes.length === 0) {
//console.log("bbbbb");
      genelet.go(navigation, "p", "car", "makes", {}, this.fmake);
    }

	var q = {sortreverse:1, rowcount:10, pageno:1};
    q.CATEGORY_ETXT = (selectedIndex==0) ? "Car" : "SUV";
	if (selectedYear != "") q.YEAR = selectedYear;
	if (selectedMake != "") q.MAKE_NAME_NM = selectedMake;

    return (
    <ImageBackground source={require('./assets/South-Tyrol.jpg')} style={styles.image}>

      <View style={styles.oneHeight}>
        <View style={{width: DeviceWidth*0.2, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><Text>  </Text></View>
        <Image source={require('./assets/transport_canada.jpg')} style={{ width: 217, height: 61, justifyContent: 'center'}} />
	  </View>

      <View style={styles.twoHeight}>


      <View style={{flexDirection: 'row'}}>
        <Text style={{textAlign: 'center', fontWeight:'bold', color: 'maroon'}}> Vehicle Specs:</Text>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <View style={{width: DeviceWidth*0.2, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><Text style={{textAlign: 'right', textShadowRadius: 5, textShadowColor: '#fff', color: 'maroon', fontWeight:'bold'}}>Type:</Text></View>
        <View style={{width: DeviceWidth*0.4, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><ButtonGroup buttons={['Car', 'SUV']} onPress={this.updateIndex} selectedIndex={selectedIndex} /></View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{width: DeviceWidth*0.2, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><Text style={{textAlign: 'right', textShadowRadius: 5, textShadowColor: '#fff', color: 'maroon', fontWeight:'bold'}}>Make:</Text></View>
        <View style={{width: DeviceWidth*0.4, marginBottom:1, marginLeft:1, justifyContent: 'center'}}>
          <Picker style={{height: 50, color: 'maroon'}} itemStyle={{height: 50}}
            selectedValue={selectedMake}
            onValueChange={(itemValue, itemIndex) => this.setSelectedMake(itemValue)}
          >
            <Picker.Item label="ALL" value="" />
            {makes}
          </Picker>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{width: DeviceWidth*0.2, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><Text style={{textAlign: 'right', textShadowRadius: 9, textShadowColor: '#fff', color: 'maroon', fontWeight:'bold'}}>Year:</Text></View>
        <View style={{width: DeviceWidth*0.4, marginBottom:1, marginLeft:1, justifyContent: 'center'}}>
          <Picker style={{height: 50, color:"maroon"}} itemStyle={{height: 50}}
            selectedValue={selectedYear}
            onValueChange={(itemValue, itemIndex) => this.setSelectedYear(itemValue)}
          >
            <Picker.Item label="ALL" value="" />
            {years}
          </Picker>
        </View>
      </View>
      <View style={{alignItems: 'center'}}><View style={{width: DeviceWidth*0.2, marginBottom:1, marginLeft:1, justifyContent: 'center'}}><Text>  </Text></View>
      </View>
      <View style={{alignItems: 'center'}}>
          <Button title="Search Recalls" style={{width: DeviceWidth*0.6+2, borderColor: "red", borderWidth: 1, borderRadius: 2, backgroundColor: "#ccc"}} type="solid"
		    onPress={()=>genelet.go(navigation, "p", "car", "topics", q)} />
      </View>



      </View>
 
      <View style={styles.threeHeight} />

    </ImageBackground>
    );
  }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Vehicle Recalls' }} />
        <Stack.Screen name="p-car-topics" component={p_car_topics} />
        <Stack.Screen name="p-car-history" component={p_car_history} />
        <Stack.Screen name="p-car-edit" component={p_car_edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: "cover",
    justifyContent: "center"
  },
  twoHeight: {
    flex: .50,
    width: '70%',
    backgroundColor: 'transparent'
  },
  oneHeight: {
    flex: .20,
    backgroundColor: 'transparent'
  },
  threeHeight: {
    flex: .30,
    backgroundColor: 'transparent'
  }
});

export default App;
