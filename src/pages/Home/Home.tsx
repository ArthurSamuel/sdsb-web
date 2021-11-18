import * as React from "react";
import { Col, Row, notification } from "antd";
import {
  QrcodeOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CardLogo from "../../components/sdsb-component/card_logo/CardLogo";
import HistoryTransaction from "../../components/sdsb-component/history_transcation/HistoryTransaction";
import { ITransactionGroup } from "../../components/sdsb-component/history_transcation/model/HistoryTranscationModel";
import { KeyToken } from "../../utils/Constant";

function Home() {
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
            <HistoryTransaction></HistoryTransaction>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Home;
