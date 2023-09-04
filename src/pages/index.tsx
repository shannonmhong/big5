import React from "react";
import Survey from "./Survey";

const Home: React.FC = () => {
  return (
    <div>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <Survey />
    </div>
  );
};
export default Home;
