import { Center, Container, ScrollView, View } from "native-base";
import React from "react";
import { connect } from "react-redux";
import MatchEntry from "../../components/MatchEntry";
import MatchTabs from "../../components/MatchTabs";
import { ApplicationState } from "../../store";
import { Match } from "../../store/Matchs/types";

interface OwnProps {
  data: Match[];
}

const Matchs = ({ data }: OwnProps) => {
  console.log('MATCH =>', Object.values(data));
  const list = [...Object.values(data)].map((match: Match) => (<MatchEntry key={`mt-${match.id}`} data={match} />));
  return (
    <View paddingBottom="75">
      <Center pb="5">
        <Container>
          <MatchTabs />
        </Container>
      </Center>
      <ScrollView pt="5" pb={10}>
        {list}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  data: state?.matches?.data ?? [],
});

export default connect(mapStateToProps)(Matchs);
