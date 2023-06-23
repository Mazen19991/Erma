import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import PetsIcon from "@mui/icons-material/Pets";

export const searchIcon = (
  <svg
    aria-label="Search"
    color="#5b064a"
    fill="#5b064a"
    height="16"
    role="img"
    viewBox="0 0 24 24"
    width="16"
  >
    <path
      d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="16.511"
      x2="22"
      y1="16.511"
      y2="22"
    ></line>
  </svg>
);

export const homeOutline = (
  <svg
    aria-label="Home"
    color="#5b064a"
    fill="#5b064a"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
export const homeFill = (
  <svg
    aria-label="Home"
    color="#5b064a"
    fill="#5b064a"
      height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
  </svg>
);

export const messageOutline = (
  <MarkUnreadChatAltOutlinedIcon sx={{ fontSize: "1.8em", color: "#5b064a"}} />
);
export const messageFill = (
  <MarkUnreadChatAltIcon sx={{ fontSize: "1.8em", color: "#5b064a" }} />
);

export const exploreOutline = (
  <svg
    aria-label="Find People"
    color="#5b064a"
    fill="#5b064a"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <polygon
      fill="none"
      points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
    <polygon
      fillRule="evenodd"
      points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
    ></polygon>
    <circle
      cx="12.001"
      cy="12.005"
      fill="none"
      r="10.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></circle>
  </svg>
);

export const likeFill = (
  <PetsIcon sx={{ fontSize: "1.5em", color: "#d30aa8" }} />
);

export const likeOutline = (
  <PetsIcon sx={{ fontSize: "1.5em", color: "#d30aa8" }} />
);

export const postUploadOutline = (
  <AddCircleOutlineIcon sx={{ color: "#5b064a", fontSize: "2em"}} />
);

export const profileIcon = (
  <AccountCircleIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);
export const savedIcon = (
  <BookmarkIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);
export const settingsIcon = (
  <SettingsIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);
export const switchAccountIcon = (
  <SwitchAccountIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);
