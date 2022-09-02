import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import {
  AddIcon,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  View,
  VStack,
} from "native-base";
import { omit } from "ramda";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import EmptyState from "../../assets/empty_state.svg";
import { AlertMessage } from "../../components/AlertMessage";
import { ApplicationState } from "../../store";
import {
  setCommunitiesData,
  setCommunityData,
  setCommunityFailed,
  setCommunityLoading,
} from "../../store/community/actions";
import {
  createCommunity,
  findAllCommunities,
} from "../../store/community/services";
import { Community as CommunityType } from "../../store/community/types";
import { FailureState } from "../../types";
import { makeid } from "../../utils";
import { RootStackParamList } from "../../utils/Pages";

interface OwnProps {
  userId: number;
  data: CommunityType[];
  isLoading: boolean;
  error: FailureState;
  submitCommunityData: any;
  fetchCommunities: any;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const windowHeight = Dimensions.get('window').height;

const Community = ({
  userId,
  data,
  isLoading,
  error,
  navigation,
  fetchCommunities = () => {},
  submitCommunityData = () => {},
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [communityData, setCommunityData] = useState({
    name: "",
    winning_prize: "",
    access_code: makeid(10),
  });

  const handleInputVal = (field: string, value: any) => {
    setCommunityData(() => ({ ...communityData, [field]: value }));
  };

  const submitModal = () => {
    submitCommunityData(userId, communityData, () => setShowModal(false));
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <View position="relative">
      <Center>
        <Modal animationType="slide" visible={showModal}>
          <Center h="100%" w="100%" paddingLeft="10" paddingRight="10">
            <VStack alignItems={"center"} marginBottom="5">
              <Image
                marginBottom="5"
                width={125}
                height={125}
                alt="comuunity_creation"
                source={{
                  uri: "https://res.cloudinary.com/dfvv4obnz/image/upload/v1662096124/kisspng-computer-icons-icon-design-sport-5af35e3c693272.3972470315258988124309_rscebc.png",
                }}
              />
              <Heading>Create your community</Heading>
            </VStack>
            <VStack w="100%" marginBottom="5">
              {error?.status !== 200 && (
                <AlertMessage
                  status="error"
                  title="Somthing went wrong!"
                  message={error?.message ?? ""}
                />
              )}
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  value={communityData.name}
                  type="text"
                  onChangeText={(val) => handleInputVal("name", val)}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Prize</FormControl.Label>
                <Input
                  value={communityData.winning_prize}
                  type="text"
                  placeholder="What the winner gets..."
                  onChangeText={(val) => handleInputVal("winning_prize", val)}
                />
              </FormControl>
            </VStack>
            <VStack w="100%" alignItems="flex-end">
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bgColor="indigo.500"
                  color="white"
                  isLoading={isLoading}
                  isLoadingText="Hold on..."
                  onPress={submitModal}
                >
                  Save
                </Button>
              </Button.Group>
            </VStack>
          </Center>
        </Modal>
      </Center>
      {data.length === 0 && (
        <Center>
          <VStack paddingTop="1/3" alignItems="center" justifyContent="center">
            <EmptyState />
            <Text
              fontSize="lg"
              paddingBottom="3"
              bold
              color="black"
              textAlign="center"
            >
              No Communities
            </Text>
            <Text
              paddingBottom="15"
              paddingLeft="10"
              paddingRight="10"
              color={"gray.400"}
              textAlign="center"
            >
              unfortunately, you're not included to any communities. But, you
              can create your own and invite all your friends!
            </Text>
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => setShowModal(true)}
            >
              Create a new community!
            </Button>
          </VStack>
        </Center>
      )}
      <View position="absolute" top={windowHeight - 60} right="3">
        <Button
          borderRadius={100}
          width={50}
          height={50}
          bgColor={"indigo.700"}
          color="white"
          startIcon={<AddIcon />}
          onPress={() => setShowModal(true)}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  userId: state.auth.user?.id,
  data: state.community.communities,
  isLoading: state.community.isLoading,
  error: state.community.failure,
});

const mappedActions = {
  fetchCommunities: () => async (dispatch: Dispatch) => {
    try {
      dispatch(setCommunityLoading(true));
      const response = await findAllCommunities();
      console.log("RESP =>", response);
      dispatch(setCommunitiesData(response.data));
      dispatch(setCommunityLoading(false));
    } catch (e: any) {
      const { data: errorData } = e;
      dispatch(setCommunityLoading(false));
      dispatch(
        setCommunityFailed({
          status: errorData?.error.status ?? 400,
          message: errorData?.error.message ?? "Something went wrong",
        })
      );
    }
  },
  submitCommunityData:
    (userId: number, data: any, successCallback: () => void) =>
    async (dispatch: Dispatch) => {
      try {
        dispatch(setCommunityLoading(true));
        const resp = await createCommunity(userId, data);
        dispatch(setCommunityData(omit(["publishedAt"], resp.data)));
        dispatch(setCommunityLoading(false));
        successCallback();
      } catch (e: any) {
        const { data: errorData } = e;
        dispatch(setCommunityLoading(false));
        dispatch(
          setCommunityFailed({
            status: errorData?.error.details?.status ?? 400,
            message:
              errorData?.error.details?.message ?? "Something went wrong",
          })
        );
      }
    },
};

export default connect(mapStateToProps, mappedActions)(Community);
