import React, { useEffect, useState } from "react";
import "./App.css";
import axois from "axios";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  input: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  card: {
    minWidth: 300,
    display: "inline-block",
    margin: 5,
    backgroundColor: "white"
  },
  textColor: {
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
    const output = await axois.get("https://corona.lmao.ninja/states");
    setStates(output.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <TextField
          id="filled-basic"
          label="Enter State"
          variant="filled"
          className={classes.input}
          onChange={e => setFiltered(e.target.value.toLowerCase())}
        />

        {states !== null
          ? states
              .filter(f => f.state.toLowerCase().includes(filtered))
              .map(s => (
                <Card className={classes.card} elevation={5} key={s.state}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      variant="h5"
                      gutterBottom
                    >
                      State: {s.state}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Cases: {s.cases}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Active: {s.active}
                    </Typography>
                    <Typography
                      variant="h6"
                      className={classes.pos}
                      color="textSecondary"
                    >
                      Today's Cases: {s.todayCases}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.textColor}
                    >
                      Deaths: {s.deaths}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.textColor}
                    >
                      Today's Deaths: {s.todayDeaths}
                    </Typography>
                  </CardContent>
                </Card>
              ))
          : null}
      </Container>
    </div>
  );
}

export default App;
