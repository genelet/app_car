import React from 'react';
import { Dimensions, ScrollView, View, FlatList, ListItem } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Button, Image, Header, Icon, Text } from 'react-native-elements';

class p_car_edit extends React.Component {
  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
	var item = genelet.single;
//console.log(22222, item);

    const DeviceWidth = Dimensions.get('window').width
    return (
<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent={<Icon name='chevron-left' size={30} color='#fff' onPress={() => navigation.goBack()} />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
        rightComponent={<Icon name='home' color='#fff' onPress={() => navigation.navigate('Home')} />}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

<View style={{ marginTop: 10, flex:1, alignItems: 'center', flexDirection: 'row'}}>
<Text style={{ flex:0.5, textAlign: 'right' }}>Recall Number:</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}> {item.RECALL_NUMBER_NUM}</Text>
</View>

<View style={{ flex:1, alignItems: 'center', flexDirection: 'row'}}>
<Text style={{ flex:0.5, textAlign: 'right' }}>Manufacture Recall:</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}> {item.MANUFACTURER_RECALL_NO_TXT}</Text>
</View>

<View style={{ flex:1, alignItems: 'center', flexDirection: 'row'}}>
<Text style={{ flex:0.5, textAlign: 'right' }}>Date Announced:</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}> {item.ON}</Text>
</View>

<View style={{ flex:1, alignItems: 'center', flexDirection: 'row'}}>
<Text style={{ flex:0.5, textAlign: 'right' }}>Units Affected:</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}> {item.UNIT_AFFECTED_NBR}</Text>
</View>

<View style={{ flex:1, alignItems: 'center'}}>
<Image source={{ uri: item.photo }} resizeMode="contain" loadingIndicatorSource={{ uri: item.src }} style={{width:150, height:150, justifyContent: 'center'}} />
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}> {item.MAKE_NAME_NM}</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold', textTransform: "capitalize"}}>{item.MODEL_NAME_NM}</Text>
<Text style={{ flex:0.5, color: 'maroon', fontWeight:'bold'}}>{item.YEAR}</Text>
        <Text></Text>
</View>

<View style={{ width: 0.9*DeviceWidth, alignItems: 'center'}}>
        <Text style={{ width: 0.9*DeviceWidth}}>Vehicle Type: {item.CATEGORY_ETXT}</Text>
        <Text style={{ width: 0.9*DeviceWidth}}>Notification Type: {item.NOTIFICATION_TYPE_ETXT}</Text>
        <Text style={{ width: 0.9*DeviceWidth}}>Item Affected: {item.SYSTEM_TYPE_ETXT}</Text>
        <Text></Text>
        <Text style={{ width: 0.9*DeviceWidth}}>{item.COMMENT_ETXT}</Text>
        <Text></Text>
        <Text></Text>
</View>

<View>
        <Text style={{ width: 0.9*DeviceWidth}}>Vehicle Type: {item.CATEGORY_FTXT}</Text>
        <Text style={{ width: 0.9*DeviceWidth}}>Notification Type: {item.NOTIFICATION_TYPE_FTXT}</Text>
        <Text style={{ width: 0.9*DeviceWidth}}>Item Affected: {item.SYSTEM_TYPE_FTXT}</Text>
        <Text></Text>
        <Text style={{ width: 0.9*DeviceWidth, marginBottom: 10}}>{item.COMMENT_FTXT}</Text>
</View>

        <Button icon={{name: 'done', color: 'white'}} title="Close " onPress={() => navigation.goBack()} />
      </ScrollView>
</>
    );
  }
}

export default p_car_edit;
