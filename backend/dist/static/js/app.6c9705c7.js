(function(){"use strict";var e={2269:function(e,n,t){var o=t(9963),r=t(6252);function i(e,n){const t=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(t)}var a=t(3744);const u={},c=(0,a.Z)(u,[["render",i]]);var s=c,l=t(2201);const f={class:"home"},d={class:"home_button"},v={class:"home_button"};function p(e,n,t,o,i,a){return(0,r.wg)(),(0,r.iD)("div",f,[(0,r._)("div",d,[(0,r._)("div",{onClick:n[0]||(n[0]=(...e)=>a.moveToCreate&&a.moveToCreate(...e))},"アノテーション作成")]),(0,r._)("div",v,[(0,r._)("div",{onClick:n[1]||(n[1]=(...e)=>a.moveToCreate&&a.moveToCreate(...e))},"アノテーション編集")])])}t(7658);var h={data(){return{}},methods:{moveToCreate(){this.$router.push({path:"/create_annotation"})}}};const m=(0,a.Z)(h,[["render",p],["__scopeId","data-v-4874ae90"]]);var b=m,g=t(3577);const y=(0,r._)("h3",null,"アノテーションを作成",-1),_={class:"form"},k={key:0},w=["disabled"];function C(e,n,t,o,i,a){return(0,r.wg)(),(0,r.iD)("div",null,[y,(0,r._)("section",_,[(0,r._)("input",{type:"file",name:"",id:"",onChange:n[0]||(n[0]=(...e)=>a.onFileChange&&a.onFileChange(...e))},null,32),(0,r._)("button",{onClick:n[1]||(n[1]=(...e)=>a.save&&a.save(...e))},"送信")]),i.annotation_id?((0,r.wg)(),(0,r.iD)("div",k," あなたのアノテーションIDは"+(0,g.zw)(i.annotation_id),1)):(0,r.kq)("",!0),(0,r._)("button",{onClick:n[2]||(n[2]=(...e)=>a.backToHome&&a.backToHome(...e)),disabled:i.isSaving},"メニューへ戻る",8,w)])}var T=t(8433);const O="";var j={data(){return{uploaded_file:null,file:null,isSaving:!1,annotation_id:null}},methods:{async onFileChange(e){let n=e.target.files[0];this.file=n,this.createFile(n)},async createFile(e){var n=new FileReader;n.onload=e=>{this.uploaded_file=e.target.result},n.readAsDataURL(e)},async save(){this.isSaving=!0;const e=new FormData;e.append("file",this.uploaded_file),console.log(e);const n=await T.Z.post(O+"/api/reg_file",e,{headers:{"Content-Type":"multipart/form-data"}});console.info(n.data),this.annotation_id=n.data,this.isSaving=!1},backToHome(){this.$router.push({path:"/"})}}};const F=(0,a.Z)(j,[["render",C]]);var S=F;const P=[{path:"/",name:"home",component:b},{path:"/about",name:"about",component:()=>t.e(443).then(t.bind(t,7381))},{path:"/create_annotation",name:"create",component:S}],D=(0,l.p7)({history:(0,l.PO)("/"),routes:P});var E=D;(0,o.ri)(s).use(E).mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,i){if(!o){var a=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var u=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(t.O).every((function(e){return t.O[e](o[c])}))?o.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(l--,1);var s=r();void 0!==s&&(n=s)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,o){return t.f[o](e,n),n}),[]))}}(),function(){t.u=function(e){return"static/js/about.42022ce7.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="frontend:";t.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==o||f.getAttribute("data-webpack")==n+i){u=f;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+i),u.src=o),e[o]=[r];var d=function(n,t){u.onerror=u.onload=null,clearTimeout(v);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(t)})),n)return n(t)},v=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={143:0};t.f.j=function(n,o){var r=t.o(e,n)?e[n]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(t,o){r=e[n]=[t,o]}));o.push(r[2]=i);var a=t.p+t.u(n),u=new Error,c=function(o){if(t.o(e,n)&&(r=e[n],0!==r&&(e[n]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;u.message="Loading chunk "+n+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}};t.l(a,c,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,i,a=o[0],u=o[1],c=o[2],s=0;if(a.some((function(n){return 0!==e[n]}))){for(r in u)t.o(u,r)&&(t.m[r]=u[r]);if(c)var l=c(t)}for(n&&n(o);s<a.length;s++)i=a[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(l)},o=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(2269)}));o=t.O(o)})();
//# sourceMappingURL=app.6c9705c7.js.map