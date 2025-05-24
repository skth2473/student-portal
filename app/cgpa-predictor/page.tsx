"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Home, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CGPAPredictor() {
  const [currentCGPA, setCurrentCGPA] = useState<number>(0)
  const [earnedCredits, setEarnedCredits] = useState<number>(0)
  const [targetCGPA, setTargetCGPA] = useState<number>(0)
  const [nextSemCredits, setNextSemCredits] = useState<number>(0)
  const [requiredSGPA, setRequiredSGPA] = useState<number | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)

  const calculateRequiredSGPA = () => {
    if (currentCGPA <= 0 || earnedCredits <= 0 || targetCGPA <= 0 || nextSemCredits <= 0) {
      alert("Please fill all fields with valid positive values.")
      return
    }

    if (currentCGPA > 10 || targetCGPA > 10) {
      alert("CGPA cannot be greater than 10.")
      return
    }

    if (targetCGPA < currentCGPA) {
      alert("Target CGPA should be greater than or equal to current CGPA.")
      return
    }

    // Formula: R = (T × (E + N) - (C × E)) / N
    const required = (targetCGPA * (earnedCredits + nextSemCredits) - currentCGPA * earnedCredits) / nextSemCredits

    setRequiredSGPA(Math.round(required * 100) / 100)
    setIsCalculated(true)
  }

  const resetCalculator = () => {
    setCurrentCGPA(0)
    setEarnedCredits(0)
    setTargetCGPA(0)
    setNextSemCredits(0)
    setRequiredSGPA(null)
    setIsCalculated(false)
  }

  const getResultMessage = (required: number) => {
    if (required <= 10 && required > 0) {
      if (required >= 9) {
        return {
          icon: "🎯",
          message: "Challenging but achievable! You'll need excellent performance.",
          color: "text-orange-400",
        }
      } else if (required >= 7) {
        return {
          icon: "✅",
          message: "Achievable with consistent effort and good study habits.",
          color: "text-green-400",
        }
      } else {
        return {
          icon: "😊",
          message: "Easily achievable! You're on the right track.",
          color: "text-blue-400",
        }
      }
    } else if (required > 10) {
      return {
        icon: "❌",
        message: "Target not possible with given credits. Consider increasing credits or adjusting target.",
        color: "text-red-400",
      }
    } else {
      return {
        icon: "⚠️",
        message: "Invalid calculation. Please check your inputs.",
        color: "text-yellow-400",
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-white">🎯 CGPA Predictor</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Card */}
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-6 w-6 mr-2 text-orange-400" />
                CGPA Prediction Formula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 space-y-2">
                <p className="font-mono bg-gray-700 p-2 rounded">
                  Required SGPA = (Target CGPA × Total Credits - Current CGPA × Earned Credits) / Next Semester Credits
                </p>
                <p className="text-sm">
                  This calculator helps you determine what SGPA you need in your upcoming semester to achieve your
                  target CGPA.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Input Form */}
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Enter Your Academic Details</CardTitle>
              <CardDescription className="text-gray-300">
                Fill in your current academic standing and future goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-cgpa" className="text-gray-300">
                    Current CGPA *
                  </Label>
                  <Input
                    id="current-cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="7.50"
                    value={currentCGPA || ""}
                    onChange={(e) => setCurrentCGPA(Number.parseFloat(e.target.value) || 0)}
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="earned-credits" className="text-gray-300">
                    Current Total Credits Earned *
                  </Label>
                  <Input
                    id="earned-credits"
                    type="number"
                    min="0"
                    placeholder="100"
                    value={earnedCredits || ""}
                    onChange={(e) => setEarnedCredits(Number.parseInt(e.target.value) || 0)}
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-cgpa" className="text-gray-300">
                    Target CGPA *
                  </Label>
                  <Input
                    id="target-cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="8.00"
                    value={targetCGPA || ""}
                    onChange={(e) => setTargetCGPA(Number.parseFloat(e.target.value) || 0)}
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="next-sem-credits" className="text-gray-300">
                    Upcoming Semester Credits *
                  </Label>
                  <Input
                    id="next-sem-credits"
                    type="number"
                    min="0"
                    placeholder="25"
                    value={nextSemCredits || ""}
                    onChange={(e) => setNextSemCredits(Number.parseInt(e.target.value) || 0)}
                    className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={calculateRequiredSGPA} className="bg-orange-600 hover:bg-orange-700">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Required SGPA
                </Button>

                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {isCalculated && requiredSGPA !== null && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-orange-400" />
                  Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Required SGPA for Next Semester</div>
                    <div className="text-6xl font-bold text-orange-400">
                      {requiredSGPA > 0 ? requiredSGPA.toFixed(2) : "N/A"}
                    </div>
                    {requiredSGPA > 0 && requiredSGPA <= 10 && (
                      <div className="text-lg text-gray-300">
                        Equivalent Grade:{" "}
                        <span className="font-bold text-orange-400">
                          {requiredSGPA >= 9.5
                            ? "A+"
                            : requiredSGPA >= 8.5
                              ? "A"
                              : requiredSGPA >= 7.5
                                ? "B+"
                                : requiredSGPA >= 6.5
                                  ? "B"
                                  : requiredSGPA >= 5.5
                                    ? "C+"
                                    : requiredSGPA >= 4.5
                                      ? "C"
                                      : requiredSGPA >= 4
                                        ? "D"
                                        : "F"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-700 p-6 rounded-lg">
                    <div className={`text-xl ${getResultMessage(requiredSGPA).color} mb-2`}>
                      {getResultMessage(requiredSGPA).icon} {getResultMessage(requiredSGPA).message}
                    </div>

                    {requiredSGPA > 0 && requiredSGPA <= 10 && (
                      <div className="text-gray-300 text-lg mt-4">
                        💡 To reach <span className="font-bold text-orange-400">{targetCGPA}</span> CGPA from{" "}
                        <span className="font-bold text-blue-400">{currentCGPA}</span> with{" "}
                        <span className="font-bold text-green-400">{earnedCredits}</span> credits and{" "}
                        <span className="font-bold text-purple-400">{nextSemCredits}</span> upcoming credits, you need
                        at least <span className="font-bold text-orange-400">{requiredSGPA.toFixed(2)}</span> SGPA in
                        the next semester.
                      </div>
                    )}
                  </div>

                  {/* Progress visualization */}
                  {requiredSGPA > 0 && requiredSGPA <= 10 && (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">SGPA Difficulty Level</div>
                      <div className="w-full bg-gray-700 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full transition-all duration-500 ${
                            requiredSGPA >= 9 ? "bg-red-500" : requiredSGPA >= 7 ? "bg-orange-500" : "bg-green-500"
                          }`}
                          style={{ width: `${(requiredSGPA / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400">{requiredSGPA.toFixed(2)}/10 SGPA Required</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
