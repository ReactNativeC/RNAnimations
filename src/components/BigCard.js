import React, { Component } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import DataRow from "./DataRow";

type Props = {};
export default class BigCard extends Component<Props> {
  constructor(props) {
    super(props);
    
    this.imageOpacityValue = new Animated.Value(0);
    this.titleTranlateYValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
  }
  render() {
    const { image, title, data } = this.props;
    //interpolate the image opacity
    const imageOpacity = this.imageOpacityValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0.25, 0.5, 0.75, 1]
    });
    // construct the image style
    const imageOpacityStyle = { opacity: imageOpacity };
    
    //interpolate the vertical position of the title
    const titleTranslateY = this.titleTranlateYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 280]
    });
    //interpolate the scale of the title
    const titleScale = this.titleScaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.25, 0.5, 1]
    });
    //construct the styles for the title
    const titleTransformStyle = {
      transform: [{ translateY : titleTranslateY }, { scale: titleScale }]
    }

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Animated.Image source={image} style={[styles.image, imageOpacityStyle]} resizeMode={"contain"} />
          <Animated.View style={[styles.titleContainer, titleTransformStyle]}>
            <Text style={styles.title}>{title}</Text>
          </Animated.View>
        </View>
        {data && (
          <View style={styles.dataContainer}>{this.renderDataRows(data)}</View>
        )}
      </View>
    );
  }

  componentDidUpdate() {
    //reset the animated values
    this.imageOpacityValue.setValue(0);
    this.titleTranlateYValue.setValue(0);
    this.titleScaleValue.setValue(0);

    //start the sequence 
    Animated.sequence([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1, 
        duration: 600, 
        easing: Easing.linear
      }),  
      Animated.timing(this.titleTranlateYValue, {
        toValue: 1, 
        duration: 200, 
        Easing: Easing.linear
      }),
      Animated.timing(this.titleScaleValue, {
        toValue: 1, 
        duration: 300, 
        easing: Easing.linear
      })
    ]).start();
  }

  renderDataRows = data => {
    return data.map((item, index) => {
      return (
        <DataRow
          label={item.label}
          value={item.value}
          index={index}
          key={item.label}
        />
      );
    });
  };
}

const styles = {
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  titleContainer: {
    position: "absolute",
    top: -100
  },
  mainContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 150
  },
  dataContainer: {
    flex: 2,
    flexDirection: "column",
    padding: 20
  }
};
