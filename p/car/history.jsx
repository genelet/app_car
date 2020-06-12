import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ListItem, Text, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

class p_car_history extends React.Component {
  keyExtractor = (item, index) => item.log_id;

  historyItem = ({ item }) => {
    return (
      <ListItem
        key={item.log_id}
        title={item.theday + " # of updates: " + item.num}
        subtitle={item.status}
        subtitleProps={{ style: {fontStyle: "italic", fontSize: 12, fontWeight: "bold", textTransform: "capitalize"} }}
        topDivider
        bottomDivider
      />
    )
  };

  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
    var lists = genelet.lists;
    return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent={<Icon name='chevron-left' size={30} color='#fff' onPress={() => navigation.goBack()} />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
      />
      <View style={{"marginTop":10, "marginBottom":10}}>
        <Text style={{"textAlign": "center", "fontSize":18, "fontWeight": "bold", "color":"maroon"}}>Updating History</Text>
      </View>
      {(lists===undefined || lists.length<1) ? <Text> No Record.</Text> :
		<FlatList
		  keyExtractor={this.keyExtractor}
		  data={lists}
		  renderItem={this.historyItem}
		/>}
    </>);
  }
}

export default p_car_history;
