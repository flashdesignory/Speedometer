!function(){"use strict";var t,e={3143:function(t,e,o){var d=o(7390),l=o(4351),n=o(9407),i=o(1067);history.replaceState=function(t){return null};var r={__name:"App",setup(t){return(t,e)=>((0,l.uX)(),(0,l.Wv)((0,n.R1)(i.Tp)))}};const s={class:"main"},a={class:"toggle-all-container"},u=(0,l.Lk)("label",{class:"toggle-all-label",htmlFor:"toggle-all-input"}," Toggle All Input ",-1),c={class:"todo-list show-priority"};o(1296);const p={class:"header"},m=(0,l.Lk)("h1",null,"todos",-1);var h={name:"TodoHeader",emits:["add-todo"]},g=o(6413);var f=(0,g.A)(h,[["render",function(t,e,o,n,i,r){return(0,l.uX)(),(0,l.CE)("header",p,[m,(0,l.Lk)("input",{type:"text",class:"new-todo",autofocus:"",autocomplete:"off",placeholder:"What needs to be done?",onKeyup:e[0]||(e[0]=(0,d.jR)((e=>{t.$emit("add-todo",e.target.value),e.target.value=""}),["enter"]))},null,32)])}]]),v=o(4538);const T={class:"footer"},b={class:"todo-count"},k={class:"filters"};var y={name:"TodoFooter",props:{todos:Array,remaining:Number,route:String,completed:Number},computed:{pluralizedWord(){return 1===this.remaining?"item":"items"}},emits:["delete-completed"]};var E=(0,g.A)(y,[["render",function(t,e,o,n,i,r){const s=(0,l.g2)("router-link");return(0,l.bo)(((0,l.uX)(),(0,l.CE)("footer",T,[(0,l.Lk)("span",b,[(0,l.Lk)("strong",null,(0,v.v_)(o.remaining),1),(0,l.eW)(" "+(0,v.v_)(r.pluralizedWord)+" left ",1)]),(0,l.Lk)("ul",k,[(0,l.Lk)("li",null,[(0,l.bF)(s,{to:"/",class:(0,v.C4)({selected:"all"==o.route})},{default:(0,l.k6)((()=>[(0,l.eW)("All")])),_:1},8,["class"])]),(0,l.Lk)("li",null,[(0,l.bF)(s,{to:"/active",class:(0,v.C4)({selected:"active"==o.route})},{default:(0,l.k6)((()=>[(0,l.eW)("Active")])),_:1},8,["class"])]),(0,l.Lk)("li",null,[(0,l.bF)(s,{to:"/completed",class:(0,v.C4)({selected:"completed"==o.route})},{default:(0,l.k6)((()=>[(0,l.eW)("Completed")])),_:1},8,["class"])])]),(0,l.bo)((0,l.Lk)("button",{class:"clear-completed",onClick:e[0]||(e[0]=e=>t.$emit("delete-completed"))},"Clear Completed",512),[[d.aG,o.completed]])],512)),[[d.aG,o.todos.length>0]])}]]);const C=["data-priority"],L={class:"input-container"},x=(0,l.Lk)("label",{class:"visually-hidden",for:"edit-todo-input"},"Edit Todo Input",-1);var A={name:"TodoItem",props:{todo:{title:String,completed:Boolean,id:Number},index:Number},data(){return{editText:"",editing:!1}},methods:{startEdit(){this.editing=!0,(0,l.dY)((()=>{this.focusEditInput()}))},finishEdit(){this.editing=!1,0===this.editText.trim().length?this.deleteTodo():this.updateTodo()},cancelEdit(){this.editing=!1},focusEditInput(){this.$refs.editInputRef.focus()},deleteTodo(){this.$emit("delete-todo",this.todo)},updateTodo(){this.$emit("edit-todo",this.todo,this.editText),this.editText=""}},computed:{toggleModel:{get(){return this.todo.completed},set(t){this.$emit("toggle-todo",this.todo,t)}},editModel:{get(){return this.todo.title},set(t){this.editText=t}}},emits:["edit-todo","delete-todo","toggle-todo"]};function _(){let t="";for(let e=0;e<32;e++){let o=16*Math.random()|0;8!==e&&12!==e&&16!==e&&20!==e||(t+="-"),t+=(12===e?4:16===e?3&o|8:o).toString(16)}return t}const w=t=>t.filter((t=>!t.completed)),F=t=>t.filter((t=>t.completed));var M={components:{TodoHeader:f,TodoFooter:E,TodoItem:(0,g.A)(A,[["render",function(t,e,o,n,i,r){return(0,l.uX)(),(0,l.CE)("li",{class:(0,v.C4)({targeted:!0,[`li-${this.index}`]:!0,completed:this.todo.completed,editing:this.editing}),"data-priority":4-this.index%5},[(0,l.Lk)("div",{class:(0,v.C4)({targeted:!0,[`view-${this.index}`]:!0})},[(0,l.bo)((0,l.Lk)("input",{type:"checkbox",class:"toggle","onUpdate:modelValue":e[0]||(e[0]=t=>r.toggleModel=t)},null,512),[[d.lH,r.toggleModel]]),(0,l.Lk)("label",{onDblclick:e[1]||(e[1]=(...t)=>r.startEdit&&r.startEdit(...t))},(0,v.v_)(o.todo.title),33),(0,l.Lk)("button",{class:"destroy",onClick:e[2]||(e[2]=(0,d.D$)(((...t)=>r.deleteTodo&&r.deleteTodo(...t)),["prevent"]))})],2),(0,l.Lk)("div",L,[(0,l.bo)((0,l.Lk)("input",{id:"edit-todo-input",ref:"editInputRef",type:"text",class:"edit","onUpdate:modelValue":e[3]||(e[3]=t=>r.editModel=t),onKeyup:e[4]||(e[4]=(0,d.jR)(((...t)=>r.finishEdit&&r.finishEdit(...t)),["enter"])),onBlur:e[5]||(e[5]=(...t)=>r.cancelEdit&&r.cancelEdit(...t))},null,544),[[d.Jo,r.editModel]]),x])],10,C)}]])},data(){return{todos:[]}},methods:{addTodo(t){this.todos.push({completed:!1,title:t,id:_()})},toggleTodo(t,e){t.completed=e},deleteTodo(t){this.todos=this.todos.filter((e=>e!==t))},editTodo(t,e){t&&(t.title=e)},deleteCompleted(){this.todos=this.activeTodos}},computed:{activeTodos(){return w(this.todos)},completedTodos(){return F(this.todos)},filteredTodos(){switch(this.$route.name){case"active":return this.activeTodos;case"completed":return this.completedTodos}return this.todos},route(){return this.$route.name},toggleAllModel:{get(){return 0===this.activeTodos.length},set(t){this.todos.forEach((e=>{e.completed=t}))}}}};var O=(0,g.A)(M,[["render",function(t,e,o,n,i,r){const p=(0,l.g2)("TodoHeader"),m=(0,l.g2)("TodoItem"),h=(0,l.g2)("TodoFooter");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.bF)(p,{onAddTodo:r.addTodo},null,8,["onAddTodo"]),(0,l.bo)((0,l.Lk)("main",s,[(0,l.Lk)("div",a,[(0,l.bo)((0,l.Lk)("input",{type:"checkbox",id:"toggle-all-input",class:"toggle-all","onUpdate:modelValue":e[0]||(e[0]=t=>r.toggleAllModel=t)},null,512),[[d.lH,r.toggleAllModel]]),u]),(0,l.Lk)("ul",c,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(r.filteredTodos,((t,e)=>((0,l.uX)(),(0,l.Wv)(m,{key:t.id,todo:t,index:e,onDeleteTodo:r.deleteTodo,onEditTodo:r.editTodo,onToggleTodo:r.toggleTodo},null,8,["todo","index","onDeleteTodo","onEditTodo","onToggleTodo"])))),128))])],512),[[d.aG,i.todos.length]]),(0,l.bF)(h,{todos:i.todos,onDeleteCompleted:r.deleteCompleted,remaining:r.activeTodos.length,completed:r.completedTodos.length,route:r.route},null,8,["todos","onDeleteCompleted","remaining","completed","route"])],64)}]]);var $={__name:"TodoView",setup(t){return(t,e)=>((0,l.uX)(),(0,l.Wv)(O))}};var I=(0,i.aE)({history:(0,i.Bt)(),routes:[{path:"/",name:"all",component:$},{path:"/active",name:"active",component:$},{path:"/completed",name:"completed",component:$}]});const W=(0,d.Ef)(r);W.use(I),W.mount(".todoapp")}},o={};function d(t){var l=o[t];if(void 0!==l)return l.exports;var n=o[t]={exports:{}};return e[t].call(n.exports,n,n.exports,d),n.exports}d.m=e,t=[],d.O=function(e,o,l,n){if(!o){var i=1/0;for(u=0;u<t.length;u++){o=t[u][0],l=t[u][1],n=t[u][2];for(var r=!0,s=0;s<o.length;s++)(!1&n||i>=n)&&Object.keys(d.O).every((function(t){return d.O[t](o[s])}))?o.splice(s--,1):(r=!1,n<i&&(i=n));if(r){t.splice(u--,1);var a=l();void 0!==a&&(e=a)}}return e}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[o,l,n]},d.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return d.d(e,{a:e}),e},d.d=function(t,e){for(var o in e)d.o(e,o)&&!d.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),d.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={524:0};d.O.j=function(e){return 0===t[e]};var e=function(e,o){var l,n,i=o[0],r=o[1],s=o[2],a=0;if(i.some((function(e){return 0!==t[e]}))){for(l in r)d.o(r,l)&&(d.m[l]=r[l]);if(s)var u=s(d)}for(e&&e(o);a<i.length;a++)n=i[a],d.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return d.O(u)},o=self.webpackChunktodomvc_vue=self.webpackChunktodomvc_vue||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var l=d.O(void 0,[504],(function(){return d(3143)}));l=d.O(l)}();
//# sourceMappingURL=app.1672b27e.js.map