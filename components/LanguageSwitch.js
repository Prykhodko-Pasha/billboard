import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import s from "../styles/AppBar.module.css";

export default function LanguageSwitch() {
  const { locales, push, locale, pathname } = useRouter();
  const [activeLanguage, setActiveLanguage] = useState(locale);

  const handleChange = (e) => {
    const l = e.target.id;
    setActiveLanguage(l);
    push(pathname, undefined, { locale: l });
  };

  return (
    <div className={s.app_bar}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 2,
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="contained" color="inherit" onClick={handleChange}>
          {locales.map((lang) => (
            <Button id={lang} key={lang} disabled={lang === activeLanguage}>
              {lang}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
}
