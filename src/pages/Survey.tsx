import { StyledHeader } from "@/components/StyledComponents/StyledHeader";
import { StyledSurvey } from "@/components/StyledComponents/StyledSurvey";
import { Box, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import questions from "../data/questions.json";
import QuestionSet from "./QuestionSet";
import { useRouter } from "next/router";
import Link from "next/link";

export interface Question {
  id: number;
  text: string;
  sign: string;
  trait: string;
}

export interface FormDataItem {
  sign: string;
  trait: string;
  value: string;
}

const Survey: React.FC<{}> = () => {
  // Load questions data from a JSON file
  const router = useRouter();
  const questionsData: Question[] = questions;
  const [formData, setFormData] = useState<Record<string, FormDataItem>>({});
  const [percentageCompleted, setPercentageCompleted] = useState<number>(0);

  const methods = useForm();

  const onSubmit = (data: Record<string, FormDataItem>) => {
    setFormData(data);
    router.push({
      pathname: "/results",
      query: { formData: JSON.stringify(formData) },
    });
  };

  const onPercentageCompletedChange = (percentage: number) => {
    setPercentageCompleted(percentage);
  };

  return (
    <StyledSurvey>
      {/* FormProvider provides the useForm context to child components */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "50%",
              marginTop: "10%",
              marginLeft: "15%",
            }}
          >
            <QuestionSet
              questionsData={questionsData}
              onSubmit={onSubmit}
              onPercentageCompletedChange={onPercentageCompletedChange}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={percentageCompleted}
                sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
              />
              <div style={{ paddingLeft: "500px", color: "#debfb4" }}>
                <span>{percentageCompleted}% completed</span>
              </div>
            </Box>
          </div>
        </form>
      </FormProvider>
      <StyledHeader>Big Five</StyledHeader>
    </StyledSurvey>
  );
};

export default Survey;
