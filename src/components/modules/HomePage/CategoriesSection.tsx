import { Card, CardContent } from "@/components/ui/card";


export default function CategoriesSection() {
  const categories = [
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Photography",
  ];

  return (
    <div>
      {/* Categories Section */}
      <section className="py-16 border-b bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground">
              Explore our wide range of courses
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category}
                className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
