import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker ,
  BackHandler,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input,Select } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");
async function RegisterAction(email,password,role) {
        
  await fetch('http://'+global.ipAddress+':5000/api/v1/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
          password: password,
          email: email,
          role:role,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
 
      global.resultat=responseJson.status
     
      return responseJson.status;
    })
    .catch((error) => {
      console.error(error);
    });
    
 
    return global.resultat
}

class Register extends React.Component {
  constructor(props)
  {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state={
       Username : '',
       Password : '',
       Etat:'',
       role:'responsable'
   }}

   ButtonClickListener=async()=>
   {
       
       const {Username} =this.state;

       const {Password} =this.state;
      const{role}=this.state;
    
      
       etat=await RegisterAction(Username,Password,role);
        //alert(etat)
            if(etat=="success")
            {
     
        this.props.navigation.navigate('Home')
     
      
            }
            else {

                showMessage({
                    message: "Error",
                    type: "danger",
                  });
            }
        
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
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    sign up 
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
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>

                    <Block middle>

                    <Picker
  selectedValue={this.state.role}
  style={{height: 50, width: 250}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({role: itemValue})
  }>
  <Picker.Item label="responsable" value="responsable" />
  <Picker.Item label="client" value="client" />
</Picker>

                      <Button onPress={this.ButtonClickListener  } color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.props.navigation.navigate('Login');
  return true;
}
}

const styles = StyleSheet.create({
  registerContainer: {
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

export default Register;
