import SurveyQuestion from "@/pages/SurveyQuestion";
import React, { useEffect, useState } from "react";
import { Question, FormDataItem } from "./Survey";
import { StyledQuestionSet } from "@/components/StyledComponents/StyledQuestionSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface QuestionSetProps {
  questionsData: Question[];
  onSubmit: (data: Record<string, FormDataItem>) => void;
  onPercentageCompletedChange: (percentage: number) => void;
}

const QuestionSet: React.FC<QuestionSetProps> = ({
  questionsData,
  onSubmit,
  onPercentageCompletedChange,
}) => {
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, FormDataItem>>({});
  const [nextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
  const [isAppearing, setIsAppearing] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

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
        setShowAnimation(true);
        resolve();
      }, 500);
    });
  }

  function changeIsAppearingFalse() {
    return new Promise<void>(function (resolve) {
      setTimeout(() => {
        setIsAppearing(false);
        setShowAnimation(false);
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
      if (!isLastQuestion) {
        await changeIsAppearingTrue();
      }
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setNextButtonClicked(false);
        setShowAnimation(false);
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
    setFormData({
      ...formData,
      [currentQuestion.id]: {
        sign: currentQuestion.sign,
        trait: currentQuestion.trait,
        value: response,
      },
    });
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
      (Object.keys(formData).length / questionsData.length) * 100
    );
    onPercentageCompletedChange(percentageCompleted);
  }, [formData, currentQuestionIndex, isLastQuestion, nextButtonClicked]);

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div>
      <StyledQuestionSet>
        <SurveyQuestion
          key={currentQuestion.id}
          question={currentQuestion.text}
          name={currentQuestion.text}
          onValueChange={handleResponse}
          selectedValue={formData[currentQuestion.id]?.value || ""}
          isFlashing={isFlashing}
          isAppearing={isAppearing}
          shouldNotAnimate={
            isFirstQuestion && formData[currentQuestionIndex] === undefined
          }
          showAnimation={showAnimation}
        />
        <div
          style={{
            paddingTop: "15px",
            display: "flex",
          }}
        >
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={isFirstQuestion}
            style={{
              marginTop: "10px",
              height: "50%",
              borderRadius: "4px",
              borderWidth: "thin",
            }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          {!isLastQuestion && (
            <button
              type="button"
              onClick={handleNextQuestion}
              style={{
                marginTop: "10px",
                height: "50%",
                borderRadius: "4px",
                borderWidth: "thin",
              }}
              disabled={formData[currentQuestionIndex] === undefined}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          )}
          <div style={{ paddingLeft: "550px" }}>
            {isLastQuestion && allQuestionsCompleted && (
              <button
                type="submit"
                style={{
                  padding: "10px",
                  boxShadow: "none",
                  borderRadius: "8px",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0px 50px #E48B3D";
                  e.currentTarget.style.backgroundColor = "#E48B3D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                submit
              </button>
            )}
          </div>
        </div>
      </StyledQuestionSet>
    </div>
  );
};

export default QuestionSet;
