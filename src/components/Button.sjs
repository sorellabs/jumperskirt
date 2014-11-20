var React = require('react/addons');
var { PropTypes: T, addons: { classSet }} = React;

var Button = module.exports = React.createClass({

  propTypes: {
    // A list of additional classes for the button
    classNames: T.arrayOf(T.string),

    // The text to display in the button
    text: T.string,

    // Fired when the button is clicked
    onClick: T.func
  },

  getDefaultProps: function() {
    return {
      classNames: [],
      text: '',
      onClick: function(){ }
    }
  },

  render: function() {
    var classes = (['jsk-button'] +++ this.props.classNames).join(' ');

    return (
      <div className={ classes } onClick={ this.props.onClick }>
        <div className="jsk-button-text">{ this.props.text }</div>
      </div>
    )
  }
})
