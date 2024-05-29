import React, { useCallback, useState } from "react";
import QrScanner from "./QrScanner";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [scannedText, setScannedText] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleScanSuccess = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    (decodedText: React.SetStateAction<string>) => {
      console.log(`QR Code detected: ${decodedText}`);
      setScannedText(decodedText); // Устанавливаем сканированный текст в состояние
    },
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScanError = useCallback((errorMessage: any) => {
    console.error(`QR Code scan error: ${errorMessage}`);
    // Дополнительная логика при ошибке сканирования
  }, []);

  const defaultLabelStyle = {
    fontSize: "20px",
    fill: "#fff",
  };

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <QrScanner
        onScanSuccess={handleScanSuccess}
        onScanError={handleScanError}
      />
      <div style={{ fontSize: "30px" }}>
        {scannedText && <p>Scanned Text: {scannedText}</p>}{" "}
      </div>
      <div style={{ width: "200px" }}>
        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
