import * as React from "react";
import { Row } from "antd";
import { QrcodeOutlined, UserOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import CardLogo from "../components/sdsb-component/card_logo/CardLogo";

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
      </div>
    </React.Fragment>
  );
}

export default Home;
