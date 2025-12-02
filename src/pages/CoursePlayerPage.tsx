import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageTitle from "@/components/PageTitle";
import { syllabus } from "@/lib/mock-data";
import { Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function CoursePlayerPage() {
  const [currentLesson, setCurrentLesson] = useState(syllabus[0].content[0]);

  return (
    <div className="flex flex-col h-screen mb-20">
      <PageTitle title="Course Player" />
      {/* Progress Bar */}{" "}
      <div className="border-b p-4 bg-background">
        {" "}
        <div className="container flex items-center gap-4">
          {" "}
          <div className="flex-1">
            {" "}
            <Progress value={60} className="h-2" />{" "}
          </div>{" "}
          <span className="text-sm font-medium">
            {" "}
            {4} / {6} lessons completed{" "}
          </span>{" "}
          <Badge>{60}%</Badge>{" "}
        </div>{" "}
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* === VIDEO PLAYER === */}
        <div className="flex-1 flex flex-col bg-black">
          <iframe
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            className="w-full h-full"
            allowFullScreen
          />
          <div className="mt-6">
            <Button
              size="lg"
              className="cursor-pointer bg-green-500 text-white">
              <Check className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        </div>

        {/* === MODULE DRAWER SIDEBAR === */}
        <div className="w-96 border-l overflow-y-auto bg-background p-4">
          <h2 className="font-bold text-lg mb-4">Course Content</h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {syllabus.map((module, i) => (
              <AccordionItem
                key={i}
                value={`module-${i}`}
                className="border rounded-md">
                <AccordionTrigger className="px-4 py-2 font-semibold cursor-pointer">
                  Module {module.moduleNumber} - {module.title}
                </AccordionTrigger>

                <AccordionContent className="pl-4 space-y-2">
                  {module.content.map((lesson, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`cursor-pointer p-3 rounded-md border flex items-center gap-3 ${
                        currentLesson.title === lesson.title
                          ? "bg-accent border-primary"
                          : "hover:bg-muted"
                      }`}>
                      <div className="shrink-0">
                        {currentLesson.title === lesson.title ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{lesson.title}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
