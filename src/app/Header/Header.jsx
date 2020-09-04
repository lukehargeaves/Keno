import React from "react";
import { presenter } from "../util/hoc/hoc";

const Header = ({ cn }) => {
  return <div style={cn.Header}>Keno</div>;
};

export default presenter(false, Header);
