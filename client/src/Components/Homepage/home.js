import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "./home.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import download from "downloadjs";
const FormData = require("form-data");
export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }
    // const getdata = async () => {
    //   const alldata = await showdata();
    //   console.log(alldata.data);
    //   setrow1(alldata.data.data);
    // };
    // getdata();
    showdata();

    // eslint-disable-next-line
  }, []);

  const [row1, setrow1] = useState([]);
  const [file, setFile] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Key, setKey] = useState(0);
  const [Data, setData] = useState({});
  const handleOpen = (rows) => {
    setOpen(true);
    setData(rows);
  };
  const onChange = (e) => {
    setKey(parseInt(e.target.value));
  };

  const handleClose = () => {
    setOpen(false);
    console.log(typeof Key);
    console.log(Data);
  };

  const onChange1 = (e) => {
    setFile(e.target.files[0]);
  };

  //////////////////////////////To Show Uploaded Files by Logged in User :

  const showdata = () => {
    axios
      .get("http://localhost:9046/api/uploadedfiles_by_user", {
        headers: {
          AUTHORIZATION: localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
        },
      })
      .then((data) => {
        console.log(data.data);
        setrow1(data.data.data);
        console.log(row1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////////////Verify Key
  const Verify = (id, path, mimetype, fileKey, Key) => {
    console.log(id, path, mimetype);
    if (Key === 0) {
      return alert("key Field cannot be Empty");
    } else {
      if (fileKey !== Key) {
        return alert("Incorrect Key");
      } else {
        return Downloadfile(id, path, mimetype);
      }
    }
  };
  //////////////////////////// To Download File
  const Downloadfile = async (id, path, mimetype) => {
    console.log(id, path, mimetype);
    try {
      const result = await axios.get(
        "http://localhost:9046/api/downloadfile/" + `${id}`,
        {
          responseType: "blob",
          headers: {
            AUTHORIZATION: localStorage.getItem("token"),
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
          },
        }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];
      const mimetype1 = mimetype.split("/");
      //   setErrorMsg("");
      console.log(filename);
      console.log(mimetype);

      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file. Try again later");
      }
    }
  };
  //////////////////////////////To Delete File :

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:9046/api/deletefile/" + `${id}`,
        {
          headers: {
            AUTHORIZATION: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.message === "data has been deleted successfully") {
        alert(res.data.message);
        const newData = row1.filter((rows) => {
          return rows._id !== id;
        });
        setrow1(newData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //////////////////////////////To upload File :

  const uploadFile = (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:9046/api/upload", formData, {
        headers: {
          AUTHORIZATION: localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setrow1([...row1, response.data.data]);
        alert(
          response.data.message,
          "Your Security Key for this File is " +
            `${response.data.data.fileKey}`
        );
        console.log(
          alert(
            response.data.message,
            "Your Security Key for this File is " +
              `${response.data.data.fileKey}`
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <form onSubmit={uploadFile} encType="multipart/form-data">
            <label for="file">BrowseFile</label>
            <input
              type="file"
              class="form-control"
              name="file"
              required
              onChange={onChange1}
            />
            <br></br>
          </form>{" "}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            type="submit"
            value="submit"
            onClick={uploadFile}
          >
            Upload File
          </Button>{" "}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box11">
          <div className="css-15m7mkq1">
            <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi1">
              Enter Key To Download a File
            </h4>
          </div>
          <div className="form-div11">
            <form>
              <div className="form-div21">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    // id="input-with-sx"
                    label="Security Key"
                    variant="standard"
                    id="Key"
                    name="Key"
                    onChange={onChange}
                  />
                </Box>
              </div>
              <div class="MuiBox-root css-1id64jh1">
                <button
                  class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
                  tabindex="0"
                  type="submit"
                  onClick={() =>
                    Verify(
                      Data._id,
                      Data.filePath,
                      Data.fileType,
                      Data.fileKey,
                      Key
                    )
                  }
                >
                  Download file
                  {/* <span class="MuiTouchRipple-root css-w0pj6f"></span> */}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>FileName</StyledTableCell>
              <StyledTableCell>FileSize</StyledTableCell>
              <StyledTableCell>Uploaded By</StyledTableCell>
              <StyledTableCell>FileType</StyledTableCell>
              <StyledTableCell>FileKey</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row1.reverse().map((rows) => (
              <StyledTableRow key={row1.id}>
                <StyledTableCell>{rows.fileName}</StyledTableCell>
                <StyledTableCell>{rows.fileSize}</StyledTableCell>
                <StyledTableCell>{rows.uploadedby.Name}</StyledTableCell>
                <StyledTableCell>{rows.fileType}</StyledTableCell>
                <StyledTableCell>{rows.fileKey}</StyledTableCell>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleOpen(rows)}
                >
                  <FileDownloadIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() =>
                    Downloadfile(rows._id, rows.filePath, rows.fileType)
                  }
                >
                  <FileDownloadIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteData(rows._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
