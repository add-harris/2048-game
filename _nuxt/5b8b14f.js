(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{267:function(t,e,n){var content=n(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(36).default)("751af70f",content,!0,{sourceMap:!1})},270:function(t,e,n){var content=n(289);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(36).default)("4585fda5",content,!0,{sourceMap:!1})},275:function(t,e,n){var content=n(299);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(36).default)("6759f5ab",content,!0,{sourceMap:!1})},279:function(t,e,n){"use strict";n(267)},280:function(t,e,n){var r=n(35)(!1);r.push([t.i,'.center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:"Orbitron",sans-serif}.sliding-card{position:absolute!important;transition-property:all!important;transition:top .4s,left .4s!important;z-index:2}@media screen and (max-width:520px){.sliding-card-adjust{height:72px;width:72px;margin:5px}.value-size-lg{font-size:1.3em}.value-size-md{font-size:1.05em}.value-size-sm{font-size:.85em}.value-size-xs{font-size:.7em}}@media screen and (min-width:521px){.sliding-card-adjust{height:110px;width:110px;margin:5px}.value-size-lg{font-size:1.9em}.value-size-md{font-size:1.55em}.value-size-sm{font-size:1.35em}.value-size-xs{font-size:1.2em}}',""]),t.exports=r},288:function(t,e,n){"use strict";n(270)},289:function(t,e,n){var r=n(35)(!1);r.push([t.i,'.score-label{font-size:1em;font-family:"Russo One",sans-serif}.score-card{box-shadow:inset 0 1px 1px 1px #000;background-color:#696969!important;color:#f5f5f5!important}.score-digits{padding-right:5px;text-align:right;font-size:1.5em;font-family:"Orbitron",sans-serif}',""]),t.exports=r},298:function(t,e,n){"use strict";n(275)},299:function(t,e,n){var r=n(35)(!1);r.push([t.i,'.collapse-x-enter-active,.collapse-y-enter-active,.shrink-enter-active,.shrink-leave-active{transition:width .4s,height .4s,transform .4s!important;z-index:2!important}.collapse-x-leave-active,.collapse-y-leave-active{transition:width .4s,height .4s,transform .4s!important;z-index:1!important}.collapse-x-enter,.collapse-y-enter,.shrink-enter,.shrink-leave-to{transform:scale(0);z-index:2!important}.collapse-x-leave-to,.collapse-y-leave-to{transform:scale(0);z-index:1!important}.grey-container{margin:auto;padding:5px;border-radius:2px;background-color:#d3d3d3!important}.grid-background{position:absolute;background-repeat:repeat;background-color:#f5f5f5;background-image:linear-gradient(90deg,#696969 1px,transparent 0),linear-gradient(180deg,#696969 1px,transparent 0)}@media screen and (max-width:520px){.grid-background-adjust{height:320px;width:320px;background-size:80px 80px}.grey-container-adjust{height:330px;width:330px}}@media screen and (min-width:521px){.grid-background-adjust{height:480px;width:480px;background-size:120px 120px}.grey-container-adjust{height:490px;width:490px}}#game-title{font-family:"Russo One",sans-serif!important}',""]),t.exports=r},311:function(t,e,n){"use strict";n.r(e);n(23),n(24);var r=n(3),o=(n(14),n(40),n(31),n(64),n(60),n(17),n(9),n(38),n(37),n(11),n(30),n(13),n(278),n(19),n(78),n(55),n(56),{props:{initTop:Number,initLeft:Number,viewPortRatio:Number,transitionEnabled:Boolean,zIndex:Number,cardRef:String,value:Number},data:function(){return{colors:{2:"#6495ED",4:"#4682B4",8:"#5F9EA0",16:"#8FBC8F",32:"#3CB371",64:"#2E8B57",128:"#FF7F50",256:"#FF8C00",512:"#D2691E",1024:"#CD5C5C",2048:"#B22222",4096:"#8B0000"},sizes:{4:"value-size-lg",5:"value-size-md",6:"value-size-sm",7:"value-size-xs"}}},computed:{computedCardStyles:function(){var style={top:this.initTop*this.viewPortRatio+"px",left:this.initLeft*this.viewPortRatio+"px","background-color":this.colors["".concat(this.value)]||"#483D8B"};return this.transitionEnabled||(style.transition="none !important"),style},computedValueClass:function(){var t=this.value.toString().length,e=t<=4?"value-size-lg":this.sizes[t]||"value-size-xs";return"center ".concat(e)}}}),c=(n(279),n(61)),l=n(79),d=n.n(l),h=n(276),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{ref:t.cardRef,staticClass:"sliding-card sliding-card-adjust justify-center",style:t.computedCardStyles,attrs:{raised:""}},[n("p",{class:t.computedValueClass},[t._v(t._s(t.value))])])}),[],!1,null,null,null),f=component.exports;d()(component,{VCard:h.a});var m={props:{currentScore:Number,bestScore:Number}},v=(n(288),n(305)),w=n(260),y=n(306),x=Object(c.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"4"}},[n("p",{staticClass:"score-label text-right"},[t._v("Score")])]),t._v(" "),n("v-col",{attrs:{cols:"8"}},[n("v-card",{staticClass:"score-card",attrs:{light:""}},[n("p",{staticClass:"score-digits"},[t._v(t._s(t.currentScore))])])],1),t._v(" "),n("v-col",{attrs:{cols:"4"}},[n("p",{staticClass:"score-label text-right"},[t._v("Best")])]),t._v(" "),n("v-col",{attrs:{cols:"8"}},[n("v-card",{staticClass:"score-card",attrs:{light:""}},[n("p",{staticClass:"score-digits"},[t._v(t._s(t.bestScore))])])],1)],1)],1)}),[],!1,null,null,null),R=x.exports;d()(x,{VCard:h.a,VCol:v.a,VContainer:w.a,VRow:y.a});var C={props:{iconName:String,tooltip:String,event:{type:String,default:null},link:String},methods:{emitEvent:function(){this.event&&this.$emit(this.event)}}},S=n(313),z=n(307),k=n(312),P=Object(c.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"whitesmoke",icon:"",large:"",outlined:"",href:t.link},on:{click:function(e){return t.emitEvent()}}},r),[n("v-icon",[t._v(t._s(t.iconName))])],1)]}}])},[t._v(" "),n("span",[t._v(t._s(t.tooltip))])])}),[],!1,null,null,null),E=P.exports;d()(P,{VBtn:S.a,VIcon:z.a,VTooltip:k.a});var _={components:{IconBtn:E},data:function(){return{likes:2500,btns:{restart:{name:"mdi-autorenew",tooltip:"restart",event:"restart"},github:{name:"mdi-github",tooltip:"github",link:"https://github.com/add-harris/2048-game"}}}},methods:{restart:function(){this.remit("restart")},remit:function(t){this.$emit(t)}}},j=n(308),O=Object(c.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",[n("IconBtn",{attrs:{"icon-name":t.btns.restart.name,tooltip:t.btns.restart.tooltip,event:t.btns.restart.event},on:{restart:t.restart}}),t._v(" "),n("v-spacer"),t._v(" "),n("IconBtn",{attrs:{"icon-name":t.btns.github.name,tooltip:t.btns.github.tooltip,link:t.btns.github.link}})],1)],1)}),[],!1,null,null,null),B=O.exports;d()(O,{VContainer:w.a,VRow:y.a,VSpacer:j.a});var T=n(74),V=n(151),A=n.n(V);function F(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function I(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?F(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):F(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var $={components:{Card:f,Score:R,IconBtnBar:B},data:function(){return{count:1,viewPortRatio:1.5,transitionType:"shrink",cards:{},scores:{currentScore:0,bestScore:0}}},computed:I(I({},Object(T.d)({grid:function(t){return t.grid}})),{},{calcHighScore:function(){return this.scores.currentScore>this.scores.bestScore&&(this.scores.bestScore=this.scores.currentScore),this.scores.bestScore}}),mounted:function(){this.setUp(),this.setStartingPos()},methods:I(I(I({},Object(T.b)({getFirstRow:"grid/getFirstRow",getSecondRow:"grid/getSecondRow",getThirdRow:"grid/getThirdRow",getForthRow:"grid/getForthRow",getFirstColumn:"grid/getFirstColumn",getSecondColumn:"grid/getSecondColumn",getThirdColumn:"grid/getThirdColumn",getForthColumn:"grid/getForthColumn",getAll:"grid/getAll",getAllColumns:"grid/getAllColumns",getAllRows:"grid/getAllRows"})),Object(T.c)({setPositionIsEmpty:"grid/setPositionIsEmpty",setPositionRef:"grid/setPositionRef"})),{},{getEmpty:function(t){return t.filter((function(t){return!0===t.isEmpty}))},getRandomEmpty:function(){return A.a.sample(this.getEmpty(this.getAll()))},setUp:function(){this.addListeners(),this.setViewPortRatio()},setViewPortRatio:function(){this.viewPortRatio=window.innerWidth<=520?1:1.5},addListeners:function(){window.addEventListener("keyup",this.checkKeyPress)},checkResize:function(){window.innerWidth<=520&&1.5===this.viewPortRatio&&this.resize(1),window.innerWidth>520&&1===this.viewPortRatio&&this.resize(1.5)},resize:function(t){var e=this;this.setCardTransitions(!1),this.viewPortRatio=t,setTimeout((function(){return e.setCardTransitions(!0)}),400)},setCardTransitions:function(t){for(var e in this.cards)this.$set(this.cards[e],"transitionEnabled",t)},checkKeyPress:function(t){switch(t.key){case"ArrowLeft":this.runSequence("left");break;case"ArrowUp":this.runSequence("up");break;case"ArrowRight":this.runSequence("right");break;case"ArrowDown":this.runSequence("down")}},setStartingPos:function(){this.cardBuilder(this.getRandomEmpty(),2),this.cardBuilder(this.getRandomEmpty(),2),this.cardBuilder(this.getRandomEmpty(),4)},runSequence:function(t){var e=this;this.calculateTransitionType(t),this.calculateMovement(t),setTimeout((function(){return e.calculateMerges(t,e.calculateMovement)}),400)},calculateTransitionType:function(t){switch(t){case"left":case"right":this.transitionType="collapse-x";break;case"up":case"down":this.transitionType="collapse-y"}},calculateMovement:function(t,e){var n=this;this.getRowsByDirection(t).forEach((function(e){e.forEach((function(r){r.isEmpty||n.canMove(r,e,t)&&n.shuffleUp(r,e)}))})),e&&setTimeout((function(){return e()}),100)},getRowsByDirection:function(t){switch(t){case"left":return this.getAllRows();case"right":return this.getAllRows().map((function(t){return t.slice().reverse()}));case"up":return this.getAllColumns();case"down":return this.getAllColumns().map((function(t){return t.slice().reverse()}))}},canMove:function(t,e,n){return!t.edge.includes(n)&&e[e.indexOf(t)-1].isEmpty},shuffleUp:function(t,e){var n=this.getEmpty(e)[0],r=t.ref;this.slide(r,n.top,n.left),this.setPositionIsEmpty({name:t.name,bool:!0}),this.setPositionIsEmpty({name:n.name,bool:!1}),this.setPositionRef({name:t.name,ref:null}),this.setPositionRef({name:n.name,ref:r})},slide:function(t,e,n){this.$set(this.cards[t],"top",e),this.$set(this.cards[t],"left",n)},calculateMerges:function(t,e){var n=this;this.getRowsByDirection(t).reduce((function(e,r){var o=!1;return e.push(r.reduce((function(e,c,l){if(o)return o=!1,e;if(!c.isEmpty&&!c.edge.includes(t)){var d=r[l-1],h=n.cards[c.ref].value,f=n.cards[d.ref].value;h===f&&(e.push({firstPosition:c,secondPosition:d,value:h+f}),o=!0)}return e}),[])),e}),[]).flat().map((function(t){n.mergePositions(t.firstPosition,t.secondPosition,t.value)})),e(t,this.generateCard())},mergePositions:function(t,e,n){this.$delete(this.cards,t.ref),this.$set(this.cards[e.ref],"value",n),this.setPositionIsEmpty({name:t.name,bool:!0}),this.setPositionRef({name:t.name,ref:null}),this.$set(this.scores,"currentScore",this.scores.currentScore+n)},generateCard:function(){var t=this.getRandomEmpty();t&&this.cardBuilder(t,A.a.sample(this.getCardValues()))},cardBuilder:function(t,e){var n="cardRef"+this.count,r={top:t.top,left:t.left,transitionEnabled:!0,zIndex:1,ref:n,value:e};this.$set(this.cards,n,r),this.setPositionIsEmpty({name:t.name,bool:!1}),this.setPositionRef({name:t.name,ref:n}),this.count++},getCardValues:function(){var t=this;return Array.from(Object.keys(this.cards).reduce((function(e,n){return e.add(t.cards[n].value),e}),new Set))},restartGame:function(){var t=this;for(var e in this.transitionType="shrink",this.cards)this.$delete(this.cards,e);this.getAll().forEach((function(e){t.setPositionIsEmpty({name:e.name,bool:!0}),t.setPositionRef({name:e.name,ref:null})})),this.count=0,this.$set(this.scores,"currentScore",0),setTimeout((function(){return t.setStartingPos()}),300)}})},M=(n(298),n(263)),D=n(309),N=n(310),L=n(300),U=n.n(L),G=n(301),W=Object(c.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[n("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[n("v-card",[n("v-card-title",{staticClass:"headline",attrs:{id:"game-title"}},[t._v("2048 GAME")]),t._v(" "),n("Score",{attrs:{"current-score":t.scores.currentScore,"best-score":t.calcHighScore}}),t._v(" "),n("v-touch",{staticClass:"grey-container grey-container-adjust",on:{swipeleft:function(e){return t.runSequence("left")},swiperight:function(e){return t.runSequence("right")},swipeup:function(e){return t.runSequence("up")},swipedown:function(e){return t.runSequence("down")}}},[n("div",{directives:[{name:"resize",rawName:"v-resize",value:t.checkResize,expression:"checkResize"}],ref:"card-grid",staticClass:"grid-background grid-background-adjust"},[n("transition-group",{attrs:{name:t.transitionType}},t._l(t.cards,(function(e,r){return n("Card",{key:e.ref,attrs:{"card-ref":e.ref,"init-top":e.top,"init-left":e.left,"view-port-ratio":t.viewPortRatio,"transition-enabled":e.transitionEnabled,"z-index":e.zIndex,value:e.value}})})),1)],1)]),t._v(" "),n("v-card-actions",[n("IconBtnBar",{on:{restart:function(e){return t.restartGame()}}})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=W.exports;d()(W,{VCard:h.a,VCardActions:M.a,VCardTitle:M.b,VFlex:D.a,VLayout:N.a}),U()(W,{Resize:G.a})}}]);