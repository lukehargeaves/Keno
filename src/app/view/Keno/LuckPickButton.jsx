import React from "react";
import { observer } from "mobx-react";

const LuckyPickButton = observer(({ pm, cn }) => (
  <div style={cn.containingButton}>
    <button style={cn.buttonItemContainer} onClick={() => pm.luckyPick()}>
      Lucky Pick
    </button>
  </div>
));

export default LuckyPickButton;
