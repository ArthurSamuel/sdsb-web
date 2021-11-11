import { Button, Card, Descriptions, Input, Modal } from "antd";
import React, { useState } from "react";

interface IPaymentModal {
  show: boolean;
  onClose: Function;
}

export default function TransferModal(props: IPaymentModal) {
  const { TextArea } = Input;
  const [showPin, setShowPin] = useState(false);

  return (
    <div>
      <Modal onCancel={() => setShowPin(false)} visible={showPin}>
        <div style={{marginTop: 20}}>
          <div style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>PIN</span>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Input size="small" type="password"></Input>
          </div>
        </div>
      </Modal>
      <Modal
        footer={null}
        title="Create Payment"
        visible={props.show}
        onCancel={() => props.onClose()}
      >
        <div>
          <div style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>
              Kode Customer Tujuan
            </span>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Input addonBefore="CUST" size="small"></Input>
            <div style={{ paddingLeft: 10, marginTop: 5 }}>
              <span
                style={{ fontWeight: "bold", color: "blue", cursor: "pointer" }}
              >
                Scan QR Code
              </span>
            </div>
          </div>
          <div style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>Nominal</span>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Input addonBefore="RP" size="small"></Input>
          </div>
          <div style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>
              Deskripsi Transfer
            </span>
          </div>
          <div style={{ marginBottom: 15 }}>
            <TextArea rows={3}></TextArea>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Card title="Informasi Customer">
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div style={{ width: 150 }}>Nama</div>
              <div style={{ fontWeight: "bold" }}>Arthur Samuel</div>
            </div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div style={{ width: 150 }}>Username</div>
              <div style={{ fontWeight: "bold" }}>Arthur Samuel</div>
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
      </Modal>
    </div>
  );
}
