import React from "react";
import { Col, Row, Form as AntForm, Input } from "antd";
import config from "../../config";

const DefaultClient: Client = {
  firstname: "",
  lastname: "",
  address: {
    addressLine1: "",
    postal: "",
    city: "",
    state: "",
    country: "PL",
  },
  delivery: "postal",
  phone: "",
  email: "",
};

export const Form: React.FC<{
  client?: Client;
  onUpdate?: (client: Client) => void;
}> = (props) => {
  const { Item } = AntForm;

  const client = { ...DefaultClient, ...(props.client || {}) };

  const updateClient = (field: string, value: string) => {
    const path = field.split(".");
    let obj = client;
    while (path.length > 1) {
      obj = obj[path.shift()];
    }
    obj[path.shift()] = value;
    props.onUpdate(client);
  };

  const onInputChange = <T extends Element & { value: string }>(
    field: string
  ) => (e: React.ChangeEvent<T>) => updateClient(field, e.target.value);

  const commonInputProps = { disabled: typeof props.onUpdate !== "function" };

  return (
    <div className="tw-px-2 tw-pt-3 tw-pb-1 tw-bg-white">
      <AntForm layout="vertical" size="middle" initialValues={client}>
        <Row gutter={8}>
          <Col span={12}>
            <Item
              label="Imię"
              required
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Imię jest wymagane",
                },
              ]}
            >
              <Input
                {...commonInputProps}
                placeholder=""
                onChange={onInputChange("firstname")}
              />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Nazwisko"
              required
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Nazwisko jest wymagane",
                  whitespace: false,
                },
              ]}
            >
              <Input
                {...commonInputProps}
                placeholder=""
                onChange={onInputChange("lastname")}
              />
            </Item>
          </Col>
        </Row>

        {config.address && (
          <Item>
            <Item
              name="addressLine1"
              label="Adres"
              rules={[
                {
                  required: true,
                  message: "Adres jest wymagany",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea
                {...commonInputProps}
                rows={2}
                placeholder=""
                onChange={onInputChange("address.addressLine1")}
              />
            </Item>
            <Row gutter={8}>
              <Col span={16}>
                <Item
                  name="city"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Miasto jest wymagane",
                    },
                  ]}
                >
                  <Input
                    {...commonInputProps}
                    placeholder=""
                    onChange={onInputChange("address.city")}
                  />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  name="postal"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Kod pocztowy jest wymagany",
                    },
                  ]}
                >
                  <Input
                    {...commonInputProps}
                    placeholder="00-00"
                    onChange={onInputChange("address.postal")}
                  />
                </Item>
              </Col>
            </Row>
          </Item>
        )}

        <Row gutter={8}>
          <Col span={12}>
            <Item
              name="phone"
              required
              label="Telefon"
              rules={[
                {
                  required: true,
                  message: "Telefon jest wymagany",
                  whitespace: false,
                },
              ]}
            >
              <Input {...commonInputProps} onChange={onInputChange("phone")} />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="email"
              required
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "To nie jest poprawny adres e-mail",
                },
                {
                  required: true,
                  message: "Adres e-mail jest wymagany",
                },
              ]}
            >
              <Input {...commonInputProps} onChange={onInputChange("email")} />
            </Item>
          </Col>
        </Row>
      </AntForm>
    </div>
  );
};
