import { GraduationCap } from "lucide-react"
import { Link } from "react-router"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="text-lg font-bold">CourseMaster</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Learn Anything, Anytime. Master new skills with expert instructors.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/courses" className="hover:text-foreground">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CourseMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
