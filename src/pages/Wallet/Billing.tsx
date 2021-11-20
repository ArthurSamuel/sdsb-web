import { Row, Col } from "antd";
import {
  PayCircleFilled,
  TransactionOutlined,
} from "@ant-design/icons";
import CardCredit from "../../components/sdsb-component/card_credit/CardCredit";
import CardSmall from "../../components/sdsb-component/card_small/CardSmall";
import HistoryTransaction from "../../components/sdsb-component/history_transcation/HistoryTransaction";
import { Fragment, useEffect, useState } from "react";
import PaymentModal from "../../components/local/PaymentModal";
import TransferModal from "../../components/local/TransferModal";
import { KeyToken } from "../../utils/Constant";
import Spinner from "../../components/sdsb-component/spinner/Spinner";

function Billing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [name, setName] = useState('...');
  const [kode, setKode] = useState('...');
  const [idMember, setIdMember] = useState<string|null>(null);
  const userInformation = localStorage.getItem(KeyToken)

  useEffect(() => {
    if (userInformation) {
      let temp = JSON.parse(userInformation)
      setName(temp.user.name)
      setIdMember(temp.user.member_id);
      if (temp.user.member.code) {
        setKode(temp.user.member.code)
      }
    }
  },[])

  if (!idMember) {
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <Fragment>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={24}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} xl={12} className="mb-24">
              <CardCredit
                memberCode={kode}
                userName={name}
              ></CardCredit>
            </Col>
            <Col xs={12} md={6} xl={6} className="mb-24">
              <CardSmall
                icon={<PayCircleFilled></PayCircleFilled>}
                buttonText="Pay"
                headerText="Payment"
                descriptionText="Create Payment"
                onClick={() => setShowPaymentModal(true)}
              ></CardSmall>
            </Col>
            <Col xs={12} md={6} xl={6} className="mb-24">
              <CardSmall
                icon={<TransactionOutlined></TransactionOutlined>}
                buttonText="Transfer"
                headerText="Transfer"
                descriptionText="Transfer Wallet"
                onClick={() => setShowTransferModal(true)}
              ></CardSmall>
            </Col>
          </Row>
          <Row>
            <Col span={24} md={24}>
              <HistoryTransaction idMember={idMember}></HistoryTransaction>
            </Col>
          </Row>
        </Col>
      </Row>
      <PaymentModal
        onClose={() => setShowPaymentModal(false)}
        show={showPaymentModal}
      ></PaymentModal>
      <TransferModal
        onClose={() => setShowTransferModal(false)}
        show={showTransferModal}
      ></TransferModal>
    </Fragment>
  );
}

export default Billing;
