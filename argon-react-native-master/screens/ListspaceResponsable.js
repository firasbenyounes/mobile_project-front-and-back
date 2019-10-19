      import React from 'react';
      import {View, StyleSheet, Dimensions, ScrollView ,ActivityIndicator,BackHandler,} from 'react-native';
      import { Block, theme ,Checkbox, Text,} from 'galio-framework';
      import { Images, argonTheme } from "../constants";
      
      import { Button, Icon, Input,Card } from "../components";
      
      const { width } = Dimensions.get('screen');
    
      class ListspaceResponsable extends React.Component {
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
          {   this.props.navigation.navigate('NewSpace')
             }

             async componentDidUpdate(prevProps){
              const currentuser = this.props.navigation.getParam('currentuser','noid');
           
              if(prevProps.navigation.getParam('currentuser','noid') !== currentuser) 
              {
              this.setState({
              
                  isLoading: false,
                  dataSource:[]},async ()=>{await this.getapi(currentuser);}
                   )
            }
            }
            
          
            
             async getapi(currentuser){
          
              await fetch('http://'+global.ipAddress+':5000/api/v1/space/'+currentuser, {
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
  
             
           async componentDidMount(){
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            var currentuser = this.props.navigation.getParam('currentuser','noid');
     
              await this.getapi(currentuser)
        }
        componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
        handleBackButtonClick() {
          this.props.navigation.navigate('Login')
          return true;
        }
      
      
      
          renderSpaces =  () => {
      
        const {dataSource}=this.state;
        var melek=[];
        for (i = 0; i <  Object.keys(dataSource).length; i=i+1) { 

       melek[i]=(   <Block flex key={i}>
          <Card item={dataSource[i]} horizontal  />
        
        </Block>)

        }
        
            return (
             
              <View>
               <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.spaces}>
              {melek}
                {/* <Block flex>
                  <Card item={dataSource[i]} horizontal  /> */}
                  {/* <Block flex row>
                    
                    <Card item={dataSource[0]} style={{ marginRight: theme.SIZES.BASE }} />
                    <Card item={dataSource[1]} />
                  </Block>
                  <Card item={dataSource[0]} horizontal />
                  <Card item={dataSource[0]} full /> */}
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
         
            <Block flex center style={styles.Listspaces}> 
                            
      <Button onPress={this.ButtonClickListener  } color="primary" style={styles.createButton}>
        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
          New Space
        </Text>
      </Button>
  
      
          {this.renderSpaces()}
              
             </Block>
          
          
          );
        }
        async componentWillReceiveProps(){
          var currentuser = this.props.navigation.getParam('currentuser','noid');
          this.setState({
          
              isLoading: true,
              dataSource:[]},async ()=>{await this.getapi(currentuser);}
               )}
        
      
      }
      
      const styles = StyleSheet.create({
        Listspaces: {
          width: width,    
        },
        spaces: {
          width: width - theme.SIZES.BASE * 2,
          paddingVertical: theme.SIZES.BASE,
        },
      });
      
      export default ListspaceResponsable;
      