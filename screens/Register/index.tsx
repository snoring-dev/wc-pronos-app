import React, { useState } from "react";
import {
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
import { RegistrationData } from "../../store/Registration/types";
import { Dispatch } from "redux";
import { ApplicationState } from "../../store";
import {
  clearRegistration,
  setRegistrationFailed,
  setRegistrationSuccess,
  setUserData,
} from "../../store/Registration/actions";
import { AlertMessage } from "../../components/AlertMessage";
import { FailureState } from "../../types";
import { saveUser } from "../../store/Registration/services";
import { Constants } from "../../utils/Constants";
import { setAuthenticatedUser } from "../../store/Auth/actions";
import { saveKey } from "../../utils";

interface RegisterProps {
  savedData: RegistrationData;
  isLoading: boolean;
  error: FailureState;
  createNewUser: any;
}

type Props = RegisterProps & NativeStackScreenProps<RootStackParamList>;

const Register = ({
  navigation,
  savedData,
  createNewUser,
  isLoading,
  error,
}: Props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputVal = (field: string, value: string) => {
    setUser((current) => ({ ...user, [field]: value }));
  };

  const submitUser = () => {
    createNewUser(user);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
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
            <FormControl.Label>Username</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(text) => handleInputVal("username", text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              isRequired
              onChangeText={(text) => handleInputVal("email", text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              isRequired
              onChangeText={(text) => handleInputVal("password", text)}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={submitUser}
            isLoading={isLoading}
            isLoadingText={"Submitting..."}
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  savedData: state.registration.data,
  isLoading: state.registration.isLoading,
  error: state.registration.failed,
});

const mappedActions = {
  createNewUser: (details: RegistrationData) => async (dispatch: Dispatch) => {
    dispatch(setUserData(details));
    try {
      const resp = await saveUser(details);
      dispatch(setRegistrationSuccess(details));
      await saveKey(
        Constants.storage.AUTH_TOKEN,
        resp?.jwt ?? ""
      );
      dispatch(clearRegistration());
      dispatch(setAuthenticatedUser(resp.jwt, resp.user));
    } catch (e: any) {
      const { data } = e;
      dispatch(
        setRegistrationFailed({
          status: data?.error?.status ?? 400,
          message: data?.error?.message ?? "Something went wrong",
        })
      );
    }
  },
};

export default connect(mapStateToProps, mappedActions)(Register);
