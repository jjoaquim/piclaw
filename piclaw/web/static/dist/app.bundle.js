var E8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,Z)=>(typeof require<"u"?require:$)[Z]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var g2,K_,z3,y2,U3,J3,D8,R2={},H3=[],k8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a0(_,$){for(var Z in $)_[Z]=$[Z];return _}function L3(_){var $=_.parentNode;$&&$.removeChild(_)}function F3(_,$,Z){var J,X,Y,j={};for(Y in $)Y=="key"?J=$[Y]:Y=="ref"?X=$[Y]:j[Y]=$[Y];if(arguments.length>2&&(j.children=arguments.length>3?g2.call(arguments,2):Z),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)j[Y]===void 0&&(j[Y]=_.defaultProps[Y]);return T2(_,j,J,X,null)}function T2(_,$,Z,J,X){var Y={type:_,props:$,key:Z,ref:J,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++z3:X};return K_.vnode!=null&&K_.vnode(Y),Y}function c2(_){return _.children}function f2(_,$){this.props=_,this.context=$}function q2(_,$){if($==null)return _.__?q2(_.__,_.__.__k.indexOf(_)+1):null;for(var Z;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null)return Z.__e;return typeof _.type=="function"?q2(_):null}function E3(_){var $,Z;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null){_.__e=_.__c.base=Z.__e;break}return E3(_)}}function Y3(_){(!_.__d&&(_.__d=!0)&&y2.push(_)&&!u2.__r++||J3!==K_.debounceRendering)&&((J3=K_.debounceRendering)||U3)(u2)}function u2(){for(var _;u2.__r=y2.length;)_=y2.sort(function($,Z){return $.__v.__b-Z.__v.__b}),y2=[],_.some(function($){var Z,J,X,Y,j,G;$.__d&&(j=(Y=(Z=$).__v).__e,(G=Z.__P)&&(J=[],(X=a0({},Y)).__v=Y.__v+1,U1(G,Y,X,Z.__n,G.ownerSVGElement!==void 0,Y.__h!=null?[j]:null,J,j==null?q2(Y):j,Y.__h),y3(J,Y),Y.__e!=j&&E3(Y)))})}function D3(_,$,Z,J,X,Y,j,G,V,O){var W,H,E,D,C,w,T,U=J&&J.__k||H3,b=U.length;for(Z.__k=[],W=0;W<$.length;W++)if((D=Z.__k[W]=(D=$[W])==null||typeof D=="boolean"?null:typeof D=="string"||typeof D=="number"||typeof D=="bigint"?T2(null,D,null,null,D):Array.isArray(D)?T2(c2,{children:D},null,null,null):D.__b>0?T2(D.type,D.props,D.key,null,D.__v):D)!=null){if(D.__=Z,D.__b=Z.__b+1,(E=U[W])===null||E&&D.key==E.key&&D.type===E.type)U[W]=void 0;else for(H=0;H<b;H++){if((E=U[H])&&D.key==E.key&&D.type===E.type){U[H]=void 0;break}E=null}U1(_,D,E=E||R2,X,Y,j,G,V,O),C=D.__e,(H=D.ref)&&E.ref!=H&&(T||(T=[]),E.ref&&T.push(E.ref,null,D),T.push(H,D.__c||C,D)),C!=null?(w==null&&(w=C),typeof D.type=="function"&&D.__k!=null&&D.__k===E.__k?D.__d=V=k3(D,V,_):V=C3(_,D,E,U,C,V),O||Z.type!=="option"?typeof Z.type=="function"&&(Z.__d=V):_.value=""):V&&E.__e==V&&V.parentNode!=_&&(V=q2(E))}for(Z.__e=w,W=b;W--;)U[W]!=null&&(typeof Z.type=="function"&&U[W].__e!=null&&U[W].__e==Z.__d&&(Z.__d=q2(J,W+1)),w3(U[W],U[W]));if(T)for(W=0;W<T.length;W++)A3(T[W],T[++W],T[++W])}function k3(_,$,Z){var J,X;for(J=0;J<_.__k.length;J++)(X=_.__k[J])&&(X.__=_,$=typeof X.type=="function"?k3(X,$,Z):C3(Z,X,X,_.__k,X.__e,$));return $}function C3(_,$,Z,J,X,Y){var j,G,V;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(Z==null||X!=Y||X.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(X),j=null;else{for(G=Y,V=0;(G=G.nextSibling)&&V<J.length;V+=2)if(G==X)break _;_.insertBefore(X,Y),j=Y}return j!==void 0?j:X.nextSibling}function X3(_,$,Z){$[0]==="-"?_.setProperty($,Z):_[$]=Z==null?"":typeof Z!="number"||k8.test($)?Z:Z+"px"}function I2(_,$,Z,J,X){var Y;_:if($==="style")if(typeof Z=="string")_.style.cssText=Z;else{if(typeof J=="string"&&(_.style.cssText=J=""),J)for($ in J)Z&&$ in Z||X3(_.style,$,"");if(Z)for($ in Z)J&&Z[$]===J[$]||X3(_.style,$,Z[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=Z,Z?J||_.addEventListener($,Y?j3:W3,Y):_.removeEventListener($,Y?j3:W3,Y);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=Z==null?"":Z;break _}catch(j){}typeof Z=="function"||(Z!=null&&(Z!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,Z):_.removeAttribute($))}}function W3(_){this.l[_.type+!1](K_.event?K_.event(_):_)}function j3(_){this.l[_.type+!0](K_.event?K_.event(_):_)}function U1(_,$,Z,J,X,Y,j,G,V){var O,W,H,E,D,C,w,T,U,b,g,y=$.type;if($.constructor!==void 0)return null;Z.__h!=null&&(V=Z.__h,G=$.__e=Z.__e,$.__h=null,Y=[G]),(O=K_.__b)&&O($);try{_:if(typeof y=="function"){if(T=$.props,U=(O=y.contextType)&&J[O.__c],b=O?U?U.props.value:O.__:J,Z.__c?w=(W=$.__c=Z.__c).__=W.__E:(("prototype"in y)&&y.prototype.render?$.__c=W=new y(T,b):($.__c=W=new f2(T,b),W.constructor=y,W.render=y8),U&&U.sub(W),W.props=T,W.state||(W.state={}),W.context=b,W.__n=J,H=W.__d=!0,W.__h=[]),W.__s==null&&(W.__s=W.state),y.getDerivedStateFromProps!=null&&(W.__s==W.state&&(W.__s=a0({},W.__s)),a0(W.__s,y.getDerivedStateFromProps(T,W.__s))),E=W.props,D=W.state,H)y.getDerivedStateFromProps==null&&W.componentWillMount!=null&&W.componentWillMount(),W.componentDidMount!=null&&W.__h.push(W.componentDidMount);else{if(y.getDerivedStateFromProps==null&&T!==E&&W.componentWillReceiveProps!=null&&W.componentWillReceiveProps(T,b),!W.__e&&W.shouldComponentUpdate!=null&&W.shouldComponentUpdate(T,W.__s,b)===!1||$.__v===Z.__v){W.props=T,W.state=W.__s,$.__v!==Z.__v&&(W.__d=!1),W.__v=$,$.__e=Z.__e,$.__k=Z.__k,$.__k.forEach(function(f){f&&(f.__=$)}),W.__h.length&&j.push(W);break _}W.componentWillUpdate!=null&&W.componentWillUpdate(T,W.__s,b),W.componentDidUpdate!=null&&W.__h.push(function(){W.componentDidUpdate(E,D,C)})}W.context=b,W.props=T,W.state=W.__s,(O=K_.__r)&&O($),W.__d=!1,W.__v=$,W.__P=_,O=W.render(W.props,W.state,W.context),W.state=W.__s,W.getChildContext!=null&&(J=a0(a0({},J),W.getChildContext())),H||W.getSnapshotBeforeUpdate==null||(C=W.getSnapshotBeforeUpdate(E,D)),g=O!=null&&O.type===c2&&O.key==null?O.props.children:O,D3(_,Array.isArray(g)?g:[g],$,Z,J,X,Y,j,G,V),W.base=$.__e,$.__h=null,W.__h.length&&j.push(W),w&&(W.__E=W.__=null),W.__e=!1}else Y==null&&$.__v===Z.__v?($.__k=Z.__k,$.__e=Z.__e):$.__e=C8(Z.__e,$,Z,J,X,Y,j,V);(O=K_.diffed)&&O($)}catch(f){$.__v=null,(V||Y!=null)&&($.__e=G,$.__h=!!V,Y[Y.indexOf(G)]=null),K_.__e(f,$,Z)}}function y3(_,$){K_.__c&&K_.__c($,_),_.some(function(Z){try{_=Z.__h,Z.__h=[],_.some(function(J){J.call(Z)})}catch(J){K_.__e(J,Z.__v)}})}function C8(_,$,Z,J,X,Y,j,G){var V,O,W,H=Z.props,E=$.props,D=$.type,C=0;if(D==="svg"&&(X=!0),Y!=null){for(;C<Y.length;C++)if((V=Y[C])&&(V===_||(D?V.localName==D:V.nodeType==3))){_=V,Y[C]=null;break}}if(_==null){if(D===null)return document.createTextNode(E);_=X?document.createElementNS("http://www.w3.org/2000/svg",D):document.createElement(D,E.is&&E),Y=null,G=!1}if(D===null)H===E||G&&_.data===E||(_.data=E);else{if(Y=Y&&g2.call(_.childNodes),O=(H=Z.props||R2).dangerouslySetInnerHTML,W=E.dangerouslySetInnerHTML,!G){if(Y!=null)for(H={},C=0;C<_.attributes.length;C++)H[_.attributes[C].name]=_.attributes[C].value;(W||O)&&(W&&(O&&W.__html==O.__html||W.__html===_.innerHTML)||(_.innerHTML=W&&W.__html||""))}if(function(w,T,U,b,g){var y;for(y in U)y==="children"||y==="key"||y in T||I2(w,y,null,U[y],b);for(y in T)g&&typeof T[y]!="function"||y==="children"||y==="key"||y==="value"||y==="checked"||U[y]===T[y]||I2(w,y,T[y],U[y],b)}(_,E,H,X,G),W)$.__k=[];else if(C=$.props.children,D3(_,Array.isArray(C)?C:[C],$,Z,J,X&&D!=="foreignObject",Y,j,Y?Y[0]:Z.__k&&q2(Z,0),G),Y!=null)for(C=Y.length;C--;)Y[C]!=null&&L3(Y[C]);G||(("value"in E)&&(C=E.value)!==void 0&&(C!==_.value||D==="progress"&&!C)&&I2(_,"value",C,H.value,!1),("checked"in E)&&(C=E.checked)!==void 0&&C!==_.checked&&I2(_,"checked",C,H.checked,!1))}return _}function A3(_,$,Z){try{typeof _=="function"?_($):_.current=$}catch(J){K_.__e(J,Z)}}function w3(_,$,Z){var J,X;if(K_.unmount&&K_.unmount(_),(J=_.ref)&&(J.current&&J.current!==_.__e||A3(J,null,$)),(J=_.__c)!=null){if(J.componentWillUnmount)try{J.componentWillUnmount()}catch(Y){K_.__e(Y,$)}J.base=J.__P=null}if(J=_.__k)for(X=0;X<J.length;X++)J[X]&&w3(J[X],$,typeof _.type!="function");Z||_.__e==null||L3(_.__e),_.__e=_.__d=void 0}function y8(_,$,Z){return this.constructor(_,Z)}function b3(_,$,Z){var J,X,Y;K_.__&&K_.__(_,$),X=(J=typeof Z=="function")?null:Z&&Z.__k||$.__k,Y=[],U1($,_=(!J&&Z||$).__k=F3(c2,null,[_]),X||R2,R2,$.ownerSVGElement!==void 0,!J&&Z?[Z]:X?null:$.firstChild?g2.call($.childNodes):null,Y,!J&&Z?Z:X?X.__e:$.firstChild,J),y3(Y,_)}g2=H3.slice,K_={__e:function(_,$){for(var Z,J,X;$=$.__;)if((Z=$.__c)&&!Z.__)try{if((J=Z.constructor)&&J.getDerivedStateFromError!=null&&(Z.setState(J.getDerivedStateFromError(_)),X=Z.__d),Z.componentDidCatch!=null&&(Z.componentDidCatch(_),X=Z.__d),X)return Z.__E=Z}catch(Y){_=Y}throw _}},z3=0,f2.prototype.setState=function(_,$){var Z;Z=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=a0({},this.state),typeof _=="function"&&(_=_(a0({},Z),this.props)),_&&a0(Z,_),_!=null&&this.__v&&($&&this.__h.push($),Y3(this))},f2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),Y3(this))},f2.prototype.render=c2,y2=[],U3=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u2.__r=0,D8=0;var m2,C0,K3,A2=0,Q1=[],G3=K_.__b,V3=K_.__r,N3=K_.diffed,O3=K_.__c,B3=K_.unmount;function H1(_,$){K_.__h&&K_.__h(C0,_,A2||$),A2=0;var Z=C0.__H||(C0.__H={__:[],__h:[]});return _>=Z.__.length&&Z.__.push({}),Z.__[_]}function v(_){return A2=1,A8(M3,_)}function A8(_,$,Z){var J=H1(m2++,2);return J.t=_,J.__c||(J.__=[Z?Z($):M3(void 0,$),function(X){var Y=J.t(J.__[0],X);J.__[0]!==Y&&(J.__=[Y,J.__[1]],J.__c.setState({}))}],J.__c=C0),J.__}function m(_,$){var Z=H1(m2++,3);!K_.__s&&P3(Z.__H,$)&&(Z.__=_,Z.__H=$,C0.__H.__h.push(Z))}function L(_){return A2=5,y0(function(){return{current:_}},[])}function y0(_,$){var Z=H1(m2++,7);return P3(Z.__H,$)&&(Z.__=_(),Z.__H=$,Z.__h=_),Z.__}function S(_,$){return A2=8,y0(function(){return _},$)}function w8(){Q1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(v2),_.__H.__h.forEach(z1),_.__H.__h=[]}catch($){_.__H.__h=[],K_.__e($,_.__v)}}),Q1=[]}K_.__b=function(_){C0=null,G3&&G3(_)},K_.__r=function(_){V3&&V3(_),m2=0;var $=(C0=_.__c).__H;$&&($.__h.forEach(v2),$.__h.forEach(z1),$.__h=[])},K_.diffed=function(_){N3&&N3(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(Q1.push($)!==1&&K3===K_.requestAnimationFrame||((K3=K_.requestAnimationFrame)||function(Z){var J,X=function(){clearTimeout(Y),q3&&cancelAnimationFrame(J),setTimeout(Z)},Y=setTimeout(X,100);q3&&(J=requestAnimationFrame(X))})(w8)),C0=void 0},K_.__c=function(_,$){$.some(function(Z){try{Z.__h.forEach(v2),Z.__h=Z.__h.filter(function(J){return!J.__||z1(J)})}catch(J){$.some(function(X){X.__h&&(X.__h=[])}),$=[],K_.__e(J,Z.__v)}}),O3&&O3(_,$)},K_.unmount=function(_){B3&&B3(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(v2)}catch(Z){K_.__e(Z,$.__v)}};var q3=typeof requestAnimationFrame=="function";function v2(_){var $=C0;typeof _.__c=="function"&&_.__c(),C0=$}function z1(_){var $=C0;_.__c=_.__(),C0=$}function P3(_,$){return!_||_.length!==$.length||$.some(function(Z,J){return Z!==_[J]})}function M3(_,$){return typeof $=="function"?$(_):$}var S3=function(_,$,Z,J){var X;$[0]=0;for(var Y=1;Y<$.length;Y++){var j=$[Y++],G=$[Y]?($[0]|=j?1:2,Z[$[Y++]]):$[++Y];j===3?J[0]=G:j===4?J[1]=Object.assign(J[1]||{},G):j===5?(J[1]=J[1]||{})[$[++Y]]=G:j===6?J[1][$[++Y]]+=G+"":j?(X=_.apply(G,S3(_,G,Z,["",null])),J.push(X),G[0]?$[0]|=2:($[Y-2]=0,$[Y]=X)):J.push(G)}return J},Q3=new Map,Q=function(_){var $=Q3.get(this);return $||($=new Map,Q3.set(this,$)),($=S3(this,$.get(_)||($.set(_,$=function(Z){for(var J,X,Y=1,j="",G="",V=[0],O=function(E){Y===1&&(E||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?V.push(0,E,j):Y===3&&(E||j)?(V.push(3,E,j),Y=2):Y===2&&j==="..."&&E?V.push(4,E,0):Y===2&&j&&!E?V.push(5,0,!0,j):Y>=5&&((j||!E&&Y===5)&&(V.push(Y,0,j,X),Y=6),E&&(V.push(Y,E,0,X),Y=6)),j=""},W=0;W<Z.length;W++){W&&(Y===1&&O(),O(W));for(var H=0;H<Z[W].length;H++)J=Z[W][H],Y===1?J==="<"?(O(),V=[V],Y=3):j+=J:Y===4?j==="--"&&J===">"?(Y=1,j=""):j=J+j[0]:G?J===G?G="":j+=J:J==='"'||J==="'"?G=J:J===">"?(O(),Y=1):Y&&(J==="="?(Y=5,X=j,j=""):J==="/"&&(Y<5||Z[W][H+1]===">")?(O(),Y===3&&(V=V[0]),Y=V,(V=V[0]).push(2,0,Y),Y=0):J===" "||J==="\t"||J===`
`||J==="\r"?(O(),Y=2):j+=J),Y===3&&j==="!--"&&(Y=4,V=V[0])}return O(),V}(_)),$),arguments,[])).length>1?$:$[0]}.bind(F3);async function r_(_,$={}){let Z=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Unknown error"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function h2(_=10,$=null){let Z=`/timeline?limit=${_}`;if($)Z+=`&before=${$}`;return r_(Z)}async function x3(_,$=50,Z=0){return r_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${Z}`)}async function I3(_,$=50,Z=0){return r_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${Z}`)}async function T3(_){return r_(`/thread/${_}`)}async function f3(_,$=!1){let Z=`/post/${_}?cascade=${$?"true":"false"}`;return r_(Z,{method:"DELETE"})}async function L1(_,$,Z=null,J=[],X=null){return r_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:Z,media_ids:J,mode:X})})}async function v3(){return r_("/agents")}async function R3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return r_(`/agent/status${$}`)}async function F1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return r_(`/agent/context${$}`)}async function E1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return r_(`/agent/queue-state${$}`)}async function D1(_,$=null){let Z=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function K2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return r_(`/agent/models${$}`)}async function u3(_){let $=new FormData;$.append("file",_);let Z=await fetch("/media/upload",{method:"POST",body:$});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Upload failed"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function k1(_,$){let Z=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to respond"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function g3(_,$){let Z=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function c3(_,$="thought"){let Z=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return r_(Z)}async function m3(_,$,Z){return r_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(Z)})})}function Q2(_){return`/media/${_}`}function h3(_){return`/media/${_}/thumbnail`}async function p2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function i2(_="",$=2,Z=!1){let J=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${Z?"1":"0"}`;return r_(J)}async function p3(_,$=20000,Z=null){let J=Z?`&mode=${encodeURIComponent(Z)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${J}`;return r_(X)}async function i3(_){return r_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function C1(_,$="",Z={}){let J=new FormData;J.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(Z.overwrite)X.set("overwrite","1");let Y=X.toString(),j=Y?`/workspace/upload?${Y}`:"/workspace/upload",G=await fetch(""+j,{method:"POST",body:J});if(!G.ok){let V=await G.json().catch(()=>({error:"Upload failed"})),O=Error(V.error||`HTTP ${G.status}`);throw O.status=G.status,O.code=V.code,O}return G.json()}async function l3(_,$,Z=""){let J=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:Z})});if(!J.ok){let X=await J.json().catch(()=>({error:"Create failed"})),Y=Error(X.error||`HTTP ${J.status}`);throw Y.status=J.status,Y.code=X.code,Y}return J.json()}async function n3(_,$){let Z=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Rename failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function o3(_,$){let Z=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Move failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function d3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return r_($,{method:"DELETE"})}async function l2(_,$=!1){return r_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function y1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function r3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class A1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,Z=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,Z+$),this.reconnectAttempts=0;let J=Math.max(this.cooldownUntil-Z,0),X=Math.max(this.reconnectDelay,J);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function v0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function I_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function z2(_,$=!1){let Z=v0(_);if(Z===null)return $;return Z==="true"}function U2(_,$=null){let Z=v0(_);if(Z===null)return $;let J=parseInt(Z,10);return Number.isFinite(J)?J:$}function t0({prefix:_="file",label:$,title:Z,onRemove:J,onClick:X,removeTitle:Y="Remove",icon:j="file"}){let G=`${_}-file-pill`,V=`${_}-file-name`,O=`${_}-file-remove`,W=j==="message"?Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return Q`
    <span class=${G} title=${Z||$} onClick=${X}>
      ${W}
      <span class=${V}>${$}</span>
      ${J&&Q`
        <button
          class=${O}
          onClick=${(H)=>{H.preventDefault(),H.stopPropagation(),J()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var P8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function M8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),Z=_.tokens,J=_.contextWindow,X=Z!=null?`Context: ${s3(Z)} / ${s3(J)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,j=2*Math.PI*7,G=$/100*j,V=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return Q`
        <span class="compose-context-pie icon-btn" title=${X}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${V}
                    stroke-width="2.5"
                    stroke-dasharray=${`${G} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function s3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function a3({onPost:_,onFocus:$,searchMode:Z,onSearch:J,onEnterSearch:X,onExitSearch:Y,fileRefs:j=[],onRemoveFileRef:G,onClearFileRefs:V,messageRefs:O=[],onRemoveMessageRef:W,onClearMessageRefs:H,activeModel:E=null,modelUsage:D=null,thinkingLevel:C=null,supportsThinking:w=!1,contextUsage:T=null,notificationsEnabled:U=!1,notificationPermission:b="default",onToggleNotifications:g,onModelChange:y,onModelStateChange:f,activeEditorPath:i=null,onAttachEditorFile:n,onOpenFilePill:Y_,followupQueueItems:O_=[],onInjectQueuedFollowup:$_,onMessageResponse:G_,isAgentActive:P_=!1}){let[p,J_]=v(""),[l,s]=v(""),[e,V_]=v([]),[X_,A_]=v(!1),[Z_,N_]=v([]),[L_,q_]=v(0),[M_,B_]=v(!1),[z_,f_]=v(!1),[S_,w_]=v(!1),[T_,k_]=v([]),[v_,s_]=v(!1),U_=L(null),H_=L(null),O0=L(null),_0=L(null),B0=L(0),R0=200,q0=(z)=>{let x=new Set,a=[];for(let j_ of z||[]){if(typeof j_!=="string")continue;let E_=j_.trim();if(!E_||x.has(E_))continue;x.add(E_),a.push(E_)}return a},F_=()=>{let z=v0("piclaw_compose_history");if(!z)return[];try{let x=JSON.parse(z);if(!Array.isArray(x))return[];return q0(x)}catch{return[]}},L0=(z)=>{I_("piclaw_compose_history",JSON.stringify(z))},Q0=L(F_()),P=L(-1),__=L(""),C_=p.trim()||e.length>0||j.length>0||O.length>0,J0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),R_=typeof window<"u"&&typeof Notification<"u",P0=typeof window<"u"?Boolean(window.isSecureContext):!1,o_=R_&&P0&&b!=="denied",Y0=b==="granted"&&U,u_=Y0?"Disable notifications":"Enable notifications",X0=E||"",$0=w&&C?` (${C})`:"",g_=$0.trim()?`${C}`:"",i0=typeof D?.hint_short==="string"?D.hint_short.trim():"",e0=[g_||null,i0||null].filter(Boolean).join(" • "),l0=[X0?`Current model: ${X0}${$0}`:null,D?.plan?`Plan: ${D.plan}`:null,i0||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),_2=z_?"Switching model…":l0.join(" • ")||`Current model: ${X0}${$0} (tap to open model picker)`,K0=(z)=>{if(!z||typeof z!=="object")return;let x=z.model??z.current;if(typeof f==="function")f({model:x??null,thinking_level:z.thinking_level??null,supports_thinking:z.supports_thinking,provider_usage:z.provider_usage??null});if(x&&typeof y==="function")y(x)},M0=(z)=>{let x=z||U_.current;if(!x)return;x.style.height="auto",x.style.height=`${x.scrollHeight}px`,x.style.overflowY="hidden"},A0=(z)=>{if(!z.startsWith("/")||z.includes(`
`)){B_(!1),N_([]);return}let x=z.toLowerCase().split(" ")[0];if(x.length<1){B_(!1),N_([]);return}let a=P8.filter((j_)=>j_.name.startsWith(x)||j_.name.replace(/-/g,"").startsWith(x.replace(/-/g,"")));if(a.length>0&&!(a.length===1&&a[0].name===x))N_(a),q_(0),B_(!0);else B_(!1),N_([])},F0=(z)=>{let x=p,a=x.indexOf(" "),j_=a>=0?x.slice(a):"",E_=z.name+j_;J_(E_),B_(!1),N_([]),requestAnimationFrame(()=>{let p_=U_.current;if(!p_)return;let y_=E_.length;p_.selectionStart=y_,p_.selectionEnd=y_,p_.focus()})},c_=(z)=>{if(Z)s(z);else J_(z),A0(z);requestAnimationFrame(()=>M0())},z0=(z)=>{let x=Z?l:p,a=x&&!x.endsWith(`
`)?`
`:"",j_=`${x}${a}${z}`.trimStart();c_(j_)},$2=(z)=>{let x=z?.command?.model_label;if(x)return x;let a=z?.command?.message;if(typeof a==="string"){let j_=a.match(/•\s+([^\n]+?)\s+\(current\)/);if(j_?.[1])return j_[1].trim()}return null},Z2=async(z)=>{if(Z||z_)return;f_(!0);try{let x=await L1("default",z,null,[]),a=$2(x);K0({model:a??E??null,thinking_level:x?.command?.thinking_level,supports_thinking:x?.command?.supports_thinking});try{let j_=await K2();if(j_)K0(j_)}catch{}return _?.(),!0}catch(x){return console.error("Failed to switch model:",x),alert("Failed to switch model: "+x.message),!1}finally{f_(!1)}},n0=async()=>{await Z2("/cycle-model")},E2=async(z)=>{if(!z||z_)return;if(await Z2(`/model ${z}`))w_(!1)},m_=(z)=>{z.preventDefault(),z.stopPropagation(),w_((x)=>!x)},E0=(z)=>{if(z==="queue"||z==="steer"||z==="auto")return z;return P_?"queue":null},W0=async(z,x,a={})=>{let{includeMedia:j_=!0,includeFileRefs:E_=!0,includeMessageRefs:p_=!0,clearAfterSubmit:y_=!0,recordHistory:x_=!0}=a||{},b0=typeof z==="string"?z:z&&typeof z?.target?.value==="string"?z.target.value:p,G2=typeof b0==="string"?b0:"";if(!G2.trim()&&(j_?e.length===0:!0)&&(E_?j.length===0:!0)&&(p_?O.length===0:!0))return;B_(!1),N_([]);let D0=j_?[...e]:[],J2=E_?[...j]:[],V2=p_?[...O]:[],t_=G2.trim();if(x_&&t_){let i_=Q0.current,l_=q0(i_.filter((r0)=>r0!==t_));if(l_.push(t_),l_.length>200)l_.splice(0,l_.length-200);Q0.current=l_,L0(l_),P.current=-1,__.current=""}if(y_)J_(""),V_([]),V?.(),H?.();(async()=>{try{let i_=[];for(let N0 of D0){let I0=await u3(N0);i_.push(I0.id)}let l_=J2.length?`Files:
${J2.map((N0)=>`- ${N0}`).join(`
`)}`:"",r0=V2.length?`Referenced messages:
${V2.map((N0)=>`- message:${N0}`).join(`
`)}`:"",V0=i_.length?`Images:
${i_.map((N0,I0)=>{let D2=D0[I0]?.name||`image-${I0+1}`;return`- attachment:${N0} (${D2})`}).join(`
`)}`:"",d_=[t_,l_,r0,V0].filter(Boolean).join(`

`),k0=await L1("default",d_,null,i_,E0(x));if(G_?.(k0),k0?.command){K0({model:k0.command.model_label??E??null,thinking_level:k0.command.thinking_level,supports_thinking:k0.command.supports_thinking});try{let N0=await K2();if(N0)K0(N0)}catch{}}_?.()}catch(i_){console.error("Failed to post:",i_)}})()},a_=(z)=>{$_?.(z)},b_=(z)=>{if(z.isComposing)return;if(Z&&z.key==="Escape"){z.preventDefault(),s(""),Y?.();return}if(M_&&Z_.length>0){let x=U_.current?.value??(Z?l:p);if(!String(x||"").startsWith("/"))B_(!1),N_([]);else{if(z.key==="ArrowDown"){z.preventDefault(),q_((a)=>(a+1)%Z_.length);return}if(z.key==="ArrowUp"){z.preventDefault(),q_((a)=>(a-1+Z_.length)%Z_.length);return}if(z.key==="Tab"){z.preventDefault(),F0(Z_[L_]);return}if(z.key==="Enter"&&!z.shiftKey){if(!(U_.current?.value??(Z?l:p)).includes(" ")){z.preventDefault();let E_=Z_[L_];B_(!1),N_([]),W0(E_.name);return}}if(z.key==="Escape"){z.preventDefault(),B_(!1),N_([]);return}}}if(!Z&&(z.key==="ArrowUp"||z.key==="ArrowDown")&&!z.metaKey&&!z.ctrlKey&&!z.altKey&&!z.shiftKey){let x=U_.current;if(!x)return;let a=x.value||"",j_=x.selectionStart===0&&x.selectionEnd===0,E_=x.selectionStart===a.length&&x.selectionEnd===a.length;if(z.key==="ArrowUp"&&j_||z.key==="ArrowDown"&&E_){let p_=Q0.current;if(!p_.length)return;z.preventDefault();let y_=P.current;if(z.key==="ArrowUp"){if(y_===-1)__.current=a,y_=p_.length-1;else if(y_>0)y_-=1;P.current=y_,c_(p_[y_]||"")}else{if(y_===-1)return;if(y_<p_.length-1)y_+=1,P.current=y_,c_(p_[y_]||"");else P.current=-1,c_(__.current||""),__.current=""}requestAnimationFrame(()=>{let x_=U_.current;if(!x_)return;let b0=x_.value.length;x_.selectionStart=b0,x_.selectionEnd=b0});return}}if(z.key==="Enter"&&!z.shiftKey&&(z.ctrlKey||z.metaKey)){z.preventDefault();let x=U_.current?.value??(Z?l:p);if(Z){if(x.trim())J?.(x.trim())}else W0(x,"steer");return}if(z.key==="Enter"&&!z.shiftKey){z.preventDefault();let x=U_.current?.value??(Z?l:p);if(Z){if(x.trim())J?.(x.trim())}else W0(x)}},h_=(z)=>{let x=Array.from(z||[]).filter((a)=>a&&a.type&&a.type.startsWith("image/"));if(!x.length)return;V_((a)=>[...a,...x])},U0=(z)=>{h_(z.target.files),z.target.value=""},S0=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),B0.current+=1,A_(!0)},w0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),B0.current=Math.max(0,B0.current-1),B0.current===0)A_(!1)},g0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),z.dataTransfer)z.dataTransfer.dropEffect="copy";A_(!0)},G0=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),B0.current=0,A_(!1),h_(z.dataTransfer?.files||[])},x0=(z)=>{if(Z)return;let x=z.clipboardData?.items;if(!x||!x.length)return;let a=[];for(let j_ of x){if(j_.kind!=="file")continue;let E_=j_.getAsFile?.();if(E_)a.push(E_)}if(a.length>0)z.preventDefault(),h_(a)},o0=(z)=>{V_((x)=>x.filter((a,j_)=>j_!==z))},d0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((z)=>{let{latitude:x,longitude:a,accuracy:j_}=z.coords,E_=`${x.toFixed(5)}, ${a.toFixed(5)}`,p_=Number.isFinite(j_)?` ±${Math.round(j_)}m`:"",y_=`https://maps.google.com/?q=${x},${a}`,x_=`Location: ${E_}${p_} ${y_}`;z0(x_)},(z)=>{let x=z?.message||"Unable to retrieve location.";alert(`Location error: ${x}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};m(()=>{if(!S_)return;s_(!0),K2().then((z)=>{let x=Array.isArray(z?.models)?z.models.filter((a)=>typeof a==="string"&&a.trim().length>0):[];k_(x),K0(z)}).catch((z)=>{console.warn("Failed to load model list:",z),k_([])}).finally(()=>{s_(!1)})},[S_,E]),m(()=>{if(Z)w_(!1)},[Z]),m(()=>{if(!S_)return;let z=(x)=>{let a=O0.current,j_=_0.current,E_=x.target;if(a&&a.contains(E_))return;if(j_&&j_.contains(E_))return;w_(!1)};return document.addEventListener("pointerdown",z),()=>document.removeEventListener("pointerdown",z)},[S_]);let c0=(z)=>{let x=z.target.value;M0(z.target),c_(x)};return m(()=>{requestAnimationFrame(()=>M0())},[p,l,Z]),Q`
        <div class="compose-box">
            ${!Z&&O_.length>0&&Q`
                <div class="compose-queue-stack">
                    ${O_.map((z)=>{let x=typeof z?.content==="string"?z.content:"";if(!x.trim())return null;return Q`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${x}>
                                    ${x}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>a_(z)}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4 20h12a2 2 0 0 0 2-2V8" />
                                        <polyline points="14 12 18 8 22 12" />
                                    </svg>
                                    <span>Steer</span>
                                </button>
                                <button
                                    class="compose-queue-stack-close-btn"
                                    type="button"
                                    title="Cancel queued message"
                                    onClick=${()=>$_?.(z)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        `})}
                </div>
            `}
            <div
                class=${`compose-input-wrapper${X_?" drag-active":""}`}
                onDragEnter=${S0}
                onDragOver=${g0}
                onDragLeave=${w0}
                onDrop=${G0}
            >
                <div class="compose-input-main">
                    ${(j.length>0||e.length>0||O.length>0)&&Q`
                        <div class="compose-file-refs">
                            ${O.map((z)=>{return Q`
                                    <${t0}
                                        key=${"msg-"+z}
                                        prefix="compose"
                                        label=${"msg:"+z}
                                        title=${"Message reference: "+z}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>W?.(z)}
                                    />
                                `})}
                            ${j.map((z)=>{let x=z.split("/").pop()||z;return Q`
                                    <${t0}
                                        prefix="compose"
                                        label=${x}
                                        title=${z}
                                        onClick=${()=>Y_?.(z)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>G?.(z)}
                                    />
                                `})}
                            ${e.map((z,x)=>{let a=z?.name||`image-${x+1}`;return Q`
                                    <${t0}
                                        key=${a+x}
                                        prefix="compose"
                                        label=${a}
                                        title=${a}
                                        removeTitle="Remove image"
                                        onRemove=${()=>o0(x)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${U_}
                        placeholder=${Z?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${Z?l:p}
                        onInput=${c0}
                        onKeyDown=${b_}
                        onPaste=${x0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${M_&&Z_.length>0&&Q`
                        <div class="slash-autocomplete" ref=${H_}>
                            ${Z_.map((z,x)=>Q`
                                <div
                                    key=${z.name}
                                    class=${`slash-item${x===L_?" active":""}`}
                                    onMouseDown=${(a)=>{a.preventDefault(),F0(z)}}
                                    onMouseEnter=${()=>q_(x)}
                                >
                                    <span class="slash-name">${z.name}</span>
                                    <span class="slash-desc">${z.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${S_&&!Z&&Q`
                        <div class="compose-model-popup" ref=${O0}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${v_&&Q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!v_&&T_.length===0&&Q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!v_&&T_.map((z)=>Q`
                                    <button
                                        key=${z}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${E===z?" active":""}`}
                                        onClick=${()=>{E2(z)}}
                                        disabled=${z_}
                                    >
                                        ${z}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{n0()}}
                                    disabled=${z_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!Z&&E&&Q`
                    <div class="compose-meta-row">
                        ${!Z&&E&&Q`
                            <div class="compose-model-meta">
                                <button
                                    ref=${_0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${_2}
                                    aria-label="Open model picker"
                                    onClick=${m_}
                                    disabled=${z_}
                                >
                                    ${z_?"Switching…":X0}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!z_&&e0&&Q`
                                        <span class="compose-model-usage-hint" title=${_2}>
                                            ${e0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${Z?"search-mode":""}">
                    ${!Z&&T&&T.percent!=null&&Q`
                        <${M8} usage=${T} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${Z?Y:X}
                        title=${Z?"Close search":"Search"}
                    >
                        ${Z?Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${J0&&!Z&&Q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${d0}
                            title="Share location"
                            type="button"
                            disabled=${!1}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${o_&&!Z&&Q`
                        <button
                            class=${`icon-btn notification-btn${Y0?" active":""}`}
                            onClick=${g}
                            title=${u_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!Z&&Q`
                        ${i&&n&&Q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${n}
                                title=${`Attach open file: ${i}`}
                                type="button"
                                disabled=${j.includes(i)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${U0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{W0()}}
                            disabled=${!C_}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var e3="piclaw_theme",P1="piclaw_tint",d2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},S8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},t3={default:{label:"Default",mode:"auto",light:d2,dark:S8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},x8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],r2={theme:"default",tint:null},_4="light",w1=!1;function $4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function H2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let Z=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(Z)&&!/^[0-9a-fA-F]{6}$/.test(Z))return null;let J=Z.length===3?Z.split("").map((Y)=>Y+Y).join(""):Z,X=parseInt(J,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${J.toLowerCase()}`}}function I8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let Z=document.createElement("div");if(Z.style.color="",Z.style.color=$,!Z.style.color)return null;let J=Z.style.color;try{if(document.body)Z.style.display="none",document.body.appendChild(Z),J=getComputedStyle(Z).color||Z.style.color,document.body.removeChild(Z)}catch{}let X=J.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Y=parseInt(X[1],10),j=parseInt(X[2],10),G=parseInt(X[3],10);if(![Y,j,G].every((O)=>Number.isFinite(O)))return null;let V=`#${[Y,j,G].map((O)=>O.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:j,b:G,hex:V}}function Z4(_){return H2(_)||I8(_)}function w2(_,$,Z){let J=Math.round(_.r+($.r-_.r)*Z),X=Math.round(_.g+($.g-_.g)*Z),Y=Math.round(_.b+($.b-_.b)*Z);return`rgb(${J} ${X} ${Y})`}function b1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function J4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function M1(_){return t3[_]||t3.default}function T8(_){return _.mode==="auto"?J4():_.mode}function f8(_,$){let Z=M1(_);if($==="dark"&&Z.dark)return Z.dark;if($==="light"&&Z.light)return Z.light;return Z.dark||Z.light||d2}function v8(_,$,Z){let J=Z4($);if(!J)return _;let X=H2(_.bgPrimary),Y=H2(_.bgSecondary),j=H2(_.bgHover),G=H2(_.borderColor);if(!X||!Y||!j||!G)return _;let O=H2(Z==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:w2(X,J,0.08),bgSecondary:w2(Y,J,0.12),bgHover:w2(j,J,0.16),borderColor:w2(G,J,0.08),accent:J.hex,accentHover:O?w2(J,O,0.18):J.hex}}function R8(_,$){if(typeof document>"u")return;let Z=document.documentElement,J=_.accent,X=Z4(J),Y=X?b1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?b1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",G=X?b1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",V={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":J,"--accent-hover":_.accentHover||J,"--accent-soft":j,"--accent-soft-strong":G,"--danger-color":_.danger||d2.danger,"--success-color":_.success||d2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(V).forEach(([O,W])=>{if(W)Z.style.setProperty(O,W)})}function u8(){if(typeof document>"u")return;let _=document.documentElement;x8.forEach(($)=>_.style.removeProperty($))}function n2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function g8(_,$){if(typeof document>"u")return;let Z=n2("theme-color");if(Z&&_)Z.setAttribute("content",_);let J=n2("msapplication-TileColor");if(J&&_)J.setAttribute("content",_);let X=n2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Y=n2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function c8(){if(typeof window>"u")return;let _={...r2,mode:_4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function S1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let Z=$4(_?.theme||"default"),J=_?.tint?String(_.tint).trim():null,X=M1(Z),Y=T8(X),j=f8(Z,Y);r2={theme:Z,tint:J},_4=Y;let G=document.documentElement;G.dataset.theme=Y,G.dataset.colorTheme=Z,G.dataset.tint=J?String(J):"",G.style.colorScheme=Y;let V=j;if(Z==="default"&&J)V=v8(j,J,Y);if(Z==="default"&&!J)u8();else R8(V,Y);if(g8(V.bgPrimary,Y),c8(),$.persist!==!1)if(I_(e3,Z),J)I_(P1,J);else I_(P1,"")}function o2(){if(M1(r2.theme).mode!=="auto")return;S1(r2,{persist:!1})}function Y4(){if(typeof window>"u")return()=>{};let _=$4(v0(e3)||"default"),$=v0(P1),Z=$?$.trim():null;if(S1({theme:_,tint:Z},{persist:!1}),window.matchMedia&&!w1){let J=window.matchMedia("(prefers-color-scheme: dark)");if(J.addEventListener)J.addEventListener("change",o2);else if(J.addListener)J.addListener(o2);return w1=!0,()=>{if(J.removeEventListener)J.removeEventListener("change",o2);else if(J.removeListener)J.removeListener(o2);w1=!1}}return()=>{}}function X4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let Z=_.theme??_.name??_.colorTheme,J=_.tint??null;S1({theme:Z||"default",tint:J},{persist:!0})}function W4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return J4()}var s2=/#(\w+)/g,m8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),h8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),p8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),i8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},l8=new Set(["http:","https:","mailto:",""]);function j4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function L2(_,$={}){if(!_)return null;let Z=String(_).trim();if(!Z)return null;if(Z.startsWith("#")||Z.startsWith("/"))return Z;if(Z.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(Z))return Z;return null}if(Z.startsWith("blob:"))return Z;try{let J=new URL(Z,typeof window<"u"?window.location.origin:"http://localhost");if(!l8.has(J.protocol))return null;return J.href}catch{return null}}function K4(_,$={}){if(!_)return"";let Z=new DOMParser().parseFromString(_,"text/html"),J=[],X=Z.createTreeWalker(Z.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=X.nextNode())J.push(Y);for(let j of J){let G=j.tagName.toLowerCase();if(!h8.has(G)){let O=j.parentNode;if(!O)continue;while(j.firstChild)O.insertBefore(j.firstChild,j);O.removeChild(j);continue}let V=i8[G]||new Set;for(let O of Array.from(j.attributes)){let W=O.name.toLowerCase(),H=O.value;if(W.startsWith("on")){j.removeAttribute(O.name);continue}if(W.startsWith("data-")||W.startsWith("aria-"))continue;if(V.has(W)||p8.has(W)){if(W==="href"){let E=L2(H);if(!E)j.removeAttribute(O.name);else if(j.setAttribute(O.name,E),G==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(W==="src"){let E=G==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(H):H,D=L2(E,{allowDataImage:G==="img"});if(!D)j.removeAttribute(O.name);else j.setAttribute(O.name,D)}continue}j.removeAttribute(O.name)}}return Z.body.innerHTML}function G4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function a2(_,$=2){if(!_)return _;let Z=_;for(let J=0;J<$;J+=1){let X=G4(Z);if(X===Z)break;Z=X}return Z}function n8(_){if(!_)return{text:"",blocks:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=[],Y=!1,j=[];for(let G of Z){if(!Y&&G.trim().match(/^```mermaid\s*$/i)){Y=!0,j=[];continue}if(Y&&G.trim().match(/^```\s*$/)){let V=J.length;J.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${V}@@`),Y=!1,j=[];continue}if(Y)j.push(G);else X.push(G)}if(Y)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:J}}function o8(_){if(!_)return _;return a2(_,5)}function d8(_){let $=new TextEncoder().encode(String(_||"")),Z="";for(let J of $)Z+=String.fromCharCode(J);return btoa(Z)}function r8(_){let $=atob(String(_||"")),Z=new Uint8Array($.length);for(let J=0;J<$.length;J+=1)Z[J]=$.charCodeAt(J);return new TextDecoder().decode(Z)}function s8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(Z,J)=>{let X=Number(J),Y=$[X]??"",j=o8(Y);return`<div class="mermaid-container" data-mermaid="${d8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function V4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,Z)=>{if(Z.includes(`
`))return`
\`\`\`
${Z}
\`\`\`
`;return`\`${Z}\``})}function N4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,Z)=>{let J=Z.trim(),X=J.startsWith("/"),Y=X?J.slice(1).trim():J,V=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!V||!m8.has(V))return $;if(V==="br")return X?"":"<br>";if(X)return`</${V}>`;return`<${V}>`})}function O4(_){if(!_)return _;let $=(Z)=>Z.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(Z,J)=>`<pre><code>${$(J)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(Z,J)=>`<code>${$(J)}</code>`)}function B4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=Z.nextNode()){if(!X.nodeValue)continue;let Y=J(X.nodeValue);if(Y!==X.nodeValue)X.nodeValue=Y}return $.body.innerHTML}function a8(_){if(!window.katex)return _;let $=(j)=>G4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),Z=(j)=>{let G=[],V=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(O)=>{let W=G.length;return G.push(O),`@@CODE_BLOCK_${W}@@`});return V=V.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(O)=>{let W=G.length;return G.push(O),`@@CODE_INLINE_${W}@@`}),{html:V,blocks:G}},J=(j,G)=>{if(!G.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(V,O)=>{let W=Number(O);return G[W]??""})},X=Z(_),Y=X.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,G,V)=>{try{let O=katex.renderToString($(V.trim()),{displayMode:!0,throwOnError:!1});return`${G}${O}`}catch(O){return`<span class="math-error" title="${j4(O.message)}">${j}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,G,V)=>{if(/\s$/.test(V))return j;try{let O=katex.renderToString($(V),{displayMode:!1,throwOnError:!1});return`${G}${O}`}catch(O){return`${G}<span class="math-error" title="${j4(O.message)}">$${V}$</span>`}}),J(Y,X.blocks)}function t8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=[],X;while(X=Z.nextNode())J.push(X);for(let Y of J){let j=Y.nodeValue;if(!j)continue;if(s2.lastIndex=0,!s2.test(j))continue;s2.lastIndex=0;let G=Y.parentElement;if(G&&(G.closest("a")||G.closest("code")||G.closest("pre")))continue;let V=j.split(s2);if(V.length<=1)continue;let O=$.createDocumentFragment();V.forEach((W,H)=>{if(H%2===1){let E=$.createElement("a");E.setAttribute("href","#"),E.className="hashtag",E.setAttribute("data-hashtag",W),E.textContent=`#${W}`,O.appendChild(E)}else O.appendChild($.createTextNode(W))}),Y.parentNode?.replaceChild(O,Y)}return $.body.innerHTML}function e8(_){if(!_)return _;let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=!1;for(let Y of Z){if(!X&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,J.push("$$");continue}if(X&&Y.trim().match(/^```\s*$/)){X=!1,J.push("$$");continue}J.push(Y)}return J.join(`
`)}function F2(_,$,Z={}){if(!_)return"";let J=e8(_),{text:X,blocks:Y}=n8(J),j=a2(X,2),V=V4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),O=N4(V),W=window.marked?marked.parse(O,{headerIds:!1,mangle:!1}):O.replace(/\n/g,"<br>");return W=O4(W),W=B4(W),W=a8(W),W=t8(W),W=s8(W,Y),W=K4(W,Z),W}function q4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),Z=a2($,2),X=V4(Z).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=N4(X),j=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return j=O4(j),j=B4(j),j=K4(j),j}async function t2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:Z}=window.beautifulMermaid,X=W4()==="dark"?Z["tokyo-night"]:Z["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Y)try{let G=j.dataset.mermaid,V=r8(G||""),O=a2(V,2),W=await $(O,{...X,transparent:!0});j.innerHTML=W,j.removeAttribute("data-mermaid")}catch(G){console.error("Mermaid render error:",G);let V=document.createElement("pre");V.className="mermaid-error",V.textContent=`Diagram error: ${G.message}`,j.innerHTML="",j.appendChild(V),j.removeAttribute("data-mermaid")}}var Q4="PiClaw";function x1(_,$){let Z=_||"PiClaw",J=Z.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=J.charCodeAt(0)%X.length,j=X[Y],G=Z.trim().toLowerCase(),V=typeof $==="string"?$.trim():"",W=(V?V:null)||(G==="PiClaw".toLowerCase()||G==="pi"?"/static/icon-192.png":null);return{letter:J,color:j,image:W}}function z4(_,$){if(!_)return"PiClaw";let Z=$[_]?.name||_;return Z?Z.charAt(0).toUpperCase()+Z.slice(1):"PiClaw"}function U4(_,$){if(!_)return null;let Z=$[_]||{};return Z.avatar_url||Z.avatarUrl||Z.avatar||null}function H4(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,j=Y?.dataset?.colorTheme||"",G=Y?.dataset?.tint||"",V=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(V&&(G||j&&j!=="default"))return V}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],Z=String(_),J=0;for(let Y=0;Y<Z.length;Y+=1)J=(J*31+Z.charCodeAt(Y))%2147483647;let X=Math.abs(J)%$.length;return $[X]}function L4({status:_,draft:$,plan:Z,thought:J,pendingRequest:X,intent:Y,turnId:j,steerQueued:G,onPanelToggle:V}){let H=(Z_)=>{if(!Z_)return{text:"",totalLines:0,fullText:""};if(typeof Z_==="string"){let M_=Z_,B_=M_?M_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:M_,totalLines:B_,fullText:M_}}let N_=Z_.text||"",L_=Z_.fullText||Z_.full_text||N_,q_=Number.isFinite(Z_.totalLines)?Z_.totalLines:L_?L_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:N_,totalLines:q_,fullText:L_}},E=160,D=(Z_)=>{if(!Z_)return 1;return Math.max(1,Math.ceil(Z_.length/160))},C=(Z_,N_,L_)=>{let q_=(Z_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!q_)return{text:"",omitted:0,totalLines:Number.isFinite(L_)?L_:0,visibleLines:0};let M_=q_.split(`
`),B_=M_.length>N_?M_.slice(0,N_).join(`
`):q_,z_=Number.isFinite(L_)?L_:M_.reduce((w_,T_)=>w_+D(T_),0),f_=B_?B_.split(`
`).reduce((w_,T_)=>w_+D(T_),0):0,S_=Math.max(z_-f_,0);return{text:B_,omitted:S_,totalLines:z_,visibleLines:f_}},w=H(Z),T=H(J),U=H($),b=Boolean(w.text)||w.totalLines>0,g=Boolean(T.text)||T.totalLines>0,y=Boolean(U.fullText?.trim()||U.text?.trim());if(!_&&!y&&!b&&!g&&!X&&!Y)return null;let[f,i]=v(new Set),n=(Z_)=>i((N_)=>{let L_=new Set(N_),q_=!L_.has(Z_);if(q_)L_.add(Z_);else L_.delete(Z_);if(typeof V==="function")V(Z_,q_);return L_});m(()=>{i(new Set)},[j]);let Y_=_?.turn_id||j,O_=H4(Y_),$_=G?"turn-dot turn-dot-queued":"turn-dot",G_=(Z_)=>Z_,P_=Boolean(_?.last_activity||_?.lastActivity),p=Y?.kind||"info",J_=p==="warning"?"#f59e0b":p==="error"?"var(--danger-color)":p==="success"?"var(--success-color)":O_,l="",s=_?.title,e=_?.status;if(_?.type==="plan")l=s?`Planning: ${s}`:"Planning...";else if(_?.type==="tool_call")l=s?`Running: ${s}`:"Running tool...";else if(_?.type==="tool_status")l=s?`${s}: ${e||"Working..."}`:e||"Working...";else if(_?.type==="error")l=s||"Agent error";else l=s||e||"Working...";if(P_)l="Last activity just now";let V_=({panelTitle:Z_,text:N_,fullText:L_,totalLines:q_,maxLines:M_,titleClass:B_,panelKey:z_})=>{let f_=f.has(z_),S_=L_||N_||"",w_=typeof M_==="number",T_=f_&&w_,k_=w_?C(S_,M_,q_):{text:S_||"",omitted:0,totalLines:Number.isFinite(q_)?q_:0};if(!S_&&!(Number.isFinite(k_.totalLines)&&k_.totalLines>0))return null;let v_=`agent-thinking-body${w_?" agent-thinking-body-collapsible":""}`,s_=w_?`--agent-thinking-collapsed-lines: ${M_};`:"";return Q`
            <div
                class="agent-thinking"
                data-expanded=${f_?"true":"false"}
                data-collapsible=${w_?"true":"false"}
                style=${O_?`--turn-color: ${O_};`:""}
            >
                <div class="agent-thinking-title ${B_||""}">
                    ${O_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${Z_}
                    ${T_&&Q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${Z_} panel`}
                            onClick=${()=>n(z_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${v_}
                    style=${s_}
                    dangerouslySetInnerHTML=${{__html:q4(S_)}}
                />
                ${!f_&&k_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>n(z_)}>
                        ▸ ${k_.omitted} more lines
                    </button>
                `}
                ${f_&&k_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>n(z_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},X_=X?.tool_call?.title,A_=X_?`Awaiting approval: ${X_}`:"Awaiting approval";return Q`
        <div class="agent-status-panel">
            ${Y&&Q`
                <div
                    class="agent-thinking agent-thinking-intent"
                    aria-live="polite"
                    style=${J_?`--turn-color: ${J_};`:""}
                    title=${Y?.detail||""}
                >
                    <div class="agent-thinking-title intent">
                        ${J_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                        ${Y.title}
                    </div>
                    ${Y.detail&&Q`<div class="agent-thinking-body">${Y.detail}</div>`}
                </div>
            `}
            ${X&&Q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${O_?`--turn-color: ${O_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${A_}</span>
                </div>
            `}
            ${b&&V_({panelTitle:G_("Planning"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,panelKey:"plan"})}
            ${g&&V_({panelTitle:G_("Thoughts"),text:T.text,fullText:T.fullText,totalLines:T.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${y&&V_({panelTitle:G_("Draft"),text:U.text,fullText:U.fullText,totalLines:U.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&Q`
                <div class=${`agent-status${P_?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${O_?`--turn-color: ${O_};`:""}>
                    ${O_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?Q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!P_&&Q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${l}</span>
                </div>
            `}
        </div>
    `}function F4({request:_,onRespond:$}){if(!_)return null;let{request_id:Z,tool_call:J,options:X}=_,Y=J?.title||"Agent Request",j=J?.kind||"other",G=J?.rawInput||{},V=G.command||G.commands&&G.commands[0]||null,O=G.diff||null,W=G.fileName||G.path||null,H=J?.description||G.description||G.explanation||null,D=(Array.isArray(J?.locations)?J.locations:[]).map((b)=>b?.path).filter((b)=>Boolean(b)),C=Array.from(new Set([W,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:Z,tool_call:J,options:X});let w=async(b)=>{try{await k1(Z,b),$()}catch(g){console.error("Failed to respond to agent request:",g)}},T=async()=>{try{await g3(Y,`Auto-approved: ${Y}`),await k1(Z,"approved"),$()}catch(b){console.error("Failed to add to whitelist:",b)}},U=X&&X.length>0;return Q`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${Y}</div>
                </div>
                ${(H||V||O||C.length>0)&&Q`
                    <div class="agent-request-body">
                        ${H&&Q`
                            <div class="agent-request-description">${H}</div>
                        `}
                        ${C.length>0&&Q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${C.map((b,g)=>Q`<li key=${g}>${b}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${V&&Q`
                            <pre class="agent-request-command">${V}</pre>
                        `}
                        ${O&&Q`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${O}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${U?X.map((b)=>Q`
                            <button 
                                key=${b.optionId||b.id||String(b)}
                                class="agent-request-btn ${b.kind==="allow_once"||b.kind==="allow_always"?"primary":""}"
                                onClick=${()=>w(b.optionId||b.id||b)}
                            >
                                ${b.name||b.label||b.optionId||b.id||String(b)}
                            </button>
                        `):Q`
                        <button class="agent-request-btn primary" onClick=${()=>w("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>w("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${T}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function E4({status:_}){if(_==="connected")return null;return Q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function D4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let J=new Date-$,X=J/1000,Y=86400000;if(J<Y){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(J<5*Y){let V=$.toLocaleDateString(void 0,{weekday:"short"}),O=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${V} ${O}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),G=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${G}`}function b2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function p0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function e2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function k4({src:_,onClose:$}){return m(()=>{let Z=(J)=>{if(J.key==="Escape")$()};return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)},[$]),Q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function _6({mediaId:_}){let[$,Z]=v(null);if(m(()=>{p2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size,Y=X?p0(X):"";return Q`
        <a href=${Q2(_)} download=${J} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${Y&&Q`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function _1({annotations:_}){if(!_)return null;let{audience:$,priority:Z,lastModified:J}=_,X=J?e2(J):null;return Q`
        <div class="content-annotations">
            ${$&&$.length>0&&Q`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof Z==="number"&&Q`
                <span class="content-annotation">Priority: ${Z}</span>
            `}
            ${X&&Q`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function $6({block:_}){let $=_.title||_.name||_.uri,Z=_.description,J=_.size?p0(_.size):"",X=_.mime_type||"",Y=J6(X),j=L2(_.uri);return Q`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(G)=>G.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Y}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${Z&&Q`<div class="resource-link-description">${Z}</div>`}
                <div class="resource-link-meta">
                    ${X&&Q`<span>${X}</span>`}
                    ${J&&Q`<span>${J}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function Z6({block:_}){let[$,Z]=v(!1),J=_.uri||"Embedded resource",X=_.text||"",Y=Boolean(_.data),j=_.mime_type||"";return Q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(G)=>{G.preventDefault(),G.stopPropagation(),Z(!$)}}>
                ${$?"▼":"▶"} ${J}
            </button>
            ${$&&Q`
                ${X&&Q`<pre class="resource-embed-content">${X}</pre>`}
                ${Y&&Q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&Q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(G)=>{G.preventDefault(),G.stopPropagation();let V=new Blob([Uint8Array.from(atob(_.data),(H)=>H.charCodeAt(0))],{type:j||"application/octet-stream"}),O=URL.createObjectURL(V),W=document.createElement("a");W.href=O,W.download=J.split("/").pop()||"resource",W.click(),URL.revokeObjectURL(O)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function J6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function Y6({preview:_}){let $=L2(_.url),Z=L2(_.image,{allowDataImage:!0}),J=Z?`background-image: url('${Z}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return Q`
        <a
            href=${$||"#"}
            class="link-preview ${Z?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${J}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${X||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&Q`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function X6(_,$){return typeof _==="string"?_:""}var W6=1800,j6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,K6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,G6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function V6(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let Z=document.createElement("textarea");Z.value=$,Z.setAttribute("readonly",""),Z.style.position="fixed",Z.style.opacity="0",Z.style.pointerEvents="none",document.body.appendChild(Z),Z.select(),Z.setSelectionRange(0,Z.value.length);let J=document.execCommand("copy");return document.body.removeChild(Z),J}catch{return!1}}function N6(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let Z=new Map,J=[],X=(Y,j)=>{let G=j||"idle";if(Y.dataset.copyState=G,G==="success")Y.innerHTML=K6,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(G==="error")Y.innerHTML=G6,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=j6,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let j=document.createElement("div");j.className="post-code-block",Y.parentNode?.insertBefore(j,Y),j.appendChild(Y);let G=document.createElement("button");G.type="button",G.className="post-code-copy-btn",X(G,"idle"),j.appendChild(G);let V=async(O)=>{O.preventDefault(),O.stopPropagation();let H=Y.querySelector("code")?.textContent||"",E=await V6(H);X(G,E?"success":"error");let D=Z.get(G);if(D)clearTimeout(D);let C=setTimeout(()=>{X(G,"idle"),Z.delete(G)},W6);Z.set(G,C)};G.addEventListener("click",V),J.push(()=>{G.removeEventListener("click",V);let O=Z.get(G);if(O)clearTimeout(O);if(j.parentNode)j.parentNode.insertBefore(Y,j),j.remove()})}),()=>{J.forEach((Y)=>Y())}}function O6(_){if(!_)return{content:_,fileRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Files:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,fileRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O))X.push(O.replace(/^\s*-\s+/,"").trim());else if(!O.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=Z.slice(0,J),G=Z.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,fileRefs:X}}function B6(_){if(!_)return{content:_,messageRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Referenced messages:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,messageRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let H=O.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(H)X.push(H[1])}else if(!O.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=Z.slice(0,J),G=Z.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,messageRefs:X}}function q6(_){if(!_)return{content:_,attachments:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Images:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,attachments:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let W=O.replace(/^\s*-\s+/,"").trim(),H=W.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||W.match(/^attachment:([^\s]+)\s+(.+)$/i);if(H){let E=H[1],D=(H[2]||"").trim()||E;X.push({id:E,label:D,raw:W})}else X.push({id:null,label:W,raw:W})}else if(!O.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=Z.slice(0,J),G=Z.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,attachments:X}}function Q6(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function z6(_,$){if(!_||!$)return _;let Z=String($).trim().split(/\s+/).filter(Boolean);if(Z.length===0)return _;let J=Z.map(Q6).sort((W,H)=>H.length-W.length),X=new RegExp(`(${J.join("|")})`,"gi"),Y=new RegExp(`^(${J.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),G=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),V=[],O;while(O=G.nextNode())V.push(O);for(let W of V){let H=W.nodeValue;if(!H||!X.test(H)){X.lastIndex=0;continue}X.lastIndex=0;let E=W.parentElement;if(E&&E.closest("code, pre, script, style"))continue;let D=H.split(X).filter((w)=>w!=="");if(D.length===0)continue;let C=j.createDocumentFragment();for(let w of D)if(Y.test(w)){let T=j.createElement("mark");T.className="search-highlight-term",T.textContent=w,C.appendChild(T)}else C.appendChild(j.createTextNode(w));W.parentNode.replaceChild(C,W)}return j.body.innerHTML}function C4({post:_,onClick:$,onHashtagClick:Z,onMessageRef:J,onScrollToMessage:X,agentName:Y,agentAvatarUrl:j,userName:G,userAvatarUrl:V,userAvatarBackground:O,onDelete:W,isThreadReply:H,isThreadPrev:E,isThreadNext:D,isRemoving:C,highlightQuery:w,onFileRef:T}){let[U,b]=v(null),g=L(null),y=_.data,f=y.type==="agent_response",i=G||"You",n=f?Y||Q4:i,Y_=f?x1(Y,j):x1(i,V),O_=typeof O==="string"?O.trim().toLowerCase():"",$_=!f&&Y_.image&&(O_==="clear"||O_==="transparent"),G_=f&&Boolean(Y_.image),P_=`background-color: ${$_||G_?"transparent":Y_.color}`,p=y.content_meta,J_=Boolean(p?.truncated),l=Boolean(p?.preview),s=J_&&!l,e=J_?{originalLength:Number.isFinite(p?.original_length)?p.original_length:y.content?y.content.length:0,maxLength:Number.isFinite(p?.max_length)?p.max_length:0}:null,V_=X6(y.content,y.link_previews),{content:X_,fileRefs:A_}=O6(V_),{content:Z_,messageRefs:N_}=B6(X_),{content:L_,attachments:q_}=q6(Z_);V_=L_;let M_=Boolean(V_)&&!s,B_=typeof w==="string"?w.trim():"",z_=y0(()=>{if(!V_)return"";let P=F2(V_,Z);return B_?z6(P,B_):P},[V_,B_]),f_=(P,__)=>{P.stopPropagation(),b(Q2(__))},S_=(P)=>{P.stopPropagation(),W?.(_)},w_=(P,__)=>{let C_=new Set;if(!P||__.length===0)return{content:P,usedIds:C_};return{content:P.replace(/attachment:([^\s)"']+)/g,(R_,P0,u0,o_)=>{let Y0=P0.replace(/^\/+/,""),X0=__.find((g_)=>g_.name&&g_.name.toLowerCase()===Y0.toLowerCase()&&!C_.has(g_.id))||__.find((g_)=>!C_.has(g_.id));if(!X0)return R_;if(C_.add(X0.id),o_.slice(Math.max(0,u0-2),u0)==="](")return`/media/${X0.id}`;return X0.name||"attachment"}),usedIds:C_}},T_=[],k_=[],v_=[],s_=[],U_=[],H_=[],O0=y.content_blocks||[],_0=y.media_ids||[],B0=0;if(O0.length>0)O0.forEach((P)=>{if(P?.type==="text"&&P.annotations)H_.push(P.annotations);if(P?.type==="resource_link")s_.push(P);else if(P?.type==="resource")U_.push(P);else if(P?.type==="file"){let __=_0[B0++];if(__)k_.push(__),v_.push({id:__,name:P?.name||P?.filename||P?.title})}else if(P?.type==="image"||!P?.type){let __=_0[B0++];if(__){let C_=typeof P?.mime_type==="string"?P.mime_type:void 0;T_.push({id:__,annotations:P?.annotations,mimeType:C_}),v_.push({id:__,name:P?.name||P?.filename||P?.title})}}});else if(_0.length>0)_0.forEach((P)=>{T_.push({id:P,annotations:null}),v_.push({id:P,name:null})});if(q_.length>0)q_.forEach((P)=>{if(!P?.id)return;let __=v_.find((C_)=>String(C_.id)===String(P.id));if(__&&!__.name)__.name=P.label});let{content:R0,usedIds:q0}=w_(V_,v_);V_=R0;let F_=T_.filter(({id:P})=>!q0.has(P)),L0=k_.filter((P)=>!q0.has(P)),Q0=q_.length>0?q_.map((P,__)=>({id:P.id||`attachment-${__+1}`,label:P.label||`attachment-${__+1}`})):v_.map((P,__)=>({id:P.id,label:P.name||`attachment-${__+1}`}));return m(()=>{if(!g.current)return;return t2(g.current),N6(g.current)},[z_]),Q`
        <div id=${`post-${_.id}`} class="post ${f?"agent-post":""} ${H?"thread-reply":""} ${E?"thread-prev":""} ${D?"thread-next":""} ${C?"removing":""}" onClick=${$}>
            <div class="post-avatar ${f?"agent-avatar":""} ${Y_.image?"has-image":""}" style=${P_}>
                ${Y_.image?Q`<img src=${Y_.image} alt=${n} />`:Y_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${S_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${n}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(P)=>{if(P.preventDefault(),P.stopPropagation(),J)J(_.id)}}>${D4(_.timestamp)}</a>
                </div>
                ${s&&e&&Q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${b2(e.originalLength)} chars
                            ${e.maxLength?Q` • Display limit: ${b2(e.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${l&&e&&Q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${b2(e.maxLength)} of ${b2(e.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(A_.length>0||N_.length>0||Q0.length>0)&&Q`
                    <div class="post-file-refs">
                        ${N_.map((P)=>{let __=(C_)=>{if(C_.preventDefault(),C_.stopPropagation(),X)X(P);else{let J0=document.getElementById("post-"+P);if(J0)J0.scrollIntoView({behavior:"smooth",block:"center"}),J0.classList.add("post-highlight"),setTimeout(()=>J0.classList.remove("post-highlight"),2000)}};return Q`
                                <a href=${`#msg-${P}`} class="post-msg-pill-link" onClick=${__}>
                                    <${t0}
                                        prefix="post"
                                        label=${"msg:"+P}
                                        title=${"Message "+P}
                                        icon="message"
                                        onClick=${__}
                                    />
                                </a>
                            `})}
                        ${A_.map((P)=>{let __=P.split("/").pop()||P;return Q`
                                <${t0}
                                    prefix="post"
                                    label=${__}
                                    title=${P}
                                    onClick=${()=>T?.(P)}
                                />
                            `})}
                        ${Q0.map((P)=>Q`
                            <${t0}
                                prefix="post"
                                label=${P.label}
                                title=${P.label}
                            />
                        `)}
                    </div>
                `}
                ${M_&&Q`
                    <div 
                        ref=${g}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:z_}}
                        onClick=${(P)=>{if(P.target.classList.contains("hashtag")){P.preventDefault(),P.stopPropagation();let __=P.target.dataset.hashtag;if(__)Z?.(__)}else if(P.target.tagName==="IMG")P.preventDefault(),P.stopPropagation(),b(P.target.src)}}
                    />
                `}
                ${H_.length>0&&Q`
                    ${H_.map((P,__)=>Q`
                        <${_1} key=${__} annotations=${P} />
                    `)}
                `}
                ${F_.length>0&&Q`
                    <div class="media-preview">
                        ${F_.map(({id:P,mimeType:__})=>{let J0=typeof __==="string"&&__.toLowerCase().startsWith("image/svg")?Q2(P):h3(P);return Q`
                                <img 
                                    key=${P} 
                                    src=${J0} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(R_)=>f_(R_,P)}
                                />
                            `})}
                    </div>
                `}
                ${F_.length>0&&Q`
                    ${F_.map(({annotations:P},__)=>Q`
                        ${P&&Q`<${_1} key=${__} annotations=${P} />`}
                    `)}
                `}
                ${L0.length>0&&Q`
                    <div class="file-attachments">
                        ${L0.map((P)=>Q`
                            <${_6} key=${P} mediaId=${P} />
                        `)}
                    </div>
                `}
                ${s_.length>0&&Q`
                    <div class="resource-links">
                        ${s_.map((P,__)=>Q`
                            <div key=${__}>
                                <${$6} block=${P} />
                                <${_1} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${U_.length>0&&Q`
                    <div class="resource-embeds">
                        ${U_.map((P,__)=>Q`
                            <div key=${__}>
                                <${Z6} block=${P} />
                                <${_1} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${y.link_previews?.length>0&&Q`
                    <div class="link-previews">
                        ${y.link_previews.map((P,__)=>Q`
                            <${Y6} key=${__} preview=${P} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${U&&Q`<${k4} src=${U} onClose=${()=>b(null)} />`}
    `}function y4({posts:_,hasMore:$,onLoadMore:Z,onPostClick:J,onHashtagClick:X,onMessageRef:Y,onScrollToMessage:j,onFileRef:G,emptyMessage:V,timelineRef:O,agents:W,user:H,onDeletePost:E,reverse:D=!0,removingPostIds:C,searchQuery:w}){let[T,U]=v(!1),b=L(null),g=typeof IntersectionObserver<"u",y=S(async()=>{if(!Z||!$||T)return;U(!0);try{await Z({preserveScroll:!0,preserveMode:"top"})}finally{U(!1)}},[$,T,Z]),f=S((p)=>{let{scrollTop:J_,scrollHeight:l,clientHeight:s}=p.target,e=D?l-s-J_:J_,V_=Math.max(300,s);if(e<V_)y()},[D,y]);m(()=>{if(!g)return;let p=b.current,J_=O?.current;if(!p||!J_)return;let l=300,s=new IntersectionObserver((e)=>{for(let V_ of e){if(!V_.isIntersecting)continue;y()}},{root:J_,rootMargin:`${l}px 0px ${l}px 0px`,threshold:0});return s.observe(p),()=>s.disconnect()},[g,$,Z,O,y]);let i=L(y);if(i.current=y,m(()=>{if(g)return;if(!O?.current)return;let{scrollTop:p,scrollHeight:J_,clientHeight:l}=O.current,s=D?J_-l-p:p,e=Math.max(300,l);if(s<e)i.current?.()},[g,_,$,D,O]),m(()=>{if(!O?.current)return;if(!$||T)return;let{scrollTop:p,scrollHeight:J_,clientHeight:l}=O.current,s=D?J_-l-p:p,e=Math.max(300,l);if(J_<=l+1||s<e)i.current?.()},[_,$,T,D,O]),!_)return Q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return Q`
            <div class="timeline" ref=${O}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${V||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let n=_.slice().sort((p,J_)=>p.id-J_.id),Y_=(p)=>{let J_=p?.data?.thread_id;if(J_===null||J_===void 0||J_==="")return null;let l=Number(J_);return Number.isFinite(l)?l:null},O_=new Map;for(let p=0;p<n.length;p+=1){let J_=n[p],l=Number(J_?.id),s=Y_(J_);if(s!==null){let e=O_.get(s)||{anchorIndex:-1,replyIndexes:[]};e.replyIndexes.push(p),O_.set(s,e)}else if(Number.isFinite(l)){let e=O_.get(l)||{anchorIndex:-1,replyIndexes:[]};e.anchorIndex=p,O_.set(l,e)}}let $_=new Map;for(let[p,J_]of O_.entries()){let l=new Set;if(J_.anchorIndex>=0)l.add(J_.anchorIndex);for(let s of J_.replyIndexes)l.add(s);$_.set(p,Array.from(l).sort((s,e)=>s-e))}let G_=n.map((p,J_)=>{let l=Y_(p);if(l===null)return{hasThreadPrev:!1,hasThreadNext:!1};let s=$_.get(l);if(!s||s.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let e=s.indexOf(J_);if(e<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:e>0,hasThreadNext:e<s.length-1}}),P_=Q`<div class="timeline-sentinel" ref=${b}></div>`;return Q`
        <div class="timeline ${D?"reverse":"normal"}" ref=${O} onScroll=${f}>
            <div class="timeline-content">
                ${D?P_:null}
                ${n.map((p,J_)=>{let l=Boolean(p.data?.thread_id&&p.data.thread_id!==p.id),s=C?.has?.(p.id),e=G_[J_]||{};return Q`
                    <${C4}
                        key=${p.id}
                        post=${p}
                        isThreadReply=${l}
                        isThreadPrev=${e.hasThreadPrev}
                        isThreadNext=${e.hasThreadNext}
                        isRemoving=${s}
                        highlightQuery=${w}
                        agentName=${z4(p.data?.agent_id,W||{})}
                        agentAvatarUrl=${U4(p.data?.agent_id,W||{})}
                        userName=${H?.name||H?.user_name}
                        userAvatarUrl=${H?.avatar_url||H?.avatarUrl||H?.avatar}
                        userAvatarBackground=${H?.avatar_background||H?.avatarBackground}
                        onClick=${()=>J?.(p)}
                        onHashtagClick=${X}
                        onMessageRef=${Y}
                        onScrollToMessage=${j}
                        onFileRef=${G}
                        onDelete=${E}
                    />
                `})}
                ${D?null:P_}
            </div>
        </div>
    `}class A4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,Z=-1/0;for(let J of this.extensions.values()){if(J.placement!=="tabs")continue;if(!J.canHandle)continue;try{let X=J.canHandle(_);if(X===!1||X===0)continue;let Y=X===!0?0:typeof X==="number"?X:0;if(Y>Z)Z=Y,$=J}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${J.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var n_=new A4;var $1=null,I1=null;function w4(){if(I1)return Promise.resolve(I1);if(!$1)$1=import("/static/dist/editor.bundle.js").then((_)=>{return I1=_,_}).catch((_)=>{throw $1=null,_});return $1}class b4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await w4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var T1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new b4(_,$)}};function f1(){w4().catch(()=>{})}class P4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let Z=document.createElement("div");Z.className="terminal-pane-header";let J=document.createElement("span");J.className="terminal-pane-title",J.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",Z.append(J,X);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(Z,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var v1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new P4(_,$)}};function M4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function U6(_,$){let Z=String(_||"").trim();if(!Z)return Z;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(Z)||Z.startsWith("#")||Z.startsWith("data:")||Z.startsWith("blob:"))return Z;let J=Z.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=J?.[1]||Z,Y=J?.[2]||"",j=J?.[3]||"",G=String($||"").split("/").slice(0,-1).join("/"),O=X.startsWith("/")?X:`${G?`${G}/`:""}${X}`,W=[];for(let E of O.split("/")){if(!E||E===".")continue;if(E===".."){if(W.length>0)W.pop();continue}W.push(E)}let H=W.join("/");return`${y1(H)}${Y}${j}`}function P2(_){return _?.preview||null}function H6(_){let $=P2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let Z=$.url||($.path?y1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${M4(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${F2($.text||"",null,{rewriteImageSrc:(J)=>U6(J,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${M4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class R1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=H6(this.context)}getContent(){let _=P2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let Z=P2(this.context);if(Z&&Z.kind==="text"){if(Z.text=_,$!==void 0)Z.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var u1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=P2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new R1(_,$)}},g1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return P2(_)||_?.path?1:!1},mount(_,$){return new R1(_,$)}};class S4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let Z of this.listeners)try{Z(_,$)}catch{}}open(_,$){let Z=this.tabs.get(_);if(!Z)Z={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,Z);return this.activate(_),Z}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,Z]of this.tabs)if($!==_&&!Z.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((J)=>J!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let Z=this.tabs.get(_);if(!Z||Z.dirty===$)return;Z.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let Z=this.tabs.get(_);if(Z)Z.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,Z){let J=this.tabs.get(_);if(!J)return;if(this.tabs.delete(_),J.id=$,J.path=$,J.label=Z||$.split("/").pop()||$,this.tabs.set($,J),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($+1)%_.length];this.activate(Z.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($-1+_.length)%_.length];this.activate(Z.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var D_=new S4;var Z1="workspaceExplorerScale",L6=["compact","default","comfortable"],F6=new Set(L6),E6={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function x4(_,$="default"){if(typeof _!=="string")return $;let Z=_.trim().toLowerCase();return F6.has(Z)?Z:$}function c1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),Z=Boolean(window.matchMedia?.("(hover: none)")?.matches),J=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||J&&Z}}function D6(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function k6(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function m1(_={}){let $=D6(_),Z=_.stored?x4(_.stored,$):$;return k6(Z,_)}function I4(_){return E6[x4(_)]}var C6=60000,R4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function u4(_,$,Z,J=0,X=[]){if(!Z&&R4(_))return X;if(!_)return X;if(X.push({node:_,depth:J}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)u4(Y,$,Z,J+1,X);return X}function T4(_,$,Z){if(!_)return"";let J=[],X=(Y)=>{if(!Z&&R4(Y))return;if(J.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let j of Y.children)X(j)};return X(_),J.join("|")}function l1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let Z=Array.isArray(_.children)?_.children:null,J=Array.isArray($.children)?$.children:null;if(!J)return _;let X=Z?new Map(Z.map((G)=>[G?.path,G])):new Map,Y=!Z||Z.length!==J.length,j=J.map((G)=>{let V=l1(X.get(G.path),G);if(V!==X.get(G.path))Y=!0;return V});return Y?{...$,children:j}:_}function p1(_,$,Z){if(!_)return _;if(_.path===$)return l1(_,Z);if(!Array.isArray(_.children))return _;let J=!1,X=_.children.map((Y)=>{let j=p1(Y,$,Z);if(j!==Y)J=!0;return j});return J?{..._,children:X}:_}var g4=4,h1=14,y6=8,A6=16;function c4(_){if(!_)return 0;if(_.type==="file"){let J=Math.max(0,Number(_.size)||0);return _.__bytes=J,J}let $=Array.isArray(_.children)?_.children:[],Z=0;for(let J of $)Z+=c4(J);return _.__bytes=Z,Z}function m4(_,$=0){let Z=Math.max(0,Number(_?.__bytes??_?.size??0)),J={name:_?.name||_?.path||".",path:_?.path||".",size:Z,children:[]};if(!_||_.type!=="dir"||$>=g4)return J;let X=Array.isArray(_.children)?_.children:[],Y=[];for(let G of X){let V=Math.max(0,Number(G?.__bytes??G?.size??0));if(V<=0)continue;if(G.type==="dir")Y.push({kind:"dir",node:G,size:V});else Y.push({kind:"file",name:G.name,path:G.path,size:V})}Y.sort((G,V)=>V.size-G.size);let j=Y;if(Y.length>h1){let G=Y.slice(0,h1-1),V=Y.slice(h1-1),O=V.reduce((W,H)=>W+H.size,0);G.push({kind:"other",name:`+${V.length} more`,path:`${J.path}/[other]`,size:O}),j=G}return J.children=j.map((G)=>{if(G.kind==="dir")return m4(G.node,$+1);return{name:G.name,path:G.path,size:G.size,children:[]}}),J}function f4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function h4(_,$,Z){let J=((_+Math.PI/2)*180/Math.PI+360)%360,X=Z?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=Z?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${J.toFixed(1)} ${X}% ${Y}%)`}function J1(_,$,Z,J){return{x:_+Z*Math.cos(J),y:$+Z*Math.sin(J)}}function n1(_,$,Z,J,X,Y){let j=Math.PI*2-0.0001,G=Y-X>j?X+j:Y,V=J1(_,$,J,X),O=J1(_,$,J,G),W=J1(_,$,Z,G),H=J1(_,$,Z,X),E=G-X>Math.PI?1:0;return[`M ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${J} ${J} 0 ${E} 1 ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`L ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${E} 0 ${H.x.toFixed(3)} ${H.y.toFixed(3)}`,"Z"].join(" ")}var p4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function i4(_,$,Z){let J=[],X=[],Y=Math.max(0,Number($)||0),j=(G,V,O,W)=>{let H=Array.isArray(G?.children)?G.children:[];if(!H.length)return;let E=Math.max(0,Number(G.size)||0);if(E<=0)return;let D=O-V,C=V;H.forEach((w,T)=>{let U=Math.max(0,Number(w.size)||0);if(U<=0)return;let b=U/E,g=C,y=T===H.length-1?O:C+D*b;if(C=y,y-g<0.003)return;let f=p4[W];if(f){let i=h4(g,W,Z);if(J.push({key:w.path,path:w.path,label:w.name,size:U,color:i,depth:W,startAngle:g,endAngle:y,innerRadius:f[0],outerRadius:f[1],d:n1(120,120,f[0],f[1],g,y)}),W===1)X.push({key:w.path,name:w.name,size:U,pct:Y>0?U/Y*100:0,color:i})}if(W<g4)j(w,g,y,W+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:J,legend:X}}function i1(_,$){if(!_||!$)return null;if(_.path===$)return _;let Z=Array.isArray(_.children)?_.children:[];for(let J of Z){let X=i1(J,$);if(X)return X}return null}function l4(_,$,Z,J){if(!Z||Z<=0)return{segments:[],legend:[]};let X=p4[1];if(!X)return{segments:[],legend:[]};let Y=-Math.PI/2,j=Math.PI*3/2,G=h4(Y,1,J),O=`${$||"."}/[files]`;return{segments:[{key:O,path:O,label:_,size:Z,color:G,depth:1,startAngle:Y,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:n1(120,120,X[0],X[1],Y,j)}],legend:[{key:O,name:_,size:Z,pct:100,color:G}]}}function v4(_,$=!1,Z=!1){if(!_)return null;let J=c4(_),X=m4(_,0),Y=X.size||J,{segments:j,legend:G}=i4(X,Y,Z);if(!j.length&&Y>0){let V=l4("[files]",X.path,Y,Z);j=V.segments,G=V.legend}return{root:X,totalSize:Y,segments:j,legend:G,truncated:$,isDarkTheme:Z}}function w6({payload:_}){if(!_)return null;let[$,Z]=v(null),[J,X]=v(_?.root?.path||"."),[Y,j]=v(()=>[_?.root?.path||"."]),[G,V]=v(!1);m(()=>{let $_=_?.root?.path||".";X($_),j([$_]),Z(null)},[_?.root?.path,_?.totalSize]),m(()=>{if(!J)return;V(!0);let $_=setTimeout(()=>V(!1),180);return()=>clearTimeout($_)},[J]);let O=y0(()=>{return i1(_.root,J)||_.root},[_?.root,J]),W=O?.size||_.totalSize||0,{segments:H,legend:E}=y0(()=>{let $_=i4(O,W,_.isDarkTheme);if($_.segments.length>0)return $_;if(W<=0)return $_;let G_=O?.children?.length?"Total":"[files]";return l4(G_,O?.path||_?.root?.path||".",W,_.isDarkTheme)},[O,W,_.isDarkTheme,_?.root?.path]),[D,C]=v(H),w=L(new Map),T=L(0);m(()=>{let $_=w.current,G_=new Map(H.map((l)=>[l.key,l])),P_=performance.now(),p=220,J_=(l)=>{let s=Math.min(1,(l-P_)/220),e=s*(2-s),V_=H.map((X_)=>{let Z_=$_.get(X_.key)||{startAngle:X_.startAngle,endAngle:X_.startAngle,innerRadius:X_.innerRadius,outerRadius:X_.innerRadius},N_=(z_,f_)=>z_+(f_-z_)*e,L_=N_(Z_.startAngle,X_.startAngle),q_=N_(Z_.endAngle,X_.endAngle),M_=N_(Z_.innerRadius,X_.innerRadius),B_=N_(Z_.outerRadius,X_.outerRadius);return{...X_,d:n1(120,120,M_,B_,L_,q_)}});if(C(V_),s<1)T.current=requestAnimationFrame(J_)};if(T.current)cancelAnimationFrame(T.current);return T.current=requestAnimationFrame(J_),w.current=G_,()=>{if(T.current)cancelAnimationFrame(T.current)}},[H]);let U=D.length?D:H,b=W>0?p0(W):"0 B",g=O?.name||"",f=(g&&g!=="."?g:"Total")||"Total",i=b,n=Y.length>1,Y_=($_)=>{if(!$_?.path)return;let G_=i1(_.root,$_.path);if(!G_||!Array.isArray(G_.children)||G_.children.length===0)return;j((P_)=>[...P_,G_.path]),X(G_.path),Z(null)},O_=()=>{if(!n)return;j(($_)=>{let G_=$_.slice(0,-1);return X(G_[G_.length-1]||_?.root?.path||"."),G_}),Z(null)};return Q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${G?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${O?.path||_?.root?.path||"."}`}
                data-segments=${U.length}
                data-base-size=${W}>
                ${U.map(($_)=>Q`
                    <path
                        key=${$_.key}
                        d=${$_.d}
                        fill=${$_.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===$_.key?" is-hovered":""}`}
                        onMouseEnter=${()=>Z($_)}
                        onMouseLeave=${()=>Z(null)}
                        onTouchStart=${()=>Z($_)}
                        onTouchEnd=${()=>Z(null)}
                        onClick=${()=>Y_($_)}
                    >
                        <title>${$_.label} — ${p0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${n?" is-drill":""}`}
                    onClick=${O_}
                    role="button"
                    aria-label="Zoom out"
                >
                    <circle
                        cx="120"
                        cy="120"
                        r="24"
                        fill="var(--bg-secondary)"
                        stroke="var(--border-color)"
                        stroke-width="1"
                        class="workspace-folder-starburst-center"
                    />
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${f}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${i}</text>
                </g>
            </svg>
            ${E.length>0&&Q`
                <div class="workspace-folder-starburst-legend">
                    ${E.slice(0,8).map(($_)=>Q`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${p0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&Q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function b6({mediaId:_}){let[$,Z]=v(null);if(m(()=>{if(!_)return;p2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size?p0($.metadata.size):"";return Q`
        <a href=${Q2(_)} download=${J} class="file-attachment"
            onClick=${(Y)=>Y.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${X&&Q`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function n4({onFileSelect:_,visible:$=!0,active:Z=void 0,onOpenEditor:J}){let[X,Y]=v(null),[j,G]=v(new Set(["."])),[V,O]=v(null),[W,H]=v(null),[E,D]=v(""),[C,w]=v(null),[T,U]=v(null),[b,g]=v(!0),[y,f]=v(!1),[i,n]=v(null),[Y_,O_]=v(()=>z2("workspaceShowHidden",!1)),[$_,G_]=v(!1),[P_,p]=v(null),[J_,l]=v(null),[s,e]=v(null),[V_,X_]=v(!1),[A_,Z_]=v(null),[N_,L_]=v(()=>f4()),[q_,M_]=v(()=>m1({stored:v0(Z1),...c1()})),B_=L(j),z_=L(""),f_=L(null),S_=L(0),w_=L(new Set),T_=L(null),k_=L(new Map),v_=L(_),s_=L(J),U_=L(null),H_=L(null),O0=L(null),_0=L(null),B0=L(null),R0=L(null),q0=L("."),F_=L(null),L0=L({path:null,dragging:!1,startX:0,startY:0}),Q0=L({path:null,dragging:!1,startX:0,startY:0}),P=L({path:null,timer:0}),__=L(!1),C_=L(0),J0=L(new Map),R_=L(null),P0=L(null),u0=L(null),o_=L(null),Y0=L(Y_),u_=L($),X0=L(Z??$),$0=L(0),g_=L(s),i0=L($_),e0=L(P_),l0=L(null),_2=L({x:0,y:0}),K0=L(0),M0=L(null),A0=L(V),F0=L(W),c_=L(null),z0=L(null),$2=L(C);v_.current=_,s_.current=J,m(()=>{B_.current=j},[j]),m(()=>{Y0.current=Y_},[Y_]),m(()=>{u_.current=$},[$]),m(()=>{X0.current=Z??$},[Z,$]),m(()=>{g_.current=s},[s]),m(()=>{if(typeof window>"u")return;let K=()=>{M_(m1({stored:v0(Z1),...c1()}))};K();let q=()=>K(),F=()=>K(),k=(c)=>{if(!c||c.key===null||c.key===Z1)K()};window.addEventListener("resize",q),window.addEventListener("focus",F),window.addEventListener("storage",k);let R=window.matchMedia?.("(pointer: coarse)"),o=window.matchMedia?.("(hover: none)"),d=(c,W_)=>{if(!c)return;if(c.addEventListener)c.addEventListener("change",W_);else if(c.addListener)c.addListener(W_)},r=(c,W_)=>{if(!c)return;if(c.removeEventListener)c.removeEventListener("change",W_);else if(c.removeListener)c.removeListener(W_)};return d(R,q),d(o,q),()=>{window.removeEventListener("resize",q),window.removeEventListener("focus",F),window.removeEventListener("storage",k),r(R,q),r(o,q)}},[]),m(()=>{let K=(q)=>{let F=q?.detail?.path;if(!F)return;let k=F.split("/"),R=[];for(let o=1;o<k.length;o++)R.push(k.slice(0,o).join("/"));if(R.length)G((o)=>{let d=new Set(o);d.add(".");for(let r of R)d.add(r);return d});O(F),requestAnimationFrame(()=>{let o=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(o)o.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),m(()=>{i0.current=$_},[$_]),m(()=>{e0.current=P_},[P_]),m(()=>{A0.current=V},[V]),m(()=>{F0.current=W},[W]),m(()=>{$2.current=C},[C]),m(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>L_(f4());K();let q=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>K();if(q?.addEventListener)q.addEventListener("change",F);else if(q?.addListener)q.addListener(F);let k=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(k?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)k?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(q?.removeEventListener)q.removeEventListener("change",F);else if(q?.removeListener)q.removeListener(F);k?.disconnect()}},[]),m(()=>{if(!W)return;let K=B0.current;if(!K)return;let q=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(q)},[W]);let Z2=async(K)=>{f(!0),w(null),U(null);try{let q=await p3(K,20000);w(q)}catch(q){w({error:q.message||"Failed to load preview"})}finally{f(!1)}};U_.current=Z2;let n0=async()=>{if(!u_.current)return;try{let K=await i2("",1,Y0.current),q=T4(K.root,B_.current,Y0.current);if(q===z_.current){g(!1);return}if(z_.current=q,f_.current=K.root,!S_.current)S_.current=requestAnimationFrame(()=>{S_.current=0,Y((F)=>l1(F,f_.current)),g(!1)})}catch(K){n(K.message||"Failed to load workspace"),g(!1)}},E2=async(K)=>{if(!K)return;if(w_.current.has(K))return;w_.current.add(K);try{let q=await i2(K,1,Y0.current);Y((F)=>p1(F,K,q.root))}catch(q){n(q.message||"Failed to load workspace")}finally{w_.current.delete(K)}};H_.current=E2;let m_=S(()=>{let K=V;if(!K)return".";let q=k_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[V]),E0=S((K)=>{let q=K?.closest?.(".workspace-row");if(!q)return null;let F=q.dataset.path,k=q.dataset.type;if(!F)return null;if(k==="dir")return F;if(F.includes("/")){let R=F.split("/");return R.pop(),R.join("/")||"."}return"."},[]),W0=S((K)=>{return E0(K?.target||null)},[E0]),a_=S((K)=>{g_.current=K,e(K)},[]),b_=S(()=>{let K=P.current;if(K?.timer)clearTimeout(K.timer);P.current={path:null,timer:0}},[]),h_=S((K)=>{if(!K||K==="."){b_();return}let q=k_.current?.get(K);if(!q||q.type!=="dir"){b_();return}if(B_.current?.has(K)){b_();return}if(P.current?.path===K)return;b_();let F=setTimeout(()=>{P.current={path:null,timer:0},H_.current?.(K),G((k)=>{let R=new Set(k);return R.add(K),R})},600);P.current={path:K,timer:F}},[b_]),U0=S((K,q)=>{if(_2.current={x:K,y:q},K0.current)return;K0.current=requestAnimationFrame(()=>{K0.current=0;let F=l0.current;if(!F)return;let k=_2.current;F.style.transform=`translate(${k.x+12}px, ${k.y+12}px)`})},[]),S0=S((K)=>{if(!K)return;let F=(k_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F)return;l({path:K,label:F})},[]),w0=S(()=>{if(l(null),K0.current)cancelAnimationFrame(K0.current),K0.current=0;if(l0.current)l0.current.style.transform="translate(-9999px, -9999px)"},[]),g0=S((K)=>{if(!K)return".";let q=k_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[]),G0=S(()=>{H(null),D("")},[]),x0=S((K)=>{if(!K)return;let F=(k_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F||K===".")return;H(K),D(F)},[]),o0=S(async()=>{let K=F0.current;if(!K)return;let q=(E||"").trim();if(!q){G0();return}let F=k_.current?.get(K),k=(F?.name||K.split("/").pop()||K).trim();if(q===k){G0();return}try{let o=(await n3(K,q))?.path||K,d=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(G0(),n(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:o,type:F?.type||"file"}})),F?.type==="dir")G((r)=>{let c=new Set;for(let W_ of r)if(W_===K)c.add(o);else if(W_.startsWith(`${K}/`))c.add(`${o}${W_.slice(K.length)}`);else c.add(W_);return c});if(O(o),F?.type==="dir")w(null),f(!1),U(null);else U_.current?.(o);H_.current?.(d)}catch(R){n(R?.message||"Failed to rename file")}},[G0,E]),d0=S(async(K)=>{let k=K||".";for(let R=0;R<50;R+=1){let d=`untitled${R===0?"":`-${R}`}.md`;try{let c=(await l3(k,d,""))?.path||(k==="."?d:`${k}/${d}`);if(k&&k!==".")G((W_)=>new Set([...W_,k]));O(c),n(null),H_.current?.(k),U_.current?.(c);return}catch(r){if(r?.status===409||r?.code==="file_exists")continue;n(r?.message||"Failed to create file");return}}n("Failed to create file (untitled name already in use).")},[]),c0=S((K)=>{if(K?.stopPropagation?.(),V_)return;let q=g0(A0.current);d0(q)},[V_,g0,d0]);m(()=>{if(typeof window>"u")return;let K=(q)=>{let F=q?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;Y((r)=>{let c=r;for(let W_ of F){if(!W_?.root)continue;if(!c||W_.path==="."||!W_.path)c=W_.root;else c=p1(c,W_.path,W_.root)}if(c)z_.current=T4(c,B_.current,Y0.current);return g(!1),c});let k=A0.current;if(Boolean(k)&&F.some((r)=>{let c=r?.path||"";if(!c||c===".")return!0;return k===c||k.startsWith(`${c}/`)||c.startsWith(`${k}/`)}))J0.current.clear();if(!k||!$2.current)return;let o=k_.current?.get(k);if(o&&o.type==="dir")return;if(F.some((r)=>{let c=r?.path||"";if(!c||c===".")return!0;return k===c||k.startsWith(`${c}/`)}))U_.current?.(k)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),T_.current=n0;let z=L(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),q=X0.current??u_.current,F=document.visibilityState!=="hidden"&&(q||K.matches&&u_.current);l2(F,Y0.current).catch(()=>{})}).current,x=L(0),a=L(()=>{if(x.current)clearTimeout(x.current);x.current=setTimeout(()=>{x.current=0,z()},250)}).current;m(()=>{if(u_.current)T_.current?.();a()},[$,Z]),m(()=>{T_.current(),z();let K=setInterval(()=>T_.current(),C6),q=U2("previewHeight",null),F=Number.isFinite(q)?Math.min(Math.max(q,80),600):280;if(C_.current=F,O0.current)O0.current.style.setProperty("--preview-height",`${F}px`);let k=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),R=()=>a();if(k.addEventListener)k.addEventListener("change",R);else if(k.addListener)k.addListener(R);return document.addEventListener("visibilitychange",R),()=>{if(clearInterval(K),S_.current)cancelAnimationFrame(S_.current),S_.current=0;if(k.removeEventListener)k.removeEventListener("change",R);else if(k.removeListener)k.removeListener(R);if(document.removeEventListener("visibilitychange",R),x.current)clearTimeout(x.current),x.current=0;if(F_.current)clearTimeout(F_.current),F_.current=null;l2(!1,Y0.current).catch(()=>{})}},[]);let j_=y0(()=>u4(X,j,Y_),[X,j,Y_]),E_=y0(()=>new Map(j_.map((K)=>[K.node.path,K.node])),[j_]),p_=y0(()=>I4(q_),[q_]);k_.current=E_;let x_=(V?k_.current.get(V):null)?.type==="dir";m(()=>{if(!V||!x_){Z_(null),R_.current=null,P0.current=null;return}let K=V,q=`${Y_?"hidden":"visible"}:${V}`,F=J0.current,k=F.get(q);if(k?.root){F.delete(q),F.set(q,k);let d=v4(k.root,Boolean(k.truncated),N_);if(d)R_.current=d,P0.current=V,Z_({loading:!1,error:null,payload:d});return}let R=R_.current,o=P0.current;Z_({loading:!0,error:null,payload:o===V?R:null}),i2(V,y6,Y_).then((d)=>{if(A0.current!==K)return;let r={root:d?.root,truncated:Boolean(d?.truncated)};F.delete(q),F.set(q,r);while(F.size>A6){let W_=F.keys().next().value;if(!W_)break;F.delete(W_)}let c=v4(r.root,r.truncated,N_);R_.current=c,P0.current=V,Z_({loading:!1,error:null,payload:c})}).catch((d)=>{if(A0.current!==K)return;Z_({loading:!1,error:d?.message||"Failed to load folder size chart",payload:o===V?R:null})})},[V,x_,Y_,N_]);let b0=Boolean(C&&C.kind==="text"&&!x_&&(!C.size||C.size<=262144)),G2=b0?"Open in editor":C?.size>262144?"File too large to edit":"File is not editable";m(()=>{let K=u0.current;if(o_.current)o_.current.dispose(),o_.current=null;if(!K)return;if(K.innerHTML="",!V||x_||!C||C.error)return;let q={path:V,content:typeof C.text==="string"?C.text:void 0,mtime:C.mtime,size:C.size,preview:C,mode:"view"},F=n_.resolve(q)||n_.get("workspace-preview-default");if(!F)return;let k=F.mount(K,q);return o_.current=k,()=>{if(o_.current===k)k.dispose(),o_.current=null;K.innerHTML=""}},[V,x_,C]);let D0=(K)=>{let q=K?.target;if(q instanceof Element)return q;return q?.parentElement||null},J2=(K)=>{return Boolean(K?.closest?.(".workspace-node-icon, .workspace-label-text"))},V2=L((K)=>{if(z0.current)clearTimeout(z0.current),z0.current=null;let F=D0(K)?.closest?.("[data-path]");if(!F)return;let k=F.dataset.path;if(F.dataset.type==="dir"||!k)return;if(F0.current===k)G0();s_.current?.(k)}).current,t_=L((K)=>{if(__.current){__.current=!1;return}let q=D0(K),F=q?.closest?.("[data-path]");if(_0.current?.focus?.(),!F)return;let k=F.dataset.path,R=F.dataset.type,o=Boolean(q?.closest?.(".workspace-caret")),d=Boolean(q?.closest?.("button"))||Boolean(q?.closest?.("a"))||Boolean(q?.closest?.("input")),r=A0.current===k,c=F0.current;if(c){if(c===k)return;G0()}let W_=R==="file"&&c_.current===k&&!o&&!d;if(r&&!o&&!d&&k!=="."&&!W_){if(z0.current)clearTimeout(z0.current);z0.current=setTimeout(()=>{z0.current=null,x0(k)},350);return}if(R==="dir"){if(c_.current=null,O(k),w(null),U(null),f(!1),!B_.current.has(k))H_.current?.(k);if(r&&!o)return;G((m0)=>{let f0=new Set(m0);if(f0.has(k))f0.delete(k);else f0.add(k);return f0})}else{c_.current=null,O(k);let j0=k_.current.get(k);if(j0)v_.current?.(j0.path,j0);U_.current?.(k)}}).current,i_=L(()=>{z_.current="",T_.current(),Array.from(B_.current||[]).filter((q)=>q&&q!==".").forEach((q)=>H_.current?.(q))}).current,l_=L(()=>{c_.current=null,O(null),w(null),U(null),f(!1)}).current,r0=L(()=>{O_((K)=>{let q=!K;if(typeof window<"u")I_("workspaceShowHidden",String(q));return Y0.current=q,l2(!0,q).catch(()=>{}),z_.current="",T_.current?.(),Array.from(B_.current||[]).filter((k)=>k&&k!==".").forEach((k)=>H_.current?.(k)),q})}).current,V0=L((K)=>{if(D0(K)?.closest?.("[data-path]"))return;l_()}).current,d_=S(async(K)=>{if(!K)return;let q=K.split("/").pop()||K;if(!window.confirm(`Delete "${q}"? This cannot be undone.`))return;try{await d3(K);let k=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(A0.current===K)l_();H_.current?.(k),n(null)}catch(k){w((R)=>({...R||{},error:k.message||"Failed to delete file"}))}},[l_]),k0=S((K)=>{let q=_0.current;if(!q||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;q.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),N0=S((K)=>{let q=j_;if(!q||q.length===0)return;let F=V?q.findIndex((k)=>k.node.path===V):-1;if(K.key==="ArrowDown"){K.preventDefault();let k=Math.min(F+1,q.length-1),R=q[k];if(!R)return;if(O(R.node.path),R.node.type!=="dir")v_.current?.(R.node.path,R.node),U_.current?.(R.node.path);else w(null),f(!1),U(null);k0(R.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let k=F<=0?0:F-1,R=q[k];if(!R)return;if(O(R.node.path),R.node.type!=="dir")v_.current?.(R.node.path,R.node),U_.current?.(R.node.path);else w(null),f(!1),U(null);k0(R.node.path);return}if(K.key==="ArrowRight"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&!j.has(k.node.path))K.preventDefault(),H_.current?.(k.node.path),G((R)=>new Set([...R,k.node.path]));return}if(K.key==="ArrowLeft"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&j.has(k.node.path))K.preventDefault(),G((R)=>{let o=new Set(R);return o.delete(k.node.path),o});return}if(K.key==="Enter"&&F>=0){K.preventDefault();let k=q[F];if(!k)return;let R=k.node.path;if(k.node.type==="dir"){if(!B_.current.has(R))H_.current?.(R);G((d)=>{let r=new Set(d);if(r.has(R))r.delete(R);else r.add(R);return r}),w(null),U(null),f(!1)}else v_.current?.(R,k.node),U_.current?.(R);return}if((K.key==="Delete"||K.key==="Backspace")&&F>=0){let k=q[F];if(!k||k.node.type==="dir")return;K.preventDefault(),d_(k.node.path);return}if(K.key==="Escape")K.preventDefault(),l_()},[l_,d_,j,j_,k0,V]),I0=S((K)=>{let q=D0(K),F=q?.closest?.(".workspace-row");if(!F)return;let k=F.dataset.type,R=F.dataset.path;if(!R||R===".")return;if(F0.current===R)return;let o=K?.touches?.[0];if(!o)return;if(L0.current={path:J2(q)?R:null,dragging:!1,startX:o.clientX,startY:o.clientY},k!=="file")return;if(F_.current)clearTimeout(F_.current);F_.current=setTimeout(()=>{if(F_.current=null,L0.current?.dragging)return;d_(R)},600)},[d_]),Y2=S(()=>{if(F_.current)clearTimeout(F_.current),F_.current=null;let K=L0.current;if(K?.dragging&&K.path){let q=g_.current||m_(),F=M0.current;if(typeof F==="function")F(K.path,q)}L0.current={path:null,dragging:!1,startX:0,startY:0},$0.current=0,G_(!1),p(null),a_(null),b_(),w0()},[m_,w0,a_,b_]),D2=S((K)=>{let q=L0.current,F=K?.touches?.[0];if(!F||!q?.path){if(F_.current)clearTimeout(F_.current),F_.current=null;return}let k=Math.abs(F.clientX-q.startX),R=Math.abs(F.clientY-q.startY),o=k>8||R>8;if(o&&F_.current)clearTimeout(F_.current),F_.current=null;if(!q.dragging&&o)q.dragging=!0,G_(!0),p("move"),S0(q.path);if(q.dragging){K.preventDefault(),U0(F.clientX,F.clientY);let d=document.elementFromPoint(F.clientX,F.clientY),r=E0(d)||m_();if(g_.current!==r)a_(r);h_(r)}},[E0,m_,S0,U0,a_,h_]),X2=L((K)=>{K.preventDefault();let q=O0.current;if(!q)return;let F=K.clientY,k=C_.current||280,R=K.currentTarget;R.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let o=F,d=(c)=>{o=c.clientY;let W_=q.clientHeight-80,j0=Math.min(Math.max(k-(c.clientY-F),80),W_);q.style.setProperty("--preview-height",`${j0}px`),C_.current=j0},r=()=>{let c=q.clientHeight-80,W_=Math.min(Math.max(k-(o-F),80),c);C_.current=W_,R.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("previewHeight",String(Math.round(W_))),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",r)}).current,X1=L((K)=>{K.preventDefault();let q=O0.current;if(!q)return;let F=K.touches[0];if(!F)return;let k=F.clientY,R=C_.current||280,o=K.currentTarget;o.classList.add("dragging"),document.body.style.userSelect="none";let d=(c)=>{let W_=c.touches[0];if(!W_)return;c.preventDefault();let j0=q.clientHeight-80,m0=Math.min(Math.max(R-(W_.clientY-k),80),j0);q.style.setProperty("--preview-height",`${m0}px`),C_.current=m0},r=()=>{o.classList.remove("dragging"),document.body.style.userSelect="",I_("previewHeight",String(Math.round(C_.current||R))),document.removeEventListener("touchmove",d),document.removeEventListener("touchend",r),document.removeEventListener("touchcancel",r)};document.addEventListener("touchmove",d,{passive:!1}),document.addEventListener("touchend",r),document.addEventListener("touchcancel",r)}).current,W1=async()=>{if(!V)return;try{let K=await i3(V);if(K.media_id)U(K.media_id)}catch(K){w((q)=>({...q||{},error:K.message||"Failed to attach"}))}},S2=async()=>{if(!V||x_)return;await d_(V)},W2=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},Z0=S((K)=>{if(!W2(K))return;if(K.preventDefault(),$0.current+=1,!i0.current)G_(!0);p("upload");let q=W0(K)||m_();a_(q),h_(q)},[m_,W0,a_,h_]),j1=S((K)=>{if(!W2(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!i0.current)G_(!0);if(e0.current!=="upload")p("upload");let q=W0(K)||m_();if(g_.current!==q)a_(q);h_(q)},[m_,W0,a_,h_]),K1=S((K)=>{if(!W2(K))return;if(K.preventDefault(),$0.current=Math.max(0,$0.current-1),$0.current===0)G_(!1),p(null),a_(null),b_()},[a_,b_]),j2=S(async(K,q=".")=>{let F=Array.from(K||[]);if(F.length===0)return;let k=q&&q!==""?q:".",R=k!=="."?k:"workspace root";X_(!0);try{let o=null;for(let d of F)try{o=await C1(d,k)}catch(r){let c=r?.status,W_=r?.code;if(c===409||W_==="file_exists"){let j0=d?.name||"file";if(!window.confirm(`"${j0}" already exists in ${R}. Overwrite?`))continue;o=await C1(d,k,{overwrite:!0})}else throw r}if(o?.path)c_.current=o.path,O(o.path),U_.current?.(o.path);H_.current?.(k)}catch(o){n(o.message||"Failed to upload file")}finally{X_(!1)}},[]),T0=S(async(K,q)=>{if(!K)return;let F=k_.current?.get(K);if(!F)return;let k=q&&q!==""?q:".",R=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(k===R)return;try{let d=(await o3(K,k))?.path||K;if(F.type==="dir")G((r)=>{let c=new Set;for(let W_ of r)if(W_===K)c.add(d);else if(W_.startsWith(`${K}/`))c.add(`${d}${W_.slice(K.length)}`);else c.add(W_);return c});if(O(d),F.type==="dir")w(null),f(!1),U(null);else U_.current?.(d);H_.current?.(R),H_.current?.(k)}catch(o){n(o?.message||"Failed to move entry")}},[]);M0.current=T0;let H0=S(async(K)=>{if(!W2(K))return;K.preventDefault(),$0.current=0,G_(!1),p(null),e(null),b_();let q=Array.from(K?.dataTransfer?.files||[]);if(q.length===0)return;let F=g_.current||W0(K)||m_();await j2(q,F)},[m_,W0,j2]),G1=S((K)=>{if(K?.stopPropagation?.(),V_)return;let q=K?.currentTarget?.dataset?.uploadTarget||".";q0.current=q,R0.current?.click()},[V_]),k2=S(()=>{if(V_)return;let K=A0.current,q=K?k_.current?.get(K):null;q0.current=q?.type==="dir"?q.path:".",R0.current?.click()},[V_]),s0=S((K)=>{if(!K||K.button!==0)return;let q=K.currentTarget;if(!q||!q.dataset)return;let F=q.dataset.path;if(!F||F===".")return;if(F0.current===F)return;let k=D0(K);if(k?.closest?.("button, a, input, .workspace-caret"))return;if(!J2(k))return;K.preventDefault(),Q0.current={path:F,dragging:!1,startX:K.clientX,startY:K.clientY};let R=(d)=>{let r=Q0.current;if(!r?.path)return;let c=Math.abs(d.clientX-r.startX),W_=Math.abs(d.clientY-r.startY),j0=c>4||W_>4;if(!r.dragging&&j0)r.dragging=!0,__.current=!0,G_(!0),p("move"),S0(r.path),U0(d.clientX,d.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(r.dragging){d.preventDefault(),U0(d.clientX,d.clientY);let m0=document.elementFromPoint(d.clientX,d.clientY),f0=E0(m0)||m_();if(g_.current!==f0)a_(f0);h_(f0)}},o=()=>{document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",o);let d=Q0.current;if(d?.dragging&&d.path){let r=g_.current||m_(),c=M0.current;if(typeof c==="function")c(d.path,r)}Q0.current={path:null,dragging:!1,startX:0,startY:0},$0.current=0,G_(!1),p(null),a_(null),b_(),w0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{__.current=!1},0)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",o)},[E0,m_,S0,U0,w0,a_,h_,b_]),N2=S(async(K)=>{let q=Array.from(K?.target?.files||[]);if(q.length===0)return;let F=q0.current||".";if(await j2(q,F),q0.current=".",K?.target)K.target.value=""},[j2]);return Q`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            data-workspace-scale=${q_}
            ref=${O0}
            onDragEnter=${Z0}
            onDragOver=${j1}
            onDragLeave=${K1}
            onDrop=${H0}
        >
            <input type="file" multiple style="display:none" ref=${R0} onChange=${N2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${c0} title="New file" disabled=${V_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${i_} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Y_?" active":""}`}
                        onClick=${r0}
                        title=${Y_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Y_&&Q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${V0}>
                ${V_&&Q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${b&&Q`<div class="workspace-loading">Loading…</div>`}
                ${i&&Q`<div class="workspace-error">${i}</div>`}
                ${X&&Q`
                    <div
                        class="workspace-tree-list"
                        ref=${_0}
                        tabIndex="0"
                        onClick=${t_}
                        onDblClick=${V2}
                        onKeyDown=${N0}
                        onTouchStart=${I0}
                        onTouchEnd=${Y2}
                        onTouchMove=${D2}
                        onTouchCancel=${Y2}
                    >
                        ${j_.map(({node:K,depth:q})=>{let F=K.type==="dir",k=K.path===V,R=K.path===W,o=F&&j.has(K.path),d=s&&K.path===s,r=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return Q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${k?" selected":""}${d?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+q*p_.indentPx}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${s0}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${F?o?Q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:Q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${F?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${F?Q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:Q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${R?Q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${B0}
                                                value=${E}
                                                onInput=${(c)=>D(c?.target?.value||"")}
                                                onKeyDown=${(c)=>{if(c.key==="Enter")c.preventDefault(),o0();else if(c.key==="Escape")c.preventDefault(),G0()}}
                                                onBlur=${G0}
                                                onClick=${(c)=>c.stopPropagation()}
                                            />
                                        `:Q`<span class="workspace-label"><span class="workspace-label-text">${K.name}</span></span>`}
                                    ${F&&!o&&r>0&&Q`
                                        <span class="workspace-count">${r}</span>
                                    `}
                                    ${F&&Q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${G1}
                                            disabled=${V_}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 8 12 3 17 8"/>
                                                <line x1="12" y1="3" x2="12" y2="15"/>
                                            </svg>
                                        </button>
                                    `}
                                </div>
                            `})}
                    </div>
                `}
            </div>
            ${V&&Q`
                <div class="workspace-preview-splitter-h" onMouseDown=${X2} onTouchStart=${X1}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${V}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${c0} title="New file" disabled=${V_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!x_&&Q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>b0&&s_.current?.(V,C)}
                                    title=${G2}
                                    disabled=${!b0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${S2}
                                    title="Delete file"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            `}
                            ${x_?Q`
                                    <button class="workspace-download" onClick=${k2}
                                        title="Upload files to this folder" disabled=${V_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${r3(V,Y_)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:Q`<button class="workspace-download" onClick=${W1} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${y&&Q`<div class="workspace-loading">Loading preview…</div>`}
                    ${C?.error&&Q`<div class="workspace-error">${C.error}</div>`}
                    ${x_&&Q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${A_?.loading&&Q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${A_?.error&&Q`<div class="workspace-error">${A_.error}</div>`}
                        ${A_?.payload&&A_.payload.segments?.length>0&&Q`
                            <${w6} payload=${A_.payload} />
                        `}
                        ${A_?.payload&&(!A_.payload.segments||A_.payload.segments.length===0)&&Q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${C&&!C.error&&!x_&&Q`
                        <div class="workspace-preview-meta">
                            ${C.size?Q`<span>${p0(C.size)}</span>`:""}
                            ${C.mtime?Q`<span>${e2(C.mtime)}</span>`:""}
                            ${C.truncated?Q`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${u0}></div>
                    `}
                    ${T&&Q`
                        <div class="workspace-download-card">
                            <${b6} mediaId=${T} />
                        </div>
                    `}
                </div>
            `}
            ${J_&&Q`
                <div class="workspace-drag-ghost" ref=${l0}>${J_.label}</div>
            `}
        </aside>
    `}function o4({tabs:_,activeId:$,onActivate:Z,onClose:J,onCloseOthers:X,onCloseAll:Y,onTogglePin:j,onTogglePreview:G,previewTabs:V,onToggleDock:O,dockVisible:W}){let[H,E]=v(null),D=L(null);m(()=>{if(!H)return;let U=(b)=>{if(b.type==="keydown"&&b.key!=="Escape")return;E(null)};return document.addEventListener("click",U),document.addEventListener("keydown",U),()=>{document.removeEventListener("click",U),document.removeEventListener("keydown",U)}},[H]),m(()=>{let U=(b)=>{if(b.ctrlKey&&b.key==="Tab"){if(b.preventDefault(),!_.length)return;let g=_.findIndex((y)=>y.id===$);if(b.shiftKey){let y=_[(g-1+_.length)%_.length];Z?.(y.id)}else{let y=_[(g+1)%_.length];Z?.(y.id)}return}if((b.ctrlKey||b.metaKey)&&b.key==="w"){let g=document.querySelector(".editor-pane");if(g&&g.contains(document.activeElement)){if(b.preventDefault(),$)J?.($)}}};return document.addEventListener("keydown",U),()=>document.removeEventListener("keydown",U)},[_,$,Z,J]);let C=S((U,b)=>{if(U.button===1){U.preventDefault(),J?.(b);return}if(U.button===0)Z?.(b)},[Z,J]),w=S((U,b)=>{U.preventDefault(),E({id:b,x:U.clientX,y:U.clientY})},[]),T=S((U,b)=>{U.stopPropagation(),J?.(b)},[J]);if(m(()=>{if(!$||!D.current)return;let U=D.current.querySelector(".tab-item.active");if(U)U.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return Q`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((U)=>Q`
                <div
                    key=${U.id}
                    class=${`tab-item${U.id===$?" active":""}${U.dirty?" dirty":""}${U.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${U.id===$}
                    title=${U.path}
                    onMouseDown=${(b)=>C(b,U.id)}
                    onContextMenu=${(b)=>w(b,U.id)}
                >
                    ${U.pinned&&Q`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${U.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(b)=>T(b,U.id)}
                        title=${U.dirty?"Unsaved changes":"Close"}
                        aria-label=${U.dirty?"Unsaved changes":`Close ${U.label}`}
                    >
                        ${U.dirty?Q`<span class="tab-dirty-dot" aria-hidden="true"></span>`:Q`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${O&&Q`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${W?" active":""}`}
                    onClick=${O}
                    title=${`${W?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${W?"Hide":"Show"} terminal`}
                    aria-pressed=${W?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${H&&Q`
            <div class="tab-context-menu" style=${{left:H.x+"px",top:H.y+"px"}}>
                <button onClick=${()=>{J?.(H.id),E(null)}}>Close</button>
                <button onClick=${()=>{X?.(H.id),E(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),E(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(H.id),E(null)}}>
                    ${_.find((U)=>U.id===H.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${G&&/\.(md|mdx|markdown)$/i.test(H.id)&&Q`
                    <hr />
                    <button onClick=${()=>{G(H.id),E(null)}}>
                        ${V?.has(H.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var P6=400,o1=60,d4=220,d1="mdPreviewHeight";function M6(){try{let _=localStorage.getItem(d1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=o1?$:d4}catch{return d4}}function r4({getContent:_,path:$,onClose:Z}){let[J,X]=v(""),[Y,j]=v(M6),G=L(null),V=L(null),O=L(""),W=L(_);return W.current=_,m(()=>{let D=()=>{let w=W.current?.()||"";if(w===O.current)return;O.current=w;try{let T=F2(w,null,{sanitize:!1});X(T)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let C=setInterval(D,P6);return()=>clearInterval(C)},[]),m(()=>{if(G.current&&J)t2(G.current).catch(()=>{})},[J]),Q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let C=D.clientY,w=V.current?.offsetHeight||Y,T=V.current?.parentElement,U=T?T.offsetHeight*0.7:500,b=D.currentTarget;b.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let g=(f)=>{let i=Math.min(Math.max(w-(f.clientY-C),o1),U);j(i)},y=()=>{b.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(d1,String(Math.round(V.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",g),document.addEventListener("mouseup",y)}}
            onTouchStart=${(D)=>{D.preventDefault();let C=D.touches[0];if(!C)return;let w=C.clientY,T=V.current?.offsetHeight||Y,U=V.current?.parentElement,b=U?U.offsetHeight*0.7:500,g=D.currentTarget;g.classList.add("dragging"),document.body.style.userSelect="none";let y=(i)=>{let n=i.touches[0];if(!n)return;i.preventDefault();let Y_=Math.min(Math.max(T-(n.clientY-w),o1),b);j(Y_)},f=()=>{g.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(d1,String(Math.round(V.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",y),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)};document.addEventListener("touchmove",y,{passive:!1}),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f)}}
        ></div>
        <div class="md-preview-panel" ref=${V} style=${{height:Y+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${Z} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${G}
                dangerouslySetInnerHTML=${{__html:J}}
            />
        </div>
    `}function s4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:Z}){let J=L(_);J.current=_;let X=L($);X.current=$;let Y=L(Z);Y.current=Z,m(()=>{Y.current();let j=new A1((V,O)=>J.current(V,O),(V)=>X.current(V));j.connect();let G=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",G),document.addEventListener("visibilitychange",G),()=>{window.removeEventListener("focus",G),document.removeEventListener("visibilitychange",G),j.disconnect()}},[])}function a4(){let[_,$]=v(!1),[Z,J]=v("default"),X=L(!1);m(()=>{let V=z2("notificationsEnabled",!1);if(X.current=V,$(V),typeof Notification<"u")J(Notification.permission)},[]),m(()=>{X.current=_},[_]);let Y=S(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let V=Notification.requestPermission();if(V&&typeof V.then==="function")return V;return Promise.resolve(V)}catch{return Promise.resolve("default")}},[]),j=S(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){J("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let O=await Y();if(J(O||"default"),O!=="granted"){X.current=!1,$(!1),I_("notificationsEnabled","false");return}}let V=!X.current;X.current=V,$(V),I_("notificationsEnabled",String(V))},[Y]),G=S((V,O)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let W=new Notification(V,{body:O});return W.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:Z,toggleNotifications:j,notify:G}}var M2=(_)=>{let $=new Set;return(_||[]).filter((Z)=>{if(!Z||$.has(Z.id))return!1;return $.add(Z.id),!0})};function t4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[Z,J]=v(null),[X,Y]=v(!1),j=L(!1),G=L(null),V=L(!1),O=L(null),W=L(null);m(()=>{j.current=X},[X]),m(()=>{W.current=Z},[Z]);let H=S(async(C=null)=>{try{if(C){let w=await x3(C);J(w.posts),Y(!1)}else{let w=await h2(10);J(w.posts),Y(w.has_more)}}catch(w){console.error("Failed to load posts:",w)}},[]),E=S(async()=>{try{let C=await h2(10);J((w)=>{if(!w||w.length===0)return C.posts;return M2([...C.posts,...w])}),Y((w)=>w||C.has_more)}catch(C){console.error("Failed to refresh timeline:",C)}},[]),D=S(async(C={})=>{let w=W.current;if(!w||w.length===0)return;if(V.current)return;let{preserveScroll:T=!0,preserveMode:U="top",allowRepeat:b=!1}=C,g=(i)=>{if(!T){i();return}if(U==="top")$(i);else _(i)},f=w.slice().sort((i,n)=>i.id-n.id)[0]?.id;if(!Number.isFinite(f))return;if(!b&&O.current===f)return;V.current=!0,O.current=f;try{let i=await h2(10,f);if(i.posts.length>0)g(()=>{J((n)=>M2([...i.posts,...n||[]])),Y(i.has_more)});else Y(!1)}catch(i){console.error("Failed to load more posts:",i)}finally{V.current=!1}},[_,$]);return m(()=>{G.current=D},[D]),{posts:Z,setPosts:J,hasMore:X,setHasMore:Y,hasMoreRef:j,loadPosts:H,refreshTimeline:E,loadMore:D,loadMoreRef:G,loadingMoreRef:V,lastBeforeIdRef:O}}function e4(){let[_,$]=v(null),[Z,J]=v({text:"",totalLines:0}),[X,Y]=v(""),[j,G]=v({text:"",totalLines:0}),[V,O]=v(null),[W,H]=v(null),[E,D]=v(null),C=L(null),w=L(0),T=L(!1),U=L(""),b=L(""),g=L(null),y=L(null),f=L(null),i=L(null),n=L(!1),Y_=L(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:Z,setAgentDraft:J,agentPlan:X,setAgentPlan:Y,agentThought:j,setAgentThought:G,pendingRequest:V,setPendingRequest:O,currentTurnId:W,setCurrentTurnId:H,steerQueuedTurnId:E,setSteerQueuedTurnId:D,lastAgentEventRef:C,lastSilenceNoticeRef:w,isAgentRunningRef:T,draftBufferRef:U,thoughtBufferRef:b,pendingRequestRef:g,stalledPostIdRef:y,currentTurnIdRef:f,steerQueuedTurnIdRef:i,thoughtExpandedRef:n,draftExpandedRef:Y_}}function _8({appShellRef:_,sidebarWidthRef:$,editorWidthRef:Z,dockHeightRef:J}){let X=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientX,D=$.current||280,C=W.currentTarget;C.classList.add("dragging"),H.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,T=(b)=>{w=b.clientX;let g=Math.min(Math.max(D+(b.clientX-E),160),600);H.style.setProperty("--sidebar-width",`${g}px`),$.current=g},U=()=>{let b=Math.min(Math.max(D+(w-E),160),600);$.current=b,C.classList.remove("dragging"),H.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",I_("sidebarWidth",String(Math.round(b))),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,Y=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=$.current||280,w=W.currentTarget;w.classList.add("dragging"),H.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let T=(b)=>{let g=b.touches[0];if(!g)return;b.preventDefault();let y=Math.min(Math.max(C+(g.clientX-D),160),600);H.style.setProperty("--sidebar-width",`${y}px`),$.current=y},U=()=>{w.classList.remove("dragging"),H.classList.remove("sidebar-resizing"),document.body.style.userSelect="",I_("sidebarWidth",String(Math.round($.current||C))),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current,j=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientX,D=Z.current||$.current||280,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,T=(b)=>{w=b.clientX;let g=Math.min(Math.max(D+(b.clientX-E),200),800);H.style.setProperty("--editor-width",`${g}px`),Z.current=g},U=()=>{let b=Math.min(Math.max(D+(w-E),200),800);Z.current=b,C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("editorWidth",String(Math.round(b))),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,G=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=Z.current||$.current||280,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let T=(b)=>{let g=b.touches[0];if(!g)return;b.preventDefault();let y=Math.min(Math.max(C+(g.clientX-D),200),800);H.style.setProperty("--editor-width",`${y}px`),Z.current=y},U=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",I_("editorWidth",String(Math.round(Z.current||C))),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current,V=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.clientY,D=J?.current||200,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=E,T=(b)=>{w=b.clientY;let g=Math.min(Math.max(D-(b.clientY-E),100),window.innerHeight*0.5);if(H.style.setProperty("--dock-height",`${g}px`),J)J.current=g},U=()=>{let b=Math.min(Math.max(D-(w-E),100),window.innerHeight*0.5);if(J)J.current=b;C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",I_("dockHeight",String(Math.round(b))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",U)}).current,O=L((W)=>{W.preventDefault();let H=_.current;if(!H)return;let E=W.touches[0];if(!E)return;let D=E.clientY,C=J?.current||200,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let T=(b)=>{let g=b.touches[0];if(!g)return;b.preventDefault();let y=Math.min(Math.max(C-(g.clientY-D),100),window.innerHeight*0.5);if(H.style.setProperty("--dock-height",`${y}px`),J)J.current=y},U=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",I_("dockHeight",String(Math.round(J?.current||C))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",T),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)};document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:G,handleDockSplitterMouseDown:V,handleDockSplitterTouchStart:O}}function $8({onTabClosed:_}={}){let $=L(_);$.current=_;let[Z,J]=v(()=>D_.getTabs()),[X,Y]=v(()=>D_.getActiveId()),[j,G]=v(()=>D_.getTabs().length>0);m(()=>{return D_.onChange((y,f)=>{J(y),Y(f),G(y.length>0)})},[]);let[V,O]=v(()=>new Set),W=S((y)=>{O((f)=>{let i=new Set(f);if(i.has(y))i.delete(y);else i.add(y);return i})},[]),H=S((y)=>{O((f)=>{if(!f.has(y))return f;let i=new Set(f);return i.delete(y),i})},[]),E=S((y)=>{if(!y)return;let f={path:y,mode:"edit"};try{if(!n_.resolve(f)){if(!n_.get("editor")){console.warn(`[openEditor] No pane handler for: ${y}`);return}}}catch(i){console.warn(`[openEditor] paneRegistry.resolve() error for "${y}":`,i)}D_.open(y)},[]),D=S(()=>{let y=D_.getActiveId();if(y){let f=D_.get(y);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}D_.close(y),H(y),$.current?.(y)}},[H]),C=S((y)=>{let f=D_.get(y);if(f?.dirty){if(!window.confirm(`"${f.label}" has unsaved changes. Close anyway?`))return}D_.close(y),H(y),$.current?.(y)},[H]),w=S((y)=>{D_.activate(y)},[]),T=S((y)=>{let f=D_.getTabs().filter((Y_)=>Y_.id!==y&&!Y_.pinned),i=f.filter((Y_)=>Y_.dirty).length;if(i>0){if(!window.confirm(`${i} unsaved tab${i>1?"s":""} will be closed. Continue?`))return}let n=f.map((Y_)=>Y_.id);D_.closeOthers(y),n.forEach((Y_)=>{H(Y_),$.current?.(Y_)})},[H]),U=S(()=>{let y=D_.getTabs().filter((n)=>!n.pinned),f=y.filter((n)=>n.dirty).length;if(f>0){if(!window.confirm(`${f} unsaved tab${f>1?"s":""} will be closed. Continue?`))return}let i=y.map((n)=>n.id);D_.closeAll(),i.forEach((n)=>{H(n),$.current?.(n)})},[H]),b=S((y)=>{D_.togglePin(y)},[]),g=S(()=>{let y=D_.getActiveId();if(y)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:y}}))},[]);return m(()=>{let y=(f)=>{let{oldPath:i,newPath:n,type:Y_}=f.detail||{};if(!i||!n)return;if(Y_==="dir"){for(let O_ of D_.getTabs())if(O_.path===i||O_.path.startsWith(`${i}/`)){let $_=`${n}${O_.path.slice(i.length)}`;D_.rename(O_.id,$_)}}else D_.rename(i,n)};return window.addEventListener("workspace-file-renamed",y),()=>window.removeEventListener("workspace-file-renamed",y)},[]),m(()=>{let y=(f)=>{if(D_.hasUnsaved())f.preventDefault(),f.returnValue=""};return window.addEventListener("beforeunload",y),()=>window.removeEventListener("beforeunload",y)},[]),{editorOpen:j,tabStripTabs:Z,tabStripActiveId:X,previewTabs:V,openEditor:E,closeEditor:D,handleTabClose:C,handleTabActivate:w,handleTabCloseOthers:T,handleTabCloseAll:U,handleTabTogglePin:b,handleTabTogglePreview:W,revealInExplorer:g}}function r1(_,$){try{if(typeof window>"u")return $;let Z=window.__PICLAW_SILENCE||{},J=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=Z[_]??window[J],Y=Number(X);return Number.isFinite(Y)?Y:$}catch{return $}}var s1=r1("warning",30000),Z8=r1("finalize",120000),J8=r1("refresh",30000),Y8=30000;function X8(_){let $={};return(_?.agents||[]).forEach((Z)=>{$[Z.id]=Z}),$}function W8(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function j8(_=30000){let[,$]=v(0);m(()=>{let Z=setInterval(()=>$((J)=>J+1),_);return()=>clearInterval(Z)},[_])}function a1(_,$=160){let Z=String(_||"").replace(/\r\n/g,`
`);if(!Z)return 0;return Z.split(`
`).reduce((J,X)=>J+Math.max(1,Math.ceil(X.length/$)),0)}function Y1(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var S6=I3,K8=f3,x6=v3,G8=c3,V8=m3,N8=R3,t1=typeof F1==="function"?F1:Y1("getAgentContext",null),I6=typeof K2==="function"?K2:Y1("getAgentModels",{current:null,models:[]}),T6=typeof E1==="function"?E1:Y1("getAgentQueueState",{count:0}),f6=typeof D1==="function"?D1:Y1("steerAgentQueueItem",{removed:!1,queued:"steer"});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});n_.register(T1);n_.register(g1);n_.register(u1);f1();var v6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(v6)n_.register(v1);function R6(){let[_,$]=v("disconnected"),[Z,J]=v(null),[X,Y]=v(null),[j,G]=v(!1),[V,O]=v([]),[W,H]=v([]),[E,D]=v(null),{agentStatus:C,setAgentStatus:w,agentDraft:T,setAgentDraft:U,agentPlan:b,setAgentPlan:g,agentThought:y,setAgentThought:f,pendingRequest:i,setPendingRequest:n,currentTurnId:Y_,setCurrentTurnId:O_,steerQueuedTurnId:$_,setSteerQueuedTurnId:G_,lastAgentEventRef:P_,lastSilenceNoticeRef:p,isAgentRunningRef:J_,draftBufferRef:l,thoughtBufferRef:s,pendingRequestRef:e,stalledPostIdRef:V_,currentTurnIdRef:X_,steerQueuedTurnIdRef:A_,thoughtExpandedRef:Z_,draftExpandedRef:N_}=e4(),[L_,q_]=v({}),[M_,B_]=v(null),[z_,f_]=v(null),[S_,w_]=v(!1),[T_,k_]=v(null),[v_,s_]=v(null),[U_,H_]=v([]),[O0,_0]=v(!1),B0=U_.length,R0=L(new Set),q0=L([]),F_=L(new Set);R0.current=new Set(U_.map((N)=>N.row_id)),q0.current=U_;let{notificationsEnabled:L0,notificationPermission:Q0,toggleNotifications:P,notify:__}=a4(),[C_,J0]=v(()=>new Set),[R_,P0]=v(()=>z2("workspaceOpen",!0)),u0=L(null),{editorOpen:o_,tabStripTabs:Y0,tabStripActiveId:u_,previewTabs:X0,openEditor:$0,closeEditor:g_,handleTabClose:i0,handleTabActivate:e0,handleTabCloseOthers:l0,handleTabCloseAll:_2,handleTabTogglePin:K0,handleTabTogglePreview:M0,revealInExplorer:A0}=$8({onTabClosed:(N)=>u0.current?.(N)}),F0=L(null),c_=L(null);m(()=>{let N=F0.current;if(!N)return;if(c_.current)c_.current.dispose(),c_.current=null;let B=u_;if(!B)return;let A={path:B,mode:"edit"},M=n_.resolve(A)||n_.get("editor");if(!M){N.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let u=M.mount(N,A);c_.current=u,u.onDirtyChange?.((h)=>{D_.setDirty(B,h)}),u.onSaveRequest?.(()=>{}),u.onClose?.(()=>{g_()});let I=D_.getViewState(B);if(I&&typeof u.restoreViewState==="function")requestAnimationFrame(()=>u.restoreViewState(I));if(typeof u.onViewStateChange==="function")u.onViewStateChange((h)=>{D_.saveViewState(B,h)});return requestAnimationFrame(()=>u.focus()),()=>{if(c_.current===u)u.dispose(),c_.current=null}},[u_,g_]);let[z0,$2]=v({name:"You",avatar_url:null,avatar_background:null}),Z2=L(!1),n0=L(!1),E2=L(null),m_=L(0),E0=L(0),W0=L({}),a_=L({name:null,avatar_url:null}),b_=L({currentHashtag:null,searchQuery:null}),h_=L(null),U0=L(null),S0=L(0),w0=L(0),g0=L(0),G0=L(null),x0=L(null),o0=L(null),d0=L(0),c0=L({title:null,avatarBase:null}),z=L(null),x=S(()=>{if(z.current)clearTimeout(z.current),z.current=null;D(null)},[]);j8(30000),m(()=>{return Y4()},[]),m(()=>{I_("workspaceOpen",String(R_))},[R_]),m(()=>{return()=>{x()}},[x]),m(()=>{W0.current=L_||{}},[L_]),m(()=>{a_.current=z0||{name:"You",avatar_url:null,avatar_background:null}},[z0]);let a=S((N,B,A=null)=>{if(typeof document>"u")return;let M=(N||"").trim()||"PiClaw";if(c0.current.title!==M){document.title=M;let Q_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(Q_&&Q_.getAttribute("content")!==M)Q_.setAttribute("content",M);c0.current.title=M}let u=document.getElementById("dynamic-favicon");if(!u)return;let I=u.getAttribute("data-default")||u.getAttribute("href")||"/favicon.ico",h=B||I,t=B?`${h}|${A||""}`:h;if(c0.current.avatarBase!==t){let Q_=B?`${h}${h.includes("?")?"&":"?"}v=${A||Date.now()}`:h;u.setAttribute("href",Q_),c0.current.avatarBase=t}},[]),j_=S((N)=>{if(!N)return;O((B)=>B.includes(N)?B:[...B,N])},[]),E_=S((N)=>{O((B)=>B.filter((A)=>A!==N))},[]);u0.current=E_;let p_=S(()=>{O([])},[]),y_=S((N,B=null,A="info",M=3000)=>{x(),D({title:N,detail:B||null,kind:A||"info"}),z.current=setTimeout(()=>{D((u)=>u?.title===N?null:u)},M)},[x]),x_=S((N)=>{if(typeof N!=="string")return;let B=N.trim();if(!B){y_("No file selected","Use a valid file path from a file pill.","warning");return}if(!o_){y_("Editor pane is not open","Open the editor pane to open files from pills.","warning");return}if(/^[a-z][a-z0-9+.-]*:/i.test(B)){y_("Cannot open external path from file pill","Use an in-workspace file path.","warning");return}let M={path:B,mode:"edit"};if(!n_.resolve(M)){y_("No editor available",`No editor can open: ${B}`,"warning");return}$0(B)},[o_,$0,y_]),b0=S(()=>{let N=u_;if(N)j_(N)},[u_,j_]),G2=S((N)=>{if(!N)return;H((B)=>B.includes(N)?B:[...B,N])},[]),D0=S(async(N)=>{let B=(M)=>{M.scrollIntoView({behavior:"smooth",block:"center"}),M.classList.add("post-highlight"),setTimeout(()=>M.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+N);if(A){B(A);return}try{let u=(await T3(N))?.thread?.[0];if(!u)return;Z0((I)=>{if(!I)return[u];if(I.some((h)=>h.id===u.id))return I;return[...I,u]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+N);if(I)B(I)},50)})}catch(M){console.error("[scrollToMessage] Failed to fetch message",N,M)}},[]),J2=S((N)=>{H((B)=>B.filter((A)=>A!==N))},[]),V2=S(()=>{H([])},[]),t_=S((N={})=>{let B=Date.now();if(P_.current=B,N.running)J_.current=!0,_0((A)=>A?A:!0);if(N.clearSilence)p.current=0},[_0]),i_=S(()=>{if(o0.current)clearTimeout(o0.current),o0.current=null;d0.current=0},[]);m(()=>()=>{i_()},[i_]);let l_=S(()=>{i_(),w((N)=>{if(!N)return N;if(!(N.last_activity||N.lastActivity))return N;let{last_activity:B,lastActivity:A,...M}=N;return M})},[i_]),r0=S((N)=>{if(!N)return;i_();let B=Date.now();d0.current=B,w({type:N.type||"active",last_activity:!0}),o0.current=setTimeout(()=>{if(d0.current!==B)return;w((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},Y8)},[i_]),V0=S(()=>{J_.current=!1,_0(!1),P_.current=null,p.current=0,l.current="",s.current="",e.current=null,x0.current=null,X_.current=null,A_.current=null,i_(),O_(null),G_(null),Z_.current=!1,N_.current=!1},[i_,O_,G_,_0]),d_=S((N)=>{if(!N)return;if(X_.current===N)return;X_.current=N,O_(N),A_.current=null,G_(null),l.current="",s.current="",U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),e.current=null,x0.current=null,Z_.current=!1,N_.current=!1},[O_,G_]),k0=S((N)=>{if(typeof document<"u"){let Q_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&Q_)return}let B=x0.current;if(!B||!B.post)return;if(N&&B.turnId&&B.turnId!==N)return;let A=B.post;if(A.id&&G0.current===A.id)return;let M=String(A?.data?.content||"").trim();if(!M)return;G0.current=A.id||G0.current,x0.current=null;let u=M.replace(/\s+/g," ").slice(0,200),I=W0.current||{},t=(A?.data?.agent_id?I[A.data.agent_id]:null)?.name||"Pi";__(t,u)},[__]),N0=S(async(N,B)=>{if(N!=="thought"&&N!=="draft")return;let A=X_.current;if(N==="thought"){if(Z_.current=B,A)try{await V8(A,"thought",B)}catch(M){console.warn("Failed to update thought visibility:",M)}if(!B)return;try{let M=A?await G8(A,"thought"):null;if(M?.text)s.current=M.text;f((u)=>({...u||{text:"",totalLines:0},fullText:s.current||u?.fullText||"",totalLines:Number.isFinite(M?.total_lines)?M.total_lines:u?.totalLines||0}))}catch(M){console.warn("Failed to fetch full thought:",M)}return}if(N_.current=B,A)try{await V8(A,"draft",B)}catch(M){console.warn("Failed to update draft visibility:",M)}if(!B)return;try{let M=A?await G8(A,"draft"):null;if(M?.text)l.current=M.text;U((u)=>({...u||{text:"",totalLines:0},fullText:l.current||u?.fullText||"",totalLines:Number.isFinite(M?.total_lines)?M.total_lines:u?.totalLines||0}))}catch(M){console.warn("Failed to fetch full draft:",M)}},[]),I0=L(null),Y2=S(()=>{let N=h_.current;if(!N)return;if(!(Math.abs(N.scrollTop)>150))N.scrollTop=0},[]);I0.current=Y2;let D2=S((N)=>{let B=h_.current;if(!B||typeof N!=="function"){N?.();return}let{currentHashtag:A,searchQuery:M}=b_.current||{},u=!(M&&!A),I=u?B.scrollHeight-B.scrollTop:B.scrollTop;N(),requestAnimationFrame(()=>{let h=h_.current;if(!h)return;if(u){let t=Math.max(h.scrollHeight-I,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),Q_=Math.min(I,t);h.scrollTop=Q_}})},[]),X2=S((N)=>{let B=h_.current;if(!B||typeof N!=="function"){N?.();return}let A=B.scrollTop;N(),requestAnimationFrame(()=>{let M=h_.current;if(!M)return;let u=Math.max(M.scrollHeight-M.clientHeight,0);M.scrollTop=Math.min(A,u)})},[]),X1="Queued as a follow-up (one-at-a-time).",W1="⁣",S2=S((N)=>{if(!N||!Array.isArray(N))return N;let B=R0.current,A=new Set(B),M=q0.current;for(let I of M)if(I?.thread_id!=null)A.add(I.thread_id);let u=N.filter((I)=>{if(A.has(I?.id))return!1;if(I?.data?.is_bot_message){let h=I?.data?.content;if(h===X1||h===W1)return!1}return!0});return u.length===N.length?N:u},[]),{posts:W2,setPosts:Z0,hasMore:j1,setHasMore:K1,hasMoreRef:j2,loadPosts:T0,refreshTimeline:H0,loadMore:G1,loadMoreRef:k2}=t4({preserveTimelineScroll:D2,preserveTimelineScrollTop:X2}),s0=y0(()=>S2(W2),[W2,U_,S2]),N2=S(()=>{let N=V_.current;if(!N)return;Z0((B)=>B?B.filter((A)=>A.id!==N):B),V_.current=null},[Z0]),{handleSplitterMouseDown:K,handleSplitterTouchStart:q,handleEditorSplitterMouseDown:F,handleEditorSplitterTouchStart:k,handleDockSplitterMouseDown:R,handleDockSplitterTouchStart:o}=_8({appShellRef:U0,sidebarWidthRef:S0,editorWidthRef:w0,dockHeightRef:g0}),d=S(()=>{if(!J_.current)return;J_.current=!1,p.current=0,P_.current=null,X_.current=null,O_(null),Z_.current=!1,N_.current=!1;let N=(l.current||"").trim();if(l.current="",s.current="",U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),e.current=null,x0.current=null,!N){w({type:"error",title:"Response stalled - No content received"});return}let A=`${N}${`

⚠️ Response may be incomplete - the model stopped responding`}`,M=Date.now(),u=new Date().toISOString(),I={id:M,timestamp:u,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};V_.current=M,Z0((h)=>h?M2([...h,I]):[I]),I0.current?.(),w(null)},[O_]);m(()=>{b_.current={currentHashtag:Z,searchQuery:X}},[Z,X]),m(()=>{let N=Math.min(1000,Math.max(100,Math.floor(s1/2))),B=setInterval(()=>{if(!J_.current)return;if(e.current)return;let A=P_.current;if(!A)return;let M=Date.now(),u=M-A;if(u>=Z8){d();return}if(u>=s1){if(M-p.current>=J8){let I=Math.floor(u/1000);w({type:"waiting",title:`Waiting for model… No events for ${I}s`}),p.current=M}}},N);return()=>clearInterval(B)},[d]);let r=S(async()=>{try{let N=await t1();if(N)s_(N)}catch(N){console.warn("Failed to fetch agent context:",N)}},[]),c=S(async()=>{try{let N=await N8("web:default");if(!N||N.status!=="active"||!N.data){if(n0.current){let{currentHashtag:M,searchQuery:u}=b_.current||{};if(!M&&!u)H0()}n0.current=!1,V0(),w(null),U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),e.current=null;return}n0.current=!0;let B=N.data,A=B.turn_id||B.turnId;if(A)d_(A);if(t_({running:!0,clearSilence:!0}),l_(),w(B),N.thought&&N.thought.text)f((M)=>{if(M&&M.text&&M.text.length>=N.thought.text.length)return M;return s.current=N.thought.text,{text:N.thought.text,totalLines:N.thought.totalLines||0}});if(N.draft&&N.draft.text)U((M)=>{if(M&&M.text&&M.text.length>=N.draft.text.length)return M;return l.current=N.draft.text,{text:N.draft.text,totalLines:N.draft.totalLines||0}})}catch(N){console.warn("Failed to fetch agent status:",N)}},[V0,l_,t_,H0,d_]),W_=S((N)=>{if($(N),N!=="connected"){w(null),U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),e.current=null,V0();return}if(!Z2.current){Z2.current=!0,c();return}let{currentHashtag:B,searchQuery:A}=b_.current;if(!B&&!A)H0();c()},[V0,H0,c]),j0=S(async(N)=>{J(N),Z0(null),await T0(N)},[T0]),m0=S(async()=>{J(null),Y(null),Z0(null),await T0()},[T0]),f0=S(async(N)=>{if(!N||!N.trim())return;Y(N.trim()),J(null),Z0(null);try{let B=await S6(N.trim());Z0(B.results),K1(!1)}catch(B){console.error("Failed to search:",B),Z0([])}},[]),O8=S(()=>{G(!0),Y(null),J(null),Z0([])},[]),B8=S(()=>{G(!1),Y(null),T0()},[T0]),u6=S(()=>{},[]),q8=S(async(N)=>{if(!N)return;let B=N.id,A=s0?.filter((u)=>u?.data?.thread_id===B&&u?.id!==B).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let M=(u)=>{if(!u.length)return;J0((h)=>{let t=new Set(h);return u.forEach((Q_)=>t.add(Q_)),t}),setTimeout(()=>{if(X2(()=>{Z0((h)=>h?h.filter((t)=>!u.includes(t.id)):h)}),J0((h)=>{let t=new Set(h);return u.forEach((Q_)=>t.delete(Q_)),t}),j2.current)k2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let u=await K8(B,A>0);if(u?.ids?.length)M(u.ids)}catch(u){let I=u?.message||"";if(A===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await K8(B,!0);if(t?.ids?.length)M(t.ids);return}console.error("Failed to delete post:",u),alert(`Failed to delete message: ${I}`)}},[s0,X2]),e1=S(async()=>{try{let N=await x6();q_(X8(N));let B=N?.user||{};$2((M)=>{let u=typeof B.name==="string"&&B.name.trim()?B.name.trim():"You",I=typeof B.avatar_url==="string"?B.avatar_url.trim():null,h=typeof B.avatar_background==="string"&&B.avatar_background.trim()?B.avatar_background.trim():null;if(M.name===u&&M.avatar_url===I&&M.avatar_background===h)return M;return{name:u,avatar_url:I,avatar_background:h}});let A=(N?.agents||[]).find((M)=>M.id==="default");if(A?.model)B_(A.model);a(A?.name,A?.avatar_url)}catch(N){console.warn("Failed to load agents:",N)}try{let N=await t1();if(N)s_(N)}catch{}},[a]);m(()=>{e1();let N=U2("sidebarWidth",null),B=Number.isFinite(N)?Math.min(Math.max(N,160),600):280;if(S0.current=B,U0.current)U0.current.style.setProperty("--sidebar-width",`${B}px`)},[e1]);let Q8=O0||C!==null,_3=S((N)=>{if(!N||typeof N!=="object")return;let B=N.agent_id;if(!B)return;let{agent_name:A,agent_avatar:M}=N;if(!A&&M===void 0)return;let u=W0.current?.[B]||{id:B},I=u.name||null,h=u.avatar_url??u.avatarUrl??u.avatar??null,t=!1,Q_=!1;if(A&&A!==u.name)I=A,Q_=!0;if(M!==void 0){let h0=typeof M==="string"?M.trim():null,Z3=typeof h==="string"?h.trim():null,B2=h0||null;if(B2!==(Z3||null))h=B2,t=!0}if(!Q_&&!t)return;if(q_((h0)=>{let B2={...h0[B]||{id:B}};if(Q_)B2.name=I;if(t)B2.avatar_url=h;return{...h0,[B]:B2}}),B==="default")a(I,h,t?Date.now():null)},[a]),$3=S((N)=>{if(!N||typeof N!=="object")return;let B=N.user_name??N.userName,A=N.user_avatar??N.userAvatar,M=N.user_avatar_background??N.userAvatarBackground;if(B===void 0&&A===void 0&&M===void 0)return;$2((u)=>{let I=typeof B==="string"&&B.trim()?B.trim():u.name||"You",h=A===void 0?u.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,t=M===void 0?u.avatar_background:typeof M==="string"&&M.trim()?M.trim():null;if(u.name===I&&u.avatar_url===h&&u.avatar_background===t)return u;return{name:I,avatar_url:h,avatar_background:t}})},[]),V1=S((N)=>{if(!N||typeof N!=="object")return;let B=N.model??N.current;if(B!==void 0)B_(B);if(N.thinking_level!==void 0)f_(N.thinking_level??null);if(N.supports_thinking!==void 0)w_(Boolean(N.supports_thinking));if(N.provider_usage!==void 0)k_(N.provider_usage??null)},[]),C2=S(()=>{I6().then((N)=>{if(N)V1(N)}).catch(()=>{})},[V1]),e_=S(()=>{T6().then((N)=>{let B=F_.current,A=Array.isArray(N?.items)?N.items.map((M)=>({...M})).filter((M)=>!B.has(M.row_id)):[];if(A.length){H_((M)=>{if(M.length===A.length&&M.every((u,I)=>u.row_id===A[I].row_id))return M;return A});return}B.clear(),H_((M)=>M.length===0?M:[])}).catch(()=>{H_((N)=>N.length===0?N:[])})},[H_]),z8=S((N)=>{let B=N?.row_id;if(B==null)return;F_.current.add(B),H_((A)=>A.filter((M)=>M?.row_id!==B)),f6(B).then(()=>{e_()}).catch((A)=>{console.warn("[queue] Failed to steer queued item:",A),F_.current.delete(B),e_()})},[e_,H_]),U8=S((N)=>{if(!N||typeof N!=="object")return;if(N?.queued==="followup"||N?.queued==="steer"){e_();return}let B=N?.command;if(B&&typeof B==="object"&&(B?.queued_followup||B?.queued_steer))e_()},[e_]),N1=S(()=>{C2(),e_()},[C2,e_]);m(()=>{N1();let N=setInterval(()=>{C2(),e_()},60000);return()=>clearInterval(N)},[N1,C2,e_]);let O1=S((N,B)=>{let A=B?.turn_id;if(_3(B),$3(B),N==="ui_theme"){X4(B);return}if(N?.startsWith("agent_")){if(!(N==="agent_draft_delta"||N==="agent_thought_delta"||N==="agent_draft"||N==="agent_thought"))l_()}if(N==="connected"){w(null),U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),e.current=null,V0(),N8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let Q_=t.data,h0=Q_.turn_id||Q_.turnId;if(h0)d_(h0);if(t_({clearSilence:!0}),r0(Q_),t.thought&&t.thought.text)s.current=t.thought.text,f({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)l.current=t.draft.text,U({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:I,searchQuery:h}=b_.current||{};if(!I&&!h)H0();N1();return}if(N==="agent_status"){if(B.type==="done"||B.type==="error"){if(A&&X_.current&&A!==X_.current)return;if(B.type==="done"){k0(A||X_.current);let{currentHashtag:I,searchQuery:h}=b_.current||{};if(!I&&!h)H0();if(B.context_usage)s_(B.context_usage)}if(n0.current=!1,V0(),F_.current.clear(),e_(),U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null),B.type==="error")w({type:"error",title:B.title||"Agent error"}),setTimeout(()=>w(null),8000);else w(null)}else{if(A)d_(A);if(t_({running:!0,clearSilence:!0}),B.type==="thinking")l.current="",s.current="",U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0});E2.current=B,w((I)=>{if(I&&I.type===B.type&&I.title===B.title)return I;return B})}return}if(N==="agent_steer_queued"){if(A&&X_.current&&A!==X_.current)return;let I=A||X_.current;if(!I)return;A_.current=I,G_(I);return}if(N==="agent_followup_queued"){let I=B?.row_id,h=B?.content;if(I!=null&&typeof h==="string"&&h.trim())H_((t)=>{if(t.some((Q_)=>Q_?.row_id===I))return t;return[...t,{row_id:I,content:h,timestamp:B?.timestamp||null,thread_id:B?.thread_id??null}]});e_();return}if(N==="agent_followup_consumed"){let I=B?.row_id;if(I!=null)H_((h)=>h.filter((t)=>t.row_id!==I));e_(),H0();return}if(N==="agent_followup_removed"){let I=B?.row_id;if(I!=null)F_.current.add(I),H_((h)=>h.filter((t)=>t.row_id!==I));e_();return}if(N==="agent_draft_delta"){if(A&&X_.current&&A!==X_.current)return;if(A&&!X_.current)d_(A);if(t_({running:!0,clearSilence:!0}),B?.reset)l.current="";if(B?.delta)l.current+=B.delta;let I=Date.now();if(!m_.current||I-m_.current>=100){m_.current=I;let h=l.current,t=a1(h);if(N_.current)U((Q_)=>({text:Q_?.text||"",totalLines:t,fullText:h}));else U({text:h,totalLines:t})}return}if(N==="agent_draft"){if(A&&X_.current&&A!==X_.current)return;if(A&&!X_.current)d_(A);t_({running:!0,clearSilence:!0});let I=B.text||"",h=B.mode||(B.kind==="plan"?"replace":"append"),t=Number.isFinite(B.total_lines)?B.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(B.kind==="plan")if(h==="replace")g(I);else g((Q_)=>(Q_||"")+I);else if(!N_.current)l.current=I,U({text:I,totalLines:t});return}if(N==="agent_thought_delta"){if(A&&X_.current&&A!==X_.current)return;if(A&&!X_.current)d_(A);if(t_({running:!0,clearSilence:!0}),B?.reset)s.current="";if(typeof B?.delta==="string")s.current+=B.delta;let I=Date.now();if(Z_.current&&(!E0.current||I-E0.current>=100)){E0.current=I;let h=s.current;f((t)=>({text:t?.text||"",totalLines:a1(h),fullText:h}))}return}if(N==="agent_thought"){if(A&&X_.current&&A!==X_.current)return;if(A&&!X_.current)d_(A);t_({running:!0,clearSilence:!0});let I=B.text||"",h=Number.isFinite(B.total_lines)?B.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!Z_.current)s.current=I,f({text:I,totalLines:h});return}if(N==="agent_request"){if(console.log("Agent request:",B),A&&X_.current&&A!==X_.current)return;if(A)d_(A);t_({running:!0,clearSilence:!0}),n(B),e.current=B;return}if(N==="agent_request_timeout"){if(console.log("Agent request timeout:",B),A&&X_.current&&A!==X_.current)return;n(null),e.current=null,V0(),w({type:"error",title:"Permission request timed out"});return}if(N==="model_changed"){if(B?.model!==void 0)B_(B.model);if(B?.thinking_level!==void 0)f_(B.thinking_level??null);if(B?.supports_thinking!==void 0)w_(Boolean(B.supports_thinking));t1().then((I)=>{if(I)s_(I)}).catch(()=>{});return}if(N==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:B}));return}let{currentHashtag:M,searchQuery:u}=b_.current;if(N==="agent_response")N2(),x0.current={post:B,turnId:X_.current};if(!M&&!u&&(N==="new_post"||N==="agent_response"))Z0((I)=>{if(!I)return[B];if(I.some((h)=>h.id===B.id))return I;return[...I,B]}),I0.current?.();if(N==="interaction_updated")Z0((I)=>{if(!I)return I;if(!I.some((h)=>h.id===B.id))return I;return I.map((h)=>h.id===B.id?B:h)});if(N==="interaction_deleted"){let I=B?.ids||[];if(I.length){X2(()=>{Z0((Q_)=>Q_?Q_.filter((h0)=>!I.includes(h0.id)):Q_)});let{currentHashtag:h,searchQuery:t}=b_.current;if(j2.current&&!h&&!t)k2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[V0,l_,k2,t_,k0,X2,H0,N2,d_,r0,_3,$3,C2,e_,H_]);m(()=>{if(typeof window>"u")return;let N=window.__PICLAW_TEST_API||{};return N.emit=O1,N.reset=()=>{N2(),V0(),w(null),U({text:"",totalLines:0}),g(""),f({text:"",totalLines:0}),n(null)},N.finalize=()=>d(),window.__PICLAW_TEST_API=N,()=>{if(window.__PICLAW_TEST_API===N)window.__PICLAW_TEST_API=void 0}},[V0,d,O1,N2]),s4({handleSseEvent:O1,handleConnectionStatusChange:W_,loadPosts:T0}),m(()=>{if(!s0||s0.length===0)return;let N=location.hash;if(!N||!N.startsWith("#msg-"))return;let B=N.slice(5);D0(B),history.replaceState(null,"",location.pathname+location.search)},[s0,D0]);let B1=C!==null;m(()=>{if(_!=="connected")return;let B=setInterval(()=>{let{currentHashtag:A,searchQuery:M}=b_.current||{},u=!A&&!M;if(B1){if(u)H0();e_(),c(),r()}else{if(u)H0();c(),r()}},B1?15000:60000);return()=>clearInterval(B)},[_,B1,c,r,e_,H0]);let H8=S(()=>{P0((N)=>!N)},[]);m(()=>{if(!o_)return;if(typeof window>"u")return;let N=U0.current;if(!N)return;if(!w0.current){let B=U2("editorWidth",null),A=S0.current||280;w0.current=Number.isFinite(B)?B:A}if(N.style.setProperty("--editor-width",`${w0.current}px`),!g0.current){let B=U2("dockHeight",null);g0.current=Number.isFinite(B)?B:200}N.style.setProperty("--dock-height",`${g0.current}px`)},[o_]);let O2=n_.getDockPanes().length>0,[q1,L8]=v(!1),x2=S(()=>L8((N)=>!N),[]);m(()=>{if(!O2)return;let N=(B)=>{if(B.ctrlKey&&B.key==="`")B.preventDefault(),x2()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[x2,O2]);let F8=Boolean($_&&$_===(C?.turn_id||Y_));return Q`
        <div class=${`app-shell${R_?"":" workspace-collapsed"}${o_?" editor-open":""}`} ref=${U0}>
            <${n4}
                onFileSelect=${j_}
                visible=${R_}
                active=${R_||o_}
                onOpenEditor=${$0}
            />
            <button
                class=${`workspace-toggle-tab${R_?" open":" closed"}`}
                onClick=${H8}
                title=${R_?"Hide workspace":"Show workspace"}
                aria-label=${R_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${K} onTouchStart=${q}></div>
            ${o_&&Q`
                <div class="editor-pane-container">
                    <${o4}
                        tabs=${Y0}
                        activeId=${u_}
                        onActivate=${e0}
                        onClose=${i0}
                        onCloseOthers=${l0}
                        onCloseAll=${_2}
                        onTogglePin=${K0}
                        onTogglePreview=${M0}
                        previewTabs=${X0}
                        onToggleDock=${O2?x2:void 0}
                        dockVisible=${O2&&q1}
                    />
                    <div class="editor-pane-host" ref=${F0}></div>
                    ${u_&&X0.has(u_)&&Q`
                        <${r4}
                            getContent=${()=>c_.current?.getContent?.()}
                            path=${u_}
                            onClose=${()=>M0(u_)}
                        />
                    `}
                    ${O2&&q1&&Q`<div class="dock-splitter" onMouseDown=${R} onTouchStart=${o}></div>`}
                    ${O2&&Q`<div class=${`dock-panel${q1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${x2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending - xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${F} onTouchStart=${k}></div>
            `}
            <div class="container">
                ${X&&W8()&&Q`<div class="search-results-spacer"></div>`}
                ${(Z||X)&&Q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${m0}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${Z?`#${Z}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${y4}
                    posts=${s0}
                    hasMore=${j1}
                    onLoadMore=${G1}
                    timelineRef=${h_}
                    onHashtagClick=${j0}
                    onMessageRef=${G2}
                    onScrollToMessage=${D0}
                    onFileRef=${x_}
                    onPostClick=${void 0}
                    onDeletePost=${q8}
                    emptyMessage=${Z?`No posts with #${Z}`:X?`No results for "${X}"`:void 0}
                    agents=${L_}
                    user=${z0}
                    reverse=${!(X&&!Z)}
                    removingPostIds=${C_}
                    searchQuery=${X}
                />
                <${L4}
                    status=${C}
                    draft=${T}
                    plan=${b}
                    thought=${y}
                    pendingRequest=${i}
                    intent=${E}
                    turnId=${Y_}
                    steerQueued=${F8}
                    onPanelToggle=${N0}
                />
                <${a3}
                    onPost=${()=>{T0(),Y2()}}
                    onFocus=${Y2}
                    searchMode=${j}
                    onSearch=${f0}
                    onEnterSearch=${O8}
                    onExitSearch=${B8}
                    fileRefs=${V}
                    onRemoveFileRef=${E_}
                    onClearFileRefs=${p_}
                    messageRefs=${W}
                    onRemoveMessageRef=${J2}
                    onClearMessageRefs=${V2}
                    activeEditorPath=${u_}
                    onAttachEditorFile=${b0}
                    onOpenFilePill=${x_}
                    followupQueueCount=${B0}
                    followupQueueItems=${U_}
                    onInjectQueuedFollowup=${z8}
                    onMessageResponse=${U8}
                    isAgentActive=${Q8}
                    activeModel=${M_}
                    modelUsage=${T_}
                    thinkingLevel=${z_}
                    supportsThinking=${S_}
                    contextUsage=${v_}
                    notificationsEnabled=${L0}
                    notificationPermission=${Q0}
                    onToggleNotifications=${P}
                    onModelChange=${B_}
                    onModelStateChange=${V1}
                />
                <${E4} status=${_} />
                <${F4}
                    request=${i}
                    onRespond=${()=>{n(null),e.current=null}}
                />
            </div>
        </div>
    `}b3(Q`<${R6} />`,document.getElementById("app"));

//# debugId=A98AD5E0C00D9A7564756E2164756E21
//# sourceMappingURL=app.bundle.js.map
