import * as React from "react";
import { Col, Row } from "antd";
import {
  QrcodeOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CardLogo from "../components/sdsb-component/card_logo/CardLogo";
import HistoryTransaction from "../components/sdsb-component/history_transcation/HistoryTransaction";
import { ITransactionGroup } from "../components/sdsb-component/history_transcation/model/HistoryTranscationModel";

function Home() {
  const dataTranscation: ITransactionGroup[] = [
    {
      date: "11/11/2021",
      data: [
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Apple",
          description: "27 March 2021, at 04:30 AM",
          amount: "+ $2,000",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
      ],
    },
    {
      date: "10/11/2021",
      data: [
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Switch",
          description: "28 March 2021, at 04:30 AM",
          amount: "- $2,000",
          textclass: "text-light-danger",
          amountcolor: "text-danger",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <CardLogo
            headerText="Saldo"
            content="QR Code"
            icon={<QrcodeOutlined></QrcodeOutlined>}
            onClick={() => console.log("asd")}
          ></CardLogo>
          <CardLogo
            headerText="Profil"
            content="Profil Saya"
            icon={<UserOutlined></UserOutlined>}
            onClick={() => console.log("asd")}
          ></CardLogo>
          <CardLogo
            headerText="Bantuan"
            content="Telp"
            icon={<PhoneOutlined></PhoneOutlined>}
            onClick={() => console.log("asd")}
          ></CardLogo>
          <CardLogo
            headerText="Bantuan"
            content="WA"
            icon={<WhatsAppOutlined></WhatsAppOutlined>}
            onClick={() => console.log("asd")}
          ></CardLogo>
        </Row>
        <Row>
          <Col xs={24}>
            <HistoryTransaction
              dataTranscation={dataTranscation}
            ></HistoryTransaction>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Home;
