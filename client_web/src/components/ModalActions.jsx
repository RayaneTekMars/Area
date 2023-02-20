import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ModalActions(props) {
  return (
    <div>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            width: 900,
            height: 510,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            backgroundColor: "grey",
            borderRadius: "28px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h2"
              style={{
                color: "white",
                fontSize: "200%",
                fontFamily: "Inter-ExtraBold",
              }}
            >
              Services
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
