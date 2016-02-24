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

const noop = () => null;

module.exports = (React) => ({ className = '', onClick = noop, children }) =>
  <div className={ 'jsk-button ' + className } onCick={ onClick }>
    <div className="jsk-button-text">{ children }</div>
  </div>
