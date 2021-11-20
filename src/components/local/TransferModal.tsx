import { Button, Card, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import InputMoney from "../sdsb-component/input/InputMoney";
import TransferService from "./TransferService";

interface IPaymentModal {
  urlTransaction?: string;
  show: boolean;
  onClose: Function;
}

export default function TransferModal(props: IPaymentModal) {
  const QrReader = require("react-qr-reader");
  const Service = new TransferService();
  const { TextArea } = Input;
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [readOnlyAmount, setReadOnlyAmount] = useState(false);
  const [kode, setKode] = useState<string>();
  const [amount, setAmount] = useState<string | null>(null);
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [pin, setPin] = useState<string | null>(null);

  useEffect(() => {
    if (props.urlTransaction) {
      const tempUrl = new URL(props.urlTransaction);
      const args = new URLSearchParams(tempUrl.search);
      const idCust = args.get("id");
      let tempAmount = args.get("am");
      if (tempAmount) {
        tempAmount = tempAmount.replace("k", "");
        tempAmount = (parseInt(tempAmount) * 1000).toString();
      }
      if (idCust) {
        initFromQrCode(idCust, tempAmount);
      }
    }
  }, [props]);

  async function initFromQrCode(idCust: string, amount?: string | null) {
    const results = await Service.GetUserInformation(idCust);
    if (results.statusCode === 200) {
      setKode(idCust.split("_")[1]);
      setReadOnly(true);
      setName(results.data && results.data.name);
      setUsername(results.data && results.data.username);
      if (amount) {
        setAmount(amount);
        setReadOnlyAmount(true);
      }
    }
  }

  async function onScan(e: any) {
    if (e) {
      setReadOnlyAmount(false);
      const tempUrl = new URL(e);
      const args = new URLSearchParams(tempUrl.search);
      const idCust = args.get("id");
      let amount = args.get("am");
      if (idCust) {
        const results = await Service.GetUserInformation(idCust);
        if (results.statusCode === 200) {
          if (amount) {
            amount = (
              parseInt(amount?.substr(0, amount.length - 1)) * 1000
            ).toString();
            setReadOnlyAmount(true);
          }
          setReadOnly(true);
          setAmount(amount);
          setKode(idCust.split("_")[1]);
          setName(results.data.name);
          setUsername(results.data.username);
          setShowQrScanner(false);
        } else {
          notification.info({
            message: results.message,
            description: results.error_message,
            placement: "bottomRight",
          });
        }
      }
    }
  }

  async function onSubmit() {
    if (kode && amount && pin) {
      const results = await Service.DoTransfer(kode, amount, pin, description);
      const message = results.statusCode === 200 ? "Success" : results.message;
      const descriptionMsg =
        results.statusCode === 200
          ? "Successfully Transfer"
          : results.error_message;
      setShowPin(false);
      setPin(null);
      notification.info({
        message,
        description: descriptionMsg,
        placement: "bottomRight",
      });
    } else {
      setPin(null);
      notification.info({
        message: "Error",
        description: "Mohon Mengisi Kode Customer dan Nominal",
        placement: "bottomRight",
      });
    }
  }

  return (
    <div>
      <Modal
        onOk={() => onSubmit()}
        onCancel={() => setShowPin(false)}
        visible={showPin}
      >
        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>PIN</span>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Input
              onChange={(e) => setPin(e.target.value)}
              size="small"
              type="password"
            ></Input>
          </div>
        </div>
      </Modal>
      <Modal
        footer={null}
        title="Transfer Wallet"
        visible={props.show}
        onCancel={() => props.onClose()}
      >
        {showQrScanner ? (
          <div>
            <QrReader
              style={{ width: "100%" }}
              onScan={(e: any) => onScan(e)}
              delay={300}
              onError={() => console.log("asd")}
            ></QrReader>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Button type="primary" onClick={() => setShowQrScanner(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 5 }}>
              <span style={{ fontSize: 15, fontWeight: "bold" }}>
                Kode Customer Tujuan
              </span>
            </div>
            <div style={{ marginBottom: 15 }}>
              <Input
                disabled={readOnly}
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                addonBefore="CUST"
                size="small"
              ></Input>
              {!props.urlTransaction && (
                <div
                  onClick={() => setShowQrScanner(true)}
                  style={{ paddingLeft: 10, marginTop: 5 }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#0b7fab",
                      cursor: "pointer",
                    }}
                  >
                    Scan QR Code
                  </span>
                </div>
              )}
            </div>
            <InputMoney
              readonly={readOnlyAmount}
              addOnBefore="Rp"
              label="Nominal"
              value={amount && amount}
              onChange={(e: string) => setAmount(e)}
            ></InputMoney>
            <div style={{ marginBottom: 5 }}>
              <span style={{ fontSize: 15, fontWeight: "bold" }}>
                Deskripsi Transfer
              </span>

              <div style={{ marginBottom: 15 }}>
                <TextArea
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></TextArea>
              </div>
            </div>
            {name && username && (
              <div style={{ marginTop: 20 }}>
                <Card title="Informasi Customer">
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    <div style={{ width: 150 }}>Nama</div>
                    <div style={{ fontWeight: "bold" }}>{name}</div>
                  </div>
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    <div style={{ width: 150 }}>Username</div>
                    <div style={{ fontWeight: "bold" }}>{username}</div>
                  </div>
                </Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <Button type="primary" onClick={() => setShowPin(true)}>
                    Create
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
