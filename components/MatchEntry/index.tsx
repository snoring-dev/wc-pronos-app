import React from "react";
import { Center, HStack, Image, Pressable, Text, View } from "native-base";
import { Container, LiveLabel } from "./styles";
import { Match } from "../../store/Matchs/types";
import format from "date-fns/format";
import { parseISO } from "date-fns";

interface Props {
  data: Match;
  onClick?: any;
}

const MatchEntry = ({ data, onClick = () => {} }: Props) => {
  const { is_live = false } = data;
  return (
    <Pressable onPress={onClick}>
      <Container>
        {is_live && (
          <LiveLabel>
            <Text bold fontSize="xs" textTransform="uppercase" color={"white"}>
              live
            </Text>
          </LiveLabel>
        )}
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
              {format(parseISO(data.played_at), "d LLL, HH:mm")}
            </Text>
          </View>
        </Center>
        <Center mt={3} mb={3}>
          <HStack alignItems={"center"}>
            <HStack alignItems={"center"}>
              <Text color={"black"} pr={2} fontWeight="semibold" fontSize="16">
                {data.left_side.country_code}
              </Text>
              <Image
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: data.left_side.badge,
                }}
              />
            </HStack>
            <View pl={3} pr={3}>
              <Text fontSize="xl" color="#8a8d95">
                {data.final_score_string}
              </Text>
            </View>
            <HStack alignItems={"center"}>
              <Image
                alt="flag"
                width={7}
                height={7}
                source={{
                  uri: data.right_side.badge,
                }}
              />
              <Text color={"black"} pl={2} fontWeight="semibold" fontSize="16">
                {data.right_side.country_code}
              </Text>
            </HStack>
          </HStack>
        </Center>
        <Center mb={3}>
          <Text fontSize="15" color="#8a8d95">
            {data.title}
          </Text>
        </Center>
      </Container>
    </Pressable>
  );
};

export default MatchEntry;
