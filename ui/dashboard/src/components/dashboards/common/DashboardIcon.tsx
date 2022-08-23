import Icon from "../../Icon";
import Text from "react-svg-text";
import { classNames } from "../../../utils/styles";

interface DashboardIconProps {
  className?: string;
  icon?: string | null;
}

interface DashboardHeroIconProps extends DashboardIconProps {
  icon: string;
}

const getIconType = (icon) => {
  // This gets parsed as a URL if we don't check first
  if (
    icon.startsWith("heroicons-outline:") ||
    icon.startsWith("heroicons-solid:")
  ) {
    return "icon";
  }

  // Same for text - this gets parsed as a URL if we don't check first
  if (icon.startsWith("text:")) {
    return "text";
  }

  // If it looks like a URL, treat it like a URL
  try {
    new URL(icon);
    return "url";
  } catch {}

  // Else fall back to hero icons
  return "icon";
};

const DashboardImageIcon = ({ className, icon }) => (
  <img className={className} src={icon} alt="" />
);

const DashboardHeroIcon = ({ className, icon }: DashboardHeroIconProps) => (
  <Icon className={className} icon={icon} />
);

const DashboardTextIcon = ({ className, icon }: DashboardHeroIconProps) => (
  <svg className={classNames("h-full w-full font-sans text-center", className)}>
    <Text scaleToFit textAnchor="start" verticalAnchor="start">
      {icon.substring(5)}
    </Text>
  </svg>
);

const DashboardIcon = ({ className, icon }: DashboardIconProps) => {
  if (!icon) {
    return null;
  }
  // First work out the type of the provided icon
  const iconType = getIconType(icon);

  switch (iconType) {
    case "icon":
      return <DashboardHeroIcon className={className} icon={icon} />;
    case "text":
      return <DashboardTextIcon className={className} icon={icon} />;
    case "url":
      return <DashboardImageIcon className={className} icon={icon} />;
    default:
      return null;
  }
};

export default DashboardIcon;