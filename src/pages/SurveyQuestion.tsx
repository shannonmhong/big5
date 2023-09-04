import styled from "@emotion/styled";
import {
  css,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Flashing from "../components/Flashing";
import { animatedStyles } from "../styles/responsiveStyles";

interface AnimatedGridProps {
  isAppearing: boolean;
}

const AnimatedGrid = styled(Grid)<AnimatedGridProps>`
  ${(props) => animatedStyles(props.isAppearing)};
`;

interface SurveyQuestionProps {
  question: string;
  name: string;
  onValueChange: (value: string) => void;
  selectedValue: string | undefined;
  isFlashing: boolean;
  isAppearing: boolean;
  shouldNotAnimate: boolean;
  showAnimation: boolean;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  name,
  onValueChange,
  selectedValue,
  isAppearing,
  isFlashing,
  shouldNotAnimate,
  showAnimation,
}) => {
  const { control } = useFormContext();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const content = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              aria-label={name}
              name={name}
              value={selectedValue || ""}
              onChange={handleRadioChange}
              style={{
                display: "flex",
                justifyContent: "space-between",
                // borderRadius: "6px",
              }}
            >
              <Flashing isFlashing={selectedValue === "1" && isFlashing}>
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 32,
                        },
                      }}
                    />
                  }
                  label="Strongly Disagree"
                  labelPlacement="bottom"
                />
              </Flashing>
              <Flashing isFlashing={selectedValue === "2" && isFlashing}>
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="     "
                  labelPlacement="bottom"
                />
              </Flashing>
              <Flashing isFlashing={selectedValue === "3" && isFlashing}>
                <FormControlLabel
                  value="3"
                  control={<Radio size="small" />}
                  label="Neutral"
                  labelPlacement="bottom"
                />
              </Flashing>
              <Flashing isFlashing={selectedValue === "4" && isFlashing}>
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="     "
                  labelPlacement="bottom"
                />
              </Flashing>
              <Flashing isFlashing={selectedValue === "5" && isFlashing}>
                <FormControlLabel
                  value="5"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 32,
                        },
                      }}
                    />
                  }
                  label="Strongly Agree"
                  labelPlacement="bottom"
                />
              </Flashing>
            </RadioGroup>
          )}
        />
      </Grid>
    </Grid>
  );
  return shouldNotAnimate || !showAnimation ? (
    content
  ) : (
    <AnimatedGrid isAppearing={isAppearing}>{content}</AnimatedGrid>
  );
};

export default SurveyQuestion;
