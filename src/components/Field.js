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


module.exports = (React) => ({ kind, children }) =>
  <div className={"jsk-field " + sanitise(kind)}>
    { children }
  </div>
