import { View } from "react-native";
import React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Profile as ProfileType } from "../../store/Auth/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import {
  Center,
  View as NBView,
  Image,
  VStack,
  Text,
  Box,
  Button,
  HStack,
} from "native-base";
import format from "date-fns/format";
import { parseISO } from "date-fns";

interface ProfileComponentProps {
  profile: ProfileType;
  username: string;
}

type Props = ProfileComponentProps & NativeStackScreenProps<RootStackParamList>;

const Profile = ({ profile, username, navigation }: Props) => {
  return (
    <View>
      <Center paddingTop={10}>
        <Image
          borderRadius={100}
          source={{
            uri:
              profile?.picture?.formats?.medium?.url ??
              "https://res.cloudinary.com/dfvv4obnz/image/upload/v1665395778/male_man_people_person_avatar_white_tone_icon_159363_1_87f21cf98f.png",
          }}
          alt={profile?.picture?.alternativeText ?? username}
          size={150}
        />
        <HStack paddingTop={3}>
          <Text
            textAlign={"center"}
            color="gray.500"
            fontSize={18}
            paddingTop={2}
          >
            @{username}
          </Text>
          {profile?.preferred_team && (
            <>
              <Center key="center-1">
                <NBView
                  w="0.5"
                  h={6}
                  position="relative"
                  top="1"
                  backgroundColor="gray.200"
                  marginRight={2}
                  marginLeft={2}
                />
              </Center>
              <Center key="center-2">
                <Image
                  alt={profile?.preferred_team?.name ?? ""}
                  source={{ uri: profile?.preferred_team?.flag ?? "" }}
                  w={7}
                  h={5}
                  position="relative"
                  top="1"
                />
              </Center>
            </>
          )}
        </HStack>
      </Center>
      <VStack paddingTop={10} space={4} alignItems="center">
        <Box
          key="box-1"
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>First name:</Text>
          <Text>{profile?.firstname ?? "N/A"}</Text>
        </Box>
        <Box
          key="box-2"
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Last name:</Text>
          <Text>{profile?.lastname ?? "N/A"}</Text>
        </Box>
        <Box
          key="box-3"
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Country:</Text>
          <Text>
            {profile?.country_from
              ? `${profile?.country_from?.name} | ${profile?.country_from?.region}`
              : "N/A"}
          </Text>
        </Box>
        <Box
          key="box-4"
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Registration date:</Text>
          <Text>
            {profile?.createdAt
              ? format(parseISO(profile?.createdAt ?? ""), "dd MMM yyyy")
              : "N/A"}
          </Text>
        </Box>
        <Box key="box-5" paddingTop={50} w="70%">
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <Button
              size="lg"
              colorScheme="blue"
              variant="subtle"
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              Edit your profile
            </Button>
            <Button
              colorScheme="warmGray"
              size="lg"
              variant="outline"
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Disconnect
            </Button>
          </HStack>
        </Box>
      </VStack>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  profile: state?.auth?.user?.profile ?? null,
  username: state?.auth.user?.username ?? "",
});

export default connect(mapStateToProps)(Profile);
