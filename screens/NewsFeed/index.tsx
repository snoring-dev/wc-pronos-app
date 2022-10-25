import { View, Text } from "react-native";
import React from "react";
import CenteredImage from "../../components/CenteredImage";
import { AllGroups } from "./styles";
import GroupTable from "../../components/GroupTable";
import { ScrollView } from "native-base";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Group, TournamentState } from "../../store/Tournament/types";

interface OwnProps {
  tournament: TournamentState;
}

const NewsFeed = ({ tournament }: OwnProps) => {
  return (
    <ScrollView>
      <CenteredImage
        isSvg
        source="https://res.cloudinary.com/dfvv4obnz/image/upload/v1665942273/2022_FIFA_World_Cup_yooqkp.svg"
      />
      <AllGroups>
        {tournament.groups?.map((gr: Group) => (
          <GroupTable key={`grp-${gr.id}`} data={gr} />
        ))}
      </AllGroups>
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  tournament: state?.tournament ?? null,
});

export default connect(mapStateToProps)(NewsFeed);
