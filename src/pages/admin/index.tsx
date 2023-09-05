import AppMenu from "@/components/AppMenu";
import { StyledHeader } from "@/components/StyledComponents/StyledHeader";
import { StyledResults } from "@/components/StyledComponents/StyledResults";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState, useEffect, ChangeEvent } from "react";
import Plot from "react-plotly.js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const theme = createTheme({
  typography: {
    fontFamily: "BlinkMacSystemFont, -apple-system, system-ui",
  },
});

interface PersonalityResult {
  OpennessScore: number;
  ConscientiousnessScore: number;
  ExtraversionScore: number;
  AgreeablenessScore: number;
  NeuroticismScore: number;
}

// Define a mapping of trait keys to trait names
const traitNameMap: Record<string, string> = {
  OpennessScore: "Openness Score",
  ConscientiousnessScore: "Conscientiousness Score",
  ExtraversionScore: "Extraversion Score",
  AgreeablenessScore: "Agreeableness Score",
  NeuroticismScore: "Neuroticism Score",
};

const AdminPage: React.FC = () => {
  const [data, setData] = useState<Plotly.Data[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<string>("OpennessScore");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch PersonalityResults data using a GET request
        const response = await fetch("/api/personalityResults");
        const resultsData: Record<string, PersonalityResult[]> =
          await response.json();

        const results = resultsData.results;

        if (response.status === 404) {
          throw new Error("Results do not exist.");
        }

        // Extract the relevant data for visualization
        const selectedTraitScores = results.map(
          (result) => (result as any)[selectedTrait]
        );

        // Define a color scheme for the traits
        const colorScheme = {
          OpennessScore: "blue",
          ConscientiousnessScore: "green",
          ExtraversionScore: "red",
          AgreeablenessScore: "purple",
          NeuroticismScore: "orange",
        };

        // Create histogram data
        const histogramData: Plotly.Data[] = [
          {
            x: selectedTraitScores,
            type: "histogram",
            name: traitNameMap[selectedTrait],
            marker: {
              color: (colorScheme as any)[selectedTrait],
            },
          },
        ];

        setData(histogramData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [selectedTrait]);

  const handleTraitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrait(event.target.value);
  };

  // Asynchronously load the full particles.js library
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <ThemeProvider theme={theme}>
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
        <AppMenu />
        <div>
          <h2 style={{ color: "lightgray" }}>Admin Dashboard</h2>
          <div
            style={{
              width: "70%",
              height: "60%",
              backgroundColor: "#debfb4",
              opacity: ".8",
              position: "relative",
              left: "100px",
              top: "20px",
              overflow: "scroll",
              borderRadius: "8px",
              padding: "20px",
              zIndex: "950",
            }}
          >
            <div style={{ width: "800px", margin: "0 auto" }}>
              <label>Select Trait: </label>
              <select value={selectedTrait} onChange={handleTraitChange}>
                <option value="OpennessScore">Openness</option>
                <option value="ConscientiousnessScore">
                  Conscientiousness
                </option>
                <option value="ExtraversionScore">Extraversion</option>
                <option value="AgreeablenessScore">Agreeableness</option>
                <option value="NeuroticismScore">Neuroticism</option>
              </select>
              <Plot
                data={data}
                layout={{
                  title: `${traitNameMap[selectedTrait]} Distribution`,
                  xaxis: {
                    title: traitNameMap[selectedTrait],
                  },
                  yaxis: {
                    title: "Frequency",
                  },
                }}
              />
            </div>
            <p>
              The histogram above displays the distribution of scores for the
              selected personality trait. Each bar represents a range of scores,
              and the height of each bar represents the frequency or number of
              individuals who received scores within that range. This
              visualization allows us to see how the scores are distributed
              across the surveyed population for the chosen trait, providing
              insights into the personality trait's prevalence and variation
              within the group.
            </p>
          </div>
        </div>
        <StyledHeader>Big Five</StyledHeader>
      </StyledResults>
    </ThemeProvider>
  );
};

export default AdminPage;
