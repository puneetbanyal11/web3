import React, { useState } from "react";
import Editor from "./editor";
import { Button, Space, Card, notification } from "antd";
import { ErrorMessage } from "./errorMessage";
import { validateAddressAmountData } from "../utils/util";

export const App = () => {
  const [data, setData] = useState("");
  const [errors, setError] = useState([]);
  const [onlyFirstAddressLine, setFirstAddress] = useState([]);
  const [combinedAmount, setCombinedAddress] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = () => {
    const {
      getErrorMsgsToDisplay,
      onlyFirstAddress,
      combinedAddressAmount,
      isDuplicate: duplicated,
    } = validateAddressAmountData(data.split("\n"));

    setError(getErrorMsgsToDisplay);
    setFirstAddress(onlyFirstAddress);
    setCombinedAddress(combinedAddressAmount);
    setIsDuplicate(duplicated);

    if (getErrorMsgsToDisplay.length === 0) {
      api.info({
        message: `Sucessfully Submitted`,
        placement: "top",
      });
    }
  };

  const onKeepFirstOrCombine = (isKeepfirst) => {
    const lineArray = isKeepfirst ? onlyFirstAddressLine : combinedAmount;
    const data = lineArray.filter(Boolean).reduce((acc, curr, index) => {
      if (index === 0) {
        acc += curr;
      } else {
        acc += "\n" + curr;
      }
      return acc;
    }, "");
    setData(data);
    setCombinedAddress([]);
    setFirstAddress([]);
    setError([]);
    setIsDuplicate(false);
  };

  return (
    <>
      {contextHolder}
      <Card style={{ width: "100%" }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <span>Addresses and amount</span>
          <Editor data={data} setData={setData} />
          {errors.length > 0 ? (
            <ErrorMessage
              onKeepFirst={onKeepFirstOrCombine}
              onCombine={onKeepFirstOrCombine}
              errors={errors}
              isDuplicate={isDuplicate}
            />
          ) : null}
          <Button type="primary" block onClick={onSubmit}>
            Submit
          </Button>
        </Space>
      </Card>
    </>
  );
};
