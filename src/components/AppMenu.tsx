import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

function AppMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route: string) => {
    if (route) {
      router.push(route);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <button
        id="basic-button"
        ref={anchorRef}
        style={{
          position: "fixed",
          top: "50px",
          right: "100px",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("/admin")}>
          <FontAwesomeIcon
            style={{ paddingRight: "5px" }}
            icon={faSquarePollVertical}
          />
          Admin Dashboard
        </MenuItem>
        <MenuItem onClick={() => handleClose("/")}>
          <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faHouse} />
          Take Quiz
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AppMenu;
