import React, { Component } from "react";
import { observer } from "mobx-react";
import { Styles } from "../../KenoView/styles";

export const presenter = (Presenter, View) => {
  const ViewComp = View;
  class WrappedView extends Component {
    static View = observer(View);
    constructor(props) {
      super(props);
      this.cn = Styles();
      if (Presenter) {
        this.pm = props.pm || new Presenter(props, this);
        this.pm._hoc = !props.pm;
      }
      //   App.Globals.stillLoads();
      this.view = View;
    }
    componentDidMount() {
      if (this.pm) {
        this.pm.fetch && this.pm.fetch();
      }
    }
    componentWillReceiveProps(next) {
      this.pm && this.pm.update && this.pm.update(next);
    }

    render() {
      return <ViewComp pm={this.pm} cn={this.cn} />;
    }
  }
  return WrappedView;
};
