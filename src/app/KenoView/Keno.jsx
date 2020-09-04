import React from "react";
import { presenter } from "../util/hoc/hoc";
import Presenter from "./KenoPM";
//View Imports
import {
  BetAmount,
  SelectedOptions,
  GridBase,
  LuckyPickButton,
  BetButton,
} from "../view/Keno/index";

const Keno = ({ pm, cn }) => (
  <div style={cn.pageContainer}>
    <GridBase pm={pm} cn={cn} />
    <LuckyPickButton pm={pm} cn={cn} />
    <SelectedOptions pm={pm} cn={cn} />
    <BetButton pm={pm} cn={cn} />
    <BetAmount pm={pm} cn={cn} />
  </div>
);

export default presenter(Presenter, Keno);
