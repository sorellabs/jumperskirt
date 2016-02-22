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

var React = require('react');
var ReactDOM = require('react-dom');
var { Success, Failure } = require('data.validation');
var {
  // Text inputs
  TextInput, PasswordInput,

  // Buttons
  Button, PrimaryButton,
} = require('../../')(React);


const isNumber = (value) =>
      /^\d*$/.test(value)?  Success(value)
      : /* otherwise */     Failure('Only numbers are accepted!');


const Page = (props) =>
    <div className="test-page">
      <h2>Input</h2>
      <TextInput label="Label"
                 placeholder="Placeholder"
                 description="Regular text input" />

    </div>;

ReactDOM.render(<Page />, document.querySelector('#main'));

/*
      <TextInput label="Read-Only"
                 initialValue="The Value" />

      <TextInput label="Logs changes"
                 onChange={ (now, old) => console.log(old, ' => ', now) } />

      <TextInput label="Only numbers"
                 validation={ isNumber } />

      <PasswordInput label="Password" />

      <h2>Buttons</h2>
*/
