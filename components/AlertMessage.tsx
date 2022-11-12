import React, { ReactElement } from "react";
import {
  Alert,
  VStack,
  HStack,
  Box,
  Heading,
} from "native-base";

interface Props {
    status: string;
    message: string | ReactElement;
    title: string;
    bold?: boolean;
}

const AlertMessage = ({ status, title, message, bold = false }: Props) => {
  return (
    <Alert status={status} shadow={1} maxW="400" w="100%" colorScheme={status}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Heading bold={bold} fontSize="md" fontWeight="medium" color="coolGray.800">
              {title}
            </Heading>
          </HStack>
        </HStack>
        <Box
          pl="6"
          _text={{
            color: "coolGray.600",
          }}
        >
          {message}
        </Box>
      </VStack>
    </Alert>
  );
};

export { AlertMessage };
