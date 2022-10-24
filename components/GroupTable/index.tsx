import React from "react";
import {
  Text,
  Container,
  Row,
  Column,
  Center,
  Box,
  HStack,
  Image,
} from "native-base";

const GroupTable = () => {
  return (
    <Center mb={5}>
      <Container backgroundColor="white" borderRadius={8} shadow="1">
        <Row
          backgroundColor="cyan.100"
          padding={2}
          borderTopRadius={8}
        >
          <Column w="3/6">
            <Text bold>Group A</Text>
          </Column>
          <Column w="3/6">
            <HStack>
              <Text textAlign="center" w="1/4" pl="3">
                W
              </Text>
              <Text textAlign="center" w="1/4" pl="3">
                D
              </Text>
              <Text textAlign="center" w="1/4" pl="3">
                L
              </Text>
              <Text textAlign="center" w="1/4" pl="3">
                Pts
              </Text>
            </HStack>
          </Column>
        </Row>
        <Row pt="2" pb="2" pl="1" borderBottomWidth={1} borderBottomColor={"gray.100"}>
          <Column w="3/6">
            <HStack alignItems="center" justifyContent={"flex-start"}>
              <Image
                ml={1}
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
              <Text pl="2">Saudi Arabia</Text>
            </HStack>
          </Column>
          <Column w="3/6">
            <HStack pt="0.5">
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
            </HStack>
          </Column>
        </Row>
        <Row pt="2" pb="2" pl="1" borderBottomWidth={1} borderBottomColor={"gray.100"}>
          <Column w="3/6">
            <HStack alignItems="center" justifyContent={"flex-start"}>
              <Image
                ml={1}
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
              <Text pl="2">Saudi Arabia</Text>
            </HStack>
          </Column>
          <Column w="3/6">
            <HStack pt="0.5">
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
            </HStack>
          </Column>
        </Row>
        <Row pt="2" pb="2" pl="1" borderBottomWidth={1} borderBottomColor={"gray.100"}>
          <Column w="3/6">
            <HStack alignItems="center" justifyContent={"flex-start"}>
              <Image
                ml={1}
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
              <Text pl="2">Saudi Arabia</Text>
            </HStack>
          </Column>
          <Column w="3/6">
            <HStack pt="0.5">
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
            </HStack>
          </Column>
        </Row>
        <Row pt="2" pb="2" pl="1">
          <Column w="3/6">
            <HStack alignItems="center" justifyContent={"flex-start"}>
              <Image
                ml={1}
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: "https://cdn-team-logos.theathletic.com/cdn-cgi/image/width=1920,format=auto/https://cdn-team-logos.theathletic.com/team-logo-1192-72x72.png",
                }}
              />
              <Text pl="2">Saudi Arabia</Text>
            </HStack>
          </Column>
          <Column w="3/6">
            <HStack pt="0.5">
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
              <Text textAlign="center" w="1/4">
                0
              </Text>
            </HStack>
          </Column>
        </Row>
      </Container>
    </Center>
  );
};

export default GroupTable;
