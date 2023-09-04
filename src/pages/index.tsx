import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Survey from "./Survey";

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
        <Survey />
      </div>
    </ThemeProvider>
  );
};
export default Home;
