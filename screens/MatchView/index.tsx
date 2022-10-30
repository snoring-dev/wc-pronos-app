import React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Match, Player } from "../../store/Matchs/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import {
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native";
import { nanoid } from "nanoid";
import PlayerEntry from "../../components/PlayerEntry";
import { filter, isEmpty } from "ramda";

type SPlayer = Player & {
  teamName: string;
  teamImg: string;
};

interface OwnProps {
  selectedMatch?: Match;
  allPlayers: SPlayer[];
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const MatchView = ({ navigation, selectedMatch, allPlayers }: Props) => {
  const [players, setPlayers] = React.useState<SPlayer[]>(allPlayers ?? []);
  const [selectedPlayerId, setSelectedPlayerId] = React.useState(0);

  const filterPlayers = (token: string) => {
    let filtered = [];
    if (isEmpty(token)) {
      filtered = allPlayers;
    } else {
      filtered = filter((p: SPlayer) => {
        const name = `${p.fullname.split(" ")[0]} ${
          p.fullname.split(" ")[1]
        }`.toLowerCase();
        return name.includes(token.toLowerCase());
      })(allPlayers);
    }

    setPlayers(filtered);
  };

  const onPlayerPressed = (id: number) => setSelectedPlayerId(id);

  return (
    <SafeAreaView>
      <Center w="100%" pt="10" pl="12px" pr="12px">
        <Input
          type="text"
          placeholder="filter..."
          onChangeText={(value: string) => filterPlayers(value)}
        />
        <ScrollView w="100%" pt="10px">
          {players.map((p: SPlayer) => (
            <PlayerEntry
              key={nanoid()}
              p={p}
              onClick={() => onPlayerPressed(p.id)}
              selected={selectedPlayerId === p.id}
            />
          ))}
          <View height="50px" />
        </ScrollView>
      </Center>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  selectedMatch: state.userSelection.match,
});

const actions = {};

const mergedProps = (
  stateProps: OwnProps,
  dispatchProps: any,
  ownProps: any
) => {
  const { selectedMatch } = stateProps;
  const allPlayers: SPlayer[] = [];
  selectedMatch?.left_side.players.map((p: Player) => {
    allPlayers.push({
      ...p,
      teamImg: selectedMatch?.left_side?.badge,
      teamName: selectedMatch?.left_side?.country_code,
    });
  });
  selectedMatch?.right_side.players.map((p: Player) => {
    allPlayers.push({
      ...p,
      teamImg: selectedMatch?.right_side?.badge ?? "",
      teamName: selectedMatch?.right_side?.country_code ?? "",
    });
  });

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    allPlayers,
  };
};

export default connect(mapStateToProps, actions, mergedProps)(MatchView);
