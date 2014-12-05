module.exports = function(React) {
  var { Base, Cata } = require('adt-simple');
  
  var { PropTypes: T, addons: { classSet }} = React;
  
  data RadioItem {
    label: String,
    value: String
  } deriving (Base, Cata)
  
  return React.createClass({
  
    statics: {
      RadioItem: RadioItem
    },
  
    propTypes: {
      // A list of additional classes for the radio group
      classNames: T.arrayOf(T.string),
  
      // Name of the radio group
      name: T.string.isRequired,
  
      // Items in the Radio Group
      items: T.arrayOf(T.instanceOf(RadioItem)).isRequired,
  
      // Initial value for the radio group
      initialValue: T.string,
  
      // Whether the radio group can be modified or not
      readOnly: T.bool,
  
      // Label for the field
      label: T.string,
  
      // Description of the value expected in the field
      description: T.string,
  
      // Fired whenever the value of the radio group changes
      onChange: T.func
    },
  
    getDefaultProps: function() {
      return {
        classNames: [],
        initialValue: '',
        readOnly: false,
        label: '',
        description: '',
        onChange: function(){ }
      }
    },
  
    getInitialState: function() {
      return {
        value: this.props.initialValue
      }
    },
  
    renderRadioItem: function(item) {
      
    },
  
    render: function() {
      var classes = classSet({
        'jsk-field': true,
        'jsk-radio-group': true,
        'jsk-non-editable': this.props.readOnly
      }) + ' ' + this.props.classNames.join(' ');
  
      return (
        <div className={ classes }>
          <input type="hidden" name={ this.props.name } value={ this.state.value } />
          <label className="jsk-field-label">{ this.props.label }</label>
          <div className="jsk-radio-items">
            { this.props.items.map(this.renderRadioItem) }
          </div>
          <div className="jsk-field-description">{ this.props.description }</div>
        </div>
      )
    }
    
  });
}
