import React from "react";
////// react-final-form
import { Field } from "react-final-form";
//// materil ui
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/styles/withStyles";

const styles = themes => ({
  textField: {
    margin: 10
  }
});

const formDatePickerField = props => {
  return (
    <Field
      {...(props.initialValue ? { initialValue: props.initialValue } : {})}
      name={props.name}
      validate={props.validate}
    >
      {({ input, meta }) => {
        return (
          <div>           
            <TextField
              {...input}
              className={props.classes.textField}
              required={props.isRequired}
              id={props.name}
              name={props.name}
              label={props.label}
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true
              }}
            />
            {meta.error && meta.touched && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default withStyles(styles)(formDatePickerField);
