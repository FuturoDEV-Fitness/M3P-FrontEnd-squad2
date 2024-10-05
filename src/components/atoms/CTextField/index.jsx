import { TextField } from "@mui/material";
import { forwardRef } from "react";

const CTextField = forwardRef((props, ref) => {
 return <TextField {...props} ref={ref} />;
});
export default CTextField;