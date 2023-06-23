import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PetsIcon from "@mui/icons-material/Pets";

export const moreIcons = (
  <svg
    aria-label="More options"
    color="#5b064a"
    fill="#5b064a "
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="6" cy="12" r="1.5"></circle>
    <circle cx="18" cy="12" r="1.5"></circle>
  </svg>
);

export const likeIconOutline = (
  <PetsIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);

export const likeIconFill = (
  <PetsIcon sx={{ fontSize: "1.5em", color: "#d30aa8" }} />
);

export const commentIcon = (
  <CommentOutlinedIcon
    sx={{
      fontSize: "1.5em",
      color: "#5b064a",
    }}
  />
);

export const shareIcon = (
<></>
);

export const saveIconOutline = (
  <BookmarkBorderOutlinedIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);

export const saveIconFill = (
  <BookmarkIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);

export const emojiIcon = (
  <EmojiEmotionsIcon sx={{ fontSize: "1.5em", color: "#5b064a" }} />
);
