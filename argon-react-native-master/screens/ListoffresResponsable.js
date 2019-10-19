import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView ,ActivityIndicator,BackHandler,} from 'react-native';
import { Block, theme ,Checkbox, Text,} from 'galio-framework';
import { Images, argonTheme } from "../constants";

import { Button, Icon, Input,Card_offre } from "../components";

const { width } = Dimensions.get('screen');

class ListoffreResponsable extends React.Component {
    constructor(props)
    {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state={
   
         isLoading: true,
         dataSource:[]
     }
     
 
    }
  
  
    ButtonClickListener=async()=>
    {
          this.props.navigation.navigate('Newoffre')
       }
   
      
       async getapi(currentspaceid){
        await fetch('http://'+global.ipAddress+':5000/api/v1/offer/'+currentspaceid, {
          method: 'GET',
          headers: {
            'x-access-token':global.token
          },
         
        }).then((response) => response.json())
        .then((responseJson) => {
     
          responseJson.data
          this.setState({
              isLoading: false,
              dataSource:responseJson.data
            }
              // In this block you can do something with new state.
            );  
          return responseJson.data;
        })
        .catch((error) => {
          console.error(error);
        });
      
      }  

      async componentWillReceiveProps(){
        var currentspaceid = this.props.navigation.getParam('currentspaceid','noid');
        this.setState({
        
            isLoading: true,
            dataSource:[]},async ()=>{await this.getapi(currentspaceid);}
             )}

     async componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      var currentspaceid = this.props.navigation.getParam('currentspaceid','noid');
      global.currentspaceid=currentspaceid;
      // alert(currentspaceid)
        await this.getapi(currentspaceid)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.navigate('ListspaceResponsable')
    return true;
  }




    renderoffres =  () => {

  const {dataSource}=this.state;
  var melek=[];
  for (i = 0; i <  Object.keys(dataSource).length; i=i+1) { 

 melek[i]=(   <Block flex key={i}>
    <Card_offre item={dataSource[i]} horizontal  />
  
  </Block>)

  }
  
      return (
       
        <View>
         <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.offres}>
        {melek}
          {/* <Block flex>
            <Card_offre item={dataSource[i]} horizontal  /> */}
            {/* <Block flex row>
              
              <Card_offre item={dataSource[0]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card_offre item={dataSource[1]} />
            </Block>
            <Card_offre item={dataSource[0]} horizontal />
            <Card_offre item={dataSource[0]} full /> */}
          {/* </Block> */}
          </ScrollView>
        </View>
      )
  

      
  }


  render() {
    
    if (this.state.isLoading) {
      return (
        <View style={{ paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
   
      <Block flex center style={styles.Listoffres}> 
                      
<Button onPress={this.ButtonClickListener  } color="primary" style={styles.createButton}>
  <Text bold size={14} color={argonTheme.COLORS.WHITE}>
    New offre
  </Text>
</Button>

    {this.renderoffres()}
       </Block>
    
    
    );
  }
  async componentDidUpdate(prevProps){
    var currentspaceid = this.props.navigation.getParam('currentspaceid','noid');
    global.currentspaceid=currentspaceid;
    //alert(currentspaceid)
    if(prevProps.navigation.getParam('currentspaceid','noid') !== currentspaceid) 
    {
    this.setState({
    
        isLoading: false,
        dataSource:[]},async ()=>{await this.getapi(currentspaceid);}
         )
  }
  }
  

}

const styles = StyleSheet.create({
  Listoffres: {
    width: width,    
  },
  offres: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default ListoffreResponsable;
