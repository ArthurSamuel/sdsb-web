import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import SignUpService from "./service/VerificationService";
import { useHistory, useParams } from "react-router";

export default function Verification() {
  const Service = new SignUpService();
  const history = useHistory();
  const { emailParam, phoneParam } =
    useParams<{ emailParam: string; phoneParam: string }>();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>();
  const [phoneVer, setPhoneVer] = useState<string>();
  const [emailVer, setEmailVer] = useState<string>();
  const [timerPhone, setTimerPhone] = useState<number>(60);
  const [timerEmail, setTimerEmail] = useState<number>(60);
  const refTimerEmail = useRef<any>();
  const refTimerPhone = useRef<any>();

  useEffect(() => {
    if (emailParam && phoneParam) {
      setPhone(phoneParam);
      setEmail(emailParam);
    }
  }, []);

  useEffect(() => {
    if (timerEmail >= 60 && refTimerEmail.current) {
      clearInterval(refTimerEmail.current);
      refTimerEmail.current = null;
    }
  }, [timerEmail]);

  useEffect(() => {
    if (timerPhone >= 60 && refTimerPhone.current) {
      clearInterval(refTimerPhone.current);
      refTimerPhone.current = null;
    }
  },[timerPhone])

  async function sentEmailCode() {
    const identifier = email;
    if (!identifier) {
      return;
    }
    if (timerEmail === 60) {
      const results = await Service.SentVerificationCode(identifier, "email");
      notification.open({
        message:
          results.statusCode === 200
            ? "Berhasil Mengirim Kode"
            : results.error_message,
        placement: "bottomRight",
        type: "info",
      });
      if (results.statusCode === 200) {
        refTimerEmail.current = setInterval(() => {
          setTimerEmail((prev) => {
            if (prev - 1 > 0) {
              return prev - 1;
            }
            return 60;
          });
        }, 1000);
      }
    }
  }

  // async function sentPhoneCode() {
  //   const identifier = phone;
  //   if (!identifier) {
  //     return;
  //   }
  //   if (timerPhone === 60) {
  //     const results = await Service.SentVerificationCode(identifier, "phone");
  //     notification.open({
  //       message:
  //         results.statusCode === 200
  //           ? "Berhasil Mengirim Kode"
  //           : results.error_message,
  //       placement: "bottomRight",
  //       type: "info",
  //     });
  //     if (results.statusCode === 200) {
  //       refTimerPhone.current = setInterval(() => {
  //         setTimerPhone((prev) => {
  //           if (prev - 1 > 0) {
  //             return prev - 1;
  //           }
  //           return 60;
  //         });
  //       }, 1000);
  //     }
  //   }
  // }

  async function onSubmit() {
    if (emailVer && email) {
      const results = await Service.SubmitVerification(
        email,
        'phone', //disabled phone due to client wishes
        emailVer,
        'phoneVer' //disabled phone due to client wishes
      );
      notification.open({
        message:
          results.statusCode === 200
            ? "Berhasil Melakukan Verifikasi"
            : results.error_message,
        placement: "bottomRight",
        type: "info",
      });
      if (results.statusCode === 200) {
        history.push("/sign-in");
      }
    } else {
      notification.open({
        message: "Mohon Lengkapi Form",
        placement: "bottomRight",
        type: "info",
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: 20,
      }}>
      <div style={{ maxWidth: 700, flex: 1, marginTop: "1vh" }}>
        <Card style={{ width: "100%", marginTop: 10 }}>
          <Form style={{ width: "100%" }} layout='vertical' className='row-col'>
            <Form.Item className='username' label='Email'>
              <Input
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item className='username' label='Nomor Telepon'>
              <Input
                value={phone}
                type={"number"}
                placeholder='Nomor Telepon'
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              className='username'
              label='Kode Verifikasi Email'
              rules={[
                {
                  required: true,
                  message: "Mohon Masukan Kode Verifikasi Email",
                },
              ]}>
              <Input
                placeholder='Kode Verifikasi Email'
                onChange={(e) => setEmailVer(e.target.value)}
              />
              <div
                onClick={() => sentEmailCode()}
                style={{ padding: 10, fontSize: 12 }}>
                <span
                  style={{
                    cursor: "pointer",
                    marginRight: 20,
                    color: timerEmail < 60 ? "#dedede" : "black",
                  }}>
                  Sent Verifikasi Kode
                </span>
                {timerEmail < 60 && <span>{timerEmail}</span>}
              </div>
            </Form.Item>
            {/* <Form.Item
              className='username'
              label='Kode Verifikasi Nomor Telepon'
              rules={[
                {
                  required: true,
                  message: "Mohon Masukan Kode Verifikasi Nomor Telepon",
                },
              ]}>
              <Input
                placeholder='Kode Verifikasi Nomor Telepon'
                onChange={(e) => setPhoneVer(e.target.value)}
              />
              <div
                onClick={() => sentPhoneCode()}
                style={{ padding: 10, fontSize: 12 }}>
                <span
                  style={{
                    cursor: "pointer",
                    marginRight: 20,
                    color: timerPhone < 60 ? "#dedede" : "black",
                  }}>
                  Sent Verifikasi Kode
                </span>
                {timerPhone < 60 && <span>{timerPhone}</span>}
              </div>
            </Form.Item> */}
            <Form.Item>
              <Button
                onClick={() => onSubmit()}
                style={{ width: "100%" }}
                type='primary'
                htmlType='submit'>
                Verifikasi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
