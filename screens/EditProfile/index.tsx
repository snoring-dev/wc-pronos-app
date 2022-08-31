import { View } from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { ApplicationState } from "../../store";
import { Profile as ProfileType } from "../../store/Auth/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Pages";
import {
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Select,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { AlertMessage } from "../../components/AlertMessage";
import { FailureState } from "../../types";
import {
  linkPictureToProfile,
  sendProfilePicture,
  updateProfileData,
} from "../../store/Auth/services";
import { Group, Team } from "../../store/Tournament/types";
import {
  setAuthenticationFailed,
  setAuthLoading,
  setUpdatedProfileData,
} from "../../store/Auth/actions";
import { Dispatch } from "redux";

interface OwnProps {
  profile: ProfileType;
  username: string;
  isLoading: boolean;
  error: FailureState;
  teams?: Team[];
  updateProfile: any;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const EditProfile = ({
  profile,
  username,
  error,
  isLoading,
  navigation,
  teams = [],
  updateProfile = () => {},
}: Props) => {
  const [countryCode, setCountryCode] = useState(
    profile?.country_from?.cca2 ?? "FR"
  );
  const [myTeam, setMyTeam] = useState(profile?.preferred_team?.country_code);
  const [profileData, setProfileData] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    country_from: profile?.country_from ?? "",
    preferred_team: profile?.preferred_team ?? "",
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(profile?.picture?.formats?.medium?.url ?? '');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageLoading(true);
      const resp = await sendProfilePicture(username, result.uri);

      if (resp[0].id) {
        const linking = await linkPictureToProfile(profile.id, resp[0].id);
        setImage(result.uri);
      }

      setImageLoading(false);
    }
  };

  const pickPreferredTeam = (item: string) => {
    setMyTeam(item);
    handleInputVal(
      "preferred_team",
      teams.find((tm) => tm.country_code === item)
    );
  };

  const pickCountry = (country: Country) => {
    setCountryCode(country?.cca2);
    handleInputVal("country_from", country);
  };

  const handleInputVal = (field: string, value: any) => {
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
          <FormControl>
            <FormControl.Label>Country</FormControl.Label>
            <CountryPicker
              countryCode={countryCode as CountryCode}
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              onSelect={pickCountry}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Your preffered team</FormControl.Label>
            <Select
              selectedValue={myTeam}
              onValueChange={pickPreferredTeam}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
            >
              {teams.map((team: Team) => {
                return (
                  <Select.Item
                    key={team.country_code}
                    label={team.name}
                    value={team.country_code}
                    leftIcon={
                      <Image
                        position="relative"
                        top={0.5}
                        width={7}
                        height={5}
                        source={{ uri: team.flag }}
                        alt={team.name}
                      />
                    }
                  />
                );
              })}
            </Select>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {}}
            isLoading={isLoading}
            isLoadingText="Hold on..."
            onPressIn={() => updateProfile(profile.id, profileData)}
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
  teams: state?.tournament?.groups?.reduce((current: any, group: Group) => {
    return [...current, ...group.teams];
  }, []),
});

const mappedActions = {
  updateProfile: (id: number, data: any) => async (dispatch: Dispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const resp = await updateProfileData(id, data);
      console.log("profile =>", resp);
      dispatch(setUpdatedProfileData(resp.data.attributes));
    } catch (e: any) {
      const { data: errorData } = e;
      dispatch(setAuthLoading(false));
      dispatch(
        setAuthenticationFailed({
          status: errorData?.error?.status ?? 400,
          message: errorData?.error?.message ?? "Something went wrong",
        })
      );
    }
  },
};

export default connect(mapStateToProps, mappedActions)(EditProfile);
