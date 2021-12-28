import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  AppBar,
  Link,
  Box,
  Typography,
  Collapse,
  Container,
  TableBody,
  IconButton,
  ListItemAvatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Paper from "@mui/material/Paper";

const initialState = {
  Protocol: "",
  Statut: "",
  Blockchain: "",
  ActionRequired: "",
  Date: "",
  Site: "",
  Twitter: "",
  Note: "",
  Open: false,
};
function App() {
  const [airdrops, setAirdrops] = useState([]);

  useEffect(() => {
    retrieveAirDrops();
  }, []);

  async function retrieveAirDrops() {
    await fetch(
      "https://dntg8psiri.execute-api.eu-west-1.amazonaws.com/webhook"
    )
      .then((response) => response.json())
      .then((data) => setAirdrops(data));
  }
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // function setOpen() {
    //   setAirdropState({ ...airdropState, Open: true });
    // }
    return (
      <React.Fragment>
        {console.log(open)}
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.Protocol}
          </TableCell>

          <TableCell align="center">{row.Statut}</TableCell>
          <TableCell align="center">{row.Blockchain}</TableCell>
          <TableCell align="center">{row.ActionRequired}</TableCell>
          <TableCell align="center">{row.Date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Site</TableCell>
                      <TableCell>Twitter</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.Key}>
                      <TableCell>
                        <Link href={row.Site}>{row.Site}</Link>
                      </TableCell>
                      <TableCell>
                        <Link href={row.Twitter}>{row.Twitter}</Link>
                      </TableCell>
                      <TableCell>{row.Note}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <Container fixed style={styles.container}>
      <h1>All Rumors Airdrops</h1>
      <TableContainer sx={{ minHeight: "80vh" }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Protocol</TableCell>
              <TableCell align="center">Statut</TableCell>
              <TableCell align="center">Blockchain</TableCell>
              <TableCell align="center">Action Required</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airdrops.map((airdrop) => (
              <Row key={airdrop.Key} row={airdrop} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
const styles = {
  container: {
    width: "90%",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  containerInput: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    direction: "row",
    justifyContent: "center",
    padding: 20,
  },
  icon: { color: "white", backgroundColor: "#3f51b5" },
  avatar: { backgroundColor: "#3f51b5" },
  todo: { marginBottom: 15 },
  input: { width: "65%" },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    width: "30%",
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 10px",
    margin: "auto auto",
  },
};
export default App;
