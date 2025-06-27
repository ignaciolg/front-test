import {
  Select,
  MenuItem,
  Box,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import i18n from "../../i18n";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
  const { user, pageTitle } = props;
  const { t } = useTranslation("app");
  const theme = useTheme();

  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const countdown = seconds - count;
  const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
  const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

  const handleChange = useCallback(() => {
    i18n.changeLanguage("de");
    // i18n.changeLanguage(event.target.value);
  }, []);
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const locale = event.target.value;
  //   console.log("change ", locale);
  //   i18n.changeLanguage("de");
  // };

  useEffect(() => {
    setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
        <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {countdownMinutes}:{countdownSeconds}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5),
              }}
              variant="h6"
              component="div"
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          {i18n && (
            <Box>
              <Select value={i18n.language} onChange={handleChange}>
                {i18n &&
                  i18n.options &&
                  i18n.options.supportedLngs &&
                  i18n.options.supportedLngs
                    .filter((l) => l !== "cimode")
                    .map((language, index) => {
                      return (
                        <MenuItem value={language} key={index}>
                          <Typography
                            sx={{
                              ...typoStyle,
                              color: theme.palette.primary.main,
                            }}
                            variant="overline"
                            component="div"
                            noWrap
                          >
                            {language}
                          </Typography>
                        </MenuItem>
                      );
                    })}
              </Select>
            </Box>
          )}
          <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
            {user && user.eMail && <AvatarMenu user={user} />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
