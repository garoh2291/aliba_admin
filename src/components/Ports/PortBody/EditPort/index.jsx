import { Form, message, Input, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePortThunk } from "../../../../Redux/trackSlice";
const tailLayout = {
  wrapperCol: {
    offset: 2,
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

export const EditPort = ({ editable, onclose }) => {
  const { _id } = editable;
  const [editData, setEditData] = useState({
    port: {
      value: editable.port,
    },
    deliveryPrice: {
      value: editable.deliveryPrice,
    },
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const cbError = () => {
    message.error("Wrong Details");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
        },
      };
    });
  };

  const onFinish = () => {
    const {
      port: { value: port },
      deliveryPrice: { value: deliveryPrice },
    } = editData;

    const values = {
      deliveryPrice,
      port: port.trim(),
    };
    onclose();
    dispatch(changePortThunk({ values, _id, onclose }));
    form.resetFields();
  };
  return (
    <div className="new_port">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          label={"Port Name"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Input
            name="port"
            placeholder="Port name"
            defaultValue={editData.port.value}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label={"Port Price"}
          style={{ marginBottom: "20px" }}
          rules={[
            { required: true },
            {
              pattern: "^([-]?[1-9][0-9]*|0)$",
              message: "Price must be a number",
            },
          ]}
        >
          <Input
            name={"deliveryPrice"}
            placeholder="Port Price"
            defaultValue={editData.deliveryPrice.value}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Change
          </Button>
          <Button type="secondary" htmlType="submit" onClick={onclose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
