import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const CircleInfoIcon = (props) => (
  <FontAwesome6 name="circle-info" size={24} color="white" {...props} />
);

export const HomeIcon = (props) => (
  <FontAwesome name="home" size={32} color="white" {...props} />
);

export const InfoIcon = (props) => (
  <FontAwesome name="info" size={32} color="white" {...props} />
);

export const DownloadIcon = (props) => (
  <FontAwesome name="cloud-download" size={32} color="white" {...props} />
);

export const AndroidIcon = (props) => (
  <FontAwesome name="android" size={30} color="white" {...props} />
);

export const NoteIcon = (props) => (
  <FontAwesome name="sticky-note" size={32} color="white" {...props} />
);

export const CloudIcon = (props) => (
  <FontAwesome name="cloud" size={32} color="white" {...props} />
);

export const ArchiveIcon = (props) => (
  <FontAwesome name="archive" size={32} color="white" {...props} />
);

export const NavIcon = (props) => (
  <FontAwesome name="navicon" size={32} color="white" {...props} />
);

export const BackIcon = (props) => (
  <FontAwesome6 name="arrow-left" size={32} color="white" {...props} />
);

export const ReloadIcon = (props) => (
  <FontAwesome name="refresh" size={32} color="white" {...props} />
);

export const BoxArchiveIcon = (props) => (
  <FontAwesome6 name="box-archive" size={24} color="black" {...props} />
);

export const PlaneIcon = (props) => (
  <FontAwesome6 name="paper-plane" size={24} color="black" {...props} />
);

export const ShareIcon = (props) => (
  <FontAwesome6 name="share-nodes" size={24} color="black" {...props} />
);

export const ListIcon = ({ type = 0, ...props }) => {
  switch (type) {
    case 1:
      return <FontAwesome name="th-list" size={24} color="black" {...props} />;
    case 2:
      return <FontAwesome name="th-large" size={24} color="black" {...props} />;
    case 3:
      return <FontAwesome name="th" size={24} color="black" {...props} />;
    default:
      return <FontAwesome name="list" size={24} color="black" {...props} />;
  }
};

export const FolderIcon = ({ isOpen = false, ...props }) => (
  <FontAwesome6 name={isOpen ? "folder-open" : "folder"} size={24} color="black" {...props} />
);

export const TrashIcon = ({ isDeleted = false, ...props }) => (
  <FontAwesome6 name={isDeleted ? "trash-arrow-up" : "trash-alt"} size={24} color="black" {...props} />
);

// Notes

export const PlusIcon = (props) => (
  <FontAwesome name="plus" size={25} color="white" {...props} />
);

export const CirclePlusIcon = (props) => (
  <FontAwesome6 name="circle-plus" size={25} color="white" {...props} />
);

export const DelIcon = (props) => (
  <FontAwesome name="trash-o" size={25} color="white" {...props} />
);

export const EditIcon = (props) => (
  <FontAwesome6 name="pen" size={18} color="white" {...props} /> // edit / pen
);

export const ConfirmIcon = (props) => (
  <FontAwesome name="check" size={25} color="white" {...props} />
);

export const EllipsisIcon = (props) => (
  <FontAwesome6 name="ellipsis-vertical" size={22} color="white" {...props} />
);

export const FavoriteIcon = ({ isFav, ...props }) => (
  <FontAwesome name={isFav ? "star" : "star-o"} size={20} color="white" {...props} />
);

export const CancelIcon = (props) => (
  <FontAwesome name="close" size={28} color="white" {...props} />
);
