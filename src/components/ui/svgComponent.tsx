import { SvgXml } from "react-native-svg";

type SvgProps = {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: object;
  strokeWidth?: number;
};

const SVG = ({
  icon,
  width,
  height,
  color,
  className,
  style,
  strokeWidth,
}: SvgProps) => {
  const coloredIcon = color
    ? icon
        .replace(/fill="[^"]*"/g, `fill="${color}"`)
        .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
        .replace(/fill:\s*[^;"]+/g, `fill: ${color}`)
        .replace(/stroke:\s*[^;"]+/g, `stroke: ${color}`)
    : icon;

  const styledIcon = strokeWidth
    ? coloredIcon.replace(
        /stroke-width="[^"]*"/g,
        `stroke-width="${strokeWidth}"`,
      )
    : coloredIcon;
  return (
    <SvgXml
      xml={styledIcon}
      width={width}
      height={height}
      className={className}
      style={style}
      strokeWidth={strokeWidth}
    />
  );
};

export default SVG;
