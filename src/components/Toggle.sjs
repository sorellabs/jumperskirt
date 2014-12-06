module.exports = function(React) {

  var { PropTypes: T, addons: { classSet }} = React;

  return React.createClass({
    propTypes: {
      // A list of additional classes for the Toggle
      classNames: T.arrayOf(T.string),

      // Label for the Toggle
      label: T.string,

      // Name of the Toggle
      name: T.string.isRequired,

      // Value of the Toggle
      value: T.string.isRequired,

      // Whether the Toggle is initially on
      checked: T.bool,

      // Long description of the value expected in the Toggle
      description: T.string,

      // Can the Toggle be modified?
      readOnly: T.bool,

      // Fired whenever the Toggle is changed
      onChange: T.func
    },

    getDefaultProps: function() {
      return {
        classNames: [],
        label: '',
        checked: false,
        description: '',
        readOnly: false,
        onChange: function(){}
      }
    },

    getInitialState: function() {
      return {
        checked: this.props.checked
      }
    },

    _onClicked: function() {
      if (!this.props.readOnly) {
        var oldState = this.state.checked;
        this.setState({ checked: !oldState });
        this.props.onChange(!oldState, oldState);
      }
    },

    render: function() {
      var classes = classSet({
        'jsk-field': true,
        'jsk-toggle-field': true,
        'jsk-non-editable': this.props.readOnly,
        'active': this.state.checked
      }) + ' ' + this.props.classNames.join(' ');

      return (
        <div className={ classes }>
          <div className="jsk-toggle-container">
            <div className="jsk-label-panel">
              <label className="jsk-field-label" onClick={ this._onClicked}>
                {this.props.label}
              </label>
            </div>
            <div className="jsk-toggle-panel">
              <input type="checkbox"
                     checked={this.state.checked}
                     ref="input"
                     value={this.props.value}
                     name={this.props.name}
                     />
              <div className="jsk-toggle-button" onClick={ this._onClicked }>
                <div className="jsk-toggle-bullet" />
              </div>
            </div>
          </div>
          <div className="jsk-field-description">
            { this.props.description }
          </div>
        </div>
      )
    }
    
  })

}
