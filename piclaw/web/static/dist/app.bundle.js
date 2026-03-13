var d4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var M2,Q_,a1,O2,t1,R1,s4,w2={},e1=[],a4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function p0(_,$){for(var J in $)_[J]=$[J];return _}function _3(_){var $=_.parentNode;$&&$.removeChild(_)}function $3(_,$,J){var Z,j,Y,Q={};for(Y in $)Y=="key"?Z=$[Y]:Y=="ref"?j=$[Y]:Q[Y]=$[Y];if(arguments.length>2&&(Q.children=arguments.length>3?M2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)Q[Y]===void 0&&(Q[Y]=_.defaultProps[Y]);return C2(_,Q,Z,j,null)}function C2(_,$,J,Z,j){var Y={type:_,props:$,key:J,ref:Z,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:j==null?++a1:j};return Q_.vnode!=null&&Q_.vnode(Y),Y}function b2(_){return _.children}function k2(_,$){this.props=_,this.context=$}function J2(_,$){if($==null)return _.__?J2(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?J2(_):null}function J3(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return J3(_)}}function m1(_){(!_.__d&&(_.__d=!0)&&O2.push(_)&&!A2.__r++||R1!==Q_.debounceRendering)&&((R1=Q_.debounceRendering)||t1)(A2)}function A2(){for(var _;A2.__r=O2.length;)_=O2.sort(function($,J){return $.__v.__b-J.__v.__b}),O2=[],_.some(function($){var J,Z,j,Y,Q,G;$.__d&&(Q=(Y=(J=$).__v).__e,(G=J.__P)&&(Z=[],(j=p0({},Y)).__v=Y.__v+1,X1(G,Y,j,J.__n,G.ownerSVGElement!==void 0,Y.__h!=null?[Q]:null,Z,Q==null?J2(Y):Q,Y.__h),X3(Z,Y),Y.__e!=Q&&J3(Y)))})}function Z3(_,$,J,Z,j,Y,Q,G,W,V){var X,U,E,F,D,M,I,z=Z&&Z.__k||e1,w=z.length;for(J.__k=[],X=0;X<$.length;X++)if((F=J.__k[X]=(F=$[X])==null||typeof F=="boolean"?null:typeof F=="string"||typeof F=="number"||typeof F=="bigint"?C2(null,F,null,null,F):Array.isArray(F)?C2(b2,{children:F},null,null,null):F.__b>0?C2(F.type,F.props,F.key,null,F.__v):F)!=null){if(F.__=J,F.__b=J.__b+1,(E=z[X])===null||E&&F.key==E.key&&F.type===E.type)z[X]=void 0;else for(U=0;U<w;U++){if((E=z[U])&&F.key==E.key&&F.type===E.type){z[U]=void 0;break}E=null}X1(_,F,E=E||w2,j,Y,Q,G,W,V),D=F.__e,(U=F.ref)&&E.ref!=U&&(I||(I=[]),E.ref&&I.push(E.ref,null,F),I.push(U,F.__c||D,F)),D!=null?(M==null&&(M=D),typeof F.type=="function"&&F.__k!=null&&F.__k===E.__k?F.__d=W=Y3(F,W,_):W=j3(_,F,E,z,D,W),V||J.type!=="option"?typeof J.type=="function"&&(J.__d=W):_.value=""):W&&E.__e==W&&W.parentNode!=_&&(W=J2(E))}for(J.__e=M,X=w;X--;)z[X]!=null&&(typeof J.type=="function"&&z[X].__e!=null&&z[X].__e==J.__d&&(J.__d=J2(Z,X+1)),K3(z[X],z[X]));if(I)for(X=0;X<I.length;X++)Q3(I[X],I[++X],I[++X])}function Y3(_,$,J){var Z,j;for(Z=0;Z<_.__k.length;Z++)(j=_.__k[Z])&&(j.__=_,$=typeof j.type=="function"?Y3(j,$,J):j3(J,j,j,_.__k,j.__e,$));return $}function j3(_,$,J,Z,j,Y){var Q,G,W;if($.__d!==void 0)Q=$.__d,$.__d=void 0;else if(J==null||j!=Y||j.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(j),Q=null;else{for(G=Y,W=0;(G=G.nextSibling)&&W<Z.length;W+=2)if(G==j)break _;_.insertBefore(j,Y),Q=Y}return Q!==void 0?Q:j.nextSibling}function c1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||a4.test($)?J:J+"px"}function D2(_,$,J,Z,j){var Y;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)J&&$ in J||c1(_.style,$,"");if(J)for($ in J)Z&&J[$]===Z[$]||c1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=J,J?Z||_.addEventListener($,Y?p1:g1,Y):_.removeEventListener($,Y?p1:g1,Y);else if($!=="dangerouslySetInnerHTML"){if(j)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(Q){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function g1(_){this.l[_.type+!1](Q_.event?Q_.event(_):_)}function p1(_){this.l[_.type+!0](Q_.event?Q_.event(_):_)}function X1(_,$,J,Z,j,Y,Q,G,W){var V,X,U,E,F,D,M,I,z,w,f,H=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(W=J.__h,G=$.__e=J.__e,$.__h=null,Y=[G]),(V=Q_.__b)&&V($);try{_:if(typeof H=="function"){if(I=$.props,z=(V=H.contextType)&&Z[V.__c],w=V?z?z.props.value:V.__:Z,J.__c?M=(X=$.__c=J.__c).__=X.__E:(("prototype"in H)&&H.prototype.render?$.__c=X=new H(I,w):($.__c=X=new k2(I,w),X.constructor=H,X.render=e4),z&&z.sub(X),X.props=I,X.state||(X.state={}),X.context=w,X.__n=Z,U=X.__d=!0,X.__h=[]),X.__s==null&&(X.__s=X.state),H.getDerivedStateFromProps!=null&&(X.__s==X.state&&(X.__s=p0({},X.__s)),p0(X.__s,H.getDerivedStateFromProps(I,X.__s))),E=X.props,F=X.state,U)H.getDerivedStateFromProps==null&&X.componentWillMount!=null&&X.componentWillMount(),X.componentDidMount!=null&&X.__h.push(X.componentDidMount);else{if(H.getDerivedStateFromProps==null&&I!==E&&X.componentWillReceiveProps!=null&&X.componentWillReceiveProps(I,w),!X.__e&&X.shouldComponentUpdate!=null&&X.shouldComponentUpdate(I,X.__s,w)===!1||$.__v===J.__v){X.props=I,X.state=X.__s,$.__v!==J.__v&&(X.__d=!1),X.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(T){T&&(T.__=$)}),X.__h.length&&Q.push(X);break _}X.componentWillUpdate!=null&&X.componentWillUpdate(I,X.__s,w),X.componentDidUpdate!=null&&X.__h.push(function(){X.componentDidUpdate(E,F,D)})}X.context=w,X.props=I,X.state=X.__s,(V=Q_.__r)&&V($),X.__d=!1,X.__v=$,X.__P=_,V=X.render(X.props,X.state,X.context),X.state=X.__s,X.getChildContext!=null&&(Z=p0(p0({},Z),X.getChildContext())),U||X.getSnapshotBeforeUpdate==null||(D=X.getSnapshotBeforeUpdate(E,F)),f=V!=null&&V.type===b2&&V.key==null?V.props.children:V,Z3(_,Array.isArray(f)?f:[f],$,J,Z,j,Y,Q,G,W),X.base=$.__e,$.__h=null,X.__h.length&&Q.push(X),M&&(X.__E=X.__=null),X.__e=!1}else Y==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=t4(J.__e,$,J,Z,j,Y,Q,W);(V=Q_.diffed)&&V($)}catch(T){$.__v=null,(W||Y!=null)&&($.__e=G,$.__h=!!W,Y[Y.indexOf(G)]=null),Q_.__e(T,$,J)}}function X3(_,$){Q_.__c&&Q_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Z){Z.call(J)})}catch(Z){Q_.__e(Z,J.__v)}})}function t4(_,$,J,Z,j,Y,Q,G){var W,V,X,U=J.props,E=$.props,F=$.type,D=0;if(F==="svg"&&(j=!0),Y!=null){for(;D<Y.length;D++)if((W=Y[D])&&(W===_||(F?W.localName==F:W.nodeType==3))){_=W,Y[D]=null;break}}if(_==null){if(F===null)return document.createTextNode(E);_=j?document.createElementNS("http://www.w3.org/2000/svg",F):document.createElement(F,E.is&&E),Y=null,G=!1}if(F===null)U===E||G&&_.data===E||(_.data=E);else{if(Y=Y&&M2.call(_.childNodes),V=(U=J.props||w2).dangerouslySetInnerHTML,X=E.dangerouslySetInnerHTML,!G){if(Y!=null)for(U={},D=0;D<_.attributes.length;D++)U[_.attributes[D].name]=_.attributes[D].value;(X||V)&&(X&&(V&&X.__html==V.__html||X.__html===_.innerHTML)||(_.innerHTML=X&&X.__html||""))}if(function(M,I,z,w,f){var H;for(H in z)H==="children"||H==="key"||H in I||D2(M,H,null,z[H],w);for(H in I)f&&typeof I[H]!="function"||H==="children"||H==="key"||H==="value"||H==="checked"||z[H]===I[H]||D2(M,H,I[H],z[H],w)}(_,E,U,j,G),X)$.__k=[];else if(D=$.props.children,Z3(_,Array.isArray(D)?D:[D],$,J,Z,j&&F!=="foreignObject",Y,Q,Y?Y[0]:J.__k&&J2(J,0),G),Y!=null)for(D=Y.length;D--;)Y[D]!=null&&_3(Y[D]);G||(("value"in E)&&(D=E.value)!==void 0&&(D!==_.value||F==="progress"&&!D)&&D2(_,"value",D,U.value,!1),("checked"in E)&&(D=E.checked)!==void 0&&D!==_.checked&&D2(_,"checked",D,U.checked,!1))}return _}function Q3(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Z){Q_.__e(Z,J)}}function K3(_,$,J){var Z,j;if(Q_.unmount&&Q_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!==_.__e||Q3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(Y){Q_.__e(Y,$)}Z.base=Z.__P=null}if(Z=_.__k)for(j=0;j<Z.length;j++)Z[j]&&K3(Z[j],$,typeof _.type!="function");J||_.__e==null||_3(_.__e),_.__e=_.__d=void 0}function e4(_,$,J){return this.constructor(_,J)}function G3(_,$,J){var Z,j,Y;Q_.__&&Q_.__(_,$),j=(Z=typeof J=="function")?null:J&&J.__k||$.__k,Y=[],X1($,_=(!Z&&J||$).__k=$3(b2,null,[_]),j||w2,w2,$.ownerSVGElement!==void 0,!Z&&J?[J]:j?null:$.firstChild?M2.call($.childNodes):null,Y,!Z&&J?J:j?j.__e:$.firstChild,Z),X3(Y,_)}M2=e1.slice,Q_={__e:function(_,$){for(var J,Z,j;$=$.__;)if((J=$.__c)&&!J.__)try{if((Z=J.constructor)&&Z.getDerivedStateFromError!=null&&(J.setState(Z.getDerivedStateFromError(_)),j=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),j=J.__d),j)return J.__E=J}catch(Y){_=Y}throw _}},a1=0,k2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=p0({},this.state),typeof _=="function"&&(_=_(p0({},J),this.props)),_&&p0(J,_),_!=null&&this.__v&&($&&this.__h.push($),m1(this))},k2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),m1(this))},k2.prototype.render=b2,O2=[],t1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,A2.__r=0,s4=0;var P2,E0,h1,B2=0,Y1=[],i1=Q_.__b,l1=Q_.__r,o1=Q_.diffed,n1=Q_.__c,r1=Q_.unmount;function Q1(_,$){Q_.__h&&Q_.__h(E0,_,B2||$),B2=0;var J=E0.__H||(E0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function v(_){return B2=1,_8(V3,_)}function _8(_,$,J){var Z=Q1(P2++,2);return Z.t=_,Z.__c||(Z.__=[J?J($):V3(void 0,$),function(j){var Y=Z.t(Z.__[0],j);Z.__[0]!==Y&&(Z.__=[Y,Z.__[1]],Z.__c.setState({}))}],Z.__c=E0),Z.__}function g(_,$){var J=Q1(P2++,3);!Q_.__s&&W3(J.__H,$)&&(J.__=_,J.__H=$,E0.__H.__h.push(J))}function y(_){return B2=5,f0(function(){return{current:_}},[])}function f0(_,$){var J=Q1(P2++,7);return W3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function P(_,$){return B2=8,f0(function(){return _},$)}function $8(){Y1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(y2),_.__H.__h.forEach(j1),_.__H.__h=[]}catch($){_.__H.__h=[],Q_.__e($,_.__v)}}),Y1=[]}Q_.__b=function(_){E0=null,i1&&i1(_)},Q_.__r=function(_){l1&&l1(_),P2=0;var $=(E0=_.__c).__H;$&&($.__h.forEach(y2),$.__h.forEach(j1),$.__h=[])},Q_.diffed=function(_){o1&&o1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(Y1.push($)!==1&&h1===Q_.requestAnimationFrame||((h1=Q_.requestAnimationFrame)||function(J){var Z,j=function(){clearTimeout(Y),d1&&cancelAnimationFrame(Z),setTimeout(J)},Y=setTimeout(j,100);d1&&(Z=requestAnimationFrame(j))})($8)),E0=void 0},Q_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(y2),J.__h=J.__h.filter(function(Z){return!Z.__||j1(Z)})}catch(Z){$.some(function(j){j.__h&&(j.__h=[])}),$=[],Q_.__e(Z,J.__v)}}),n1&&n1(_,$)},Q_.unmount=function(_){r1&&r1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(y2)}catch(J){Q_.__e(J,$.__v)}};var d1=typeof requestAnimationFrame=="function";function y2(_){var $=E0;typeof _.__c=="function"&&_.__c(),E0=$}function j1(_){var $=E0;_.__c=_.__(),E0=$}function W3(_,$){return!_||_.length!==$.length||$.some(function(J,Z){return J!==_[Z]})}function V3(_,$){return typeof $=="function"?$(_):$}var N3=function(_,$,J,Z){var j;$[0]=0;for(var Y=1;Y<$.length;Y++){var Q=$[Y++],G=$[Y]?($[0]|=Q?1:2,J[$[Y++]]):$[++Y];Q===3?Z[0]=G:Q===4?Z[1]=Object.assign(Z[1]||{},G):Q===5?(Z[1]=Z[1]||{})[$[++Y]]=G:Q===6?Z[1][$[++Y]]+=G+"":Q?(j=_.apply(G,N3(_,G,J,["",null])),Z.push(j),G[0]?$[0]|=2:($[Y-2]=0,$[Y]=j)):Z.push(G)}return Z},s1=new Map,B=function(_){var $=s1.get(this);return $||($=new Map,s1.set(this,$)),($=N3(this,$.get(_)||($.set(_,$=function(J){for(var Z,j,Y=1,Q="",G="",W=[0],V=function(E){Y===1&&(E||(Q=Q.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?W.push(0,E,Q):Y===3&&(E||Q)?(W.push(3,E,Q),Y=2):Y===2&&Q==="..."&&E?W.push(4,E,0):Y===2&&Q&&!E?W.push(5,0,!0,Q):Y>=5&&((Q||!E&&Y===5)&&(W.push(Y,0,Q,j),Y=6),E&&(W.push(Y,E,0,j),Y=6)),Q=""},X=0;X<J.length;X++){X&&(Y===1&&V(),V(X));for(var U=0;U<J[X].length;U++)Z=J[X][U],Y===1?Z==="<"?(V(),W=[W],Y=3):Q+=Z:Y===4?Q==="--"&&Z===">"?(Y=1,Q=""):Q=Z+Q[0]:G?Z===G?G="":Q+=Z:Z==='"'||Z==="'"?G=Z:Z===">"?(V(),Y=1):Y&&(Z==="="?(Y=5,j=Q,Q=""):Z==="/"&&(Y<5||J[X][U+1]===">")?(V(),Y===3&&(W=W[0]),Y=W,(W=W[0]).push(2,0,Y),Y=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(V(),Y=2):Q+=Z),Y===3&&Q==="!--"&&(Y=4,W=W[0])}return V(),W}(_)),$),arguments,[])).length>1?$:$[0]}.bind($3);async function s_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Z=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function I2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return s_(J)}async function q3(_,$=50,J=0){return s_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function O3(_,$=50,J=0){return s_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function B3(_){return s_(`/thread/${_}`)}async function z3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return s_(J,{method:"DELETE"})}async function K1(_,$,J=null,Z=[]){return s_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Z})})}async function H3(){return s_("/agents")}async function U3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/status${$}`)}async function G1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/context${$}`)}async function n0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/models${$}`)}async function L3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Z=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function W1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function F3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function E3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return s_(J)}async function D3(_,$,J){return s_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function Z2(_){return`/media/${_}`}function C3(_){return`/media/${_}/thumbnail`}async function S2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function x2(_="",$=2,J=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return s_(Z)}async function k3(_,$=20000,J=null){let Z=J?`&mode=${encodeURIComponent(J)}`:"",j=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return s_(j)}async function y3(_){return s_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function V1(_,$="",J={}){let Z=new FormData;Z.append("file",_);let j=new URLSearchParams;if($)j.set("path",$);if(J.overwrite)j.set("overwrite","1");let Y=j.toString(),Q=Y?`/workspace/upload?${Y}`:"/workspace/upload",G=await fetch(""+Q,{method:"POST",body:Z});if(!G.ok){let W=await G.json().catch(()=>({error:"Upload failed"})),V=Error(W.error||`HTTP ${G.status}`);throw V.status=G.status,V.code=W.code,V}return G.json()}async function w3(_,$,J=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Z.ok){let j=await Z.json().catch(()=>({error:"Create failed"})),Y=Error(j.error||`HTTP ${Z.status}`);throw Y.status=Z.status,Y.code=j.code,Y}return Z.json()}async function A3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Rename failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function M3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Move failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function b3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return s_($,{method:"DELETE"})}async function T2(_,$=!1){return s_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function N1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function P3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class q1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-J,0),j=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},j),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function r0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function T_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function Y2(_,$=!1){let J=r0(_);if(J===null)return $;return J==="true"}function j2(_,$=null){let J=r0(_);if(J===null)return $;let Z=parseInt(J,10);return Number.isFinite(Z)?Z:$}function h0({prefix:_="file",label:$,title:J,onRemove:Z,onClick:j,removeTitle:Y="Remove",icon:Q="file"}){let G=`${_}-file-pill`,W=`${_}-file-name`,V=`${_}-file-remove`,X=Q==="message"?B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return B`
    <span class=${G} title=${J||$} onClick=${j}>
      ${X}
      <span class=${W}>${$}</span>
      ${Z&&B`
        <button
          class=${V}
          onClick=${(U)=>{U.preventDefault(),U.stopPropagation(),Z()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var Z8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function Y8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Z=_.contextWindow,j=J!=null?`Context: ${I3(J)} / ${I3(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,Q=2*Math.PI*7,G=$/100*Q,W=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return B`
        <span class="compose-context-pie icon-btn" title=${j}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${W}
                    stroke-width="2.5"
                    stroke-dasharray=${`${G} ${Q}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function I3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function S3({onPost:_,onFocus:$,searchMode:J,onSearch:Z,onEnterSearch:j,onExitSearch:Y,fileRefs:Q=[],onRemoveFileRef:G,onClearFileRefs:W,messageRefs:V=[],onRemoveMessageRef:X,onClearMessageRefs:U,activeModel:E=null,modelUsage:F=null,thinkingLevel:D=null,supportsThinking:M=!1,contextUsage:I=null,notificationsEnabled:z=!1,notificationPermission:w="default",onToggleNotifications:f,onModelChange:H,onModelStateChange:T,activeEditorPath:s=null,onAttachEditorFile:r,onOpenFilePill:Z_}){let[X_,$_]=v(""),[j_,a]=v(""),[h,J_]=v(!1),[l,t]=v([]),[B_,O_]=v(!1),[c,W_]=v([]),[K_,V_]=v(0),[y_,N_]=v(!1),[U_,A_]=v(!1),[F_,D_]=v(!1),[R_,C_]=v([]),[r_,K0]=v(!1),L_=y(null),M_=y(null),Z0=y(null),O0=y(null),G0=y(0),B0=200,z0=(L)=>{let u=new Set,n=[];for(let Y_ of L||[]){if(typeof Y_!=="string")continue;let H_=Y_.trim();if(!H_||u.has(H_))continue;u.add(H_),n.push(H_)}return n},b_=()=>{let L=r0("piclaw_compose_history");if(!L)return[];try{let u=JSON.parse(L);if(!Array.isArray(u))return[];return z0(u)}catch{return[]}},m_=(L)=>{T_("piclaw_compose_history",JSON.stringify(L))},t_=y(b_()),d_=y(-1),f_=y(""),b=!h&&(X_.trim()||l.length>0||Q.length>0||V.length>0),d=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),P_=typeof window<"u"&&typeof Notification<"u",p_=typeof window<"u"?Boolean(window.isSecureContext):!1,H0=P_&&p_&&w!=="denied",a_=w==="granted"&&z,D0=a_?"Disable notifications":"Enable notifications",C0=E||"",Y0=M&&D?` (${D})`:"",h_=Y0.trim()?`${D}`:"",v0=typeof F?.hint_short==="string"?F.hint_short.trim():"",j0=[h_||null,v0||null].filter(Boolean).join(" • "),X0=[C0?`Current model: ${C0}${Y0}`:null,F?.plan?`Plan: ${F.plan}`:null,v0||null,F?.primary?.reset_description||null,F?.secondary?.reset_description||null].filter(Boolean),S0=U_?"Switching model…":X0.join(" • ")||`Current model: ${C0}${Y0} (tap to open model picker)`,e_=(L)=>{if(!L||typeof L!=="object")return;let u=L.model??L.current;if(typeof T==="function")T({model:u??null,thinking_level:L.thinking_level??null,supports_thinking:L.supports_thinking,provider_usage:L.provider_usage??null});if(u&&typeof H==="function")H(u)},M0=(L)=>{let u=L||L_.current;if(!u)return;u.style.height="auto",u.style.height=`${u.scrollHeight}px`,u.style.overflowY="hidden"},_0=(L)=>{if(!L.startsWith("/")||L.includes(`
`)){N_(!1),W_([]);return}let u=L.toLowerCase().split(" ")[0];if(u.length<1){N_(!1),W_([]);return}let n=Z8.filter((Y_)=>Y_.name.startsWith(u)||Y_.name.replace(/-/g,"").startsWith(u.replace(/-/g,"")));if(n.length>0&&!(n.length===1&&n[0].name===u))W_(n),V_(0),N_(!0);else N_(!1),W_([])},W0=(L)=>{let u=X_,n=u.indexOf(" "),Y_=n>=0?u.slice(n):"",H_=L.name+Y_;$_(H_),N_(!1),W_([]),requestAnimationFrame(()=>{let x_=L_.current;if(!x_)return;let z_=H_.length;x_.selectionStart=z_,x_.selectionEnd=z_,x_.focus()})},V0=(L)=>{if(J)a(L);else $_(L),_0(L);requestAnimationFrame(()=>M0())},i_=(L)=>{let u=J?j_:X_,n=u&&!u.endsWith(`
`)?`
`:"",Y_=`${u}${n}${L}`.trimStart();V0(Y_)},U0=(L)=>{let u=L?.command?.model_label;if(u)return u;let n=L?.command?.message;if(typeof n==="string"){let Y_=n.match(/•\s+([^\n]+?)\s+\(current\)/);if(Y_?.[1])return Y_[1].trim()}return null},b0=async(L)=>{if(J||h||U_)return;A_(!0);try{let u=await K1("default",L,null,[]),n=U0(u);e_({model:n??E??null,thinking_level:u?.command?.thinking_level,supports_thinking:u?.command?.supports_thinking});try{let Y_=await n0();if(Y_)e_(Y_)}catch{}return _?.(),!0}catch(u){return console.error("Failed to switch model:",u),alert("Failed to switch model: "+u.message),!1}finally{A_(!1)}},i0=async()=>{await b0("/cycle-model")},R0=async(L)=>{if(!L||U_)return;if(await b0(`/model ${L}`))D_(!1)},u_=(L)=>{L.preventDefault(),L.stopPropagation(),D_((u)=>!u)},Q0=async(L)=>{let u=typeof L==="string"?L:L&&typeof L?.target?.value==="string"?L.target.value:X_,n=typeof u==="string"?u:"";if(!n.trim()&&l.length===0&&Q.length===0&&V.length===0)return;J_(!0);try{let Y_=[];for(let w_ of l){let k_=await L3(w_);Y_.push(k_.id)}let H_=n.trim(),x_=Q.length?`Files:
${Q.map((w_)=>`- ${w_}`).join(`
`)}`:"",z_=V.length?`Referenced messages:
${V.map((w_)=>`- message:${w_}`).join(`
`)}`:"",o_=Y_.length?`Images:
${Y_.map((w_,k_)=>{let W2=l[k_]?.name||`image-${k_+1}`;return`- attachment:${w_} (${W2})`}).join(`
`)}`:"",v_=[H_,x_,z_,o_].filter(Boolean).join(`

`),w0=await K1("default",v_,null,Y_);if(w0?.command){e_({model:w0.command.model_label??E??null,thinking_level:w0.command.thinking_level,supports_thinking:w0.command.supports_thinking});try{let w_=await n0();if(w_)e_(w_)}catch{}}if(H_){let w_=t_.current,k_=z0(w_.filter((l0)=>l0!==H_));if(k_.push(H_),k_.length>200)k_.splice(0,k_.length-200);t_.current=k_,m_(k_),d_.current=-1,f_.current=""}$_(""),t([]),W?.(),U?.(),_?.()}catch(Y_){console.error("Failed to post:",Y_),alert("Failed to post: "+Y_.message)}finally{J_(!1)}},$0=(L)=>{if(L.isComposing)return;if(J&&L.key==="Escape"){L.preventDefault(),a(""),Y?.();return}if(y_&&c.length>0){let u=L_.current?.value??(J?j_:X_);if(!String(u||"").startsWith("/"))N_(!1),W_([]);else{if(L.key==="ArrowDown"){L.preventDefault(),V_((n)=>(n+1)%c.length);return}if(L.key==="ArrowUp"){L.preventDefault(),V_((n)=>(n-1+c.length)%c.length);return}if(L.key==="Tab"){L.preventDefault(),W0(c[K_]);return}if(L.key==="Enter"&&!L.shiftKey){if(!(L_.current?.value??(J?j_:X_)).includes(" ")){L.preventDefault();let H_=c[K_];N_(!1),W_([]),Q0(H_.name);return}}if(L.key==="Escape"){L.preventDefault(),N_(!1),W_([]);return}}}if(!J&&(L.key==="ArrowUp"||L.key==="ArrowDown")&&!L.metaKey&&!L.ctrlKey&&!L.altKey&&!L.shiftKey){let u=L_.current;if(!u)return;let n=u.value||"",Y_=u.selectionStart===0&&u.selectionEnd===0,H_=u.selectionStart===n.length&&u.selectionEnd===n.length;if(L.key==="ArrowUp"&&Y_||L.key==="ArrowDown"&&H_){let x_=t_.current;if(!x_.length)return;L.preventDefault();let z_=d_.current;if(L.key==="ArrowUp"){if(z_===-1)f_.current=n,z_=x_.length-1;else if(z_>0)z_-=1;d_.current=z_,V0(x_[z_]||"")}else{if(z_===-1)return;if(z_<x_.length-1)z_+=1,d_.current=z_,V0(x_[z_]||"");else d_.current=-1,V0(f_.current||""),f_.current=""}requestAnimationFrame(()=>{let o_=L_.current;if(!o_)return;let v_=o_.value.length;o_.selectionStart=v_,o_.selectionEnd=v_});return}}if(L.key==="Enter"&&!L.shiftKey){L.preventDefault();let u=L_.current?.value??(J?j_:X_);if(J){if(u.trim())Z?.(u.trim())}else Q0(u)}},S_=(L)=>{let u=Array.from(L||[]).filter((n)=>n&&n.type&&n.type.startsWith("image/"));if(!u.length)return;t((n)=>[...n,...u])},l_=(L)=>{S_(L.target.files),L.target.value=""},J0=(L)=>{if(J)return;L.preventDefault(),L.stopPropagation(),G0.current+=1,O_(!0)},L0=(L)=>{if(J)return;if(L.preventDefault(),L.stopPropagation(),G0.current=Math.max(0,G0.current-1),G0.current===0)O_(!1)},k0=(L)=>{if(J)return;if(L.preventDefault(),L.stopPropagation(),L.dataTransfer)L.dataTransfer.dropEffect="copy";O_(!0)},y0=(L)=>{if(J)return;L.preventDefault(),L.stopPropagation(),G0.current=0,O_(!1),S_(L.dataTransfer?.files||[])},m0=(L)=>{if(J)return;let u=L.clipboardData?.items;if(!u||!u.length)return;let n=[];for(let Y_ of u){if(Y_.kind!=="file")continue;let H_=Y_.getAsFile?.();if(H_)n.push(H_)}if(n.length>0)L.preventDefault(),S_(n)},N0=(L)=>{t((u)=>u.filter((n,Y_)=>Y_!==L))},G2=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((L)=>{let{latitude:u,longitude:n,accuracy:Y_}=L.coords,H_=`${u.toFixed(5)}, ${n.toFixed(5)}`,x_=Number.isFinite(Y_)?` ±${Math.round(Y_)}m`:"",z_=`https://maps.google.com/?q=${u},${n}`,o_=`Location: ${H_}${x_} ${z_}`;i_(o_)},(L)=>{let u=L?.message||"Unable to retrieve location.";alert(`Location error: ${u}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};g(()=>{if(!F_)return;K0(!0),n0().then((L)=>{let u=Array.isArray(L?.models)?L.models.filter((n)=>typeof n==="string"&&n.trim().length>0):[];C_(u),e_(L)}).catch((L)=>{console.warn("Failed to load model list:",L),C_([])}).finally(()=>{K0(!1)})},[F_,E]),g(()=>{if(J)D_(!1)},[J]),g(()=>{if(!F_)return;let L=(u)=>{let n=Z0.current,Y_=O0.current,H_=u.target;if(n&&n.contains(H_))return;if(Y_&&Y_.contains(H_))return;D_(!1)};return document.addEventListener("pointerdown",L),()=>document.removeEventListener("pointerdown",L)},[F_]);let x0=(L)=>{let u=L.target.value;M0(L.target),V0(u)};return g(()=>{requestAnimationFrame(()=>M0())},[X_,j_,J]),B`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${B_?" drag-active":""}`}
                onDragEnter=${J0}
                onDragOver=${k0}
                onDragLeave=${L0}
                onDrop=${y0}
            >
                <div class="compose-input-main">
                    ${(Q.length>0||l.length>0||V.length>0)&&B`
                        <div class="compose-file-refs">
                            ${V.map((L)=>{return B`
                                    <${h0}
                                        key=${"msg-"+L}
                                        prefix="compose"
                                        label=${"msg:"+L}
                                        title=${"Message reference: "+L}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>X?.(L)}
                                    />
                                `})}
                            ${Q.map((L)=>{let u=L.split("/").pop()||L;return B`
                                    <${h0}
                                        prefix="compose"
                                        label=${u}
                                        title=${L}
                                        onClick=${()=>Z_?.(L)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>G?.(L)}
                                    />
                                `})}
                            ${l.map((L,u)=>{let n=L?.name||`image-${u+1}`;return B`
                                    <${h0}
                                        key=${n+u}
                                        prefix="compose"
                                        label=${n}
                                        title=${n}
                                        removeTitle="Remove image"
                                        onRemove=${()=>N0(u)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${L_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?j_:X_}
                        onInput=${x0}
                        onKeyDown=${$0}
                        onPaste=${m0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${h}
                        rows="1"
                    />
                    ${y_&&c.length>0&&B`
                        <div class="slash-autocomplete" ref=${M_}>
                            ${c.map((L,u)=>B`
                                <div
                                    key=${L.name}
                                    class=${`slash-item${u===K_?" active":""}`}
                                    onMouseDown=${(n)=>{n.preventDefault(),W0(L)}}
                                    onMouseEnter=${()=>V_(u)}
                                >
                                    <span class="slash-name">${L.name}</span>
                                    <span class="slash-desc">${L.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${F_&&!J&&B`
                        <div class="compose-model-popup" ref=${Z0}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${r_&&B`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!r_&&R_.length===0&&B`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!r_&&R_.map((L)=>B`
                                    <button
                                        key=${L}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${E===L?" active":""}`}
                                        onClick=${()=>{R0(L)}}
                                        disabled=${U_}
                                    >
                                        ${L}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{i0()}}
                                    disabled=${U_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&E&&B`
                        <div class="compose-meta-row">
                            <div class="compose-model-meta">
                                <button
                                    ref=${O0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${S0}
                                    aria-label="Open model picker"
                                    onClick=${u_}
                                    disabled=${h||U_}
                                >
                                    ${U_?"Switching…":C0}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!U_&&j0&&B`
                                        <span class="compose-model-usage-hint" title=${S0}>
                                            ${j0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&I&&I.percent!=null&&B`
                        <${Y8} usage=${I} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${J?Y:j}
                        title=${J?"Close search":"Search"}
                    >
                        ${J?B`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:B`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${d&&!J&&B`
                        <button
                            class="icon-btn location-btn"
                            onClick=${G2}
                            title="Share location"
                            type="button"
                            disabled=${h}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${H0&&!J&&B`
                        <button
                            class=${`icon-btn notification-btn${a_?" active":""}`}
                            onClick=${f}
                            title=${D0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&B`
                        ${s&&r&&B`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${r}
                                title=${`Attach open file: ${s}`}
                                type="button"
                                disabled=${h||Q.includes(s)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${l_} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{Q0()}}
                            disabled=${!b}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var T3="piclaw_theme",z1="piclaw_tint",v2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},j8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},x3={default:{label:"Default",mode:"auto",light:v2,dark:j8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},X8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],R2={theme:"default",tint:null},f3="light",O1=!1;function u3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function X2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Z=J.length===3?J.split("").map((Y)=>Y+Y).join(""):J,j=parseInt(Z,16);return{r:j>>16&255,g:j>>8&255,b:j&255,hex:`#${Z.toLowerCase()}`}}function Q8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Z=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Z=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let j=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!j)return null;let Y=parseInt(j[1],10),Q=parseInt(j[2],10),G=parseInt(j[3],10);if(![Y,Q,G].every((V)=>Number.isFinite(V)))return null;let W=`#${[Y,Q,G].map((V)=>V.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:Q,b:G,hex:W}}function v3(_){return X2(_)||Q8(_)}function z2(_,$,J){let Z=Math.round(_.r+($.r-_.r)*J),j=Math.round(_.g+($.g-_.g)*J),Y=Math.round(_.b+($.b-_.b)*J);return`rgb(${Z} ${j} ${Y})`}function B1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function R3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function H1(_){return x3[_]||x3.default}function K8(_){return _.mode==="auto"?R3():_.mode}function G8(_,$){let J=H1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||v2}function W8(_,$,J){let Z=v3($);if(!Z)return _;let j=X2(_.bgPrimary),Y=X2(_.bgSecondary),Q=X2(_.bgHover),G=X2(_.borderColor);if(!j||!Y||!Q||!G)return _;let V=X2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:z2(j,Z,0.08),bgSecondary:z2(Y,Z,0.12),bgHover:z2(Q,Z,0.16),borderColor:z2(G,Z,0.08),accent:Z.hex,accentHover:V?z2(Z,V,0.18):Z.hex}}function V8(_,$){if(typeof document>"u")return;let J=document.documentElement,Z=_.accent,j=v3(Z),Y=j?B1(j,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,Q=j?B1(j,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",G=j?B1(j,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",W={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":Q,"--accent-soft-strong":G,"--danger-color":_.danger||v2.danger,"--success-color":_.success||v2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(W).forEach(([V,X])=>{if(X)J.style.setProperty(V,X)})}function N8(){if(typeof document>"u")return;let _=document.documentElement;X8.forEach(($)=>_.style.removeProperty($))}function f2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function q8(_,$){if(typeof document>"u")return;let J=f2("theme-color");if(J&&_)J.setAttribute("content",_);let Z=f2("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let j=f2("msapplication-navbutton-color");if(j&&_)j.setAttribute("content",_);let Y=f2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function O8(){if(typeof window>"u")return;let _={...R2,mode:f3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function U1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=u3(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,j=H1(J),Y=K8(j),Q=G8(J,Y);R2={theme:J,tint:Z},f3=Y;let G=document.documentElement;G.dataset.theme=Y,G.dataset.colorTheme=J,G.dataset.tint=Z?String(Z):"",G.style.colorScheme=Y;let W=Q;if(J==="default"&&Z)W=W8(Q,Z,Y);if(J==="default"&&!Z)N8();else V8(W,Y);if(q8(W.bgPrimary,Y),O8(),$.persist!==!1)if(T_(T3,J),Z)T_(z1,Z);else T_(z1,"")}function u2(){if(H1(R2.theme).mode!=="auto")return;U1(R2,{persist:!1})}function m3(){if(typeof window>"u")return()=>{};let _=u3(r0(T3)||"default"),$=r0(z1),J=$?$.trim():null;if(U1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!O1){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",u2);else if(Z.addListener)Z.addListener(u2);return O1=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",u2);else if(Z.removeListener)Z.removeListener(u2);O1=!1}}return()=>{}}function c3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Z=_.tint??null;U1({theme:J||"default",tint:Z},{persist:!0})}function g3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return R3()}var m2=/#(\w+)/g,B8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),z8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),H8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),U8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},L8=new Set(["http:","https:","mailto:",""]);function p3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function Q2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Z=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!L8.has(Z.protocol))return null;return Z.href}catch{return null}}function h3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Z=[],j=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=j.nextNode())Z.push(Y);for(let Q of Z){let G=Q.tagName.toLowerCase();if(!z8.has(G)){let V=Q.parentNode;if(!V)continue;while(Q.firstChild)V.insertBefore(Q.firstChild,Q);V.removeChild(Q);continue}let W=U8[G]||new Set;for(let V of Array.from(Q.attributes)){let X=V.name.toLowerCase(),U=V.value;if(X.startsWith("on")){Q.removeAttribute(V.name);continue}if(X.startsWith("data-")||X.startsWith("aria-"))continue;if(W.has(X)||H8.has(X)){if(X==="href"){let E=Q2(U);if(!E)Q.removeAttribute(V.name);else if(Q.setAttribute(V.name,E),G==="a"&&!Q.getAttribute("rel"))Q.setAttribute("rel","noopener noreferrer")}else if(X==="src"){let E=G==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,F=Q2(E,{allowDataImage:G==="img"});if(!F)Q.removeAttribute(V.name);else Q.setAttribute(V.name,F)}continue}Q.removeAttribute(V.name)}}return J.body.innerHTML}function i3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function c2(_,$=2){if(!_)return _;let J=_;for(let Z=0;Z<$;Z+=1){let j=i3(J);if(j===J)break;J=j}return J}function F8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=[],Y=!1,Q=[];for(let G of J){if(!Y&&G.trim().match(/^```mermaid\s*$/i)){Y=!0,Q=[];continue}if(Y&&G.trim().match(/^```\s*$/)){let W=Z.length;Z.push(Q.join(`
`)),j.push(`@@MERMAID_BLOCK_${W}@@`),Y=!1,Q=[];continue}if(Y)Q.push(G);else j.push(G)}if(Y)j.push("```mermaid"),j.push(...Q);return{text:j.join(`
`),blocks:Z}}function E8(_){if(!_)return _;return c2(_,5)}function D8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Z of $)J+=String.fromCharCode(Z);return btoa(J)}function C8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)J[Z]=$.charCodeAt(Z);return new TextDecoder().decode(J)}function k8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Z)=>{let j=Number(Z),Y=$[j]??"",Q=E8(Y);return`<div class="mermaid-container" data-mermaid="${D8(Q)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function l3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function o3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Z=J.trim(),j=Z.startsWith("/"),Y=j?Z.slice(1).trim():Z,W=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!W||!B8.has(W))return $;if(W==="br")return j?"":"<br>";if(j)return`</${W}>`;return`<${W}>`})}function n3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Z)=>`<code>${$(Z)}</code>`)}function r3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),j;while(j=J.nextNode()){if(!j.nodeValue)continue;let Y=Z(j.nodeValue);if(Y!==j.nodeValue)j.nodeValue=Y}return $.body.innerHTML}function y8(_){if(!window.katex)return _;let $=(Q)=>i3(Q).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(Q)=>{let G=[],W=Q.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(V)=>{let X=G.length;return G.push(V),`@@CODE_BLOCK_${X}@@`});return W=W.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(V)=>{let X=G.length;return G.push(V),`@@CODE_INLINE_${X}@@`}),{html:W,blocks:G}},Z=(Q,G)=>{if(!G.length)return Q;return Q.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(W,V)=>{let X=Number(V);return G[X]??""})},j=J(_),Y=j.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(Q,G,W)=>{try{let V=katex.renderToString($(W.trim()),{displayMode:!0,throwOnError:!1});return`${G}${V}`}catch(V){return`<span class="math-error" title="${p3(V.message)}">${Q}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(Q,G,W)=>{if(/\s$/.test(W))return Q;try{let V=katex.renderToString($(W),{displayMode:!1,throwOnError:!1});return`${G}${V}`}catch(V){return`${G}<span class="math-error" title="${p3(V.message)}">$${W}$</span>`}}),Z(Y,j.blocks)}function w8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],j;while(j=J.nextNode())Z.push(j);for(let Y of Z){let Q=Y.nodeValue;if(!Q)continue;if(m2.lastIndex=0,!m2.test(Q))continue;m2.lastIndex=0;let G=Y.parentElement;if(G&&(G.closest("a")||G.closest("code")||G.closest("pre")))continue;let W=Q.split(m2);if(W.length<=1)continue;let V=$.createDocumentFragment();W.forEach((X,U)=>{if(U%2===1){let E=$.createElement("a");E.setAttribute("href","#"),E.className="hashtag",E.setAttribute("data-hashtag",X),E.textContent=`#${X}`,V.appendChild(E)}else V.appendChild($.createTextNode(X))}),Y.parentNode?.replaceChild(V,Y)}return $.body.innerHTML}function A8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=!1;for(let Y of J){if(!j&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){j=!0,Z.push("$$");continue}if(j&&Y.trim().match(/^```\s*$/)){j=!1,Z.push("$$");continue}Z.push(Y)}return Z.join(`
`)}function K2(_,$,J={}){if(!_)return"";let Z=A8(_),{text:j,blocks:Y}=F8(Z),Q=c2(j,2),W=l3(Q).replace(/</g,"&lt;").replace(/>/g,"&gt;"),V=o3(W),X=window.marked?marked.parse(V,{headerIds:!1,mangle:!1}):V.replace(/\n/g,"<br>");return X=n3(X),X=r3(X),X=y8(X),X=w8(X),X=k8(X,Y),X=h3(X,J),X}function d3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=c2($,2),j=l3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=o3(j),Q=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return Q=n3(Q),Q=r3(Q),Q=h3(Q),Q}async function g2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,j=g3()==="dark"?J["tokyo-night"]:J["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let Q of Y)try{let G=Q.dataset.mermaid,W=C8(G||""),V=c2(W,2),X=await $(V,{...j,transparent:!0});Q.innerHTML=X,Q.removeAttribute("data-mermaid")}catch(G){console.error("Mermaid render error:",G);let W=document.createElement("pre");W.className="mermaid-error",W.textContent=`Diagram error: ${G.message}`,Q.innerHTML="",Q.appendChild(W),Q.removeAttribute("data-mermaid")}}var s3="PiClaw";function L1(_,$){let J=_||"PiClaw",Z=J.charAt(0).toUpperCase(),j=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=Z.charCodeAt(0)%j.length,Q=j[Y],G=J.trim().toLowerCase(),W=typeof $==="string"?$.trim():"",X=(W?W:null)||(G==="PiClaw".toLowerCase()||G==="pi"?"/static/icon-192.png":null);return{letter:Z,color:Q,image:X}}function a3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function t3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function e3(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,Q=Y?.dataset?.colorTheme||"",G=Y?.dataset?.tint||"",W=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(W&&(G||Q&&Q!=="default"))return W}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Z=0;for(let Y=0;Y<J.length;Y+=1)Z=(Z*31+J.charCodeAt(Y))%2147483647;let j=Math.abs(Z)%$.length;return $[j]}function _4({status:_,draft:$,plan:J,thought:Z,pendingRequest:j,intent:Y,turnId:Q,steerQueued:G,onPanelToggle:W}){let U=(c)=>{if(!c)return{text:"",totalLines:0,fullText:""};if(typeof c==="string"){let y_=c,N_=y_?y_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:y_,totalLines:N_,fullText:y_}}let W_=c.text||"",K_=c.fullText||c.full_text||W_,V_=Number.isFinite(c.totalLines)?c.totalLines:K_?K_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:W_,totalLines:V_,fullText:K_}},E=160,F=(c)=>{if(!c)return 1;return Math.max(1,Math.ceil(c.length/160))},D=(c,W_,K_)=>{let V_=(c||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!V_)return{text:"",omitted:0,totalLines:Number.isFinite(K_)?K_:0,visibleLines:0};let y_=V_.split(`
`),N_=y_.length>W_?y_.slice(0,W_).join(`
`):V_,U_=Number.isFinite(K_)?K_:y_.reduce((D_,R_)=>D_+F(R_),0),A_=N_?N_.split(`
`).reduce((D_,R_)=>D_+F(R_),0):0,F_=Math.max(U_-A_,0);return{text:N_,omitted:F_,totalLines:U_,visibleLines:A_}},M=U(J),I=U(Z),z=U($),w=Boolean(M.text)||M.totalLines>0,f=Boolean(I.text)||I.totalLines>0,H=Boolean(z.fullText?.trim()||z.text?.trim());if(!_&&!H&&!w&&!f&&!j&&!Y)return null;let[T,s]=v(new Set),r=(c)=>s((W_)=>{let K_=new Set(W_),V_=!K_.has(c);if(V_)K_.add(c);else K_.delete(c);if(typeof W==="function")W(c,V_);return K_});g(()=>{s(new Set)},[Q]);let Z_=_?.turn_id||Q,X_=e3(Z_),$_=G?"turn-dot turn-dot-queued":"turn-dot",j_=(c)=>c,a=Boolean(_?.last_activity||_?.lastActivity),h="",J_=_?.title,l=_?.status;if(_?.type==="plan")h=J_?`Planning: ${J_}`:"Planning...";else if(_?.type==="tool_call")h=J_?`Running: ${J_}`:"Running tool...";else if(_?.type==="tool_status")h=J_?`${J_}: ${l||"Working..."}`:l||"Working...";else if(_?.type==="error")h=J_||"Agent error";else h=J_||l||"Working...";if(a)h="Last activity just now";let t=({panelTitle:c,text:W_,fullText:K_,totalLines:V_,maxLines:y_,titleClass:N_,panelKey:U_})=>{let A_=T.has(U_),F_=K_||W_||"",D_=typeof y_==="number",R_=A_&&D_,C_=D_?D(F_,y_,V_):{text:F_||"",omitted:0,totalLines:Number.isFinite(V_)?V_:0};if(!F_&&!(Number.isFinite(C_.totalLines)&&C_.totalLines>0))return null;let r_=`agent-thinking-body${D_?" agent-thinking-body-collapsible":""}`,K0=D_?`--agent-thinking-collapsed-lines: ${y_};`:"";return B`
            <div
                class="agent-thinking"
                data-expanded=${A_?"true":"false"}
                data-collapsible=${D_?"true":"false"}
                style=${X_?`--turn-color: ${X_};`:""}
            >
                <div class="agent-thinking-title ${N_||""}">
                    ${X_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${c}
                    ${R_&&B`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${c} panel`}
                            onClick=${()=>r(U_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${r_}
                    style=${K0}
                    dangerouslySetInnerHTML=${{__html:d3(F_)}}
                />
                ${!A_&&C_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>r(U_)}>
                        ▸ ${C_.omitted} more lines
                    </button>
                `}
                ${A_&&C_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>r(U_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},B_=j?.tool_call?.title,O_=B_?`Awaiting approval: ${B_}`:"Awaiting approval";return B`
        <div class="agent-status-panel">
            ${Y&&B`
                <div
                    class="agent-status agent-status-intent"
                    aria-live="polite"
                    style=${X_?`--turn-color: ${X_};`:""}
                    title=${Y?.detail||""}
                >
                    <span class="agent-status-text">
                        ${Y.title}
                    </span>
                    ${Y.detail&&B`<span class="agent-status-intent-detail">${Y.detail}</span>`}
                </div>
            `}
            ${j&&B`
                <div class="agent-status agent-status-request" aria-live="polite" style=${X_?`--turn-color: ${X_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${O_}</span>
                </div>
            `}
            ${w&&t({panelTitle:j_("Planning"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,panelKey:"plan"})}
            ${f&&t({panelTitle:j_("Thoughts"),text:I.text,fullText:I.fullText,totalLines:I.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${H&&t({panelTitle:j_("Draft"),text:z.text,fullText:z.fullText,totalLines:z.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&B`
                <div class=${`agent-status${a?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${X_?`--turn-color: ${X_};`:""}>
                    ${X_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?B`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!a&&B`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${h}</span>
                </div>
            `}
        </div>
    `}function $4({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Z,options:j}=_,Y=Z?.title||"Agent Request",Q=Z?.kind||"other",G=Z?.rawInput||{},W=G.command||G.commands&&G.commands[0]||null,V=G.diff||null,X=G.fileName||G.path||null,U=Z?.description||G.description||G.explanation||null,F=(Array.isArray(Z?.locations)?Z.locations:[]).map((w)=>w?.path).filter((w)=>Boolean(w)),D=Array.from(new Set([X,...F].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Z,options:j});let M=async(w)=>{try{await W1(J,w),$()}catch(f){console.error("Failed to respond to agent request:",f)}},I=async()=>{try{await F3(Y,`Auto-approved: ${Y}`),await W1(J,"approved"),$()}catch(w){console.error("Failed to add to whitelist:",w)}},z=j&&j.length>0;return B`
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
                ${(U||W||V||D.length>0)&&B`
                    <div class="agent-request-body">
                        ${U&&B`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${D.length>0&&B`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${D.map((w,f)=>B`<li key=${f}>${w}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${W&&B`
                            <pre class="agent-request-command">${W}</pre>
                        `}
                        ${V&&B`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${V}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${z?j.map((w)=>B`
                            <button 
                                key=${w.optionId||w.id||String(w)}
                                class="agent-request-btn ${w.kind==="allow_once"||w.kind==="allow_always"?"primary":""}"
                                onClick=${()=>M(w.optionId||w.id||w)}
                            >
                                ${w.name||w.label||w.optionId||w.id||String(w)}
                            </button>
                        `):B`
                        <button class="agent-request-btn primary" onClick=${()=>M("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>M("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${I}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function J4({status:_}){if(_==="connected")return null;return B`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function Z4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,j=Z/1000,Y=86400000;if(Z<Y){if(j<60)return"just now";if(j<3600)return`${Math.floor(j/60)}m`;return`${Math.floor(j/3600)}h`}if(Z<5*Y){let W=$.toLocaleDateString(void 0,{weekday:"short"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${W} ${V}`}let Q=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),G=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${Q} ${G}`}function H2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function u0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function p2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function Y4({src:_,onClose:$}){return g(()=>{let J=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),B`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function M8({mediaId:_}){let[$,J]=v(null);if(g(()=>{S2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size,Y=j?u0(j):"";return B`
        <a href=${Z2(_)} download=${Z} class="file-attachment" onClick=${(Q)=>Q.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${Y&&B`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function h2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Z}=_,j=Z?p2(Z):null;return B`
        <div class="content-annotations">
            ${$&&$.length>0&&B`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof J==="number"&&B`
                <span class="content-annotation">Priority: ${J}</span>
            `}
            ${j&&B`
                <span class="content-annotation">Updated: ${j}</span>
            `}
        </div>
    `}function b8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Z=_.size?u0(_.size):"",j=_.mime_type||"",Y=I8(j),Q=Q2(_.uri);return B`
        <a
            href=${Q||"#"}
            class="resource-link"
            target=${Q?"_blank":void 0}
            rel=${Q?"noopener noreferrer":void 0}
            onClick=${(G)=>G.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Y}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${J&&B`<div class="resource-link-description">${J}</div>`}
                <div class="resource-link-meta">
                    ${j&&B`<span>${j}</span>`}
                    ${Z&&B`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function P8({block:_}){let[$,J]=v(!1),Z=_.uri||"Embedded resource",j=_.text||"",Y=Boolean(_.data),Q=_.mime_type||"";return B`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(G)=>{G.preventDefault(),G.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&B`
                ${j&&B`<pre class="resource-embed-content">${j}</pre>`}
                ${Y&&B`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${Q&&B`<span class="resource-embed-blob-meta">${Q}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(G)=>{G.preventDefault(),G.stopPropagation();let W=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:Q||"application/octet-stream"}),V=URL.createObjectURL(W),X=document.createElement("a");X.href=V,X.download=Z.split("/").pop()||"resource",X.click(),URL.revokeObjectURL(V)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function I8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function S8({preview:_}){let $=Q2(_.url),J=Q2(_.image,{allowDataImage:!0}),Z=J?`background-image: url('${J}')`:"",j=_.site_name;if(!j&&$)try{j=new URL($).hostname}catch{j=$}return B`
        <a
            href=${$||"#"}
            class="link-preview ${J?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${j||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&B`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function x8(_,$){return typeof _==="string"?_:""}var T8=1800,f8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,u8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,v8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function R8(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let J=document.createElement("textarea");J.value=$,J.setAttribute("readonly",""),J.style.position="fixed",J.style.opacity="0",J.style.pointerEvents="none",document.body.appendChild(J),J.select(),J.setSelectionRange(0,J.value.length);let Z=document.execCommand("copy");return document.body.removeChild(J),Z}catch{return!1}}function m8(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let J=new Map,Z=[],j=(Y,Q)=>{let G=Q||"idle";if(Y.dataset.copyState=G,G==="success")Y.innerHTML=u8,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(G==="error")Y.innerHTML=v8,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=f8,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let Q=document.createElement("div");Q.className="post-code-block",Y.parentNode?.insertBefore(Q,Y),Q.appendChild(Y);let G=document.createElement("button");G.type="button",G.className="post-code-copy-btn",j(G,"idle"),Q.appendChild(G);let W=async(V)=>{V.preventDefault(),V.stopPropagation();let U=Y.querySelector("code")?.textContent||"",E=await R8(U);j(G,E?"success":"error");let F=J.get(G);if(F)clearTimeout(F);let D=setTimeout(()=>{j(G,"idle"),J.delete(G)},T8);J.set(G,D)};G.addEventListener("click",W),Z.push(()=>{G.removeEventListener("click",W);let V=J.get(G);if(V)clearTimeout(V);if(Q.parentNode)Q.parentNode.insertBefore(Y,Q),Q.remove()})}),()=>{Z.forEach((Y)=>Y())}}function c8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Files:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,fileRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V))j.push(V.replace(/^\s*-\s+/,"").trim());else if(!V.trim())break;else break}if(j.length===0)return{content:_,fileRefs:[]};let Q=J.slice(0,Z),G=J.slice(Y),W=[...Q,...G].join(`
`);return W=W.replace(/\n{3,}/g,`

`).trim(),{content:W,fileRefs:j}}function g8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Referenced messages:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,messageRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let U=V.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)j.push(U[1])}else if(!V.trim())break;else break}if(j.length===0)return{content:_,messageRefs:[]};let Q=J.slice(0,Z),G=J.slice(Y),W=[...Q,...G].join(`
`);return W=W.replace(/\n{3,}/g,`

`).trim(),{content:W,messageRefs:j}}function p8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Images:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,attachments:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let X=V.replace(/^\s*-\s+/,"").trim(),U=X.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||X.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let E=U[1],F=(U[2]||"").trim()||E;j.push({id:E,label:F,raw:X})}else j.push({id:null,label:X,raw:X})}else if(!V.trim())break;else break}if(j.length===0)return{content:_,attachments:[]};let Q=J.slice(0,Z),G=J.slice(Y),W=[...Q,...G].join(`
`);return W=W.replace(/\n{3,}/g,`

`).trim(),{content:W,attachments:j}}function h8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function i8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Z=J.map(h8).sort((X,U)=>U.length-X.length),j=new RegExp(`(${Z.join("|")})`,"gi"),Y=new RegExp(`^(${Z.join("|")})$`,"i"),Q=new DOMParser().parseFromString(_,"text/html"),G=Q.createTreeWalker(Q.body,NodeFilter.SHOW_TEXT),W=[],V;while(V=G.nextNode())W.push(V);for(let X of W){let U=X.nodeValue;if(!U||!j.test(U)){j.lastIndex=0;continue}j.lastIndex=0;let E=X.parentElement;if(E&&E.closest("code, pre, script, style"))continue;let F=U.split(j).filter((M)=>M!=="");if(F.length===0)continue;let D=Q.createDocumentFragment();for(let M of F)if(Y.test(M)){let I=Q.createElement("mark");I.className="search-highlight-term",I.textContent=M,D.appendChild(I)}else D.appendChild(Q.createTextNode(M));X.parentNode.replaceChild(D,X)}return Q.body.innerHTML}function j4({post:_,onClick:$,onHashtagClick:J,onMessageRef:Z,onScrollToMessage:j,agentName:Y,agentAvatarUrl:Q,userName:G,userAvatarUrl:W,userAvatarBackground:V,onDelete:X,isThreadReply:U,isThreadPrev:E,isThreadNext:F,isRemoving:D,highlightQuery:M,onFileRef:I}){let[z,w]=v(null),f=y(null),H=_.data,T=H.type==="agent_response",s=G||"You",r=T?Y||s3:s,Z_=T?L1(Y,Q):L1(s,W),X_=typeof V==="string"?V.trim().toLowerCase():"",$_=!T&&Z_.image&&(X_==="clear"||X_==="transparent"),j_=T&&Boolean(Z_.image),a=`background-color: ${$_||j_?"transparent":Z_.color}`,h=H.content_meta,J_=Boolean(h?.truncated),l=Boolean(h?.preview),t=J_&&!l,B_=J_?{originalLength:Number.isFinite(h?.original_length)?h.original_length:H.content?H.content.length:0,maxLength:Number.isFinite(h?.max_length)?h.max_length:0}:null,O_=x8(H.content,H.link_previews),{content:c,fileRefs:W_}=c8(O_),{content:K_,messageRefs:V_}=g8(c),{content:y_,attachments:N_}=p8(K_);O_=y_;let U_=Boolean(O_)&&!t,A_=typeof M==="string"?M.trim():"",F_=f0(()=>{if(!O_)return"";let b=K2(O_,J);return A_?i8(b,A_):b},[O_,A_]),D_=(b,d)=>{b.stopPropagation(),w(Z2(d))},R_=(b)=>{b.stopPropagation(),X?.(_)},C_=(b,d)=>{let P_=new Set;if(!b||d.length===0)return{content:b,usedIds:P_};return{content:b.replace(/attachment:([^\s)"']+)/g,(A0,H0,a_,D0)=>{let C0=H0.replace(/^\/+/,""),h_=d.find((j0)=>j0.name&&j0.name.toLowerCase()===C0.toLowerCase()&&!P_.has(j0.id))||d.find((j0)=>!P_.has(j0.id));if(!h_)return A0;if(P_.add(h_.id),D0.slice(Math.max(0,a_-2),a_)==="](")return`/media/${h_.id}`;return h_.name||"attachment"}),usedIds:P_}},r_=[],K0=[],L_=[],M_=[],Z0=[],O0=[],G0=H.content_blocks||[],B0=H.media_ids||[],z0=0;if(G0.length>0)G0.forEach((b)=>{if(b?.type==="text"&&b.annotations)O0.push(b.annotations);if(b?.type==="resource_link")M_.push(b);else if(b?.type==="resource")Z0.push(b);else if(b?.type==="file"){let d=B0[z0++];if(d)K0.push(d),L_.push({id:d,name:b?.name||b?.filename||b?.title})}else if(b?.type==="image"||!b?.type){let d=B0[z0++];if(d){let P_=typeof b?.mime_type==="string"?b.mime_type:void 0;r_.push({id:d,annotations:b?.annotations,mimeType:P_}),L_.push({id:d,name:b?.name||b?.filename||b?.title})}}});else if(B0.length>0)B0.forEach((b)=>{r_.push({id:b,annotations:null}),L_.push({id:b,name:null})});if(N_.length>0)N_.forEach((b)=>{if(!b?.id)return;let d=L_.find((P_)=>String(P_.id)===String(b.id));if(d&&!d.name)d.name=b.label});let{content:b_,usedIds:m_}=C_(O_,L_);O_=b_;let t_=r_.filter(({id:b})=>!m_.has(b)),d_=K0.filter((b)=>!m_.has(b)),f_=N_.length>0?N_.map((b,d)=>({id:b.id||`attachment-${d+1}`,label:b.label||`attachment-${d+1}`})):L_.map((b,d)=>({id:b.id,label:b.name||`attachment-${d+1}`}));return g(()=>{if(!f.current)return;return g2(f.current),m8(f.current)},[F_]),B`
        <div id=${`post-${_.id}`} class="post ${T?"agent-post":""} ${U?"thread-reply":""} ${E?"thread-prev":""} ${F?"thread-next":""} ${D?"removing":""}" onClick=${$}>
            <div class="post-avatar ${T?"agent-avatar":""} ${Z_.image?"has-image":""}" style=${a}>
                ${Z_.image?B`<img src=${Z_.image} alt=${r} />`:Z_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${R_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${r}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(b)=>{if(b.preventDefault(),b.stopPropagation(),Z)Z(_.id)}}>${Z4(_.timestamp)}</a>
                </div>
                ${t&&B_&&B`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${H2(B_.originalLength)} chars
                            ${B_.maxLength?B` • Display limit: ${H2(B_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${l&&B_&&B`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${H2(B_.maxLength)} of ${H2(B_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(W_.length>0||V_.length>0||f_.length>0)&&B`
                    <div class="post-file-refs">
                        ${V_.map((b)=>{let d=(P_)=>{if(P_.preventDefault(),P_.stopPropagation(),j)j(b);else{let p_=document.getElementById("post-"+b);if(p_)p_.scrollIntoView({behavior:"smooth",block:"center"}),p_.classList.add("post-highlight"),setTimeout(()=>p_.classList.remove("post-highlight"),2000)}};return B`
                                <a href=${`#msg-${b}`} class="post-msg-pill-link" onClick=${d}>
                                    <${h0}
                                        prefix="post"
                                        label=${"msg:"+b}
                                        title=${"Message "+b}
                                        icon="message"
                                        onClick=${d}
                                    />
                                </a>
                            `})}
                        ${W_.map((b)=>{let d=b.split("/").pop()||b;return B`
                                <${h0}
                                    prefix="post"
                                    label=${d}
                                    title=${b}
                                    onClick=${()=>I?.(b)}
                                />
                            `})}
                        ${f_.map((b)=>B`
                            <${h0}
                                prefix="post"
                                label=${b.label}
                                title=${b.label}
                            />
                        `)}
                    </div>
                `}
                ${U_&&B`
                    <div 
                        ref=${f}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:F_}}
                        onClick=${(b)=>{if(b.target.classList.contains("hashtag")){b.preventDefault(),b.stopPropagation();let d=b.target.dataset.hashtag;if(d)J?.(d)}else if(b.target.tagName==="IMG")b.preventDefault(),b.stopPropagation(),w(b.target.src)}}
                    />
                `}
                ${O0.length>0&&B`
                    ${O0.map((b,d)=>B`
                        <${h2} key=${d} annotations=${b} />
                    `)}
                `}
                ${t_.length>0&&B`
                    <div class="media-preview">
                        ${t_.map(({id:b,mimeType:d})=>{let p_=typeof d==="string"&&d.toLowerCase().startsWith("image/svg")?Z2(b):C3(b);return B`
                                <img 
                                    key=${b} 
                                    src=${p_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(A0)=>D_(A0,b)}
                                />
                            `})}
                    </div>
                `}
                ${t_.length>0&&B`
                    ${t_.map(({annotations:b},d)=>B`
                        ${b&&B`<${h2} key=${d} annotations=${b} />`}
                    `)}
                `}
                ${d_.length>0&&B`
                    <div class="file-attachments">
                        ${d_.map((b)=>B`
                            <${M8} key=${b} mediaId=${b} />
                        `)}
                    </div>
                `}
                ${M_.length>0&&B`
                    <div class="resource-links">
                        ${M_.map((b,d)=>B`
                            <div key=${d}>
                                <${b8} block=${b} />
                                <${h2} annotations=${b.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${Z0.length>0&&B`
                    <div class="resource-embeds">
                        ${Z0.map((b,d)=>B`
                            <div key=${d}>
                                <${P8} block=${b} />
                                <${h2} annotations=${b.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${H.link_previews?.length>0&&B`
                    <div class="link-previews">
                        ${H.link_previews.map((b,d)=>B`
                            <${S8} key=${d} preview=${b} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${z&&B`<${Y4} src=${z} onClose=${()=>w(null)} />`}
    `}function X4({posts:_,hasMore:$,onLoadMore:J,onPostClick:Z,onHashtagClick:j,onMessageRef:Y,onScrollToMessage:Q,onFileRef:G,emptyMessage:W,timelineRef:V,agents:X,user:U,onDeletePost:E,reverse:F=!0,removingPostIds:D,searchQuery:M}){let[I,z]=v(!1),w=y(null),f=typeof IntersectionObserver<"u",H=P(async()=>{if(!J||!$||I)return;z(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{z(!1)}},[$,I,J]),T=P((a)=>{let{scrollTop:h,scrollHeight:J_,clientHeight:l}=a.target,t=F?J_-l-h:h,B_=Math.max(300,l);if(t<B_)H()},[F,H]);if(g(()=>{if(!f)return;let a=w.current,h=V?.current;if(!a||!h)return;let J_=300,l=new IntersectionObserver((t)=>{for(let B_ of t){if(!B_.isIntersecting)continue;H()}},{root:h,rootMargin:`${J_}px 0px ${J_}px 0px`,threshold:0});return l.observe(a),()=>l.disconnect()},[f,$,J,V,H]),g(()=>{if(f)return;if(!V?.current)return;let{scrollTop:a,scrollHeight:h,clientHeight:J_}=V.current,l=F?h-J_-a:a,t=Math.max(300,J_);if(l<t)H()},[f,_,$,F,V,H]),g(()=>{if(!V?.current)return;if(!$||I)return;let{scrollTop:a,scrollHeight:h,clientHeight:J_}=V.current,l=F?h-J_-a:a,t=Math.max(300,J_);if(h<=J_+1||l<t)H()},[_,$,I,F,V,H]),!_)return B`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return B`
            <div class="timeline" ref=${V}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${W||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let s=_.slice().sort((a,h)=>a.id-h.id),r=(a)=>{let h=a?.data?.thread_id;if(h===null||h===void 0||h==="")return null;let J_=Number(h);return Number.isFinite(J_)?J_:null},Z_=new Map;for(let a=0;a<s.length;a+=1){let h=s[a],J_=Number(h?.id),l=r(h);if(l!==null){let t=Z_.get(l)||{anchorIndex:-1,replyIndexes:[]};t.replyIndexes.push(a),Z_.set(l,t)}else if(Number.isFinite(J_)){let t=Z_.get(J_)||{anchorIndex:-1,replyIndexes:[]};t.anchorIndex=a,Z_.set(J_,t)}}let X_=new Map;for(let[a,h]of Z_.entries()){let J_=new Set;if(h.anchorIndex>=0)J_.add(h.anchorIndex);for(let l of h.replyIndexes)J_.add(l);X_.set(a,Array.from(J_).sort((l,t)=>l-t))}let $_=s.map((a,h)=>{let J_=r(a);if(J_===null)return{hasThreadPrev:!1,hasThreadNext:!1};let l=X_.get(J_);if(!l||l.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let t=l.indexOf(h);if(t<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:t>0,hasThreadNext:t<l.length-1}}),j_=B`<div class="timeline-sentinel" ref=${w}></div>`;return B`
        <div class="timeline ${F?"reverse":"normal"}" ref=${V} onScroll=${T}>
            <div class="timeline-content">
                ${F?j_:null}
                ${s.map((a,h)=>{let J_=Boolean(a.data?.thread_id&&a.data.thread_id!==a.id),l=D?.has?.(a.id),t=$_[h]||{};return B`
                    <${j4}
                        key=${a.id}
                        post=${a}
                        isThreadReply=${J_}
                        isThreadPrev=${t.hasThreadPrev}
                        isThreadNext=${t.hasThreadNext}
                        isRemoving=${l}
                        highlightQuery=${M}
                        agentName=${a3(a.data?.agent_id,X||{})}
                        agentAvatarUrl=${t3(a.data?.agent_id,X||{})}
                        userName=${U?.name||U?.user_name}
                        userAvatarUrl=${U?.avatar_url||U?.avatarUrl||U?.avatar}
                        userAvatarBackground=${U?.avatar_background||U?.avatarBackground}
                        onClick=${()=>Z?.(a)}
                        onHashtagClick=${j}
                        onMessageRef=${Y}
                        onScrollToMessage=${Q}
                        onFileRef=${G}
                        onDelete=${E}
                    />
                `})}
                ${F?null:j_}
            </div>
        </div>
    `}class Q4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let j=Z.canHandle(_);if(j===!1||j===0)continue;let Y=j===!0?0:typeof j==="number"?j:0;if(Y>J)J=Y,$=Z}catch(j){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,j)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var g_=new Q4;var i2=null,F1=null;function K4(){if(F1)return Promise.resolve(F1);if(!i2)i2=import("/static/dist/editor.bundle.js").then((_)=>{return F1=_,_}).catch((_)=>{throw i2=null,_});return i2}class G4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await K4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var E1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new G4(_,$)}};function D1(){K4().catch(()=>{})}class W4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Z=document.createElement("span");Z.className="terminal-pane-title",Z.textContent="Terminal";let j=document.createElement("span");j.className="terminal-pane-status",j.textContent="Not connected",J.append(Z,j);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var C1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new W4(_,$)}};function V4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function l8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Z=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),j=Z?.[1]||J,Y=Z?.[2]||"",Q=Z?.[3]||"",G=String($||"").split("/").slice(0,-1).join("/"),V=j.startsWith("/")?j:`${G?`${G}/`:""}${j}`,X=[];for(let E of V.split("/")){if(!E||E===".")continue;if(E===".."){if(X.length>0)X.pop();continue}X.push(E)}let U=X.join("/");return`${N1(U)}${Y}${Q}`}function U2(_){return _?.preview||null}function o8(_){let $=U2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let J=$.url||($.path?N1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${V4(J)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${K2($.text||"",null,{rewriteImageSrc:(Z)=>l8(Z,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${V4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class k1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=o8(this.context)}getContent(){let _=U2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let J=U2(this.context);if(J&&J.kind==="text"){if(J.text=_,$!==void 0)J.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var y1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=U2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new k1(_,$)}},w1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return U2(_)||_?.path?1:!1},mount(_,$){return new k1(_,$)}};class N4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=J||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((j)=>j===_?$:j),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var E_=new N4;var n8=16,r8=60000,z4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function H4(_,$,J,Z=0,j=[]){if(!J&&z4(_))return j;if(!_)return j;if(j.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)H4(Y,$,J,Z+1,j);return j}function q4(_,$,J){if(!_)return"";let Z=[],j=(Y)=>{if(!J&&z4(Y))return;if(Z.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let Q of Y.children)j(Q)};return j(_),Z.join("|")}function P1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let j=J?new Map(J.map((G)=>[G?.path,G])):new Map,Y=!J||J.length!==Z.length,Q=Z.map((G)=>{let W=P1(j.get(G.path),G);if(W!==j.get(G.path))Y=!0;return W});return Y?{...$,children:Q}:_}function M1(_,$,J){if(!_)return _;if(_.path===$)return P1(_,J);if(!Array.isArray(_.children))return _;let Z=!1,j=_.children.map((Y)=>{let Q=M1(Y,$,J);if(Q!==Y)Z=!0;return Q});return Z?{..._,children:j}:_}var U4=4,A1=14,d8=8,s8=16;function L4(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Z of $)J+=L4(Z);return _.__bytes=J,J}function F4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=U4)return Z;let j=Array.isArray(_.children)?_.children:[],Y=[];for(let G of j){let W=Math.max(0,Number(G?.__bytes??G?.size??0));if(W<=0)continue;if(G.type==="dir")Y.push({kind:"dir",node:G,size:W});else Y.push({kind:"file",name:G.name,path:G.path,size:W})}Y.sort((G,W)=>W.size-G.size);let Q=Y;if(Y.length>A1){let G=Y.slice(0,A1-1),W=Y.slice(A1-1),V=W.reduce((X,U)=>X+U.size,0);G.push({kind:"other",name:`+${W.length} more`,path:`${Z.path}/[other]`,size:V}),Q=G}return Z.children=Q.map((G)=>{if(G.kind==="dir")return F4(G.node,$+1);return{name:G.name,path:G.path,size:G.size,children:[]}}),Z}function O4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function E4(_,$,J){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,j=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${j}% ${Y}%)`}function l2(_,$,J,Z){return{x:_+J*Math.cos(Z),y:$+J*Math.sin(Z)}}function I1(_,$,J,Z,j,Y){let Q=Math.PI*2-0.0001,G=Y-j>Q?j+Q:Y,W=l2(_,$,Z,j),V=l2(_,$,Z,G),X=l2(_,$,J,G),U=l2(_,$,J,j),E=G-j>Math.PI?1:0;return[`M ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${E} 1 ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`L ${X.x.toFixed(3)} ${X.y.toFixed(3)}`,`A ${J} ${J} 0 ${E} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var D4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function C4(_,$,J){let Z=[],j=[],Y=Math.max(0,Number($)||0),Q=(G,W,V,X)=>{let U=Array.isArray(G?.children)?G.children:[];if(!U.length)return;let E=Math.max(0,Number(G.size)||0);if(E<=0)return;let F=V-W,D=W;U.forEach((M,I)=>{let z=Math.max(0,Number(M.size)||0);if(z<=0)return;let w=z/E,f=D,H=I===U.length-1?V:D+F*w;if(D=H,H-f<0.003)return;let T=D4[X];if(T){let s=E4(f,X,J);if(Z.push({key:M.path,path:M.path,label:M.name,size:z,color:s,depth:X,startAngle:f,endAngle:H,innerRadius:T[0],outerRadius:T[1],d:I1(120,120,T[0],T[1],f,H)}),X===1)j.push({key:M.path,name:M.name,size:z,pct:Y>0?z/Y*100:0,color:s})}if(X<U4)Q(M,f,H,X+1)})};return Q(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:j}}function b1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Z of J){let j=b1(Z,$);if(j)return j}return null}function k4(_,$,J,Z){if(!J||J<=0)return{segments:[],legend:[]};let j=D4[1];if(!j)return{segments:[],legend:[]};let Y=-Math.PI/2,Q=Math.PI*3/2,G=E4(Y,1,Z),V=`${$||"."}/[files]`;return{segments:[{key:V,path:V,label:_,size:J,color:G,depth:1,startAngle:Y,endAngle:Q,innerRadius:j[0],outerRadius:j[1],d:I1(120,120,j[0],j[1],Y,Q)}],legend:[{key:V,name:_,size:J,pct:100,color:G}]}}function B4(_,$=!1,J=!1){if(!_)return null;let Z=L4(_),j=F4(_,0),Y=j.size||Z,{segments:Q,legend:G}=C4(j,Y,J);if(!Q.length&&Y>0){let W=k4("[files]",j.path,Y,J);Q=W.segments,G=W.legend}return{root:j,totalSize:Y,segments:Q,legend:G,truncated:$,isDarkTheme:J}}function a8({payload:_}){if(!_)return null;let[$,J]=v(null),[Z,j]=v(_?.root?.path||"."),[Y,Q]=v(()=>[_?.root?.path||"."]),[G,W]=v(!1);g(()=>{let $_=_?.root?.path||".";j($_),Q([$_]),J(null)},[_?.root?.path,_?.totalSize]),g(()=>{if(!Z)return;W(!0);let $_=setTimeout(()=>W(!1),180);return()=>clearTimeout($_)},[Z]);let V=f0(()=>{return b1(_.root,Z)||_.root},[_?.root,Z]),X=V?.size||_.totalSize||0,{segments:U,legend:E}=f0(()=>{let $_=C4(V,X,_.isDarkTheme);if($_.segments.length>0)return $_;if(X<=0)return $_;let j_=V?.children?.length?"Total":"[files]";return k4(j_,V?.path||_?.root?.path||".",X,_.isDarkTheme)},[V,X,_.isDarkTheme,_?.root?.path]),[F,D]=v(U),M=y(new Map),I=y(0);g(()=>{let $_=M.current,j_=new Map(U.map((l)=>[l.key,l])),a=performance.now(),h=220,J_=(l)=>{let t=Math.min(1,(l-a)/220),B_=t*(2-t),O_=U.map((c)=>{let K_=$_.get(c.key)||{startAngle:c.startAngle,endAngle:c.startAngle,innerRadius:c.innerRadius,outerRadius:c.innerRadius},V_=(F_,D_)=>F_+(D_-F_)*B_,y_=V_(K_.startAngle,c.startAngle),N_=V_(K_.endAngle,c.endAngle),U_=V_(K_.innerRadius,c.innerRadius),A_=V_(K_.outerRadius,c.outerRadius);return{...c,d:I1(120,120,U_,A_,y_,N_)}});if(D(O_),t<1)I.current=requestAnimationFrame(J_)};if(I.current)cancelAnimationFrame(I.current);return I.current=requestAnimationFrame(J_),M.current=j_,()=>{if(I.current)cancelAnimationFrame(I.current)}},[U]);let z=F.length?F:U,w=X>0?u0(X):"0 B",f=V?.name||"",T=(f&&f!=="."?f:"Total")||"Total",s=w,r=Y.length>1,Z_=($_)=>{if(!$_?.path)return;let j_=b1(_.root,$_.path);if(!j_||!Array.isArray(j_.children)||j_.children.length===0)return;Q((a)=>[...a,j_.path]),j(j_.path),J(null)},X_=()=>{if(!r)return;Q(($_)=>{let j_=$_.slice(0,-1);return j(j_[j_.length-1]||_?.root?.path||"."),j_}),J(null)};return B`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${G?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${V?.path||_?.root?.path||"."}`}
                data-segments=${z.length}
                data-base-size=${X}>
                ${z.map(($_)=>B`
                    <path
                        key=${$_.key}
                        d=${$_.d}
                        fill=${$_.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===$_.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J($_)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J($_)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>Z_($_)}
                    >
                        <title>${$_.label} — ${u0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${r?" is-drill":""}`}
                    onClick=${X_}
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
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${T}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${s}</text>
                </g>
            </svg>
            ${E.length>0&&B`
                <div class="workspace-folder-starburst-legend">
                    ${E.slice(0,8).map(($_)=>B`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${u0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&B`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function t8({mediaId:_}){let[$,J]=v(null);if(g(()=>{if(!_)return;S2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size?u0($.metadata.size):"";return B`
        <a href=${Z2(_)} download=${Z} class="file-attachment"
            onClick=${(Y)=>Y.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${j&&B`<span class="file-size">${j}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function y4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Z}){let[j,Y]=v(null),[Q,G]=v(new Set(["."])),[W,V]=v(null),[X,U]=v(null),[E,F]=v(""),[D,M]=v(null),[I,z]=v(null),[w,f]=v(!0),[H,T]=v(!1),[s,r]=v(null),[Z_,X_]=v(()=>Y2("workspaceShowHidden",!1)),[$_,j_]=v(!1),[a,h]=v(null),[J_,l]=v(null),[t,B_]=v(null),[O_,c]=v(!1),[W_,K_]=v(null),[V_,y_]=v(()=>O4()),N_=y(Q),U_=y(""),A_=y(null),F_=y(0),D_=y(new Set),R_=y(null),C_=y(new Map),r_=y(_),K0=y(Z),L_=y(null),M_=y(null),Z0=y(null),O0=y(null),G0=y(null),B0=y(null),z0=y("."),b_=y(null),m_=y({path:null,dragging:!1,startX:0,startY:0}),t_=y({path:null,dragging:!1,startX:0,startY:0}),d_=y({path:null,timer:0}),f_=y(!1),b=y(0),d=y(new Map),P_=y(null),p_=y(null),A0=y(null),H0=y(null),a_=y(Z_),D0=y($),C0=y(J??$),Y0=y(0),h_=y(t),v0=y($_),j0=y(a),X0=y(null),S0=y({x:0,y:0}),e_=y(0),M0=y(null),_0=y(W),W0=y(X),V0=y(null),i_=y(null),U0=y(D);r_.current=_,K0.current=Z,g(()=>{N_.current=Q},[Q]),g(()=>{a_.current=Z_},[Z_]),g(()=>{D0.current=$},[$]),g(()=>{C0.current=J??$},[J,$]),g(()=>{h_.current=t},[t]),g(()=>{let K=(O)=>{let k=O?.detail?.path;if(!k)return;let C=k.split("/"),R=[];for(let p=1;p<C.length;p++)R.push(C.slice(0,p).join("/"));if(R.length)G((p)=>{let e=new Set(p);e.add(".");for(let __ of R)e.add(__);return e});V(k),requestAnimationFrame(()=>{let p=document.querySelector(`[data-path="${CSS.escape(k)}"]`);if(p)p.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),g(()=>{v0.current=$_},[$_]),g(()=>{j0.current=a},[a]),g(()=>{_0.current=W},[W]),g(()=>{W0.current=X},[X]),g(()=>{U0.current=D},[D]),g(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>y_(O4());K();let O=window.matchMedia?.("(prefers-color-scheme: dark)"),k=()=>K();if(O?.addEventListener)O.addEventListener("change",k);else if(O?.addListener)O.addListener(k);let C=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(O?.removeEventListener)O.removeEventListener("change",k);else if(O?.removeListener)O.removeListener(k);C?.disconnect()}},[]),g(()=>{if(!X)return;let K=G0.current;if(!K)return;let O=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(O)},[X]);let b0=async(K)=>{T(!0),M(null),z(null);try{let O=await k3(K,20000);M(O)}catch(O){M({error:O.message||"Failed to load preview"})}finally{T(!1)}};L_.current=b0;let i0=async()=>{if(!D0.current)return;try{let K=await x2("",1,a_.current),O=q4(K.root,N_.current,a_.current);if(O===U_.current){f(!1);return}if(U_.current=O,A_.current=K.root,!F_.current)F_.current=requestAnimationFrame(()=>{F_.current=0,Y((k)=>P1(k,A_.current)),f(!1)})}catch(K){r(K.message||"Failed to load workspace"),f(!1)}},R0=async(K)=>{if(!K)return;if(D_.current.has(K))return;D_.current.add(K);try{let O=await x2(K,1,a_.current);Y((k)=>M1(k,K,O.root))}catch(O){r(O.message||"Failed to load workspace")}finally{D_.current.delete(K)}};M_.current=R0;let u_=P(()=>{let K=W;if(!K)return".";let O=C_.current?.get(K);if(O&&O.type==="dir")return O.path;if(K==="."||!K.includes("/"))return".";let k=K.split("/");return k.pop(),k.join("/")||"."},[W]),Q0=P((K)=>{let O=K?.closest?.(".workspace-row");if(!O)return null;let k=O.dataset.path,C=O.dataset.type;if(!k)return null;if(C==="dir")return k;if(k.includes("/")){let R=k.split("/");return R.pop(),R.join("/")||"."}return"."},[]),$0=P((K)=>{return Q0(K?.target||null)},[Q0]),S_=P((K)=>{h_.current=K,B_(K)},[]),l_=P(()=>{let K=d_.current;if(K?.timer)clearTimeout(K.timer);d_.current={path:null,timer:0}},[]),J0=P((K)=>{if(!K||K==="."){l_();return}let O=C_.current?.get(K);if(!O||O.type!=="dir"){l_();return}if(N_.current?.has(K)){l_();return}if(d_.current?.path===K)return;l_();let k=setTimeout(()=>{d_.current={path:null,timer:0},M_.current?.(K),G((C)=>{let R=new Set(C);return R.add(K),R})},600);d_.current={path:K,timer:k}},[l_]),L0=P((K,O)=>{if(S0.current={x:K,y:O},e_.current)return;e_.current=requestAnimationFrame(()=>{e_.current=0;let k=X0.current;if(!k)return;let C=S0.current;k.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),k0=P((K)=>{if(!K)return;let k=(C_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!k)return;l({path:K,label:k})},[]),y0=P(()=>{if(l(null),e_.current)cancelAnimationFrame(e_.current),e_.current=0;if(X0.current)X0.current.style.transform="translate(-9999px, -9999px)"},[]),m0=P((K)=>{if(!K)return".";let O=C_.current?.get(K);if(O&&O.type==="dir")return O.path;if(K==="."||!K.includes("/"))return".";let k=K.split("/");return k.pop(),k.join("/")||"."},[]),N0=P(()=>{U(null),F("")},[]),G2=P((K)=>{if(!K)return;let k=(C_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!k||K===".")return;U(K),F(k)},[]),x0=P(async()=>{let K=W0.current;if(!K)return;let O=(E||"").trim();if(!O){N0();return}let k=C_.current?.get(K),C=(k?.name||K.split("/").pop()||K).trim();if(O===C){N0();return}try{let p=(await A3(K,O))?.path||K,e=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(N0(),r(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:p,type:k?.type||"file"}})),k?.type==="dir")G((__)=>{let o=new Set;for(let G_ of __)if(G_===K)o.add(p);else if(G_.startsWith(`${K}/`))o.add(`${p}${G_.slice(K.length)}`);else o.add(G_);return o});if(V(p),k?.type==="dir")M(null),T(!1),z(null);else L_.current?.(p);M_.current?.(e)}catch(R){r(R?.message||"Failed to rename file")}},[N0,E]),L=P(async(K)=>{let C=K||".";for(let R=0;R<50;R+=1){let e=`untitled${R===0?"":`-${R}`}.md`;try{let o=(await w3(C,e,""))?.path||(C==="."?e:`${C}/${e}`);if(C&&C!==".")G((G_)=>new Set([...G_,C]));V(o),r(null),M_.current?.(C),L_.current?.(o);return}catch(__){if(__?.status===409||__?.code==="file_exists")continue;r(__?.message||"Failed to create file");return}}r("Failed to create file (untitled name already in use).")},[]),u=P((K)=>{if(K?.stopPropagation?.(),O_)return;let O=m0(_0.current);L(O)},[O_,m0,L]);g(()=>{if(typeof window>"u")return;let K=(O)=>{let k=O?.detail?.updates||[];if(!Array.isArray(k)||k.length===0)return;Y((__)=>{let o=__;for(let G_ of k){if(!G_?.root)continue;if(!o||G_.path==="."||!G_.path)o=G_.root;else o=M1(o,G_.path,G_.root)}if(o)U_.current=q4(o,N_.current,a_.current);return f(!1),o});let C=_0.current;if(Boolean(C)&&k.some((__)=>{let o=__?.path||"";if(!o||o===".")return!0;return C===o||C.startsWith(`${o}/`)||o.startsWith(`${C}/`)}))d.current.clear();if(!C||!U0.current)return;let p=C_.current?.get(C);if(p&&p.type==="dir")return;if(k.some((__)=>{let o=__?.path||"";if(!o||o===".")return!0;return C===o||C.startsWith(`${o}/`)}))L_.current?.(C)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),R_.current=i0;let n=y(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),O=C0.current??D0.current,k=document.visibilityState!=="hidden"&&(O||K.matches&&D0.current);T2(k,a_.current).catch(()=>{})}).current,Y_=y(0),H_=y(()=>{if(Y_.current)clearTimeout(Y_.current);Y_.current=setTimeout(()=>{Y_.current=0,n()},250)}).current;g(()=>{if(D0.current)R_.current?.();H_()},[$,J]),g(()=>{R_.current(),n();let K=setInterval(()=>R_.current(),r8),O=j2("previewHeight",null),k=Number.isFinite(O)?Math.min(Math.max(O,80),600):280;if(b.current=k,Z0.current)Z0.current.style.setProperty("--preview-height",`${k}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),R=()=>H_();if(C.addEventListener)C.addEventListener("change",R);else if(C.addListener)C.addListener(R);return document.addEventListener("visibilitychange",R),()=>{if(clearInterval(K),F_.current)cancelAnimationFrame(F_.current),F_.current=0;if(C.removeEventListener)C.removeEventListener("change",R);else if(C.removeListener)C.removeListener(R);if(document.removeEventListener("visibilitychange",R),Y_.current)clearTimeout(Y_.current),Y_.current=0;if(b_.current)clearTimeout(b_.current),b_.current=null;T2(!1,a_.current).catch(()=>{})}},[]);let x_=f0(()=>H4(j,Q,Z_),[j,Q,Z_]),z_=f0(()=>new Map(x_.map((K)=>[K.node.path,K.node])),[x_]);C_.current=z_;let v_=(W?C_.current.get(W):null)?.type==="dir";g(()=>{if(!W||!v_){K_(null),P_.current=null,p_.current=null;return}let K=W,O=`${Z_?"hidden":"visible"}:${W}`,k=d.current,C=k.get(O);if(C?.root){k.delete(O),k.set(O,C);let e=B4(C.root,Boolean(C.truncated),V_);if(e)P_.current=e,p_.current=W,K_({loading:!1,error:null,payload:e});return}let R=P_.current,p=p_.current;K_({loading:!0,error:null,payload:p===W?R:null}),x2(W,d8,Z_).then((e)=>{if(_0.current!==K)return;let __={root:e?.root,truncated:Boolean(e?.truncated)};k.delete(O),k.set(O,__);while(k.size>s8){let G_=k.keys().next().value;if(!G_)break;k.delete(G_)}let o=B4(__.root,__.truncated,V_);P_.current=o,p_.current=W,K_({loading:!1,error:null,payload:o})}).catch((e)=>{if(_0.current!==K)return;K_({loading:!1,error:e?.message||"Failed to load folder size chart",payload:p===W?R:null})})},[W,v_,Z_,V_]);let w0=Boolean(D&&D.kind==="text"&&!v_&&(!D.size||D.size<=262144)),w_=w0?"Open in editor":D?.size>262144?"File too large to edit":"File is not editable";g(()=>{let K=A0.current;if(H0.current)H0.current.dispose(),H0.current=null;if(!K)return;if(K.innerHTML="",!W||v_||!D||D.error)return;let O={path:W,content:typeof D.text==="string"?D.text:void 0,mtime:D.mtime,size:D.size,preview:D,mode:"view"},k=g_.resolve(O)||g_.get("workspace-preview-default");if(!k)return;let C=k.mount(K,O);return H0.current=C,()=>{if(H0.current===C)C.dispose(),H0.current=null;K.innerHTML=""}},[W,v_,D]);let k_=(K)=>{let O=K?.target;if(O instanceof Element)return O;return O?.parentElement||null},l0=y((K)=>{if(i_.current)clearTimeout(i_.current),i_.current=null;let k=k_(K)?.closest?.("[data-path]");if(!k)return;let C=k.dataset.path;if(k.dataset.type==="dir"||!C)return;if(W0.current===C)N0();K0.current?.(C)}).current,W2=y((K)=>{if(f_.current){f_.current=!1;return}let O=k_(K),k=O?.closest?.("[data-path]");if(O0.current?.focus?.(),!k)return;let C=k.dataset.path,R=k.dataset.type,p=Boolean(O?.closest?.(".workspace-caret")),e=Boolean(O?.closest?.("button"))||Boolean(O?.closest?.("a"))||Boolean(O?.closest?.("input")),__=_0.current===C,o=W0.current;if(o){if(o===C)return;N0()}let G_=R==="file"&&V0.current===C&&!p&&!e;if(__&&!p&&!e&&C!=="."&&!G_){if(i_.current)clearTimeout(i_.current);i_.current=setTimeout(()=>{i_.current=null,G2(C)},350);return}if(R==="dir"){if(V0.current=null,V(C),M(null),z(null),T(!1),!N_.current.has(C))M_.current?.(C);if(__&&!p)return;G((q0)=>{let g0=new Set(q0);if(g0.has(C))g0.delete(C);else g0.add(C);return g0})}else{V0.current=null,V(C);let c_=C_.current.get(C);if(c_)r_.current?.(c_.path,c_);L_.current?.(C)}}).current,V2=y(()=>{U_.current="",R_.current(),Array.from(N_.current||[]).filter((O)=>O&&O!==".").forEach((O)=>M_.current?.(O))}).current,T0=y(()=>{V0.current=null,V(null),M(null),z(null),T(!1)}).current,n2=y(()=>{X_((K)=>{let O=!K;if(typeof window<"u")T_("workspaceShowHidden",String(O));return a_.current=O,T2(!0,O).catch(()=>{}),U_.current="",R_.current?.(),Array.from(N_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>M_.current?.(C)),O})}).current,o0=y((K)=>{if(k_(K)?.closest?.("[data-path]"))return;T0()}).current,F0=P(async(K)=>{if(!K)return;let O=K.split("/").pop()||K;if(!window.confirm(`Delete "${O}"? This cannot be undone.`))return;try{await b3(K);let C=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(_0.current===K)T0();M_.current?.(C),r(null)}catch(C){M((R)=>({...R||{},error:C.message||"Failed to delete file"}))}},[T0]),n_=P((K)=>{let O=O0.current;if(!O||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;O.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),r2=P((K)=>{let O=x_;if(!O||O.length===0)return;let k=W?O.findIndex((C)=>C.node.path===W):-1;if(K.key==="ArrowDown"){K.preventDefault();let C=Math.min(k+1,O.length-1),R=O[C];if(!R)return;if(V(R.node.path),R.node.type!=="dir")r_.current?.(R.node.path,R.node),L_.current?.(R.node.path);else M(null),T(!1),z(null);n_(R.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let C=k<=0?0:k-1,R=O[C];if(!R)return;if(V(R.node.path),R.node.type!=="dir")r_.current?.(R.node.path,R.node),L_.current?.(R.node.path);else M(null),T(!1),z(null);n_(R.node.path);return}if(K.key==="ArrowRight"&&k>=0){let C=O[k];if(C?.node?.type==="dir"&&!Q.has(C.node.path))K.preventDefault(),M_.current?.(C.node.path),G((R)=>new Set([...R,C.node.path]));return}if(K.key==="ArrowLeft"&&k>=0){let C=O[k];if(C?.node?.type==="dir"&&Q.has(C.node.path))K.preventDefault(),G((R)=>{let p=new Set(R);return p.delete(C.node.path),p});return}if(K.key==="Enter"&&k>=0){K.preventDefault();let C=O[k];if(!C)return;let R=C.node.path;if(C.node.type==="dir"){if(!N_.current.has(R))M_.current?.(R);G((e)=>{let __=new Set(e);if(__.has(R))__.delete(R);else __.add(R);return __}),M(null),z(null),T(!1)}else r_.current?.(R,C.node),L_.current?.(R);return}if((K.key==="Delete"||K.key==="Backspace")&&k>=0){let C=O[k];if(!C||C.node.type==="dir")return;K.preventDefault(),F0(C.node.path);return}if(K.key==="Escape")K.preventDefault(),T0()},[T0,F0,Q,x_,n_,W]),d2=P((K)=>{let O=K?.target?.closest?.(".workspace-row");if(!O)return;let k=O.dataset.type,C=O.dataset.path;if(!C||C===".")return;if(W0.current===C)return;let R=K?.touches?.[0];if(!R)return;if(m_.current={path:C,dragging:!1,startX:R.clientX,startY:R.clientY},k!=="file")return;if(b_.current)clearTimeout(b_.current);b_.current=setTimeout(()=>{if(b_.current=null,m_.current?.dragging)return;F0(C)},600)},[F0]),N2=P(()=>{if(b_.current)clearTimeout(b_.current),b_.current=null;let K=m_.current;if(K?.dragging&&K.path){let O=h_.current||u_(),k=M0.current;if(typeof k==="function")k(K.path,O)}m_.current={path:null,dragging:!1,startX:0,startY:0},Y0.current=0,j_(!1),h(null),S_(null),l_(),y0()},[u_,y0,S_,l_]),P0=P((K)=>{let O=m_.current,k=K?.touches?.[0];if(!k||!O?.path){if(b_.current)clearTimeout(b_.current),b_.current=null;return}let C=Math.abs(k.clientX-O.startX),R=Math.abs(k.clientY-O.startY),p=C>8||R>8;if(p&&b_.current)clearTimeout(b_.current),b_.current=null;if(!O.dragging&&p)O.dragging=!0,j_(!0),h("move"),k0(O.path);if(O.dragging){K.preventDefault(),L0(k.clientX,k.clientY);let e=document.elementFromPoint(k.clientX,k.clientY),__=Q0(e)||u_();if(h_.current!==__)S_(__);J0(__)}},[Q0,u_,k0,L0,S_,J0]),I0=y((K)=>{K.preventDefault();let O=Z0.current;if(!O)return;let k=K.clientY,C=b.current||280,R=K.currentTarget;R.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let p=k,e=(o)=>{p=o.clientY;let G_=O.clientHeight-80,c_=Math.min(Math.max(C-(o.clientY-k),80),G_);O.style.setProperty("--preview-height",`${c_}px`),b.current=c_},__=()=>{let o=O.clientHeight-80,G_=Math.min(Math.max(C-(p-k),80),o);b.current=G_,R.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("previewHeight",String(Math.round(G_))),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",__)};document.addEventListener("mousemove",e),document.addEventListener("mouseup",__)}).current,s2=y((K)=>{K.preventDefault();let O=Z0.current;if(!O)return;let k=K.touches[0];if(!k)return;let C=k.clientY,R=b.current||280,p=K.currentTarget;p.classList.add("dragging"),document.body.style.userSelect="none";let e=(o)=>{let G_=o.touches[0];if(!G_)return;o.preventDefault();let c_=O.clientHeight-80,q0=Math.min(Math.max(R-(G_.clientY-C),80),c_);O.style.setProperty("--preview-height",`${q0}px`),b.current=q0},__=()=>{p.classList.remove("dragging"),document.body.style.userSelect="",T_("previewHeight",String(Math.round(b.current||R))),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",__),document.removeEventListener("touchcancel",__)};document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",__),document.addEventListener("touchcancel",__)}).current,F2=async()=>{if(!W)return;try{let K=await y3(W);if(K.media_id)z(K.media_id)}catch(K){M((O)=>({...O||{},error:K.message||"Failed to attach"}))}},d0=async()=>{if(!W||v_)return;await F0(W)},s0=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},a2=P((K)=>{if(!s0(K))return;if(K.preventDefault(),Y0.current+=1,!v0.current)j_(!0);h("upload");let O=$0(K)||u_();S_(O),J0(O)},[u_,$0,S_,J0]),t2=P((K)=>{if(!s0(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!v0.current)j_(!0);if(j0.current!=="upload")h("upload");let O=$0(K)||u_();if(h_.current!==O)S_(O);J0(O)},[u_,$0,S_,J0]),e2=P((K)=>{if(!s0(K))return;if(K.preventDefault(),Y0.current=Math.max(0,Y0.current-1),Y0.current===0)j_(!1),h(null),S_(null),l_()},[S_,l_]),a0=P(async(K,O=".")=>{let k=Array.from(K||[]);if(k.length===0)return;let C=O&&O!==""?O:".",R=C!=="."?C:"workspace root";c(!0);try{let p=null;for(let e of k)try{p=await V1(e,C)}catch(__){let o=__?.status,G_=__?.code;if(o===409||G_==="file_exists"){let c_=e?.name||"file";if(!window.confirm(`"${c_}" already exists in ${R}. Overwrite?`))continue;p=await V1(e,C,{overwrite:!0})}else throw __}if(p?.path)V0.current=p.path,V(p.path),L_.current?.(p.path);M_.current?.(C)}catch(p){r(p.message||"Failed to upload file")}finally{c(!1)}},[]),_1=P(async(K,O)=>{if(!K)return;let k=C_.current?.get(K);if(!k)return;let C=O&&O!==""?O:".",R=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(C===R)return;try{let e=(await M3(K,C))?.path||K;if(k.type==="dir")G((__)=>{let o=new Set;for(let G_ of __)if(G_===K)o.add(e);else if(G_.startsWith(`${K}/`))o.add(`${e}${G_.slice(K.length)}`);else o.add(G_);return o});if(V(e),k.type==="dir")M(null),T(!1),z(null);else L_.current?.(e);M_.current?.(R),M_.current?.(C)}catch(p){r(p?.message||"Failed to move entry")}},[]);M0.current=_1;let t0=P(async(K)=>{if(!s0(K))return;K.preventDefault(),Y0.current=0,j_(!1),h(null),B_(null),l_();let O=Array.from(K?.dataTransfer?.files||[]);if(O.length===0)return;let k=h_.current||$0(K)||u_();await a0(O,k)},[u_,$0,a0]),q2=P((K)=>{if(K?.stopPropagation?.(),O_)return;let O=K?.currentTarget?.dataset?.uploadTarget||".";z0.current=O,B0.current?.click()},[O_]),c0=P(()=>{if(O_)return;let K=_0.current,O=K?C_.current?.get(K):null;z0.current=O?.type==="dir"?O.path:".",B0.current?.click()},[O_]),$1=P((K)=>{if(!K||K.button!==0)return;let O=K.currentTarget;if(!O||!O.dataset)return;let k=O.dataset.path;if(!k||k===".")return;if(W0.current===k)return;if(K.target?.closest?.("button, a, input, .workspace-caret"))return;K.preventDefault(),t_.current={path:k,dragging:!1,startX:K.clientX,startY:K.clientY};let C=(p)=>{let e=t_.current;if(!e?.path)return;let __=Math.abs(p.clientX-e.startX),o=Math.abs(p.clientY-e.startY),G_=__>4||o>4;if(!e.dragging&&G_)e.dragging=!0,f_.current=!0,j_(!0),h("move"),k0(e.path),L0(p.clientX,p.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(e.dragging){p.preventDefault(),L0(p.clientX,p.clientY);let c_=document.elementFromPoint(p.clientX,p.clientY),q0=Q0(c_)||u_();if(h_.current!==q0)S_(q0);J0(q0)}},R=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",R);let p=t_.current;if(p?.dragging&&p.path){let e=h_.current||u_(),__=M0.current;if(typeof __==="function")__(p.path,e)}t_.current={path:null,dragging:!1,startX:0,startY:0},Y0.current=0,j_(!1),h(null),S_(null),l_(),y0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{f_.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",R)},[Q0,u_,k0,L0,y0,S_,J0,l_]),J1=P(async(K)=>{let O=Array.from(K?.target?.files||[]);if(O.length===0)return;let k=z0.current||".";if(await a0(O,k),z0.current=".",K?.target)K.target.value=""},[a0]);return B`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            ref=${Z0}
            onDragEnter=${a2}
            onDragOver=${t2}
            onDragLeave=${e2}
            onDrop=${t0}
        >
            <input type="file" multiple style="display:none" ref=${B0} onChange=${J1} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${u} title="New file" disabled=${O_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${V2} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Z_?" active":""}`}
                        onClick=${n2}
                        title=${Z_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Z_&&B`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${o0}>
                ${O_&&B`<div class="workspace-drop-hint">Uploading…</div>`}
                ${w&&B`<div class="workspace-loading">Loading…</div>`}
                ${s&&B`<div class="workspace-error">${s}</div>`}
                ${j&&B`
                    <div
                        class="workspace-tree-list"
                        ref=${O0}
                        tabIndex="0"
                        onClick=${W2}
                        onDblClick=${l0}
                        onKeyDown=${r2}
                        onTouchStart=${d2}
                        onTouchEnd=${N2}
                        onTouchMove=${P0}
                        onTouchCancel=${N2}
                    >
                        ${x_.map(({node:K,depth:O})=>{let k=K.type==="dir",C=K.path===W,R=K.path===X,p=k&&Q.has(K.path),e=t&&K.path===t,__=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return B`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${C?" selected":""}${e?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+O*n8}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${$1}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${k?p?B`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:B`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${k?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${k?B`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:B`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${R?B`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${G0}
                                                value=${E}
                                                onInput=${(o)=>F(o?.target?.value||"")}
                                                onKeyDown=${(o)=>{if(o.key==="Enter")o.preventDefault(),x0();else if(o.key==="Escape")o.preventDefault(),N0()}}
                                                onBlur=${N0}
                                                onClick=${(o)=>o.stopPropagation()}
                                            />
                                        `:B`<span class="workspace-label">${K.name}</span>`}
                                    ${k&&!p&&__>0&&B`
                                        <span class="workspace-count">${__}</span>
                                    `}
                                    ${k&&B`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${q2}
                                            disabled=${O_}
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
            ${W&&B`
                <div class="workspace-preview-splitter-h" onMouseDown=${I0} onTouchStart=${s2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${W}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${u} title="New file" disabled=${O_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!v_&&B`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>w0&&K0.current?.(W,D)}
                                    title=${w_}
                                    disabled=${!w0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${d0}
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
                            ${v_?B`
                                    <button class="workspace-download" onClick=${c0}
                                        title="Upload files to this folder" disabled=${O_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${P3(W,Z_)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:B`<button class="workspace-download" onClick=${F2} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${H&&B`<div class="workspace-loading">Loading preview…</div>`}
                    ${D?.error&&B`<div class="workspace-error">${D.error}</div>`}
                    ${v_&&B`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${W_?.loading&&B`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${W_?.error&&B`<div class="workspace-error">${W_.error}</div>`}
                        ${W_?.payload&&W_.payload.segments?.length>0&&B`
                            <${a8} payload=${W_.payload} />
                        `}
                        ${W_?.payload&&(!W_.payload.segments||W_.payload.segments.length===0)&&B`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${D&&!D.error&&!v_&&B`
                        <div class="workspace-preview-meta">
                            ${D.size?B`<span>${u0(D.size)}</span>`:""}
                            ${D.mtime?B`<span>${p2(D.mtime)}</span>`:""}
                            ${D.truncated?B`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${A0}></div>
                    `}
                    ${I&&B`
                        <div class="workspace-download-card">
                            <${t8} mediaId=${I} />
                        </div>
                    `}
                </div>
            `}
            ${J_&&B`
                <div class="workspace-drag-ghost" ref=${X0}>${J_.label}</div>
            `}
        </aside>
    `}function w4({tabs:_,activeId:$,onActivate:J,onClose:Z,onCloseOthers:j,onCloseAll:Y,onTogglePin:Q,onTogglePreview:G,previewTabs:W,onToggleDock:V,dockVisible:X}){let[U,E]=v(null),F=y(null);g(()=>{if(!U)return;let z=(w)=>{if(w.type==="keydown"&&w.key!=="Escape")return;E(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[U]),g(()=>{let z=(w)=>{if(w.ctrlKey&&w.key==="Tab"){if(w.preventDefault(),!_.length)return;let f=_.findIndex((H)=>H.id===$);if(w.shiftKey){let H=_[(f-1+_.length)%_.length];J?.(H.id)}else{let H=_[(f+1)%_.length];J?.(H.id)}return}if((w.ctrlKey||w.metaKey)&&w.key==="w"){let f=document.querySelector(".editor-pane");if(f&&f.contains(document.activeElement)){if(w.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Z]);let D=P((z,w)=>{if(z.button===1){z.preventDefault(),Z?.(w);return}if(z.button===0)J?.(w)},[J,Z]),M=P((z,w)=>{z.preventDefault(),E({id:w,x:z.clientX,y:z.clientY})},[]),I=P((z,w)=>{z.stopPropagation(),Z?.(w)},[Z]);if(g(()=>{if(!$||!F.current)return;let z=F.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return B`
        <div class="tab-strip" ref=${F} role="tablist">
            ${_.map((z)=>B`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(w)=>D(w,z.id)}
                    onContextMenu=${(w)=>M(w,z.id)}
                >
                    ${z.pinned&&B`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${z.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(w)=>I(w,z.id)}
                        title=${z.dirty?"Unsaved changes":"Close"}
                        aria-label=${z.dirty?"Unsaved changes":`Close ${z.label}`}
                    >
                        ${z.dirty?B`<span class="tab-dirty-dot" aria-hidden="true"></span>`:B`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${V&&B`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${X?" active":""}`}
                    onClick=${V}
                    title=${`${X?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${X?"Hide":"Show"} terminal`}
                    aria-pressed=${X?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${U&&B`
            <div class="tab-context-menu" style=${{left:U.x+"px",top:U.y+"px"}}>
                <button onClick=${()=>{Z?.(U.id),E(null)}}>Close</button>
                <button onClick=${()=>{j?.(U.id),E(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),E(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{Q?.(U.id),E(null)}}>
                    ${_.find((z)=>z.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${G&&/\.(md|mdx|markdown)$/i.test(U.id)&&B`
                    <hr />
                    <button onClick=${()=>{G(U.id),E(null)}}>
                        ${W?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var e8=400,S1=60,A4=220,x1="mdPreviewHeight";function _6(){try{let _=localStorage.getItem(x1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=S1?$:A4}catch{return A4}}function M4({getContent:_,path:$,onClose:J}){let[Z,j]=v(""),[Y,Q]=v(_6),G=y(null),W=y(null),V=y(""),X=y(_);return X.current=_,g(()=>{let F=()=>{let M=X.current?.()||"";if(M===V.current)return;V.current=M;try{let I=K2(M,null,{sanitize:!1});j(I)}catch{j('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};F();let D=setInterval(F,e8);return()=>clearInterval(D)},[]),g(()=>{if(G.current&&Z)g2(G.current).catch(()=>{})},[Z]),B`
        <div
            class="md-preview-splitter"
            onMouseDown=${(F)=>{F.preventDefault();let D=F.clientY,M=W.current?.offsetHeight||Y,I=W.current?.parentElement,z=I?I.offsetHeight*0.7:500,w=F.currentTarget;w.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let f=(T)=>{let s=Math.min(Math.max(M-(T.clientY-D),S1),z);Q(s)},H=()=>{w.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(x1,String(Math.round(W.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",f),document.addEventListener("mouseup",H)}}
            onTouchStart=${(F)=>{F.preventDefault();let D=F.touches[0];if(!D)return;let M=D.clientY,I=W.current?.offsetHeight||Y,z=W.current?.parentElement,w=z?z.offsetHeight*0.7:500,f=F.currentTarget;f.classList.add("dragging"),document.body.style.userSelect="none";let H=(s)=>{let r=s.touches[0];if(!r)return;s.preventDefault();let Z_=Math.min(Math.max(I-(r.clientY-M),S1),w);Q(Z_)},T=()=>{f.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(x1,String(Math.round(W.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",H),document.removeEventListener("touchend",T),document.removeEventListener("touchcancel",T)};document.addEventListener("touchmove",H,{passive:!1}),document.addEventListener("touchend",T),document.addEventListener("touchcancel",T)}}
        ></div>
        <div class="md-preview-panel" ref=${W} style=${{height:Y+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${J} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${G}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function b4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){g(()=>{J();let Z=new q1(_,$);Z.connect();let j=()=>{Z.reconnectIfNeeded()};return window.addEventListener("focus",j),document.addEventListener("visibilitychange",j),()=>{window.removeEventListener("focus",j),document.removeEventListener("visibilitychange",j),Z.disconnect()}},[$,_,J])}function P4(){let[_,$]=v(!1),[J,Z]=v("default"),j=y(!1);g(()=>{let W=Y2("notificationsEnabled",!1);if(j.current=W,$(W),typeof Notification<"u")Z(Notification.permission)},[]),g(()=>{j.current=_},[_]);let Y=P(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let W=Notification.requestPermission();if(W&&typeof W.then==="function")return W;return Promise.resolve(W)}catch{return Promise.resolve("default")}},[]),Q=P(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let V=await Y();if(Z(V||"default"),V!=="granted"){j.current=!1,$(!1),T_("notificationsEnabled","false");return}}let W=!j.current;j.current=W,$(W),T_("notificationsEnabled",String(W))},[Y]),G=P((W,V)=>{if(!j.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let X=new Notification(W,{body:V});return X.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:Q,notify:G}}var L2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function I4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Z]=v(null),[j,Y]=v(!1),Q=y(!1),G=y(null),W=y(!1),V=y(null);g(()=>{Q.current=j},[j]);let X=P(async(F=null)=>{try{if(F){let D=await q3(F);Z(D.posts),Y(!1)}else{let D=await I2(10);Z(D.posts),Y(D.has_more)}}catch(D){console.error("Failed to load posts:",D)}},[]),U=P(async()=>{try{let F=await I2(10);Z((D)=>{if(!D||D.length===0)return F.posts;return L2([...F.posts,...D])}),Y((D)=>D||F.has_more)}catch(F){console.error("Failed to refresh timeline:",F)}},[]),E=P(async(F={})=>{if(!J||J.length===0)return;if(W.current)return;let{preserveScroll:D=!0,preserveMode:M="top",allowRepeat:I=!1}=F,z=(H)=>{if(!D){H();return}if(M==="top")$(H);else _(H)},f=J.slice().sort((H,T)=>H.id-T.id)[0]?.id;if(!Number.isFinite(f))return;if(!I&&V.current===f)return;W.current=!0,V.current=f;try{let H=await I2(10,f);if(H.posts.length>0)z(()=>{Z((T)=>L2([...H.posts,...T||[]])),Y(H.has_more)});else Y(!1)}catch(H){console.error("Failed to load more posts:",H)}finally{W.current=!1}},[J,_,$]);return g(()=>{G.current=E},[E]),{posts:J,setPosts:Z,hasMore:j,setHasMore:Y,hasMoreRef:Q,loadPosts:X,refreshTimeline:U,loadMore:E,loadMoreRef:G,loadingMoreRef:W,lastBeforeIdRef:V}}function S4(){let[_,$]=v(null),[J,Z]=v({text:"",totalLines:0}),[j,Y]=v(""),[Q,G]=v({text:"",totalLines:0}),[W,V]=v(null),[X,U]=v(null),[E,F]=v(null),D=y(null),M=y(0),I=y(!1),z=y(""),w=y(""),f=y(null),H=y(null),T=y(null),s=y(null),r=y(!1),Z_=y(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Z,agentPlan:j,setAgentPlan:Y,agentThought:Q,setAgentThought:G,pendingRequest:W,setPendingRequest:V,currentTurnId:X,setCurrentTurnId:U,steerQueuedTurnId:E,setSteerQueuedTurnId:F,lastAgentEventRef:D,lastSilenceNoticeRef:M,isAgentRunningRef:I,draftBufferRef:z,thoughtBufferRef:w,pendingRequestRef:f,stalledPostIdRef:H,currentTurnIdRef:T,steerQueuedTurnIdRef:s,thoughtExpandedRef:r,draftExpandedRef:Z_}}function x4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Z}){let j=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.clientX,F=$.current||280,D=X.currentTarget;D.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=E,I=(w)=>{M=w.clientX;let f=Math.min(Math.max(F+(w.clientX-E),160),600);U.style.setProperty("--sidebar-width",`${f}px`),$.current=f},z=()=>{let w=Math.min(Math.max(F+(M-E),160),600);$.current=w,D.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",T_("sidebarWidth",String(Math.round(w))),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",z)}).current,Y=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.touches[0];if(!E)return;let F=E.clientX,D=$.current||280,M=X.currentTarget;M.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let I=(w)=>{let f=w.touches[0];if(!f)return;w.preventDefault();let H=Math.min(Math.max(D+(f.clientX-F),160),600);U.style.setProperty("--sidebar-width",`${H}px`),$.current=H},z=()=>{M.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",T_("sidebarWidth",String(Math.round($.current||D))),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,Q=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.clientX,F=J.current||$.current||280,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=E,I=(w)=>{M=w.clientX;let f=Math.min(Math.max(F+(w.clientX-E),200),800);U.style.setProperty("--editor-width",`${f}px`),J.current=f},z=()=>{let w=Math.min(Math.max(F+(M-E),200),800);J.current=w,D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("editorWidth",String(Math.round(w))),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",z)}).current,G=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.touches[0];if(!E)return;let F=E.clientX,D=J.current||$.current||280,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let I=(w)=>{let f=w.touches[0];if(!f)return;w.preventDefault();let H=Math.min(Math.max(D+(f.clientX-F),200),800);U.style.setProperty("--editor-width",`${H}px`),J.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",T_("editorWidth",String(Math.round(J.current||D))),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,W=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.clientY,F=Z?.current||200,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=E,I=(w)=>{M=w.clientY;let f=Math.min(Math.max(F-(w.clientY-E),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${f}px`),Z)Z.current=f},z=()=>{let w=Math.min(Math.max(F-(M-E),100),window.innerHeight*0.5);if(Z)Z.current=w;D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("dockHeight",String(Math.round(w))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",z)}).current,V=y((X)=>{X.preventDefault();let U=_.current;if(!U)return;let E=X.touches[0];if(!E)return;let F=E.clientY,D=Z?.current||200,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let I=(w)=>{let f=w.touches[0];if(!f)return;w.preventDefault();let H=Math.min(Math.max(D-(f.clientY-F),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${H}px`),Z)Z.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",T_("dockHeight",String(Math.round(Z?.current||D))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",I),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:j,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:Q,handleEditorSplitterTouchStart:G,handleDockSplitterMouseDown:W,handleDockSplitterTouchStart:V}}function T4({onTabClosed:_}={}){let $=y(_);$.current=_;let[J,Z]=v(()=>E_.getTabs()),[j,Y]=v(()=>E_.getActiveId()),[Q,G]=v(()=>E_.getTabs().length>0);g(()=>{return E_.onChange((H,T)=>{Z(H),Y(T),G(H.length>0)})},[]);let[W,V]=v(()=>new Set),X=P((H)=>{V((T)=>{let s=new Set(T);if(s.has(H))s.delete(H);else s.add(H);return s})},[]),U=P((H)=>{V((T)=>{if(!T.has(H))return T;let s=new Set(T);return s.delete(H),s})},[]),E=P((H)=>{if(!H)return;let T={path:H,mode:"edit"};try{if(!g_.resolve(T)){if(!g_.get("editor")){console.warn(`[openEditor] No pane handler for: ${H}`);return}}}catch(s){console.warn(`[openEditor] paneRegistry.resolve() error for "${H}":`,s)}E_.open(H)},[]),F=P(()=>{let H=E_.getActiveId();if(H){let T=E_.get(H);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(H),U(H),$.current?.(H)}},[U]),D=P((H)=>{let T=E_.get(H);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(H),U(H),$.current?.(H)},[U]),M=P((H)=>{E_.activate(H)},[]),I=P((H)=>{let T=E_.getTabs().filter((Z_)=>Z_.id!==H&&!Z_.pinned),s=T.filter((Z_)=>Z_.dirty).length;if(s>0){if(!window.confirm(`${s} unsaved tab${s>1?"s":""} will be closed. Continue?`))return}let r=T.map((Z_)=>Z_.id);E_.closeOthers(H),r.forEach((Z_)=>{U(Z_),$.current?.(Z_)})},[U]),z=P(()=>{let H=E_.getTabs().filter((r)=>!r.pinned),T=H.filter((r)=>r.dirty).length;if(T>0){if(!window.confirm(`${T} unsaved tab${T>1?"s":""} will be closed. Continue?`))return}let s=H.map((r)=>r.id);E_.closeAll(),s.forEach((r)=>{U(r),$.current?.(r)})},[U]),w=P((H)=>{E_.togglePin(H)},[]),f=P(()=>{let H=E_.getActiveId();if(H)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:H}}))},[]);return g(()=>{let H=(T)=>{let{oldPath:s,newPath:r,type:Z_}=T.detail||{};if(!s||!r)return;if(Z_==="dir"){for(let X_ of E_.getTabs())if(X_.path===s||X_.path.startsWith(`${s}/`)){let $_=`${r}${X_.path.slice(s.length)}`;E_.rename(X_.id,$_)}}else E_.rename(s,r)};return window.addEventListener("workspace-file-renamed",H),()=>window.removeEventListener("workspace-file-renamed",H)},[]),g(()=>{let H=(T)=>{if(E_.hasUnsaved())T.preventDefault(),T.returnValue=""};return window.addEventListener("beforeunload",H),()=>window.removeEventListener("beforeunload",H)},[]),{editorOpen:Q,tabStripTabs:J,tabStripActiveId:j,previewTabs:W,openEditor:E,closeEditor:F,handleTabClose:D,handleTabActivate:M,handleTabCloseOthers:I,handleTabCloseAll:z,handleTabTogglePin:w,handleTabTogglePreview:X,revealInExplorer:f}}function T1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,j=J[_]??window[Z],Y=Number(j);return Number.isFinite(Y)?Y:$}catch{return $}}var f1=T1("warning",30000),f4=T1("finalize",120000),u4=T1("refresh",30000),v4=30000;function R4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function m4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function c4(_=30000){let[,$]=v(0);g(()=>{let J=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(J)},[_])}function o2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Z,j)=>Z+Math.max(1,Math.ceil(j.length/$)),0)}function l4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var $6=O3,g4=z3,J6=H3,p4=E3,h4=D3,i4=U3,u1=typeof G1==="function"?G1:l4("getAgentContext",null),Z6=typeof n0==="function"?n0:l4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});g_.register(E1);g_.register(w1);g_.register(y1);D1();var Y6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(Y6)g_.register(C1);function j6(){let[_,$]=v("disconnected"),[J,Z]=v(null),[j,Y]=v(null),[Q,G]=v(!1),[W,V]=v([]),[X,U]=v([]),[E,F]=v(null),{agentStatus:D,setAgentStatus:M,agentDraft:I,setAgentDraft:z,agentPlan:w,setAgentPlan:f,agentThought:H,setAgentThought:T,pendingRequest:s,setPendingRequest:r,currentTurnId:Z_,setCurrentTurnId:X_,steerQueuedTurnId:$_,setSteerQueuedTurnId:j_,lastAgentEventRef:a,lastSilenceNoticeRef:h,isAgentRunningRef:J_,draftBufferRef:l,thoughtBufferRef:t,pendingRequestRef:B_,stalledPostIdRef:O_,currentTurnIdRef:c,steerQueuedTurnIdRef:W_,thoughtExpandedRef:K_,draftExpandedRef:V_}=S4(),[y_,N_]=v({}),[U_,A_]=v(null),[F_,D_]=v(null),[R_,C_]=v(!1),[r_,K0]=v(null),[L_,M_]=v(null),{notificationsEnabled:Z0,notificationPermission:O0,toggleNotifications:G0,notify:B0}=P4(),[z0,b_]=v(()=>new Set),[m_,t_]=v(()=>Y2("workspaceOpen",!0)),d_=y(null),{editorOpen:f_,tabStripTabs:b,tabStripActiveId:d,previewTabs:P_,openEditor:p_,closeEditor:A0,handleTabClose:H0,handleTabActivate:a_,handleTabCloseOthers:D0,handleTabCloseAll:C0,handleTabTogglePin:Y0,handleTabTogglePreview:h_,revealInExplorer:v0}=T4({onTabClosed:(N)=>d_.current?.(N)}),j0=y(null),X0=y(null);g(()=>{let N=j0.current;if(!N)return;if(X0.current)X0.current.dispose(),X0.current=null;let q=d;if(!q)return;let A={path:q,mode:"edit"},x=g_.resolve(A)||g_.get("editor");if(!x){N.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let m=x.mount(N,A);X0.current=m,m.onDirtyChange?.((i)=>{E_.setDirty(q,i)}),m.onSaveRequest?.(()=>{}),m.onClose?.(()=>{A0()});let S=E_.getViewState(q);if(S&&typeof m.restoreViewState==="function")requestAnimationFrame(()=>m.restoreViewState(S));if(typeof m.onViewStateChange==="function")m.onViewStateChange((i)=>{E_.saveViewState(q,i)});return requestAnimationFrame(()=>m.focus()),()=>{if(X0.current===m)m.dispose(),X0.current=null}},[d,A0]);let[S0,e_]=v({name:"You",avatar_url:null,avatar_background:null}),M0=y(!1),_0=y(!1),W0=y({}),V0=y({name:null,avatar_url:null}),i_=y({currentHashtag:null,searchQuery:null}),U0=y(null),b0=y(null),i0=y(0),R0=y(0),u_=y(0),Q0=y(null),$0=y(null),S_=y(null),l_=y(0),J0=y({title:null,avatarBase:null}),L0=y(null),k0=P(()=>{if(L0.current)clearTimeout(L0.current),L0.current=null;F(null)},[]);c4(30000),g(()=>{return m3()},[]),g(()=>{T_("workspaceOpen",String(m_))},[m_]),g(()=>{return()=>{k0()}},[k0]),g(()=>{W0.current=y_||{}},[y_]),g(()=>{V0.current=S0||{name:"You",avatar_url:null,avatar_background:null}},[S0]);let y0=P((N,q,A=null)=>{if(typeof document>"u")return;let x=(N||"").trim()||"PiClaw";if(J0.current.title!==x){document.title=x;let I_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(I_&&I_.getAttribute("content")!==x)I_.setAttribute("content",x);J0.current.title=x}let m=document.getElementById("dynamic-favicon");if(!m)return;let S=m.getAttribute("data-default")||m.getAttribute("href")||"/favicon.ico",i=q||S,q_=q?`${i}|${A||""}`:i;if(J0.current.avatarBase!==q_){let I_=q?`${i}${i.includes("?")?"&":"?"}v=${A||Date.now()}`:i;m.setAttribute("href",I_),J0.current.avatarBase=q_}},[]),m0=P((N)=>{if(!N)return;V((q)=>q.includes(N)?q:[...q,N])},[]),N0=P((N)=>{V((q)=>q.filter((A)=>A!==N))},[]);d_.current=N0;let G2=P(()=>{V([])},[]),x0=P((N,q=null,A=3000)=>{k0(),F({title:N,detail:q||null}),L0.current=setTimeout(()=>{F((x)=>x?.title===N?null:x)},A)},[k0]),L=P((N)=>{if(typeof N!=="string")return;let q=N.trim();if(!q){x0("No file selected","Use a valid file path from a file pill.");return}if(!f_){x0("Editor pane is not open","Open the editor pane to open files from pills.");return}if(/^[a-z][a-z0-9+.-]*:/i.test(q)){x0("Cannot open external path from file pill","Use an in-workspace file path.");return}let x={path:q,mode:"edit"};if(!g_.resolve(x)){x0("No editor available",`No editor can open: ${q}`);return}p_(q)},[f_,p_,x0]),u=P(()=>{let N=d;if(N)m0(N)},[d,m0]),n=P((N)=>{if(!N)return;U((q)=>q.includes(N)?q:[...q,N])},[]),Y_=P(async(N)=>{let q=(x)=>{x.scrollIntoView({behavior:"smooth",block:"center"}),x.classList.add("post-highlight"),setTimeout(()=>x.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+N);if(A){q(A);return}try{let m=(await B3(N))?.thread?.[0];if(!m)return;n_((S)=>{if(!S)return[m];if(S.some((i)=>i.id===m.id))return S;return[...S,m]}),requestAnimationFrame(()=>{setTimeout(()=>{let S=document.getElementById("post-"+N);if(S)q(S)},50)})}catch(x){console.error("[scrollToMessage] Failed to fetch message",N,x)}},[]),H_=P((N)=>{U((q)=>q.filter((A)=>A!==N))},[]),x_=P(()=>{U([])},[]),z_=P((N={})=>{let q=Date.now();if(a.current=q,N.running)J_.current=!0;if(N.clearSilence)h.current=0},[]),o_=P(()=>{if(S_.current)clearTimeout(S_.current),S_.current=null;l_.current=0},[]);g(()=>()=>{o_()},[o_]);let v_=P(()=>{o_(),M((N)=>{if(!N)return N;if(!(N.last_activity||N.lastActivity))return N;let{last_activity:q,lastActivity:A,...x}=N;return x})},[o_]),w0=P((N)=>{if(!N)return;o_();let q=Date.now();l_.current=q,M({type:N.type||"active",last_activity:!0}),S_.current=setTimeout(()=>{if(l_.current!==q)return;M((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},v4)},[o_]),w_=P(()=>{J_.current=!1,a.current=null,h.current=0,l.current="",t.current="",B_.current=null,$0.current=null,c.current=null,W_.current=null,o_(),X_(null),j_(null),K_.current=!1,V_.current=!1},[o_,X_,j_]),k_=P((N)=>{if(!N)return;if(c.current===N)return;c.current=N,X_(N),W_.current=null,j_(null),l.current="",t.current="",z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),B_.current=null,$0.current=null,K_.current=!1,V_.current=!1},[X_,j_]),l0=P((N)=>{if(typeof document<"u"){let I_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&I_)return}let q=$0.current;if(!q||!q.post)return;if(N&&q.turnId&&q.turnId!==N)return;let A=q.post;if(A.id&&Q0.current===A.id)return;let x=String(A?.data?.content||"").trim();if(!x)return;Q0.current=A.id||Q0.current,$0.current=null;let m=x.replace(/\s+/g," ").slice(0,200),S=W0.current||{},q_=(A?.data?.agent_id?S[A.data.agent_id]:null)?.name||"Pi";B0(q_,m)},[B0]),W2=P(async(N,q)=>{if(N!=="thought"&&N!=="draft")return;let A=c.current;if(N==="thought"){if(K_.current=q,A)try{await h4(A,"thought",q)}catch(x){console.warn("Failed to update thought visibility:",x)}if(!q)return;try{let x=A?await p4(A,"thought"):null;if(x?.text)t.current=x.text;T((m)=>({...m||{text:"",totalLines:0},fullText:t.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full thought:",x)}return}if(V_.current=q,A)try{await h4(A,"draft",q)}catch(x){console.warn("Failed to update draft visibility:",x)}if(!q)return;try{let x=A?await p4(A,"draft"):null;if(x?.text)l.current=x.text;z((m)=>({...m||{text:"",totalLines:0},fullText:l.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full draft:",x)}},[]),V2=y(null),T0=P(()=>{if(U0.current)U0.current.scrollTop=0},[]);V2.current=T0;let n2=P((N)=>{let q=U0.current;if(!q||typeof N!=="function"){N?.();return}let{currentHashtag:A,searchQuery:x}=i_.current||{},m=!(x&&!A),S=m?q.scrollHeight-q.scrollTop:q.scrollTop;N(),requestAnimationFrame(()=>{let i=U0.current;if(!i)return;if(m){let q_=Math.max(i.scrollHeight-S,0);i.scrollTop=q_}else{let q_=Math.max(i.scrollHeight-i.clientHeight,0),I_=Math.min(S,q_);i.scrollTop=I_}})},[]),o0=P((N)=>{let q=U0.current;if(!q||typeof N!=="function"){N?.();return}let A=q.scrollTop;N(),requestAnimationFrame(()=>{let x=U0.current;if(!x)return;let m=Math.max(x.scrollHeight-x.clientHeight,0);x.scrollTop=Math.min(A,m)})},[]),{posts:F0,setPosts:n_,hasMore:r2,setHasMore:d2,hasMoreRef:N2,loadPosts:P0,refreshTimeline:I0,loadMore:s2,loadMoreRef:F2}=I4({preserveTimelineScroll:n2,preserveTimelineScrollTop:o0}),d0=P(()=>{let N=O_.current;if(!N)return;n_((q)=>q?q.filter((A)=>A.id!==N):q),O_.current=null},[n_]),{handleSplitterMouseDown:s0,handleSplitterTouchStart:a2,handleEditorSplitterMouseDown:t2,handleEditorSplitterTouchStart:e2,handleDockSplitterMouseDown:a0,handleDockSplitterTouchStart:_1}=x4({appShellRef:b0,sidebarWidthRef:i0,editorWidthRef:R0,dockHeightRef:u_}),t0=P(()=>{if(!J_.current)return;J_.current=!1,h.current=0,a.current=null,c.current=null,X_(null),K_.current=!1,V_.current=!1;let N=(l.current||"").trim();if(l.current="",t.current="",z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),B_.current=null,$0.current=null,!N){M({type:"error",title:"Response stalled — No content received"});return}let A=`${N}${`

⚠️ Response may be incomplete — the model stopped responding`}`,x=Date.now(),m=new Date().toISOString(),S={id:x,timestamp:m,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};O_.current=x,n_((i)=>i?L2([...i,S]):[S]),V2.current?.(),M(null)},[X_]);g(()=>{i_.current={currentHashtag:J,searchQuery:j}},[J,j]),g(()=>{let N=Math.min(1000,Math.max(100,Math.floor(f1/2))),q=setInterval(()=>{if(!J_.current)return;if(B_.current)return;let A=a.current;if(!A)return;let x=Date.now(),m=x-A;if(m>=f4){t0();return}if(m>=f1){if(x-h.current>=u4){let S=Math.floor(m/1000);M({type:"waiting",title:`Waiting for model… No events for ${S}s`}),h.current=x}}},N);return()=>clearInterval(q)},[t0]);let q2=P(async()=>{try{let N=await u1();if(N)M_(N)}catch(N){console.warn("Failed to fetch agent context:",N)}},[]),c0=P(async()=>{try{let N=await i4("web:default");if(!N||N.status!=="active"||!N.data){if(_0.current){let{currentHashtag:x,searchQuery:m}=i_.current||{};if(!x&&!m)I0()}_0.current=!1,w_(),M(null),z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),B_.current=null;return}_0.current=!0;let q=N.data,A=q.turn_id||q.turnId;if(A)k_(A);if(z_({running:!0,clearSilence:!0}),v_(),M(q),N.thought&&N.thought.text)T((x)=>{if(x&&x.text&&x.text.length>=N.thought.text.length)return x;return t.current=N.thought.text,{text:N.thought.text,totalLines:N.thought.totalLines||0}});if(N.draft&&N.draft.text)z((x)=>{if(x&&x.text&&x.text.length>=N.draft.text.length)return x;return l.current=N.draft.text,{text:N.draft.text,totalLines:N.draft.totalLines||0}})}catch(N){console.warn("Failed to fetch agent status:",N)}},[w_,v_,z_,I0,k_]),$1=P((N)=>{if($(N),N!=="connected"){M(null),z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),B_.current=null,w_();return}if(!M0.current){M0.current=!0,c0();return}let{currentHashtag:q,searchQuery:A}=i_.current;if(!q&&!A)I0();c0()},[w_,I0,c0]),J1=P(async(N)=>{Z(N),n_(null),await P0(N)},[P0]),K=P(async()=>{Z(null),Y(null),n_(null),await P0()},[P0]),O=P(async(N)=>{if(!N||!N.trim())return;Y(N.trim()),Z(null),n_(null);try{let q=await $6(N.trim());n_(q.results),d2(!1)}catch(q){console.error("Failed to search:",q),n_([])}},[]),k=P(()=>{G(!0),Y(null),Z(null),n_([])},[]),C=P(()=>{G(!1),Y(null),P0()},[P0]),R=P(()=>{},[]),p=P(async(N)=>{if(!N)return;let q=N.id,A=F0?.filter((m)=>m?.data?.thread_id===q&&m?.id!==q).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let x=(m)=>{if(!m.length)return;b_((i)=>{let q_=new Set(i);return m.forEach((I_)=>q_.add(I_)),q_}),setTimeout(()=>{if(o0(()=>{n_((i)=>i?i.filter((q_)=>!m.includes(q_.id)):i)}),b_((i)=>{let q_=new Set(i);return m.forEach((I_)=>q_.delete(I_)),q_}),N2.current)F2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let m=await g4(q,A>0);if(m?.ids?.length)x(m.ids)}catch(m){let S=m?.message||"";if(A===0&&S.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let q_=await g4(q,!0);if(q_?.ids?.length)x(q_.ids);return}console.error("Failed to delete post:",m),alert(`Failed to delete message: ${S}`)}},[F0,o0]),e=P(async()=>{try{let N=await J6();N_(R4(N));let q=N?.user||{};e_((x)=>{let m=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",S=typeof q.avatar_url==="string"?q.avatar_url.trim():null,i=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(x.name===m&&x.avatar_url===S&&x.avatar_background===i)return x;return{name:m,avatar_url:S,avatar_background:i}});let A=(N?.agents||[]).find((x)=>x.id==="default");if(A?.model)A_(A.model);y0(A?.name,A?.avatar_url)}catch(N){console.warn("Failed to load agents:",N)}try{let N=await u1();if(N)M_(N)}catch{}},[y0]);g(()=>{e();let N=j2("sidebarWidth",null),q=Number.isFinite(N)?Math.min(Math.max(N,160),600):280;if(i0.current=q,b0.current)b0.current.style.setProperty("--sidebar-width",`${q}px`)},[e]);let __=P((N)=>{if(!N||typeof N!=="object")return;let q=N.agent_id;if(!q)return;let{agent_name:A,agent_avatar:x}=N;if(!A&&x===void 0)return;let m=W0.current?.[q]||{id:q},S=m.name||null,i=m.avatar_url??m.avatarUrl??m.avatar??null,q_=!1,I_=!1;if(A&&A!==m.name)S=A,I_=!0;if(x!==void 0){let _2=typeof x==="string"?x.trim():null,v1=typeof i==="string"?i.trim():null,$2=_2||null;if($2!==(v1||null))i=$2,q_=!0}if(!I_&&!q_)return;if(N_((_2)=>{let $2={..._2[q]||{id:q}};if(I_)$2.name=S;if(q_)$2.avatar_url=i;return{..._2,[q]:$2}}),q==="default")y0(S,i,q_?Date.now():null)},[y0]),o=P((N)=>{if(!N||typeof N!=="object")return;let q=N.user_name??N.userName,A=N.user_avatar??N.userAvatar,x=N.user_avatar_background??N.userAvatarBackground;if(q===void 0&&A===void 0&&x===void 0)return;e_((m)=>{let S=typeof q==="string"&&q.trim()?q.trim():m.name||"You",i=A===void 0?m.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,q_=x===void 0?m.avatar_background:typeof x==="string"&&x.trim()?x.trim():null;if(m.name===S&&m.avatar_url===i&&m.avatar_background===q_)return m;return{name:S,avatar_url:i,avatar_background:q_}})},[]),G_=P((N)=>{if(!N||typeof N!=="object")return;let q=N.model??N.current;if(q!==void 0)A_(q);if(N.thinking_level!==void 0)D_(N.thinking_level??null);if(N.supports_thinking!==void 0)C_(Boolean(N.supports_thinking));if(N.provider_usage!==void 0)K0(N.provider_usage??null)},[]),c_=P(()=>{Z6().then((N)=>{if(N)G_(N)}).catch(()=>{})},[G_]);g(()=>{c_();let N=setInterval(()=>{c_()},60000);return()=>clearInterval(N)},[c_]);let q0=P((N,q)=>{let A=q?.turn_id;if(__(q),o(q),N==="ui_theme"){c3(q);return}if(N?.startsWith("agent_"))v_();if(N==="connected"){M(null),z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),B_.current=null,w_(),i4("web:default").then((S)=>{if(!S||S.status!=="active"||!S.data)return;let i=S.data,q_=i.turn_id||i.turnId;if(q_)k_(q_);if(z_({clearSilence:!0}),w0(i),S.thought&&S.thought.text)t.current=S.thought.text,T({text:S.thought.text,totalLines:S.thought.totalLines||0});if(S.draft&&S.draft.text)l.current=S.draft.text,z({text:S.draft.text,totalLines:S.draft.totalLines||0})}).catch((S)=>{console.warn("Failed to fetch agent status:",S)}),c_();return}if(N==="agent_status"){if(q.type==="done"||q.type==="error"){if(A&&c.current&&A!==c.current)return;if(q.type==="done"){l0(A||c.current);let{currentHashtag:S,searchQuery:i}=i_.current||{};if(!S&&!i)I0();if(q.context_usage)M_(q.context_usage)}if(_0.current=!1,w_(),z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null),q.type==="error")M({type:"error",title:q.title||"Agent error"}),setTimeout(()=>M(null),8000);else M(null)}else{if(A)k_(A);if(z_({running:!0,clearSilence:!0}),q.type==="thinking")l.current="",t.current="",z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0});M(q)}return}if(N==="agent_steer_queued"){if(A&&c.current&&A!==c.current)return;let S=A||c.current;if(!S)return;W_.current=S,j_(S);return}if(N==="agent_draft_delta"){if(A&&c.current&&A!==c.current)return;if(A&&!c.current)k_(A);if(z_({running:!0,clearSilence:!0}),q?.reset)l.current="";if(q?.delta)l.current+=q.delta;if(V_.current){let S=l.current;z((i)=>({text:i?.text||"",totalLines:o2(S),fullText:S}))}else{let S=l.current,i=o2(S);z({text:S,totalLines:i})}return}if(N==="agent_draft"){if(A&&c.current&&A!==c.current)return;if(A&&!c.current)k_(A);z_({running:!0,clearSilence:!0});let S=q.text||"",i=q.mode||(q.kind==="plan"?"replace":"append"),q_=Number.isFinite(q.total_lines)?q.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(i==="replace")f(S);else f((I_)=>(I_||"")+S);else if(!V_.current)l.current=S,z({text:S,totalLines:q_});return}if(N==="agent_thought_delta"){if(A&&c.current&&A!==c.current)return;if(A&&!c.current)k_(A);if(z_({running:!0,clearSilence:!0}),q?.reset)t.current="";if(typeof q?.delta==="string")t.current+=q.delta;if(K_.current){let S=t.current;T((i)=>({text:i?.text||"",totalLines:o2(S),fullText:S}))}return}if(N==="agent_thought"){if(A&&c.current&&A!==c.current)return;if(A&&!c.current)k_(A);z_({running:!0,clearSilence:!0});let S=q.text||"",i=Number.isFinite(q.total_lines)?q.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(!K_.current)t.current=S,T({text:S,totalLines:i});return}if(N==="agent_request"){if(console.log("Agent request:",q),A&&c.current&&A!==c.current)return;if(A)k_(A);z_({running:!0,clearSilence:!0}),r(q),B_.current=q;return}if(N==="agent_request_timeout"){if(console.log("Agent request timeout:",q),A&&c.current&&A!==c.current)return;r(null),B_.current=null,w_(),M({type:"error",title:"Permission request timed out"});return}if(N==="model_changed"){if(q?.model!==void 0)A_(q.model);if(q?.thinking_level!==void 0)D_(q.thinking_level??null);if(q?.supports_thinking!==void 0)C_(Boolean(q.supports_thinking));u1().then((S)=>{if(S)M_(S)}).catch(()=>{});return}if(N==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:x,searchQuery:m}=i_.current;if(N==="agent_response")d0(),$0.current={post:q,turnId:c.current};if(!x&&!m&&(N==="new_post"||N==="agent_response"))n_((S)=>{if(!S)return[q];if(S.some((i)=>i.id===q.id))return S;return[...S,q]}),V2.current?.();if(N==="interaction_updated")n_((S)=>S?S.map((i)=>i.id===q.id?q:i):S);if(N==="interaction_deleted"){let S=q?.ids||[];if(S.length){o0(()=>{n_((I_)=>I_?I_.filter((_2)=>!S.includes(_2.id)):I_)});let{currentHashtag:i,searchQuery:q_}=i_.current;if(N2.current&&!i&&!q_)F2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[w_,v_,z_,l0,o0,I0,d0,k_,w0,__,o,c_]);g(()=>{if(typeof window>"u")return;let N=window.__PICLAW_TEST_API||{};return N.emit=q0,N.reset=()=>{d0(),w_(),M(null),z({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),r(null)},N.finalize=()=>t0(),window.__PICLAW_TEST_API=N,()=>{if(window.__PICLAW_TEST_API===N)window.__PICLAW_TEST_API=void 0}},[w_,t0,q0,d0]),b4({handleSseEvent:q0,handleConnectionStatusChange:$1,loadPosts:P0}),g(()=>{if(!F0||F0.length===0)return;let N=location.hash;if(!N||!N.startsWith("#msg-"))return;let q=N.slice(5);Y_(q),history.replaceState(null,"",location.pathname+location.search)},[F0,Y_]);let g0=D!==null;g(()=>{if(_!=="connected")return;let q=setInterval(()=>{if(g0)c0(),q2();else{let{currentHashtag:A,searchQuery:x}=i_.current||{};if(!A&&!x)I0();c0(),q2()}},g0?15000:60000);return()=>clearInterval(q)},[_,g0,c0,q2,I0]);let o4=P(()=>{t_((N)=>!N)},[]);g(()=>{if(!f_)return;if(typeof window>"u")return;let N=b0.current;if(!N)return;if(!R0.current){let q=j2("editorWidth",null),A=i0.current||280;R0.current=Number.isFinite(q)?q:A}if(N.style.setProperty("--editor-width",`${R0.current}px`),!u_.current){let q=j2("dockHeight",null);u_.current=Number.isFinite(q)?q:200}N.style.setProperty("--dock-height",`${u_.current}px`)},[f_]);let e0=g_.getDockPanes().length>0,[Z1,n4]=v(!1),E2=P(()=>n4((N)=>!N),[]);g(()=>{if(!e0)return;let N=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),E2()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[E2,e0]);let r4=Boolean($_&&$_===(D?.turn_id||Z_));return B`
        <div class=${`app-shell${m_?"":" workspace-collapsed"}${f_?" editor-open":""}`} ref=${b0}>
            <${y4}
                onFileSelect=${m0}
                visible=${m_}
                active=${m_||f_}
                onOpenEditor=${p_}
            />
            <button
                class=${`workspace-toggle-tab${m_?" open":" closed"}`}
                onClick=${o4}
                title=${m_?"Hide workspace":"Show workspace"}
                aria-label=${m_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${s0} onTouchStart=${a2}></div>
            ${f_&&B`
                <div class="editor-pane-container">
                    <${w4}
                        tabs=${b}
                        activeId=${d}
                        onActivate=${a_}
                        onClose=${H0}
                        onCloseOthers=${D0}
                        onCloseAll=${C0}
                        onTogglePin=${Y0}
                        onTogglePreview=${h_}
                        previewTabs=${P_}
                        onToggleDock=${e0?E2:void 0}
                        dockVisible=${e0&&Z1}
                    />
                    <div class="editor-pane-host" ref=${j0}></div>
                    ${d&&P_.has(d)&&B`
                        <${M4}
                            getContent=${()=>X0.current?.getContent?.()}
                            path=${d}
                            onClose=${()=>h_(d)}
                        />
                    `}
                    ${e0&&Z1&&B`<div class="dock-splitter" onMouseDown=${a0} onTouchStart=${_1}></div>`}
                    ${e0&&B`<div class=${`dock-panel${Z1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${E2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${t2} onTouchStart=${e2}></div>
            `}
            <div class="container">
                ${j&&m4()&&B`<div class="search-results-spacer"></div>`}
                ${(J||j)&&B`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${K}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${j}`}</span>
                    </div>
                `}
                <${X4}
                    posts=${F0}
                    hasMore=${r2}
                    onLoadMore=${s2}
                    timelineRef=${U0}
                    onHashtagClick=${J1}
                    onMessageRef=${n}
                    onScrollToMessage=${Y_}
                    onFileRef=${L}
                    onPostClick=${void 0}
                    onDeletePost=${p}
                    emptyMessage=${J?`No posts with #${J}`:j?`No results for "${j}"`:void 0}
                    agents=${y_}
                    user=${S0}
                    reverse=${!(j&&!J)}
                    removingPostIds=${z0}
                    searchQuery=${j}
                />
                <${_4}
                    status=${D}
                    draft=${I}
                    plan=${w}
                    thought=${H}
                    pendingRequest=${s}
                    intent=${E}
                    turnId=${Z_}
                    steerQueued=${r4}
                    onPanelToggle=${W2}
                />
                <${S3}
                    onPost=${()=>{P0(),T0()}}
                    onFocus=${T0}
                    searchMode=${Q}
                    onSearch=${O}
                    onEnterSearch=${k}
                    onExitSearch=${C}
                    fileRefs=${W}
                    onRemoveFileRef=${N0}
                    onClearFileRefs=${G2}
                    messageRefs=${X}
                    onRemoveMessageRef=${H_}
                    onClearMessageRefs=${x_}
                    activeEditorPath=${d}
                    onAttachEditorFile=${u}
                    onOpenFilePill=${L}
                    activeModel=${U_}
                    modelUsage=${r_}
                    thinkingLevel=${F_}
                    supportsThinking=${R_}
                    contextUsage=${L_}
                    notificationsEnabled=${Z0}
                    notificationPermission=${O0}
                    onToggleNotifications=${G0}
                    onModelChange=${A_}
                    onModelStateChange=${G_}
                />
                <${J4} status=${_} />
                <${$4}
                    request=${s}
                    onRespond=${()=>{r(null),B_.current=null}}
                />
            </div>
        </div>
    `}G3(B`<${j6} />`,document.getElementById("app"));

//# debugId=3F765400FEA7CFDE64756E2164756E21
//# sourceMappingURL=app.bundle.js.map
