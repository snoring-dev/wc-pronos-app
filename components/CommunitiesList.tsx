import { format, parseISO } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  FlatList,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { take } from "ramda";
import { showMessage } from "react-native-flash-message";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { User } from "../store/Auth/types";
import { Community } from "../store/community/types";

interface Props {
  marginTop?: number | string;
  width?: number | string;
  data?: Community[];
  refreshAction?: () => void;
  onListItemClicked?: (community: Community) => void;
}

const CommunitiesList = ({
  marginTop,
  width,
  data = [],
  refreshAction = () => {},
  onListItemClicked = () => {},
}: Props) => {
  const copyToClipboard = (code: string) => {
    Clipboard.setString(code);
  };

  return (
    <Box
      marginTop={marginTop}
      marginLeft="auto"
      marginRight="auto"
      width={width}
      alignItems="center"
      justifyContent="center"
    >
      <FlatList
        width="100%"
        height="100%"
        data={data}
        renderItem={({ item }) => (
          <Pressable onPress={() => onListItemClicked(item)}>
            <Box
              bgColor="white"
              paddingLeft={2}
              paddingTop={5}
              paddingBottom={5}
              paddingRight={2}
              py="2"
              mb="3"
              borderRadius={10}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <HStack width={48 * 3} position="relative">
                  {take(4, item?.users ?? [])?.map((u: User, index: number) => (
                    <Avatar
                      position="absolute"
                      borderColor="white"
                      borderWidth={1}
                      key={u.id}
                      size="48px"
                      left={String(index * 8)}
                      source={{
                        uri: u.profile.picture.formats.thumbnail.url,
                      }}
                    />
                  ))}
                </HStack>
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(parseISO(item.createdAt), "dd MMM yyyy")}
                  </Text>
                </VStack>
                <Spacer />
                <Button
                  borderRadius={100}
                  backgroundColor="blue.200"
                  startIcon={
                    <AntDesign name="addusergroup" size={20} color="white" />
                  }
                  onPress={() => {
                    copyToClipboard(item.access_code);
                    showMessage({
                      message: "Access code copied to your clipboard",
                      type: "info",
                    });
                  }}
                />
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};

export { CommunitiesList };
