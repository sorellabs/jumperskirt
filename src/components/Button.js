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

var classes = require('classnames');

module.exports = (React) => ({ classNames, onClick, children }) =>
  <div className={ classes('jsk-button', classNames) } onCick={ onClick }>
    <div className="jsk-button-text">{ children }</div>
  </div>
