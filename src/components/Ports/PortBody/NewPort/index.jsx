import { Form, message, Input, Button } from "antd";

import "./styles.css";
import { useDispatch } from "react-redux";
import { createPortThunk } from "../../../../Redux/trackSlice";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
};

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
export const NewPort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const cbError = () => {
    message.error("Port is Exist");
  };
  const onFinish = (values) => {
    dispatch(createPortThunk({ values, cbError }));
    form.resetFields();
  };

  return (
    <div className="new_port">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          label={"Port Name"}
          name={"port"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Port name" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={"Port Price"}
          name={"deliveryPrice"}
          style={{ marginBottom: "20px" }}
          rules={[
            { required: true },
            {
              pattern: "^([-]?[1-9][0-9]*|0)$",
              message: "Price must be a number",
            },
          ]}
        >
          <Input placeholder="Port Price" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add Port
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
