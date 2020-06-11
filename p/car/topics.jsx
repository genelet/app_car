import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { ListItem, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

import Genelet from '../../genelet.jsx';

class pcartopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading:false, refreshing:false, error:null };
  }
  keyExtractor = (item, index) => index.toString();

  handleLoadMore = () => {
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
  };

  // this function is looped on genelet.lists
  // original: renderItem = ({ item }) => (<ListItem ... />)
  renderItem = ({ item }) => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var obj = route.params; // because it comes from initialParams
    var genelet = (obj.constructor.name==='Genelet') ? obj : new Genelet(obj);

    return (
      <ListItem
        title={item.MAKE_NAME_NM + " " + item.YEAR}
        rightTitle={item.RECALL_DATE_DTE}
        rightTitleStyle={{ fontSize: 12 }}
        subtitle={item.MODEL_NAME_NM}
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
	var genelet = route.params; // use initialParams to pass params
	var lists = genelet.lists;
// console.log(444, lists);

    return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent={<Icon name='menu' color='#fff' onPress={() => navigation.dispatch(DrawerActions.openDrawer()) } />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
        rightComponent={<Icon name='home' color='#fff' onPress={() => navigation.navigate('Home')} />}
      />
	  {(lists===undefined || lists.length<1) ? <Text> No Record.</Text> :
		<FlatList
		  keyExtractor={this.keyExtractor}
		  data={lists}
		  renderItem={this.renderItem}
  //      onEndReached={this.handleLoadMore}
  //      onEndReachedThreshold={0.05}
  //		ListHeaderComponent={<Text h5>  Maximum: 100 records</Text>}
  //		ListFooterComponent={this.renderFooter}
		  ListFooterComponent={<Text h5>  Maximum: 100 records</Text>}
	    />
      }
    </>);
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
      <DrawerItem label="Update history"
        onPress={() => {navigation.dispatch(DrawerActions.closeDrawer());
          genelet.go(navigation, "p", "car", "history")}
        }
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
// console.log(111, navigation);
// console.log(222, route);
	var genelet = route.params;
    return (<>
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} genelet={genelet} />}>
      <Drawer.Screen name="Canada's Vehicle Recalls" component={pcartopics} initialParams={genelet} />
    </Drawer.Navigator>
    </>); 
  }
}

export default p_car_topics;
