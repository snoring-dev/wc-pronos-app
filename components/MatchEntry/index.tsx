import React from "react";
import { Center, HStack, Image, Pressable, Text, View } from "native-base";
import { Container, LiveLabel } from "./styles";

const MatchEntry = () => {
  return (
    <Pressable>
      <Container>
        <LiveLabel>
          <Text bold fontSize="xs" textTransform="uppercase" color={"white"}>
            live
          </Text>
        </LiveLabel>
        <Center>
          <View
            backgroundColor="gray.100"
            pt={1}
            pb={1}
            pl={2}
            pr={2}
            mt={5}
            borderRadius={5}
          >
            <Text color="gray.500" fontSize="2xs">
              7 Nov, 14:00 PM
            </Text>
          </View>
        </Center>
        <Center mt={3} mb={3}>
          <HStack alignItems={"center"}>
            <HStack alignItems={"center"}>
              <Text color={"black"} pr={2}>Saudi Arabia</Text>
              <Image
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
            </HStack>
            <View pl={3} pr={3}>
              <Text fontSize="xl" color="#8a8d95">0 - 0</Text>
            </View>
            <HStack alignItems={"center"}>
              <Image
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
              <Text color={"black"} pl={2}>Saudi Arabia</Text>
            </HStack>
          </HStack>
        </Center>
        <Center mb={3}>
            <Text fontSize="15" color="#8a8d95">
                King Power Stadium
            </Text>
        </Center>
      </Container>
    </Pressable>
  );
};

export default MatchEntry;
