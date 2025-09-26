import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { studentLogin } from "../store/actions/useraction"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { UserIcon } from "./icons"

export default function StudentLogin() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!rollNo.trim() || !name.trim()) return;
    dispatch(studentLogin({ rollNo, name }, navigate, toast));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        {/* Demo credentials box */}
        <div className="mb-4 p-3 rounded-lg bg-slate-100 border border-slate-400 text-xs text-slate-700">
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-slate-800">Demo Credentials:</p>
            <Button
              onClick={() => {
                setRollNo("CSE2025001");
                setName("Student One");
              }}
              className="h-6 px-2 text-xs bg-black hover:bg-black/90 text-white"
            >
              Auto Fill
            </Button>
          </div>
          <p>🎓 <span className="font-semibold">Roll No:</span> CSE2025001</p>
          <p>👤 <span className="font-semibold">Username:</span> Student One</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">Student Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="rollNo" className="text-sm font-medium text-slate-700">
                Roll Number
              </label>
              <Input
                id="rollNo"
                type="text"
                placeholder="Enter roll number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="h-9 text-sm bg-input border-border focus:ring-1 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Username
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleLogin}
              disabled={!rollNo.trim() || !name.trim()}
              className="w-full h-10 text-sm font-medium bg-black hover:bg-black/90 text-white"
            >
              Sign in
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          Secure attendance tracking system
        </p>
      </div>
    </div>
  )
}
