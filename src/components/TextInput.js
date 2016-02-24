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
  var { sanitise } = require('./utils/classes');
  var { Success, Failure } = require('data.validation');
  var Maybe = require('data.maybe');
  var T = React.PropTypes;


  class TextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value     : props.initialValue,
        error     : Maybe.Nothing(),
        isFocused : false
      };
    }

    // -- Rendering ----------------------------------------------------
    render() {
      var classes = classNames({
        'jsk-focused'      : this.state.isFocused,
        'jsk-non-editable' : this.props.readOnly,
        'jsk-has-text'     : this.state.value !== '',
        'jsk-invalid'      : this.state.error.isJust,
        'jsk-text-field'   : true,
      }, 'jsk-field-type-' + this.props.type) + ' ' + (this.props.className || '');

      return (
        <Field kind={ classes }>
          <label className="jsk-field-label" onClick={ ::this._onLabelClicked }>
            { this.props.label }
          </label>
          <input ref          = "input"
                 type         = { this.props.type }
                 placeholder  = { this.props.placeholder }
                 value        = { this.state.value }
                 readOnly     = { this.props.readOnly? 'readonly' : '' }
                 onChange     = { ::this._onInputChanged }
                 onFocus      = { ::this._onFocused }
                 onBlur       = { ::this._onBlurred }
                 autoComplete = { this.props.autoComplete } />
          {
            this.state.error.map(::this._renderError).getOrElse(null)
          }
          <div className="jsk-field-description">
            { this.props.description }
          </div>
        </Field>
      );
    }

    _renderError(error) {
      return (
        <div className="jsk-field-validation-failure">
          { error }
        </div>
      );
    }


    // -- Events -------------------------------------------------------
    _onLabelClicked(event) {
      this.refs.input.getDOMNode().focus();
    }

    _onInputChanged(event) {
      if (!this.props.readOnly) {
        this.setValue(event.target.value);
      }
    }

    _onInvalidValue(error) {
      this.setState({
        error: Maybe.Just(error)
      });
    }

    _onFocused(event) {
      this.setState({
        isFocused: true
      });
    }

    _onBlurred(event) {
      this.setState({
        isFocused: false
      });
    }


    // -- API ----------------------------------------------------------
    setValue(newValue) {
      var oldValue = this.state.value;
      this.props.validation(newValue).cata({
        Failure: error =>
          this._onInvalidValue(error),

        Success: data => {
          this.setState({ value: data, error: Maybe.Nothing() });
          this.props.onChange(newValue, oldValue);
        }
      });
    }

    getValue() {
      return this.state.value;
    }

    resetValue() {
      this.setValue(this.props.initialValue);
    }
  }

  TextInput.propTypes = {
    className    : T.string,
    type         : T.string,
    autoComplete : T.string,
    label        : T.string,
    placeholder  : T.string,
    description  : T.string,
    initialValue : T.string,
    readOnly     : T.bool,
    validation   : T.func,
    onChange     : T.func
  };

  TextInput.defaultProps = {
    className    : '',
    type         : 'text',
    placeholder  : '',
    description  : '',
    initialValue : '',
    label        : '',
    autoComplete : 'off',
    readOnly     : false,
    onChange     : (newValue, oldValue) => null,
    validation   : (value) => Success(value)
  };

  return TextInput;
};

