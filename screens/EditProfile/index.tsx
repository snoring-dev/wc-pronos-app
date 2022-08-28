import { Touchable, View } from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { ApplicationState } from "../../store";
import { Profile as ProfileType } from "../../store/Auth/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import {
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { AlertMessage } from "../../components/AlertMessage";
import { FailureState } from "../../types";
import { linkPictureToProfile, sendProfilePicture } from "../../store/Auth/services";
import { getValueFor } from "../../utils";
import { Constants } from "../../utils/Constants";

interface OwnProps {
  profile: ProfileType;
  username: string;
  isLoading: boolean;
  error: FailureState;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const EditProfile = ({
  profile,
  username,
  error,
  isLoading,
  navigation,
}: Props) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [profileData, setProfileData] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    country: profile.country,
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(profile.picture.formats.medium.url);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageLoading(true);
      const resp = await sendProfilePicture(
        username,
        result.uri,
      );


      if (resp[0].id) {
        const linking = await linkPictureToProfile(profile.id, resp[0].id);
        setImage(result.uri);
      }

      setImageLoading(false);
    }
  };

  const handleInputVal = (field: string, value: string) => {
    setProfileData(() => ({ ...profileData, [field]: value }));
  };

  return (
    <View>
      <Center w="100%" paddingTop={10}>
        <Pressable
          onPress={pickImage}
          style={{ position: "relative" }}
          alignItems="center"
          justifyContent="center"
          marginTop={20}
        >
          <Image
            opacity={imageLoading ? 0.4 : 1}
            borderRadius={100}
            source={{
              uri: image,
            }}
            alt={profile?.picture?.alternativeText ?? username}
            size={150}
          />
          {imageLoading && (
            <Spinner style={{ position: "absolute" }} color="indigo.500" />
          )}
        </Pressable>
        <HStack>
          <Text
            textAlign={"center"}
            color="gray.500"
            fontSize={18}
            paddingTop={2}
          >
            @{username}
          </Text>
        </HStack>

        <VStack w="90%" space={3} mt="5">
          {error?.status !== 200 && (
            <AlertMessage
              status="error"
              title="Somthing went wrong!"
              message={error?.message ?? ""}
            />
          )}
          <FormControl>
            <FormControl.Label>First name</FormControl.Label>
            <Input
              value={profileData?.firstname}
              type="text"
              isRequired
              onChangeText={(val) => handleInputVal("firstname", val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last name</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(val) => handleInputVal("lastname", val)}
              value={profileData?.lastname}
            />
          </FormControl>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter
            visible
          />
          <FormControl>
            <FormControl.Label>Country</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(val) => handleInputVal("country", val)}
              value={profileData?.country}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Your preffered team</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(val) => handleInputVal("team", val)}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {}}
            isLoading={isLoading}
            isLoadingText="Hold on..."
          >
            Update
          </Button>
        </VStack>
      </Center>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  profile: state?.auth?.user?.profile ?? null,
  username: state?.auth.user?.username ?? "",
  isLoading: state?.auth?.isLoading,
  error: state?.auth?.failure,
});

export default connect(mapStateToProps)(EditProfile);
