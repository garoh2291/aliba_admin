import { Drawer } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { changeFobThunk } from "../../../../Redux/trackSlice";

export const FobEdit = ({ fob, cb }) => {
  const dispatch = useDispatch();
  const [inputdata, setInputdata] = useState({
    additionalFee1: {
      value: fob.additionalFee1,
    },
    additionalFee2: {
      value: fob.additionalFee2,
    },
    additionalFee3: {
      value: fob.additionalFee3,
    },
    additionalFee4: {
      value: fob.additionalFee4,
    },
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputdata((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
        },
      };
    });
  };

  const onFinish = (e) => {
    e.preventDefault();
    const {
      additionalFee1: { value: additionalFee1 },
      additionalFee2: { value: additionalFee2 },
      additionalFee3: { value: additionalFee3 },
      additionalFee4: { value: additionalFee4 },
    } = inputdata;

    const values = {
      additionalFee1,
      additionalFee2,
      additionalFee3,
      additionalFee4,
    };

    dispatch(changeFobThunk({ values, _id: fob._id, cb }));
  };
  return (
    <Drawer title="Edit fob" placement="right" onClose={cb} open={true}>
      <div className="drawer_content">
        <Form onSubmit={onFinish}>
          <Col md={12}>
            <FormGroup>
              <Label for="deliveryprice">Fee 1</Label>
              <Input
                value={inputdata.additionalFee1.value}
                id="additionalFee1"
                name="additionalFee1"
                placeholder="Fee1"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="deliveryprice">Fee 2</Label>
              <Input
                value={inputdata.additionalFee2.value}
                id="additionalFee2"
                name="additionalFee2"
                placeholder="Fee2"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>{" "}
          <Col md={12}>
            <FormGroup>
              <Label for="deliveryprice">Fee 3</Label>
              <Input
                value={inputdata.additionalFee3.value}
                id="additionalFee3"
                name="additionalFee3"
                placeholder="Fee3"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>{" "}
          <Col md={12}>
            <FormGroup>
              <Label for="deliveryprice">Fee 4</Label>
              <Input
                value={inputdata.additionalFee4.value}
                id="additionalFee4"
                name="additionalFee4"
                placeholder="Fee4"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Button color="primary" onClick={onFinish}>
            Edit Fob
          </Button>
        </Form>
      </div>
    </Drawer>
  );
};
