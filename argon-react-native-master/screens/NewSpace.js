import * as React from 'react';

import { Image, View, KeyboardAvoidingView,   StatusBar,  StyleSheet,  ImageBackground,  Dimensions,  BackHandler, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Images, argonTheme } from "../constants";
import { Button, Icon, Input,Select } from "../components";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Block, Checkbox, Text, theme } from "galio-framework";
const { width, height } = Dimensions.get("screen");
async function AddspaceAction(label,image) {
        
  await fetch('http://'+global.ipAddress+':5000/api/v1/space', {
      method: 'POST',
      headers: {
        'x-access-token':global.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        label: label,
        image: image,
        
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
class NewSpace extends React.Component {
  constructor(props)
  {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state={
        image: null,
        Title:'',

      }}
  

      ButtonClickListener=async()=>
      {
          
          const {Title} =this.state;
   
          const {image} =this.state;
 
       
         
          etat=await AddspaceAction(Title,image);
           //alert(etat)
               if(etat=="success")
               {
        
           this.props.navigation.navigate('ListspaceResponsable', {
            Refresh:"Yes",
          })
        
               }
               else {
   
                   showMessage({
                       message: "Error",
                       type: "danger",
                     });
               }
           
       }
      

  render() {
    let { image } = this.state;

    return (
         
     <Block flex middle>
     <StatusBar hidden />
     <ImageBackground
       source={Images.RegisterBackground}
       style={{ width, height, zIndex: 1 }}  >
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
                     placeholder="Title"
                     iconContent={
                       <Icon
                         size={16}
                         color={argonTheme.COLORS.ICON}
                         name="ic_mail_24px"
                         family="ArgonExtra"
                         style={styles.inputIcons}
                       />
                     }
                     onChangeText={Title=>this.setState({Title})} />
                 </Block>
               
                 <Block middle>

                 <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage} style={styles.createButton} > 
          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
         Pick an image from camera roll
        </Text>
      </Button>
     
      {image &&
          <Image source={{ uri: image }} style={{ height: 122, width: 'auto',
          } } />
             }
                
                   <Button onPress={this.ButtonClickListener  } color="primary" style={styles.createButton}>
                     <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                       Add new space
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.getPermissionAsync();
  }
  
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  this.props.navigation.navigate('ListspaceResponsable');
  return true;
}

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    console.log(result.base64);

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
    // console.log(result);
  };

  _uploadImage = async () => {
    alert("image uploaded")
  };
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

export default NewSpace;
