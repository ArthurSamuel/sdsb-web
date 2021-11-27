import { Fragment, useEffect, useState } from "react";
import { Row, Col, Modal, notification } from "antd";
import ProfileComponent from "../../components/sdsb-component/profile/Profile";
import ProfilePicture from "../../components/sdsb-component/profile_picture/ProfilePicture";
import PasswordReset from "../../components/sdsb-component/password_reset/PasswordReset";
import PinReset from "../../components/sdsb-component/pin_reset/PinReset";
import { IPasswordReset } from "../../components/sdsb-component/password_reset/model/PasswordReset";
import { IPinReset } from "../../components/sdsb-component/pin_reset/model/PinResetModel";
import { KeyToken } from "../../utils/Constant";
import Spinner from "../../components/sdsb-component/spinner/Spinner";
import ProfileService from "./service/Profile";

function Profile() {
  const Service = new ProfileService();
  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState<"PIN" | "Password" | null>(null);
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const userInformation = localStorage.getItem(KeyToken);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    getProfile();
    if (userInformation) {
      let temp = JSON.parse(userInformation);
      setName(temp.user.name);
      setEmail(temp.user.email);
      setPhone(temp.user.member.phone);
    }
  }, []);

  useEffect(() => {
    if (credential) {
      setShowModal(true);
    }
  }, [credential]);

  async function getProfile() {
    const results = await Service.GetProfile();
    setAvatarUrl(results.data.member.profile_image);
    setEmail(results.data.email);
    setPhone(results.data.member.phone);
  }

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

  if (!name || !phone || !email) {
    return (
      <Spinner marginTop={40}></Spinner>
    )
  }

  return (
    <Fragment>
      <ProfilePicture
        avatarUrl={avatarUrl}
        name={name}
        phone={phone}
        email={email}
        onUpdateImage={(e: any) => console.log(e)}></ProfilePicture>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} lg={24} className='mb-24'>
          <ProfileComponent
            onChangePassword={() => setCredential("Password")}
            onChangePIN={() => setCredential("PIN")}></ProfileComponent>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
          setCredential(null);
        }}>
        {credential === "PIN" ? (
          <PinReset onSubmit={(e: IPinReset) => onPinSubmit(e)}></PinReset>
        ) : (
          <PasswordReset
            onSubmit={(e: IPasswordReset) =>
              onPasswordSubmit(e)
            }></PasswordReset>
        )}
      </Modal>
    </Fragment>
  );
}

export default Profile;
