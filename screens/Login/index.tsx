import React, { useEffect, useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  VStack,
  Box,
  FormControl,
  Input,
  Button,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pages, RootStackParamList } from "../../utils/Pages";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Dispatch } from "redux";
import { FailureState } from "../../types";
import { getUserProfile, performAuth } from "../../store/Auth/services";
import {
  setAuthenticatedUser,
  setAuthenticationFailed,
  setAuthLoading,
  setProfileData,
} from "../../store/Auth/actions";
import { saveKey } from "../../utils";
import { Constants } from "../../utils/Constants";
import { AlertMessage } from "../../components/AlertMessage";
import { User } from "../../store/Auth/types";
import { injectAuthTokenToRequest } from "../../utils/Http";
import { getTournamentData } from "../../store/Tournament/services";
import {
  setTournamentData,
  setTournamentFailed,
} from "../../store/Tournament/actions";
import { getMatchsData } from "../../store/Matchs/services";
import { setMatchesData, setMatchesFailed } from "../../store/Matchs/actions";

interface Credentials {
  identifier?: string;
  password?: string;
}

interface LoginComponentProps {
  isLoading: boolean;
  error: FailureState;
  performLogin: any;
}

type Props = LoginComponentProps & NativeStackScreenProps<RootStackParamList>;

const Login = ({
  navigation,
  isLoading,
  error,
  performLogin,
}: Props) => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleInputVal = (field: string, value: string) => {
    setCredentials((current) => ({ ...credentials, [field]: value }));
  };

  const submitCredentials = () => {
    performLogin(credentials, () =>
      navigation.navigate("Home", { screen: "Profile" })
    );
  };

  return (
    <Center w="100%" pt={130}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          {error?.status !== 200 && (
            <AlertMessage
              status="error"
              title="Somthing went wrong!"
              message={error?.message ?? ""}
            />
          )}
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(val) => handleInputVal("identifier", val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              isRequired
              onChangeText={(val) => handleInputVal("password", val)}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={submitCredentials}
            isLoading={isLoading}
            isLoadingText="Hold on..."
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={(e) => {
                e?.preventDefault();
                navigation.navigate(Pages.Register);
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: state?.auth?.isLoading,
  error: state?.auth?.failure,
});

const mappedActions = {
  performLogin:
    (auth: Credentials, successCallback: Function) =>
    async (dispatch: Dispatch) => {
      try {
        dispatch(setAuthLoading(true));
        const data = await performAuth(
          auth?.identifier ?? "",
          auth?.password ?? ""
        );
        dispatch(setAuthenticatedUser(data?.jwt, data?.user));
        await saveKey(Constants.storage.AUTH_TOKEN, data?.jwt ?? "");
        await saveKey(Constants.storage.AUTH_USERNAME, auth?.identifier ?? '');
        await saveKey(Constants.storage.AUTH_PWD, auth?.password ?? '');
        injectAuthTokenToRequest();
        const userProfile: User = await getUserProfile(
          data?.user?.id,
          data?.jwt
        );
        dispatch(setProfileData(userProfile?.profile));
        dispatch(setAuthLoading(false));
        successCallback();
      } catch (e: any) {
        const { data } = e;
        dispatch(setAuthLoading(false));
        dispatch(
          setAuthenticationFailed({
            status: data?.error?.status ?? 400,
            message: data?.error?.message ?? "Something went wrong",
          })
        );
      }
    },
};

export default connect(mapStateToProps, mappedActions)(Login);
