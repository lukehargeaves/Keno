import React from "react";
import { observer } from "mobx-react";

const GridBase = observer(({ pm, cn }) => (
  <div style={cn.containingGrid}>
    {pm.grid_element.map((square) => (
      <div>
        <button
          key={square.key}
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
