import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    name: "Nguyễn Đặng Anh Khoa",
    username: "khoanda",
    date_of_birth: "2002-04-10",
    role: "Member",
    board: "Communication",
    student_ID: "2010339",
    address:
      "Phòng 25.16, Bcons Garden, Phố Lý Thường Kiệt, Phường Dĩ An, Dĩ An, Bình Dương",
    email: "khoa.nguyenakaivn@hcmut.edu.vn",
    phone_number: "0962646979",
    major: "Computer Science",
    faculty: "Faculty of Computer Science and Engineering",
  });

  useEffect(() => {
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        var myInfo = res.data;
        console.log(myInfo);
        setProfileInfo(myInfo);
      })
      .catch((error) => {
        console.log(localStorage.getItem("jwt"));
        console.log(error);
        navigate("/profile", { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container columnSpacing={4} sx={{mb: 5}}>
        <Grid item xs={2.5}>
          <></>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Paper
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  px: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/avatar.png"
                    sx={{
                      width: 120,
                      height: 120,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h5" sx={{ my: 2 }}>
                      {profileInfo.name}
                    </Typography>
                    <Chip label={profileInfo.board} color="success" />
                  </Box>
                </Box>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{ borderRadius: 10, height: 40}}
                >
                  Edit Info
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  px: 8,
                  py: 5,
                }}
              >
                <Stack direction="row" spacing={2}>
                  <LocalPhoneOutlinedIcon />
                  <Typography>{profileInfo.phone_number}</Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <EmailOutlinedIcon />
                  <Typography>
                    <u>{profileInfo.email}</u>
                  </Typography>
                </Stack>
              </Box>

              <Grid container sx={{ p: 1 }} columnSpacing={3}>
                {[
                  [
                    ["Date of Birth", profileInfo.date_of_birth],
                    ["Full Name", profileInfo.name],
                    ["Address", profileInfo.address],
                    ["Phone", profileInfo.phone_number],
                  ],
                  [
                    ["Role", profileInfo.role],
                    ["Student ID", profileInfo.student_ID],
                    ["Major", profileInfo.major],
                    ["Falcuty", profileInfo.faculty],
                  ],
                ].map((col, idx) => (
                  <Grid item xs={6}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                      {col.map((item, idx) => (
                        <>
                          <Grid item xs={4}>
                            <Typography
                              sx={{
                                color: "gray",
                                fontSize: 13,
                              }}
                            >
                              <b>{item[0]}</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ fontSize: 14 }}>
                              {item[1]}
                            </Typography>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
