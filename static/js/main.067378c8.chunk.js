(this.webpackJsonpgrantcalc=this.webpackJsonpgrantcalc||[]).push([[0],{144:function(e,t,a){e.exports={content:"BudgetPage_content__2lFbs",pageTitle:"BudgetPage_pageTitle__3pfXV"}},148:function(e,t,a){e.exports={content:"BudgetInfo_content__27obA",pageTitle:"BudgetInfo_pageTitle__VDZRj"}},149:function(e,t,a){e.exports={row:"Main_row__O0Ybk",col:"Main_col__3wFmk"}},153:function(e,t){},170:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},172:function(e,t,a){e.exports={stepsParent:"BudgetSteps_stepsParent__CZ_V4"}},212:function(e,t,a){e.exports=a(370)},217:function(e,t,a){},218:function(e,t,a){},223:function(e,t){},224:function(e,t){},369:function(e){e.exports=JSON.parse('{"info":{"name":"","project":"","division":"","start":null,"end":null,"grant":null,"contact":"","phone":"","faoff":"","faon":"","gross":"","ftfringe":"","ptfringe":"","raise":""},"pages":[{"title":"labor","label":"Labor","items":[{"key":"a","name":"Full Time Personnel","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"b","name":"Part Time Personnel","children":[],"quantity":null,"rate":null,"header":true,"childCount":0}],"comments":""},{"title":"equip","label":"Equiptment and Supplies","items":[{"key":"a","name":"Capital Equipment >5k","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"b","name":"Non-Capital Equipment <5k","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"c","name":"Consumable Materials and Supplies","children":[],"quantity":null,"rate":null,"header":true,"childCount":0}],"comments":""},{"title":"consult","label":"Consultants","items":[{"key":"a","name":"Consultants","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"b","name":"Subcontracts < $25K","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"c","name":"Subcontracts > 25K","children":[],"quantity":null,"rate":null,"header":true,"childCount":0}],"comments":""},{"title":"expenses","label":"Non-Personnel Expenses","items":[{"key":"a","name":"Major Operating Expenses","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"b","name":"Travel, Meals, Meetings and Registration","children":[],"quantity":null,"rate":null,"header":true,"childCount":0}],"comments":""},{"title":"overhead","label":"Overhead","items":[{"key":"a","name":"Rent","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"b","name":"Utilities","children":[],"quantity":null,"rate":null,"header":true,"childCount":0},{"key":"c","name":"Insurance","children":[],"quantity":null,"rate":null,"header":true,"childCount":0}],"comments":""}]}')},370:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(30),o=a.n(l),c=(a(217),a(51)),i=a(41),u=a(93),s=a(170),m=a.n(s),p=(a(218),a(42)),d=a(171),f=a(80),h=function(e){var t=e.csvData,a=e.fileName,n=function(e){var t=[];return e.forEach((function(e){var a=l(e,!0),n=Object(c.a)(a,2),r=n[0],o=n[1];o.push({pagename:"Total ".concat(e.label),total:r}),t.push({sheetName:e.label,sheetData:o})})),t},l=function(e,t){var a=0,n=[];return e.items.forEach((function(e){var r,l;(r=t?{pagename:"Total ".concat(e.name)}:{pagename:e.name}).quantity=0,r.rate=0,r.total=0,e.children.forEach((function(e){l={pagename:e.name,quantity:e.quantity,rate:e.rate,total:Number.parseInt(e.quantity)*Number.parseFloat(e.rate)},r.quantity+=Number.parseInt(e.quantity),r.rate+=Number.parseFloat(e.rate),r.total+=l.total})),e.children.length>0&&(r.rate=r.rate/e.children.length),a+=r.total,t&&void 0!==l&&n.push([],l),n.push(r)})),[a,n]},o=function(e){var t=[[]],a=0,n=0;return e.pages.forEach((function(e){t.push([],{pagename:e.label});var r=l(e,!1),o=Object(c.a)(r,2),i=o[0],u=o[1];(t=t.concat(u)).push({pagename:"Total ".concat(e.label),total:i.toFixed(2)}),t.push([]),a+=i,"overhead"!==e.title&&(n+=i)})),t.push([],{pagename:"Total Estimated - Before Margin",total:a.toFixed(2)},{pagename:"Direct Costs (Budget Use Only)",total:n.toFixed(2)},{pagename:"Gross Margin (Market Based)",total:(e.info.gross*a).toFixed(2)},[],{pagename:"Total Estimated Price",total:(e.info.gross*a+a).toFixed(2)}),t};return r.a.createElement(p.a,{type:"primary",onClick:function(e){return function(e,t){var a=o(e),r=f.utils.json_to_sheet(a),l=f.utils.book_new();f.utils.book_append_sheet(l,r,"Overview");var c=Math.ceil((e.info.end-e.info.start)/31557600);console.log(c),n(e.pages).forEach((function(e){var t=e.sheetName,a=e.sheetData,n=f.utils.json_to_sheet(a);f.utils.book_append_sheet(l,n,t)})),l.Custprops={Vendor:e.info.name,Project:e.info.project,Division:e.info.division,"Start Date":e.info.start,"End Date":e.info.end,Grant:e.info.grant,Phone:e.info.phone};var i=f.write(l,{bookType:"xlsx",type:"array",Props:{Author:e.info.contact,CreatedDate:Date.now().toString()}}),u=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});d.saveAs(u,t+".xlsx")}(t,a)}},"Export")},g=a(380),E=a(384),b=a(385),y=a(386),v=a(387),C=a(388),x=a(389),j=a(172),S=a.n(j),O=g.a.Step;function D(e){return r.a.createElement(g.a,{direction:"vertical",current:e.page,onChange:e.onChange,className:S.a.stepsParent},r.a.createElement(O,{title:"Information",icon:r.a.createElement(E.a,null)}),r.a.createElement(O,{title:"Labor",icon:r.a.createElement(b.a,null)}),r.a.createElement(O,{title:"Equiptment and Supplies",icon:r.a.createElement(y.a,null)}),r.a.createElement(O,{title:"Consultants",icon:r.a.createElement(v.a,null)}),r.a.createElement(O,{title:"Non-Personnel Expenses",icon:r.a.createElement(C.a,null)}),r.a.createElement(O,{title:"Overhead",icon:r.a.createElement(x.a,null)}))}var k=a(173),N=a(174),I=a(208),w=a(203),F=a(72),P=a.n(F),T=a(100),q=a(112),B=a(150),_=a(144),A=a.n(_),U=a(379),R=a(381),M=a(378),V=a(382),G=a(383),W=a(376),Y=U.a.Title,J=U.a.Text,L=R.a.TextArea,K=r.a.createContext(),Z=function(e){e.index;var t=Object(B.a)(e,["index"]),a=M.a.useForm(),n=Object(c.a)(a,1)[0];return r.a.createElement(M.a,{form:n,component:!1},r.a.createElement(K.Provider,{value:n},r.a.createElement("tr",t)))},$=function(e){var t=e.title,a=e.editable,l=e.children,o=e.dataIndex,u=e.record,s=e.handleSave,m=e.inputType,p=Object(B.a)(e,["title","editable","children","dataIndex","record","handleSave","inputType"]),d=Object(n.useState)(!1),f=Object(c.a)(d,2),h=f[0],g=f[1],E=Object(n.useRef)(),b=Object(n.useContext)(K);Object(n.useEffect)((function(){h&&E.current.focus()}),[h]);var y=function(){g(!h),b.setFieldsValue(Object(q.a)({},o,u[o]))},v=function(){var e=Object(T.a)(P.a.mark((function e(t){var a;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.validateFields();case 3:a=e.sent,y(),s(Object(i.a)(Object(i.a)({},u),a)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Save failed:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),C=l;if(a&&(!u.header||u.edit&&"name"===o))C=h?r.a.createElement(M.a.Item,{style:{margin:0},name:o,rules:[{required:!0,message:"".concat(t," is required.")}]},"number"===m?r.a.createElement(V.a,{ref:E,onPressEnter:v,onBlur:v}):r.a.createElement(R.a,{ref:E,onPressEnter:v,onBlur:v})):r.a.createElement("div",{className:"editable-cell-value-wrap",style:{paddingRight:24},onClick:y},"rate"===o?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(Number.parseFloat(l[1])):l);else if(u&&u.header&&u.children.length>0&&"rate"===o){var x=u.children.map((function(e){return Number.parseFloat(e[o])})).reduce((function(e,t){return e+t}));C=r.a.createElement(J,{strong:!0},new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(x/u.children.length))}else if(u&&u.header&&u.children.length>0&&("quantity"===o||"total"===o)){var j=u.children.map((function(e){return Number.parseFloat(e[o])})).reduce((function(e,t){return e+t}));C=r.a.createElement(J,{strong:!0},j)}return r.a.createElement("td",p,C)},z=function(e){Object(I.a)(a,e);var t=Object(w.a)(a);function a(e){var n;Object(k.a)(this,a),(n=t.call(this,e)).handleDelete=function(e){var t=n.props.pageData.items,a=t.findIndex((function(t){return t.key===e.charAt(0)}));e.length>1?t[a].children=t[a].children.filter((function(t){return t.key!==e})):t=t.filter((function(t){return t.key!==e})),n.props.dispatch({type:"page",step:n.props.step,pageData:t})},n.handleAdd=function(){var e=n.props.pageData,t=e.items.length+1,a={key:String.fromCharCode(96+t),name:"".concat(e.label," Item ").concat(t),quantity:null,rate:null,header:!0,edit:!0,childCount:0,children:[]};n.props.dispatch({type:"page",step:n.props.step,pageData:[].concat(Object(u.a)(e.items),[a])})},n.handleAddChild=function(e){var t=n.props.pageData.items,a=t.findIndex((function(t){return t.key===e}));if(!(a<0)){var r=t[a].childCount+1;t[a].childCount=r,t[a].children.push({key:e+r,name:"Item ".concat(r),quantity:0,rate:0,header:!1}),n.props.dispatch({type:"page",step:n.props.step,pageData:t})}},n.handleSave=function(e){var t=Object(u.a)(n.props.pageData.items),a=t.findIndex((function(t){return e.key.charAt(0)===t.key})),r=t[a];if(void 0!==e.header&&e.header)t.splice(a,1,Object(i.a)(Object(i.a)({},r),e));else{var l=t[a].children.findIndex((function(t){return e.key===t.key})),o=t[a].children[l];t[a].children.splice(l,1,Object(i.a)(Object(i.a)({},o),e))}n.props.dispatch({type:"page",step:n.props.step,pageData:t})},n.handleComment=Object(T.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),n.addWrapper=r.a.createRef();var l=n.props.pageData.items[0],o=Object.keys(l).filter((function(e){return"key"!==e&&"children"!==e&&"header"!==e&&"childCount"!==e}));return n.columns=o.map((function(e){return{title:(t=e,t.charAt(0).toUpperCase()+t.slice(1)),dataIndex:e,inputType:"name"===e?"text":"number",editable:!0,key:e};var t})),n.columns.push({title:"Total",dataIndex:"total",render:function(e,t){if(t.header){var a=t.children.map((function(e){return isNaN(Number.parseInt(e.quantity))||isNaN(Number.parseFloat(e.rate))?0:Number.parseInt(e.quantity)*Number.parseFloat(e.rate)})).reduce((function(e,t){return e+t}),0);return r.a.createElement(J,{strong:!0},new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a))}var n=Number.parseInt(t.quantity)*Number.parseFloat(t.rate);return isNaN(n)&&(n=0),new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n)}},{title:"operation",dataIndex:"operation",render:function(e,t){return n.props.pageData.items.length>=1?r.a.createElement(r.a.Fragment,null,t.header?r.a.createElement(p.a,{type:"link",onClick:function(){return n.handleAddChild(t.key)}},"Add"):r.a.createElement(G.a,{title:"Sure to delete?",onConfirm:function(){return n.handleDelete(t.key)}},r.a.createElement(p.a,{type:"link"},"Delete")),void 0!==t.edit&&t.edit&&r.a.createElement(G.a,{title:"Sure to delete?",onConfirm:function(){return n.handleDelete(t.key)}},r.a.createElement(p.a,{type:"link"},"Delete"))):null}}),n}return Object(N.a)(a,[{key:"render",value:function(){var e=this,t=this.props.pageData,a={body:{row:Z,cell:$}},n=this.columns.map((function(t){return t.editable?Object(i.a)(Object(i.a)({},t),{},{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,inputType:t.inputType,handleSave:e.handleSave}}}):t}));return r.a.createElement("div",{className:A.a.content},r.a.createElement(Y,{className:A.a.pageTitle},this.props.pageData.label),r.a.createElement(p.a,{onClick:this.handleAdd,type:"primary",style:{marginTop:24,marginBottom:16},ref:this.addWrapper},"Add a Section"),r.a.createElement(W.a,{components:a,rowClassName:function(){return"editable-row"},bordered:!0,dataSource:t.items,columns:n,expandable:{expandRowByClick:!0},pagination:{hideOnSinglePage:!0},summary:function(t){var a=t.map((function(e){return e.children.map((function(e){return Number.parseInt(e.quantity)*Number.parseFloat(e.rate)})).reduce((function(e,t){return e+t}),0)})),n=a.reduce((function(e,t){return e+t}),0),l=e.props.info.ftfringe||0,o=e.props.info.ptfringe||0;return"Full Time Personnel"===t[0].name&&(n+=a[0]*(l/100)+a[1]*(o/100)),r.a.createElement(r.a.Fragment,null,"Full Time Personnel"===t[0].name&&r.a.createElement(r.a.Fragment,null,r.a.createElement(W.a.Summary.Row,null,r.a.createElement(W.a.Summary.Cell,{colSpan:2},r.a.createElement(J,null,"Composite Fringes - FT")),r.a.createElement(W.a.Summary.Cell,null,l,"%"),r.a.createElement(W.a.Summary.Cell,null,r.a.createElement(J,{style:{fontWeight:"bold"}},new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a[0]*(l/100))))),r.a.createElement(W.a.Summary.Row,null,r.a.createElement(W.a.Summary.Cell,{colSpan:2},r.a.createElement(J,null,"Composite Fringes - PT")),r.a.createElement(W.a.Summary.Cell,null,o,"%"),r.a.createElement(W.a.Summary.Cell,null,r.a.createElement(J,{style:{fontWeight:"bold"}},new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a[1]*(o/100)))))),r.a.createElement(W.a.Summary.Row,null,r.a.createElement(W.a.Summary.Cell,{colSpan:3},"Total"),r.a.createElement(W.a.Summary.Cell,null,r.a.createElement(J,{style:{fontWeight:"bolder"}},new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n)))))}}),r.a.createElement(M.a.Item,{style:{margin:"2rem"},label:"Comments"},r.a.createElement(L,{value:this.props.pageData.comments,onChange:function(t){e.props.dispatch({type:"comment",comment:t.target.value,step:e.props.step})}})))}}]),a}(n.Component),H=a(148),X=a.n(H),Q=a(377),ee=a(127),te=a(372),ae=a(373),ne=a(59),re=a.n(ne),le=U.a.Title,oe=Q.a.RangePicker,ce={labelCol:{xs:16,sm:14,md:12,lg:8,xl:6,xxl:4},wrapperCol:{span:16}},ie=function(e){return"".concat(e,"%")};function ue(e){var t=function(){var t=Object(T.a)(P.a.mark((function t(){var a;return P.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.form.validateFields();case 2:a=t.sent,e.dispatch({type:"info",payload:a});case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:X.a.content},r.a.createElement(le,{className:X.a.pageTitle},"Information"),r.a.createElement(M.a,Object.assign({form:e.form},ce,{initialValues:{name:e.infoData.name,project:e.infoData.project,division:e.infoData.division,range:e.infoData.start&&e.infoData.end?[re.a.unix(e.infoData.start),re.a.unix(e.infoData.end)]:null,grant:e.infoData.grant,contact:e.infoData.contact,phone:e.infoData.phone,faoff:e.infoData.faoff,faon:e.infoData.faon,gross:e.infoData.gross,ftfringe:e.infoData.ftfringe,ptfringe:e.infoData.ptfringe,raise:e.infoData.raise}}),r.a.createElement(M.a.Item,{name:"name",label:"Vendor/Contractor Name"},r.a.createElement(R.a,{onPressEnter:t,onBlur:t})),r.a.createElement(M.a.Item,{name:"project",label:"Project Name"},r.a.createElement(R.a,{onPressEnter:t,onBlur:t})),r.a.createElement(M.a.Item,{name:"division",label:"Division Name"},r.a.createElement(R.a,{onPressEnter:t,onBlur:t})),r.a.createElement(M.a.Item,{name:"range",label:"Project Period"},r.a.createElement(oe,{onChange:t,format:"MM/DD/YYYY"})),r.a.createElement(M.a.Item,{name:"grant",label:"Grant or Non-Grant"},r.a.createElement(ee.default.Group,null,r.a.createElement(ee.default.Button,{value:!0},"Grant"),r.a.createElement(ee.default.Button,{value:!1},"Non Grant"))),r.a.createElement(M.a.Item,{name:"contact",label:"Contact Name"},r.a.createElement(R.a,{onPressEnter:t,onBlur:t})),r.a.createElement(M.a.Item,{name:"phone",label:"Phone Number"},r.a.createElement(R.a,{type:"tel",onPressEnter:t,onBlur:t})),r.a.createElement(te.a,null,r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"faoff",label:"F&A Rate Off-Site",labelCol:{span:14}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0}))),r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"faon",label:"F&A Rate On-Site",labelCol:{span:14}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0}))),r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"gross",label:"Gross Margin",labelCol:{span:14}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0})))),r.a.createElement(te.a,null,r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"ftfringe",label:"Composite Fringes - FT",labelCol:{span:15}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0,max:100}))),r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"ptfringe",label:"Composite Fringes - PT",labelCol:{span:15}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0,max:100}))),r.a.createElement(ae.a,{span:8},r.a.createElement(M.a.Item,{name:"raise",label:"Yearly Wage Raise",labelCol:{span:15}},r.a.createElement(V.a,{formatter:ie,onPressEnter:t,onBlur:t,min:0,max:100}))))))}var se=a(149),me=a.n(se),pe=a(374),de=a(375),fe=pe.a.Content;function he(e){return r.a.createElement(fe,null,r.a.createElement(te.a,{className:me.a.row},r.a.createElement(ae.a,{span:5,pull:5,className:me.a.col},r.a.createElement(D,{onChange:e.onChange,page:e.step}),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(de.a,{align:"center",style:{marginBottom:"3rem"}},r.a.createElement(h,{csvData:e.data,fileName:"Pricing and Budget"}),r.a.createElement(G.a,{title:"Sure to reset?",onConfirm:function(){return e.dispatch({type:"reset"})}},r.a.createElement(p.a,{type:"ghost"},"Reset"))))),r.a.createElement(ae.a,{span:19,push:5},0===e.step?r.a.createElement(ue,{dispatch:e.dispatch,infoData:e.data.info,form:e.form}):r.a.createElement(z,{pageData:e.data.pages[e.step-1],info:e.data.info,step:e.step-1,dispatch:e.dispatch}))))}var ge=pe.a.Header,Ee=a(369);function be(e,t){switch(t.type){case"page":var a=Object(u.a)(e.pages);return a[t.step].items=t.pageData,Object(i.a)(Object(i.a)({},e),{},{pages:a});case"comment":var n=Object(u.a)(e.pages);return n[t.step].comments=t.comment,Object(i.a)(Object(i.a)({},e),{},{pages:n});case"info":for(var r=e.info,l=0,o=Object.entries(t.payload);l<o.length;l++){var s=Object(c.a)(o[l],2),m=s[0],p=s[1];if(void 0!==p&&null!==p)if("range"===m){var d=Object(c.a)(p,2),f=d[0],h=d[1];r.start=f.unix(),r.end=h.unix()}else r[m]=p}return Object(i.a)(Object(i.a)({},e),{},{info:r});case"reset":return Ee;default:throw new Error("Action of unknown type.")}}var ye=function(){var e=M.a.useForm(),t=Object(c.a)(e,1)[0],a=Object(n.useState)(0),l=Object(c.a)(a,2),o=l[0],i=l[1],u=JSON.parse(localStorage.getItem("VLProjectBudget"))||Ee,s=Object(n.useReducer)(be,u||Ee),p=Object(c.a)(s,2),d=p[0],f=p[1];return Object(n.useEffect)((function(){t.setFieldsValue(d.info),localStorage.setItem("VLProjectBudget",JSON.stringify(d))}),[d,t]),d.info&&d.pages||f({type:"reset"}),r.a.createElement(pe.a,null,r.a.createElement(ge,{style:{position:"fixed",zIndex:2,width:"100%",textAlign:"center"}},r.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"})),r.a.createElement(pe.a,null,r.a.createElement(he,{form:t,step:o,data:d,dispatch:f,onChange:function(e){return i(e)}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[212,1,2]]]);
//# sourceMappingURL=main.067378c8.chunk.js.map