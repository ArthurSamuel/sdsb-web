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
import { Fragment } from "react";

function Billing() {
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
                onClick={() => console.log("asd")}
              ></CardSmall>
            </Col>
            <Col xs={12} md={6} xl={6} className="mb-24">
              <CardSmall
                icon={<TransactionOutlined></TransactionOutlined>}
                buttonText="Transfer"
                headerText="Transfer"
                descriptionText="Transfer Wallet"
                onClick={() => console.log("asd")}
              ></CardSmall>
            </Col>
          </Row>
          <Row>
            <Col span={24} md={24}>
              <HistoryTransaction
                dataTranscation={dataTranscation}
              ></HistoryTransaction>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Billing;
