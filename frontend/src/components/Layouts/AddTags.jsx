import React, { useMemo } from "react";
import { Chip, TextField, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addTags } from "../../actions/postAction";

const AddTags = () => {
  const [chipsSelected, setChipsSelected] = useState([]);
  const dispatch = useDispatch();

  const { allTags } = useSelector((state) => state.allTags);
  const tags = useMemo(() => { if(allTags !== undefined) return allTags.map((element) => element) })


  useEffect(() => {
    dispatch(addTags(chipsSelected.map((element) => element._id)));
  }, [chipsSelected]);

  const chipsHandler = (tag) => {
    if (!chipsSelected.includes(tag)) setChipsSelected([...chipsSelected, tag]);
  };
  const removeChipsHandler = (tag) => {
    if (chipsSelected.includes(tag)) {
      const index = chipsSelected.findIndex((element) => element === tag);

      if (index > -1) {
        chipsSelected.splice(index, 1);
        setChipsSelected([...chipsSelected]);
      }
    }
  };

  return (
    <div className="flex  flex-wrap gap-2 ">
      {tags.map((tag, index) => {
        return (
            <Chip
              label={tag.name}
              key={index}
              onClick={() => {
                chipsHandler(tag);
              }}
              onDelete={() => {
                removeChipsHandler(tag);
              }}
            />
        );
      })}
      <TextField
        fullWidth
        value={chipsSelected.map((element) => "#" + element.name).join(" ")}
        inputProps={{
          style: {
            height: "0.5rem",
            color: "rgba(91, 6, 74, 0.6)",
            cursor: "default",
          },
          readOnly: true,
        }}
        sx={{
          "& fieldset": {
            border: "none",
          },
        }}
      />
    </div>
  );
};

export default AddTags;
