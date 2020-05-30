# react-native-lexical-list

This is a wrapper to the [SectionList](https://reactnative.dev/docs/sectionlist), adding support for alphabets on the
side, which can be dragged or clicked, to scroll the list to the corresponding section.

## Getting started

`$ npm install react-native-lexical-list --save`

or

`$ yarn add react-native-lexical-list`

## Usage

```javascript
import LexicalSectionList from "react-native-lexical-list";

export const TestList = () => {
  const sections = [
    {
      title: "A",
      data: ["Alison", "Arthur", "Amy"],
    },
    {
      title: "B",
      data: ["Ben", "Bob", "Barney", "Batman"],
    },
    {
      title: "C",
      data: ["Charlie", "Chaplin"],
    },
  ];

  return (
    <LexicalSectionList
      sections={sections}
      itemHeight={24}
      alphabetListOptions={{ itemHeight: 18 }}
      renderItem={({ item }) => <Text>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
    />
  );
};
```

All of the [SectionList props](https://reactnative.dev/docs/sectionlist#props) can be passed to `LexicalSectionList`.

**Or** you can use the `AlphabetList` component by itself:

```javascript
import { AlphabetList } from "react-native-lexical-list";

...

<AlphabetList
  data={["A", "G", "H"]}
  itemHeight={18}
  itemStyle={{ fontWeight: "bold", color: "blue" }}
  onItemSelect={(alphabet) => console.log(alphabet)}
  containerStyle={{
    backgroundColor: "green"
    alignSelf: "center",
  }}
/>;
```

`AlphabetList` takes an array of strings or numbers. It doesn't have to be alphabets, it can be any string of any
length.

**More documentation, demo and features coming soon!**
