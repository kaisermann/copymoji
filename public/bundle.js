!function(){"use strict";let e,t;const n=e=>[e.touches[0].clientX,e.touches[0].clientY],o={handleEvent(e){return this[`on${e.type}`](e)},ontouchstart(t){e=n(t)},ontouchmove(e){t=n(e)},ontouchend(){if(!e||!t)return;const[n,o]=[e[0]-t[0],e[1]-t[1]];Math.abs(o)<window.innerHeight/4&&Math.abs(n)>=window.innerWidth/3&&Math.abs(n)>Math.abs(o)&&(window.location.hash=n>0?"recently":"main"),e=null,t=null}};const c=40;let a;function d(e,t={},n){const o=document.createElement(e.toUpperCase());return t&&Object.keys(t).forEach(e=>{o[e]=t[e]}),n&&n.forEach(e=>o.appendChild(e)),o}function i(){return JSON.parse(localStorage.getItem("recently"))||[]}function r(){const e=a.childNodes,t=i();for(t.forEach((t,n)=>{let o=e[n];o||(o=d("li",null,[d("button",{className:"copy-btn"})]),a.appendChild(o)),o.childNodes[0].textContent=t});e[t.length];)a.removeChild(e[t.length])}function l(){a=document.querySelector(".recently-list"),document.addEventListener("touchstart",o),document.addEventListener("touchmove",o),document.addEventListener("touchend",o),document.addEventListener("touchstart",()=>{},!1),document.body.addEventListener("click",e=>{e.target.classList.contains("copy-btn")&&(!function(e){let t=i();t=[...new Set([e,...t.slice(0,c-1)])],localStorage.setItem("recently",JSON.stringify(t))}(e.target.textContent),function(e){const t=document.createElement("textarea");if(t.value=e,t.contentEditable=!0,t.readOnly=!0,t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),/iPad|iPhone|iPod/.test(navigator.userAgent)){const e=document.createRange();e.selectNodeContents(t);const n=window.getSelection();n.removeAllRanges(),n.addRange(e),t.setSelectionRange(0,999999)}else t.select();document.execCommand("copy"),document.body.removeChild(t)}(e.target.textContent),r())}),r()}"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?l():document.addEventListener("DOMContentLoaded",l,!1),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")})}();