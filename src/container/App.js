import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
/// materil ui
import { withStyles } from "@material-ui/core";
//// react router dom
import { Router, Route, Switch } from "react-router-dom";
//////  project files
import AppMainBar from "../components/appMainBar/AppMainBar";
import DaysTable from "./table/daysTable/DaysTable";
import AddDay from "./AddDay";
import Graph from "../container/Graph";
import { deleteDay, addDay, editDay, fetchDays } from "../actions/dataActions";
import history from "../ReactRouterHistory/history";

const styles = themes => ({
  root: {}
});

class App extends React.Component {
  state = {
    isPanelOpen: false,
    selectedRowToEdit: null,
    smokes: []
  };
  componentDidMount = () => {
    this.props.fetchDays();
  };

  ///////////

  handleAddDay = () => {
    this.setState({ isPanelOpen: true });
  };
  handleEditDay = selectedRows => {
    const selectedRowToEdit = _.find(
      this.props.data,
      row => row.id === selectedRows[0]
    );
    this.setState({
      isPanelOpen: true,
      selectedRowToEdit,
      smokes: selectedRowToEdit.smokes
    });
  };

  onFormSubmit = values => {
    if (this.state.selectedRowToEdit) {
      this.props.editDay({
        ...values,
        smokes: this.state.smokes,
        selectedRowToEdit: this.state.selectedRowToEdit
      });
    } else {
      this.props.addDay({ ...values, smokes: this.state.smokes });
    }
    this.setState({ isPanelOpen: false, smokes: [], selectedRowToEdit: null });
  };

  id = 0;
  onSmokesFormSubmit = values => {
    const newSmokes = [...this.state.smokes];
    newSmokes.push({ ...values, id: this.id++ });
    this.setState({ smokes: newSmokes });
  };

  onFormCancle = () => {
    this.setState({ isPanelOpen: false, smokes: [], selectedRowToEdit: null });
  };

  toggleAddPanel = isPanelOpen => () => {
    this.setState({ isPanelOpen });
    if (!isPanelOpen) {
      this.setState({ selectedRowToEdit: null, smokes: [] });
    }
  };

  //////////
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router history={history}>
          <AppMainBar handleAddDay={this.handleAddDay} />
          <Route
            path="/"
            exact
            render={routeProps => (
              <DaysTable
                {...routeProps}
                data={this.props.data}
                handleDeleteDay={this.props.deleteDay}
                handleEditDay={this.handleEditDay}
              />
            )}
          />
          <Route
            path="/newpage"
            exact
            render={routeProps => <Graph {...routeProps} data={this.props.data}/>}
          />
          <AddDay
            isAddPanelOpen={this.state.isPanelOpen}
            toggleAddPanel={this.toggleAddPanel}
            onSmokesFormSubmit={this.onSmokesFormSubmit}
            onFormSubmit={this.onFormSubmit}
            onFormCancle={this.onFormCancle}
            selectedRowToEdit={this.state.selectedRowToEdit}
            smokes={this.state.smokes}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
  data: state.data
});

export default connect(
  mapStateToProps,
  { deleteDay, addDay, editDay, fetchDays }
)(withStyles(styles)(App));

////  make delete row(s) work - done
////  add redux and read data from app store - done
////  change delete data to use redux - done
/////  add places - done
////  bug...  it still show `selected` after deleting rows - done
////  edit trip table - done
//// add fake server - done
////  add places to each trip (complete  the form)  - done
/////  question - is it better to fetch data after add or just add it to the redux state? - done
////  BUG - places state is not set to [] when you close the drawer via clicking on the page - done
////  put submit button at the bottom - done
////  add date-selector for the day - done
////  for places input it cannot be submite as empty - done
///   show places table if it has data - done
///  move `add this place to the trip`   button to the bottom of the add places section - done
////  add calcle button - done
////  add propTypes
/////////  BUG, submiting added smokes won't work - i should send the put request to server in action creator - done
////   BUG, table sort does nothing - done
///  BUG, table sort work incorectly after editing (happens when you add two-digits number) - done
////  show days/smokes on a graph in w new page handle via react router
/////  check the response and if it has been successful dispatch the result or show error to users
/// add a page explaing the app use
//// add propTypes to all pages if needed
