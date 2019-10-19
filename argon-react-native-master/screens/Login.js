import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View
  
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input,Select } from "../components";
import { Images, argonTheme } from "../constants";
import { showMessage, hideMessage } from "react-native-flash-message";

const { width, height } = Dimensions.get("screen");


async function LoginAction(email,password) {
        
  responseJson=await fetch('http://'+global.ipAddress+':5000/api/v1/user/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
          password: password,
          email: email,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
 
      global.resultat=responseJson.status
      
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    
 
    return responseJson
}


class Login extends React.Component {
  constructor(props)
  {
      super(props)

      this.state={
       Username : '',
       Password : '',
       Etat:'',
 
   }}

   ButtonClickListener=async()=>
   {
       
       const {Username} =this.state;

       const {Password} =this.state;

      
       result=await LoginAction(Username,Password);
       etat=result.status
        //alert(etat)
       
            if(etat=="success")
            {         global.token=responseJson.data.token
              if(result.data.user.role=="responsable"){
                global.role=result.data.user.role
                this.props.navigation.navigate('ListspaceResponsable', { currentuser:result.data.user._id,})
      
      }
      else {
        global.role="client"
        this.props.navigation.navigate('Home')
      }
      
            }
            else {

                showMessage({
                    message: "Veuillez verifier vos coordonnées ",
                    type: "danger",
                  });
            }
        
    }
   
gotoregister=()=>{

  this.props.navigation.navigate('Register') 
}
  render() {
    return (
     
     <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.LoginContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Login 
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={Username=>this.setState({Username})} />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        
                      }
                      onChangeText={Password=>this.setState({Password})}
                      />
                    </Block>
                    
                    <Block middle>

                   
                      <Button onPress={this.ButtonClickListener  } color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Login
                        </Text>
                      </Button>
                    </Block>

                    <Block middle>
                 <Button onPress={this.gotoregister } color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Register
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      
      </Block>
    
    );
  }

  async componentDidMount(){

    global.ipAddress='192.168.1.101'
}
}

const styles = StyleSheet.create({
  LoginContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;
