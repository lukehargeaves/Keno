import React from "react";
import { observer } from "mobx-react";

const BetButton = observer(({ pm, cn }) => (
  <div style={cn.containingButton}>
    {pm.default_amounts.map((value) => (
      <button
        style={cn.defaultAmounts}
        key={value}
        onClick={() => pm.setAmount({ value })}
      >
        {value}
      </button>
    ))}
  </div>
));

export default BetButton;
