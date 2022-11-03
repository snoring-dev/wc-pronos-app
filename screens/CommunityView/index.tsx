import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Community, UserScoreRanking } from "../../store/community/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Heading,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { SvgUri } from "react-native-svg";
import { isNil } from "ramda";
import { nanoid } from "nanoid";
import { AntDesign } from "@expo/vector-icons";

interface OwnProps {
  selectedCommunity: Community;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const CommunityView = ({ selectedCommunity }: Props) => {
  const {
    name,
    winning_prize,
    user_score_communities: userRankings,
  } = selectedCommunity;
  return (
    <SafeAreaView>
      <VStack justifyContent="center" alignItems="center">
        <Heading>{name}</Heading>
        {!isNil(winning_prize) && (
          <VStack
            justifyContent="center"
            alignItems="center"
            backgroundColor={"white"}
            borderRadius="5px"
            py="10px"
            px="30px"
            my="10px"
          >
            <SvgUri
              width={70}
              height={50}
              uri={`https://res.cloudinary.com/dfvv4obnz/image/upload/v1667458227/2163457_ocxbuu.svg`}
            />
            <Text>{winning_prize}</Text>
          </VStack>
        )}
      </VStack>
      <ScrollView px="5px">
        <VStack>
          <HStack key="heading-1">
            <View
              px="2px"
              py="4px"
              justifyContent="center"
              alignItems={"center"}
              w="5%"
              bgColor={"#f5f5f5"}
              borderColor="gray.200"
              borderWidth="1px"
              m="2px"
            >
              <Text
                fontWeight="semibold"
                color="black"
                textTransform="uppercase"
                fontSize="10px"
              >
                #
              </Text>
            </View>
            <View
              px="2px"
              py="4px"
              w="70%"
              bgColor={"#f5f5f5"}
              borderColor="gray.200"
              borderWidth="1px"
              m="2px"
            >
              <Text
                fontWeight="semibold"
                color="black"
                textTransform="uppercase"
                fontSize="10px"
                pl="10px"
              >
                User
              </Text>
            </View>
            <View
              px="2px"
              py="4px"
              justifyContent="center"
              alignItems={"center"}
              w="10%"
              bgColor={"#f5f5f5"}
              borderColor="gray.200"
              borderWidth="1px"
              m="2px"
            >
              <Text
                fontWeight="semibold"
                color="black"
                textTransform="uppercase"
                fontSize="10px"
              >
                Pts
              </Text>
            </View>
            <View
              px="2px"
              py="4px"
              justifyContent="center"
              alignItems={"center"}
              w="10%"
              bgColor={"#f5f5f5"}
              borderColor="gray.200"
              borderWidth="1px"
              m="2px"
            >
              <Text
                fontWeight="semibold"
                color="black"
                textTransform="uppercase"
                fontSize="10px"
              >
                Evo
              </Text>
            </View>
          </HStack>
          {userRankings?.map((ranking: UserScoreRanking, index: number) => {
            return (
              <HStack key={nanoid()}>
                <View
                  px="2px"
                  py="4px"
                  justifyContent="center"
                  alignItems={"center"}
                  w="5%"
                  bgColor={"white"}
                  m="2px"
                >
                  <Text color="black" textTransform="uppercase" fontSize="10px">
                    {ranking.current_ranking}
                  </Text>
                </View>
                <HStack px="2px" py="4px" w="70%" bgColor={"white"} m="2px">
                  <Avatar
                    ml="5px"
                    borderColor="white"
                    borderWidth={1}
                    size="30px"
                    source={{
                      uri: ranking.user.profile.picture.formats.thumbnail.url,
                    }}
                  />
                  <VStack justifyContent="center">
                    <Text
                      color="black"
                      textTransform="uppercase"
                      fontSize="10px"
                      pl="10px"
                    >
                      {ranking.user.profile.firstname}{" "}
                      {ranking.user.profile.lastname}
                    </Text>
                    <Text
                      pl="10px"
                      color="gray.400"
                      fontSize="9px"
                    >{`@${ranking.user.username}`}</Text>
                  </VStack>
                </HStack>
                <View
                  px="2px"
                  py="4px"
                  justifyContent="center"
                  alignItems={"center"}
                  w="10%"
                  bgColor={"white"}
                  m="2px"
                >
                  <Text color="black" textTransform="uppercase" fontSize="10px">
                    {ranking.score.value}
                  </Text>
                </View>
                <View
                  px="2px"
                  py="4px"
                  justifyContent="center"
                  alignItems={"center"}
                  w="10%"
                  bgColor={"white"}
                  m="2px"
                >
                  {ranking.current_ranking - ranking.previous_ranking < 0 && (
                    <AntDesign name="caretdown" size={12} color={"#f81d1d"} />
                  )}
                  {ranking.current_ranking - ranking.previous_ranking > 0 && (
                    <AntDesign name="caretup" size={12} color={"#9696f8"} />
                  )}
                  {ranking.current_ranking - ranking.previous_ranking === 0 && (
                    <AntDesign name="minus" size={12} color="black" />
                  )}
                </View>
              </HStack>
            );
          })}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const stateToProps = (state: ApplicationState) => ({
  selectedCommunity: state?.userSelection?.community,
});

export default connect(stateToProps)(CommunityView);
