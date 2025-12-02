import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockLessons } from "@/lib/mock-data";
import { Check, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";

export default function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const [currentLesson, setCurrentLesson] = useState(mockLessons[0]);
  const completedLessons = mockLessons.filter((l) => l.completed).length;
  const totalLessons = mockLessons.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="flex flex-col h-screen">
      {/* Progress Bar */}
      <div className="border-b p-4 bg-background">
        <div className="container flex items-center gap-4">
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm font-medium">
            {completedLessons} / {totalLessons} lessons completed
          </span>
          <Badge>{progress}%</Badge>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="flex-1 flex items-center justify-center">
            <iframe
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="bg-background p-6 border-t">
            <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
            <p className="text-muted-foreground mb-4">
              Duration: {currentLesson.duration}
            </p>
            <Button size="lg">
              <Check className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        </div>

        {/* Lesson List Sidebar */}
        <div className="w-96 border-l overflow-y-auto bg-background">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-lg">Course Content</h3>
            <p className="text-sm text-muted-foreground">
              {totalLessons} lessons
            </p>
          </div>
          <div className="p-4 space-y-2">
            {mockLessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-accent",
                  currentLesson.id === lesson.id && "border-primary bg-accent"
                )}
                onClick={() => setCurrentLesson(lesson)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                      {lesson.completed ? (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      ) : currentLesson.id === lesson.id ? (
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                          <Play className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
