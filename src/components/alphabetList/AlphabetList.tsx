import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

interface AlphabetListProps {
  data: string[];
  itemHeight: number;
  onItemSelect: (item: string, index?: number) => void;
}

export const AlphabetList = ({
  data,
  itemHeight,
  onItemSelect,
}: AlphabetListProps) => {
  const setSelectedItem = useState(data[0])[1];

  const onPanGestureEvent = (e) => {
    calculateAndUpdateSelectedItem(e.nativeEvent.y);
  };

  const calculateAndUpdateSelectedItem = (positionY: number) => {
    const itemIndex = Math.floor(positionY / itemHeight);
    if (itemIndex >= 0 && itemIndex < data.length) {
      onItemSelected(data[itemIndex], itemIndex);
    }
  };

  const onItemSelected = (newItem: string, index: number) => {
    setSelectedItem((prevState) => {
      if (prevState !== newItem) {
        onItemSelect(newItem, index);
        return newItem;
      }
      return prevState;
    });
  };

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <View style={{ alignItems: "center" }}>
        {data.map((item, index) => (
          <TouchableOpacity
            style={{ height: itemHeight }}
            key={item}
            onPress={() => onItemSelected(item, index)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </PanGestureHandler>
  );
};
