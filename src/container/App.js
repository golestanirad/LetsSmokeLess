import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
/// materil ui
import { withStyles } from "@material-ui/core";
//////  project files
import AppMainBar from "../components/appMainBar/AppMainBar";
import DaysTable from "./table/daysTable/DaysTable";
import AddDay from "./AddDay";
import { testAction } from "../actions/testAction";
import { deleteDay, addDay, editDay, fetchDays } from "../actions/dataActions";

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
        <AppMainBar handleAddDay={this.handleAddDay} />
        <DaysTable
          data={this.props.data}
          handleDeleteDay={this.props.deleteDay}
          handleEditDay={this.handleEditDay}
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
  { testAction, deleteDay, addDay, editDay, fetchDays }
)(withStyles(styles)(App));

//// 1) make delete row(s) work - done
//// 2) add redux and read data from app store - done
//// 3) change delete data to use redux - done
///// 4) add places - done
//// 5) bug...  it still show `selected` after deleting rows - done
//// 6) edit trip table - done
//// 7) add fake server - done
//// 8) add places to each trip (complete  the form)  - done
//// 9) show points/places on map via react router
///// 10) question - is it better to fetch data after add or just add it to the redux state? - done
//// 11) BUG - places state is not set to [] when you close the drawer via clicking on the page - done
//// 12) put submit button at the bottom - done
//// 13) add start and end time for the trip
/// 14) make id random
//// 15) for places input it cannot be submite as empty - done
/// 16)  show places table if it has data - done
/// 17) move `add this place to the trip`   button to the bottom of the add places section - done
//// 18) add calcle button - done
//// 19) add propTypes
///////// 20) BUG, submiting added smokes won't work - i should send the put request to server in action creator - done
///// 21) check the response and the dispatch
//// 22)  BUG, table sort does nothing - done
/// 23) BUG, table sort work incorectly after editing (happens when you add two-digits number)

