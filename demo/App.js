import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LexicalSectionList from "react-native-lexical-list";
import { getMockSectionsForList } from "./helper";
import { Icon } from "react-native-elements";

const sections = getMockSectionsForList();

// fixed item and header/footer/separator heights are required
// to accurately scrollToLocation SectionList using its getItemLayout prop
const SECTION_HEADER_HEIGHT = 48;
const ITEM_HEIGHT = 64;
const SEPARATOR_HEIGHT = 1;

export default function App() {
  return (
    <SafeAreaView>
      <LexicalSectionList
        sections={sections}
        itemHeight={ITEM_HEIGHT}
        alphabetListOptions={{ itemHeight: 18 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Icon
              reverse
              name={item.icon.name}
              color={item.icon.color}
              size={18}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        separatorHeight={SEPARATOR_HEIGHT}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: ITEM_HEIGHT,
  },
  itemSeparator: { height: 1, backgroundColor: "#e2e2e2" },
  itemText: { fontSize: 18, marginLeft: 8 },
  sectionHeader: {
    height: SECTION_HEADER_HEIGHT,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#e8e8e8",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    color: "#848484",
  },
});
