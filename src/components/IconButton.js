import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimatedModal from "./AnimatedModal";

const icon_color = "#586069";
const icon_size = 15;

type Props = {};
export default class IconButton extends Component<Props> {
  constructor(props) {
    super(props);
    //declare animated value
    this.rotateValue = new Animated.Value(0);
  }
  render() {
    const { icon, onPress, data } = this.props;
    
    //specifiy how the animated value will change over time
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"] //degree of rotation
    });

    //declare animated style
    let transformStyle = { transform: [{ rotate: rotation }] };

    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          //start animation
          Animated.timing(this.rotateValue, {
            toValue: 1, 
            duration: 700,
            easing: Easing.linear      
          }).start();
          onPress(data);
        }}

        onPressOut={()=>{
          //start animation
          Animated.timing(this.rotateValue, {
            toValue: 0, 
            duration: 350, 
            easing: Easing.linear
          }).start();
        }}
      >
        <Animated.View style={transformStyle}>
          <Icon
            name={icon}
            style={styles.icon}
            size={icon_size}
            color={icon_color}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5
  }
};
