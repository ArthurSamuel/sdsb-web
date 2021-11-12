import { Card, Button, Tabs } from "antd";
import { Fragment, useState } from "react";
import "../assets/styles/billing.css";

function QrcodeComponent() {
  const { TabPane } = Tabs;
  const [showQr, setShowQr] = useState(false);
  const QrReader = require("react-qr-reader");
  const QRCodeGenerate = require("qrcode.react");

  return (
    <Fragment>
      <Tabs>
        <TabPane tab="QR Code Saya" key="1">
          <div className="container-billing">
            <span className="title">
              Scan QR Code untuk otomatis dialihkan ke halaman tranfer SDSB
            </span>
          </div>
          <div className="container-billing">
            <Card style={{ marginTop: 20 }}>
              <QRCodeGenerate
                size={250}
                value="https://www.google.com"
              ></QRCodeGenerate>
            </Card>
          </div>
        </TabPane>
        <TabPane tab="Scan QR Code" key="2">
          <div className="container-billing">
            <Card style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 20 }}>
                <span className="title">
                  Mulai Scan QR Code Untuk Melakukan Transaksi
                </span>
              </div>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={() => setShowQr((prev) => !prev)}
              >
                {showQr ? "Berhenti" : "Mulai"}
              </Button>
            </Card>
            {showQr && (
              <div style={{ marginTop: 20, width: "100%" }}>
                <QrReader
                  style={{ width: "100%" }}
                  onScan={(e: any) => console.log(e)}
                  delay={300}
                  onError={() => console.log("asd")}
                ></QrReader>
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </Fragment>
  );
}

export default QrcodeComponent;
