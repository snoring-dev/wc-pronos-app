import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, Container, ScrollView, View } from "native-base";
import React, { useEffect, useState } from "react";
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

enum TABS {
  CURRENT = 1,
  OLD = 2,
}

const Matchs = ({ navigation, data, onMatchSelected = () => {} }: Props) => {
  const [oldMatches, setOldMatches] = useState<Match[]>([]);
  const [newMatches, setNewMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState(TABS.CURRENT);

  const switchTab = (index: number) => setActiveTab(index);

  useEffect(() => {
    setOldMatches([...Object.values(data)].filter((m: Match) => m.isOld));
    setNewMatches([...Object.values(data)].filter((m: Match) => !m.isOld));
  }, [data]);

  const newMatchesList = [...newMatches].map((match: Match) => (
    <MatchEntry
      key={`mt-${match.id}`}
      data={match}
      onClick={() => {
        onMatchSelected(match);
        navigation.navigate(Pages.MatchView);
      }}
    />
  ));

  const oldMatchesList = [...oldMatches].map((match: Match) => (
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
          <MatchTabs onTabChanged={switchTab} activeTab={activeTab} />
        </Container>
      </Center>
      <ScrollView pt="5" pb={10}>
        {activeTab === TABS.CURRENT ? newMatchesList : oldMatchesList}
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
