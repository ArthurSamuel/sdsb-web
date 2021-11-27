import React, { Fragment, useState } from "react";
import { Button, Card, Form, Input, notification, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import SignUpService from "./service/SIgnUpService";

export default function SignUp() {
  const history = useHistory()
  const Service = new SignUpService();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [pin, setPin] = useState<string>();
  const [idRef, setIdRef] = useState<string>();
  const [isFetch, setIsFetch] = useState(false);

  async function doRegister() {
    if (
      name &&
      username &&
      email &&
      password &&
      passwordConfirm &&
      phone &&
      pin
    ) {
      setIsFetch(true)
      const resutls = await Service.Register({
        name,
        username,
        email,
        password,
        passwordConfirm,
        phone,
        pin,
        idRef,
      });
      setIsFetch(false)
      let message = resutls.statusCode === 200 ? "Success" : resutls.message;
      let description =
        resutls.statusCode === 200
          ? "Berhasil Mendaftarkan Akun, Mohon Cek Email Anda"
          : resutls.error_message;
      notification.info({
        message,
        description,
        placement: "bottomRight",
      });
      if (resutls.statusCode === 200) {
        history.push(`/verification/${email}/${phone}`)
      }
    }
  }

  return (
    <Fragment>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header"></div>
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register</h5>}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={() => doRegister()}
              className="row-col"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="Cpassword"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  type={"password"}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input
                  type={"number"}
                  onChange={(e) => setPhone(parseInt(e.target.value))}
                  placeholder="Phone Number"
                />
              </Form.Item>
              <Form.Item
                name="pin"
                rules={[{ required: true, message: "Please input your Pin!" }]}
              >
                <Input
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                />
              </Form.Item>
              <Form.Item name="ref">
                <Input
                  addonBefore="Username"
                  onChange={(e) => setIdRef(e.target.value)}
                  placeholder="Kode Ref Username"
                />
              </Form.Item>
              {isFetch ? (
                <Form.Item>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spin></Spin>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              )}
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
      </div>
    </Fragment>
  );
}
