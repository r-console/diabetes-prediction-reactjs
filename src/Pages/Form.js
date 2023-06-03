import { useState } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import axios from "axios"

import "./Form.css"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}))

const darkTheme = createTheme({ palette: { mode: "dark" } })
const lightTheme = createTheme({ palette: { mode: "light" } })

export default function Form() {
  const [Pregnancies, setPregnancies] = useState("")
  const [gulcose, setGulcose] = useState("")
  const [bp, setBP] = useState("")
  const [sk, setSK] = useState("")
  const [insulin, setInsulin] = useState("")
  const [bmi, setBMI] = useState("")
  const [dpf, setDPF] = useState("")
  const [age, setAge] = useState("")

  const [result, SetResult] = useState(null)
  const Predict = () => {
    axios
      .post("http://127.0.0.1:8000/pred/", {
        data: [Pregnancies, gulcose, bp, sk, insulin, bmi, dpf, age],
      })
      .then((response) => {
        console.log(response.data)
        SetResult(response.data.result)
        // Handle the response data
      })
      .catch((error) => {
        console.error(error)
        // Handle the error
      })
  }

  const onClear = () => {
    setPregnancies("")
    setGulcose("")
    setBP("")
    setSK("")
    setInsulin("")
    setBMI("")
    setDPF("")
    setAge("")
    SetResult(null)
  }

  return (
    <div className="center-div">
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gap: 2,
          width: "100%",
        }}
      >
        <Item elevation={6}>
          <Box sx={{ flexGrow: 1, m: 2, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 style={{ padding: 0, fontWeight: "bold" }}>
                  Diabetes Prediction App
                </h2>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Pregnancies"
                  variant="filled"
                  type="number"
                  value={Pregnancies}
                  onChange={(e) => setPregnancies(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Glucose"
                  variant="filled"
                  type="number"
                  value={gulcose}
                  onChange={(e) => setGulcose(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Blood Pressure"
                  variant="filled"
                  type="number"
                  value={bp}
                  onChange={(e) => setBP(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Skin Thickness"
                  id="fullWidth"
                  variant="filled"
                  type="number"
                  value={sk}
                  onChange={(e) => setSK(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Insulin"
                  id="fullWidth"
                  variant="filled"
                  type="number"
                  value={insulin}
                  onChange={(e) => setInsulin(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="BMI"
                  id="fullWidth"
                  variant="filled"
                  type="number"
                  value={bmi}
                  onChange={(e) => setBMI(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <>
                  {result != null ? (
                    <b style={{ fontSize: 18 }}>
                      Result :{" "}
                      <b style={{ color: result == 1 ? "red" : "green" }}>
                        {result === 1 ? "Positive" : "Negative"}
                      </b>
                    </b>
                  ) : null}
                </>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Diabetes Pedigree Function"
                  id="fullWidth"
                  variant="filled"
                  type="number"
                  value={dpf}
                  onChange={(e) => setDPF(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Age"
                  id="fullWidth"
                  variant="filled"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={Predict}>
                  Predict
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginLeft: 40 }}
                  onClick={onClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Item>
      </Box>
    </div>
  )
}
