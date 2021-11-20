import { Fragment, useEffect, useState } from "react";
import { Row, Col, Modal, notification } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import ProfileComponent from "../components/sdsb-component/profile/Profile";
import ProfilePicture from "../components/sdsb-component/profile_picture/ProfilePicture";
import PasswordReset from "../components/sdsb-component/password_reset/PasswordReset";
import PinReset from "../components/sdsb-component/pin_reset/PinReset";
import { IPasswordReset } from "../components/sdsb-component/password_reset/model/PasswordReset";
import { IPinReset } from "../components/sdsb-component/pin_reset/model/PinResetModel";

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState<"PIN" | "Password" | null>(null);

  useEffect(() => {
    if (credential) {
      setShowModal(true);
    }
  }, [credential]);

  function onPasswordSubmit(status: IPasswordReset) {
    notification.info({
      message: status.message,
      description:
        status.statusCode === 200 ? "Password Updated" : status.error_message,
      placement: "bottomRight",
    });
  }

  function onPinSubmit(status: IPinReset) {
    notification.info({
      message: status.message,
      description:
        status.statusCode === 200 ? "PIN Updated" : status.error_message,
      placement: "bottomRight",
    });
  }

  return (
    <Fragment>
      <ProfilePicture
        avatarUrl={profilavatar}
        backgroundUrl={BgProfile}
        name="Arthur Samuel"
      ></ProfilePicture>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} lg={24} className="mb-24">
          <ProfileComponent
            onChangePassword={() => setCredential("Password")}
            onChangePIN={() => setCredential("PIN")}
            memberCode="CUST_A123"
            name="Arthur Samuel"
            username="Arth"
          ></ProfileComponent>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
          setCredential(null);
        }}
      >
        {credential === "PIN" ? (
          <PinReset onSubmit={(e: IPinReset) => onPinSubmit(e)}></PinReset>
        ) : (
          <PasswordReset
            onSubmit={(e: IPasswordReset) => onPasswordSubmit(e)}
          ></PasswordReset>
        )}
      </Modal>
    </Fragment>
  );
}

export default Profile;
