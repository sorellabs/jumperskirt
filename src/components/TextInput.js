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

// # module: src/components/TextInput
//
// Text inputs
module.exports = function(React) {
  var { Success, Failure } = require('data.validation');
  var Maybe = require('data.maybe');
  var classSet = require('classnames');

  var T = React.PropTypes;
  var Input = React.createFactory("input");

  return React.createClass({
    propTypes: {
      classNames: T.arrayOf(T.string),
      type: T.string,
      autoComplete: T.string,
      label: T.string,
      placeholder: T.string,
      description: T.string,
      initialValue: T.string,
      readOnly: T.bool,
      validation: T.func,
      onChange: T.func
    },

    getDefaultProps() {
      return {
        classNames: [],
        placeholder: '',
        description: '',
        initialValue: '',
        label: '',
        autocomplete: 'off',
        readOnly: false,
        onChange(){ },
        validation: value => Success(value)
      };
    },

    getInitialState() {
      return {
        value: this.props.initialValue,
        error: Maybe.Nothing(),
        isFocused: false
      };
    },

    render() {
      var classes = classSet({
        'jsk-field': true,
        'jsk-text-field': true,
        'jsk-focused': this.state.isFocused,
        'jsk-non-editable': this.props.readOnly,
        'jsk-has-text': this.state.value !== '',
        'jsk-invalid': this.state.error.isJust
      }, this.props.classNames);

      return (
        <div className={ classes }>
          <label className="jsk-field-label" onClick={ this._onLabelClicked }>
            { this.props.label }
          </label>
          {
            Input({
              ref: 'input',
              type: this.props.type,
              placeholder: this.props.placeholder,
              value: this.state.value,
              readOnly: this.props.readOnly? 'readonly' : '',
              onChange: this._onInputChanged,
              onFocus: this._onFocused,
              onBlur: this._onBlurred,
              autocomplete: this.props.autoComplete
            })
          }
        { this.state.error.map(this._renderError).getOrElse(null) }
        <div className="jsk-field-description">{ this.props.description }</div>
        </div>
      );
    },

    _renderError(error) {
      return (
        <div className="jsk-field-validation-failure">
          { error }
        </div>
      );
    },

    _onLabelClicked(e) {
      this.refs.input.getDOMNode().focus();
    },

    _onInputChanged(e) {
      if (!this.props.readOnly) {
        this.setValue(e.target.value);
      }
    },

    _onInvalidValue(error) {
      this.setState({ error: Maybe.Just(error) });
    },

    _onFocused(e) {
      this.setState({ isFocused: true });
    },

    _onBlurred(e) {
      this.setState({ isFocused: false });
    },

    setValue(newValue) {
      var oldValue = this.state.value;
      this.props.validation(newValue).cata({
        Failure: this._onInvalidValue,
        Success: data => {
          this.setState({ value: data, error: Maybe.Nothing() });
          this.props.onChange(newValue, oldValue);
        }
      });
    },

    getValue() {
      return this.state.value;
    },

    resetValue() {
      this.setValue(this.props.initialValue);
    }
  });
};
