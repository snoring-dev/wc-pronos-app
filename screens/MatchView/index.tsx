import { View, Text } from "react-native";
import React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Match } from "../../store/Matchs/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";

interface OwnProps {
    selectedMatch?: Match;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const MatchView = ({ navigation, selectedMatch }: Props) => {
  return (
    <View>
      <Text>MatchView: {selectedMatch?.id}</Text>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
    selectedMatch: state.userSelection.match,
});

export default connect(mapStateToProps)(MatchView);
