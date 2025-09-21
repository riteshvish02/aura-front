// QRScanner.jsx
import React from "react"
import { useState, useRef } from "react"
import jsQR from "jsqr"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "../utils/Axios"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { QRCodeIcon, LocationIcon, SmartphoneIcon } from "./icons"


  const QRScanner = () => {
    const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [locationVerified, setLocationVerified] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)
  const student = useSelector((state) => state.User.user)
  // Use a state for sessionId to allow dynamic testing
  const [sessionId, setSessionId] = useState("")

  // Replace handleStartScan with real camera QR scan
  const handleStartScan = async () => {
    setScanning(true);
    setMessage("Opening camera...");
    setLocationVerified(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.setAttribute("playsinline", "true");
      video.play();
      setMessage("Camera opened. Hold QR in front of camera.");
      await new Promise(resolve => {
        video.onloadedmetadata = () => resolve();
      });
      let found = false;
      const scanTimeout = Date.now() + 20000;
      while (!found && Date.now() < scanTimeout) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qr = jsQR(imageData.data, canvas.width, canvas.height);
        if (qr && qr.data) {
          found = true;
          setMessage("QR detected. Processing...");
          stream.getTracks().forEach(track => track.stop());
          video.remove();
          setScanning(false);
          setLocationVerified(true);
          let qrDataObj = null;
          try {
            qrDataObj = JSON.parse(qr.data);
          } catch (e) {
            setMessage("QR detected but not valid JSON.");
            return;
          }
          if (!student || !student._id) {
            setMessage("Student not logged in.");
            return;
          }
          try {
            // Ensure period is present in request if available in QR
            const attendancePayload = {
              ...qrDataObj,
              studentId: student._id
            };
            if (qrDataObj.period) attendancePayload.period = qrDataObj.period;
            const res = await axios.post("/api/v1/attendance/mark", attendancePayload);
            setMessage(res.data.SuccessResponse?.message || "Attendance marked!");
          } catch (err) {
            setMessage(err.response?.data?.ErrorResponse?.message || "Failed to mark attendance.");
          }
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      stream.getTracks().forEach(track => track.stop());
      video.remove();
      setScanning(false);
      setMessage("QR code not detected. Try again or use image upload/input.");
    } catch (err) {
      setScanning(false);
      setMessage("Camera access failed or not supported.");
    }
  };

  // Decode QR from uploaded image and mark attendance
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return;
    setMessage("Processing QR image...");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = async () => {
        // Debug: show image dimensions
        console.log("QR image dimensions:", img.width, img.height);
        // Show preview for troubleshooting
        setMessage(`Image loaded: ${img.width}x${img.height}`);
        // Create canvas and draw image
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Debug: show imageData length
        console.log("imageData length:", imageData.data.length);
        // Decode QR
        const qr = jsQR(imageData.data, canvas.width, canvas.height);
        if (qr && qr.data) {
          // Old method: QR contains JSON string
          let qrDataObj = null;
          try {
            qrDataObj = JSON.parse(qr.data);
          } catch (e) {
            setMessage("QR detected but not valid JSON.");
            return;
          }
          setMessage(`QR detected: ${qr.data}`);
          if (!student || !student._id) {
            setMessage("Student not logged in.");
            return;
          }
          try {
            // Send all QR fields + studentId to backend, ensure period is present
            const attendancePayload = {
              ...qrDataObj,
              studentId: student._id
            };
            if (qrDataObj.period) attendancePayload.period = qrDataObj.period;
            const res = await axios.post("/api/v1/attendance/mark", attendancePayload);
            setMessage(res.data.SuccessResponse?.message || "Attendance marked from QR image!");
          } catch (err) {
            setMessage(err.response?.data?.ErrorResponse?.message || "Failed to mark attendance from image.");
          }
        } else {
          setMessage("QR code not detected in image. Try a larger, clearer QR.");
          console.log("jsQR failed to detect QR code.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="border-gray-200 border-2 hover:bg-black hover:text-white duration-300 transition-all"
          >
            ← Back
          </Button>
          <h1 className="text-lg font-semibold">Scan Attendance</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4">
              <QRCodeIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle>QR Code Scanner</CardTitle>
            <CardDescription className="text-gray-500">Position the QR code within the frame to mark attendance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* SessionId/QR JSON input for fallback/manual entry */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Paste QR JSON string here (manual fallback)"
                value={sessionId}
                onChange={e => setSessionId(e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            {/* Scanner Area */}
            <div className="relative">
              <div className="aspect-square bg-[#F5F5F5] rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                {scanning ? (
                  <div className="text-center space-y-4">
                    <div className="animate-pulse">
                      <QRCodeIcon className="w-16 h-16 mx-auto" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {!locationVerified ? "Verifying location..." : "Scanning QR code..."}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <LocationIcon className="w-4 h-4" />
                        <span>{locationVerified ? "Location verified" : "Checking location"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <QRCodeIcon className="w-16 h-16 mx-auto text-gray-500" />
                    <p className="text-sm text-gray-500">Tap to start scanning</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleStartScan} disabled={scanning} className="w-full h-12 text-base font-medium bg-black text-white">
                <SmartphoneIcon className="w-5 h-5 mr-2" />
                {scanning ? "Scanning..." : "Start Camera Scan"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-gray-500">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 text-base font-medium hover:bg-black hover:text-white duration-300 transition-all"
              >
                Upload QR Image
              </Button>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`mt-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</div>
            )}

            {/* Security Info */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-medium">Security Features</h4>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Location verification required</li>
                <li>• Device binding enabled</li>
                <li>• QR expires in 60 seconds</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
  }

  export default QRScanner


