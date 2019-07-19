import React from "react";
///// materil ui
import Button from "@material-ui/core/Button";

const buttonWithHtmlFor = ({ htmlFor, label, colorType, className }) => {
  return (
    <label
      onClick={e => {
        if (e.target !== e.currentTarget) e.currentTarget.click();
      }}
      htmlFor={htmlFor}
    >
      <Button variant="contained" color={colorType} className={className}>
        {label}
      </Button>
    </label>
  );
};

export default buttonWithHtmlFor;
