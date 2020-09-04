import React from "react";
import { observer } from "mobx-react";

const SelectedOptions = observer(({ pm, cn }) => (
  <div style={cn.selectedOptionsContainer}>
    {pm.selected_values.map((values) => (
      <div style={cn.selectedOptions} key={values}>
        <div style={{ color: "white", fontWeight: "500", padding: "10px" }}>
          Number {values}
        </div>
        <span style={{ float: "right", padding: "5px" }}>
          <button
            style={cn.selectedItemDeleteButton}
            onClick={() => pm.removeValue(values)}
          >
            Delete
          </button>
        </span>
      </div>
    ))}
  </div>
));

export default SelectedOptions;
