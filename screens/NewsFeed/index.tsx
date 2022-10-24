import { View, Text } from "react-native";
import React from "react";
import CenteredImage from "../../components/CenteredImage";
import { AllGroups } from "./styles";
import GroupTable from "../../components/GroupTable";
import { ScrollView } from "native-base";

const NewsFeed = () => {
  return (
    <ScrollView>
      <CenteredImage
        isSvg
        source="https://res.cloudinary.com/dfvv4obnz/image/upload/v1665942273/2022_FIFA_World_Cup_yooqkp.svg"
      />
      <AllGroups>
        <GroupTable />
        <GroupTable />
        <GroupTable />
        <GroupTable />
      </AllGroups>
    </ScrollView>
  );
};

export default NewsFeed;
