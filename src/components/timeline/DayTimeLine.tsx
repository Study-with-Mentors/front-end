import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Timeline } from "antd";

const DayTimeLine: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <Timeline
        mode={"left"}
        items={[
          {
            label: "2015-09-01",
            children: "Create a services",
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Solve initial network problems",
          },
          {
            children: "Technical testing",
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Network problems being solved",
          },
        ]}
      />
    </div>
  );
};

export default DayTimeLine;
