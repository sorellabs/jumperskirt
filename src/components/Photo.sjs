module.exports = function(React) {
  var Maybe = require('data.maybe');
  var { PropTypes: T, addons: { classSet }} = React;

  return React.createClass({
    propTypes: {
      // A list of additional classes for the input
      classNames: T.arrayOf(T.string),

      // Name for the input
      name: T.string.isRequired,

      // Label for the input
      label: T.string,

      // Long description of the value expected in the input
      description: T.string,

      // Whether the input can be modified or not
      readOnly: T.bool,

      // URL of the current image
//      currentImage: Maybe[URI],

      // Function that handles uploading images:
      // @type: (HTMLFileInput, HTMLForm) → Future[URI]
      onUpload: T.func.isRequired,

      // Fired whenever we fail to upload an image:
      // @type: Error → Void
      onError: T.func,

      // Fired whenever the value of the input changes:
      // @type: (new: Maybe[URI], old: Maybe[URI]) → Void
      onChange: T.func
    },

    getDefaultProps: function() {
      return {
        classNames: [],
        label: '',
        description: '',
        readOnly: false,
        currentImage: Maybe.Nothing(),
        addLabel: 'Add',
        addIconClass: 'jsk-icon-add-photo',
        emptyLabel: 'No image',
        emptyIconClass: 'jsk-icon-no-image',
        onChange: function(){ },
        onError: function(e){ throw e }
      }
    },

    getInitialState: function() {
      return {
        value: this.props.currentImage,
        busy: false
      }
    },

    setValue: function(newValue) {
      if (!this.props.readOnly) {
        var oldValue = this.state.value;
        this.setState({ value: newValue });
        this.props.onChange(newValue, oldValue);
      }
    },

    _onFileChanged: function(ev) {
      var files = this.refs.input.getDOMNode();
      var form  = this.refs.form.getDOMNode();
      var self  = this;

      this.setState({ busy: true });
      this.props.onUpload(files, form).fork(
        function(error) {
          self.setState({ busy: false });
          self.onError(error)
        },
        function(value) {
          self.setState({ busy: false });
          self.setValue(Maybe.Just(value))
        }
      );
    },

    _onEmptyClicked: function() {
      this.setValue(Maybe.Nothing())
    },

    renderCurrent: function(uri) {
      return (
        <li className="jsk-item jsk-photo-current active">
          <img src={ uri } />
        </li>
      )
    },

    render: function() {
      var classes = classSet({
        'jsk-field': true,
        'jsk-photo-field': true,
        'jsk-non-editable': this.props.readOnly,
        'jsk-photo-busy': this.state.busy,
        'jsk-has-photo': this.state.value.isJust
      }) + ' ' + this.props.classNames.join(' ');

      var noPhotoClass = classSet({
        'jsk-item': true,
        'jsk-photo-empty': true,
        'active': this.state.value.isNothing
      });

      return (
        <div className={ classes }>
          <label className="jsk-field-label">
            { this.props.label }
          </label>
          <ul className="unstyled jsk-photo-selection">
            <li className="jsk-item jsk-photo-add">
              <div className="jsk-photo-label">{ this.props.addLabel }</div>
              <div className={ "jsk-photo-icon " + this.props.addIconClass } />
              <form method="POST" enctype="multipart/form-data" ref="form">
                <input type="file" ref="input"
                       name={ this.props.name }
                       onChange={ this._onFileChanged } />
              </form>
            </li>
            { this.state.value.map(this.renderCurrent).getOrElse(null) }
            <li className={ noPhotoClass } onClick={ this._onEmptyClicked }>
              <div className="jsk-photo-label">{ this.props.emptyLabel }</div>
              <div className={ "jsk-photo-icon " + this.props.emptyIconClass } />
            </li>
          </ul>
          <div className="jsk-field-description">
            { this.props.description }
          </div>
        </div>
      )
    }
  })

}
