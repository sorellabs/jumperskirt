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
  var Field = require('./Field')(React);
  var classNames = require('classnames');
  var T = React.PropTypes;
  var Maybe = require('data.maybe');

  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: this.props.checked
      };
    }

    render() {
      var classes = classNames({
        'jsk-non-editable': this.props.readOnly,
        'jsk-toggle-field': true,
        'jsk-active': this.state.checked
      }) + ' ' + this.props.className;

      return (
        <Field kind={ classes }>
          <div className="jsk-toggle-container">
            <div className="jsk-label-panel">
              <label className="jsk-field-label" onClick={ ::this._onClicked }>
                { this.props.label }
              </label>
            </div>
            <div className="jsk-toggle-panel">
              <div className="jsk-toggle-button" onClick={ ::this._onClicked }>
                <div className="jsk-toggle-bullet" />
              </div>
            </div>
            <div className="jsk-field-description">
              { this.props.description }
            </div>
          </div>
        </Field>
      );
    }

    _onClicked() {
      if (!this.props.readOnly) {
        var wasChecked = this.state.checked;
        this.setState({ checked: !wasChecked });
        this.props.onChange(!wasChecked, wasChecked);
      }
    }
  }

  Toggle.propTypes = {
    className: T.string,
    label: T.string,
    checked: T.bool,
    description: T.string,
    readOnly: T.bool,
    onChange: T.func
  };

  Toggle.defaultProps = {
    className: '',
    label: '',
    checked: false,
    description: '',
    readOnly: false,
    onChange: (isChecked, wasChecked) => { }
  };

  return Toggle;
};
