import { Row, Col } from "antd";
import {
  PlusOutlined,
  PayCircleFilled,
  TransactionOutlined,
} from "@ant-design/icons";
import CardCredit from "../components/sdsb-component/card_credit/CardCredit";
import CardSmall from "../components/sdsb-component/card_small/CardSmall";
import { ITransactionGroup } from "../components/sdsb-component/history_transcation/model/HistoryTranscationModel";
import HistoryTransaction from "../components/sdsb-component/history_transcation/HistoryTransaction";
import { Fragment, useState } from "react";
import PaymentModal from "../components/local/PaymentModal";
import TransferModal from "../components/local/TransferModal";

function Billing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  return (
    <Fragment>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={24}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} xl={12} className="mb-24">
              <CardCredit
                memberCode="CUST_123"
                userName="Arthur Samuel"
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
              <HistoryTransaction></HistoryTransaction>
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
