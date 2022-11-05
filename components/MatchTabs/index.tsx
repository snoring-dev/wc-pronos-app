import React from "react";
import { Tab, TabContainer } from "./styles";
import { Pressable, Text } from "native-base";

interface Props {
  activeTab: number;
  onTabChanged: (tab: number) => void;
}

const MatchTabs = ({ activeTab, onTabChanged }: Props) => {
  return (
    <TabContainer>
      <Pressable onPress={() => onTabChanged(1)}>
        <Tab active={activeTab === 1}>
          <Text color={activeTab === 1 ? "white" : "black"}>Today's Match</Text>
        </Tab>
      </Pressable>
      <Pressable onPress={() => onTabChanged(2)}>
        <Tab active={activeTab === 2}>
          <Text color={activeTab === 2 ? "white" : "black"}>
            Yesterday's Match
          </Text>
        </Tab>
      </Pressable>
    </TabContainer>
  );
};

export default MatchTabs;
