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

const { sanitise } = require('./utils/classes');

module.exports = (React) => {
  const Padding = _ => <span className="jsk-padding" />;


  return ({ type, children, leftPanel, rightPanel }) =>
    <div className={ "jsk-title-bar jsk-title-bar-type-" + sanitise(type) }>
      <div className="jsk-title-bar-panels">
        <div className="jsk-title-bar-left">{ leftPanel || Padding() }</div>
        <div className="jsk-title-bar-title">{ children }</div>
        <div className="jsk-title-bar-right">{ rightPanel || Padding() }</div>
      </div>
    </div>;
}
