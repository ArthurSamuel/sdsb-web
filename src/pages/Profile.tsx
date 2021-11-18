import { Fragment, useEffect, useState } from "react";
import { Row, Col, Modal } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import ProfileComponent from "../components/sdsb-component/profile/Profile";
import ProfilePicture from "../components/sdsb-component/profile_picture/ProfilePicture";
import PasswordReset from "../components/sdsb-component/password_reset/PasswordReset";
import PinReset from "../components/sdsb-component/pin_reset/PinReset";

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState<"PIN" | "Password" | null>(null);

  useEffect(() => {
    if (credential) {
      setShowModal(true);
    }
  }, [credential]);

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
          <PinReset></PinReset>
        ) : (
          <PasswordReset></PasswordReset>
        )}
      </Modal>
    </Fragment>
  );
}

export default Profile;
