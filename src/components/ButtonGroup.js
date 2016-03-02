//----------------------------------------------------------------------
//
// This source file is part of the JumperSkirt project.
//
// Copyright (C) 2014-2016 Quildreen Motta.
// Licensed under the MIT licence.
//
// See LICENCE for licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = (React) => {
  var classNames = require('classnames');
  var T = React.PropTypes;
  var Maybe = require('data.maybe');

  const isSelected = (state, value) =>
          state.map(v => v === value).getOrElse(false);

  class ButtonGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.initialValue
      };
    }

    render() {
      var classes = classNames({
        'jsk-button-group': true,
        'jsk-non-editable': this.props.readOnly
      }) + ' ' + this.props.className;

      return (
        <div className={ classes }>
          { this.props.buttons.map(button => this.renderButton(button)) }
        </div>
      );
    }

    renderButton([value, element]) {
      var classes = classNames({
        'jsk-button-group-selected': isSelected(this.state.value, value),
        'jsk-button-group-container': true
      });

      return (
        <div className={ classes } onClick={ this._onClick(value) }>
          { element }
        </div>
      );
    }

    _onClick(value) {
      return (event) => {
        if (!this.props.readOnly) {
          this.props.onChange(value, this.state.value);
          this.setState({ value: Maybe.Just(value) });
        }
      };
    }
  }

  ButtonGroup.propTypes = {
    className: T.string,
    buttons: T.array,
    readOnly: T.bool,
    onChange: T.func
  };

  ButtonGroup.defaultProps = {
    className: '',
    initialValue: Maybe.Nothing(),
    readOnly: false,
    buttons: [],
    onChange: (newValue, oldValue) => null
  };

  return ButtonGroup;
};
