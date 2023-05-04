import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "500" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Listings"
        icon={<FormatListBulletedOutlinedIcon />}
        onClick={() => navigate("/yourlistings")}
      />
      <BottomNavigationAction
        label="Bookings"
        icon={<CheckBoxOutlinedIcon />}
        onClick={() => navigate("/yourbookings")}
      />
      <BottomNavigationAction
        label="Search"
        icon={<SearchOutlinedIcon />}
        onClick={() => navigate("/listings")}
      />
      {/* <BottomNavigationAction 
        label="Chat" 
        icon={<MessageOutlinedIcon />} 
      /> */}
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleOutlinedIcon />}
        onClick={() => navigate("/profile")}
      />
    </BottomNavigation>
  );
}
