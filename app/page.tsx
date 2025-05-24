import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingUp, FileText, GraduationCap, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">StudentHub</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Student Utility Portal</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your one-stop solution for academic calculations. Calculate SGPA, CGPA, and marks with ease.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* SGPA Calculator Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
                  <Calculator className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">🧮 SGPA Calculator</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Calculate your Semester Grade Point Average by entering subjects, credits, and grades
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Link href="/sgpa-calculator">Calculate SGPA</Link>
                </Button>
              </CardContent>
            </Card>

            {/* CGPA Calculator Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-800/50 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">📊 CGPA Calculator</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Calculate your Cumulative Grade Point Average using SGPA from all semesters
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Link href="/cgpa-calculator">Calculate CGPA</Link>
                </Button>
              </CardContent>
            </Card>

            {/* CGPA Predictor Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-orange-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-800/50 transition-colors">
                  <Target className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">🎯 CGPA Predictor</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Calculate required SGPA to achieve your target CGPA
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  asChild
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Link href="/cgpa-predictor">Predict CGPA</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Marks Calculator Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-800/50 transition-colors">
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">📝 Marks Calculator</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Multiple calculators for different subject types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Theory Subjects
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Hybrid Subjects
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Practical Subjects
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Online Subjects
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Link href="/marks-calculator">Calculate Marks</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Why Choose StudentHub?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Accurate Calculations</h4>
              <p className="text-gray-300">Precise algorithms ensure your academic calculations are always correct</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Easy to Use</h4>
              <p className="text-gray-300">Simple and intuitive interface designed specifically for students</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Multiple Tools</h4>
              <p className="text-gray-300">All your academic calculation needs in one convenient platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">StudentHub</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering students with easy-to-use academic calculation tools</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">© {new Date().getFullYear()} StudentHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
