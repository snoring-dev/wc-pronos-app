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
import { Group, Table } from "../../store/Tournament/types";

interface Props {
  data: Group;
}

const GroupTable = ({ data }: Props) => {
  return (
    <Center mb={5}>
      <Container backgroundColor="white" borderRadius={8} shadow="1">
        <Row backgroundColor="cyan.100" padding={2} borderTopRadius={8}>
          <Column w="3/6">
            <Text bold>Group {data.label}</Text>
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
        {data.table.map((t: Table, index: number) => (
          <Row
            pt="2"
            pb="2"
            pl="1"
            borderBottomWidth={index < data.table.length - 1 ? 1 : 0}
            borderBottomColor={"gray.100"}
          >
            <Column w="3/6">
              <HStack alignItems="center" justifyContent={"flex-start"}>
                <Image
                  ml={1}
                  alt="flag"
                  width={7}
                  height={7}
                  source={{
                    uri: t.team.badge,
                  }}
                />
                <Text pl="2">{t.team.name}</Text>
              </HStack>
            </Column>
            <Column w="3/6">
              <HStack pt="0.5">
                <Text textAlign="center" w="1/4">
                  {t.wins}
                </Text>
                <Text textAlign="center" w="1/4">
                  {t.draws}
                </Text>
                <Text textAlign="center" w="1/4">
                  {t.losses}
                </Text>
                <Text textAlign="center" w="1/4">
                  {t.points}
                </Text>
              </HStack>
            </Column>
          </Row>
        ))}
      </Container>
    </Center>
  );
};

export default GroupTable;
