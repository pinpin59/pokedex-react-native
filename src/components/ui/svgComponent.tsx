import { SvgXml } from "react-native-svg";

type SvgProps = {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: object;
};

const SVG = ({ icon, width, height, color, className, style }: SvgProps) => {
  const coloredIcon = color ? icon.replace(/currentColor/g, color) : icon;

  return (
    <SvgXml
      xml={coloredIcon}
      width={width}
      height={height}
      className={className}
      style={style}
      accessible={false}
    />
  );
};

export default SVG;
