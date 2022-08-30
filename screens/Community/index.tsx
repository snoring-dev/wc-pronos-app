import { Button, Center, Text, VStack } from "native-base";
import React from "react";
import EmptyState from "../../assets/empty_state.svg";

const Community = () => {
  return (
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
          unfortunately, you're not included to any communities. But, you can
          create your own and invite all your friends!
        </Text>
        <Button mt="2" colorScheme="indigo">
          Create a new community!
        </Button>
      </VStack>
    </Center>
  );
};

export default Community;
