import { Center, Text, VStack } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingView = () => {
  return (
    <Center width={"100%"} height="100%">
      <VStack>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            backgroundColor: "transparent",
          }}
          source={require("./loading.json")}
        />
        <Text
          textTransform="uppercase"
          textAlign="center"
          color="indigo.700"
          fontSize="12px"
        >
          Wait a moment...
        </Text>
      </VStack>
    </Center>
  );
};

export default LoadingView;
