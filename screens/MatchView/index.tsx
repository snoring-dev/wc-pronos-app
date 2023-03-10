import React, { useEffect, useState } from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import {
  Match,
  Player,
  Prediction,
  SinglePrediction,
} from "../../store/Matchs/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import { SafeAreaView } from "react-native";
import PlayersList from "../../components/PlayersList";
import MatchEntry from "../../components/MatchEntry";
import {
  HStack,
  Input,
  Text,
  View,
  VStack,
  Image,
  Pressable,
  Button,
  Center,
} from "native-base";
import { Dispatch } from "redux";
import { getMatchsData, setPrediction } from "../../store/Matchs/services";
import {
  setMatchesData,
  setMatchesFailed,
  setMatchesLoading,
} from "../../store/Matchs/actions";
import { setSelectedMatch } from "../../store/UserSelection/actions";
import LoadingView from "../../components/LoadingView";
import isBefore from "date-fns/isBefore";
import { parseISO } from "date-fns";

type SPlayer = Player & {
  teamName: string;
  teamImg: string;
};

interface OwnProps {
  selectedMatch?: Match;
  userId: number;
  allPlayers: SPlayer[];
  savePrediction: any;
  isLoading: boolean;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const MatchView = ({
  navigation,
  userId,
  selectedMatch,
  allPlayers,
  savePrediction,
  isLoading,
}: Props) => {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [winnerId, setWinnerId] = useState(0);
  const [playerId, setPlayerId] = useState(0);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [isPredictable, setIsPredictable] = useState(false);

  useEffect(() => {
    let interval: any = null;
    try {
      const checkPredictionAbility = () => {
        const dateOfMatch = parseISO(selectedMatch?.played_at ?? "");
        const now = new Date();
        setIsPredictable(isBefore(now, dateOfMatch));
      };
      checkPredictionAbility();
      interval = setInterval(() => checkPredictionAbility(), 30000);
    } catch (e) {
      setIsPredictable(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [selectedMatch]);

  useEffect(() => {
    const pronoIndex: number =
      selectedMatch?.predictions.findIndex(
        (p: SinglePrediction) => p.owner.id === userId
      ) ?? -1;
    if (pronoIndex !== -1) {
      const pronostic: SinglePrediction | null =
        selectedMatch?.predictions[pronoIndex] ?? null;
      if (pronostic) {
        setWinnerId(pronostic.first_team_to_score);
        setPlayerId(pronostic.first_player_to_score);
        setLeftScore(pronostic.predicted_result.leftSide);
        setRightScore(pronostic.predicted_result.rightSide);
        setHasPredicted(true);
      }
    }
  }, [selectedMatch]);

  const submitData = () => {
    const prono: Prediction = {
      userId: userId,
      matchId: selectedMatch?.id ?? 0,
      predictedResult: {
        leftSide: leftScore,
        rightSide: rightScore,
      },
      firstPlayerToScore: playerId,
      firstTeamToScore: winnerId,
    };

    savePrediction(prono);
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingView />
      </SafeAreaView>
    );
  }

  const predictionEnabled =
    isPredictable &&
    !selectedMatch?.finished &&
    playerId !== 0 &&
    winnerId !== 0;

  return (
    <SafeAreaView>
      {selectedMatch && <MatchEntry data={selectedMatch} />}
      <HStack justifyContent="center" alignItems="center">
        <View width="1/6" height="1px" bgColor="blue.500" />
        <View
          bgColor="blue.500"
          width="4/6"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white" textTransform="uppercase" fontSize="16px">
            Set your prediction
          </Text>
        </View>
        <View width="1/6" height="1px" bgColor="blue.500" />
      </HStack>
      {/* -------------- final result -------------- */}
      <Text pl="15px" fontSize="16px" color="black">
        Final result:
      </Text>
      <HStack justifyContent="center" alignItems="center" pt="6px" pb="6px">
        <Text>{selectedMatch?.left_side?.name}</Text>
        <HStack justifyContent="center" alignItems="center" pl="5px" pr="5px">
          <Input
            bgColor="white"
            borderWidth="1px"
            width="50px"
            height="30px"
            textAlign={"center"}
            defaultValue={String(leftScore)}
            onChangeText={(val: string) => setLeftScore(Number(val))}
          />
          <Text pl="5px" pr="5px">
            -
          </Text>
          <Input
            bgColor="white"
            borderWidth="1px"
            width="50px"
            height="30px"
            textAlign={"center"}
            defaultValue={String(rightScore)}
            onChangeText={(val: string) => setRightScore(Number(val))}
          />
        </HStack>
        <Text>{selectedMatch?.right_side?.name}</Text>
      </HStack>
      {/* -------------- 1st Team to score -------------- */}
      <Text pl="15px" fontSize="16px" color="black">
        First Team to score:
      </Text>
      <HStack justifyContent="space-between" alignItems="center" p="15px">
        <Pressable
          w="48%"
          bgColor="white"
          borderWidth={
            winnerId === selectedMatch?.left_side?.id ? "2px" : "1px"
          }
          borderColor={
            winnerId === selectedMatch?.left_side?.id ? "blue.500" : "gray.300"
          }
          borderRadius="5px"
          onPress={() => setWinnerId(selectedMatch?.left_side?.id ?? 0)}
        >
          <VStack
            justifyContent={"center"}
            alignItems="center"
            pt="8px"
            pb="8px"
          >
            <Image
              source={{ uri: selectedMatch?.left_side?.flag?.url }}
              alt={selectedMatch?.left_side?.name ?? ""}
              width="30px"
              height="30px"
              borderRadius={"100px"}
            />
            <Text color="black" textTransform="capitalize">
              {`${selectedMatch?.left_side?.name ?? ""}`.toLowerCase()}
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="48%"
          bgColor="white"
          borderWidth={
            winnerId === selectedMatch?.right_side?.id ? "2px" : "1px"
          }
          borderColor={
            winnerId === selectedMatch?.right_side?.id ? "blue.500" : "gray.300"
          }
          borderRadius="5px"
          onPress={() => setWinnerId(selectedMatch?.right_side?.id ?? 0)}
        >
          <VStack
            justifyContent={"center"}
            alignItems="center"
            pt="8px"
            pb="8px"
          >
            <Image
              source={{ uri: selectedMatch?.right_side?.flag?.url }}
              alt={selectedMatch?.right_side?.name ?? ""}
              width="30px"
              height="30px"
              borderRadius={"100px"}
            />
            <Text color="black" textTransform="capitalize">
              {`${selectedMatch?.right_side?.name ?? ""}`.toLowerCase()}
            </Text>
          </VStack>
        </Pressable>
      </HStack>
      {/* -------------- 1st Player to score -------------- */}
      <Text pl="15px" fontSize="16px" color="black">
        First player to score:
      </Text>
      <PlayersList
        data={allPlayers}
        onPlayerChanged={(id: number) => setPlayerId(id)}
        currentIndex={playerId}
      />
      {/* -------------- Submit button -------------- */}

      <Center w="100%" pl="15px" pr="15px" pt="10px">
        <Button
          w="100%"
          bgColor={predictionEnabled ? "indigo.500" : "indigo.100"}
          onPress={submitData}
          isLoading={isLoading}
          isLoadingText="Hold on..."
          disabled={!predictionEnabled}
        >
          <Text
            color="white"
            fontSize="16px"
            fontWeight="semibold"
            textTransform="uppercase"
          >
            {hasPredicted ? "Update your prediction" : "Send prediction"}
          </Text>
        </Button>
      </Center>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  selectedMatch: state?.userSelection?.match,
  userId: state?.auth?.user?.id,
  isLoading: state?.matches?.isLoading ?? false,
});

const actions = {
  savePrediction: (prono: Prediction) => async (dispatch: Dispatch) => {
    try {
      dispatch(setMatchesLoading(true));
      const resp: any = await setPrediction(prono);
      if (resp.id && resp.match_id) {
        const allMatches = await getMatchsData();
        const selectedMatchIndex = allMatches.findIndex(
          (m: Match) => m.id === resp.match_id
        );
        dispatch(setMatchesData(allMatches));
        if (selectedMatchIndex !== -1) {
          dispatch(setSelectedMatch(allMatches[selectedMatchIndex]));
        }
      }
      dispatch(setMatchesLoading(false));
    } catch (e: any) {
      const { data } = e;
      console.log(e);
      dispatch(setMatchesLoading(false));
      dispatch(
        setMatchesFailed({
          status: data?.error?.status ?? 400,
          message: data?.error?.message ?? "Something went wrong",
        })
      );
    }
  },
};

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
      teamImg: selectedMatch?.left_side?.flag?.url ?? "",
      teamName: selectedMatch?.left_side?.country_code,
    });
  });
  selectedMatch?.right_side.players.map((p: Player) => {
    allPlayers.push({
      ...p,
      teamImg: selectedMatch?.right_side?.flag?.url ?? "",
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
