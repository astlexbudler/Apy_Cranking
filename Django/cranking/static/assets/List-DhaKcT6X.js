import{r,s as h,u as x,j as c,i as L,k as f,bA as v}from"./index-OSHjpEom.js";const P=r.createContext({}),C=s=>{const{classes:e,disablePadding:t,dense:o,subheader:a}=s;return f({root:["root",!t&&"padding",o&&"dense",a&&"subheader"]},v,e)},R=h("ul",{name:"MuiList",slot:"Root",overridesResolver:(s,e)=>{const{ownerState:t}=s;return[e.root,!t.disablePadding&&e.padding,t.dense&&e.dense,t.subheader&&e.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:({ownerState:s})=>!s.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:s})=>s.subheader,style:{paddingTop:0}}]}),w=r.forwardRef(function(e,t){const o=x({props:e,name:"MuiList"}),{children:a,className:d,component:i="ul",dense:n=!1,disablePadding:p=!1,subheader:u,...g}=o,m=r.useMemo(()=>({dense:n}),[n]),l={...o,component:i,dense:n,disablePadding:p},b=C(l);return c.jsx(P.Provider,{value:m,children:c.jsxs(R,{as:i,className:L(b.root,d),ref:t,ownerState:l,...g,children:[u,a]})})});export{w as L,P as a};
