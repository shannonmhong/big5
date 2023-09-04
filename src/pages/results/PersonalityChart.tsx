import React from "react";
import Plot from "react-plotly.js";

interface PersonalityChartProps {
  traitScores: number[];
}

const PersonalityChart: React.FC<PersonalityChartProps> = ({ traitScores }) => {
  const chartData = {
    x: [
      "Openness",
      "Conscientiousness",
      "Extraversion",
      "Agreeableness",
      "Neuroticism",
    ],
    y: traitScores,
    type: "bar" as const,
  };

  return (
    <div style={{ height: "300px", width: "500px" }}>
      <Plot
        data={[chartData]}
        layout={{
          title: "Personality Scores",
          xaxis: {
            title: "Traits",
          },
          yaxis: {
            title: "Scores",
            zeroline: false,
            range: [0, 100],
          },
        }}
      />
    </div>
  );
};

export default PersonalityChart;
