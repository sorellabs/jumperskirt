module.exports = function(React) {
  var Maybe = require('data.maybe');
  var { Base, Cata } = require('adt-simple');
  var { PropTypes: T, addons: { classSet }} = React;

  data Tab {
    id: String,
    label: *,
    content: *
  } deriving (Base, Cata)

  function first(xs) {
    return xs.length > 0? Maybe.Just(xs[0]) : Maybe.Nothing()
  }

  return React.createClass({

    statics: {
      Tab: Tab
    },

    propTypes: {
      // A list of additional classes for the radio group
      classNames: T.arrayOf(T.string),

      // Tabs in the tab group
      tabs: T.arrayOf(T.instanceOf(Tab)).isRequired,

      // The initial tab to be shown
//      initialTab: T.instanceOf(Maybe),

      // Whether the tabs are disabled
      disabled: T.bool,

      // Fired when a new tab is selected
      onChange: T.func
    },

    componentDidMount: function() {
      this.setState({ timer: setInterval(this._updateMarkers) });
    },

    componentWillUnmount: function() {
      clearTimeout(this.state.timer);
    },

    getDefaultProps: function() {
      return {
        classNames: [],
        initialTab: Maybe.Nothing(),
        disabled: false,
        onChange: function() {}
      }
    },

    getInitialState: function() {
      var self = this;

      return {
        current: self.props.initialTab <|> first(self.props.tabs),
        disabled: self.props.disabled,
        timer: null
      }
    },

    _updateMarkers: function() {
      var self = this;
      var root = this.refs.root.getDOMNode();
      var line = root.querySelector('.jsk-tab-active-line');
      var container = root.querySelector('.jsk-tab-group-container');

      this.state.current.map(function(tab) {
        var button = root.querySelector('.jsk-tab-button.active');
        if (button) {
          line.style.left = button.offsetLeft + 'px';
          line.style.width = button.clientWidth + 'px';
        }

        var content = root.querySelector('.jsk-tab-content.active');
        if (content) {
          container.style.left = (-content.offsetLeft) + 'px'
        }
      }).orElse(function() {
        line.style.width = ''
        container.style.left = '100%'
      });
    },

    _onTabClicked: function(tab) {
      var self = this;

      return function() {
        self.setState({ current: Maybe.Just(tab) })
      }
    },

    getCurrent: function() {
      return this.state.current
    },

    isCurrent: function(tab) {
      return this.getCurrent().map(λ[#.id === tab.id]).getOrElse(false)
    },

    renderTabContent: function(tab, i) {
      var classes = classSet({
        'jsk-tab-content': true,
        active: this.isCurrent(tab)
      });

      return (
        <div key={ i } className={ classes }>
          { tab.content }
        </div>
      )
    },

    renderTab: function(tab, i) {
      var classes = classSet({
        'jsk-tab-button': true,
        'active': this.isCurrent(tab)
      });

      return (
        <div key={ i } className={ classes } onClick={ this._onTabClicked(tab) }>
          <div className="jsk-tab-label">{ tab.label }</div>
        </div>
      )
    },

    render: function() {
      var classes = classSet({
        'jsk-tab-group': true,
        'jsk-disabled': this.state.disabled,
        'jsk-has-current-tab': this.getCurrent().isJust
      }) + ' ' + this.props.classNames.join(' ');

      return (
        <div className={ classes } ref="root">
          <div className="jsk-tab-group-tabs">
            { this.props.tabs.map(this.renderTab) }
            <div className="jsk-tab-active-line" />
          </div>
          <div className="jsk-tab-group-content">
            <div className="jsk-tab-group-container">
              { this.props.tabs.map(this.renderTabContent) }
            </div>
          </div>
        </div>
      )
    }

  })

}
