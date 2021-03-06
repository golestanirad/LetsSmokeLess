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
import SelectedDaysDisplay from "../components/selectedDaysDisplay/selectedDaysDisplay";
import {
  deleteDay,
  addDay,
  editDay,
  fetchDays,
  selectDay
} from "../actions/dataActions";
import history from "../ReactRouterHistory/history";
import selectedDays from "../selectors/selectedDays";

const styles = themes => ({
  root: {}
});

class App extends React.Component {
  state = {
    isPanelOpen: false,
    selectedRowToEdit: null
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
    if (!values.smokes) values.smokes = [];
    let { smokes } = values;
    const idAddedSmokes = smokes.map(smoke => ({
      ...smoke,
      id: Math.random()
    }));
    if (this.state.selectedRowToEdit) {
      values = { ...values, smokes:idAddedSmokes  };
      this.props.editDay({
        ...values,
        selectedRowToEdit: this.state.selectedRowToEdit
      });
    } else {
      this.props.addDay({ ...values, smokes: idAddedSmokes });
    }
    this.setState({ isPanelOpen: false, smokes: [], selectedRowToEdit: null });
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

  onSelectDays = selectedDaysID => {
    this.props.selectDay(selectedDaysID);
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
                handleSelectDays={this.onSelectDays}
              />
            )}
          />
          <Route
            path="/newpage"
            exact
            render={routeProps => (
              <Graph {...routeProps} data={this.props.data} />
            )}
          />
          <AddDay
            isAddPanelOpen={this.state.isPanelOpen}
            toggleAddPanel={this.toggleAddPanel}
            onFormSubmit={this.onFormSubmit}
            onFormCancle={this.onFormCancle}
            selectedRowToEdit={this.state.selectedRowToEdit}
          />
          <SelectedDaysDisplay days={this.props.selectedDays} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
  data: state.data,
  selectedDays: selectedDays(state)
});

export default connect(
  mapStateToProps,
  { deleteDay, addDay, editDay, fetchDays, selectDay }
)(withStyles(styles)(App));

//// 1) make delete row(s) work - DONE
//// 2) add redux and read data from app store - DONE
//// 3) change delete data to use redux - DONE
///// 4) add places - DONE
//// 5) bug...  it still show `selected` after deleting rows - DONE
//// 6) edit trip table - DONE
//// 7) add fake server - DONE
//// 8) add places to each trip (complete  the form)  - DONE
///// 9) question - is it better to fetch data after add or just add it to the redux state? - DONE
//// 10) BUG - places state is not set to [] when you close the drawer via clicking on the page - DONE
//// 11) put submit button at the bottom - DONE
//// 12) add date-selector for the day - DONE
//// 13) for places input it cannot be submite as empty - DONE
///  14) show places table if it has data - DONE
/// 15) move `add this place to the trip`   button to the bottom of the add places section - DONE
//// 16) add calcle button - DONE
//// 17) BUG, submiting added smokes won't work - i should send the put request to server in action creator - DONE
////  18) BUG, table sort does nothing - DONE
/// 19) BUG, table sort work incorectly after editing (happens when you add two-digits number) - DONE
//// 20) show days/smokes on a graph in w new page handle via react router - DONE
///// 21) check the response and if it has been successful dispatch the result or show error to users
/// 22) add a page explaing the app use
//// 23) add propTypes to all pages if needed
//// 24) adding reselect - DONE
////  25) use field array and only one form on addDays
//// 260 numerb of smoke won't chage in edit
