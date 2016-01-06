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

// # module: src/components/Button
module.exports = function(React) {
  var T = React.PropTypes;

  return React.createClass({
    propTypes: {
      classNames: T.arrayOf(T.string),
      text: T.string,
      onClick: T.func
    },

    getDefaultProps() {
      return {
        classNames: [],
        text: '',
        onClick(){ }
      };
    },

    render() {
      var classes = ['jsk-button', ...this.props.classNames].join(' ');

      return (
        <div className={ classes } onClick={ this.props.onClick }>
          <div className="jsk-button-text">{ this.props.text }</div>
        </div>
      );
    }
  });
};
