import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import MatchEntry from "../../components/MatchEntry";
import SlidingTabs from "../../components/SlidingTabs";
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
  const [oldMatches, setOldMatches] = useState<Match[]>([]);
  const [newMatches, setNewMatches] = useState<Match[]>([]);

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
    <SlidingTabs
      firstTabTitle="Upcoming matches"
      secondTabTitle="Old Matches"
      firstTabContent={newMatchesList}
      secondTabContent={oldMatchesList}
    />
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
