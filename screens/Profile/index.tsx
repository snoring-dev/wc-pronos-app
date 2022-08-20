import { View } from "react-native";
import React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Profile as ProfileType } from "../../store/Auth/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import { Center, Flex, Image, VStack, Text, Box } from "native-base";

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
            uri: profile.picture.formats.medium.url,
          }}
          alt={profile.picture.alternativeText}
          size={150}
        />
        <Text textAlign={"center"} color="gray.500" fontSize={18} paddingTop={2}>
          @{username}
        </Text>
      </Center>
      <VStack paddingTop={10} space={4} alignItems="center">
        <Box
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>First name:</Text>
          <Text>{profile.firstname}</Text>
        </Box>
        <Box
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Last name:</Text>
          <Text>{profile.lastname}</Text>
        </Box>
        <Box
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Country:</Text>
          <Text>{profile.country}</Text>
        </Box>
        <Box
          width="80%"
          paddingTop={2}
          paddingBottom={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text bold>Registration date:</Text>
          <Text>{profile.createdAt}</Text>
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
