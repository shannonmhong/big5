import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Survey from "./Survey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AppMenu from "@/components/AppMenu";

const theme = createTheme({
  typography: {
    fontFamily: "BlinkMacSystemFont, -apple-system, system-ui",
  },
});

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <style jsx global>
          {`
            body {
              margin: 0;
            }
            html {
              font-family: "San Francisco", BlinkMacSystemFont, -apple-system,
                system-ui, sans-serif;
            }
          `}
        </style>
        <AppMenu />
        <Survey />
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </ThemeProvider>
  );
};
export default Home;
