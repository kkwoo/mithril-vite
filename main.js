import '@picocss/pico/css/pico.min.css';
import './style.css';
import {customDate, customTime, sendState2URL} from './util.js';
import {mountMithril} from './view.js';
// if you wrap m in curly braces, the code fails silently
// import m from 'mithril/mithril.min.js'; // this also works
// from https://mithril.js.org/installation.html
import m from 'mithril';
// require doesn't work either
// var m = require("mithril");

// everything in state will be initialised by
// the m.route call
// refer to later comment "refresh state from URL"
// in the mSplash definition
var state = {
  entryDate: "",
  beginTime: "",
  endTime: "",
  habit: ""
};

mountMithril();

