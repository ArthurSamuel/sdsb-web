import * as React from "react";
import { Button, Modal } from "antd";
import TransferModal from "../../components/local/TransferModal";

export default function HomePay() {
  const QrReader = require("react-qr-reader");
  const [showQr, setShowQr] = React.useState(false);
  const [showTransferModal, setShowTransferModal] = React.useState(false);
  const [urlTransaction, setUrlTransaction] = React.useState<string>();

  function scanQr(e: any) {
    if (e) {
      setUrlTransaction(e);
      setShowQr(false);
      setShowTransferModal(true);
    }
  }

  return (
    <React.Fragment>
      <Button
        style={{ width: "100%" }}
        onClick={() => setShowQr(true)}
        type={"primary"}
      >
        Pay Using QR
      </Button>
      {showQr && (
        <Modal
          onCancel={() => setShowQr(false)}
          title={"Pay With QR Code"}
          visible={showQr}
          footer={null}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <QrReader
                onScan={(e: any) => scanQr(e)}
                delay={300}
                onError={() => console.log("Error QR")}
              ></QrReader>
            </div>
          </div>
        </Modal>
      )}
      <TransferModal
        urlTransaction={urlTransaction}
        onClose={() => setShowTransferModal(false)}
        show={showTransferModal}
      ></TransferModal>
    </React.Fragment>
  );
}
