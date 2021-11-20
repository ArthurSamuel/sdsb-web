import { Button, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { KeyToken, Server } from "../../utils/Constant";
import InputMoney from "../sdsb-component/input/InputMoney";

interface IPaymentModal {
  show: boolean;
  onClose: Function;
}

export default function PaymentModal(props: IPaymentModal) {
  const QRCodeGenerate = require("qrcode.react");
  const [amount, setAmount] = useState<string>();
  const [showGenerateQrcode, setShowGenerateQrcode] = useState(false);
  const [transcationUrl, setTranscationUrl] = useState<string | null>();

  useEffect(() => {
    if (transcationUrl) {
      setShowGenerateQrcode(true);
    }
  }, [transcationUrl]);

  function generateQrCode() {
    if (amount && parseInt(amount) < 1000) {
      notification.info({
        message: "Error",
        description: "Jumlah Transfer Minimal 1.000",
        placement: "bottomRight",
      });
      return;
    }
    const token = localStorage.getItem(KeyToken);
    if (token) {
      const userInformation = JSON.parse(token).user.member.code;
      let tempAmount = amount && parseInt(amount) / 1000;
      setTranscationUrl(
        `${Server.baseProd}/pay?id=${userInformation}&am=${tempAmount}k`
      );
    }
  }

  return (
    <div>
      <Modal
        footer={null}
        title="Create Payment"
        visible={props.show}
        onCancel={() => props.onClose()}
      >
        <div>
          <InputMoney
            addOnBefore="Rp"
            label="Nominal"
            onChange={(e: string) => setAmount(e)}
          ></InputMoney>
          {showGenerateQrcode && (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <QRCodeGenerate
                size={250}
                value={transcationUrl}
              ></QRCodeGenerate>
              <div style={{ width: "80%", textAlign: "center", marginTop: 10 }}>
                Scan QR Code diatas untuk melakukan transfer
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button onClick={() => generateQrCode()} type="primary">
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
