(this.webpackJsonpcms=this.webpackJsonpcms||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(18),a=n(10),s=(n(28),n(29),n(19)),o=n(20),u=n(23),i=n(22),l=n(4),p=(n(30),n(13)),j=n(0),b=function(e){var t=e.location,n=e.handleClick,r=e.label,c=e.className,s=e.children;return Object(j.jsx)(a.b,{to:t,children:Object(j.jsx)("button",{className:c,onClick:n,label:r,variant:"raised",children:s})})},d=function(e){var t=e.props;return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Content Manager"}),Object(j.jsxs)("div",{children:[Object(j.jsx)(b,Object(p.a)({className:"home-button",location:"./content/all",label:"all-content",handleClick:t,children:"All Content"},"children","All Content")),Object(j.jsx)(b,Object(p.a)({className:"home-button",location:"./content/",label:"add-content",handleClick:t,children:"Add Content"},"children","Add Content")),Object(j.jsx)(b,Object(p.a)({className:"home-button",location:"./users/all",label:"all-users",handleClick:t,children:"All Users"},"children","All Users")),Object(j.jsx)(b,Object(p.a)({className:"home-button",location:"./users/",label:"add-users",handleClick:t,children:"Add User"},"children","Add User"))]})]})},h=n(2),f=n.n(h),x=n(3),O=n(6),m=function(e){var t=e.props;return Object(j.jsx)("div",{children:Object(j.jsx)(a.b,{to:"/",children:Object(j.jsx)("button",{onClick:t,className:"add-button",alt:"home-icon",children:"Home"})})})},v=function(){var e=Object(r.useState)(""),t=Object(O.a)(e,2),n=t[0],c=t[1];function a(){return s.apply(this,arguments)}function s(){return(s=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"/content/",e.next=4,fetch("/content/");case 4:return t=e.sent,e.next=7,t.json();case 7:return n=e.sent,e.abrupt("return",n);case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function o(){return(o=Object(x.a)(f.a.mark((function e(t){var n,r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="/content/",e.next=4,fetch(n+t,{method:"DELETE",header:{Accept:"application/json","Content-Type":"application/json"}});case 4:return e.sent,e.next=7,fetch(n);case 7:return r=e.sent,e.next=10,r.json();case 10:a=e.sent,c(a),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0.message);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){function e(){return(e=Object(x.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(j.jsxs)("div",{className:"Header",children:["Content View",Object(j.jsx)("br",{}),Object(j.jsx)("div",{className:"body-text",children:void 0===n||0===n.length?"No Content":Object(j.jsx)("ul",{children:n.map((function(e){return Object(j.jsxs)("li",{children:["Title: ",e.title,Object(j.jsx)("br",{}),"Content: ",e.content,Object(j.jsx)("br",{}),"Data Created: ",e.date_created.toString().slice(0,10),Object(j.jsx)("br",{}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return function(e){return o.apply(this,arguments)}(e.content_id)},children:"Delete Content "})]},e.content_id)}))})}),Object(j.jsx)(m,{})]})},y=function(){var e=Object(r.useState)([]),t=Object(O.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(1),s=Object(O.a)(a,2),o=s[0],u=s[1],i=Object(r.useState)(null),l=Object(O.a)(i,2),p=l[0],b=l[1],d=Object(r.useState)(null),h=Object(O.a)(d,2),v=h[0],y=h[1],w=Object(r.useState)(null),C=Object(O.a)(w,2),k=C[0],N=C[1];function g(){return E.apply(this,arguments)}function E(){return(E=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/content/");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",void 0===n||0===n.length?0:n);case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function S(){return U.apply(this,arguments)}function U(){return(U=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:return t=e.sent,n=t.map((function(e){return e.content_id})).sort((function(e,t){return e-t})),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){return A.apply(this,arguments)}function A(){return(A=Object(x.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:n=e.sent,"next"===t&&o<=n.length-2&&u(o+1),"previous"===t&&o>0&&u(o-1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return _.apply(this,arguments)}function _(){return(_=Object(x.a)(f.a.mark((function e(t){var n,r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:return n=e.sent,T(t),e.next=6,fetch("/content/"+[n[o]]);case 6:return r=e.sent,e.next=9,r.json();case 9:a=e.sent,c(a);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(){return(H=Object(x.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/content/"+k,{method:"DELETE",header:{Accept:"application/json","Content-Type":"application/json"}});case 2:return e.sent,e.next=5,J();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(x.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/content/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:p,content:v,date_created:"NOW()"})});case 2:e.sent,J();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(){return L.apply(this,arguments)}function L(){return(L=Object(x.a)(f.a.mark((function e(){var t,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:return t=e.sent,e.next=5,fetch("/content/"+[t[o]]);case 5:return n=e.sent,e.next=8,n.json();case 8:r=e.sent,c(r);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){function e(){return(e=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:return t=e.sent,e.next=5,S();case 5:n=e.sent,c(t[0]),N(n[0]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var V=function(e){var t=e.target.name,n=e.target.value;"title"===t&&b(n),"content"===t&&y(n)};return Object(j.jsxs)("div",{className:"Header",children:[" Content View",Object(j.jsxs)("div",{className:"body-text",children:["Title: ",void 0===n||0===n.length?"-":n.title,Object(j.jsx)("br",{}),"Content: ",void 0===n||0===n.length?"-":n.content,Object(j.jsx)("br",{}),"Date Created: ",void 0===n||0===n.length?"-":n.date_created,Object(j.jsx)("br",{}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return D("previous")},children:"Previous Content "}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return D("next")},children:"Next Content "}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return function(){return H.apply(this,arguments)}()},children:"Delete Content "}),Object(j.jsxs)("div",{className:"body-text",children:["Add content",Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),alert("You are submitting "+p),function(){P.apply(this,arguments)}()},children:[Object(j.jsx)("p",{children:"Enter Content Title:"}),Object(j.jsx)("textarea",{name:"title",onChange:V,style:{width:"250px"}}),Object(j.jsx)("p",{children:"Enter Content Body:"}),Object(j.jsx)("textarea",{name:"content",onChange:V,style:{width:"250px",height:"80px"}}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("input",{type:"submit","data-testid":"Submit",className:"add-button"})]})]})]}),Object(j.jsx)(m,{})]})},w=function(){var e=Object(r.useState)([]),t=Object(O.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(1),s=Object(O.a)(a,2),o=s[0],u=s[1],i=Object(r.useState)(null),l=Object(O.a)(i,2),p=l[0],b=l[1],d=Object(r.useState)(null),h=Object(O.a)(d,2),v=h[0],y=h[1],w=Object(r.useState)(null),C=Object(O.a)(w,2),k=C[0],N=C[1],g=Object(r.useState)(null),E=Object(O.a)(g,2),S=E[0],U=E[1];function T(){return A.apply(this,arguments)}function A(){return(A=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/users/");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function D(){return _.apply(this,arguments)}function _(){return(_=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:return t=e.sent,n=t.map((function(e){return e.user_id})).sort((function(e,t){return e-t})),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e){return P.apply(this,arguments)}function P(){return(P=Object(x.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:if(n=e.sent,!("next"===t&&o<=n.length-2)){e.next=6;break}return e.next=6,u(o+1);case 6:if(!("previous"===t&&o>0)){e.next=9;break}return e.next=9,u(o-1);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e){return L.apply(this,arguments)}function L(){return(L=Object(x.a)(f.a.mark((function e(t){var n,r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:return n=e.sent,H(t),e.next=6,fetch("/users/"+[n[o]]);case 6:return r=e.sent,e.next=9,r.json();case 9:a=e.sent,c(a);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return(V=Object(x.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/users/"+S,{method:"DELETE",header:{Accept:"application/json","Content-Type":"application/json"}});case 2:return e.sent,e.next=5,B();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(){return(R=Object(x.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/users/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:p,password:v,role:k,date_created:"NOW()"})});case 2:e.sent,B();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return W.apply(this,arguments)}function W(){return(W=Object(x.a)(f.a.mark((function e(){var t,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:return t=e.sent,e.next=5,fetch("/users/"+[t[o]]);case 5:return n=e.sent,e.next=8,n.json();case 8:r=e.sent,c(r);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){function e(){return(e=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:return t=e.sent,e.next=5,D();case 5:n=e.sent,c(t[0]),U(n[0]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var Y=function(e){var t=e.target.name,n=e.target.value;"email"===t&&b(n),"password"===t&&y(n),"role"===t&&N(n)};return Object(j.jsxs)("div",{className:"Header",children:[" User View",Object(j.jsxs)("div",{className:"body-text",children:["User Email: ",void 0===n||0===n.length?"-":n.email,Object(j.jsx)("br",{}),"User Role: ",void 0===n||0===n.length?"-":n.role,Object(j.jsx)("br",{}),"Date Created: ",void 0===n||0===n.length?"-":n.date_created,Object(j.jsx)("br",{}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return J("previous")},children:"Previous User "}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return J("next")},children:"Next User "}),Object(j.jsx)("button",{className:"add-button",onClick:function(){return function(){return V.apply(this,arguments)}()},children:"Delete User "}),Object(j.jsxs)("div",{className:"body-text",children:["Add User",Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),alert("You have added new user:"+p),function(){R.apply(this,arguments)}()},children:[Object(j.jsx)("p",{children:"Enter User Email:"}),Object(j.jsx)("textarea",{name:"email",onChange:Y,style:{width:"200px"}}),Object(j.jsx)("p",{children:"Enter User Password:"}),Object(j.jsx)("input",{name:"password",type:"password",onChange:Y,style:{width:"200px"}}),Object(j.jsx)("p",{children:"Enter User Role:"}),Object(j.jsx)("textarea",{name:"role",onChange:Y,style:{width:"200px"}}),Object(j.jsx)("br",{}),Object(j.jsx)("input",{type:"submit","data-testid":"Submit",className:"add-button"})]})]})]}),Object(j.jsx)(m,{})]})},C=function(){var e=Object(r.useState)(""),t=Object(O.a)(e,2),n=t[0],c=t[1];function a(){return s.apply(this,arguments)}function s(){return(s=Object(x.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"/users/",e.next=4,fetch("/users/");case 4:return t=e.sent,e.next=7,t.json();case 7:return n=e.sent,e.abrupt("return",n);case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function o(){return(o=Object(x.a)(f.a.mark((function e(t){var n,r,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="/users/",e.next=4,fetch(n+t,{method:"DELETE",header:{Accept:"application/json","Content-Type":"application/json"}});case 4:return e.sent,e.next=7,fetch(n);case 7:return r=e.sent,e.next=10,r.json();case 10:a=e.sent,c(a),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0.message);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){function e(){return(e=Object(x.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(j.jsxs)("div",{className:"Header",children:["User View",Object(j.jsx)("br",{}),Object(j.jsx)("div",{className:"body-text",children:void 0===n||0===n.length?"No Users":Object(j.jsx)("ul",{children:n.map((function(e){return Object(j.jsxs)("li",{children:["User email: ",e.email,Object(j.jsx)("br",{}),"User Role: ",e.role,Object(j.jsx)("br",{}),"Date Created: ",e.date_created.toString().slice(0,10),Object(j.jsx)("button",{className:"add-button",onClick:function(){return function(e){return o.apply(this,arguments)}(e.user_id)},children:"Delete User "})]},e.user_id)}))})}),Object(j.jsx)(m,{})]})},k=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=function(){return Object(j.jsx)("div",{children:Object(j.jsxs)(l.c,{children:[Object(j.jsx)(l.a,{exact:!0,path:"/",component:d}),Object(j.jsx)(l.a,{path:"/content/all",component:v}),Object(j.jsx)(l.a,{path:"/content/",component:y}),Object(j.jsx)(l.a,{path:"/users/all",component:C}),Object(j.jsx)(l.a,{path:"/users/",component:w})]})})};return Object(j.jsx)(l.c,{children:Object(j.jsx)(e,{})})}}]),n}(r.Component);Object(c.render)(Object(j.jsx)(a.a,{children:Object(j.jsx)(k,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.28064371.chunk.js.map