const Util  = require('./Util');
const React = require('react');
const ReactDom = require('react-dom');
const createClass = require('create-react-class');


var _ = (function() {
  if (React) return React.createElement;
  else {
    throw new Error('Morearty: global variable React not found');
  }
})();

function wrapComponent(comp, displayName) {
  return createClass({

    displayName: displayName,

    getInitialState: function () {
      return { value: this.props.value };
    },

    onChange: function (event) {
      var handler = this.props.onChange;
      if (handler) {
        handler(event);
        this.setState({ value: event.target.value });
      }
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({ value: newProps.value });
    },

    render: function () {
      var props = Util.assign({}, this.props, {
        value: this.state.value,
        onChange: this.onChange,
        children: this.props.children
      });
      return comp(props);
    }

  });
};


function createElement(tag) {
  return function(props, children) {
    return _(tag, props, children)
  }
}
/**
 * @name DOM
 * @namespace
 * @classdesc DOM module. Exposes requestAnimationFrame-friendly wrappers around input, textarea, and option.
 */
var DOM = {

  input: wrapComponent(createElement('input'), 'input'),

  textarea: wrapComponent(createElement('textarea'), 'textarea'),

  option: wrapComponent(createElement('option'), 'option')

};

module.exports = DOM;
