import{m as e}from"./vendor.349a5a48.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const i=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,r)=>{const l=new URL(e,i);if(self[t].moduleMap[l])return n(self[t].moduleMap[l]);const o=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){r(new Error(`Failed to import: ${e}`)),a(c)},onload(){n(self[t].moduleMap[l]),a(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");var t,n,i={entryDate:"",beginTime:"",endTime:"",habit:""};function a(){return(new Date).toTimeString().slice(0,8).replaceAll(":","^")}function r(){e.route.set("/splash/:entryDate/:beginTime/:endTime/:habit",i)}t=document.getElementById("mithrilSpace"),n={view:function(t){return i=t.attrs,e("div",[e("h1","Groovate"),e("legend",{},"MVP: store habit in URL for persistence in case of accidental reload"),e("label",{for:"entrydate"},"Entry Date"),e("input",{type:"date",id:"entrydate",name:"entrydate",value:t.attrs.entryDate,onchange:function(e){i.entryDate=e.target.value,r()}}),e("label",{for:"beginTime"},"Begin Time"),e("input",{type:"time",id:"beginTime",name:"beginTime",value:t.attrs.beginTime.replaceAll("^",":"),onchange:function(e){i.beginTime=e.target.value.replaceAll(":","^"),r()}}),e("div",{class:"flex-grid container"},[e("label",{class:"col"},i.beginTime),e("button",{class:"col",onclick:function(e){i.beginTime=a(),r()}},"current time")]),e("label",{for:"endTime"},"End Time"),e("input",{type:"time",id:"endTime",name:"endTime",value:t.attrs.endTime.replaceAll("^",":"),onchange:function(e){i.endTime=e.target.value.replaceAll(":","^"),r()}}),e("div",{class:"flex-grid container"},[e("div",{class:"col"},i.endTime),e("button",{class:"col",onclick:function(e){i.endTime=a(),r()}},"current time")]),e("label",{for:"habit"},"Habit"),e("select",{id:"habit",name:"habit",value:t.attrs.habit,onchange:function(e){i.habit=e.target.value,r()}},[e("option",{value:"cs"},"cs"),e("option",{value:"BrSp"},"BrSp"),e("option",{value:"600mL water"},"600mL water"),e("option",{value:"3 x 8pu,11sq"},"3 x 8pu,11sq")]),e("section",{},`state: ${JSON.stringify(i)}`)])}},e.route(t,`/splash/${function(){let e=new Date,t=e=>String(e).padStart(2,"0");return[t(e.getFullYear()),t(e.getMonth()+1),t(e.getDate())].join("-")}()}/${a()}/${a()}/cs/`,{"/splash/:entryDate/:beginTime/:endTime/:habit":n});
