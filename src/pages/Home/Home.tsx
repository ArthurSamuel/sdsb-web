import * as React from "react";
import { Button, Card, Col, Row } from "antd";
import {
  QrcodeOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import CardLogo from "../../components/sdsb-component/card_logo/CardLogo";
import HistoryTransaction from "../../components/sdsb-component/history_transcation/HistoryTransaction";
import {
  KeyToken,
  CustomerServicePhone,
  CustomerServiceWA,
  CustomerServiceWAMessage,
} from "../../utils/Constant";
import Spinner from "../../components/sdsb-component/spinner/Spinner";
import HomePay from "./HomePay";
import TransferModal from "../../components/local/TransferModal";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory()
  const userInformation = localStorage.getItem(KeyToken);
  const [idMember, setIdMember] = React.useState<string | null>(null);
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [name, setName] = React.useState<string>();

  React.useEffect(() => {
    if (userInformation) {
      let temp = JSON.parse(userInformation);
      let tempName: string = temp.user.name;
      let tempNameSplited = tempName.split(" ");
      if (tempNameSplited.length > 2) {
        setName(`${tempNameSplited[0]} ${tempNameSplited[1]}`);
      } else {
        setName(tempName);
      }
      setIdMember(temp.user.member_id);
    }
  }, []);

  if (!idMember) {
    return <Spinner></Spinner>;
  }

  return (
    <React.Fragment>
      <div className="layout-content">
        <div style={{ marginBottom: 20 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Hi, {name}
                </div>
              </div>
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <div>Saldo</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Rp 10.000.000
                </div>
                <div
                  style={{
                    backgroundColor: "#dedede",
                    height: 1,
                    width: "100%",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
                <div style={{ marginBottom: 10 }}>
                  <HomePay></HomePay>
                </div>
                <Button onClick={() => setShowTransfer(true)} type={"default"}>
                  Transfer SDSB
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <CardLogo
            headerText="Transaksi"
            content="QR Code"
            icon={<QrcodeOutlined></QrcodeOutlined>}
            onClick={() => history.push('/qrcode')}
          ></CardLogo>
          <CardLogo
            headerText="Profil"
            content="Profil Saya"
            icon={<UserOutlined></UserOutlined>}
            onClick={() => history.push('/profile')}
          ></CardLogo>
          <CardLogo
            headerText="Bantuan"
            content="Telp"
            icon={<PhoneOutlined></PhoneOutlined>}
            onClick={() => window.open(`tel:${CustomerServicePhone}`)}
          ></CardLogo>
          <CardLogo
            headerText="Bantuan"
            content="WA"
            icon={<WhatsAppOutlined></WhatsAppOutlined>}
            onClick={() =>
              window.open(
                `whatsapp://send/?phone=${CustomerServiceWA}&text=${CustomerServiceWAMessage}`
              )
            }
          ></CardLogo>
        </Row>
        <Row>
          <Col xs={24}>
            <HistoryTransaction idMember={idMember}></HistoryTransaction>
          </Col>
        </Row>
      </div>
      <TransferModal
        show={showTransfer}
        onClose={() => setShowTransfer(false)}
      ></TransferModal>
    </React.Fragment>
  );
}

export default Home;
