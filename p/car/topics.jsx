import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { ListItem, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

import Genelet from '../../genelet.jsx';

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

class pcartopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading:false, refreshing:false, error:null };
  }
  keyExtractor = (item, index) => index.toString()

  handleLoadMore = () => {
/*
    var navigation = this.props.navigation;
    var route = this.props.route;
	var obj = route.params; // because it comes from initialParams
    var genelet = (obj.constructor.name==='Genelet') ? obj : new Genelet(obj);
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
		var into = incoming.pageno;
		var pageno = (typeof(into) == "string") ? parseInt(into) : into;
		pageno += 1;
		names.incoming.pageno = pageno;

        var q = {sortreverse:1, rowcount:40, pageno:pageno, totalno:totalno};
		if (incoming.CATEGORY_ETXT) q.CATEGORY_ETXT = incoming.CATEGORY_ETXT;
		if (incoming.MAKE_NAME_NM) q.MAKE_NAME_NM = incoming.MAKE_NAME_NM;
		if (incoming.YEAR>0) q.YEAR = incoming.YEAR;

		this.setState(
			{ loading : true },
			() => {genelet.go(navigation, "p", "car", "topics", q, {operator:"append"});}
		);
	}
*/
  };

  // this function is looped on genelet.lists
  // original: renderItem = ({ item }) => (<ListItem ... />)
  renderItem = ({ item }) => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var obj = route.params; // because it comes from initialParams
    var genelet = (obj.constructor.name==='Genelet') ? obj : new Genelet(obj);
// console.log(555,genelet.constructor.name);

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
    if (this.state.loading) return (<ActivityIndicator />)
    return null;
  };

  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var obj = route.params; // use initialParams to pass params
	var lists = obj.lists;
// console.log(444, lists);

    if (lists===undefined || lists.length<1) {
      return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
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
        leftComponent={<Icon name='menu' color='#fff' onPress={() => navigation.dispatch(DrawerActions.openDrawer()) } />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
        rightComponent=<Search navigation={navigation} />
      />
      <FlatList
        keyExtractor={this.keyExtractor}
        data={lists}
        renderItem={this.renderItem}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.05}
		ListHeaderComponent={<Text h5>  Maximum: 40 records</Text>}
		ListFooterComponent={this.renderFooter}
      />
    </>);
    }
  };
}

class CustomDrawerContent extends React.Component {
  render() {
    var props = this.props;
    var navigation = props.navigation;
    var genelet = props.genelet; // use arguments to pass parameters
//console.log(666,navigation);
//console.log(777,genelet);
    return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="History of Data Updates"
        onPress={() => genelet.go(navigation, "p", "car", "history")}
      />
      <DrawerItem
        label="Close"
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
      />
    </DrawerContentScrollView>
    );
  };
}

const Drawer = createDrawerNavigator();

class p_car_topics extends React.Component {
  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
// console.log(1111111, navigation);
// console.log(2222222, route);
	var genelet = route.params;
    return (<>
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} genelet={genelet} />}>
      <Drawer.Screen name="Vehicle" component={pcartopics} initialParams={genelet} />
    </Drawer.Navigator>
    </>); 
  }
}

export default p_car_topics;
