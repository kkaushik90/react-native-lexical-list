import React from "react";
import { SectionListProps, SectionList } from "react-native";

interface LexicalSectionListProps extends SectionListProps<any> {}

const LexicalSectionList = (props: LexicalSectionListProps) => {
  return <SectionList {...props} />;
};

export default LexicalSectionList;
