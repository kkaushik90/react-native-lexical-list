import React, { useEffect, useState } from "react";
import {
  SectionList,
  SectionListProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import { AlphabetList } from "../..";

interface LexicalSectionListProps extends SectionListProps<any> {
  style?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  itemHeight: number;
  sectionHeaderHeight?: number;
  sectionFooterHeight?: number;
  separatorHeight?: number;
  listHeaderHeight?: number;
  disableScrollToTopOnDataUpdate?: boolean;
  alphabetListOptions: { itemHeight: number; [key: string]: any };
}

const LexicalSectionList = (props: LexicalSectionListProps) => {
  const [sectionListRef, setSectionListRef] = useState<SectionList | null>();

  useEffect(() => {
    if (
      !props.disableScrollToTopOnDataUpdate &&
      props.sections &&
      sectionListRef &&
      props.sections.length
    ) {
      sectionListRef.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
      });
    }
  }, [props.sections]);
  const getItemLayoutParams = { getItemHeight: () => props.itemHeight };
  Object.assign(
    getItemLayoutParams,
    props.separatorHeight !== undefined && {
      getSeparatorHeight: () => props.separatorHeight,
    },
    props.sectionHeaderHeight !== undefined && {
      getSectionHeaderHeight: () => props.sectionHeaderHeight,
    },
    props.sectionFooterHeight !== undefined && {
      getSectionFooterHeight: () => props.sectionFooterHeight,
    },
    props.listHeaderHeight && { listHeaderHeight: props.listHeaderHeight }
  );
  const getItemLayout = sectionListGetItemLayout(getItemLayoutParams);

  return (
    <View style={props.style}>
      <SectionList
        style={props.listStyle}
        ref={(ref) => {
          setSectionListRef(ref);
        }}
        getItemLayout={(data, index) =>
          getItemLayout(data as { title: string; data: any[] }[], index)
        }
        maxToRenderPerBatch={100}
        initialNumToRender={100}
        {...props}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          right: 8,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <AlphabetList
          data={props.sections.map((section) => section.title)}
          onItemSelect={(item, index) => {
            if (sectionListRef) {
              sectionListRef.scrollToLocation({
                sectionIndex: index,
                itemIndex: 0,
              });
            }
          }}
          {...props.alphabetListOptions}
        />
      </View>
    </View>
  );
};

export default LexicalSectionList;
