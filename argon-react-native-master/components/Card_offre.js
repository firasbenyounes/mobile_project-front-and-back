import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card_offre extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const Card_offreContainer = [styles.Card_offre, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} Card_offre flex style={Card_offreContainer}>
         <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex style={imgContainer}>
          <Image source={{uri: 'http://'+global.ipAddress+':5000/images/'+ item.image }} style={imageStyles}  />
          {/* <Image source={{uri: `data:image/png;base64,${item.image}`}} /> */}
          </Block> 
         </TouchableWithoutFeedback> 
        
          <Block flex space="between" style={styles.Card_offreDescription}>
            <Text size={14} style={styles.Card_offreTitle}>{item.label}</Text>
            <Block middle>
            <TouchableWithoutFeedback onPress={() => alert("UPDATE")}>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.SUCCESS } bold style={styles.managebuttons}>UPDATE OFFERS</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => alert("DELETE")}>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.WARNING} bold style={styles.managebuttons}>DELETE OFFERS</Text>
            </TouchableWithoutFeedback>


            </Block>
          </Block>

      </Block>
    );
  }
}

Card_offre.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  Card_offre: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  Card_offreTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  Card_offreDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  managebuttons: {
    marginTop: 15
  },
});

export default withNavigation(Card_offre);