import { Center, HStack, Image, Spinner, Text, View } from "native-base";
import React, { useEffect } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { Foundation } from "@expo/vector-icons";
import CenteredImage from "../../components/CenteredImage";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Dispatch } from "redux";
import { getTournamentData } from "../../store/Tournament/services";
import {
  setTournamentData,
  setTournamentFailed,
} from "../../store/Tournament/actions";
import { getMatchsData } from "../../store/Matchs/services";
import { setMatchesData, setMatchesFailed } from "../../store/Matchs/actions";
import { FailureState } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pages, RootStackParamList } from "../../utils/Pages";
import { getValueFor, saveKey, sleep } from "../../utils";
import { Constants } from "../../utils/Constants";
import { isEmpty, isNil } from "ramda";
import { getUserProfile, performAuth } from "../../store/Auth/services";
import { setAuthenticatedUser, setProfileData } from "../../store/Auth/actions";
import { injectAuthTokenToRequest } from "../../utils/Http";
import { User } from "../../store/Auth/types";

const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

interface OwnProps {
  isLoading: boolean;
  error: FailureState;
  initApp: any;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const SplashScreen = ({ initApp, navigation }: Props) => {
  useEffect(() => {
    initApp(navigation);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/splash_screen_bg.webp")}
      resizeMode="cover"
      style={{
        width: screenWidth,
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        bottom: 0,
        top: 0,
      }}
    >
      <Center position="absolute" w="100%" h="100%">
        <CenteredImage
          isSvg
          source="https://res.cloudinary.com/dfvv4obnz/image/upload/v1665942273/2022_FIFA_World_Cup_yooqkp.svg"
          w={300}
          h={300}
        />
        <Spinner color="white" />
      </Center>
      <Center w="100%" position="absolute" bottom="30px">
        <HStack justifyContent={"center"} alignItems={"center"}>
          <Text color="white" pr="3px">
            made with
          </Text>
          <Foundation name="heart" size={20} color="white" />
          <Text color="white" pl="3px">
            by med.jemmoudi
          </Text>
        </HStack>
      </Center>
    </ImageBackground>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: state?.auth?.isLoading,
  error: state?.auth?.failure,
  jwt: state?.auth?.jwt ?? "",
});

const mappedActions = {
  initApp: (navigation: any) => async (dispatch: Dispatch) => {
    try {
      const tournament = await getTournamentData();
      const matches = await getMatchsData();
      dispatch(setTournamentData(tournament));
      dispatch(setMatchesData(matches));
      await sleep(2000); // <-- temporisation!
      const identifier = await getValueFor(Constants.storage.AUTH_USERNAME);
      const password = await getValueFor(Constants.storage.AUTH_PWD);
      /* =============== CHECK USER =============== */
      const hasIdentifier = !isEmpty(identifier) && !isNil(identifier);
      const hasPassword = !isEmpty(password) && !isNil(password);
      if (hasIdentifier && hasPassword) {
        const authData = await performAuth(identifier, password);
        dispatch(setAuthenticatedUser(authData?.jwt, authData?.user));
        await saveKey(Constants.storage.AUTH_TOKEN, authData?.jwt ?? "");
        await saveKey(Constants.storage.AUTH_USERNAME, identifier ?? "");
        await saveKey(Constants.storage.AUTH_PWD, password ?? "");
        injectAuthTokenToRequest();
        const userProfile: User = await getUserProfile(
          authData?.user?.id,
          authData?.jwt
        );
        dispatch(setProfileData(userProfile?.profile));
        navigation.navigate(Pages.Home, { screen: "Profile" });
      } else {
        navigation.navigate(Pages.Login);
      }
    } catch (e: any) {
      const { data } = e;
      console.log(e);
      dispatch(
        setTournamentFailed({
          status: data?.error?.status ?? 400,
          message: data?.error?.message ?? "Something went wrong",
        })
      );
    }
  },
};

export default connect(mapStateToProps, mappedActions)(SplashScreen);
