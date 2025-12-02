import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialSection() {
  return (
    <div>
      {/* Testimonials Section */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">What Our Students Say</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied learners
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription>
                    {
                      '"Amazing platform! The courses are well-structured and the instructors are top-notch. I\'ve learned so much!"'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Student {i}</p>
                  <p className="text-sm text-muted-foreground">
                    Course Completed
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
