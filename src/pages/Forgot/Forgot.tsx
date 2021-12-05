import { notification } from "antd";
import React, { Fragment } from "react";
import ForgotPassword from "../../components/sdsb-component/forgot_password/ForgotPassword";
import { IForgotPassword } from "../../components/sdsb-component/forgot_password/model/PasswordReset";

export default function Forgot() {
  function onSubmit(e: IForgotPassword) {
    const msg =
      e.statusCode === 200 ? "Berhasil memproses perubahan password" : e.error_message;
    notification.info({
      message: msg,
      placement: "bottomRight",
      duration: 3000,
    });
  }

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: '100%'
        }}>
        <div style={{ width: '100%', padding: 20 }}>
          <ForgotPassword
            onSubmit={(e: IForgotPassword) => onSubmit(e)}></ForgotPassword>
        </div>
      </div>
    </Fragment>
  );
}
