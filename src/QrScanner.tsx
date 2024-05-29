import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanError: (errorMessage: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({
  onScanSuccess,
  onScanError,
}) => {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null); // Указываем тип явно

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText, decodedResult) => {
            onScanSuccess(decodedText, decodedResult);
          },
          (errorMessage) => {
            onScanError(errorMessage);
          }
        );
      } catch (err) {
        console.error("Unable to start scanning", err);
      }
    };

    startScanner();

    return () => {
      const stopScanner = async () => {
        if (html5QrCodeRef.current) {
          try {
            await html5QrCodeRef.current.stop();
          } catch (err) {
            console.error("Unable to stop scanning", err);
          }
        }
      };

      stopScanner();
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div>
      <div id="reader" style={{ width: "100%" }}></div>
    </div>
  );
};

export default QrScanner;
