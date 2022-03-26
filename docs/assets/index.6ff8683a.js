var $=Object.defineProperty;var k=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var v=(e,t,o)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,h=(e,t)=>{for(var o in t||(t={}))M.call(t,o)&&v(e,o,t[o]);if(k)for(var o of k(t))T.call(t,o)&&v(e,o,t[o]);return e};var _=(e,t,o)=>(v(e,typeof t!="symbol"?t+"":t,o),o);import{c as createBlock,r as resolveComponent,o as openBlock,d as defineComponent,a as computed,b as createVNode,e as reactive,f as ref,w as watch,E as EditorView,H as HighlightStyle,t as tags,T as Text,g as onMounted,h as EditorState,i as basicSetup,k as keymap,j as indentWithTab,l as javascript,m as onBeforeUnmount,n as createTextVNode,p as nextTick,F as Fragment,q as createRouter,s as createWebHashHistory,u as createApp,v as createPinia}from"./vendor.9d8e9a79.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))u(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}};p();var App_vue_vue_type_style_index_0_lang="",_export_sfc=(e,t)=>{const o=e.__vccOpts||e;for(const[u,a]of t)o[u]=a;return o};const _sfc_main$5={};function _sfc_render(e,t){const o=resolveComponent("router-view");return openBlock(),createBlock(o)}var App=_export_sfc(_sfc_main$5,[["render",_sfc_render]]),_sfc_main$4=defineComponent({name:"MazeSprite",props:{grid:{type:Array,default:()=>[]},curPos:{type:Object,default:()=>({x:0,y:0})}},setup(e){const t=computed(()=>`top: ${e.curPos.y*20}px; left: ${e.curPos.x*20}px`);return()=>createVNode("div",{class:"sprite",style:t.value},[createVNode("div",{class:"sprite__inner"},null)])}}),index_vue_vue_type_style_index_0_scoped_true_lang$2="",MazeSprite=_export_sfc(_sfc_main$4,[["__scopeId","data-v-504d9871"]]),_sfc_main$3=defineComponent({name:"MazeView",emits:["cellChange"],props:{grid:{type:Array,default:()=>[]},gridProps:{type:Object,default:()=>({})},cellStyles:{type:Object,default:()=>({})},curPos:{type:Object,default:()=>({x:0,y:0})},mutable:{type:Boolean,default:!1},hasMask:{type:Boolean,default:!0}},setup(e,{emit:t}){const{maxX:o,maxY:u}=e.gridProps,a=(o+1)*20,r=(u+1)*20,s=(n,c,m)=>{e.mutable&&t("cellChange",n,c,m===1?0:1)};let l=!1;const f=()=>{e.mutable&&(l=!0)},E=()=>{e.mutable&&(l=!1)},B=(n,c)=>{e.mutable&&l&&t("cellChange",n,c,0)},P=computed(()=>e.grid.map((n,c)=>{const m=n.map((d,g)=>{const i=[];d>=1?i.push("block"):d===-1?i.push("entry"):d===-2?i.push("out"):i.push("road");const y=e.cellStyles[`${g}_${c}`];return createVNode("div",{class:`col cell ${i.join(" ")}`,style:y,onClick:()=>s(g,c,d),onMousedown:()=>f(),onMouseenter:()=>B(g,c),onMouseup:()=>E()},null)});return createVNode("div",{class:"row"},[m])})),D=computed(()=>`0 0 ${(e.gridProps.maxX+1)*20} ${(e.gridProps.maxY+1)*20}`),x=reactive({x:-99,y:-99}),F=ref(""),w=(n,c)=>{const{x:m,y:d}=n,{x:g,y:i}=c,y=m*20,A=d*20,V=`M ${y} ${A} ${C()}`;let b="";if(g!==void 0&&i!==void 0){const N=g*20,S=i*20;b=`M ${N} ${S} ${C()}`}F.value=`${V} ${b}`},C=()=>`h -${20} v ${20} h ${20} v ${20} h20 v -${20} h20 v -${20} h -${20} v -${20} h -${20} v ${20}`;return watch(e.curPos,n=>{w(e.curPos,x),Object.assign(x,n)},{immediate:!0}),()=>createVNode("div",{class:"maze-view"},[createVNode("div",{class:"maze-view-center"},[createVNode("div",{class:"maze-view-grid"},[P.value]),createVNode("div",{class:"maze-view-sprite-container"},[createVNode(MazeSprite,{grid:e.grid,curPos:e.curPos},null)]),e.hasMask&&createVNode("div",{class:"maze-view-mask"},[createVNode("svg",{viewBox:D.value},[createVNode("mask",{id:"mask"},[createVNode("rect",{x:"0",y:"0",width:a,height:r,fill:"white"},null),createVNode("path",{d:F.value,fill:"black"},null)]),createVNode("rect",{mask:"url(#mask)",x:"0",y:"0",width:a,height:r},null)])])])])}}),index_vue_vue_type_style_index_0_lang="";const chalky="#e5c07b",coral="#e06c75",cyan="#56b6c2",invalid="#ffffff",ivory="#abb2bf",stone="#7d8799",malibu="#61afef",sage="#98c379",whiskey="#d19a66",violet="#c678dd",darkBackground="#21252b",highlightBackground="#2c313a",background="#282c34",tooltipBackground="#353a42",selection="#3E4451",cursor="#528bff",oneDarkTheme=EditorView.theme({"&":{color:ivory,backgroundColor:background},".cm-content":{caretColor:cursor},".cm-cursor, .cm-dropCursor":{borderLeftColor:cursor},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":{backgroundColor:selection},".cm-panels":{backgroundColor:darkBackground,color:ivory},".cm-panels.cm-panels-top":{borderBottom:"2px solid black"},".cm-panels.cm-panels-bottom":{borderTop:"2px solid black"},".cm-searchMatch":{backgroundColor:"#72a1ff59",outline:"1px solid #457dff"},".cm-searchMatch.cm-searchMatch-selected":{backgroundColor:"#6199ff2f"},".cm-activeLine":{backgroundColor:highlightBackground},".cm-selectionMatch":{backgroundColor:"#aafe661a"},"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bad0f847",outline:"1px solid #515a6b"},".cm-gutters":{backgroundColor:background,color:stone,border:"none"},".cm-activeLineGutter":{backgroundColor:highlightBackground},".cm-foldPlaceholder":{backgroundColor:"transparent",border:"none",color:"#ddd"},".cm-tooltip":{border:"none",backgroundColor:tooltipBackground},".cm-tooltip .cm-tooltip-arrow:before":{borderTopColor:"transparent",borderBottomColor:"transparent"},".cm-tooltip .cm-tooltip-arrow:after":{borderTopColor:tooltipBackground,borderBottomColor:tooltipBackground},".cm-tooltip-autocomplete":{"& > ul > li[aria-selected]":{backgroundColor:highlightBackground,color:ivory}}},{dark:!0}),oneDarkHighlightStyle=HighlightStyle.define([{tag:tags.keyword,color:violet},{tag:[tags.name,tags.deleted,tags.character,tags.propertyName,tags.macroName],color:coral},{tag:[tags.function(tags.variableName),tags.labelName],color:malibu},{tag:[tags.color,tags.constant(tags.name),tags.standard(tags.name)],color:whiskey},{tag:[tags.definition(tags.name),tags.separator],color:ivory},{tag:[tags.typeName,tags.className,tags.number,tags.changed,tags.annotation,tags.modifier,tags.self,tags.namespace],color:chalky},{tag:[tags.operator,tags.operatorKeyword,tags.url,tags.escape,tags.regexp,tags.link,tags.special(tags.string)],color:cyan},{tag:[tags.meta,tags.comment],color:stone},{tag:tags.strong,fontWeight:"bold"},{tag:tags.emphasis,fontStyle:"italic"},{tag:tags.strikethrough,textDecoration:"line-through"},{tag:tags.link,color:stone,textDecoration:"underline"},{tag:tags.heading,fontWeight:"bold",color:coral},{tag:[tags.atom,tags.bool,tags.special(tags.variableName)],color:whiskey},{tag:[tags.processingInstruction,tags.string,tags.inserted],color:sage},{tag:tags.invalid,color:invalid}]);var _sfc_main$2=defineComponent({name:"CodeEidtor",props:{value:{type:String,default:""}},setup(e,{expose:t}){const o=Text.of(e.value.split(`
`)||[""]);let u;return onMounted(()=>{u=new EditorView({state:EditorState.create({doc:o,extensions:[basicSetup,keymap.of([indentWithTab]),javascript(),oneDarkTheme,oneDarkHighlightStyle]}),parent:document.querySelector("#editor")})}),t({getDoc:()=>u&&u.state.doc.toJSON(),updateDoc:a=>{let r=u.state.doc.toString();u.dispatch({changes:{from:0,to:r.length,insert:a}})}}),()=>createVNode("div",{class:"code-editor"},[createVNode("div",{id:"editor"},null)])}}),index_vue_vue_type_style_index_0_scoped_true_lang$1="",CodeEditor=_export_sfc(_sfc_main$2,[["__scopeId","data-v-7287226d"]]);const map1={name:"simple1",map:[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-2,1,1],[1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1],[1,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1],[1,0,0,0,1,1,1,1,1,1,0,1,0,1,1,0,0,0,0,1,1,1,1,1],[1,1,1,0,1,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,1,1,1],[1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],[-1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],[1,1,1,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1]],entry:{},out:{}};function walkGrid(e){if(!e[0])return{};const t=e.length-1,o=e[0].length-1;let u={x:0,y:0},a={x:0,y:0};return e.forEach((r,s)=>{r.forEach((l,f)=>{l===-1&&(u={x:f,y:s}),l===-2&&(a={x:f,y:s})})}),{maxX:o,maxY:t,entryPos:u,outPos:a}}function isBlocked(e,t){return e[t.y][t.x]>=1}function minmax(e,t=0,o=0){return Math.min(t,Math.max(o,e))}function diffPos(e,t){return{dx:e.x-t.x,dy:e.y-t.y}}function getAroundValue(e,t){const{x:o,y:u}=e,a={x:o,y:u-1},r={x:o+1,y:u},s={x:o,y:u+1},l={x:o-1,y:u};return[getPosValue(a,t),getPosValue(r,t),getPosValue(s,t),getPosValue(l,t)]}function getPosValue(e,t){const{x:o,y:u}=e;if(!!t[u]&&t[u][o]!==void 0)return t[u][o]}class Record{constructor(){_(this,"history",[])}add(t){this.history.push(t)}getAll(){return this.history}clear(){this.history.length=0}}const mySolution=`
// \u63A5\u53D7\u5F53\u524D\u683C\u5B50\u5750\u6807\uFF0C\u8FD4\u56DE\u4E0B\u4E00\u6B65\u884C\u52A8\u65B9\u5411\uFF0C\u6E38\u620F\u6709\u81EA\u52A8\u5224\u8D62\u673A\u5236\uFF0C\u5230\u8FBE\u7EC8\u70B9\u81EA\u52A8\u505C\u6B62
// \u6253\u5F00DevTools\u53EF\u67E5\u770B\u884C\u8D70\u6B65\u6570
// 
// curPos { x:0, y:0 } \u5F53\u524D\u683C\u5B50\u5750\u6807
// around [1, 0, 0, 1], \u5F53\u524D\u683C\u5B50\u5468\u56F4\u7684\u683C\u5B50\u901A\u884C\u60C5\u51B5\uFF0C\u4F9D\u6B21\u4E3A\u4E0A\u53F3\u4E0B\u5DE6\uFF0C0\u4E3A\u53EF\u901A\u4FE1\uFF0C1\u4E3A\u5899\u58C1\uFF0C-1\u8D77\u70B9\uFF0C-2\u7EC8\u70B9
// payload \u5168\u5C40\u5B58\u50A8\u6302\u8F7D\u5BF9\u8C61
// helpers \u5E2E\u52A9\u51FD\u6570
//         - helpers.setCellStyle("background-color: red"); \u53EF\u8BBE\u7F6E\u5F53\u524D\u683C\u5B50\u7684\u6837\u5F0F
//         - helpers.diffPos(pos1, pos2) // { dx: 0, dy: 1 }; \u8FD4\u56DE\u4E24\u4E2A\u5750\u6807\u7684\u76F8\u5BF9\u5750\u6807
// 
// return { dx: 1, dy: 0 } dx \u8868\u793A\u6A2A\u5411\u4F4D\u79FB\uFF0C1\u5411\u5DE6\uFF0C-1\u5411\u53F3\uFF0C0\u4FDD\u6301\u4E0D\u52A8
// dy\u8868\u793A\u7EB5\u5411\u4F4D\u79FB\uFF0C1\u5411\u4E0B\uFF0C-1\u5411\u4E0A\uFF0C0\u4FDD\u6301\u4E0D\u52A8\u3002\u6BCF\u4E00\u6B65\u53EA\u80FD\u671D\u4E00\u4E2A\u65B9\u5411\u4F4D\u79FB\u4E00\u6B65\uFF0C\u4E0D\u80FD\u659C\u7740\u8D70\u3002
const findNext = function findNext(curPos, around, payload, helpers) {
  if (!payload.visited) {
    payload.visited = {};
  }

  const { visited } = payload;
  const key = getKey(curPos);
  const movalePos = getAroundMovablePos(curPos, around);

  if (!visited[key]) {
    const prev = movalePos.find((pos) => !!(pos && visited[getKey(pos)]));
    visited[key] = {
      prev,
      next: movalePos.filter((pos) => pos && getKey(pos) !== getKey(prev)),
    };
  }

  const { prev, next } = visited[key];
  let nextPos = prev;
  if (next.length === 0) {
    Reflect.deleteProperty(visited, key);
  } else {
    [nextPos] = next.splice(randomIntBetween(0, next.length - 1), 1);
  }

  setVisitedCountStlye(curPos, payload, helpers);

  return helpers.diffPos(nextPos, curPos);
}


function getKey(pos) {
  if (!pos) {
    return "";
  }

  return \`\${pos.x}_\${pos.y}\`;
}

const colors = ["#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#b71c1c"];

function setVisitedCountStlye(curPos, payload, helpers) {
  if (!payload.visitCount) {
    payload.visitCount = {};
  }

  const count = payload.visitCount[getKey(curPos)] || 0;
  const color = colors[Math.min(colors.length - 1, count)];

  payload.visitCount[getKey(curPos)] = count + 1;

  helpers.setCellStyle(\`background-color: \${color};\`);
}

function getAroundMovablePos(curPos, around) {
  const { x, y } = curPos;
  const [top, right, bottom, left] = around;
  const movalePos = [];

  const blockedOrOutbound = (val) => val == undefined || val >= 1;

  movalePos.push(
    blockedOrOutbound(top)
      ? undefined
      : {
          x,
          y: y - 1,
        }
  );
  movalePos.push(
    blockedOrOutbound(right)
      ? undefined
      : {
          x: x + 1,
          y,
        }
  );
  movalePos.push(
    blockedOrOutbound(bottom)
      ? undefined
      : {
          x,
          y: y + 1,
        }
  );
  movalePos.push(
    blockedOrOutbound(left)
      ? undefined
      : {
          x: x - 1,
          y,
        }
  );

  return movalePos;
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
`,initialCodeText=`
// \u63A5\u53D7\u5F53\u524D\u683C\u5B50\u5750\u6807\uFF0C\u8FD4\u56DE\u4E0B\u4E00\u6B65\u884C\u52A8\u65B9\u5411\uFF0C\u6E38\u620F\u6709\u81EA\u52A8\u5224\u8D62\u673A\u5236\uFF0C\u5230\u8FBE\u7EC8\u70B9\u81EA\u52A8\u505C\u6B62
// \u6253\u5F00DevTools\u53EF\u67E5\u770B\u884C\u8D70\u6B65\u6570
// 
// curPos { x:0, y:0 } \u5F53\u524D\u683C\u5B50\u5750\u6807
// around [1, 0, 0, 1], \u5F53\u524D\u683C\u5B50\u5468\u56F4\u7684\u683C\u5B50\u901A\u884C\u60C5\u51B5\uFF0C\u4F9D\u6B21\u4E3A\u4E0A\u53F3\u4E0B\u5DE6\uFF0C0\u4E3A\u53EF\u901A\u4FE1\uFF0C1\u4E3A\u5899\u58C1\uFF0C-1\u8D77\u70B9\uFF0C-2\u7EC8\u70B9
// payload \u5168\u5C40\u5B58\u50A8\u6302\u8F7D\u5BF9\u8C61
// helpers \u5E2E\u52A9\u51FD\u6570
//         - helpers.setCellStyle("background-color: red"); \u53EF\u8BBE\u7F6E\u5F53\u524D\u683C\u5B50\u7684\u6837\u5F0F
//         - helpers.diffPos(pos1, pos2) // { dx: 0, dy: 1 }; \u8FD4\u56DE\u4E24\u4E2A\u5750\u6807\u7684\u76F8\u5BF9\u5750\u6807
// 
// return { dx: 1, dy: 0 } dx \u8868\u793A\u6A2A\u5411\u4F4D\u79FB\uFF0C1\u5411\u5DE6\uFF0C-1\u5411\u53F3\uFF0C0\u4FDD\u6301\u4E0D\u52A8
// dy\u8868\u793A\u7EB5\u5411\u4F4D\u79FB\uFF0C1\u5411\u4E0B\uFF0C-1\u5411\u4E0A\uFF0C0\u4FDD\u6301\u4E0D\u52A8\u3002\u6BCF\u4E00\u6B65\u53EA\u80FD\u671D\u4E00\u4E2A\u65B9\u5411\u4F4D\u79FB\u4E00\u6B65\uFF0C\u4E0D\u80FD\u659C\u7740\u8D70\u3002
const findNext = function findNext(curPos, around, payload, helpers) {
  return { dx: 1, dy: 0 };
}
`;var _sfc_main$1=defineComponent({name:"GameCanvas",setup(props){const hasMask=ref(!0),interval=ref(200),grid=reactive(map1.map),gridProps=computed(()=>walkGrid(grid)).value,state=reactive({manual:!1,gridMutable:!1,emptyDoc:!0}),record=new Record,cellStyles=ref({}),codeText=ref(initialCodeText),editor=ref(null);let timer=0;const curPos=reactive(h({},gridProps.entryPos));window.payload={};const changeGrid=(e,t,o)=>{grid[t][e]=o},toggleDoc=()=>{var e;(e=editor.value)==null||e.updateDoc(state.emptyDoc?mySolution:initialCodeText),state.emptyDoc=!state.emptyDoc},checkGame=()=>{const{x:e,y:t}=curPos,{outPos:o}=gridProps;e===(o==null?void 0:o.x)&&t===o.y&&(console.log("%cDaker","color:#fff;background:#333;padding:2px 4px;border-radius:2px;border-left:4px solid red","win!"),console.log("%cDaker","color:#fff;background:#333;padding:2px 4px;border-radius:2px;border-left:4px solid red",record.getAll().length),clearInterval(timer))},setCellStyle=e=>{cellStyles.value[`${curPos.x}_${curPos.y}`]=e},toggleMask=()=>{hasMask.value=!hasMask.value},changeInterval=e=>{interval.value=+e.target.value},move=(e=0,t=0)=>{const o=[-1,0,1];if(!(o.includes(e)&&o.includes(t)))throw new Error("dx, dy must be -1/0/-1");if(e*t!==0)throw new Error("only allow movement in one direction");if(e===0&&t===0)throw new Error("the spirte stop to move");let u=h({},curPos);if(u.x=minmax(u.x+e,gridProps.maxX,0),u.y=minmax(u.y+t,gridProps.maxY,0),u.x===curPos.x&&u.y===curPos.y)throw new Error("the sprite stop to move");if(!isBlocked(grid,u))Object.assign(curPos,u);else throw new Error("can't go through the wall");record.add({pos:curPos}),checkGame()},reset=()=>{stop(),Object.assign(curPos,{x:-99,y:-99}),nextTick(()=>{Object.assign(curPos,gridProps.entryPos)}),cellStyles.value={},record.clear(),window.payload={}},play=()=>{clearInterval(timer),timer=setInterval(()=>{var e;try{const around=getAroundValue(curPos,grid),codes=(e=editor.value)==null?void 0:e.getDoc(),_diffPos=diffPos,_setCellStyle=setCellStyle,execCode=`
          const { dx, dy } = findNext(
            curPos,
            ${JSON.stringify(around)},
            window.payload,
            {
              setCellStyle: _setCellStyle,
              diffPos: _diffPos
            }
          );
          move(dx, dy);
          `;codes.push(execCode),eval(codes.join(`
`))}catch(t){console.error(t),clearInterval(timer)}},interval.value)},stop=()=>{clearInterval(timer)},updatePositon=e=>{let t,o=0;switch(e.key){case"ArrowUp":o=-1;break;case"ArrowRight":t=1;break;case"ArrowDown":o=1;break;case"ArrowLeft":t=-1;break}move(t,o)};return onMounted(()=>{state.manual&&window.addEventListener("keydown",updatePositon)}),onBeforeUnmount(()=>{clearInterval(timer),state.manual&&window.removeEventListener("keydown",updatePositon)}),()=>createVNode("div",{class:"game-canvas"},[createVNode("div",{class:"header"},[createVNode("h1",null,[createTextVNode("Out of the maze")])]),createVNode("div",{class:"main"},[createVNode(_sfc_main$3,{grid,gridProps,curPos,onCellChange:changeGrid,mutable:state.gridMutable,cellStyles:cellStyles.value,hasMask:hasMask.value},null)]),createVNode("div",{class:"sidebar"},[createVNode("div",{class:"tool"},[createVNode("span",null,[createTextVNode("Interval(ms): ")]),createVNode("input",{value:interval.value,onChange:changeInterval,type:"number"},null),createVNode("button",{onClick:play},[createTextVNode("Play")]),createVNode("button",{onClick:reset},[createTextVNode("Reset")]),createVNode("button",{onClick:stop},[createTextVNode("Stop")]),createVNode("button",{onClick:toggleMask},[createTextVNode("Toggle Mask")]),createVNode("button",{onClick:toggleDoc},[state.emptyDoc?"Daker's solution":"Do it yourself"])]),createVNode(CodeEditor,{ref:editor,value:codeText.value},null)])])}}),index_vue_vue_type_style_index_0_scoped_true_lang="",GameCanvas=_export_sfc(_sfc_main$1,[["__scopeId","data-v-9a5f9fa4"]]),_sfc_main=defineComponent({name:"HomeView",setup(e){return()=>createVNode(Fragment,null,[createVNode(GameCanvas,null,null),createVNode("div",{class:"github"},[createVNode("a",{href:"https://github.com/DakerHub/coding-game-maze",target:"__blank"},[createTextVNode("Github - DakerHub")])])])}}),HomeView_vue_vue_type_style_index_0_scoped_true_lang="",HomeView=_export_sfc(_sfc_main,[["__scopeId","data-v-752350c6"]]);const router=createRouter({history:createWebHashHistory("./"),routes:[{path:"/",name:"home",component:HomeView}]}),app=createApp(App);app.use(createPinia());app.use(router);app.mount("#app");
