import React from "react";
////// materil UI
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
//// react final form
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
//// project files
import FormTextField from "../components/formFields/FormTextField";
import FormDatePickerField from "../components/formFields/FormDatePickerField";


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
  },
  paper: {
    margin: 10,
    backgroundColor: "#cce6ff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  smokeButton: {
    margin: 5
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
  onFormSubmit = values => {  
    this.props.onFormSubmit(values);
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
            {...(this.props.selectedRowToEdit
              ? {
                  initialValues: { smokes: this.props.selectedRowToEdit.smokes }
                }
              : {})}
            onSubmit={values => this.onFormSubmit(values)}
            mutators={{ ...arrayMutators }}
            render={({
              handleSubmit,
              form: {
                mutators: { push, pop }
              },
              form,
              submitting,
              pristine,
              values
            }) => (
              <form
                onSubmit={async event => {
                  await handleSubmit(event);
                  form.reset();
                }}
              >
                <Typography variant="h6">Add a day</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
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
                  <Grid item xs={12} sm={5}>
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
                  <Grid item xs={12} sm={10}>
                    <Button
                      onClick={() => push("smokes", undefined)}
                      variant="outlined"
                      size="medium"
                      color="primary"
                      className={classes.smokeButton}
                    >
                      Add Smoke
                    </Button>
                    <Button
                      onClick={() => pop("smokes")}
                      variant="outlined"
                      size="medium"
                      color="primary"
                      className={classes.smokeButton}
                    >
                      Remove Smoke
                    </Button>
                  </Grid>
                  <Grid container item xs={12} sm={10}>
                    <FieldArray name="smokes">
                      {({ fields }) =>
                        fields.map((name, index) => {
                          return (
                            <Paper key={name} className={classes.paper}>
                              <h2 style={{ margin: 20 }}>Smoke #{index + 1}</h2>
                              <div style={{ margin: 20 }}>
                                <FormTextField
                                  name={`${name}.place`}
                                  label="Place"
                                  validate={required}
                                />
                              </div>
                              <div style={{ margin: 20 }}>
                                <FormTextField
                                  name={`${name}.reason`}
                                  label="Reason"
                                />
                              </div>

                              <IconButton
                                aria-label="Delete"
                                className={classes.margin}
                                onClick={() => fields.remove(index)}
                                color="primary"
                                style={{
                                  cursor: "pointer",
                                  margin: 20
                                }}
                              >
                                <DeleteIcon fontSize="large" />
                              </IconButton>
                            </Paper>
                          );
                        })
                      }
                    </FieldArray>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  id="submit"
                  className={classes.buttons}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className={classes.buttons}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={this.props.onFormCancle}
                >
                  Cancel
                </Button>
              </form>
            )}
          />
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AddDay);
