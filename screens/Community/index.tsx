import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  Menu,
  Text,
  View,
  VStack,
} from "native-base";
import { omit } from "ramda";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Ionicons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
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
  findCommunityDetails,
  joinCommunity,
} from "../../store/community/services";
import { Community as CommunityType } from "../../store/community/types";
import { FailureState } from "../../types";
import { makeid } from "../../utils";
import { Pages, RootStackParamList } from "../../utils/Pages";
import { CommunitiesList } from "../../components/CommunitiesList";
import LoadingView from "../../components/LoadingView";
import { SafeAreaView } from "react-native-safe-area-context";
import { setSelectedCommunity } from "../../store/UserSelection/actions";

interface OwnProps {
  userId: number;
  data: CommunityType[];
  isLoading: boolean;
  error: FailureState;
  submitCommunityData: any;
  fetchCommunities: any;
  submitAccessCode: any;
  getCommunityDetails: any;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const Community = ({
  userId,
  data,
  isLoading,
  error,
  navigation,
  fetchCommunities = () => {},
  submitCommunityData = () => {},
  submitAccessCode = () => {},
  getCommunityDetails = () => {},
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [communityData, setCommunityData] = useState({
    name: "",
    winning_prize: "",
    access_code: makeid(10),
  });

  const [dialogVisible, setDialogVisible] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const showAddDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleDialogSubmit = () => {
    submitAccessCode(userId, accessCode, () => {
      setDialogVisible(false);
    });
  };

  const handleInputVal = (field: string, value: any) => {
    setCommunityData(() => ({ ...communityData, [field]: value }));
  };

  const submitModal = () => {
    submitCommunityData(userId, communityData, () => setShowModal(false));
  };

  useEffect(() => {
    fetchCommunities(userId);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingView />
      </SafeAreaView>
    );
  }

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
      <Box w="100%" alignItems="center">
        <Menu
          w="190"
          placement="left top"
          marginRight={2}
          trigger={(triggerProps) => {
            return (
              <Button
                position="absolute"
                right="-10"
                top="2"
                borderLeftRadius={100}
                paddingRight="5"
                height={50}
                bgColor={"blue.300"}
                color="white"
                startIcon={
                  <Ionicons name="options-outline" size={24} color="white" />
                }
                {...triggerProps}
              />
            );
          }}
        >
          <Menu.Item onPress={() => setShowModal(true)}>
            Create community
          </Menu.Item>
          <Menu.Item onPress={() => setDialogVisible(true)}>
            Join community
          </Menu.Item>
        </Menu>
      </Box>
      <CommunitiesList
        marginTop="20"
        width="90%"
        data={data}
        refreshAction={() => fetchCommunities(userId)}
        onListItemClicked={(community: CommunityType) =>
          getCommunityDetails(community, () =>
            navigation.navigate(Pages.CommunityView)
          )
        }
      />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Join Pronostic group</Dialog.Title>
        <Dialog.Description>
          <Center
            w="100%"
            paddingTop="5"
            paddingBottom="0"
            alignItems={"center"}
            justifyContent="center"
          >
            <FormControl>
              <Input
                bgColor={"white"}
                w={"100%"}
                placeholder="Past the access code here"
                type="text"
                onChangeText={(val) => setAccessCode(val)}
              />
            </FormControl>
          </Center>
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleDialogSubmit} />
      </Dialog.Container>
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
  fetchCommunities: (userId: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(setCommunityLoading(true));
      const response = await findAllCommunities(userId);
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
  submitAccessCode:
    (userId: number, code: string, successCallback: () => void) =>
    async (dispatch: Dispatch) => {
      try {
        dispatch(setCommunityLoading(true));
        const joinResponse = await joinCommunity(userId, code);
        if (joinResponse.data.id) {
          const response = await findAllCommunities(userId);
          dispatch(setCommunitiesData(response.data));
        } else {
          dispatch(
            setCommunityFailed({
              status: 404,
              message: "Join request not allowed",
            })
          );
        }
        dispatch(setCommunityLoading(false));
        successCallback();
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
  getCommunityDetails:
    (community: CommunityType, nextScreen: () => void) =>
    async (dispatch: Dispatch) => {
      try {
        dispatch(setCommunityLoading(true));
        const resp = await findCommunityDetails(community.id);
        dispatch(
          setSelectedCommunity({
            id: resp.data.id,
            name: resp.data.name,
            winning_prize: resp.data.winning_prize,
            access_code: resp.data.access_code,
            createdAt: resp.data.createdAt,
            users: resp.data.users,
            is_private: resp.data?.is_private ?? false,
            user_score_communities: resp.data.user_score_communities,
          })
        );
        console.log("Selected:", resp);
        dispatch(setCommunityLoading(false));
        if (nextScreen) nextScreen();
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
};

export default connect(mapStateToProps, mappedActions)(Community);
