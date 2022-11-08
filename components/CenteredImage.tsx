import { Center, Image } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

interface Props {
  source: string;
  alt?: string;
  size?: string;
  isSvg?: boolean;
  w?: number;
  h?: number;
}

const CenteredImage = ({
  source,
  alt = "",
  size = "xl",
  isSvg = false,
  w = 130,
  h = 130,
}: Props): React.ReactElement => {
  const wh = size === "m" ? "70%" : "100%";
  return (
    <Center>
      {!isSvg && (
        <Image
          source={{
            uri: source,
          }}
          alt={alt}
          size={size}
        />
      )}
      {isSvg && (
        <SvgUri
          uri={source}
          width={`${w}px`}
          height={`${h}px`}
          style={{ marginTop: 15, marginBottom: 15 }}
        />
      )}
    </Center>
  );
};

export default CenteredImage;
