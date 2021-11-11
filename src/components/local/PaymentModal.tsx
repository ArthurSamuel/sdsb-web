import { Button, Input, Modal } from "antd";
import React from "react";

interface IPaymentModal {
  show: boolean;
  onClose: Function;
}

export default function PaymentModal(props: IPaymentModal) {
  return (
    <div>
      <Modal
        footer={null}
        title="Create Payment"
        visible={props.show}
        onCancel={() => props.onClose()}
      >
        <div>
          <div style={{width: 150, marginBottom: 10}}>
            <span style={{fontSize: 15, fontWeight: 'bold'}}>Nominal</span>
          </div>
          <div>
            <Input size="small"></Input>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
            <Button type="primary">
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
