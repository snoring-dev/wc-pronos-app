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
            uri: profile.picture.formats.medium.url,
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
          <Center>
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
          <Center>
            <Image
              alt={profile.preferred_team?.name ?? ""}
              source={{ uri: profile.preferred_team?.flag }}
              w={7}
              h={5}
              position="relative"
              top="1"
            />
          </Center>
        </HStack>
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
          <Text>
            {profile.country_from?.name} | {profile.country_from?.region}
          </Text>
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
          <Text>{format(parseISO(profile.createdAt), "dd MMM yyyy")}</Text>
        </Box>
        <Box paddingTop={50}>
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
