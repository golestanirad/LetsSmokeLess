import React from "react";
////// materil UI
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//// react final form
import { Form, Field } from "react-final-form";
//// project files
import FormTextField from "../components/formFields/FormTextField";
import FormDatePickerField from "../components/formFields/FormDatePickerField";
import SmokesTable from "./table/smokesTable/SmokesTable";
import ButtonWithHtmlFor from "../components/button/ButtonWithHtmlFor";

/////   materil UI styles
const styles = theme => ({
  addDayPanel: {
    padding: 10,    
    width: window.innerWidth / 2,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "red",
      width: window.innerWidth
    }
  },
  buttons: {
    padding: 10,
    margin: 10
  }
});

///////   form validations
const required = value => {
  return value ? undefined : "Required";
};
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const mustBeNumberGreaterThanZiro = value =>
  value <= 0 ? "Must Be Greater than 0" : undefined;
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
///////
class AddDay extends React.Component {
  state = { smokes: [] };
  /////
  onFormSubmit = values => {
    this.props.onFormSubmit(values);
  };
  onSmokesFormSubmit = values => {
    this.props.onSmokesFormSubmit(values);
  };
  render() {
    const { classes } = this.props;   
    return (
      <Drawer
        anchor="right"
        open={this.props.isAddPanelOpen}
        onClose={this.props.toggleAddPanel(false)}
      >
        <div className={classes.addDayPanel}>
          <Form
            onSubmit={values => this.onFormSubmit(values)}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form
                onSubmit={async event => {
                  await handleSubmit(event);
                  form.reset();
                }}
              >
                <Typography variant="h6">Add a day</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormDatePickerField
                      {...(this.props.selectedRowToEdit
                        ? { initialValue: this.props.selectedRowToEdit.day }
                        : {})}
                      name="day"
                      validate={required}
                      label="day"
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      {...(this.props.selectedRowToEdit
                        ? {
                            initialValue: this.props.selectedRowToEdit
                              .targetNumberOfSmokes
                          }
                        : {})}
                      name="targetNumberOfSmokes"
                      validate={composeValidators(
                        mustBeNumber,
                        mustBeNumberGreaterThanZiro
                      )}
                      label="targetNumberOfSmokes"
                      isRequired={true}
                    />
                  </Grid>
                </Grid>
                <input
                  type="submit"
                  disabled={submitting}
                  style={{ display: "none" }}
                  id="submit"
                />
                <input
                  style={{ display: "none" }}
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  id="reset"
                />
              </form>
            )}
          />
          <Form
            onSubmit={values => this.onSmokesFormSubmit(values)}
            render={({
              handleSubmit,
              reset,
              submitting,
              pristine,
              values,
              form
            }) => (
              <form
                onSubmit={async event => {
                  await handleSubmit(event);
                  form.reset();
                }}
              >
                <Typography variant="h6">Add Smokes</Typography>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="place"
                      label="Place"
                      validate={required}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField name="reason" label="Reason" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      className={classes.buttons}
                    >
                      Add this smoke to this day
                    </Button>
                  </Grid>
                </Grid>

                {this.props.smokes.length ? (
                  <SmokesTable data={this.props.smokes} />
                ) : null}
              </form>
            )}
          />
          <ButtonWithHtmlFor
            label="Submit"
            colorType="primary"
            htmlFor="submit"
            className={classes.buttons}
          />
          <ButtonWithHtmlFor
            label="Reset"
            colorType="primary"
            htmlFor="reset"
            className={classes.buttons}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={this.props.onFormCancle}
          >
            Cancel
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AddDay);
