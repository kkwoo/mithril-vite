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

export {customDate, customTime};