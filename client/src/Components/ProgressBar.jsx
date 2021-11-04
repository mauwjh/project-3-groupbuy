import React, {useState, useEffect} from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#83c5be" : "#308fe8",
  },
}));

const ProgressBar = ({data}) => {
  const [value, setValue] = useState(25)

  useEffect(() => {
    data > 100 ? setValue(100) : setValue(data)
  }, [data])

  return(
    <BorderLinearProgress variant="determinate" value={value} />
  )
}

export default ProgressBar