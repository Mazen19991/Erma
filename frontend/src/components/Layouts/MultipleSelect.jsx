import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./MultipleSelect.css";
import { tagsFiltering } from "../../actions/postAction";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ array }) {
  const [checkboxLabel, setCheckboxLabel] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // if (value !== "" && value !== undefined) {
    setCheckboxLabel((state) => {
      return [...state, ...value];
    });
    // }
    console.log("value", value);
    console.log("checkboxLabel", checkboxLabel);
  };
  React.useEffect(() => {
    if (checkboxLabel.length > 0) {
      tagsFiltering();
    }
  }, [checkboxLabel]);

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: "94%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={checkboxLabel.map((item) => {
            return item.name;
          })}
          onChange={(event) => handleChange(event)}
          renderValue={(selected) => selected.join(",")}
          MenuProps={MenuProps}
          variant="standard"
        >
          {array.map(({ name, _id }) => (
            <MenuItem key={_id} value={{ name, id: _id }}>
              <Checkbox checked={checkboxLabel.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
