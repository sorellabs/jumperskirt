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

module.exports = (React) => {
  const Field = require('./Field')(React);

  const classNames = require('classnames');
  const Maybe = require('data.maybe');
  const T = React.PropTypes;

  class Photo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        image: this.props.initialImage,
        busy: false
      };
    }

    render() {
      var classes = classNames({
        'jsk-photo-container': true,
        'jsk-non-editable': this.props.readOnly,
        'jsk-photo-busy': this.props.busy,
        'jsk-photo-empty': this.state.image.isNothing
      }) + ' ' + this.props.className;

      return (
        <div className={ classes }>
          <div className="jsk-photo-selection">
            { this.state.image.map(x => this.renderImage(x)).getOrElse(this.renderNew()) }
          </div>
        </div>
      );
    }

    renderImage(image) {
      return (
        <div className="jsk-photo-item jsk-photo-current">
          <div className="jsk-photo-remove" onClick={ ::this._onRemove } />
          <img src={ image } />
        </div>
      );
    }

    renderNew() {
      return (
        <div className="jsk-photo-item jsk-photo-new">
          <div className="jsk-photo-new-icon" />
          <form method="POST" enctype="multipart/form-data" ref="form">
            <input type="file" ref="file" onChange={ ::this._onFileChanged } />
          </form>
        </div>
      );
    }

    // Events
    _onRemove(event) {
      if (!this.props.readOnly && !this.state.busy) {
        this.setImage(Maybe.Nothing());
      }
    }

    async _onFileChanged(event) {
      const files = this.refs.file.getDOMNode();
      const form  = this.refs.form.getDOMNode();

      this.setState({ busy: true });
      try {
        const newImage = await this.props.upload(files, form);
        this.setState({ busy: false });
        this.setImage(Maybe.Just(newImage));
      } catch(error) {
        this.setState({ busy: false });
        this.props.onError(error);
      }
    }

    setImage(newImage) {
      if (!this.props.readOnly) {
        var oldImage = this.state.value;
        this.setState({ image: newImage });
        this.props.onChange(newImage, oldImage);
      }
    }
  }

  Photo.propTypes = {
    className: T.string,
    readOnly: T.bool,
    upload: T.func,
    onChange: T.func,
    onError: T.func
  };

  Photo.defaultProps = {
    className: '',
    readOnly: false,
    initialImage: Maybe.Nothing(),
    async upload(files, form) { throw new Error("Not implemented."); },
    async onChange(newImage, oldImage) { return newImage; },
    onError(error) { throw error; }
  };

  return Photo;
};
