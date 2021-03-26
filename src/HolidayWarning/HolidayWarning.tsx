import React from "react";

const HolidayWarning = ({ theme }) => (
  <div
    className={`test-component test-component-${theme}`}
  >
    <h1 className="heading">I'm the test component</h1>
    <h2>Made with love by Harvey</h2>
  </div>
);

export default HolidayWarning;
