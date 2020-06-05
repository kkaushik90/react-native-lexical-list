# react-native-lexical-list

This is a wrapper to the [SectionList](https://reactnative.dev/docs/sectionlist), adding support for alphabets on the
side, which can be dragged or clicked, to scroll the list to the corresponding section.

## Table of contents

- [Demo](#demo)
- [Getting started](#getting-started)
- [Usage](#usage)
  - [LexicalSectionList component](#lexicalsectionlist-component)
    - [Props](#props)
    - [Use of getItemLayout](#use-of-getitemlayout)
    - [Optimization](#optimization)
  - [AlphabetList component](#alphabetlist-component)
    - [Props](#props-1)

## Demo

[Source code](./demo)

![demo gif](https://github.com/kkaushik90/react-native-lexical-list/blob/master/demo/lexical_list_demo_1.gif?raw=true)

## Getting started

`yarn add react-native-lexical-list`

or

`npm install react-native-lexical-list`

## Usage

### LexicalSectionList component

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

#### Props

All of the [SectionList props](https://reactnative.dev/docs/sectionlist#props) can be passed to `LexicalSectionList`.

The `sections` must have a `title` field as shown above. This is used to display items in the AlphabetList on the side
and also in the section headers. The `data` field can be an array of any type.

Following are the additional props added to `LexicalSectionList`:

|              Prop              |          Type          | Required | Desc                                                                                                                                                                                                            |
| :----------------------------: | :--------------------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      alphabetListOptions       |         object         |   Yes    | Props to be passed on to the `AlphabetList` component. See AlphabetList Props [below](#props-1).                                                                                                                |
|           itemHeight           |         number         |   Yes    | Height of rows of the SectionList. See [getItemLayout below](#use-of-getItemLayout).                                                                                                                            |
|      sectionHeaderHeight       |         number         |    No    | See [getItemLayout below](#use-of-getItemLayout)                                                                                                                                                                |
|      sectionFooterHeight       |         number         |    No    | See [getItemLayout below](#use-of-getItemLayout)                                                                                                                                                                |
|        separatorHeight         |         number         |    No    | See [getItemLayout below](#use-of-getItemLayout)                                                                                                                                                                |
|        listHeaderHeight        |         number         |    No    | See [getItemLayout below](#use-of-getItemLayout)                                                                                                                                                                |
| disableScrollToTopOnDataUpdate |        boolean         |    No    | When the value of the [`sections` prop](https://reactnative.dev/docs/sectionlist#sections) changes, the list scrolls to the top by default. This is useful for when the list is updated using search filtering. |
|             style              | StyleProp\<ViewStyle\> |    No    | Container style                                                                                                                                                                                                 |
|           listStyle            | StyleProp\<ViewStyle\> |    No    | This is passed on to the underlying SectionList as `style` prop                                                                                                                                                 |

#### Use of getItemLayout

When the user chooses an alphabet, to be able to scroll list to the correct position, `SectionList`
[requires](https://reactnative.dev/docs/sectionlist#scrolltolocation) us to supply a `getItemLayout` method. As
explained in [this post](https://medium.com/@jsoendermann/sectionlist-and-getitemlayout-2293b0b916fb), it is tricky to
implement it for `SectionList` (as opposed to `FlatList`). An open source
[function](https://www.npmjs.com/package/react-native-section-list-get-item-layout) (from the writer of that post) has
been used, which requires item height, and optionally four other parameters. Visit the
[npm page](https://www.npmjs.com/package/react-native-section-list-get-item-layout) for full documentation.

#### Optimization

`initialNumToRender` and `maxToRenderPerBatch` are
[SectionList props](https://reactnative.dev/docs/sectionlist#initialnumtorender) (which means they can be passed to
`LexicalSectionList` as well), whose default values in react-native are `10` each. But because this kind of a lexical list is
generally used with small amount of data to be rendered within each row, for a lot of rows, these values have been
set to `100`. This results in fast scrolling with much less blank spots, at the cost of a little higher memory usage.
If you are rendering a lot of stuff within each item of the list, or are doing lengthy computations for each item, you
might want to lower this number.

### AlphabetList component

`LexicalSectionList` contains a `SectionList` and an `AlphabetList`. If you don't want the full thing, you can use the
`AlphabetList` component by itself. It can be seen as a draggable list of strings or numbers, which returns the
currently selected item and its index in a callback function.

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

#### Props

|        Prop        |                                             Type                                             | Required | Desc                                                                                                                                                                                                       |
| :----------------: | :------------------------------------------------------------------------------------------: | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        data        |                                     (string or number)[]                                     |   Yes    | Items to display in the AlphabetList. Generally these would be alphabets, but doesn't have to be.                                                                                                          |
|     itemHeight     |                                            number                                            |   Yes    | Height of each item in the AlphabetList, for accurate touch detection. It is recommended to use `alignItems/justifyContent: 'center'` with fixed height instead of using margins (padding should be fine). |
|     itemStyle      |                                    StyleProp\<TextStyle\>                                    |    No    | Styles for the list item text                                                                                                                                                                              |
|   containerStyle   |                                    StyleProp\<ViewStyle\>                                    |    No    | Styles for the AlphabetList container                                                                                                                                                                      |
|   indicatorStyle   |                                    StyleProp\<ViewStyle\>                                    |    No    | Styles for the currently selected item indicator that pops up on the side while scrolling                                                                                                                  |
| indicatorTextStyle |                                    StyleProp\<TextStyle\>                                    |    No    | Styles for the indicator text                                                                                                                                                                              |
|    onItemSelect    | function that takes parameters `(item: string or number, index: number)` and returns nothing |    No    | A callback function that is called each time the item selection changes                                                                                                                                    |
