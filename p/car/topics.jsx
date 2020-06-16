import React from 'react';
import { View, Linking, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { ListItem, Text, Button, Icon, Header, colors, ThemeProvider } from 'react-native-elements';

import Genelet from '../../genelet.jsx';

class MyListItem extends React.PureComponent { // PureComponent VERY IMPORTANT!
  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
    var obj = route.params;
    var genelet = (obj.constructor.name==='Genelet') ? obj : new Genelet(obj);

    var item = this.props.item;
console.log(444, item.tabilet_id);

    return (
      <ListItem
		key={item.tabilet_id}
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
}

class pcartopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading:false, refreshing:false, error:null };
  }
  keyExtractor = (item, index) => item.tabilet_id;

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

	if (incoming.pageno < maxpageno && incoming.pageno <= 10 && genelet.lists.length < 100) {
		var into = incoming.pageno;
		var pageno = (typeof(into) == "string") ? parseInt(into) : into;
		pageno += 1;
		names.incoming.pageno = pageno;

        var q = {sortreverse:1, rowcount:10, pageno:pageno, totalno:totalno};
		if (incoming.CATEGORY_ETXT) q.CATEGORY_ETXT = incoming.CATEGORY_ETXT;
		if (incoming.MAKE_NAME_NM) q.MAKE_NAME_NM = incoming.MAKE_NAME_NM;
		if (incoming.YEAR>0) q.YEAR = incoming.YEAR;

		this.setState(
			{ loading : true },
			() => {genelet.go(navigation, "p", "car", "topics", q, {operator:"append"});}
		);
	} else {
		this.setState( { loading : false } );
    }
  };

  // this function is looped on genelet.lists
  // original: renderItem = ({ item }) => (<ListItem ... />)
  renderItem = ({ item }) => {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params; // because it comes from initialParams
console.log(333);
    return (<MyListItem {...this.props} item={item} />);
  }

  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
	var genelet = route.params; // use initialParams to pass params
	var lists = genelet.lists;
//console.log(555, lists);

    var names = genelet.names;
    var incoming = names.incoming;
    var totalno = incoming.totalno;

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
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.05}
  //		ListHeaderComponent={<Text h5>  Maximum: 100 records</Text>}
  		  ListFooterComponent={this.state.loading ? <ActivityIndicator /> : (totalno>100) ? <Text h5>{lists.length} of total {totalno}. Only 100 records are displayed.</Text> : <Text h5>{lists.length} of total {totalno}.</Text>}
	    />
      }
    </>);
  };
}

class Developer extends React.Component {
  render() {
    var props = this.props;
    var navigation = props.navigation;
//console.log(888);
    return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent={<Icon name='chevron-left' size={30} color='#fff' onPress={() => {navigation.goBack(); navigation.dispatch(DrawerActions.openDrawer());}} />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
      />
      <View style={{"marginTop":100, "marginBottom":10}}>
        <Text style={{"textAlign": "center", "fontSize":18, "fontWeight": "bold", "color":"maroon"}}>Developer</Text>
      </View>
      <View style={{"flex":0.2}} />
      <View style={{"alignItems": "center"}}>
      <Button style={{"width":'50%'}} title="Greetingland, LLC" icon={<Icon name="mail" size={20} color="white" />} onPress={() => Linking.openURL('mailto:info@tabilet.com')} />
      </View>
    </>);
  };
}

class Version extends React.Component {
  render() {
    var props = this.props;
    var navigation = props.navigation;
//console.log(999);
    return (<>
      <Header
        backgroundImage={require('../../assets/title.png')}
        leftComponent={<Icon name='chevron-left' size={30} color='#fff' onPress={() => {navigation.goBack(); navigation.dispatch(DrawerActions.openDrawer());}} />}
        centerComponent={{ text: 'VEHICLE RECALLS', style: { color: '#fff' } }}
      />
      <View style={{"marginTop":100, "marginBottom":10}}>
        <Text style={{"textAlign": "center", "fontSize":18, "fontWeight": "bold", "color":"maroon"}}>Version & License</Text>
      </View>
      <View style={{"flex":0.05}} />
      <View style={{"alignItems": "center"}}>
        <Text h5>1.0.1</Text>
      </View>
      <View style={{"marginTop":100, "marginBottom":10}}>
        <Text style={{"textAlign": "center", "fontSize":18, "fontWeight": "bold", "color":"maroon"}}>Data License</Text>
      </View>
      <View style={{"flex":0.05}} />
      <View style={{"alignItems": "center"}}>
        https://open.canada.ca/en/open-government-licence-canada
      </View>
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
    return (<>
      <Button title="MENU" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
      <DrawerContentScrollView {...props} style={{"backgroundColor":"#f0f0f0"}}>
        <DrawerItem label="Back to Results"
          icon={()=><Icon color="goldenrod" size={30} name='list' />}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
        <DrawerItem label="Search"
          icon={()=><Icon color="gray" size={30} name='search' />}
		  onPress={() => navigation.navigate("Home")}
        />
        <DrawerItem label="Update History"
          icon={()=><Icon color="deepskyblue" size={30} name='update' />}
          onPress={() => genelet.go(navigation, "p", "car", "history")}
        />
        <DrawerItem label="Contact Developer"
          icon={()=><Icon color="deepskyblue" size={30} name='business' />}
		  onPress={() => navigation.navigate("Developer")}
        />
        <DrawerItem label="App Version"
          icon={()=><Icon color="deepskyblue" size={30} name='extension' />}
		  onPress={() => navigation.navigate("Version")}
        />
        <DrawerItem label="Open Data Canada"
          icon={()=><Icon color="#FF0000" size={30} name='launch' />}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            Linking.openURL('https://open.canada.ca/en/open-data');
          }}
        />
      </DrawerContentScrollView>
    </>);
  };
}

const Drawer = createDrawerNavigator();

class p_car_topics extends React.Component {
  render() {
    var navigation = this.props.navigation;
    var route = this.props.route;
//console.log(111, navigation);
//console.log(222, route);
	var genelet = route.params;
    return (<>
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} genelet={genelet} />}>
      <Drawer.Screen name="Canada Vehicle Recalls" component={pcartopics} initialParams={genelet} />
      <Drawer.Screen name="Developer" component={Developer} />
      <Drawer.Screen name="Version" component={Version} />
    </Drawer.Navigator>
    </>); 
  }
}

export default p_car_topics;
