import React from "react";
import { observer } from "mobx-react";

const BetAmount = observer(({ cn, pm }) => (
  <form style={cn.containingButton} onSubmit={(e) => pm.onSubmitHandler(e)}>
    <input
      style={cn.textField}
      type="number"
      value={pm.bet_amount}
      //throws an error is the event isnt passed
      onChange={(e) => pm.onChangeHandler(e)}
      name="bet"
    />
    <input
      style={pm.submit_button ? cn.submitButton : cn.unClickable}
      type="submit"
      value="Place Bet"
    />
  </form>
));

export default BetAmount;
