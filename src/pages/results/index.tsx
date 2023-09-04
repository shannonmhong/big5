import { StyledHeader } from "@/components/StyledComponents/StyledHeader";
import { StyledResults } from "@/components/StyledComponents/StyledResults";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { FormDataItem } from "../Survey";
import personalityDescriptions from "../../data/personalityDescriptions.json";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Define interface for personality descriptions - describes structure of json
interface PersonalityDescriptions {
  [trait: string]: {
    low: string;
    moderate: string;
    high: string;
  };
}

interface ResultsProps {
  formData: Record<string, FormDataItem>;
}

type TraitLevel = "low" | "moderate" | "high" | "unknown";

const theme = createTheme({
  typography: {
    fontFamily: "BlinkMacSystemFont, -apple-system, system-ui",
  },
});

const Results: React.FC<ResultsProps> = ({ formData }) => {
  const initialScores: Record<string, number> = {
    O: 8,
    C: 14,
    E: 20,
    A: 14,
    N: 38,
  };
  const [traitScores, setTraitScores] = useState<Record<string, number>>({
    ...initialScores,
  });
  useEffect(() => {
    setTraitScores(calculateTraitScores());
    // make post request here
  }, []);

  interface TraitScoreLevels {
    low: { min: number; max: number };
    moderate: { min: number; max: number };
    high: { min: number; max: number };
  }

  const traitScoreLevels: TraitScoreLevels = {
    low: { min: 0, max: 14 },
    moderate: { min: 15, max: 25 },
    high: { min: 26, max: 40 },
  };

  function getTraitLevel(score: number): TraitLevel {
    const levels = traitScoreLevels;
    for (const level in levels) {
      const range = levels[level as keyof TraitScoreLevels];
      if (score >= range.min && score <= range.max) {
        return level as TraitLevel;
      }
    }

    return "unknown";
  }

  // Calculate the trait scores based on formData
  const calculateTraitScores = () => {
    const traitScores: Record<string, number> = { ...initialScores };

    // Loop through formData and update trait scores
    for (const key in formData) {
      const item = formData[key];
      if (item.sign === "plus") {
        traitScores[item.trait] += parseInt(item.value, 10);
      } else if (item.sign === "minus") {
        traitScores[item.trait] -= parseInt(item.value, 10);
      }
    }

    // Ensure scores are within the 0-40 range
    for (const trait in traitScores) {
      if (traitScores[trait] < 0) {
        traitScores[trait] = 0;
      } else if (traitScores[trait] > 40) {
        traitScores[trait] = 40;
      }
    }

    return traitScores;
  };

  const OLevel: TraitLevel = getTraitLevel(traitScores.O);
  const CLevel: TraitLevel = getTraitLevel(traitScores.C);
  const ELevel: TraitLevel = getTraitLevel(traitScores.E);
  const ALevel: TraitLevel = getTraitLevel(traitScores.A);
  const NLevel: TraitLevel = getTraitLevel(traitScores.N);

  // gets corresponding trait description through parsing json
  function getTraitDescription(trait: string, level: TraitLevel): string {
    const traitKey = trait as keyof typeof personalityDescriptions;
    const traitDescriptions = personalityDescriptions[traitKey] as Record<
      TraitLevel,
      string
    >;

    if (traitDescriptions) {
      return traitDescriptions[level] || "Description not found";
    }
    return "Trait not found";
  }

  // Asynchronously load the full particles.js library
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Render the particles animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            shape: {
              type: "circle",
            },
            size: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 2,
            },
            color: {
              value: "#f1f1f1",
            },
            number: {
              density: {
                enable: true,
                area: 1080,
              },
              limit: 0,
              value: 700,
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.5,
                speed: 2,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 0.1,
              },
              value: 1,
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                resize: true,
              },
            },
          },
        }}
      />
      <div>
        <style jsx global>
          {`
            body {
              margin: 0;
            }
            html {
              font-family: BlinkMacSystemFont, -apple-system, system-ui,
                sans-serif;
            }
          `}
        </style>
        <StyledResults>
          <div>
            <h1 style={{ color: "lightgray" }}>
              Your Personality Trait Scores
            </h1>
            <p style={{ color: "darkgray" }}>
              This Big Five assessment measures your scores on five major
              dimensions of personality: Openness, Conscientiousness,
              Extraversion, Agreeableness, and Neuroticism.
            </p>
          </div>
          <div
            style={{
              width: "70%",
              height: "60%",
              backgroundColor: "lightgray",
              opacity: ".7",
              position: "relative",
              left: "100px",
              top: "20px",
              overflow: "scroll",
              borderRadius: "8px",
              padding: "20px",
              zIndex: "950",
            }}
          >
            <div style={{ paddingBottom: "20px" }}>
              <h2>Openness (O) </h2>
              <p style={{ fontStyle: "italic", fontWeight: "600" }}>
                {traitScores.O} - {OLevel}
              </p>
              {getTraitDescription("O", OLevel)}
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <h2>Conscientiousness (C)</h2>
              <p style={{ fontStyle: "italic", fontWeight: "600" }}>
                {traitScores.C} - {getTraitLevel(traitScores.C)}
              </p>
              {getTraitDescription("C", CLevel)}
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <h2>Extraversion (E)</h2>
              <p style={{ fontStyle: "italic", fontWeight: "600" }}>
                {traitScores.E} - {getTraitLevel(traitScores.E)}
              </p>
              {getTraitDescription("E", ELevel)}
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <h2>Agreeableness (A)</h2>
              <p style={{ fontStyle: "italic", fontWeight: "600" }}>
                {traitScores.A} - {getTraitLevel(traitScores.A)}
              </p>
              {getTraitDescription("A", ALevel)}
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <h2>Neuroticism (N)</h2>
              <p style={{ fontStyle: "italic", fontWeight: "600" }}>
                {traitScores.N} - {getTraitLevel(traitScores.N)}
              </p>
              {getTraitDescription("N", NLevel)}
            </div>
          </div>
          <StyledHeader>Big Five</StyledHeader>
        </StyledResults>
      </div>
    </ThemeProvider>
  );
};
export default Results;
