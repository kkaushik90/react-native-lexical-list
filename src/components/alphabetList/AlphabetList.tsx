import React, { useState } from "react";
import {
  Animated,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export interface AlphabetListProps {
  data: (string | number)[];
  itemHeight: number;
  itemStyle?: StyleProp<TextStyle>;
  onItemSelect: (item: string | number, index: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorTextStyle?: StyleProp<TextStyle>;
}

const INDICATOR_RADIUS = 24; // TODO support shapes other than a circle

export const AlphabetList = ({
  data,
  itemHeight,
  itemStyle,
  onItemSelect,
  containerStyle,
  indicatorStyle,
  indicatorTextStyle,
}: AlphabetListProps) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const [indicatorActive, setIndicatorActive] = useState(true);
  const dragY = new Animated.Value(0);

  const onPanGestureEvent = (e) => {
    const positionY = e.nativeEvent.y;
    calculateAndUpdateSelectedItem(positionY);
    dragY.setValue(positionY - INDICATOR_RADIUS);
  };

  const calculateAndUpdateSelectedItem = (positionY: number) => {
    const itemIndex = Math.floor(positionY / itemHeight);
    if (itemIndex >= 0 && itemIndex < data.length) {
      onItemSelected(data[itemIndex], itemIndex);
    }
  };

  const onItemSelected = (newItem: string | number, index: number) => {
    setSelectedItem((prevState) => {
      if (prevState !== newItem) {
        onItemSelect(newItem, index);
        return newItem;
      }
      return prevState;
    });
  };

  const onPanGestureStateChange = (e) => {
    const nativeEvent = e.nativeEvent;
    setTimeout(
      () => setIndicatorActive(nativeEvent.state === State.ACTIVE),
      50
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      {indicatorActive && (
        <Animated.View
          style={[
            {
              width: INDICATOR_RADIUS * 2,
              height: INDICATOR_RADIUS * 2,
              marginRight: 24,
              alignItems: "center",
              justifyContent: "center",
            },
            { transform: [{ translateY: dragY }] },
          ]}
        >
          <View
            style={[
              {
                position: "absolute",
                width: INDICATOR_RADIUS * 2,
                height: INDICATOR_RADIUS * 2,
                borderRadius: INDICATOR_RADIUS,
                alignSelf: "stretch",
                flex: 1,
                opacity: 0.5,
                backgroundColor: "#FE4042",
              },
              indicatorStyle,
            ]}
          />
          <Text
            style={[
              { color: "white", fontWeight: "bold", fontSize: 24 },
              indicatorTextStyle,
            ]}
          >
            {selectedItem}
          </Text>
        </Animated.View>
      )}
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanGestureStateChange}
      >
        <View style={[{ alignItems: "center" }, containerStyle]}>
          {data.map((item, index) => (
            <TouchableOpacity
              style={{ height: itemHeight }}
              key={item}
              onPress={() => onItemSelected(item, index)}
            >
              <Text style={[itemStyle, { maxHeight: itemHeight }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </PanGestureHandler>
    </View>
  );
};
