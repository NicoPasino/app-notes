import Svg, { Path } from "react-native-svg";
import { FA4, FA6 } from "./iconsData";

function IconShape({ icon, size, color, ...props }) {
  return (
    <Svg width={size} height={size} viewBox={icon.viewBox} {...props}>
      {icon.paths.map((p, i) => (
        <Path
          key={i}
          d={p.d}
          fill={color}
          fillRule={p.fillRule}
          transform={p.transform}
        />
      ))}
    </Svg>
  );
}

const makeIcon = (name, icon, size, color) => {
  const Component = (props) => (
    <IconShape icon={icon} size={size} color={color} {...props} />
  );
  Component.displayName = name;
  return Component;
};

export const CircleInfoIcon = makeIcon(
  "CircleInfoIcon",
  FA6.circleInfo,
  24,
  "white",
);

export const HomeIcon = makeIcon("HomeIcon", FA4.home, 32, "white");

export const InfoIcon = makeIcon("InfoIcon", FA4.info, 32, "white");

export const DownloadIcon = makeIcon(
  "DownloadIcon",
  FA4.cloudDownload,
  32,
  "white",
);

export const AndroidIcon = makeIcon("AndroidIcon", FA4.android, 30, "white");

export const NoteIcon = makeIcon("NoteIcon", FA4.stickyNote, 32, "white");

export const CloudIcon = makeIcon("CloudIcon", FA4.cloud, 32, "white");

export const ArchiveIcon = makeIcon("ArchiveIcon", FA4.archive, 32, "white");

export const NavIcon = makeIcon("NavIcon", FA4.navicon, 32, "white");

export const BackIcon = makeIcon("BackIcon", FA6.arrowLeft, 32, "white");

export const ReloadIcon = makeIcon("ReloadIcon", FA4.refresh, 32, "white");

export const BoxArchiveIcon = makeIcon(
  "BoxArchiveIcon",
  FA6.boxArchive,
  24,
  "black",
);

export const PlaneIcon = makeIcon("PlaneIcon", FA6.paperPlane, 24, "black");

export const ShareIcon = makeIcon("ShareIcon", FA6.shareNodes, 24, "black");

const LIST_VARIANTS = { 1: FA4.thList, 2: FA4.thLarge, 3: FA4.th };

export const ListIcon = ({ type = 0, ...props }) => (
  <IconShape
    icon={LIST_VARIANTS[type] ?? FA4.list}
    size={24}
    color="black"
    {...props}
  />
);

export const FolderIcon = ({ isOpen = false, ...props }) => (
  <IconShape
    icon={isOpen ? FA6.folderOpen : FA6.folder}
    size={24}
    color="black"
    {...props}
  />
);

export const TrashIcon = ({ isDeleted = false, ...props }) => (
  <IconShape
    icon={isDeleted ? FA6.trashArrowUp : FA6.trashCan}
    size={24}
    color="black"
    {...props}
  />
);

// Notes

export const PlusIcon = makeIcon("PlusIcon", FA4.plus, 25, "white");

export const CirclePlusIcon = makeIcon(
  "CirclePlusIcon",
  FA6.circlePlus,
  25,
  "white",
);

export const DelIcon = makeIcon("DelIcon", FA4.trashO, 25, "white");

export const EditIcon = makeIcon("EditIcon", FA6.pen, 18, "white");

export const ConfirmIcon = makeIcon("ConfirmIcon", FA4.check, 25, "white");

export const EllipsisIcon = makeIcon(
  "EllipsisIcon",
  FA6.ellipsisVertical,
  22,
  "white",
);

export const FavoriteIcon = ({ isFav, ...props }) => (
  <IconShape
    icon={isFav ? FA4.star : FA4.starO}
    size={20}
    color="white"
    {...props}
  />
);

export const LockIcon = makeIcon("LockIcon", FA4.lock, 20, "white");

export const UnlockIcon = makeIcon("UnlockIcon", FA4.unlockAlt, 20, "white");

export const CancelIcon = makeIcon("CancelIcon", FA4.close, 28, "white");

export const SearchIcon = makeIcon("SearchIcon", FA4.search, 32, "white");
