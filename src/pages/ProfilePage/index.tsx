import { useEffect, useState } from "react";
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
import Cookies from "js-cookie";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    "avatar": "",
    "Key": "",
    "Name": "",
    "Created": "",
    "Updated": "",
    "Username": "",
    "Date of birth": "",
    "Role": "",
    "Board": "",
    "Student ID": "",
    "Address": "",
    "Email": "",
    "Phone number": "",
    "Major": "",
    "Faculty": ""
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
        myInfo.avatar = myInfo.avatar.url72;
        // ERROR: unauthorized 
        console.log(Cookies.get());
        Cookies.set('JSESSIONID', Cookies.get('JSESSIONID')!, {domain: 'jira.hpcc.vn'});
        Cookies.set('atlassian.xsrf.token', Cookies.get('atlassian.xsrf.token')!, {domain: 'jira.hpcc.vn'});
        setProfileInfo(myInfo);
      })
      .catch((error) => {
        console.log(error);
        navigate("/", { replace: true });
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
                    alt="avatar"
                    src={profileInfo['avatar']}
                    sx={{
                      width: 120,
                      height: 120,
                    }}
                    imgProps={{onError: () => {
                      setProfileInfo({
                        ...profileInfo,
                        avatar: "avatar.png"
                      })
                    }}}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h5" sx={{ my: 2 }}>
                      {profileInfo["Name"]}
                    </Typography>
                    <Chip label={profileInfo["Board"]} color="success" />
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
                  <Typography>{profileInfo["Phone number"]}</Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <EmailOutlinedIcon />
                  <Typography>
                    <u>{profileInfo["Email"]}</u>
                  </Typography>
                </Stack>
              </Box>

              <Grid container sx={{ p: 1 }} columnSpacing={3}>
                {[
                  [
                    ["Date of Birth", profileInfo["Date of birth"]],
                    ["Full Name", profileInfo["Name"]],
                    ["Address", profileInfo["Address"]],
                    ["Phone", profileInfo["Phone number"]],
                  ],
                  [
                    ["Role", profileInfo["Role"]],
                    ["Student ID", profileInfo["Student ID"]],
                    ["Major", profileInfo["Major"]],
                    ["Falcuty", profileInfo["Faculty"]],
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
