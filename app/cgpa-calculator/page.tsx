"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Calculator, Home, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Semester {
  id: string
  name: string
  sgpa: number
  credits: number
}

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([{ id: "1", name: "", sgpa: 0, credits: 0 }])
  const [cgpa, setCgpa] = useState<number | null>(null)
  const [totalCredits, setTotalCredits] = useState<number>(0)

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: "",
      sgpa: 0,
      credits: 0,
    }
    setSemesters([...semesters, newSemester])
  }

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((semester) => semester.id !== id))
    }
  }

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map((semester) => (semester.id === id ? { ...semester, [field]: value } : semester)))
  }

  const calculateCGPA = () => {
    const validSemesters = semesters.filter(
      (semester) => semester.sgpa > 0 && semester.credits > 0 && semester.sgpa <= 10,
    )

    if (validSemesters.length === 0) {
      alert("Please add at least one valid semester with SGPA and credits.")
      return
    }

    let totalGradePoints = 0
    let totalCreds = 0

    validSemesters.forEach((semester) => {
      totalGradePoints += semester.sgpa * semester.credits
      totalCreds += semester.credits
    })

    const calculatedCGPA = totalGradePoints / totalCreds
    setCgpa(Math.round(calculatedCGPA * 100) / 100)
    setTotalCredits(totalCreds)
  }

  const resetCalculator = () => {
    setSemesters([{ id: "1", name: "", sgpa: 0, credits: 0 }])
    setCgpa(null)
    setTotalCredits(0)
  }

  const getMotivationalMessage = (cgpa: number) => {
    if (cgpa >= 9.5) return "🎓 Outstanding! You're among the top performers!"
    if (cgpa >= 9) return "🌟 Excellent! Exceptional academic performance!"
    if (cgpa >= 8.5) return "🎉 Very Good! You're doing great!"
    if (cgpa >= 8) return "👍 Good performance! Keep it up!"
    if (cgpa >= 7) return "📚 Satisfactory. There's room for improvement!"
    if (cgpa >= 6) return "⚠️ Average performance. Focus on improvement!"
    return "🚨 Below average. Time to work harder!"
  }

  const downloadResults = () => {
    if (cgpa === null) return

    const content = `
CGPA CALCULATION RESULT
========================

CGPA: ${cgpa}
Total Credits Considered: ${totalCredits}
${getMotivationalMessage(cgpa)}

SEMESTER DETAILS:
${semesters
  .filter((s) => s.sgpa > 0 && s.credits > 0)
  .map((s, i) => `${i + 1}. ${s.name || "Semester " + (i + 1)}: SGPA ${s.sgpa}, Credits ${s.credits}`)
  .join("\n")}

Generated on: ${new Date().toLocaleString()}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `CGPA_Result_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <h1 className="text-2xl font-bold text-white">📊 CGPA Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Card */}
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">How to Calculate CGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 space-y-2">
                <p>CGPA = Σ(SGPA × Credits) / Σ(Credits)</p>
                <p className="text-sm">
                  Enter the SGPA and total credits for each semester to calculate your overall CGPA.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Semester Input Form */}
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Enter Semester Details</CardTitle>
              <CardDescription className="text-gray-300">
                Add your semesters with their SGPA and total credits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {semesters.map((semester, index) => (
                <div key={semester.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-700 rounded-lg">
                  <div className="md:col-span-4">
                    <Label htmlFor={`name-${semester.id}`} className="text-gray-300">
                      Semester Name (Optional)
                    </Label>
                    <Input
                      id={`name-${semester.id}`}
                      placeholder={`Semester ${index + 1}`}
                      value={semester.name}
                      onChange={(e) => updateSemester(semester.id, "name", e.target.value)}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Label htmlFor={`sgpa-${semester.id}`} className="text-gray-300">
                      SGPA *
                    </Label>
                    <Input
                      id={`sgpa-${semester.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="8.50"
                      value={semester.sgpa || ""}
                      onChange={(e) => updateSemester(semester.id, "sgpa", Number.parseFloat(e.target.value) || 0)}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Label htmlFor={`credits-${semester.id}`} className="text-gray-300">
                      Total Credits *
                    </Label>
                    <Input
                      id={`credits-${semester.id}`}
                      type="number"
                      min="0"
                      placeholder="25"
                      value={semester.credits || ""}
                      onChange={(e) => updateSemester(semester.id, "credits", Number.parseInt(e.target.value) || 0)}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSemester(semester.id)}
                      disabled={semesters.length === 1}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <Button
                  onClick={addSemester}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Semester
                </Button>

                <Button onClick={calculateCGPA} className="bg-green-600 hover:bg-green-700">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate CGPA
                </Button>

                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {cgpa !== null && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Your CGPA Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-green-400">{cgpa}</div>
                  <div className="text-xl text-gray-300">Total Credits Considered: {totalCredits}</div>
                  <div className="text-lg text-gray-300 bg-gray-700 p-4 rounded-lg">{getMotivationalMessage(cgpa)}</div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(cgpa / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400">CGPA Progress: {cgpa}/10</div>

                  <Button
                    onClick={downloadResults}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Download Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
