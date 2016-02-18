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

const sanitise = (className) =>
        String(className).replace(/[\W\D\-_]/g, '').toLowerCase();


module.exports = {
  sanitise
};
