import React, { useEffect, useState } from "react";
import "./App.css";
import axois from "axios";
import moment from "moment";
import statesJson from "./states_hash.json";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles(theme => ({
  heading: {
    marginTop: theme.spacing(5)
  },
  input: {
    minWidth: "65%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  card: {
    minWidth: 300,
    display: "inline-block",
    margin: 5,
    backgroundColor: "white"
  },
  greenColor: {
    color: "green"
  },
  redColor: {
    color: "red"
  },
  pos: {
    marginBottom: 12
  }
}));

function App() {
  const classes = useStyles();
  const [states, setStates] = useState(null);
  const [filtered, setFiltered] = useState("");

  async function getData() {
    const output = await axois.get("https://covidtracking.com/api/states");
    setStates(output.data);
  }

  useEffect(() => {
    getData();
  }, []);

  function getState(code) {
    for (let i = 0; i < statesJson.length; i++) {
      if (statesJson[i].abbreviation === code) {
        return statesJson[i].name;
      }
    }

    return "unknown state";
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h2" className={classes.heading}>
          COVID-19 cases by State
        </Typography>
        <TextField
          id="filled-basic"
          label="Enter State Code"
          variant="filled"
          className={classes.input}
          onChange={e => setFiltered(e.target.value.toLowerCase())}
          helperText="Example: New York's state code is NY"
        />
        <br />
        {states !== null
          ? states
              .filter(f => f.state.toLowerCase().includes(filtered))
              .map(s => (
                <Grow in={true} key={s.state}>
                  <Card className={classes.card} elevation={5}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        variant="h5"
                        gutterBottom
                      >
                        {getState(s.state)}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Positive: {s.positive || 0}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        gutterBottom
                      >
                        Negative: {s.negative || 0}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.greenColor}
                      >
                        Hospitalized: {s.hospitalized || 0}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        className={classes.redColor}
                        gutterBottom
                      >
                        Deaths: {s.death || 0}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                      >
                        {moment(s.dateModified).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              ))
          : null}
      </Container>
    </div>
  );
}

export default App;
