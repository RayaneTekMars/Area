import React, { useEffect } from "react";
import Navbar from "../../components/navbarlanding";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Fond1 from "../../assets/fond1.png";
import SigninText from "../../components/signin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 510,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
};

function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={Fond1}
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            alt="fond"
          />
          <SigninText />
          <div>
            <AccountCircleIcon style={{ fontSize: 40, color: "#222222" }} />
            <TextField
              id="outlined-basic"
              label="Username or E-mail"
              variant="outlined"
            />
          </div>
          <div>
            <LockIcon style={{ fontSize: 40, color: "#222222" }} />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "50px",
                width: "50%",
              }}
            >
              Sign In
            </Button>
          </div>
          <div>or</div>
          <div>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "50px",
                width: "50%",
              }}
            >
              Sign in with google
            </Button>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "50px",
                width: "50%",
              }}
            >
              Sign in with github
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default function SigninPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div>
      <Navbar />
      <BasicModal />
    </div>
  );
}
