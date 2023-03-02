import { Button, Drawer } from "antd";
import { Select, Form, message, Input } from "antd";
import states from "../../../static/states.json";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createCityThunk, setPortThunk } from "../../../Redux/trackSlice";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../helpers/token";

const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    offset: 0,
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

export const CityDrawer = ({ drawer, changeDrawer }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { ports } = useSelector((state) => state.track);
  const navigate = useNavigate();
  const cb = () => {
    removeToken();
    navigate("/login");
  };
  useEffect(() => {
    dispatch(setPortThunk({ cb }));
  }, []);

  const cbError = () => {
    message.error("Can't add this City");
  };

  const onFinish = (values) => {
    dispatch(createCityThunk({ values }));
    form.resetFields();
  };

  const changeHandle = (e) => {
    console.log(e);
  };
  return (
    <Drawer
      title="Add New City"
      placement="right"
      onClose={changeDrawer}
      open={true}
    >
      <div className="drawer_content">
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name={"state"}
            style={{ marginBottom: "20px" }}
            rules={[{ required: true }]}
          >
            {
              <Select
                placeholder="State"
                style={{ width: "100%" }}
                showSearch
                onSelect={changeHandle}
              >
                {states.map((state) => (
                  <Option key={state.name} value={state.abbreviation}>
                    {state.name}
                  </Option>
                ))}
              </Select>
            }
          </Form.Item>
          <Form.Item
            name={"city"}
            style={{ marginBottom: "20px" }}
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={"activeport"}
            style={{ marginBottom: "20px" }}
            rules={[{ required: true }]}
          >
            {
              <Select
                placeholder="Default Port"
                style={{ width: "100%" }}
                showSearch
                onSelect={changeHandle}
              >
                {ports.map((port) => (
                  <Option key={port._id} value={port._id}>
                    {port.port}
                  </Option>
                ))}
              </Select>
            }
          </Form.Item>
          <Form.Item
            name={"deliveryprice"}
            style={{ marginBottom: "20px" }}
            rules={[
              {
                pattern: "^([-]?[1-9][0-9]*|0)$",
                message: "Only Number",
              },
            ]}
          >
            <Input placeholder="Price" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add City
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};
