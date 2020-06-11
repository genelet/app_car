import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ListItem, Text, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

class p_car_history extends React.Component {
  keyExtractor = (item, index) => index.toString();

  historyItem = ({ item }) => {
    return (
      <ListItem
        title={item.theday + " " + item.status}
        subtitle={item.num + " records updated."}
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
        rightComponent={<Icon name='home' color='#fff' onPress={() => navigation.navigate('Home')} />}
      />
      <Text h2>Updating History</Text>
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
