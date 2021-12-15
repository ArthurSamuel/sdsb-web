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
  const [amountSDSB, setAmountSDSB] = useState<string | null>(null);
  const [showGenerateQrcode, setShowGenerateQrcode] = useState(false);
  const [transcationUrl, setTranscationUrl] = useState<string | null>();

  useEffect(() => {
    if (transcationUrl) {
      setShowGenerateQrcode(true);
    }
  }, [transcationUrl]);

  useEffect(() => {
    if (amount) {
      const tempAmount = Math.round(parseFloat(amount) * 0.3);
      if (parseFloat(amount) >= 1000) {
        setAmountSDSB(tempAmount.toString());
      } else {
        setAmountSDSB('0');
        setShowGenerateQrcode(false)
      }
    }
  }, [amount]);

  function generateQrCode() {
    const token = localStorage.getItem(KeyToken);
    if (token && amountSDSB) {
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
        title="Buat Pembayaran"
        visible={props.show}
        onCancel={() => props.onClose()}
      >
        <div>
          <InputMoney
            addOnBefore="Rp"
            label="Total Pembayaran"
            onChange={(e: string) => setAmount(e)}
          ></InputMoney>
          <InputMoney
            value={amountSDSB}
            readonly={true}
            addOnBefore="Rp"
            label="Bayar Menggunakan SDSB"
            onChange={(e: string) => setAmountSDSB(e)}
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
                Scan QR Code diatas untuk melakukan pembayaran
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
