import React from "react";
import { Tab, TabContainer } from "./styles";
import { Pressable, Text } from "native-base";

const MatchTabs = () => {
  return (
    <TabContainer>
      <Pressable>
        <Tab active>
          <Text color="white">Today's Match</Text>
        </Tab>
      </Pressable>
      <Pressable>
        <Tab>
          <Text>Yesterday's Match</Text>
        </Tab>
      </Pressable>
    </TabContainer>
  );
};

export default MatchTabs;
