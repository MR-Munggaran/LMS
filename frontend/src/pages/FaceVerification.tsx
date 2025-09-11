import { useState, useRef, type ChangeEvent } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const videoConstraints = {
  width: 480,
  height: 360,
  facingMode: "user",
};

const FaceVerification = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const verifyFace = async () => {
    if (!capturedImage) return;
    setLoading(true);
    try {
      const response = await fetch("/api/face/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      });
      const data = await response.json();
      setVerificationResult(data.success ? "Wajah terverifikasi ✅" : "Verifikasi gagal ❌");
    } catch (error) {
      console.error(error);
      setVerificationResult("Terjadi kesalahan saat verifikasi ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verifikasi Wajah</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">Kamera</TabsTrigger>
              <TabsTrigger value="upload">Upload Foto</TabsTrigger>
            </TabsList>

            {/* Kamera Tab */}
            <TabsContent value="camera" className="flex flex-col items-center gap-2">
              {!capturedImage ? (
                <>
                  <Webcam
                    audio={false}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={480}
                    videoConstraints={videoConstraints}
                    className="rounded-md border"
                  />
                  <Button className="mt-2" onClick={capture}>
                    Ambil Foto
                  </Button>
                </>
              ) : (
                <img
                  src={capturedImage}
                  alt="Preview"
                  className="rounded-md border w-80 h-60 object-cover"
                />
              )}
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="flex flex-col items-center gap-2">
              {!capturedImage ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border rounded p-2"
                />
              ) : (
                <img
                  src={capturedImage}
                  alt="Preview"
                  className="rounded-md border w-80 h-60 object-cover"
                />
              )}
            </TabsContent>
          </Tabs>

          {/* Tombol dan hasil */}
          {capturedImage && (
            <div className="flex gap-2 mt-2">
              <Button variant="secondary" onClick={() => setCapturedImage(null)}>
                Ambil/Uplod Ulang
              </Button>
              <Button onClick={verifyFace} disabled={loading}>
                {loading ? "Memverifikasi..." : "Verifikasi Wajah"}
              </Button>
            </div>
          )}

          {verificationResult && (
            <p className="mt-2 text-center">{verificationResult}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceVerification;
