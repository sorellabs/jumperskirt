var React = require('react/addons');
var extend = require('xtend');
var { Extractor, Eq } = require('adt-simple');

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


var TextInput = module.exports = React.createClass({

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

    // Placeholder for the input
    placeholder: T.string,

    // Name of the input
    name: T.string.isRequired,

    // Long description of the value expected in the input
    description: T.string,

    // The initial value for this field
    initialValue: T.string,

    // Fired whenever the value of the input changes
    onChange: T.func
  },

  getDefaultProps: function() {
    return {
      classNames: [],
      placeholder: '',
      description: '',
      initialValue: '',
      autocomplete: AutoComplete.Default,
      onChange: function(){ }
    }
  },

  getInitialState: function() {
    return {
      value: this.props.initialValue,
      isFocused: false
    }
  },

  render: function() {
    var classes = classSet({
      'jsk-field': true,
      'jsk-text-field': true,
      'jsk-focused': this.state.isFocused,
      'jsk-has-text': this.state.value !== '',
    }) + ' ' + this.props.classNames.join(' ');

    return (
      <div className={ classes }>
        <label className="jsk-field-label" onClick={this._onLabelClicked}>{ this.props.placeholder }</label>
        {
          Input(extend({
            ref: 'input',
            type: this.props.type,
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this._onInputChanged,
            onFocus: this._onFocused,
            onBlur: this._onBlurred
          }, this.props.autocomplete.toProperties()))
        }
        <div className="jsk-field-description">{ this.props.description }</div>
      </div>
    )
  },

  _onLabelClicked: function(e) {
    this.refs.input.getDOMNode().focus();
  },

  _onInputChanged: function(e) {
    var value = e.target.value;
    this.setValue(value);
  },
  
  _onFocused: function(e) {
    this.setState({ isFocused: true })
  },

  _onBlurred: function(e) {
    this.setState({ isFocused: false })
  },

  setValue: function(newValue) {
    var oldValue = this.state.value;
    this.setState({ value: newValue });
    this.props.onChange(newValue, oldValue)
  },

  getValue: function() {
    return this.state.value;
  },

  resetValue: function() {
    this.setValue({ value: this.props.initialValue })
  }
  
})
