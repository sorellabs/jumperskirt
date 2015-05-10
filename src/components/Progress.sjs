module.exports = function(React) {
  var { PropTypes: T, addons: { classSet }} = React;
  var { Extractor, Eq } = require('adt-simple');

  union ProgressType {
    Unknown,
    Progress { current: Number, total: Number, size: Number }
  } deriving (Extractor, Eq)

  function range(start, end) {
    var xs = [];
    while (start < end) xs.push(start++)
    return xs
  }

  function percent(a) {
    return Math.floor(a * 100)
  }

  return React.createClass({
    statics: {
      types: {
        Unknown: Unknown,
        Progress: Progress
      }
    },

    propTypes: {
      // A list of additional classes for the progress bar
      classNames: T.arrayOf(T.string),

      // Initial progress for the progress bar
      initialProgress: T.oneOf([Unknown, Progress])
    },

    getDefaultProps: function() {
      return {
        classNames: [],
        initialProgress: Unknown
      }
    },

    getInitialState: function() {
      return {
        progress: this.props.initialProgress
      }
    },

    isFilled: function(part) {
      return match this.state.progress {
        Unknown               => false,
        Progress(x, total, *) => percent(part / this.props.size) >= percent(x / total)
      }
    },

    computeSize: function() {
      return match this.state.progress {
        Unknown              => 5,
        Progress(*, *, size) => size
      }
    },

    setProgress: function(progress) {
      this.setState({ progress: progress })
    },

    renderPart: function(part) {
      var classes = classSet({
        'jsk-progress-part': true,
        'jsk-progress-filled': this.isFilled(part)
      }) + ' jsk-progress-part' + String(part + 1);

      return (
        <div className={ classes } />
      )
    },

    render: function() {
      var classes = classSet({
        'jsk-progress': true,
        'jsk-progress-unknown': this.state.progress.equals(Unknown)
      }) + ' ' + this.props.classNames.join(' ');

      return (
        <div className={ classes }>
          { range(0, this.computeSize()).map(this.renderPart) }
        </div>
      )
    }
  })
}
