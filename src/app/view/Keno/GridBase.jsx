import React from "react";
import { observer } from "mobx-react";

const GridBase = observer(({ pm, cn }) => (
  <div style={cn.containingGrid}>
    {pm.grid_element.map((square) => (
      <div key={square.key}
        <button
          
          style={square.clicked ? cn.clickedGrid : cn.gridItem}
          onClick={() => pm.onClickGrid(square.key)}
        >
          {square.key}
        </button>
      </div>
    ))}
  </div>
));

export default GridBase;
