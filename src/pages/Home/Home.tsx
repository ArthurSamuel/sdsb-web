import * as React from "react";
import { Button, Card, Col, notification, Row } from "antd";
import {
  QrcodeOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import CardLogo from "../../components/sdsb-component/card_logo/CardLogo";
import HistoryTransaction from "../../components/sdsb-component/history_transcation/HistoryTransaction";
import {
  KeyToken,
  CustomerServicePhone,
  CustomerServiceWA,
  CustomerServiceWAMessage,
  Server,
} from "../../utils/Constant";
import Spinner from "../../components/sdsb-component/spinner/Spinner";
import HomePay from "./HomePay";
import TransferModal from "../../components/local/TransferModal";
import { useHistory } from "react-router";
import HomeService from "./service/HomeService";
import PaymentModal from "../../components/local/PaymentModal";

function Home() {
  const Service = new HomeService();
  const history = useHistory();
  const userInformation = localStorage.getItem(KeyToken);
  const [idMember, setIdMember] = React.useState<string | null>(null);
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [name, setName] = React.useState<string>();
  const [credit, setCredit] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string>()
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  React.useEffect(() => {
    getCredit();
    if (userInformation) {
      let temp = JSON.parse(userInformation);
      let tempName: string = temp.user.name;
      let tempNameSplited = tempName.split(" ");
      setUsername(temp.user.username)
      if (tempNameSplited.length > 2) {
        setName(`${tempNameSplited[0]} ${tempNameSplited[1]}`);
      } else {
        setName(tempName);
      }
      setIdMember(temp.user.member_id);
    }
  }, []);

  async function getCredit() {
    const resutls = await Service.GetCredit();
    if (resutls.statusCode === 200) {
      let temp = resutls.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setCredit(temp);
    }
  }

  function copyToClipboard() {
    let tempUrl = `${window.location.origin}/sign-up/${username}`
    navigator.clipboard.writeText(tempUrl)
    notification.info({
      message: 'Link Ref Berhasil Di Copy',
      placement: 'bottomRight',
      duration: 1000
    })
  }

  if (!idMember || !credit) {
    return <Spinner></Spinner>;
  }

  return (
    <React.Fragment>
      <div className='layout-content'>
        <div style={{ marginBottom: 20 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Hi, {name}
                </div>
              </div>
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div>Saldo</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Rp {credit}
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
                <div style={{marginBottom: 10, width: '100%'}}>
                  <Button style={{width: '100%'}} onClick={() => setShowTransfer(true)} type={"default"}>
                    Transfer SDSB
                  </Button>
                </div>   
                <Button onClick={() => copyToClipboard()} type={"link"}>
                  Bagikan Kode Ref 
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <Row className='rowgap-vbox' gutter={[24, 0]}>
          <CardLogo
            headerText='Transaksi'
            content='QR Code Saya'
            icon={<QrcodeOutlined></QrcodeOutlined>}
            onClick={() => history.push("/qrcode")}></CardLogo>
          <CardLogo
            headerText='Profil'
            content='Profil Saya'
            icon={<UserOutlined></UserOutlined>}
            onClick={() => history.push("/profile")}></CardLogo>
           <CardLogo
                headerText='Pembayaran'
                content='Buat Pembayaran'
                icon={<PayCircleFilled></PayCircleFilled>}
                onClick={() => setShowPaymentModal(true)}></CardLogo>
        </Row>
        <Row>
          <Col xs={24}>
            <HistoryTransaction idMember={idMember}></HistoryTransaction>
          </Col>
        </Row>
      </div>
      <PaymentModal show={showPaymentModal} onClose={() => setShowPaymentModal(false)}></PaymentModal>
      <TransferModal
        show={showTransfer}
        onClose={() => setShowTransfer(false)}></TransferModal>
    </React.Fragment>
  );
}

export default Home;
