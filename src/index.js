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

module.exports = (React) => ({
  Field: require('./components/Field')(React),

  TextInput: require('./components/TextInput')(React),
  PasswordInput: require('./components/PasswordInput')(React),

  Button: require('./components/Button')(React),
  PrimaryButton: require('./components/PrimaryButton')(React)
});
