var React = require('react/addons');
var extend = require('xtend');
var __ref = require('adt-simple');
var Extractor = __ref.Extractor;
var Eq = __ref.Eq;
var __ref$2 = React;
var T = __ref$2.PropTypes;
var __o = __ref$2.addons;
var classSet = __o.classSet;
var Input = React.createFactory(React.DOM.input);
var InputType = function () {
        function InputType$2() {
        }
        function Text$2() {
        }
        Text$2.prototype = new InputType$2();
        Text$2.prototype.constructor = Text$2;
        function Password$2() {
        }
        Password$2.prototype = new InputType$2();
        Password$2.prototype.constructor = Password$2;
        var derived = Eq.derive(Extractor.derive({
                name: 'InputType',
                constructor: InputType$2,
                prototype: InputType$2.prototype,
                variants: [
                    {
                        name: 'Text',
                        constructor: Text$2,
                        prototype: Text$2.prototype
                    },
                    {
                        name: 'Password',
                        constructor: Password$2,
                        prototype: Password$2.prototype
                    }
                ]
            }));
        InputType$2.Text = new derived.variants[0].constructor();
        InputType$2.Password = new derived.variants[1].constructor();
        return InputType$2;
    }();
var Text = InputType.Text;
var Password = InputType.Password;
InputType.prototype.toString = function (_) {
    return function (a0) {
        if (Text.hasInstance ? Text.hasInstance(a0) : a0 instanceof Text) {
            return 'text';
        }
        if (Password.hasInstance ? Password.hasInstance(a0) : a0 instanceof Password) {
            return 'password';
        }
        throw new TypeError('No match');
    }.call(this, this);
};
var AutoComplete = function () {
        function AutoComplete$2() {
        }
        function Default$2() {
        }
        Default$2.prototype = new AutoComplete$2();
        Default$2.prototype.constructor = Default$2;
        function None$2() {
        }
        None$2.prototype = new AutoComplete$2();
        None$2.prototype.constructor = None$2;
        var derived = Eq.derive(Extractor.derive({
                name: 'AutoComplete',
                constructor: AutoComplete$2,
                prototype: AutoComplete$2.prototype,
                variants: [
                    {
                        name: 'Default',
                        constructor: Default$2,
                        prototype: Default$2.prototype
                    },
                    {
                        name: 'None',
                        constructor: None$2,
                        prototype: None$2.prototype
                    }
                ]
            }));
        AutoComplete$2.Default = new derived.variants[0].constructor();
        AutoComplete$2.None = new derived.variants[1].constructor();
        return AutoComplete$2;
    }();
var Default = AutoComplete.Default;
var None = AutoComplete.None;
AutoComplete.prototype.toProperties = function (_) {
    return function (a0) {
        if (Default.hasInstance ? Default.hasInstance(a0) : a0 instanceof Default) {
            return { 'autocomplete': 'on' };
        }
        if (None.hasInstance ? None.hasInstance(a0) : a0 instanceof None) {
            return { 'autocomplete': 'off' };
        }
        throw new TypeError('No match');
    }.call(this, this);
};
var TextInput = module.exports = React.createClass({
        statics: {
            types: {
                Text: Text,
                Password: Password
            },
            autocomplete: {
                Default: AutoComplete.Default,
                None: AutoComplete.None
            }
        },
        propTypes: {
            classNames: T.arrayOf(T.string),
            type: T.oneOf([
                InputType.Text,
                InputType.Password
            ]).isRequired,
            autocomplete: T.oneOf([
                AutoComplete.Default,
                AutoComplete.None
            ]),
            placeholder: T.string,
            name: T.string.isRequired,
            description: T.string,
            initialValue: T.string,
            onChange: T.func
        },
        getDefaultProps: function () {
            return {
                classNames: [],
                placeholder: '',
                description: '',
                initialValue: '',
                autocomplete: AutoComplete.Default,
                onChange: function () {
                }
            };
        },
        getInitialState: function () {
            return {
                value: this.props.initialValue,
                isFocused: false
            };
        },
        render: function () {
            var classes = classSet({
                    'jsk-field': true,
                    'jsk-text-field': true,
                    'jsk-focused': this.state.isFocused,
                    'jsk-has-text': this.state.value !== ''
                }) + ' ' + this.props.classNames.join(' ');
            return React.DOM.div({ className: classes }, React.DOM.label({
                className: 'jsk-field-label',
                onClick: this._onLabelClicked
            }, this.props.placeholder), Input(extend({
                ref: 'input',
                type: this.props.type,
                placeholder: this.props.placeholder,
                value: this.state.value,
                onChange: this._onInputChanged,
                onFocus: this._onFocused,
                onBlur: this._onBlurred
            }, this.props.autocomplete.toProperties())), React.DOM.div({ className: 'jsk-field-description' }, this.props.description));
        },
        _onLabelClicked: function (e) {
            this.refs.input.getDOMNode().focus();
        },
        _onInputChanged: function (e) {
            var value = e.target.value;
            this.setValue(value);
        },
        _onFocused: function (e) {
            this.setState({ isFocused: true });
        },
        _onBlurred: function (e) {
            this.setState({ isFocused: false });
        },
        setValue: function (newValue) {
            var oldValue = this.state.value;
            this.setState({ value: newValue });
            this.props.onChange(newValue, oldValue);
        },
        getValue: function () {
            return this.state.value;
        },
        resetValue: function () {
            this.setValue({ value: this.props.initialValue });
        }
    });