// OTPLogin.jsx
import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { UserIcon, ShieldCheckIcon } from "./icons"

export default function OTPLogin({ onLoginSuccess }) {
  const [step, setStep] = useState("student-id")
  const [studentId, setStudentId] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!studentId.trim()) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setStep("otp")
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    onLoginSuccess(studentId)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            {step === "student-id" ? (
              <UserIcon className="w-8 h-8 text-primary-foreground" />
            ) : (
              <ShieldCheckIcon className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">
              {step === "student-id" ? "Student Login" : "Verify OTP"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === "student-id"
                ? "Enter your student ID to receive OTP"
                : `OTP sent to your registered mobile number`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "student-id" ? (
            <>
              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-medium">
                  Student ID
                </label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button
                onClick={handleSendOTP}
                disabled={!studentId.trim() || loading}
                className="w-full h-12 text-base font-medium"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-12 text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || loading}
                  className="w-full h-12 text-base font-medium"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
                <Button variant="ghost" onClick={() => setStep("student-id")} className="w-full text-muted-foreground">
                  Back to Student ID
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}