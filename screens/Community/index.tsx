import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  Center,
  FormControl,
  Input,
  Modal,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import EmptyState from "../../assets/empty_state.svg";
import { ApplicationState } from "../../store";
import { Community as CommunityType } from "../../store/community/types";
import { FailureState } from "../../types";
import { RootStackParamList } from "../../utils/Pages";

interface OwnProps {
  data: CommunityType[];
  isLoading: boolean;
  error: FailureState;
}

type Props = OwnProps & NativeStackScreenProps<RootStackParamList>;

const Community = ({ data, isLoading, error, navigation }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Center>
        <Modal
          animationPreset="slide"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>New Community</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input type="text" />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Prize</FormControl.Label>
                <Input type="text" placeholder="What the winner gets..." />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
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
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
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
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  data: state.community.communities,
  isLoading: state.community.isLoading,
  error: state.community.failure,
});

export default connect(mapStateToProps)(Community);
