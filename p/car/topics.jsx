import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ListItem, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

class History extends React.Component {
  render() {
    var navigation = this.props.navigation;
    var genelet = this.props.genelet;
    return (
      <Icon
        name='menu'
        color='#fff'
        onPress={() => genelet.go(navigation, "p", "car", "history")}
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

class p_car_topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      error: null
    };
  }

  keyExtractor = (item, index) => index.toString()

/*
  handleRefresh = () => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
	this.setState(
      { refreshing: true },
      () => {genelet.send(navigation, "p", "car", "topics", {rowcount:20, sortreverse:1, pageno:1}, true);}
    );
  };
*/

  handleLoadMore = () => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
	var names = genelet.names;

    var incoming = names.incoming;
    var totalno = incoming.totalno;
    var maxpageno = names.incoming.maxpageno;

    if (totalno===undefined && names.included!==undefined && names.included.totalno!==undefined) {
      totalno = names.included.totalno;
      maxpageno = names.included.maxpageno;
      names.incoming.totalno = totalno;
      names.incoming.maxpageno = maxpageno;
    }

	if (incoming.pageno < maxpageno) {
//console.log(33333, "loading more...");
		var into = incoming.pageno;
		var pageno = (typeof(into) == "string") ? parseInt(into) : into;
		pageno += 1;
		names.incoming.pageno = pageno;

        var q = {sortreverse:1, rowcount:20, pageno:pageno, totalno:totalno};
		if (incoming.CATEGORY_ETXT) q.CATEGORY_ETXT = incoming.CATEGORY_ETXT;
		if (incoming.MAKE_NAME_NM) q.MAKE_NAME_NM = incoming.MAKE_NAME_NM;
		if (incoming.YEAR>0) q.YEAR = incoming.YEAR;

		this.setState(
			{ loading : true },
			() => {genelet.go(navigation, "p", "car", "topics", q, {operator:"append"});}
      );
    } else {
//console.log("quitttttt");
    }
  };

  // this function is called looply on genelet.lists
  // original: renderItem = ({ item }) => (<ListItem ... />)
  renderItem = ({ item }) => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;

    return (
      <ListItem
        title={item.MAKE_NAME_NM + " " + item.YEAR}
        subtitle={item.MODEL_NAME_NM + (item.updated ? ", on " + item.updated : "")}
        subtitleProps={{ style: {fontStyle: "italic", fontSize: 12, fontWeight: "bold", textTransform: "capitalize"} }}
        leftAvatar={{ source: { uri: item.src } }}
        topDivider
        bottomDivider
        chevron
        onPress={() => genelet.go(navigation, "p", "car", "edit", {tabilet_id:item.tabilet_id})}
      />
    )
  };

  // Render Footer
  renderFooter = () => {
    try {
      if (this.state.loading) {
        return (<ActivityIndicator />)
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params;
	var lists = genelet.lists;
// console.log(1111111);
// console.log(lists);

    if (lists===undefined || lists.length<1) {
      return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent=<History navigation={navigation} genelet={genelet} />
        centerComponent={{ text: 'CAR RECALLS', style: { color: '#fff' } }}
        rightComponent=<Search navigation={navigation} />
      />
      <Text></Text>
      <Text></Text>
      <Text>        No Record.</Text>
      </>);
    } else {
    return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent=<History navigation={navigation} genelet={genelet} />
        centerComponent={{ text: 'CAR RECALLS', style: { color: '#fff' } }}
        rightComponent=<Search navigation={navigation} />
      />
      <FlatList
        keyExtractor={this.keyExtractor}
        data={lists}
        renderItem={this.renderItem}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.05}
		ListFooterComponent={this.renderFooter}
      />
    </>);
    }
  };
}

export default p_car_topics;
