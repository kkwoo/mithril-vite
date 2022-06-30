import '@picocss/pico/css/pico.min.css';
import './style.css';
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

function mountMithril() {
  var count = 0;
  var root = document.getElementById('mithrilSpace');

  var mSplash = {
    view: function(vnode) {
      // refresh state from URL
      state = vnode.attrs;
      
      return m("div", [
        m("h1", "Groovate"),
        m("legend", {}, "MVP: store habit in URL for persistence in case of accidental reload"),
        m("label", { for: "entrydate" }, "Entry Date"),
        m("input", {
          type: "date",
          id: "entrydate",
          name: "entrydate",
          value: vnode.attrs.entryDate,
          onchange: function(e) {
            state.entryDate = e.target.value;
            // console.log(`state.entryDate: ${state.entryDate}`);
            sendState2URL();
          }
        }),
        m("label", { for: "beginTime" }, "Begin Time"),
        m("input", {
          type: "time",
          id: "beginTime",
          name: "beginTime",
          value: vnode.attrs.beginTime.replaceAll("^", ":"),
          onchange: function(e) {
            state.beginTime = e.target.value.replaceAll(":", "^");
            // console.log(`state.beginTime: ${state.beginTime}`);
            sendState2URL();
          }
        }),
        m("div", {class: "flex-grid container"}, [
            m("label", {class: "col"}, state.beginTime),
            m("button", {
              class: "col",
              onclick: function (e) {
                state.beginTime = customTime();
                sendState2URL();
              }
            }, "current time"),
        ]),          
        m("label", { for: "endTime" }, "End Time"),
        m("input", {
          type: "time",
          id: "endTime",
          name: "endTime",
          value: vnode.attrs.endTime.replaceAll("^", ":"),
          onchange: function(e) {
            state.endTime = e.target.value.replaceAll(":", "^");
            // console.log(`state.beginTime: ${state.beginTime}`);
            sendState2URL();
          }
        }),
        m("div", {class: "flex-grid container"}, [
          m("div", {class: "col"}, state.endTime),
          m("button", {
            class: "col",
            onclick: function (e) {
              state.endTime = customTime();
              sendState2URL();
            }
          }, "current time"),
        ]),
        m("label", { for: "habit" }, "Habit"),
        m("select", {
          id: "habit",
          name: "habit",
          value: vnode.attrs.habit,
          onchange: function(e) {
            state.habit = e.target.value;
            // console.log(`state.beginTime: ${state.beginTime}`);
            sendState2URL();
          }
        },
         [
           m("option", {value: "cs"}, "cs"),           
           m("option", {value: "BrSp"}, "BrSp"),
           m("option", {value: "600mL water"}, "600mL water"),
           m("option", {value: "3 x 8pu,11sq"}, "3 x 8pu,11sq"),
         ]),
        m("section", {}, `state: ${JSON.stringify(state)}`),
      ]);
    }
  };

  m.route(root, `/splash/${customDate()}/${customTime()}/${customTime()}/cs/`, {
    "/splash/:entryDate/:beginTime/:endTime/:habit": mSplash,
  });
}

function customDate() {
  let now = new Date();
  // toISOString is in UTC, but we want to use local time
  let lpad20s = (x) => { return String(x).padStart(2, "0") };
  return (
    [lpad20s(now.getFullYear()),
    lpad20s(now.getMonth() + 1),
    lpad20s(now.getDate())].join('-')
  );
}

function customTime() {
  // return a date separated with '^' due to Mithril routing weirdness
  let now = new Date();
  let curTime = now.toTimeString().slice(0, 8).replaceAll(":", "^");
  return (curTime);
}

function sendState2URL() {
  m.route.set('/splash/:entryDate/:beginTime/:endTime/:habit',
              state);
}