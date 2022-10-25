import { Center, Container, ScrollView, View } from "native-base";
import React from "react";
import MatchEntry from "../../components/MatchEntry";
import MatchTabs from "../../components/MatchTabs";

const Matchs = () => {
  return (
    <View>
      <Center>
        <Container>
          <MatchTabs />
        </Container>
      </Center>
      <ScrollView pt="5">
        <MatchEntry />
        <MatchEntry />
        <MatchEntry />
      </ScrollView>
    </View>
  );
};

export default Matchs;
