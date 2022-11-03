import React from "react";
import { HStack, Image, Pressable, Text, View, VStack } from "native-base";
import { Player } from "../store/Matchs/types";

type SPlayer = Player & {
  teamName: string;
  teamImg: string;
};

interface Props {
  p: SPlayer;
  selected?: boolean;
  onClick?: () => void;
}

const PlayerEntry = ({ p, selected = false, onClick = () => {} }: Props) => {
  const { media } = p;
  const playerImg =
    media?.length > 0 && media[0]
      ? media[0]?.url
      : `https://res.cloudinary.com/dfvv4obnz/image/upload/v1667407597/607445_cdhozi.png`;
  return (
    <Pressable onPress={onClick}>
      <HStack
        bgColor="white"
        w="100%"
        borderRadius="5"
        mt="3px"
        mb="3px"
        borderColor={selected ? "blue.500" : "gray.100"}
        borderWidth={selected ? "2px" : "1px"}
        p="8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack justifyContent="center" alignItems="center">
          <Image
            source={{
              uri: playerImg,
            }}
            height="40px"
            width="40px"
            borderRadius="100"
            alt={p.fullname}
            resizeMode="cover"
            resizeMethod="resize"
          />
          <VStack pl="15px" justifyContent="center" alignItems="flex-start">
            <Text>
              {p.fullname.split(" ")[0]} {p.fullname.split(" ")[1]}{" "}
              {p.fullname.split(" ")[2] ?? ""}
            </Text>
            <HStack justifyContent="center" alignItems="center">
              <Text fontSize="10px" textTransform="uppercase" color="blue.500">
                Shirt Number:
              </Text>
              <View
                borderWidth="1px"
                borderColor="blue.500"
                borderRadius="5px"
                marginLeft="5px"
                size="18px"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="9px" color="blue.500">
                  {Number(p?.shirt_number ?? 0) < 10
                    ? `0${Number(p.shirt_number)}`
                    : Number(p.shirt_number)}
                </Text>
              </View>
            </HStack>
          </VStack>
        </HStack>

        <HStack justifyContent="center" alignItems="center">
          <Text fontWeight="semibold" fontSize="14" color="black" pr="5px">
            {p.teamName}
          </Text>
          <Image
            alt={p.teamName}
            height="20px"
            width="30px"
            source={{ uri: p?.teamImg }}
            borderRadius="5px"
          />
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default PlayerEntry;
