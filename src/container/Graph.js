import React from "react";
///// recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
//// materil ui
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = themes => ({
  root: {
    width: "100%",
    height: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#ffe6ff"
  }
});

class Graph extends React.Component {
  render() {
    const daysAndSmokes = this.props.data.map(d => ({
      day: d.day,
      smokes: d.smokes.length
    }));
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <LineChart
            width={600}
            height={300}
            data={daysAndSmokes}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="smokes"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Graph);
