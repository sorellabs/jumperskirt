module.exports = function(React) {
  var extend = require('xtend');
  var { Extractor, Eq } = require('adt-simple');
  var { Success, Failure } = require('data.validation');
  var Maybe = require('data.maybe');

  var { PropTypes: T, addons: { classSet }} = React;
  var Input = React.createFactory("input");


  union InputType {
    Text,
    Password
  } deriving (Extractor, Eq)

  InputType::toString = λ(_) -> match this {
    Text => 'text',
    Password => 'password'
  }


  union AutoComplete {
    Default,
    None
  } deriving (Extractor, Eq)

  AutoComplete::toProperties = λ(_) -> match this {
    Default => ({ 'autoComplete': 'on' }),
    None => ({ 'autoComplete': 'off' })
  }


  return React.createClass({

    statics: {
      types: {
        Text: Text,
        Password: Password
      },

      autoComplete: {
        Default: AutoComplete.Default,
        None: AutoComplete.None
      }
    },

    propTypes: {
      // A list of additional classes for the input
      classNames: T.arrayOf(T.string),

      // The type of the input
      type: T.oneOf([InputType.Text, InputType.Password]).isRequired,

      // Builtin browser's autocomplete
      autoComplete: T.oneOf([AutoComplete.Default, AutoComplete.None]),

      // Label for the input
      label: T.string,

      // Placeholder for the input
      placeholder: T.string,

      // Name of the input
      name: T.string.isRequired,

      // Long description of the value expected in the input
      description: T.string,

      // The initial value for this field
      initialValue: T.string,

      // Whether the input can be modified or not
      readOnly: T.bool,

      // A function ran when the value has changed, before propagating the changes
      // for validating/normalising the input. Must return a Validation[α, β].
      validation: T.func,

      // Fired whenever the value of the input changes
      onChange: T.func
    },

    getDefaultProps: function() {
      return {
        classNames: [],
        placeholder: '',
        description: '',
        initialValue: '',
        label: '',
        autocomplete: AutoComplete.None,
        readOnly: false,
        onChange: function(){ },
        validation: function(value){ return Success(value) }
      }
    },

    getInitialState: function() {
      return {
        value: this.props.initialValue,
        error: Maybe.Nothing(),
        isFocused: false
      }
    },

    render: function() {
      var classes = classSet({
        'jsk-field': true,
        'jsk-text-field': true,
        'jsk-focused': this.state.isFocused,
        'jsk-non-editable': this.props.readOnly,
        'jsk-has-text': this.state.value !== '',
        'jsk-invalid': this.state.error.isJust
      }) + ' ' + this.props.classNames.join(' ');

      return (
        <div className={ classes }>
          <label className="jsk-field-label" onClick={this._onLabelClicked}>{ this.props.label }</label>
          {
            Input(extend({
              ref: 'input',
              type: this.props.type,
              placeholder: this.props.placeholder,
              value: this.state.value,
              readOnly: this.props.readOnly? 'readonly' : '',
              onChange: this._onInputChanged,
              onFocus: this._onFocused,
              onBlur: this._onBlurred
            }, this.props.autocomplete.toProperties()))
          }
          { this.state.error.map(this._renderError).getOrElse(null) }
          <div className="jsk-field-description">{ this.props.description }</div>
        </div>
      )
    },

    _renderError: function(error) {
      return (
        <div className="jsk-field-validation-failure">
          { error }
        </div>
      )
    },

    _onLabelClicked: function(e) {
      this.refs.input.getDOMNode().focus();
    },

    _onInputChanged: function(e) {
      if (!this.props.readOnly) {
        var value = e.target.value;
        this.setValue(value)
      }
    },

    _onInvalidValue: function(error) {
      this.setState({ error: Maybe.Just(error) })
    },

    _onFocused: function(e) {
      this.setState({ isFocused: true })
    },

    _onBlurred: function(e) {
      this.setState({ isFocused: false })
    },

    setValue: function(newValue) {
      var oldValue = this.state.value;
      this.props.validation(newValue).cata({
        Failure: this._onInvalidValue,
        Success: function(data) {
          this.setState({ value: data, error: Maybe.Nothing() })
          this.props.onChange(newValue, oldValue)
        }.bind(this)
      })
    },

    getValue: function() {
      return this.state.value;
    },

    resetValue: function() {
      this.setValue({ value: this.props.initialValue })
    }

  })
}
