import React, { memo, useCallback } from "react";
import { Foundation } from "@expo/vector-icons";
import { Player } from "../../store/Matchs/types";
import InsetShadow from "react-native-inset-shadow";
import { Center, Icon, Input, ScrollView, View } from "native-base";
import { nanoid } from "nanoid";
import PlayerEntry from "../../components/PlayerEntry";
import { filter, isEmpty } from "ramda";
import { useEffect } from "react";

type SPlayer = Player & {
  teamName: string;
  teamImg: string;
};

interface OwnProps {
  data: SPlayer[];
  currentIndex?: number;
  onPlayerChanged?: (id: number) => void;
}

type Props = OwnProps;

const PlayersList = ({ data, currentIndex = 0, onPlayerChanged = (id: number) => {} }: Props) => {
  const [players, setPlayers] = React.useState<SPlayer[]>(data ?? []);
  const [selectedPlayerId, setSelectedPlayerId] = React.useState(currentIndex);

  useEffect(() => {
    setSelectedPlayerId(currentIndex);
  }, [currentIndex]);

  const filterPlayers = useCallback((token: string) => {
    let filtered = [];
    if (isEmpty(token)) {
      filtered = data;
    } else {
      filtered = filter((p: SPlayer) => {
        const name = `${p.fullname.split(" ")[0]} ${p.fullname.split(" ")[1]} ${
          p.fullname.split(" ")[2] ?? ""
        }`.toLowerCase();
        return name.includes(token.toLowerCase());
      })(data);
    }

    setPlayers(filtered);
  }, []);

  const onPlayerPressed = (id: number) => {
    setSelectedPlayerId(id);
    onPlayerChanged(id);
  }

  return (
    <Center w="100%" pt="10px" pl="12px" pr="12px" maxHeight="300px">
      <InsetShadow left={false} top={false} right={false} containerStyle={{
        width: '100%',
      }}>
        <Input
          type="text"
          placeholder="Filter..."
          placeholderTextColor="blue.500"
          onChangeText={(value: string) => filterPlayers(value)}
          borderColor="blue.500"
          bgColor="white"
          _input={{ color: "blue.500" }}
          fontSize="16px"
          InputRightElement={
            <Icon
              as={<Foundation name="filter" size={24} color="black" />}
              size={5}
              mr="2"
              color="blue.500"
            />
          }
        />
        <ScrollView w="100%" pt="10px">
          {players.map((p: SPlayer) => (
            <PlayerEntry
              key={nanoid()}
              p={p}
              onClick={() => onPlayerPressed(p.id)}
              selected={selectedPlayerId === p.id}
            />
          ))}
          <View height="50px" />
        </ScrollView>
      </InsetShadow>
    </Center>
  );
};

export default memo(PlayersList);
