import React from "react";
import { Chip, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TAGS_FILTERING } from "../../constants/postConstants";

const AddTags = () => {
  const [tagsArray, setTagsArray] = useState([]);
  const [chipsSelected, setChipsSelected] = useState([]);

  const { tags } = useSelector((state) => state.postOfFollowing);

  useEffect(() => {
    if (tags !== undefined) {
      console.log("tags", tags);
      setTagsArray(tags);
    }
  }, [tags]);

  const chipsHandler = (tag) => {
    if (!chipsSelected.includes(tag)) setChipsSelected([...chipsSelected, tag]);
    console.log(chipsSelected);
  };
  const removeChipsHandler = (tag) => {
    if (chipsSelected.includes(tag)) {
      const index = chipsSelected.findIndex((element) => element === tag);
      console.log(index);
      if (index > -1) {
        chipsSelected.splice(index, 1);
        setChipsSelected([...chipsSelected]);
      }
      console.log(chipsSelected);
    }
  };

  return (
    <div className="flex  gap-3 justify-between">
      {tagsArray.map(({ name, _id }) => {
        return (
          <>
            <Chip
              label={name}
              key={_id}
              onClick={() => {
                chipsHandler(name);
              }}
              onDelete={() => {
                removeChipsHandler(name);
              }}
            />
          </>
        );
      })}
      {
        chipsSelected
      }
    </div>
  );
};

export default AddTags;
