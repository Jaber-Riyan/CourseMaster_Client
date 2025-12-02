import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { mockQuizzes } from "@/lib/mock-data";
import { CheckCircle2, XCircle } from "lucide-react";

export default function StudentQuizzesPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showResults, setShowResults] = useState(false);
  const quiz = mockQuizzes[0];

  const handleSubmit = () => {
    setShowResults(true);
  };

  const correctAnswers = quiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  const score = Math.round((correctAnswers / quiz.questions.length) * 100);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge and track your progress
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.courseName}</CardDescription>
            </div>
            <Badge variant="secondary">{quiz.questions.length} Questions</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  Question {index + 1}: {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[question.id]?.toString()}
                  onValueChange={(value) =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [question.id]: Number.parseInt(value),
                    })
                  }
                  disabled={showResults}>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        showResults
                          ? optionIndex === question.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : selectedAnswers[question.id] === optionIndex
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : ""
                          : "hover:bg-accent"
                      }`}>
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`q${question.id}-${optionIndex}`}
                      />
                      <Label
                        htmlFor={`q${question.id}-${optionIndex}`}
                        className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                      {showResults &&
                        optionIndex === question.correctAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      {showResults &&
                        selectedAnswers[question.id] === optionIndex &&
                        optionIndex !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {!showResults ? (
            <Button
              onClick={handleSubmit}
              disabled={
                Object.keys(selectedAnswers).length !== quiz.questions.length
              }
              className="w-full"
              size="lg">
              Submit Quiz
            </Button>
          ) : (
            <Card className="border-primary">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-4xl font-bold text-primary">{score}%</p>
                <p className="text-muted-foreground">
                  You got {correctAnswers} out of {quiz.questions.length}{" "}
                  questions correct
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4">
                  Retake Quiz
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
