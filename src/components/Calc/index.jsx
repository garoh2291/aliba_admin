import { useContext, useEffect, useState } from "react";
import { CalcContext } from "../../context";
import { Button } from "antd";
import { Select, Form, message, Input } from "antd";
import "./styles.css";
import { BACKEND_URL } from "../../data";
import { CalcPreview } from "./CalcPreview";

const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 24,
  },
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

export const Calc = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);
  const { info, setInfo, summary, setSummary } = useContext(CalcContext);

  const onFinish = (values) => {
    setSummary(true);
  };
  const handleDelivery = (value) => {
    const { price } = cities.find(({ city }) => city === value);
    setInfo((prev) => {
      return {
        ...prev,
        deliveryPrice: {
          value: price,
        },
      };
    });
  };

  const handlePrice = (e) => {
    const { value } = e.target;
    if (value) {
      fetch(`${BACKEND_URL}/fob/single/${value}`)
        .then((res) => res.json())
        .then((data) => {
          const { price } = data;
          const insurance =
            (+price + +value) * 0.015 > 70 ? (+price + +value) * 0.015 : 70;
          setInfo((prev) => {
            return {
              ...prev,
              carPrice: {
                value: value,
              },
              fobPrice: {
                value: price,
              },
              insPrice: {
                value: insurance,
              },
            };
          });
        });
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/cities/all`)
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  return (
    <div>
      <div className="page_header">
        <h3>Calculator</h3>
      </div>
      <div className="calc_section">
        <div className="calc_wrapper">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name={"carPrice"}
              style={{ marginBottom: "20px" }}
              rules={[
                {
                  pattern: "^([-]?[1-9][0-9]*|0)$",
                  message: "Only Number",
                },
                { required: true, message: "Price is required" },
              ]}
            >
              <Input
                placeholder="Price"
                style={{ width: "100%" }}
                onChange={handlePrice}
              />
            </Form.Item>
            <Form.Item
              name={"activeport"}
              style={{ marginBottom: "20px" }}
              rules={[{ required: true, message: "City is required" }]}
            >
              {
                <Select
                  placeholder="Default Port"
                  style={{ width: "100%" }}
                  showSearch
                  onSelect={handleDelivery}
                >
                  {cities.map((city) => (
                    <Option key={city._id} value={city.city}>
                      {city.city}
                    </Option>
                  ))}
                </Select>
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Calculate
              </Button>
            </Form.Item>
          </Form>
        </div>
        {summary && <CalcPreview />}
      </div>
    </div>
  );
};
