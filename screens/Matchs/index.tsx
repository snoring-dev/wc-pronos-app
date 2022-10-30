import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Container, ScrollView, View } from "native-base";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import MatchEntry from "../../components/MatchEntry";
import MatchTabs from "../../components/MatchTabs";
import { ApplicationState } from "../../store";
import { Match } from "../../store/Matchs/types";
import { setSelectedMatch } from "../../store/UserSelection/actions";
import { Pages, RootStackParamList } from "../../utils/Pages";

interface OwnProps {
  data: Match[];
  onMatchSelected?: any;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const Matchs = ({ navigation, data, onMatchSelected = () => {} }: Props) => {
  const list = [...Object.values(data)].map((match: Match) => (
    <MatchEntry
      key={`mt-${match.id}`}
      data={match}
      onClick={() => {
        onMatchSelected(match);
        navigation.navigate(Pages.MatchView);
      }}
    />
  ));
  return (
    <View paddingBottom="75">
      <Center pb="5">
        <Container>
          <MatchTabs />
        </Container>
      </Center>
      <ScrollView pt="5" pb={10}>
        {list}
        <View h={50} bgColor="transparent" />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  data: state?.matches?.data ?? [],
});

const mapDispatchToProps = {
  onMatchSelected: (data: Match) => (dispatch: Dispatch) => {
    dispatch(setSelectedMatch(data));
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchs);
