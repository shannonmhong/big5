import SurveyQuestion from "@/pages/SurveyQuestion";
import React, { useEffect, useState } from "react";
import { Question, FormData } from "./Survey";
import { StyledQuestionSet } from "@/components/StyledComponents/StyledQuestionSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

interface QuestionSetProps {
  questionsData: Question[];
  onSubmit: (data: FormData) => void;
  onPercentageCompletedChange: (percentage: number) => void;
}

const QuestionSet: React.FC<QuestionSetProps> = ({
  questionsData,
  onSubmit,
  onPercentageCompletedChange,
}) => {
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [nextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
  const [isAppearing, setIsAppearing] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  // const [percentageCompleted, setPercentageCompleted] = useState<number>(0);

  // Helper variables to track question positions
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const allQuestionsCompleted =
    Object.keys(formData).length === questionsData.length;

  // Helper functions to handle appearance changes
  function changeIsAppearingTrue() {
    return new Promise<void>(function (resolve) {
      setTimeout(() => {
        setIsAppearing(true);
        resolve();
      }, 500);
    });
  }

  function changeIsAppearingFalse() {
    return new Promise<void>(function (resolve) {
      setTimeout(() => {
        setIsAppearing(false);
        resolve();
      }, 500);
    });
  }

  const handleNextQuestion = async () => {
    if (
      currentQuestionIndex < questionsData.length - 1 &&
      (nextButtonClicked || formData[currentQuestionIndex] !== undefined)
    ) {
      setIsFlashing(true);
      await changeIsAppearingTrue();
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setNextButtonClicked(false);
        setIsAppearing(false);
      }, 500);
    }
  };

  const handlePrevQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setIsFlashing(true);
      if (formData[currentQuestionIndex] === undefined) {
        setIsAppearing(false);
      } else {
        // only pause before transition if radio button is selected and flashing
        await changeIsAppearingFalse();
      }
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setNextButtonClicked(false);
      }, 500);
    }
  };

  const handleResponse = (response: string) => {
    setFormData({ ...formData, [currentQuestionIndex]: response });
    setNextButtonClicked(true);
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  // Automatically advance to the next question when a response is selected
  useEffect(() => {
    if (
      (!isLastQuestion || isFirstQuestion) &&
      formData[currentQuestionIndex] !== undefined &&
      nextButtonClicked
    ) {
      handleNextQuestion();
    }
    const percentageCompleted = Math.floor(
      (currentQuestionIndex / (questionsData.length - 1)) * 100
    );
    onPercentageCompletedChange(percentageCompleted);
  }, [formData, currentQuestionIndex, isLastQuestion, nextButtonClicked]);

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <StyledQuestionSet>
      {isFirstQuestion && formData[currentQuestionIndex] === undefined ? (
        <SurveyQuestion
          key={currentQuestion.id}
          question={currentQuestion.text}
          name={currentQuestion.text}
          onValueChange={handleResponse}
          selectedValue={formData[currentQuestionIndex] || ""}
          isFlashing={isFlashing}
        />
      ) : (
        <SurveyQuestion
          key={currentQuestion.id}
          question={currentQuestion.text}
          name={currentQuestion.text}
          onValueChange={handleResponse}
          selectedValue={formData[currentQuestionIndex] || ""}
          isAppearing={isAppearing}
          isFlashing={isFlashing}
        />
      )}
      <button onClick={handlePrevQuestion} disabled={isFirstQuestion}>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      {isLastQuestion && allQuestionsCompleted && (
        <button onClick={handleFormSubmit}>Submit</button>
      )}
      {!isLastQuestion && (
        <button
          onClick={handleNextQuestion}
          disabled={formData[currentQuestionIndex] === undefined}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
    </StyledQuestionSet>
  );
};

export default QuestionSet;
