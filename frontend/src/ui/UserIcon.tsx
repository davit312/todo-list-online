import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { stringAvatarProps } from "../utils/stringAvatarProps";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

const USERNAME = "Davit Babayan";

export default function UserIcon() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <div>
      <span
        style={{ cursor: "pointer" }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <Avatar {...stringAvatarProps(USERNAME)} />
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ maxWidth: "100%" }}>
          <Typography sx={{ paddingX: 5, pt: 2, pb: 1 }}>
            <strong>{USERNAME}</strong>
          </Typography>
          <Divider />
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}
