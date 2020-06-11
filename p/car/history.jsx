import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ListItem, Text, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

class Goback extends React.Component {
  render() {
    var navigation = this.props.navigation;
    return (
      <Icon 
        name='done'
        color='#fff'
        onPress={() => navigation.goBack()}
      />
    )
  }
}

class Search extends React.Component {
  render() {
    var navigation = this.props.navigation;
    return (
      <Icon
        name='home'
        color='#fff'
        onPress={() => navigation.navigate('Home')}
      />
    )
  }
}

class p_car_history extends React.Component {
  historyItem = ({ item }) => {
    return (
      <ListItem
        title={item.theday + " " + item.status}
        subtitle={item.num + " records updated."}
        subtitleProps={{ style: {fontStyle: "italic", fontSize: 12, fontWeight: "bold", textTransform: "capitalize"} }}
        topDivider
        bottomDivider
        chevron
      />
    )
  };

  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
    var lists = genelet.lists;

    if (lists===undefined || lists.length<1) {
      return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent=<Goback navigation={navigation} />
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
        rightComponent=<Search navigation={navigation} />
      />
      <Text></Text>
      <Text h4>Updating History</Text>
      <Text>        No Record.</Text>
      <Text h5>Made by Greetingland LLC</Text>
      </>);
    } else {
      return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent=<Goback navigation={navigation} />
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
        rightComponent=<Search navigation={navigation} />
      />
      <Text h2>Updating History</Text>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={genelet.lists}
        renderItem={this.historyItem}
      />
      <Text h5>Made by Greetingland LLC</Text>
      </>);
	}
  }
}

export default p_car_history;
