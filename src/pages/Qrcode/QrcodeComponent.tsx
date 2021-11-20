import { Card, Button } from "antd";
import { Fragment, useEffect, useState } from "react";
import "../../assets/styles/billing.css";
import TransferModal from "../../components/local/TransferModal";
import Spinner from "../../components/sdsb-component/spinner/Spinner";
import { KeyToken, Server } from "../../utils/Constant";

function QrcodeComponent() {
  const userInformation = localStorage.getItem(KeyToken);
  const [showQr, setShowQr] = useState(false);
  const QrReader = require("react-qr-reader");
  const QRCodeGenerate = require("qrcode.react");
  const [urlTransaction, setUrlTransaction] = useState<string | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    if (userInformation) {
      let temp = JSON.parse(userInformation);
      setUrlTransaction(`${Server.baseProd}/pay?id=${temp.user.member.code}`);
    }
  }, []);

  if (!urlTransaction) {
    return <Spinner></Spinner>;
  }

  function scanQr(e:any) {
    if (e) {
      setUrlTransaction(e)
      setShowQr(false)
      setShowTransferModal(true)
    }
  }

  return (
    <Fragment>
      <div className="container-billing">
        <div className="container-billing-text-wrapper">
          <span className="title">
            Scan QR Code dibawah ini untuk lakukan proses tranfer SDSB
          </span>
        </div>
      </div>
      {showQr ? (
        <div className="container-billing container-billing-qr">
          <div className="container-billing-qr-position">
            <QrReader
              style={{ width: 300 }}
              onScan={(e: any) => scanQr(e)}
              delay={300}
              onError={() => console.log("Error QR")}
            ></QrReader>
          </div>
        </div>
      ) : (
        <div className="container-billing">
          <Card style={{ marginTop: 20 }}>
            <QRCodeGenerate size={250} value={urlTransaction}></QRCodeGenerate>
          </Card>
        </div>
      )}
      <div className="container-billing">
        <div className="container-billing-text-wrapper-button">
          <span className="title">
            Atau scan QR Code lainnya untuk melakukan transaksi
          </span>
          <Button
            style={{ width: "100%", marginTop: 20 }}
            type="primary"
            onClick={() => setShowQr((prev) => !prev)}
          >
            {showQr ? "Cancel" : "Scan"}
          </Button>
        </div>
      </div>
      <TransferModal
        urlTransaction={urlTransaction}
        onClose={() => setShowTransferModal(false)}
        show={showTransferModal}
      ></TransferModal>
    </Fragment>
  );
}

export default QrcodeComponent;
