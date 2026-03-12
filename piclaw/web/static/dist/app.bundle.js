var i4=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var w2,K_,n1,N2,d1,T1,l4,k2={},r1=[],o4=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function g0(_,$){for(var J in $)_[J]=$[J];return _}function s1(_){var $=_.parentNode;$&&$.removeChild(_)}function a1(_,$,J){var Z,X,Y,j={};for(Y in $)Y=="key"?Z=$[Y]:Y=="ref"?X=$[Y]:j[Y]=$[Y];if(arguments.length>2&&(j.children=arguments.length>3?w2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)j[Y]===void 0&&(j[Y]=_.defaultProps[Y]);return D2(_,j,Z,X,null)}function D2(_,$,J,Z,X){var Y={type:_,props:$,key:J,ref:Z,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++n1:X};return K_.vnode!=null&&K_.vnode(Y),Y}function M2(_){return _.children}function C2(_,$){this.props=_,this.context=$}function $2(_,$){if($==null)return _.__?$2(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?$2(_):null}function t1(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return t1(_)}}function f1(_){(!_.__d&&(_.__d=!0)&&N2.push(_)&&!A2.__r++||T1!==K_.debounceRendering)&&((T1=K_.debounceRendering)||d1)(A2)}function A2(){for(var _;A2.__r=N2.length;)_=N2.sort(function($,J){return $.__v.__b-J.__v.__b}),N2=[],_.some(function($){var J,Z,X,Y,j,G;$.__d&&(j=(Y=(J=$).__v).__e,(G=J.__P)&&(Z=[],(X=g0({},Y)).__v=Y.__v+1,X1(G,Y,X,J.__n,G.ownerSVGElement!==void 0,Y.__h!=null?[j]:null,Z,j==null?$2(Y):j,Y.__h),J3(Z,Y),Y.__e!=j&&t1(Y)))})}function e1(_,$,J,Z,X,Y,j,G,V,W){var Q,F,D,L,E,M,b,H=Z&&Z.__k||r1,A=H.length;for(J.__k=[],Q=0;Q<$.length;Q++)if((L=J.__k[Q]=(L=$[Q])==null||typeof L=="boolean"?null:typeof L=="string"||typeof L=="number"||typeof L=="bigint"?D2(null,L,null,null,L):Array.isArray(L)?D2(M2,{children:L},null,null,null):L.__b>0?D2(L.type,L.props,L.key,null,L.__v):L)!=null){if(L.__=J,L.__b=J.__b+1,(D=H[Q])===null||D&&L.key==D.key&&L.type===D.type)H[Q]=void 0;else for(F=0;F<A;F++){if((D=H[F])&&L.key==D.key&&L.type===D.type){H[F]=void 0;break}D=null}X1(_,L,D=D||k2,X,Y,j,G,V,W),E=L.__e,(F=L.ref)&&D.ref!=F&&(b||(b=[]),D.ref&&b.push(D.ref,null,L),b.push(F,L.__c||E,L)),E!=null?(M==null&&(M=E),typeof L.type=="function"&&L.__k!=null&&L.__k===D.__k?L.__d=V=_3(L,V,_):V=$3(_,L,D,H,E,V),W||J.type!=="option"?typeof J.type=="function"&&(J.__d=V):_.value=""):V&&D.__e==V&&V.parentNode!=_&&(V=$2(D))}for(J.__e=M,Q=A;Q--;)H[Q]!=null&&(typeof J.type=="function"&&H[Q].__e!=null&&H[Q].__e==J.__d&&(J.__d=$2(Z,Q+1)),Y3(H[Q],H[Q]));if(b)for(Q=0;Q<b.length;Q++)Z3(b[Q],b[++Q],b[++Q])}function _3(_,$,J){var Z,X;for(Z=0;Z<_.__k.length;Z++)(X=_.__k[Z])&&(X.__=_,$=typeof X.type=="function"?_3(X,$,J):$3(J,X,X,_.__k,X.__e,$));return $}function $3(_,$,J,Z,X,Y){var j,G,V;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(J==null||X!=Y||X.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(X),j=null;else{for(G=Y,V=0;(G=G.nextSibling)&&V<Z.length;V+=2)if(G==X)break _;_.insertBefore(X,Y),j=Y}return j!==void 0?j:X.nextSibling}function v1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||o4.test($)?J:J+"px"}function E2(_,$,J,Z,X){var Y;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)J&&$ in J||v1(_.style,$,"");if(J)for($ in J)Z&&J[$]===Z[$]||v1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=J,J?Z||_.addEventListener($,Y?u1:R1,Y):_.removeEventListener($,Y?u1:R1,Y);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(j){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function R1(_){this.l[_.type+!1](K_.event?K_.event(_):_)}function u1(_){this.l[_.type+!0](K_.event?K_.event(_):_)}function X1(_,$,J,Z,X,Y,j,G,V){var W,Q,F,D,L,E,M,b,H,A,f,U=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(V=J.__h,G=$.__e=J.__e,$.__h=null,Y=[G]),(W=K_.__b)&&W($);try{_:if(typeof U=="function"){if(b=$.props,H=(W=U.contextType)&&Z[W.__c],A=W?H?H.props.value:W.__:Z,J.__c?M=(Q=$.__c=J.__c).__=Q.__E:(("prototype"in U)&&U.prototype.render?$.__c=Q=new U(b,A):($.__c=Q=new C2(b,A),Q.constructor=U,Q.render=d4),H&&H.sub(Q),Q.props=b,Q.state||(Q.state={}),Q.context=A,Q.__n=Z,F=Q.__d=!0,Q.__h=[]),Q.__s==null&&(Q.__s=Q.state),U.getDerivedStateFromProps!=null&&(Q.__s==Q.state&&(Q.__s=g0({},Q.__s)),g0(Q.__s,U.getDerivedStateFromProps(b,Q.__s))),D=Q.props,L=Q.state,F)U.getDerivedStateFromProps==null&&Q.componentWillMount!=null&&Q.componentWillMount(),Q.componentDidMount!=null&&Q.__h.push(Q.componentDidMount);else{if(U.getDerivedStateFromProps==null&&b!==D&&Q.componentWillReceiveProps!=null&&Q.componentWillReceiveProps(b,A),!Q.__e&&Q.shouldComponentUpdate!=null&&Q.shouldComponentUpdate(b,Q.__s,A)===!1||$.__v===J.__v){Q.props=b,Q.state=Q.__s,$.__v!==J.__v&&(Q.__d=!1),Q.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(T){T&&(T.__=$)}),Q.__h.length&&j.push(Q);break _}Q.componentWillUpdate!=null&&Q.componentWillUpdate(b,Q.__s,A),Q.componentDidUpdate!=null&&Q.__h.push(function(){Q.componentDidUpdate(D,L,E)})}Q.context=A,Q.props=b,Q.state=Q.__s,(W=K_.__r)&&W($),Q.__d=!1,Q.__v=$,Q.__P=_,W=Q.render(Q.props,Q.state,Q.context),Q.state=Q.__s,Q.getChildContext!=null&&(Z=g0(g0({},Z),Q.getChildContext())),F||Q.getSnapshotBeforeUpdate==null||(E=Q.getSnapshotBeforeUpdate(D,L)),f=W!=null&&W.type===M2&&W.key==null?W.props.children:W,e1(_,Array.isArray(f)?f:[f],$,J,Z,X,Y,j,G,V),Q.base=$.__e,$.__h=null,Q.__h.length&&j.push(Q),M&&(Q.__E=Q.__=null),Q.__e=!1}else Y==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=n4(J.__e,$,J,Z,X,Y,j,V);(W=K_.diffed)&&W($)}catch(T){$.__v=null,(V||Y!=null)&&($.__e=G,$.__h=!!V,Y[Y.indexOf(G)]=null),K_.__e(T,$,J)}}function J3(_,$){K_.__c&&K_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Z){Z.call(J)})}catch(Z){K_.__e(Z,J.__v)}})}function n4(_,$,J,Z,X,Y,j,G){var V,W,Q,F=J.props,D=$.props,L=$.type,E=0;if(L==="svg"&&(X=!0),Y!=null){for(;E<Y.length;E++)if((V=Y[E])&&(V===_||(L?V.localName==L:V.nodeType==3))){_=V,Y[E]=null;break}}if(_==null){if(L===null)return document.createTextNode(D);_=X?document.createElementNS("http://www.w3.org/2000/svg",L):document.createElement(L,D.is&&D),Y=null,G=!1}if(L===null)F===D||G&&_.data===D||(_.data=D);else{if(Y=Y&&w2.call(_.childNodes),W=(F=J.props||k2).dangerouslySetInnerHTML,Q=D.dangerouslySetInnerHTML,!G){if(Y!=null)for(F={},E=0;E<_.attributes.length;E++)F[_.attributes[E].name]=_.attributes[E].value;(Q||W)&&(Q&&(W&&Q.__html==W.__html||Q.__html===_.innerHTML)||(_.innerHTML=Q&&Q.__html||""))}if(function(M,b,H,A,f){var U;for(U in H)U==="children"||U==="key"||U in b||E2(M,U,null,H[U],A);for(U in b)f&&typeof b[U]!="function"||U==="children"||U==="key"||U==="value"||U==="checked"||H[U]===b[U]||E2(M,U,b[U],H[U],A)}(_,D,F,X,G),Q)$.__k=[];else if(E=$.props.children,e1(_,Array.isArray(E)?E:[E],$,J,Z,X&&L!=="foreignObject",Y,j,Y?Y[0]:J.__k&&$2(J,0),G),Y!=null)for(E=Y.length;E--;)Y[E]!=null&&s1(Y[E]);G||(("value"in D)&&(E=D.value)!==void 0&&(E!==_.value||L==="progress"&&!E)&&E2(_,"value",E,F.value,!1),("checked"in D)&&(E=D.checked)!==void 0&&E!==_.checked&&E2(_,"checked",E,F.checked,!1))}return _}function Z3(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Z){K_.__e(Z,J)}}function Y3(_,$,J){var Z,X;if(K_.unmount&&K_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!==_.__e||Z3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(Y){K_.__e(Y,$)}Z.base=Z.__P=null}if(Z=_.__k)for(X=0;X<Z.length;X++)Z[X]&&Y3(Z[X],$,typeof _.type!="function");J||_.__e==null||s1(_.__e),_.__e=_.__d=void 0}function d4(_,$,J){return this.constructor(_,J)}function X3(_,$,J){var Z,X,Y;K_.__&&K_.__(_,$),X=(Z=typeof J=="function")?null:J&&J.__k||$.__k,Y=[],X1($,_=(!Z&&J||$).__k=a1(M2,null,[_]),X||k2,k2,$.ownerSVGElement!==void 0,!Z&&J?[J]:X?null:$.firstChild?w2.call($.childNodes):null,Y,!Z&&J?J:X?X.__e:$.firstChild,Z),J3(Y,_)}w2=r1.slice,K_={__e:function(_,$){for(var J,Z,X;$=$.__;)if((J=$.__c)&&!J.__)try{if((Z=J.constructor)&&Z.getDerivedStateFromError!=null&&(J.setState(Z.getDerivedStateFromError(_)),X=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),X=J.__d),X)return J.__E=J}catch(Y){_=Y}throw _}},n1=0,C2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=g0({},this.state),typeof _=="function"&&(_=_(g0({},J),this.props)),_&&g0(J,_),_!=null&&this.__v&&($&&this.__h.push($),f1(this))},C2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),f1(this))},C2.prototype.render=M2,N2=[],d1=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,A2.__r=0,l4=0;var P2,U0,m1,q2=0,Z1=[],g1=K_.__b,c1=K_.__r,p1=K_.diffed,h1=K_.__c,i1=K_.unmount;function Q1(_,$){K_.__h&&K_.__h(U0,_,q2||$),q2=0;var J=U0.__H||(U0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function R(_){return q2=1,r4(j3,_)}function r4(_,$,J){var Z=Q1(P2++,2);return Z.t=_,Z.__c||(Z.__=[J?J($):j3(void 0,$),function(X){var Y=Z.t(Z.__[0],X);Z.__[0]!==Y&&(Z.__=[Y,Z.__[1]],Z.__c.setState({}))}],Z.__c=U0),Z.__}function c(_,$){var J=Q1(P2++,3);!K_.__s&&Q3(J.__H,$)&&(J.__=_,J.__H=$,U0.__H.__h.push(J))}function k(_){return q2=5,v0(function(){return{current:_}},[])}function v0(_,$){var J=Q1(P2++,7);return Q3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function I(_,$){return q2=8,v0(function(){return _},$)}function s4(){Z1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(y2),_.__H.__h.forEach(Y1),_.__H.__h=[]}catch($){_.__H.__h=[],K_.__e($,_.__v)}}),Z1=[]}K_.__b=function(_){U0=null,g1&&g1(_)},K_.__r=function(_){c1&&c1(_),P2=0;var $=(U0=_.__c).__H;$&&($.__h.forEach(y2),$.__h.forEach(Y1),$.__h=[])},K_.diffed=function(_){p1&&p1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(Z1.push($)!==1&&m1===K_.requestAnimationFrame||((m1=K_.requestAnimationFrame)||function(J){var Z,X=function(){clearTimeout(Y),l1&&cancelAnimationFrame(Z),setTimeout(J)},Y=setTimeout(X,100);l1&&(Z=requestAnimationFrame(X))})(s4)),U0=void 0},K_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(y2),J.__h=J.__h.filter(function(Z){return!Z.__||Y1(Z)})}catch(Z){$.some(function(X){X.__h&&(X.__h=[])}),$=[],K_.__e(Z,J.__v)}}),h1&&h1(_,$)},K_.unmount=function(_){i1&&i1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(y2)}catch(J){K_.__e(J,$.__v)}};var l1=typeof requestAnimationFrame=="function";function y2(_){var $=U0;typeof _.__c=="function"&&_.__c(),U0=$}function Y1(_){var $=U0;_.__c=_.__(),U0=$}function Q3(_,$){return!_||_.length!==$.length||$.some(function(J,Z){return J!==_[Z]})}function j3(_,$){return typeof $=="function"?$(_):$}var K3=function(_,$,J,Z){var X;$[0]=0;for(var Y=1;Y<$.length;Y++){var j=$[Y++],G=$[Y]?($[0]|=j?1:2,J[$[Y++]]):$[++Y];j===3?Z[0]=G:j===4?Z[1]=Object.assign(Z[1]||{},G):j===5?(Z[1]=Z[1]||{})[$[++Y]]=G:j===6?Z[1][$[++Y]]+=G+"":j?(X=_.apply(G,K3(_,G,J,["",null])),Z.push(X),G[0]?$[0]|=2:($[Y-2]=0,$[Y]=X)):Z.push(G)}return Z},o1=new Map,q=function(_){var $=o1.get(this);return $||($=new Map,o1.set(this,$)),($=K3(this,$.get(_)||($.set(_,$=function(J){for(var Z,X,Y=1,j="",G="",V=[0],W=function(D){Y===1&&(D||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?V.push(0,D,j):Y===3&&(D||j)?(V.push(3,D,j),Y=2):Y===2&&j==="..."&&D?V.push(4,D,0):Y===2&&j&&!D?V.push(5,0,!0,j):Y>=5&&((j||!D&&Y===5)&&(V.push(Y,0,j,X),Y=6),D&&(V.push(Y,D,0,X),Y=6)),j=""},Q=0;Q<J.length;Q++){Q&&(Y===1&&W(),W(Q));for(var F=0;F<J[Q].length;F++)Z=J[Q][F],Y===1?Z==="<"?(W(),V=[V],Y=3):j+=Z:Y===4?j==="--"&&Z===">"?(Y=1,j=""):j=Z+j[0]:G?Z===G?G="":j+=Z:Z==='"'||Z==="'"?G=Z:Z===">"?(W(),Y=1):Y&&(Z==="="?(Y=5,X=j,j=""):Z==="/"&&(Y<5||J[Q][F+1]===">")?(W(),Y===3&&(V=V[0]),Y=V,(V=V[0]).push(2,0,Y),Y=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(W(),Y=2):j+=Z),Y===3&&j==="!--"&&(Y=4,V=V[0])}return W(),V}(_)),$),arguments,[])).length>1?$:$[0]}.bind(a1);async function d_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Z=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function I2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return d_(J)}async function G3(_,$=50,J=0){return d_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function V3(_,$=50,J=0){return d_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function W3(_){return d_(`/thread/${_}`)}async function O3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return d_(J,{method:"DELETE"})}async function j1(_,$,J=null,Z=[]){return d_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Z})})}async function N3(){return d_("/agents")}async function q3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/status${$}`)}async function K1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/context${$}`)}async function l0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/models${$}`)}async function B3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Z=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function G1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function z3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function H3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return d_(J)}async function U3(_,$,J){return d_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function J2(_){return`/media/${_}`}function F3(_){return`/media/${_}/thumbnail`}async function b2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function S2(_="",$=2,J=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return d_(Z)}async function L3(_,$=20000,J=null){let Z=J?`&mode=${encodeURIComponent(J)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return d_(X)}async function E3(_){return d_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function V1(_,$="",J={}){let Z=new FormData;Z.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(J.overwrite)X.set("overwrite","1");let Y=X.toString(),j=Y?`/workspace/upload?${Y}`:"/workspace/upload",G=await fetch(""+j,{method:"POST",body:Z});if(!G.ok){let V=await G.json().catch(()=>({error:"Upload failed"})),W=Error(V.error||`HTTP ${G.status}`);throw W.status=G.status,W.code=V.code,W}return G.json()}async function D3(_,$,J=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Z.ok){let X=await Z.json().catch(()=>({error:"Create failed"})),Y=Error(X.error||`HTTP ${Z.status}`);throw Y.status=Z.status,Y.code=X.code,Y}return Z.json()}async function C3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Rename failed"})),X=Error(Z.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Z.code,X}return J.json()}async function y3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Move failed"})),X=Error(Z.error||`HTTP ${J.status}`);throw X.status=J.status,X.code=Z.code,X}return J.json()}async function k3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return d_($,{method:"DELETE"})}async function x2(_,$=!1){return d_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function W1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function A3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class O1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-J,0),X=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function o0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function T_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function Z2(_,$=!1){let J=o0(_);if(J===null)return $;return J==="true"}function Y2(_,$=null){let J=o0(_);if(J===null)return $;let Z=parseInt(J,10);return Number.isFinite(Z)?Z:$}function c0({prefix:_="file",label:$,title:J,onRemove:Z,onClick:X,removeTitle:Y="Remove",icon:j="file"}){let G=`${_}-file-pill`,V=`${_}-file-name`,W=`${_}-file-remove`,Q=j==="message"?q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return q`
    <span class=${G} title=${J||$} onClick=${X}>
      ${Q}
      <span class=${V}>${$}</span>
      ${Z&&q`
        <button
          class=${W}
          onClick=${(F)=>{F.preventDefault(),F.stopPropagation(),Z()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var t4=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function e4({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Z=_.contextWindow,X=J!=null?`Context: ${w3(J)} / ${w3(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,j=2*Math.PI*7,G=$/100*j,V=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return q`
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
    `}function w3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function M3({onPost:_,onFocus:$,searchMode:J,onSearch:Z,onEnterSearch:X,onExitSearch:Y,fileRefs:j=[],onRemoveFileRef:G,onClearFileRefs:V,messageRefs:W=[],onRemoveMessageRef:Q,onClearMessageRefs:F,activeModel:D=null,modelUsage:L=null,thinkingLevel:E=null,supportsThinking:M=!1,contextUsage:b=null,notificationsEnabled:H=!1,notificationPermission:A="default",onToggleNotifications:f,onModelChange:U,onModelStateChange:T,activeEditorPath:s=null,onAttachEditorFile:d,onOpenFilePill:Z_}){let[Q_,e]=R(""),[Y_,a]=R(""),[h,__]=R(!1),[o,t]=R([]),[z_,q_]=R(!1),[g,V_]=R([]),[G_,W_]=R(0),[y_,O_]=R(!1),[H_,w_]=R(!1),[F_,D_]=R(!1),[u_,C_]=R([]),[p_,X0]=R(!1),U_=k(null),M_=k(null),_0=k(null),O0=k(null),Q0=k(0),N0=200,q0=(z)=>{let v=new Set,l=[];for(let X_ of z||[]){if(typeof X_!=="string")continue;let L_=X_.trim();if(!L_||v.has(L_))continue;v.add(L_),l.push(L_)}return l},I_=()=>{let z=o0("piclaw_compose_history");if(!z)return[];try{let v=JSON.parse(z);if(!Array.isArray(v))return[];return q0(v)}catch{return[]}},m_=(z)=>{T_("piclaw_compose_history",JSON.stringify(z))},a_=k(I_()),h_=k(-1),f_=k(""),P=!h&&(Q_.trim()||o.length>0||j.length>0||W.length>0),r=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),b_=typeof window<"u"&&typeof Notification<"u",c_=typeof window<"u"?Boolean(window.isSecureContext):!1,F0=b_&&c_&&A!=="denied",C0=A==="granted"&&H,j0=C0?"Disable notifications":"Enable notifications",i_=D||"",y0=M&&E?` (${E})`:"",B0=y0.trim()?`${E}`:"",I0=typeof L?.hint_short==="string"?L.hint_short.trim():"",$0=[B0||null,I0||null].filter(Boolean).join(" • "),s_=[i_?`Current model: ${i_}${y0}`:null,L?.plan?`Plan: ${L.plan}`:null,I0||null,L?.primary?.reset_description||null,L?.secondary?.reset_description||null].filter(Boolean),k0=H_?"Switching model…":s_.join(" • ")||`Current model: ${i_}${y0} (tap to open model picker)`,l_=(z)=>{if(!z||typeof z!=="object")return;let v=z.model??z.current;if(typeof T==="function")T({model:v??null,thinking_level:z.thinking_level??null,supports_thinking:z.supports_thinking,provider_usage:z.provider_usage??null});if(v&&typeof U==="function")U(v)},K0=(z)=>{let v=z||U_.current;if(!v)return;v.style.height="auto",v.style.height=`${v.scrollHeight}px`,v.style.overflowY="hidden"},J0=(z)=>{if(!z.startsWith("/")||z.includes(`
`)){O_(!1),V_([]);return}let v=z.toLowerCase().split(" ")[0];if(v.length<1){O_(!1),V_([]);return}let l=t4.filter((X_)=>X_.name.startsWith(v)||X_.name.replace(/-/g,"").startsWith(v.replace(/-/g,"")));if(l.length>0&&!(l.length===1&&l[0].name===v))V_(l),W_(0),O_(!0);else O_(!1),V_([])},b0=(z)=>{let v=Q_,l=v.indexOf(" "),X_=l>=0?v.slice(l):"",L_=z.name+X_;e(L_),O_(!1),V_([]),requestAnimationFrame(()=>{let k_=U_.current;if(!k_)return;let B_=L_.length;k_.selectionStart=B_,k_.selectionEnd=B_,k_.focus()})},S0=(z)=>{if(J)a(z);else e(z),J0(z);requestAnimationFrame(()=>K0())},z0=(z)=>{let v=J?Y_:Q_,l=v&&!v.endsWith(`
`)?`
`:"",X_=`${v}${l}${z}`.trimStart();S0(X_)},L0=(z)=>{let v=z?.command?.model_label;if(v)return v;let l=z?.command?.message;if(typeof l==="string"){let X_=l.match(/•\s+([^\n]+?)\s+\(current\)/);if(X_?.[1])return X_[1].trim()}return null},x_=async(z)=>{if(J||h||H_)return;w_(!0);try{let v=await j1("default",z,null,[]),l=L0(v);l_({model:l??D??null,thinking_level:v?.command?.thinking_level,supports_thinking:v?.command?.supports_thinking});try{let X_=await l0();if(X_)l_(X_)}catch{}return _?.(),!0}catch(v){return console.error("Failed to switch model:",v),alert("Failed to switch model: "+v.message),!1}finally{w_(!1)}},H0=async()=>{await x_("/cycle-model")},G0=async(z)=>{if(!z||H_)return;if(await x_(`/model ${z}`))D_(!1)},v_=(z)=>{z.preventDefault(),z.stopPropagation(),D_((v)=>!v)},R_=async(z)=>{let v=typeof z==="string"?z:z&&typeof z?.target?.value==="string"?z.target.value:Q_,l=typeof v==="string"?v:"";if(!l.trim()&&o.length===0&&j.length===0&&W.length===0)return;__(!0);try{let X_=[];for(let A_ of o){let P_=await B3(A_);X_.push(P_.id)}let L_=l.trim(),k_=j.length?`Files:
${j.map((A_)=>`- ${A_}`).join(`
`)}`:"",B_=W.length?`Referenced messages:
${W.map((A_)=>`- message:${A_}`).join(`
`)}`:"",g_=X_.length?`Images:
${X_.map((A_,P_)=>{let K2=o[P_]?.name||`image-${P_+1}`;return`- attachment:${A_} (${K2})`}).join(`
`)}`:"",V0=[L_,k_,B_,g_].filter(Boolean).join(`

`),T0=await j1("default",V0,null,X_);if(T0?.command){l_({model:T0.command.model_label??D??null,thinking_level:T0.command.thinking_level,supports_thinking:T0.command.supports_thinking});try{let A_=await l0();if(A_)l_(A_)}catch{}}if(L_){let A_=a_.current,P_=q0(A_.filter((D0)=>D0!==L_));if(P_.push(L_),P_.length>200)P_.splice(0,P_.length-200);a_.current=P_,m_(P_),h_.current=-1,f_.current=""}e(""),t([]),V?.(),F?.(),_?.()}catch(X_){console.error("Failed to post:",X_),alert("Failed to post: "+X_.message)}finally{__(!1)}},o_=(z)=>{if(z.isComposing)return;if(J&&z.key==="Escape"){z.preventDefault(),a(""),Y?.();return}if(y_&&g.length>0){let v=U_.current?.value??(J?Y_:Q_);if(!String(v||"").startsWith("/"))O_(!1),V_([]);else{if(z.key==="ArrowDown"){z.preventDefault(),W_((l)=>(l+1)%g.length);return}if(z.key==="ArrowUp"){z.preventDefault(),W_((l)=>(l-1+g.length)%g.length);return}if(z.key==="Tab"){z.preventDefault(),b0(g[G_]);return}if(z.key==="Enter"&&!z.shiftKey){if(!(U_.current?.value??(J?Y_:Q_)).includes(" ")){z.preventDefault();let L_=g[G_];O_(!1),V_([]),R_(L_.name);return}}if(z.key==="Escape"){z.preventDefault(),O_(!1),V_([]);return}}}if(!J&&(z.key==="ArrowUp"||z.key==="ArrowDown")&&!z.metaKey&&!z.ctrlKey&&!z.altKey&&!z.shiftKey){let v=U_.current;if(!v)return;let l=v.value||"",X_=v.selectionStart===0&&v.selectionEnd===0,L_=v.selectionStart===l.length&&v.selectionEnd===l.length;if(z.key==="ArrowUp"&&X_||z.key==="ArrowDown"&&L_){let k_=a_.current;if(!k_.length)return;z.preventDefault();let B_=h_.current;if(z.key==="ArrowUp"){if(B_===-1)f_.current=l,B_=k_.length-1;else if(B_>0)B_-=1;h_.current=B_,S0(k_[B_]||"")}else{if(B_===-1)return;if(B_<k_.length-1)B_+=1,h_.current=B_,S0(k_[B_]||"");else h_.current=-1,S0(f_.current||""),f_.current=""}requestAnimationFrame(()=>{let g_=U_.current;if(!g_)return;let V0=g_.value.length;g_.selectionStart=V0,g_.selectionEnd=V0});return}}if(z.key==="Enter"&&!z.shiftKey){z.preventDefault();let v=U_.current?.value??(J?Y_:Q_);if(J){if(v.trim())Z?.(v.trim())}else R_(v)}},Z0=(z)=>{let v=Array.from(z||[]).filter((l)=>l&&l.type&&l.type.startsWith("image/"));if(!v.length)return;t((l)=>[...l,...v])},A0=(z)=>{Z0(z.target.files),z.target.value=""},E0=(z)=>{if(J)return;z.preventDefault(),z.stopPropagation(),Q0.current+=1,q_(!0)},x0=(z)=>{if(J)return;if(z.preventDefault(),z.stopPropagation(),Q0.current=Math.max(0,Q0.current-1),Q0.current===0)q_(!1)},t_=(z)=>{if(J)return;if(z.preventDefault(),z.stopPropagation(),z.dataTransfer)z.dataTransfer.dropEffect="copy";q_(!0)},u0=(z)=>{if(J)return;z.preventDefault(),z.stopPropagation(),Q0.current=0,q_(!1),Z0(z.dataTransfer?.files||[])},p0=(z)=>{if(J)return;let v=z.clipboardData?.items;if(!v||!v.length)return;let l=[];for(let X_ of v){if(X_.kind!=="file")continue;let L_=X_.getAsFile?.();if(L_)l.push(L_)}if(l.length>0)z.preventDefault(),Z0(l)},h0=(z)=>{t((v)=>v.filter((l,X_)=>X_!==z))},n0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((z)=>{let{latitude:v,longitude:l,accuracy:X_}=z.coords,L_=`${v.toFixed(5)}, ${l.toFixed(5)}`,k_=Number.isFinite(X_)?` ±${Math.round(X_)}m`:"",B_=`https://maps.google.com/?q=${v},${l}`,g_=`Location: ${L_}${k_} ${B_}`;z0(g_)},(z)=>{let v=z?.message||"Unable to retrieve location.";alert(`Location error: ${v}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};c(()=>{if(!F_)return;X0(!0),l0().then((z)=>{let v=Array.isArray(z?.models)?z.models.filter((l)=>typeof l==="string"&&l.trim().length>0):[];C_(v),l_(z)}).catch((z)=>{console.warn("Failed to load model list:",z),C_([])}).finally(()=>{X0(!1)})},[F_,D]),c(()=>{if(J)D_(!1)},[J]),c(()=>{if(!F_)return;let z=(v)=>{let l=_0.current,X_=O0.current,L_=v.target;if(l&&l.contains(L_))return;if(X_&&X_.contains(L_))return;D_(!1)};return document.addEventListener("pointerdown",z),()=>document.removeEventListener("pointerdown",z)},[F_]);let w0=(z)=>{let v=z.target.value;K0(z.target),S0(v)};return c(()=>{requestAnimationFrame(()=>K0())},[Q_,Y_,J]),q`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${z_?" drag-active":""}`}
                onDragEnter=${E0}
                onDragOver=${t_}
                onDragLeave=${x0}
                onDrop=${u0}
            >
                <div class="compose-input-main">
                    ${(j.length>0||o.length>0||W.length>0)&&q`
                        <div class="compose-file-refs">
                            ${W.map((z)=>{return q`
                                    <${c0}
                                        key=${"msg-"+z}
                                        prefix="compose"
                                        label=${"msg:"+z}
                                        title=${"Message reference: "+z}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>Q?.(z)}
                                    />
                                `})}
                            ${j.map((z)=>{let v=z.split("/").pop()||z;return q`
                                    <${c0}
                                        prefix="compose"
                                        label=${v}
                                        title=${z}
                                        onClick=${()=>Z_?.(z)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>G?.(z)}
                                    />
                                `})}
                            ${o.map((z,v)=>{let l=z?.name||`image-${v+1}`;return q`
                                    <${c0}
                                        key=${l+v}
                                        prefix="compose"
                                        label=${l}
                                        title=${l}
                                        removeTitle="Remove image"
                                        onRemove=${()=>h0(v)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${U_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?Y_:Q_}
                        onInput=${w0}
                        onKeyDown=${o_}
                        onPaste=${p0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${h}
                        rows="1"
                    />
                    ${y_&&g.length>0&&q`
                        <div class="slash-autocomplete" ref=${M_}>
                            ${g.map((z,v)=>q`
                                <div
                                    key=${z.name}
                                    class=${`slash-item${v===G_?" active":""}`}
                                    onMouseDown=${(l)=>{l.preventDefault(),b0(z)}}
                                    onMouseEnter=${()=>W_(v)}
                                >
                                    <span class="slash-name">${z.name}</span>
                                    <span class="slash-desc">${z.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${F_&&!J&&q`
                        <div class="compose-model-popup" ref=${_0}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${p_&&q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!p_&&u_.length===0&&q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!p_&&u_.map((z)=>q`
                                    <button
                                        key=${z}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${D===z?" active":""}`}
                                        onClick=${()=>{G0(z)}}
                                        disabled=${H_}
                                    >
                                        ${z}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{H0()}}
                                    disabled=${H_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&D&&q`
                        <div class="compose-meta-row">
                            <div class="compose-model-meta">
                                <button
                                    ref=${O0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${k0}
                                    aria-label="Open model picker"
                                    onClick=${v_}
                                    disabled=${h||H_}
                                >
                                    ${H_?"Switching…":i_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!H_&&$0&&q`
                                        <span class="compose-model-usage-hint" title=${k0}>
                                            ${$0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&b&&b.percent!=null&&q`
                        <${e4} usage=${b} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${J?Y:X}
                        title=${J?"Close search":"Search"}
                    >
                        ${J?q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${r&&!J&&q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${n0}
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
                    ${F0&&!J&&q`
                        <button
                            class=${`icon-btn notification-btn${C0?" active":""}`}
                            onClick=${f}
                            title=${j0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&q`
                        ${s&&d&&q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${d}
                                title=${`Attach open file: ${s}`}
                                type="button"
                                disabled=${h||j.includes(s)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${A0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{R_()}}
                            disabled=${!P}
                            title="Send (Ctrl+Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var I3="piclaw_theme",B1="piclaw_tint",v2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},_8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},P3={default:{label:"Default",mode:"auto",light:v2,dark:_8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},$8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],R2={theme:"default",tint:null},b3="light",N1=!1;function S3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function X2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Z=J.length===3?J.split("").map((Y)=>Y+Y).join(""):J,X=parseInt(Z,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${Z.toLowerCase()}`}}function J8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Z=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Z=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let X=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Y=parseInt(X[1],10),j=parseInt(X[2],10),G=parseInt(X[3],10);if(![Y,j,G].every((W)=>Number.isFinite(W)))return null;let V=`#${[Y,j,G].map((W)=>W.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:j,b:G,hex:V}}function x3(_){return X2(_)||J8(_)}function B2(_,$,J){let Z=Math.round(_.r+($.r-_.r)*J),X=Math.round(_.g+($.g-_.g)*J),Y=Math.round(_.b+($.b-_.b)*J);return`rgb(${Z} ${X} ${Y})`}function q1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function T3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function z1(_){return P3[_]||P3.default}function Z8(_){return _.mode==="auto"?T3():_.mode}function Y8(_,$){let J=z1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||v2}function X8(_,$,J){let Z=x3($);if(!Z)return _;let X=X2(_.bgPrimary),Y=X2(_.bgSecondary),j=X2(_.bgHover),G=X2(_.borderColor);if(!X||!Y||!j||!G)return _;let W=X2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:B2(X,Z,0.08),bgSecondary:B2(Y,Z,0.12),bgHover:B2(j,Z,0.16),borderColor:B2(G,Z,0.08),accent:Z.hex,accentHover:W?B2(Z,W,0.18):Z.hex}}function Q8(_,$){if(typeof document>"u")return;let J=document.documentElement,Z=_.accent,X=x3(Z),Y=X?q1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?q1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",G=X?q1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",V={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":j,"--accent-soft-strong":G,"--danger-color":_.danger||v2.danger,"--success-color":_.success||v2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(V).forEach(([W,Q])=>{if(Q)J.style.setProperty(W,Q)})}function j8(){if(typeof document>"u")return;let _=document.documentElement;$8.forEach(($)=>_.style.removeProperty($))}function T2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function K8(_,$){if(typeof document>"u")return;let J=T2("theme-color");if(J&&_)J.setAttribute("content",_);let Z=T2("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let X=T2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Y=T2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function G8(){if(typeof window>"u")return;let _={...R2,mode:b3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function H1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=S3(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,X=z1(J),Y=Z8(X),j=Y8(J,Y);R2={theme:J,tint:Z},b3=Y;let G=document.documentElement;G.dataset.theme=Y,G.dataset.colorTheme=J,G.dataset.tint=Z?String(Z):"",G.style.colorScheme=Y;let V=j;if(J==="default"&&Z)V=X8(j,Z,Y);if(J==="default"&&!Z)j8();else Q8(V,Y);if(K8(V.bgPrimary,Y),G8(),$.persist!==!1)if(T_(I3,J),Z)T_(B1,Z);else T_(B1,"")}function f2(){if(z1(R2.theme).mode!=="auto")return;H1(R2,{persist:!1})}function f3(){if(typeof window>"u")return()=>{};let _=S3(o0(I3)||"default"),$=o0(B1),J=$?$.trim():null;if(H1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!N1){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",f2);else if(Z.addListener)Z.addListener(f2);return N1=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",f2);else if(Z.removeListener)Z.removeListener(f2);N1=!1}}return()=>{}}function v3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Z=_.tint??null;H1({theme:J||"default",tint:Z},{persist:!0})}function R3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return T3()}var u2=/#(\w+)/g,V8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),W8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),O8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),N8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},q8=new Set(["http:","https:","mailto:",""]);function u3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function Q2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Z=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!q8.has(Z.protocol))return null;return Z.href}catch{return null}}function m3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Z=[],X=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=X.nextNode())Z.push(Y);for(let j of Z){let G=j.tagName.toLowerCase();if(!W8.has(G)){let W=j.parentNode;if(!W)continue;while(j.firstChild)W.insertBefore(j.firstChild,j);W.removeChild(j);continue}let V=N8[G]||new Set;for(let W of Array.from(j.attributes)){let Q=W.name.toLowerCase(),F=W.value;if(Q.startsWith("on")){j.removeAttribute(W.name);continue}if(Q.startsWith("data-")||Q.startsWith("aria-"))continue;if(V.has(Q)||O8.has(Q)){if(Q==="href"){let D=Q2(F);if(!D)j.removeAttribute(W.name);else if(j.setAttribute(W.name,D),G==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(Q==="src"){let D=G==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(F):F,L=Q2(D,{allowDataImage:G==="img"});if(!L)j.removeAttribute(W.name);else j.setAttribute(W.name,L)}continue}j.removeAttribute(W.name)}}return J.body.innerHTML}function g3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function m2(_,$=2){if(!_)return _;let J=_;for(let Z=0;Z<$;Z+=1){let X=g3(J);if(X===J)break;J=X}return J}function B8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],X=[],Y=!1,j=[];for(let G of J){if(!Y&&G.trim().match(/^```mermaid\s*$/i)){Y=!0,j=[];continue}if(Y&&G.trim().match(/^```\s*$/)){let V=Z.length;Z.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${V}@@`),Y=!1,j=[];continue}if(Y)j.push(G);else X.push(G)}if(Y)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:Z}}function z8(_){if(!_)return _;return m2(_,5)}function H8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Z of $)J+=String.fromCharCode(Z);return btoa(J)}function U8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)J[Z]=$.charCodeAt(Z);return new TextDecoder().decode(J)}function F8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Z)=>{let X=Number(Z),Y=$[X]??"",j=z8(Y);return`<div class="mermaid-container" data-mermaid="${H8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function c3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function p3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Z=J.trim(),X=Z.startsWith("/"),Y=X?Z.slice(1).trim():Z,V=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!V||!V8.has(V))return $;if(V==="br")return X?"":"<br>";if(X)return`</${V}>`;return`<${V}>`})}function h3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Z)=>`<code>${$(Z)}</code>`)}function i3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=J.nextNode()){if(!X.nodeValue)continue;let Y=Z(X.nodeValue);if(Y!==X.nodeValue)X.nodeValue=Y}return $.body.innerHTML}function L8(_){if(!window.katex)return _;let $=(j)=>g3(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(j)=>{let G=[],V=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_BLOCK_${Q}@@`});return V=V.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(W)=>{let Q=G.length;return G.push(W),`@@CODE_INLINE_${Q}@@`}),{html:V,blocks:G}},Z=(j,G)=>{if(!G.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(V,W)=>{let Q=Number(W);return G[Q]??""})},X=J(_),Y=X.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,G,V)=>{try{let W=katex.renderToString($(V.trim()),{displayMode:!0,throwOnError:!1});return`${G}${W}`}catch(W){return`<span class="math-error" title="${u3(W.message)}">${j}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,G,V)=>{if(/\s$/.test(V))return j;try{let W=katex.renderToString($(V),{displayMode:!1,throwOnError:!1});return`${G}${W}`}catch(W){return`${G}<span class="math-error" title="${u3(W.message)}">$${V}$</span>`}}),Z(Y,X.blocks)}function E8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],X;while(X=J.nextNode())Z.push(X);for(let Y of Z){let j=Y.nodeValue;if(!j)continue;if(u2.lastIndex=0,!u2.test(j))continue;u2.lastIndex=0;let G=Y.parentElement;if(G&&(G.closest("a")||G.closest("code")||G.closest("pre")))continue;let V=j.split(u2);if(V.length<=1)continue;let W=$.createDocumentFragment();V.forEach((Q,F)=>{if(F%2===1){let D=$.createElement("a");D.setAttribute("href","#"),D.className="hashtag",D.setAttribute("data-hashtag",Q),D.textContent=`#${Q}`,W.appendChild(D)}else W.appendChild($.createTextNode(Q))}),Y.parentNode?.replaceChild(W,Y)}return $.body.innerHTML}function D8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],X=!1;for(let Y of J){if(!X&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,Z.push("$$");continue}if(X&&Y.trim().match(/^```\s*$/)){X=!1,Z.push("$$");continue}Z.push(Y)}return Z.join(`
`)}function j2(_,$,J={}){if(!_)return"";let Z=D8(_),{text:X,blocks:Y}=B8(Z),j=m2(X,2),V=c3(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=p3(V),Q=window.marked?marked.parse(W,{headerIds:!1,mangle:!1}):W.replace(/\n/g,"<br>");return Q=h3(Q),Q=i3(Q),Q=L8(Q),Q=E8(Q),Q=F8(Q,Y),Q=m3(Q,J),Q}function l3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=m2($,2),X=c3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=p3(X),j=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return j=h3(j),j=i3(j),j=m3(j),j}async function g2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,X=R3()==="dark"?J["tokyo-night"]:J["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Y)try{let G=j.dataset.mermaid,V=U8(G||""),W=m2(V,2),Q=await $(W,{...X,transparent:!0});j.innerHTML=Q,j.removeAttribute("data-mermaid")}catch(G){console.error("Mermaid render error:",G);let V=document.createElement("pre");V.className="mermaid-error",V.textContent=`Diagram error: ${G.message}`,j.innerHTML="",j.appendChild(V),j.removeAttribute("data-mermaid")}}var o3="PiClaw";function U1(_,$){let J=_||"PiClaw",Z=J.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=Z.charCodeAt(0)%X.length,j=X[Y],G=J.trim().toLowerCase(),V=typeof $==="string"?$.trim():"",Q=(V?V:null)||(G==="PiClaw".toLowerCase()||G==="pi"?"/static/icon-192.png":null);return{letter:Z,color:j,image:Q}}function n3(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function d3(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function r3(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,j=Y?.dataset?.colorTheme||"",G=Y?.dataset?.tint||"",V=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(V&&(G||j&&j!=="default"))return V}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Z=0;for(let Y=0;Y<J.length;Y+=1)Z=(Z*31+J.charCodeAt(Y))%2147483647;let X=Math.abs(Z)%$.length;return $[X]}function s3({status:_,draft:$,plan:J,thought:Z,pendingRequest:X,intent:Y,turnId:j,steerQueued:G,onPanelToggle:V}){let F=(g)=>{if(!g)return{text:"",totalLines:0,fullText:""};if(typeof g==="string"){let y_=g,O_=y_?y_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:y_,totalLines:O_,fullText:y_}}let V_=g.text||"",G_=g.fullText||g.full_text||V_,W_=Number.isFinite(g.totalLines)?g.totalLines:G_?G_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:V_,totalLines:W_,fullText:G_}},D=160,L=(g)=>{if(!g)return 1;return Math.max(1,Math.ceil(g.length/160))},E=(g,V_,G_)=>{let W_=(g||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!W_)return{text:"",omitted:0,totalLines:Number.isFinite(G_)?G_:0,visibleLines:0};let y_=W_.split(`
`),O_=y_.length>V_?y_.slice(0,V_).join(`
`):W_,H_=Number.isFinite(G_)?G_:y_.reduce((D_,u_)=>D_+L(u_),0),w_=O_?O_.split(`
`).reduce((D_,u_)=>D_+L(u_),0):0,F_=Math.max(H_-w_,0);return{text:O_,omitted:F_,totalLines:H_,visibleLines:w_}},M=F(J),b=F(Z),H=F($),A=Boolean(M.text)||M.totalLines>0,f=Boolean(b.text)||b.totalLines>0,U=Boolean(H.fullText?.trim()||H.text?.trim());if(!_&&!U&&!A&&!f&&!X&&!Y)return null;let[T,s]=R(new Set),d=(g)=>s((V_)=>{let G_=new Set(V_),W_=!G_.has(g);if(W_)G_.add(g);else G_.delete(g);if(typeof V==="function")V(g,W_);return G_});c(()=>{s(new Set)},[j]);let Z_=_?.turn_id||j,Q_=r3(Z_),e=G?"turn-dot turn-dot-queued":"turn-dot",Y_=(g)=>g,a=Boolean(_?.last_activity||_?.lastActivity),h="",__=_?.title,o=_?.status;if(_?.type==="plan")h=__?`Planning: ${__}`:"Planning...";else if(_?.type==="tool_call")h=__?`Running: ${__}`:"Running tool...";else if(_?.type==="tool_status")h=__?`${__}: ${o||"Working..."}`:o||"Working...";else if(_?.type==="error")h=__||"Agent error";else h=__||o||"Working...";if(a)h="Last activity just now";let t=({panelTitle:g,text:V_,fullText:G_,totalLines:W_,maxLines:y_,titleClass:O_,panelKey:H_})=>{let w_=T.has(H_),F_=G_||V_||"",D_=typeof y_==="number",u_=w_&&D_,C_=D_?E(F_,y_,W_):{text:F_||"",omitted:0,totalLines:Number.isFinite(W_)?W_:0};if(!F_&&!(Number.isFinite(C_.totalLines)&&C_.totalLines>0))return null;let p_=`agent-thinking-body${D_?" agent-thinking-body-collapsible":""}`,X0=D_?`--agent-thinking-collapsed-lines: ${y_};`:"";return q`
            <div
                class="agent-thinking"
                data-expanded=${w_?"true":"false"}
                data-collapsible=${D_?"true":"false"}
                style=${Q_?`--turn-color: ${Q_};`:""}
            >
                <div class="agent-thinking-title ${O_||""}">
                    ${Q_&&q`<span class=${e} aria-hidden="true"></span>`}
                    ${g}
                    ${u_&&q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${g} panel`}
                            onClick=${()=>d(H_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${p_}
                    style=${X0}
                    dangerouslySetInnerHTML=${{__html:l3(F_)}}
                />
                ${!w_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>d(H_)}>
                        ▸ ${C_.omitted} more lines
                    </button>
                `}
                ${w_&&C_.omitted>0&&q`
                    <button class="agent-thinking-truncation" onClick=${()=>d(H_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},z_=X?.tool_call?.title,q_=z_?`Awaiting approval: ${z_}`:"Awaiting approval";return q`
        <div class="agent-status-panel">
            ${Y&&q`
                <div
                    class="agent-status agent-status-intent"
                    aria-live="polite"
                    style=${Q_?`--turn-color: ${Q_};`:""}
                    title=${Y?.detail||""}
                >
                    <span class="agent-status-text">
                        ${Y.title}
                    </span>
                    ${Y.detail&&q`<span class="agent-status-intent-detail">${Y.detail}</span>`}
                </div>
            `}
            ${X&&q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${Q_?`--turn-color: ${Q_};`:""}>
                    <span class=${e} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${q_}</span>
                </div>
            `}
            ${A&&t({panelTitle:Y_("Planning"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,panelKey:"plan"})}
            ${f&&t({panelTitle:Y_("Thoughts"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${U&&t({panelTitle:Y_("Draft"),text:H.text,fullText:H.fullText,totalLines:H.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&q`
                <div class=${`agent-status${a?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${Q_?`--turn-color: ${Q_};`:""}>
                    ${Q_&&q`<span class=${e} aria-hidden="true"></span>`}
                    ${_?.type==="error"?q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!a&&q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${h}</span>
                </div>
            `}
        </div>
    `}function a3({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Z,options:X}=_,Y=Z?.title||"Agent Request",j=Z?.kind||"other",G=Z?.rawInput||{},V=G.command||G.commands&&G.commands[0]||null,W=G.diff||null,Q=G.fileName||G.path||null,F=Z?.description||G.description||G.explanation||null,L=(Array.isArray(Z?.locations)?Z.locations:[]).map((A)=>A?.path).filter((A)=>Boolean(A)),E=Array.from(new Set([Q,...L].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Z,options:X});let M=async(A)=>{try{await G1(J,A),$()}catch(f){console.error("Failed to respond to agent request:",f)}},b=async()=>{try{await z3(Y,`Auto-approved: ${Y}`),await G1(J,"approved"),$()}catch(A){console.error("Failed to add to whitelist:",A)}},H=X&&X.length>0;return q`
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
                ${(F||V||W||E.length>0)&&q`
                    <div class="agent-request-body">
                        ${F&&q`
                            <div class="agent-request-description">${F}</div>
                        `}
                        ${E.length>0&&q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${E.map((A,f)=>q`<li key=${f}>${A}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${V&&q`
                            <pre class="agent-request-command">${V}</pre>
                        `}
                        ${W&&q`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${W}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${H?X.map((A)=>q`
                            <button 
                                key=${A.optionId||A.id||String(A)}
                                class="agent-request-btn ${A.kind==="allow_once"||A.kind==="allow_always"?"primary":""}"
                                onClick=${()=>M(A.optionId||A.id||A)}
                            >
                                ${A.name||A.label||A.optionId||A.id||String(A)}
                            </button>
                        `):q`
                        <button class="agent-request-btn primary" onClick=${()=>M("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>M("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${b}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function t3({status:_}){if(_==="connected")return null;return q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function e3(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,X=Z/1000,Y=86400000;if(Z<Y){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(Z<5*Y){let V=$.toLocaleDateString(void 0,{weekday:"short"}),W=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${V} ${W}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),G=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${G}`}function z2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function R0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function c2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function _4({src:_,onClose:$}){return c(()=>{let J=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function C8({mediaId:_}){let[$,J]=R(null);if(c(()=>{b2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",X=$.metadata?.size,Y=X?R0(X):"";return q`
        <a href=${J2(_)} download=${Z} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${Y&&q`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function p2({annotations:_}){if(!_)return null;let{audience:$,priority:J,lastModified:Z}=_,X=Z?c2(Z):null;return q`
        <div class="content-annotations">
            ${$&&$.length>0&&q`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof J==="number"&&q`
                <span class="content-annotation">Priority: ${J}</span>
            `}
            ${X&&q`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function y8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Z=_.size?R0(_.size):"",X=_.mime_type||"",Y=A8(X),j=Q2(_.uri);return q`
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
                ${J&&q`<div class="resource-link-description">${J}</div>`}
                <div class="resource-link-meta">
                    ${X&&q`<span>${X}</span>`}
                    ${Z&&q`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function k8({block:_}){let[$,J]=R(!1),Z=_.uri||"Embedded resource",X=_.text||"",Y=Boolean(_.data),j=_.mime_type||"";return q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(G)=>{G.preventDefault(),G.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&q`
                ${X&&q`<pre class="resource-embed-content">${X}</pre>`}
                ${Y&&q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(G)=>{G.preventDefault(),G.stopPropagation();let V=new Blob([Uint8Array.from(atob(_.data),(F)=>F.charCodeAt(0))],{type:j||"application/octet-stream"}),W=URL.createObjectURL(V),Q=document.createElement("a");Q.href=W,Q.download=Z.split("/").pop()||"resource",Q.click(),URL.revokeObjectURL(W)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function A8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function w8({preview:_}){let $=Q2(_.url),J=Q2(_.image,{allowDataImage:!0}),Z=J?`background-image: url('${J}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return q`
        <a
            href=${$||"#"}
            class="link-preview ${J?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${X||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&q`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function M8(_,$){return typeof _==="string"?_:""}var P8=1800,I8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,b8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,S8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function x8(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let J=document.createElement("textarea");J.value=$,J.setAttribute("readonly",""),J.style.position="fixed",J.style.opacity="0",J.style.pointerEvents="none",document.body.appendChild(J),J.select(),J.setSelectionRange(0,J.value.length);let Z=document.execCommand("copy");return document.body.removeChild(J),Z}catch{return!1}}function T8(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let J=new Map,Z=[],X=(Y,j)=>{let G=j||"idle";if(Y.dataset.copyState=G,G==="success")Y.innerHTML=b8,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(G==="error")Y.innerHTML=S8,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=I8,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let j=document.createElement("div");j.className="post-code-block",Y.parentNode?.insertBefore(j,Y),j.appendChild(Y);let G=document.createElement("button");G.type="button",G.className="post-code-copy-btn",X(G,"idle"),j.appendChild(G);let V=async(W)=>{W.preventDefault(),W.stopPropagation();let F=Y.querySelector("code")?.textContent||"",D=await x8(F);X(G,D?"success":"error");let L=J.get(G);if(L)clearTimeout(L);let E=setTimeout(()=>{X(G,"idle"),J.delete(G)},P8);J.set(G,E)};G.addEventListener("click",V),Z.push(()=>{G.removeEventListener("click",V);let W=J.get(G);if(W)clearTimeout(W);if(j.parentNode)j.parentNode.insertBefore(Y,j),j.remove()})}),()=>{Z.forEach((Y)=>Y())}}function f8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Files:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Z=W;break}if(Z===-1)return{content:_,fileRefs:[]};let X=[],Y=Z+1;for(;Y<J.length;Y+=1){let W=J[Y];if(/^\s*-\s+/.test(W))X.push(W.replace(/^\s*-\s+/,"").trim());else if(!W.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=J.slice(0,Z),G=J.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,fileRefs:X}}function v8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Referenced messages:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Z=W;break}if(Z===-1)return{content:_,messageRefs:[]};let X=[],Y=Z+1;for(;Y<J.length;Y+=1){let W=J[Y];if(/^\s*-\s+/.test(W)){let F=W.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(F)X.push(F[1])}else if(!W.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=J.slice(0,Z),G=J.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,messageRefs:X}}function R8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let W=0;W<J.length;W+=1)if(J[W].trim()==="Images:"&&J[W+1]&&/^\s*-\s+/.test(J[W+1])){Z=W;break}if(Z===-1)return{content:_,attachments:[]};let X=[],Y=Z+1;for(;Y<J.length;Y+=1){let W=J[Y];if(/^\s*-\s+/.test(W)){let Q=W.replace(/^\s*-\s+/,"").trim(),F=Q.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||Q.match(/^attachment:([^\s]+)\s+(.+)$/i);if(F){let D=F[1],L=(F[2]||"").trim()||D;X.push({id:D,label:L,raw:Q})}else X.push({id:null,label:Q,raw:Q})}else if(!W.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=J.slice(0,Z),G=J.slice(Y),V=[...j,...G].join(`
`);return V=V.replace(/\n{3,}/g,`

`).trim(),{content:V,attachments:X}}function u8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function m8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Z=J.map(u8).sort((Q,F)=>F.length-Q.length),X=new RegExp(`(${Z.join("|")})`,"gi"),Y=new RegExp(`^(${Z.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),G=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),V=[],W;while(W=G.nextNode())V.push(W);for(let Q of V){let F=Q.nodeValue;if(!F||!X.test(F)){X.lastIndex=0;continue}X.lastIndex=0;let D=Q.parentElement;if(D&&D.closest("code, pre, script, style"))continue;let L=F.split(X).filter((M)=>M!=="");if(L.length===0)continue;let E=j.createDocumentFragment();for(let M of L)if(Y.test(M)){let b=j.createElement("mark");b.className="search-highlight-term",b.textContent=M,E.appendChild(b)}else E.appendChild(j.createTextNode(M));Q.parentNode.replaceChild(E,Q)}return j.body.innerHTML}function $4({post:_,onClick:$,onHashtagClick:J,onMessageRef:Z,onScrollToMessage:X,agentName:Y,agentAvatarUrl:j,userName:G,userAvatarUrl:V,userAvatarBackground:W,onDelete:Q,isThreadReply:F,isThreadPrev:D,isThreadNext:L,isRemoving:E,highlightQuery:M,onFileRef:b}){let[H,A]=R(null),f=k(null),U=_.data,T=U.type==="agent_response",s=G||"You",d=T?Y||o3:s,Z_=T?U1(Y,j):U1(s,V),Q_=typeof W==="string"?W.trim().toLowerCase():"",e=!T&&Z_.image&&(Q_==="clear"||Q_==="transparent"),Y_=T&&Boolean(Z_.image),a=`background-color: ${e||Y_?"transparent":Z_.color}`,h=U.content_meta,__=Boolean(h?.truncated),o=Boolean(h?.preview),t=__&&!o,z_=__?{originalLength:Number.isFinite(h?.original_length)?h.original_length:U.content?U.content.length:0,maxLength:Number.isFinite(h?.max_length)?h.max_length:0}:null,q_=M8(U.content,U.link_previews),{content:g,fileRefs:V_}=f8(q_),{content:G_,messageRefs:W_}=v8(g),{content:y_,attachments:O_}=R8(G_);q_=y_;let H_=Boolean(q_)&&!t,w_=typeof M==="string"?M.trim():"",F_=v0(()=>{if(!q_)return"";let P=j2(q_,J);return w_?m8(P,w_):P},[q_,w_]),D_=(P,r)=>{P.stopPropagation(),A(J2(r))},u_=(P)=>{P.stopPropagation(),Q?.(_)},C_=(P,r)=>{let b_=new Set;if(!P||r.length===0)return{content:P,usedIds:b_};return{content:P.replace(/attachment:([^\s)"']+)/g,(r_,F0,C0,j0)=>{let i_=F0.replace(/^\/+/,""),B0=r.find(($0)=>$0.name&&$0.name.toLowerCase()===i_.toLowerCase()&&!b_.has($0.id))||r.find(($0)=>!b_.has($0.id));if(!B0)return r_;if(b_.add(B0.id),j0.slice(Math.max(0,C0-2),C0)==="](")return`/media/${B0.id}`;return B0.name||"attachment"}),usedIds:b_}},p_=[],X0=[],U_=[],M_=[],_0=[],O0=[],Q0=U.content_blocks||[],N0=U.media_ids||[],q0=0;if(Q0.length>0)Q0.forEach((P)=>{if(P?.type==="text"&&P.annotations)O0.push(P.annotations);if(P?.type==="resource_link")M_.push(P);else if(P?.type==="resource")_0.push(P);else if(P?.type==="file"){let r=N0[q0++];if(r)X0.push(r),U_.push({id:r,name:P?.name||P?.filename||P?.title})}else if(P?.type==="image"||!P?.type){let r=N0[q0++];if(r){let b_=typeof P?.mime_type==="string"?P.mime_type:void 0;p_.push({id:r,annotations:P?.annotations,mimeType:b_}),U_.push({id:r,name:P?.name||P?.filename||P?.title})}}});else if(N0.length>0)N0.forEach((P)=>{p_.push({id:P,annotations:null}),U_.push({id:P,name:null})});if(O_.length>0)O_.forEach((P)=>{if(!P?.id)return;let r=U_.find((b_)=>String(b_.id)===String(P.id));if(r&&!r.name)r.name=P.label});let{content:I_,usedIds:m_}=C_(q_,U_);q_=I_;let a_=p_.filter(({id:P})=>!m_.has(P)),h_=X0.filter((P)=>!m_.has(P)),f_=O_.length>0?O_.map((P,r)=>({id:P.id||`attachment-${r+1}`,label:P.label||`attachment-${r+1}`})):U_.map((P,r)=>({id:P.id,label:P.name||`attachment-${r+1}`}));return c(()=>{if(!f.current)return;return g2(f.current),T8(f.current)},[F_]),q`
        <div id=${`post-${_.id}`} class="post ${T?"agent-post":""} ${F?"thread-reply":""} ${D?"thread-prev":""} ${L?"thread-next":""} ${E?"removing":""}" onClick=${$}>
            <div class="post-avatar ${T?"agent-avatar":""} ${Z_.image?"has-image":""}" style=${a}>
                ${Z_.image?q`<img src=${Z_.image} alt=${d} />`:Z_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${u_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${d}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(P)=>{if(P.preventDefault(),P.stopPropagation(),Z)Z(_.id)}}>${e3(_.timestamp)}</a>
                </div>
                ${t&&z_&&q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${z2(z_.originalLength)} chars
                            ${z_.maxLength?q` • Display limit: ${z2(z_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${o&&z_&&q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${z2(z_.maxLength)} of ${z2(z_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(V_.length>0||W_.length>0||f_.length>0)&&q`
                    <div class="post-file-refs">
                        ${W_.map((P)=>{let r=(b_)=>{if(b_.preventDefault(),b_.stopPropagation(),X)X(P);else{let c_=document.getElementById("post-"+P);if(c_)c_.scrollIntoView({behavior:"smooth",block:"center"}),c_.classList.add("post-highlight"),setTimeout(()=>c_.classList.remove("post-highlight"),2000)}};return q`
                                <a href=${`#msg-${P}`} class="post-msg-pill-link" onClick=${r}>
                                    <${c0}
                                        prefix="post"
                                        label=${"msg:"+P}
                                        title=${"Message "+P}
                                        icon="message"
                                        onClick=${r}
                                    />
                                </a>
                            `})}
                        ${V_.map((P)=>{let r=P.split("/").pop()||P;return q`
                                <${c0}
                                    prefix="post"
                                    label=${r}
                                    title=${P}
                                    onClick=${()=>b?.(P)}
                                />
                            `})}
                        ${f_.map((P)=>q`
                            <${c0}
                                prefix="post"
                                label=${P.label}
                                title=${P.label}
                            />
                        `)}
                    </div>
                `}
                ${H_&&q`
                    <div 
                        ref=${f}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:F_}}
                        onClick=${(P)=>{if(P.target.classList.contains("hashtag")){P.preventDefault(),P.stopPropagation();let r=P.target.dataset.hashtag;if(r)J?.(r)}else if(P.target.tagName==="IMG")P.preventDefault(),P.stopPropagation(),A(P.target.src)}}
                    />
                `}
                ${O0.length>0&&q`
                    ${O0.map((P,r)=>q`
                        <${p2} key=${r} annotations=${P} />
                    `)}
                `}
                ${a_.length>0&&q`
                    <div class="media-preview">
                        ${a_.map(({id:P,mimeType:r})=>{let c_=typeof r==="string"&&r.toLowerCase().startsWith("image/svg")?J2(P):F3(P);return q`
                                <img 
                                    key=${P} 
                                    src=${c_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(r_)=>D_(r_,P)}
                                />
                            `})}
                    </div>
                `}
                ${a_.length>0&&q`
                    ${a_.map(({annotations:P},r)=>q`
                        ${P&&q`<${p2} key=${r} annotations=${P} />`}
                    `)}
                `}
                ${h_.length>0&&q`
                    <div class="file-attachments">
                        ${h_.map((P)=>q`
                            <${C8} key=${P} mediaId=${P} />
                        `)}
                    </div>
                `}
                ${M_.length>0&&q`
                    <div class="resource-links">
                        ${M_.map((P,r)=>q`
                            <div key=${r}>
                                <${y8} block=${P} />
                                <${p2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${_0.length>0&&q`
                    <div class="resource-embeds">
                        ${_0.map((P,r)=>q`
                            <div key=${r}>
                                <${k8} block=${P} />
                                <${p2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${U.link_previews?.length>0&&q`
                    <div class="link-previews">
                        ${U.link_previews.map((P,r)=>q`
                            <${w8} key=${r} preview=${P} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${H&&q`<${_4} src=${H} onClose=${()=>A(null)} />`}
    `}function J4({posts:_,hasMore:$,onLoadMore:J,onPostClick:Z,onHashtagClick:X,onMessageRef:Y,onScrollToMessage:j,onFileRef:G,emptyMessage:V,timelineRef:W,agents:Q,user:F,onDeletePost:D,reverse:L=!0,removingPostIds:E,searchQuery:M}){let[b,H]=R(!1),A=k(null),f=typeof IntersectionObserver<"u",U=I(async()=>{if(!J||!$||b)return;H(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{H(!1)}},[$,b,J]),T=I((a)=>{let{scrollTop:h,scrollHeight:__,clientHeight:o}=a.target,t=L?__-o-h:h,z_=Math.max(300,o);if(t<z_)U()},[L,U]);if(c(()=>{if(!f)return;let a=A.current,h=W?.current;if(!a||!h)return;let __=300,o=new IntersectionObserver((t)=>{for(let z_ of t){if(!z_.isIntersecting)continue;U()}},{root:h,rootMargin:`${__}px 0px ${__}px 0px`,threshold:0});return o.observe(a),()=>o.disconnect()},[f,$,J,W,U]),c(()=>{if(f)return;if(!W?.current)return;let{scrollTop:a,scrollHeight:h,clientHeight:__}=W.current,o=L?h-__-a:a,t=Math.max(300,__);if(o<t)U()},[f,_,$,L,W,U]),c(()=>{if(!W?.current)return;if(!$||b)return;let{scrollTop:a,scrollHeight:h,clientHeight:__}=W.current,o=L?h-__-a:a,t=Math.max(300,__);if(h<=__+1||o<t)U()},[_,$,b,L,W,U]),!_)return q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return q`
            <div class="timeline" ref=${W}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${V||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let s=_.slice().sort((a,h)=>a.id-h.id),d=(a)=>{let h=a?.data?.thread_id;if(h===null||h===void 0||h==="")return null;let __=Number(h);return Number.isFinite(__)?__:null},Z_=new Map;for(let a=0;a<s.length;a+=1){let h=s[a],__=Number(h?.id),o=d(h);if(o!==null){let t=Z_.get(o)||{anchorIndex:-1,replyIndexes:[]};t.replyIndexes.push(a),Z_.set(o,t)}else if(Number.isFinite(__)){let t=Z_.get(__)||{anchorIndex:-1,replyIndexes:[]};t.anchorIndex=a,Z_.set(__,t)}}let Q_=new Map;for(let[a,h]of Z_.entries()){let __=new Set;if(h.anchorIndex>=0)__.add(h.anchorIndex);for(let o of h.replyIndexes)__.add(o);Q_.set(a,Array.from(__).sort((o,t)=>o-t))}let e=s.map((a,h)=>{let __=d(a);if(__===null)return{hasThreadPrev:!1,hasThreadNext:!1};let o=Q_.get(__);if(!o||o.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let t=o.indexOf(h);if(t<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:t>0,hasThreadNext:t<o.length-1}}),Y_=q`<div class="timeline-sentinel" ref=${A}></div>`;return q`
        <div class="timeline ${L?"reverse":"normal"}" ref=${W} onScroll=${T}>
            <div class="timeline-content">
                ${L?Y_:null}
                ${s.map((a,h)=>{let __=Boolean(a.data?.thread_id&&a.data.thread_id!==a.id),o=E?.has?.(a.id),t=e[h]||{};return q`
                    <${$4}
                        key=${a.id}
                        post=${a}
                        isThreadReply=${__}
                        isThreadPrev=${t.hasThreadPrev}
                        isThreadNext=${t.hasThreadNext}
                        isRemoving=${o}
                        highlightQuery=${M}
                        agentName=${n3(a.data?.agent_id,Q||{})}
                        agentAvatarUrl=${d3(a.data?.agent_id,Q||{})}
                        userName=${F?.name||F?.user_name}
                        userAvatarUrl=${F?.avatar_url||F?.avatarUrl||F?.avatar}
                        userAvatarBackground=${F?.avatar_background||F?.avatarBackground}
                        onClick=${()=>Z?.(a)}
                        onHashtagClick=${X}
                        onMessageRef=${Y}
                        onScrollToMessage=${j}
                        onFileRef=${G}
                        onDelete=${D}
                    />
                `})}
                ${L?null:Y_}
            </div>
        </div>
    `}var g8=16,c8=60000,Q4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function p8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Z=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=Z?.[1]||J,Y=Z?.[2]||"",j=Z?.[3]||"",G=String($||"").split("/").slice(0,-1).join("/"),W=X.startsWith("/")?X:`${G?`${G}/`:""}${X}`,Q=[];for(let D of W.split("/")){if(!D||D===".")continue;if(D===".."){if(Q.length>0)Q.pop();continue}Q.push(D)}let F=Q.join("/");return`${W1(F)}${Y}${j}`}function j4(_,$,J,Z=0,X=[]){if(!J&&Q4(_))return X;if(!_)return X;if(X.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)j4(Y,$,J,Z+1,X);return X}function Z4(_,$,J){if(!_)return"";let Z=[],X=(Y)=>{if(!J&&Q4(Y))return;if(Z.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let j of Y.children)X(j)};return X(_),Z.join("|")}function D1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let X=J?new Map(J.map((G)=>[G?.path,G])):new Map,Y=!J||J.length!==Z.length,j=Z.map((G)=>{let V=D1(X.get(G.path),G);if(V!==X.get(G.path))Y=!0;return V});return Y?{...$,children:j}:_}function L1(_,$,J){if(!_)return _;if(_.path===$)return D1(_,J);if(!Array.isArray(_.children))return _;let Z=!1,X=_.children.map((Y)=>{let j=L1(Y,$,J);if(j!==Y)Z=!0;return j});return Z?{..._,children:X}:_}var K4=4,F1=14,h8=8,i8=16;function G4(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Z of $)J+=G4(Z);return _.__bytes=J,J}function V4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=K4)return Z;let X=Array.isArray(_.children)?_.children:[],Y=[];for(let G of X){let V=Math.max(0,Number(G?.__bytes??G?.size??0));if(V<=0)continue;if(G.type==="dir")Y.push({kind:"dir",node:G,size:V});else Y.push({kind:"file",name:G.name,path:G.path,size:V})}Y.sort((G,V)=>V.size-G.size);let j=Y;if(Y.length>F1){let G=Y.slice(0,F1-1),V=Y.slice(F1-1),W=V.reduce((Q,F)=>Q+F.size,0);G.push({kind:"other",name:`+${V.length} more`,path:`${Z.path}/[other]`,size:W}),j=G}return Z.children=j.map((G)=>{if(G.kind==="dir")return V4(G.node,$+1);return{name:G.name,path:G.path,size:G.size,children:[]}}),Z}function Y4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function W4(_,$,J){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,X=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${X}% ${Y}%)`}function h2(_,$,J,Z){return{x:_+J*Math.cos(Z),y:$+J*Math.sin(Z)}}function C1(_,$,J,Z,X,Y){let j=Math.PI*2-0.0001,G=Y-X>j?X+j:Y,V=h2(_,$,Z,X),W=h2(_,$,Z,G),Q=h2(_,$,J,G),F=h2(_,$,J,X),D=G-X>Math.PI?1:0;return[`M ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${D} 1 ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`L ${Q.x.toFixed(3)} ${Q.y.toFixed(3)}`,`A ${J} ${J} 0 ${D} 0 ${F.x.toFixed(3)} ${F.y.toFixed(3)}`,"Z"].join(" ")}var O4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function N4(_,$,J){let Z=[],X=[],Y=Math.max(0,Number($)||0),j=(G,V,W,Q)=>{let F=Array.isArray(G?.children)?G.children:[];if(!F.length)return;let D=Math.max(0,Number(G.size)||0);if(D<=0)return;let L=W-V,E=V;F.forEach((M,b)=>{let H=Math.max(0,Number(M.size)||0);if(H<=0)return;let A=H/D,f=E,U=b===F.length-1?W:E+L*A;if(E=U,U-f<0.003)return;let T=O4[Q];if(T){let s=W4(f,Q,J);if(Z.push({key:M.path,path:M.path,label:M.name,size:H,color:s,depth:Q,startAngle:f,endAngle:U,innerRadius:T[0],outerRadius:T[1],d:C1(120,120,T[0],T[1],f,U)}),Q===1)X.push({key:M.path,name:M.name,size:H,pct:Y>0?H/Y*100:0,color:s})}if(Q<K4)j(M,f,U,Q+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:X}}function E1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Z of J){let X=E1(Z,$);if(X)return X}return null}function q4(_,$,J,Z){if(!J||J<=0)return{segments:[],legend:[]};let X=O4[1];if(!X)return{segments:[],legend:[]};let Y=-Math.PI/2,j=Math.PI*3/2,G=W4(Y,1,Z),W=`${$||"."}/[files]`;return{segments:[{key:W,path:W,label:_,size:J,color:G,depth:1,startAngle:Y,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:C1(120,120,X[0],X[1],Y,j)}],legend:[{key:W,name:_,size:J,pct:100,color:G}]}}function X4(_,$=!1,J=!1){if(!_)return null;let Z=G4(_),X=V4(_,0),Y=X.size||Z,{segments:j,legend:G}=N4(X,Y,J);if(!j.length&&Y>0){let V=q4("[files]",X.path,Y,J);j=V.segments,G=V.legend}return{root:X,totalSize:Y,segments:j,legend:G,truncated:$,isDarkTheme:J}}function l8({payload:_}){if(!_)return null;let[$,J]=R(null),[Z,X]=R(_?.root?.path||"."),[Y,j]=R(()=>[_?.root?.path||"."]),[G,V]=R(!1);c(()=>{let e=_?.root?.path||".";X(e),j([e]),J(null)},[_?.root?.path,_?.totalSize]),c(()=>{if(!Z)return;V(!0);let e=setTimeout(()=>V(!1),180);return()=>clearTimeout(e)},[Z]);let W=v0(()=>{return E1(_.root,Z)||_.root},[_?.root,Z]),Q=W?.size||_.totalSize||0,{segments:F,legend:D}=v0(()=>{let e=N4(W,Q,_.isDarkTheme);if(e.segments.length>0)return e;if(Q<=0)return e;let Y_=W?.children?.length?"Total":"[files]";return q4(Y_,W?.path||_?.root?.path||".",Q,_.isDarkTheme)},[W,Q,_.isDarkTheme,_?.root?.path]),[L,E]=R(F),M=k(new Map),b=k(0);c(()=>{let e=M.current,Y_=new Map(F.map((o)=>[o.key,o])),a=performance.now(),h=220,__=(o)=>{let t=Math.min(1,(o-a)/220),z_=t*(2-t),q_=F.map((g)=>{let G_=e.get(g.key)||{startAngle:g.startAngle,endAngle:g.startAngle,innerRadius:g.innerRadius,outerRadius:g.innerRadius},W_=(F_,D_)=>F_+(D_-F_)*z_,y_=W_(G_.startAngle,g.startAngle),O_=W_(G_.endAngle,g.endAngle),H_=W_(G_.innerRadius,g.innerRadius),w_=W_(G_.outerRadius,g.outerRadius);return{...g,d:C1(120,120,H_,w_,y_,O_)}});if(E(q_),t<1)b.current=requestAnimationFrame(__)};if(b.current)cancelAnimationFrame(b.current);return b.current=requestAnimationFrame(__),M.current=Y_,()=>{if(b.current)cancelAnimationFrame(b.current)}},[F]);let H=L.length?L:F,A=Q>0?R0(Q):"0 B",f=W?.name||"",T=(f&&f!=="."?f:"Total")||"Total",s=A,d=Y.length>1,Z_=(e)=>{if(!e?.path)return;let Y_=E1(_.root,e.path);if(!Y_||!Array.isArray(Y_.children)||Y_.children.length===0)return;j((a)=>[...a,Y_.path]),X(Y_.path),J(null)},Q_=()=>{if(!d)return;j((e)=>{let Y_=e.slice(0,-1);return X(Y_[Y_.length-1]||_?.root?.path||"."),Y_}),J(null)};return q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${G?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${W?.path||_?.root?.path||"."}`}
                data-segments=${H.length}
                data-base-size=${Q}>
                ${H.map((e)=>q`
                    <path
                        key=${e.key}
                        d=${e.d}
                        fill=${e.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===e.key?" is-hovered":""}`}
                        onMouseEnter=${()=>J(e)}
                        onMouseLeave=${()=>J(null)}
                        onTouchStart=${()=>J(e)}
                        onTouchEnd=${()=>J(null)}
                        onClick=${()=>Z_(e)}
                    >
                        <title>${e.label} — ${R0(e.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${d?" is-drill":""}`}
                    onClick=${Q_}
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
            ${D.length>0&&q`
                <div class="workspace-folder-starburst-legend">
                    ${D.slice(0,8).map((e)=>q`
                        <div key=${e.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${e.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${e.name}>${e.name}</span>
                            <span class="workspace-folder-starburst-size">${R0(e.size)}</span>
                            <span class="workspace-folder-starburst-pct">${e.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function o8({mediaId:_}){let[$,J]=R(null);if(c(()=>{if(!_)return;b2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",X=$.metadata?.size?R0($.metadata.size):"";return q`
        <a href=${J2(_)} download=${Z} class="file-attachment"
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
                ${X&&q`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function B4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Z}){let[X,Y]=R(null),[j,G]=R(new Set(["."])),[V,W]=R(null),[Q,F]=R(null),[D,L]=R(""),[E,M]=R(null),[b,H]=R(null),[A,f]=R(!0),[U,T]=R(!1),[s,d]=R(null),[Z_,Q_]=R(()=>Z2("workspaceShowHidden",!1)),[e,Y_]=R(!1),[a,h]=R(null),[__,o]=R(null),[t,z_]=R(null),[q_,g]=R(!1),[V_,G_]=R(null),[W_,y_]=R(()=>Y4()),O_=k(j),H_=k(""),w_=k(null),F_=k(0),D_=k(new Set),u_=k(null),C_=k(new Map),p_=k(_),X0=k(Z),U_=k(null),M_=k(null),_0=k(null),O0=k(null),Q0=k(null),N0=k(null),q0=k("."),I_=k(null),m_=k({path:null,dragging:!1,startX:0,startY:0}),a_=k({path:null,dragging:!1,startX:0,startY:0}),h_=k({path:null,timer:0}),f_=k(!1),P=k(0),r=k(new Map),b_=k(null),c_=k(null),r_=k(Z_),F0=k($),C0=k(J??$),j0=k(0),i_=k(t),y0=k(e),B0=k(a),I0=k(null),$0=k({x:0,y:0}),s_=k(0),k0=k(null),l_=k(V),K0=k(Q),J0=k(null),b0=k(E);p_.current=_,X0.current=Z,c(()=>{O_.current=j},[j]),c(()=>{r_.current=Z_},[Z_]),c(()=>{F0.current=$},[$]),c(()=>{C0.current=J??$},[J,$]),c(()=>{i_.current=t},[t]),c(()=>{let K=(B)=>{let y=B?.detail?.path;if(!y)return;let C=y.split("/"),u=[];for(let p=1;p<C.length;p++)u.push(C.slice(0,p).join("/"));if(u.length)G((p)=>{let $_=new Set(p);$_.add(".");for(let J_ of u)$_.add(J_);return $_});W(y),requestAnimationFrame(()=>{let p=document.querySelector(`[data-path="${CSS.escape(y)}"]`);if(p)p.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),c(()=>{y0.current=e},[e]),c(()=>{B0.current=a},[a]),c(()=>{l_.current=V},[V]),c(()=>{K0.current=Q},[Q]),c(()=>{b0.current=E},[E]),c(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>y_(Y4());K();let B=window.matchMedia?.("(prefers-color-scheme: dark)"),y=()=>K();if(B?.addEventListener)B.addEventListener("change",y);else if(B?.addListener)B.addListener(y);let C=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(B?.removeEventListener)B.removeEventListener("change",y);else if(B?.removeListener)B.removeListener(y);C?.disconnect()}},[]),c(()=>{if(!Q)return;let K=Q0.current;if(!K)return;let B=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(B)},[Q]);let S0=async(K)=>{T(!0),M(null),H(null);try{let B=await L3(K,20000);M(B)}catch(B){M({error:B.message||"Failed to load preview"})}finally{T(!1)}};U_.current=S0;let z0=async()=>{if(!F0.current)return;try{let K=await S2("",1,r_.current),B=Z4(K.root,O_.current,r_.current);if(B===H_.current){f(!1);return}if(H_.current=B,w_.current=K.root,!F_.current)F_.current=requestAnimationFrame(()=>{F_.current=0,Y((y)=>D1(y,w_.current)),f(!1)})}catch(K){d(K.message||"Failed to load workspace"),f(!1)}},L0=async(K)=>{if(!K)return;if(D_.current.has(K))return;D_.current.add(K);try{let B=await S2(K,1,r_.current);Y((y)=>L1(y,K,B.root))}catch(B){d(B.message||"Failed to load workspace")}finally{D_.current.delete(K)}};M_.current=L0;let x_=I(()=>{let K=V;if(!K)return".";let B=C_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[V]),H0=I((K)=>{let B=K?.closest?.(".workspace-row");if(!B)return null;let y=B.dataset.path,C=B.dataset.type;if(!y)return null;if(C==="dir")return y;if(y.includes("/")){let u=y.split("/");return u.pop(),u.join("/")||"."}return"."},[]),G0=I((K)=>{return H0(K?.target||null)},[H0]),v_=I((K)=>{i_.current=K,z_(K)},[]),R_=I(()=>{let K=h_.current;if(K?.timer)clearTimeout(K.timer);h_.current={path:null,timer:0}},[]),o_=I((K)=>{if(!K||K==="."){R_();return}let B=C_.current?.get(K);if(!B||B.type!=="dir"){R_();return}if(O_.current?.has(K)){R_();return}if(h_.current?.path===K)return;R_();let y=setTimeout(()=>{h_.current={path:null,timer:0},M_.current?.(K),G((C)=>{let u=new Set(C);return u.add(K),u})},600);h_.current={path:K,timer:y}},[R_]),Z0=I((K,B)=>{if($0.current={x:K,y:B},s_.current)return;s_.current=requestAnimationFrame(()=>{s_.current=0;let y=I0.current;if(!y)return;let C=$0.current;y.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),A0=I((K)=>{if(!K)return;let y=(C_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y)return;o({path:K,label:y})},[]),E0=I(()=>{if(o(null),s_.current)cancelAnimationFrame(s_.current),s_.current=0;if(I0.current)I0.current.style.transform="translate(-9999px, -9999px)"},[]),x0=I((K)=>{if(!K)return".";let B=C_.current?.get(K);if(B&&B.type==="dir")return B.path;if(K==="."||!K.includes("/"))return".";let y=K.split("/");return y.pop(),y.join("/")||"."},[]),t_=I(()=>{F(null),L("")},[]),u0=I((K)=>{if(!K)return;let y=(C_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!y||K===".")return;F(K),L(y)},[]),p0=I(async()=>{let K=K0.current;if(!K)return;let B=(D||"").trim();if(!B){t_();return}let y=C_.current?.get(K),C=(y?.name||K.split("/").pop()||K).trim();if(B===C){t_();return}try{let p=(await C3(K,B))?.path||K,$_=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(t_(),d(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:p,type:y?.type||"file"}})),y?.type==="dir")G((J_)=>{let n=new Set;for(let j_ of J_)if(j_===K)n.add(p);else if(j_.startsWith(`${K}/`))n.add(`${p}${j_.slice(K.length)}`);else n.add(j_);return n});if(W(p),y?.type==="dir")M(null),T(!1),H(null);else U_.current?.(p);M_.current?.($_)}catch(u){d(u?.message||"Failed to rename file")}},[t_,D]),h0=I(async(K)=>{let C=K||".";for(let u=0;u<50;u+=1){let $_=`untitled${u===0?"":`-${u}`}.md`;try{let n=(await D3(C,$_,""))?.path||(C==="."?$_:`${C}/${$_}`);if(C&&C!==".")G((j_)=>new Set([...j_,C]));W(n),d(null),M_.current?.(C),U_.current?.(n);return}catch(J_){if(J_?.status===409||J_?.code==="file_exists")continue;d(J_?.message||"Failed to create file");return}}d("Failed to create file (untitled name already in use).")},[]),n0=I((K)=>{if(K?.stopPropagation?.(),q_)return;let B=x0(l_.current);h0(B)},[q_,x0,h0]);c(()=>{if(typeof window>"u")return;let K=(B)=>{let y=B?.detail?.updates||[];if(!Array.isArray(y)||y.length===0)return;Y((J_)=>{let n=J_;for(let j_ of y){if(!j_?.root)continue;if(!n||j_.path==="."||!j_.path)n=j_.root;else n=L1(n,j_.path,j_.root)}if(n)H_.current=Z4(n,O_.current,r_.current);return f(!1),n});let C=l_.current;if(Boolean(C)&&y.some((J_)=>{let n=J_?.path||"";if(!n||n===".")return!0;return C===n||C.startsWith(`${n}/`)||n.startsWith(`${C}/`)}))r.current.clear();if(!C||!b0.current)return;let p=C_.current?.get(C);if(p&&p.type==="dir")return;if(y.some((J_)=>{let n=J_?.path||"";if(!n||n===".")return!0;return C===n||C.startsWith(`${n}/`)}))U_.current?.(C)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),u_.current=z0;let w0=k(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),B=C0.current??F0.current,y=document.visibilityState!=="hidden"&&(B||K.matches&&F0.current);x2(y,r_.current).catch(()=>{})}).current,z=k(0),v=k(()=>{if(z.current)clearTimeout(z.current);z.current=setTimeout(()=>{z.current=0,w0()},250)}).current;c(()=>{if(F0.current)u_.current?.();v()},[$,J]),c(()=>{u_.current(),w0();let K=setInterval(()=>u_.current(),c8),B=Y2("previewHeight",null),y=Number.isFinite(B)?Math.min(Math.max(B,80),600):280;if(P.current=y,_0.current)_0.current.style.setProperty("--preview-height",`${y}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),u=()=>v();if(C.addEventListener)C.addEventListener("change",u);else if(C.addListener)C.addListener(u);return document.addEventListener("visibilitychange",u),()=>{if(clearInterval(K),F_.current)cancelAnimationFrame(F_.current),F_.current=0;if(C.removeEventListener)C.removeEventListener("change",u);else if(C.removeListener)C.removeListener(u);if(document.removeEventListener("visibilitychange",u),z.current)clearTimeout(z.current),z.current=0;if(I_.current)clearTimeout(I_.current),I_.current=null;x2(!1,r_.current).catch(()=>{})}},[]);let l=v0(()=>j4(X,j,Z_),[X,j,Z_]),X_=v0(()=>new Map(l.map((K)=>[K.node.path,K.node])),[l]);C_.current=X_;let k_=(V?C_.current.get(V):null)?.type==="dir";c(()=>{if(!V||!k_){G_(null),b_.current=null,c_.current=null;return}let K=V,B=`${Z_?"hidden":"visible"}:${V}`,y=r.current,C=y.get(B);if(C?.root){y.delete(B),y.set(B,C);let $_=X4(C.root,Boolean(C.truncated),W_);if($_)b_.current=$_,c_.current=V,G_({loading:!1,error:null,payload:$_});return}let u=b_.current,p=c_.current;G_({loading:!0,error:null,payload:p===V?u:null}),S2(V,h8,Z_).then(($_)=>{if(l_.current!==K)return;let J_={root:$_?.root,truncated:Boolean($_?.truncated)};y.delete(B),y.set(B,J_);while(y.size>i8){let j_=y.keys().next().value;if(!j_)break;y.delete(j_)}let n=X4(J_.root,J_.truncated,W_);b_.current=n,c_.current=V,G_({loading:!1,error:null,payload:n})}).catch(($_)=>{if(l_.current!==K)return;G_({loading:!1,error:$_?.message||"Failed to load folder size chart",payload:p===V?u:null})})},[V,k_,Z_,W_]);let B_=Boolean(E&&E.kind==="text"&&!k_&&(!E.size||E.size<=262144)),g_=B_?"Open in editor":E?.size>262144?"File too large to edit":"File is not editable",V0=(K)=>{let B=K?.target;if(B instanceof Element)return B;return B?.parentElement||null},T0=k((K)=>{if(J0.current)clearTimeout(J0.current),J0.current=null;let y=V0(K)?.closest?.("[data-path]");if(!y)return;let C=y.dataset.path;if(y.dataset.type==="dir"||!C)return;if(K0.current===C)t_();X0.current?.(C)}).current,A_=k((K)=>{if(f_.current){f_.current=!1;return}let B=V0(K),y=B?.closest?.("[data-path]");if(O0.current?.focus?.(),!y)return;let C=y.dataset.path,u=y.dataset.type,p=Boolean(B?.closest?.(".workspace-caret")),$_=Boolean(B?.closest?.("button"))||Boolean(B?.closest?.("a"))||Boolean(B?.closest?.("input")),J_=l_.current===C,n=K0.current;if(n){if(n===C)return;t_()}if(J_&&!p&&!$_&&C!=="."){if(J0.current)clearTimeout(J0.current);J0.current=setTimeout(()=>{J0.current=null,u0(C)},350);return}if(u==="dir"){if(W(C),M(null),H(null),T(!1),!O_.current.has(C))M_.current?.(C);if(J_&&!p)return;G((W0)=>{let e_=new Set(W0);if(e_.has(C))e_.delete(C);else e_.add(C);return e_})}else{W(C);let j_=C_.current.get(C);if(j_)p_.current?.(j_.path,j_);U_.current?.(C)}}).current,P_=k(()=>{H_.current="",u_.current(),Array.from(O_.current||[]).filter((B)=>B&&B!==".").forEach((B)=>M_.current?.(B))}).current,D0=k(()=>{W(null),M(null),H(null),T(!1)}).current,K2=k(()=>{Q_((K)=>{let B=!K;if(typeof window<"u")T_("workspaceShowHidden",String(B));return r_.current=B,x2(!0,B).catch(()=>{}),H_.current="",u_.current?.(),Array.from(O_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>M_.current?.(C)),B})}).current,G2=k((K)=>{if(V0(K)?.closest?.("[data-path]"))return;D0()}).current,f0=I(async(K)=>{if(!K)return;let B=K.split("/").pop()||K;if(!window.confirm(`Delete "${B}"? This cannot be undone.`))return;try{await k3(K);let C=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(l_.current===K)D0();M_.current?.(C),d(null)}catch(C){M((u)=>({...u||{},error:C.message||"Failed to delete file"}))}},[D0]),V2=I((K)=>{let B=O0.current;if(!B||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;B.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),i0=I((K)=>{let B=l;if(!B||B.length===0)return;let y=V?B.findIndex((C)=>C.node.path===V):-1;if(K.key==="ArrowDown"){K.preventDefault();let C=Math.min(y+1,B.length-1),u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")p_.current?.(u.node.path,u.node),U_.current?.(u.node.path);else M(null),T(!1),H(null);V2(u.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let C=y<=0?0:y-1,u=B[C];if(!u)return;if(W(u.node.path),u.node.type!=="dir")p_.current?.(u.node.path,u.node),U_.current?.(u.node.path);else M(null),T(!1),H(null);V2(u.node.path);return}if(K.key==="ArrowRight"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&!j.has(C.node.path))K.preventDefault(),M_.current?.(C.node.path),G((u)=>new Set([...u,C.node.path]));return}if(K.key==="ArrowLeft"&&y>=0){let C=B[y];if(C?.node?.type==="dir"&&j.has(C.node.path))K.preventDefault(),G((u)=>{let p=new Set(u);return p.delete(C.node.path),p});return}if(K.key==="Enter"&&y>=0){K.preventDefault();let C=B[y];if(!C)return;let u=C.node.path;if(C.node.type==="dir"){if(!O_.current.has(u))M_.current?.(u);G(($_)=>{let J_=new Set($_);if(J_.has(u))J_.delete(u);else J_.add(u);return J_}),M(null),H(null),T(!1)}else p_.current?.(u,C.node),U_.current?.(u);return}if((K.key==="Delete"||K.key==="Backspace")&&y>=0){let C=B[y];if(!C||C.node.type==="dir")return;K.preventDefault(),f0(C.node.path);return}if(K.key==="Escape")K.preventDefault(),D0()},[D0,f0,j,l,V2,V]),m0=I((K)=>{let B=K?.target?.closest?.(".workspace-row");if(!B)return;let y=B.dataset.type,C=B.dataset.path;if(!C||C===".")return;if(K0.current===C)return;let u=K?.touches?.[0];if(!u)return;if(m_.current={path:C,dragging:!1,startX:u.clientX,startY:u.clientY},y!=="file")return;if(I_.current)clearTimeout(I_.current);I_.current=setTimeout(()=>{if(I_.current=null,m_.current?.dragging)return;f0(C)},600)},[f0]),n_=I(()=>{if(I_.current)clearTimeout(I_.current),I_.current=null;let K=m_.current;if(K?.dragging&&K.path){let B=i_.current||x_(),y=k0.current;if(typeof y==="function")y(K.path,B)}m_.current={path:null,dragging:!1,startX:0,startY:0},j0.current=0,Y_(!1),h(null),v_(null),R_(),E0()},[x_,E0,v_,R_]),o2=I((K)=>{let B=m_.current,y=K?.touches?.[0];if(!y||!B?.path){if(I_.current)clearTimeout(I_.current),I_.current=null;return}let C=Math.abs(y.clientX-B.startX),u=Math.abs(y.clientY-B.startY),p=C>8||u>8;if(p&&I_.current)clearTimeout(I_.current),I_.current=null;if(!B.dragging&&p)B.dragging=!0,Y_(!0),h("move"),A0(B.path);if(B.dragging){K.preventDefault(),Z0(y.clientX,y.clientY);let $_=document.elementFromPoint(y.clientX,y.clientY),J_=H0($_)||x_();if(i_.current!==J_)v_(J_);o_(J_)}},[H0,x_,A0,Z0,v_,o_]),n2=k((K)=>{K.preventDefault();let B=_0.current;if(!B)return;let y=K.clientY,C=P.current||280,u=K.currentTarget;u.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let p=y,$_=(n)=>{p=n.clientY;let j_=B.clientHeight-80,W0=Math.min(Math.max(C-(n.clientY-y),80),j_);B.style.setProperty("--preview-height",`${W0}px`),P.current=W0},J_=()=>{let n=B.clientHeight-80,j_=Math.min(Math.max(C-(p-y),80),n);P.current=j_,u.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("previewHeight",String(Math.round(j_))),document.removeEventListener("mousemove",$_),document.removeEventListener("mouseup",J_)};document.addEventListener("mousemove",$_),document.addEventListener("mouseup",J_)}).current,U2=k((K)=>{K.preventDefault();let B=_0.current;if(!B)return;let y=K.touches[0];if(!y)return;let C=y.clientY,u=P.current||280,p=K.currentTarget;p.classList.add("dragging"),document.body.style.userSelect="none";let $_=(n)=>{let j_=n.touches[0];if(!j_)return;n.preventDefault();let W0=B.clientHeight-80,e_=Math.min(Math.max(u-(j_.clientY-C),80),W0);B.style.setProperty("--preview-height",`${e_}px`),P.current=e_},J_=()=>{p.classList.remove("dragging"),document.body.style.userSelect="",T_("previewHeight",String(Math.round(P.current||u))),document.removeEventListener("touchmove",$_),document.removeEventListener("touchend",J_),document.removeEventListener("touchcancel",J_)};document.addEventListener("touchmove",$_,{passive:!1}),document.addEventListener("touchend",J_),document.addEventListener("touchcancel",J_)}).current,M0=async()=>{if(!V)return;try{let K=await E3(V);if(K.media_id)H(K.media_id)}catch(K){M((B)=>({...B||{},error:K.message||"Failed to attach"}))}},P0=async()=>{if(!V||k_)return;await f0(V)},d0=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},F2=I((K)=>{if(!d0(K))return;if(K.preventDefault(),j0.current+=1,!y0.current)Y_(!0);h("upload");let B=G0(K)||x_();v_(B),o_(B)},[x_,G0,v_,o_]),r0=I((K)=>{if(!d0(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!y0.current)Y_(!0);if(B0.current!=="upload")h("upload");let B=G0(K)||x_();if(i_.current!==B)v_(B);o_(B)},[x_,G0,v_,o_]),d2=I((K)=>{if(!d0(K))return;if(K.preventDefault(),j0.current=Math.max(0,j0.current-1),j0.current===0)Y_(!1),h(null),v_(null),R_()},[v_,R_]),s0=I(async(K,B=".")=>{let y=Array.from(K||[]);if(y.length===0)return;let C=B&&B!==""?B:".",u=C!=="."?C:"workspace root";g(!0);try{let p=null;for(let $_ of y)try{p=await V1($_,C)}catch(J_){let n=J_?.status,j_=J_?.code;if(n===409||j_==="file_exists"){let W0=$_?.name||"file";if(!window.confirm(`"${W0}" already exists in ${u}. Overwrite?`))continue;p=await V1($_,C,{overwrite:!0})}else throw J_}if(p?.path)W(p.path),U_.current?.(p.path);M_.current?.(C)}catch(p){d(p.message||"Failed to upload file")}finally{g(!1)}},[]),r2=I(async(K,B)=>{if(!K)return;let y=C_.current?.get(K);if(!y)return;let C=B&&B!==""?B:".",u=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(C===u)return;try{let $_=(await y3(K,C))?.path||K;if(y.type==="dir")G((J_)=>{let n=new Set;for(let j_ of J_)if(j_===K)n.add($_);else if(j_.startsWith(`${K}/`))n.add(`${$_}${j_.slice(K.length)}`);else n.add(j_);return n});if(W($_),y.type==="dir")M(null),T(!1),H(null);else U_.current?.($_);M_.current?.(u),M_.current?.(C)}catch(p){d(p?.message||"Failed to move entry")}},[]);k0.current=r2;let s2=I(async(K)=>{if(!d0(K))return;K.preventDefault(),j0.current=0,Y_(!1),h(null),z_(null),R_();let B=Array.from(K?.dataTransfer?.files||[]);if(B.length===0)return;let y=i_.current||G0(K)||x_();await s0(B,y)},[x_,G0,s0]),a2=I((K)=>{if(K?.stopPropagation?.(),q_)return;let B=K?.currentTarget?.dataset?.uploadTarget||".";q0.current=B,N0.current?.click()},[q_]),t2=I(()=>{if(q_)return;let K=l_.current,B=K?C_.current?.get(K):null;q0.current=B?.type==="dir"?B.path:".",N0.current?.click()},[q_]),a0=I((K)=>{if(!K||K.button!==0)return;let B=K.currentTarget;if(!B||!B.dataset)return;let y=B.dataset.path;if(!y||y===".")return;if(K0.current===y)return;if(K.target?.closest?.("button, a, input, .workspace-caret"))return;K.preventDefault(),a_.current={path:y,dragging:!1,startX:K.clientX,startY:K.clientY};let C=(p)=>{let $_=a_.current;if(!$_?.path)return;let J_=Math.abs(p.clientX-$_.startX),n=Math.abs(p.clientY-$_.startY),j_=J_>4||n>4;if(!$_.dragging&&j_)$_.dragging=!0,f_.current=!0,Y_(!0),h("move"),A0($_.path),Z0(p.clientX,p.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if($_.dragging){p.preventDefault(),Z0(p.clientX,p.clientY);let W0=document.elementFromPoint(p.clientX,p.clientY),e_=H0(W0)||x_();if(i_.current!==e_)v_(e_);o_(e_)}},u=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",u);let p=a_.current;if(p?.dragging&&p.path){let $_=i_.current||x_(),J_=k0.current;if(typeof J_==="function")J_(p.path,$_)}a_.current={path:null,dragging:!1,startX:0,startY:0},j0.current=0,Y_(!1),h(null),v_(null),R_(),E0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{f_.current=!1},0)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",u)},[H0,x_,A0,Z0,E0,v_,o_,R_]),W2=I(async(K)=>{let B=Array.from(K?.target?.files||[]);if(B.length===0)return;let y=q0.current||".";if(await s0(B,y),q0.current=".",K?.target)K.target.value=""},[s0]);return q`
        <aside
            class=${`workspace-sidebar${e?" workspace-drop-active":""}`}
            ref=${_0}
            onDragEnter=${F2}
            onDragOver=${r0}
            onDragLeave=${d2}
            onDrop=${s2}
        >
            <input type="file" multiple style="display:none" ref=${N0} onChange=${W2} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${n0} title="New file" disabled=${q_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${P_} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Z_?" active":""}`}
                        onClick=${K2}
                        title=${Z_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Z_&&q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${G2}>
                ${q_&&q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${A&&q`<div class="workspace-loading">Loading…</div>`}
                ${s&&q`<div class="workspace-error">${s}</div>`}
                ${X&&q`
                    <div
                        class="workspace-tree-list"
                        ref=${O0}
                        tabIndex="0"
                        onClick=${A_}
                        onDblClick=${T0}
                        onKeyDown=${i0}
                        onTouchStart=${m0}
                        onTouchEnd=${n_}
                        onTouchMove=${o2}
                        onTouchCancel=${n_}
                    >
                        ${l.map(({node:K,depth:B})=>{let y=K.type==="dir",C=K.path===V,u=K.path===Q,p=y&&j.has(K.path),$_=t&&K.path===t,J_=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${C?" selected":""}${$_?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+B*g8}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${a0}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${y?p?q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${y?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${y?q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${u?q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${Q0}
                                                value=${D}
                                                onInput=${(n)=>L(n?.target?.value||"")}
                                                onKeyDown=${(n)=>{if(n.key==="Enter")n.preventDefault(),p0();else if(n.key==="Escape")n.preventDefault(),t_()}}
                                                onBlur=${t_}
                                                onClick=${(n)=>n.stopPropagation()}
                                            />
                                        `:q`<span class="workspace-label">${K.name}</span>`}
                                    ${y&&!p&&J_>0&&q`
                                        <span class="workspace-count">${J_}</span>
                                    `}
                                    ${y&&q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${a2}
                                            disabled=${q_}
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
            ${V&&q`
                <div class="workspace-preview-splitter-h" onMouseDown=${n2} onTouchStart=${U2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${V}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${n0} title="New file" disabled=${q_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!k_&&q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>B_&&X0.current?.(V,E)}
                                    title=${g_}
                                    disabled=${!B_}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${P0}
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
                            ${k_?q`
                                    <button class="workspace-download" onClick=${t2}
                                        title="Upload files to this folder" disabled=${q_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${A3(V,Z_)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:q`<button class="workspace-download" onClick=${M0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${U&&q`<div class="workspace-loading">Loading preview…</div>`}
                    ${E?.error&&q`<div class="workspace-error">${E.error}</div>`}
                    ${k_&&q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${V_?.loading&&q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${V_?.error&&q`<div class="workspace-error">${V_.error}</div>`}
                        ${V_?.payload&&V_.payload.segments?.length>0&&q`
                            <${l8} payload=${V_.payload} />
                        `}
                        ${V_?.payload&&(!V_.payload.segments||V_.payload.segments.length===0)&&q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${E&&!E.error&&!k_&&q`
                        <div class="workspace-preview-meta">
                            ${E.size?q`<span>${R0(E.size)}</span>`:""}
                            ${E.mtime?q`<span>${c2(E.mtime)}</span>`:""}
                            ${E.truncated?q`<span>truncated</span>`:""}
                        </div>
                        ${E.kind==="image"&&q`
                            <div class="workspace-preview-image">
                                <img src=${E.url||W1(E.path)} alt="preview" />
                            </div>
                        `}
                        ${E.kind==="text"&&q`
                            ${E.content_type==="text/markdown"?q`<div class="workspace-preview-text"
                                    dangerouslySetInnerHTML=${{__html:j2(E.text||"",null,{rewriteImageSrc:(K)=>p8(K,E.path||V)})}} />`:q`<pre class="workspace-preview-text"><code>${E.text||""}</code></pre>`}
                        `}
                        ${E.kind==="binary"&&q`
                            <div class="workspace-preview-text">Binary file — download to view.</div>
                        `}
                    `}
                    ${b&&q`
                        <div class="workspace-download-card">
                            <${o8} mediaId=${b} />
                        </div>
                    `}
                </div>
            `}
            ${__&&q`
                <div class="workspace-drag-ghost" ref=${I0}>${__.label}</div>
            `}
        </aside>
    `}function z4({tabs:_,activeId:$,onActivate:J,onClose:Z,onCloseOthers:X,onCloseAll:Y,onTogglePin:j,onTogglePreview:G,previewTabs:V,onToggleDock:W,dockVisible:Q}){let[F,D]=R(null),L=k(null);c(()=>{if(!F)return;let H=(A)=>{if(A.type==="keydown"&&A.key!=="Escape")return;D(null)};return document.addEventListener("click",H),document.addEventListener("keydown",H),()=>{document.removeEventListener("click",H),document.removeEventListener("keydown",H)}},[F]),c(()=>{let H=(A)=>{if(A.ctrlKey&&A.key==="Tab"){if(A.preventDefault(),!_.length)return;let f=_.findIndex((U)=>U.id===$);if(A.shiftKey){let U=_[(f-1+_.length)%_.length];J?.(U.id)}else{let U=_[(f+1)%_.length];J?.(U.id)}return}if((A.ctrlKey||A.metaKey)&&A.key==="w"){let f=document.querySelector(".editor-pane");if(f&&f.contains(document.activeElement)){if(A.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[_,$,J,Z]);let E=I((H,A)=>{if(H.button===1){H.preventDefault(),Z?.(A);return}if(H.button===0)J?.(A)},[J,Z]),M=I((H,A)=>{H.preventDefault(),D({id:A,x:H.clientX,y:H.clientY})},[]),b=I((H,A)=>{H.stopPropagation(),Z?.(A)},[Z]);if(c(()=>{if(!$||!L.current)return;let H=L.current.querySelector(".tab-item.active");if(H)H.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return q`
        <div class="tab-strip" ref=${L} role="tablist">
            ${_.map((H)=>q`
                <div
                    key=${H.id}
                    class=${`tab-item${H.id===$?" active":""}${H.dirty?" dirty":""}${H.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${H.id===$}
                    title=${H.path}
                    onMouseDown=${(A)=>E(A,H.id)}
                    onContextMenu=${(A)=>M(A,H.id)}
                >
                    ${H.pinned&&q`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${H.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(A)=>b(A,H.id)}
                        title=${H.dirty?"Unsaved changes":"Close"}
                        aria-label=${H.dirty?"Unsaved changes":`Close ${H.label}`}
                    >
                        ${H.dirty?q`<span class="tab-dirty-dot" aria-hidden="true"></span>`:q`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </span>
                </div>
            `)}
            ${W&&q`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${Q?" active":""}`}
                    onClick=${W}
                    title=${`${Q?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${Q?"Hide":"Show"} terminal`}
                    aria-pressed=${Q?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${F&&q`
            <div class="tab-context-menu" style=${{left:F.x+"px",top:F.y+"px"}}>
                <button onClick=${()=>{Z?.(F.id),D(null)}}>Close</button>
                <button onClick=${()=>{X?.(F.id),D(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),D(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(F.id),D(null)}}>
                    ${_.find((H)=>H.id===F.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${G&&/\.(md|mdx|markdown)$/i.test(F.id)&&q`
                    <hr />
                    <button onClick=${()=>{G(F.id),D(null)}}>
                        ${V?.has(F.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var n8=400,y1=60,H4=220,k1="mdPreviewHeight";function d8(){try{let _=localStorage.getItem(k1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=y1?$:H4}catch{return H4}}function U4({getContent:_,path:$,onClose:J}){let[Z,X]=R(""),[Y,j]=R(d8),G=k(null),V=k(null),W=k(""),Q=k(_);return Q.current=_,c(()=>{let L=()=>{let M=Q.current?.()||"";if(M===W.current)return;W.current=M;try{let b=j2(M,null,{sanitize:!1});X(b)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};L();let E=setInterval(L,n8);return()=>clearInterval(E)},[]),c(()=>{if(G.current&&Z)g2(G.current).catch(()=>{})},[Z]),q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(L)=>{L.preventDefault();let E=L.clientY,M=V.current?.offsetHeight||Y,b=V.current?.parentElement,H=b?b.offsetHeight*0.7:500,A=L.currentTarget;A.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let f=(T)=>{let s=Math.min(Math.max(M-(T.clientY-E),y1),H);j(s)},U=()=>{A.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(k1,String(Math.round(V.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",U)};document.addEventListener("mousemove",f),document.addEventListener("mouseup",U)}}
            onTouchStart=${(L)=>{L.preventDefault();let E=L.touches[0];if(!E)return;let M=E.clientY,b=V.current?.offsetHeight||Y,H=V.current?.parentElement,A=H?H.offsetHeight*0.7:500,f=L.currentTarget;f.classList.add("dragging"),document.body.style.userSelect="none";let U=(s)=>{let d=s.touches[0];if(!d)return;s.preventDefault();let Z_=Math.min(Math.max(b-(d.clientY-M),y1),A);j(Z_)},T=()=>{f.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(k1,String(Math.round(V.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",U),document.removeEventListener("touchend",T),document.removeEventListener("touchcancel",T)};document.addEventListener("touchmove",U,{passive:!1}),document.addEventListener("touchend",T),document.addEventListener("touchcancel",T)}}
        ></div>
        <div class="md-preview-panel" ref=${V} style=${{height:Y+"px"}}>
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
    `}class F4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let X=Z.canHandle(_);if(X===!1||X===0)continue;let Y=X===!0?0:typeof X==="number"?X:0;if(Y>J)J=Y,$=Z}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var Y0=new F4;var i2=null,A1=null;function L4(){if(A1)return Promise.resolve(A1);if(!i2)i2=import("/static/dist/editor.bundle.js").then((_)=>{return A1=_,_}).catch((_)=>{throw i2=null,_});return i2}class E4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await L4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var w1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;return 1},mount(_,$){return new E4(_,$)}};function M1(){L4().catch(()=>{})}class D4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Z=document.createElement("span");Z.className="terminal-pane-title",Z.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",J.append(Z,X);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var P1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new D4(_,$)}};class C4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=J||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var E_=new C4;function y4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){c(()=>{J();let Z=new O1(_,$);Z.connect();let X=()=>{Z.reconnectIfNeeded()};return window.addEventListener("focus",X),document.addEventListener("visibilitychange",X),()=>{window.removeEventListener("focus",X),document.removeEventListener("visibilitychange",X),Z.disconnect()}},[$,_,J])}function k4(){let[_,$]=R(!1),[J,Z]=R("default"),X=k(!1);c(()=>{let V=Z2("notificationsEnabled",!1);if(X.current=V,$(V),typeof Notification<"u")Z(Notification.permission)},[]),c(()=>{X.current=_},[_]);let Y=I(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let V=Notification.requestPermission();if(V&&typeof V.then==="function")return V;return Promise.resolve(V)}catch{return Promise.resolve("default")}},[]),j=I(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let W=await Y();if(Z(W||"default"),W!=="granted"){X.current=!1,$(!1),T_("notificationsEnabled","false");return}}let V=!X.current;X.current=V,$(V),T_("notificationsEnabled",String(V))},[Y]),G=I((V,W)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let Q=new Notification(V,{body:W});return Q.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:j,notify:G}}var H2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function A4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Z]=R(null),[X,Y]=R(!1),j=k(!1),G=k(null),V=k(!1),W=k(null);c(()=>{j.current=X},[X]);let Q=I(async(L=null)=>{try{if(L){let E=await G3(L);Z(E.posts),Y(!1)}else{let E=await I2(10);Z(E.posts),Y(E.has_more)}}catch(E){console.error("Failed to load posts:",E)}},[]),F=I(async()=>{try{let L=await I2(10);Z((E)=>{if(!E||E.length===0)return L.posts;return H2([...L.posts,...E])}),Y((E)=>E||L.has_more)}catch(L){console.error("Failed to refresh timeline:",L)}},[]),D=I(async(L={})=>{if(!J||J.length===0)return;if(V.current)return;let{preserveScroll:E=!0,preserveMode:M="top",allowRepeat:b=!1}=L,H=(U)=>{if(!E){U();return}if(M==="top")$(U);else _(U)},f=J.slice().sort((U,T)=>U.id-T.id)[0]?.id;if(!Number.isFinite(f))return;if(!b&&W.current===f)return;V.current=!0,W.current=f;try{let U=await I2(10,f);if(U.posts.length>0)H(()=>{Z((T)=>H2([...U.posts,...T||[]])),Y(U.has_more)});else Y(!1)}catch(U){console.error("Failed to load more posts:",U)}finally{V.current=!1}},[J,_,$]);return c(()=>{G.current=D},[D]),{posts:J,setPosts:Z,hasMore:X,setHasMore:Y,hasMoreRef:j,loadPosts:Q,refreshTimeline:F,loadMore:D,loadMoreRef:G,loadingMoreRef:V,lastBeforeIdRef:W}}function w4(){let[_,$]=R(null),[J,Z]=R({text:"",totalLines:0}),[X,Y]=R(""),[j,G]=R({text:"",totalLines:0}),[V,W]=R(null),[Q,F]=R(null),[D,L]=R(null),E=k(null),M=k(0),b=k(!1),H=k(""),A=k(""),f=k(null),U=k(null),T=k(null),s=k(null),d=k(!1),Z_=k(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Z,agentPlan:X,setAgentPlan:Y,agentThought:j,setAgentThought:G,pendingRequest:V,setPendingRequest:W,currentTurnId:Q,setCurrentTurnId:F,steerQueuedTurnId:D,setSteerQueuedTurnId:L,lastAgentEventRef:E,lastSilenceNoticeRef:M,isAgentRunningRef:b,draftBufferRef:H,thoughtBufferRef:A,pendingRequestRef:f,stalledPostIdRef:U,currentTurnIdRef:T,steerQueuedTurnIdRef:s,thoughtExpandedRef:d,draftExpandedRef:Z_}}function M4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Z}){let X=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.clientX,L=$.current||280,E=Q.currentTarget;E.classList.add("dragging"),F.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=D,b=(A)=>{M=A.clientX;let f=Math.min(Math.max(L+(A.clientX-D),160),600);F.style.setProperty("--sidebar-width",`${f}px`),$.current=f},H=()=>{let A=Math.min(Math.max(L+(M-D),160),600);$.current=A,E.classList.remove("dragging"),F.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",T_("sidebarWidth",String(Math.round(A))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",H)}).current,Y=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.touches[0];if(!D)return;let L=D.clientX,E=$.current||280,M=Q.currentTarget;M.classList.add("dragging"),F.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let b=(A)=>{let f=A.touches[0];if(!f)return;A.preventDefault();let U=Math.min(Math.max(E+(f.clientX-L),160),600);F.style.setProperty("--sidebar-width",`${U}px`),$.current=U},H=()=>{M.classList.remove("dragging"),F.classList.remove("sidebar-resizing"),document.body.style.userSelect="",T_("sidebarWidth",String(Math.round($.current||E))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current,j=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.clientX,L=J.current||$.current||280,E=Q.currentTarget;E.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=D,b=(A)=>{M=A.clientX;let f=Math.min(Math.max(L+(A.clientX-D),200),800);F.style.setProperty("--editor-width",`${f}px`),J.current=f},H=()=>{let A=Math.min(Math.max(L+(M-D),200),800);J.current=A,E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("editorWidth",String(Math.round(A))),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",H)}).current,G=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.touches[0];if(!D)return;let L=D.clientX,E=J.current||$.current||280,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let b=(A)=>{let f=A.touches[0];if(!f)return;A.preventDefault();let U=Math.min(Math.max(E+(f.clientX-L),200),800);F.style.setProperty("--editor-width",`${U}px`),J.current=U},H=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",T_("editorWidth",String(Math.round(J.current||E))),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current,V=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.clientY,L=Z?.current||200,E=Q.currentTarget;E.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=D,b=(A)=>{M=A.clientY;let f=Math.min(Math.max(L-(A.clientY-D),100),window.innerHeight*0.5);if(F.style.setProperty("--dock-height",`${f}px`),Z)Z.current=f},H=()=>{let A=Math.min(Math.max(L-(M-D),100),window.innerHeight*0.5);if(Z)Z.current=A;E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",T_("dockHeight",String(Math.round(A))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",b),document.addEventListener("mouseup",H)}).current,W=k((Q)=>{Q.preventDefault();let F=_.current;if(!F)return;let D=Q.touches[0];if(!D)return;let L=D.clientY,E=Z?.current||200,M=Q.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let b=(A)=>{let f=A.touches[0];if(!f)return;A.preventDefault();let U=Math.min(Math.max(E-(f.clientY-L),100),window.innerHeight*0.5);if(F.style.setProperty("--dock-height",`${U}px`),Z)Z.current=U},H=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",T_("dockHeight",String(Math.round(Z?.current||E))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",H),document.removeEventListener("touchcancel",H)};document.addEventListener("touchmove",b,{passive:!1}),document.addEventListener("touchend",H),document.addEventListener("touchcancel",H)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:G,handleDockSplitterMouseDown:V,handleDockSplitterTouchStart:W}}function P4({onTabClosed:_}={}){let $=k(_);$.current=_;let[J,Z]=R(()=>E_.getTabs()),[X,Y]=R(()=>E_.getActiveId()),[j,G]=R(()=>E_.getTabs().length>0);c(()=>{return E_.onChange((U,T)=>{Z(U),Y(T),G(U.length>0)})},[]);let[V,W]=R(()=>new Set),Q=I((U)=>{W((T)=>{let s=new Set(T);if(s.has(U))s.delete(U);else s.add(U);return s})},[]),F=I((U)=>{W((T)=>{if(!T.has(U))return T;let s=new Set(T);return s.delete(U),s})},[]),D=I((U)=>{if(!U)return;let T={path:U,mode:"edit"};try{if(!Y0.resolve(T)){if(!Y0.get("editor")){console.warn(`[openEditor] No pane handler for: ${U}`);return}}}catch(s){console.warn(`[openEditor] paneRegistry.resolve() error for "${U}":`,s)}E_.open(U)},[]),L=I(()=>{let U=E_.getActiveId();if(U){let T=E_.get(U);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(U),F(U),$.current?.(U)}},[F]),E=I((U)=>{let T=E_.get(U);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(U),F(U),$.current?.(U)},[F]),M=I((U)=>{E_.activate(U)},[]),b=I((U)=>{let T=E_.getTabs().filter((Z_)=>Z_.id!==U&&!Z_.pinned),s=T.filter((Z_)=>Z_.dirty).length;if(s>0){if(!window.confirm(`${s} unsaved tab${s>1?"s":""} will be closed. Continue?`))return}let d=T.map((Z_)=>Z_.id);E_.closeOthers(U),d.forEach((Z_)=>{F(Z_),$.current?.(Z_)})},[F]),H=I(()=>{let U=E_.getTabs().filter((d)=>!d.pinned),T=U.filter((d)=>d.dirty).length;if(T>0){if(!window.confirm(`${T} unsaved tab${T>1?"s":""} will be closed. Continue?`))return}let s=U.map((d)=>d.id);E_.closeAll(),s.forEach((d)=>{F(d),$.current?.(d)})},[F]),A=I((U)=>{E_.togglePin(U)},[]),f=I(()=>{let U=E_.getActiveId();if(U)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:U}}))},[]);return c(()=>{let U=(T)=>{let{oldPath:s,newPath:d,type:Z_}=T.detail||{};if(!s||!d)return;if(Z_==="dir"){for(let Q_ of E_.getTabs())if(Q_.path===s||Q_.path.startsWith(`${s}/`)){let e=`${d}${Q_.path.slice(s.length)}`;E_.rename(Q_.id,e)}}else E_.rename(s,d)};return window.addEventListener("workspace-file-renamed",U),()=>window.removeEventListener("workspace-file-renamed",U)},[]),c(()=>{let U=(T)=>{if(E_.hasUnsaved())T.preventDefault(),T.returnValue=""};return window.addEventListener("beforeunload",U),()=>window.removeEventListener("beforeunload",U)},[]),{editorOpen:j,tabStripTabs:J,tabStripActiveId:X,previewTabs:V,openEditor:D,closeEditor:L,handleTabClose:E,handleTabActivate:M,handleTabCloseOthers:b,handleTabCloseAll:H,handleTabTogglePin:A,handleTabTogglePreview:Q,revealInExplorer:f}}function I1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=J[_]??window[Z],Y=Number(X);return Number.isFinite(Y)?Y:$}catch{return $}}var b1=I1("warning",30000),I4=I1("finalize",120000),b4=I1("refresh",30000),S4=30000;function x4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function T4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function f4(_=30000){let[,$]=R(0);c(()=>{let J=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(J)},[_])}function l2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Z,X)=>Z+Math.max(1,Math.ceil(X.length/$)),0)}function g4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var r8=V3,v4=O3,s8=N3,R4=H3,u4=U3,m4=q3,S1=typeof K1==="function"?K1:g4("getAgentContext",null),a8=typeof l0==="function"?l0:g4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});Y0.register(w1);M1();var t8=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(t8)Y0.register(P1);function e8(){let[_,$]=R("disconnected"),[J,Z]=R(null),[X,Y]=R(null),[j,G]=R(!1),[V,W]=R([]),[Q,F]=R([]),[D,L]=R(null),{agentStatus:E,setAgentStatus:M,agentDraft:b,setAgentDraft:H,agentPlan:A,setAgentPlan:f,agentThought:U,setAgentThought:T,pendingRequest:s,setPendingRequest:d,currentTurnId:Z_,setCurrentTurnId:Q_,steerQueuedTurnId:e,setSteerQueuedTurnId:Y_,lastAgentEventRef:a,lastSilenceNoticeRef:h,isAgentRunningRef:__,draftBufferRef:o,thoughtBufferRef:t,pendingRequestRef:z_,stalledPostIdRef:q_,currentTurnIdRef:g,steerQueuedTurnIdRef:V_,thoughtExpandedRef:G_,draftExpandedRef:W_}=w4(),[y_,O_]=R({}),[H_,w_]=R(null),[F_,D_]=R(null),[u_,C_]=R(!1),[p_,X0]=R(null),[U_,M_]=R(null),{notificationsEnabled:_0,notificationPermission:O0,toggleNotifications:Q0,notify:N0}=k4(),[q0,I_]=R(()=>new Set),[m_,a_]=R(()=>Z2("workspaceOpen",!0)),h_=k(null),{editorOpen:f_,tabStripTabs:P,tabStripActiveId:r,previewTabs:b_,openEditor:c_,closeEditor:r_,handleTabClose:F0,handleTabActivate:C0,handleTabCloseOthers:j0,handleTabCloseAll:i_,handleTabTogglePin:y0,handleTabTogglePreview:B0,revealInExplorer:I0}=P4({onTabClosed:(O)=>h_.current?.(O)}),$0=k(null),s_=k(null);c(()=>{let O=$0.current;if(!O)return;if(s_.current)s_.current.dispose(),s_.current=null;let N=r;if(!N)return;let w={path:N,mode:"edit"},x=Y0.resolve(w)||Y0.get("editor");if(!x){O.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let m=x.mount(O,w);s_.current=m,m.onDirtyChange?.((i)=>{E_.setDirty(N,i)}),m.onSaveRequest?.(()=>{}),m.onClose?.(()=>{r_()});let S=E_.getViewState(N);if(S&&typeof m.restoreViewState==="function")requestAnimationFrame(()=>m.restoreViewState(S));if(typeof m.onViewStateChange==="function")m.onViewStateChange((i)=>{E_.saveViewState(N,i)});return requestAnimationFrame(()=>m.focus()),()=>{if(s_.current===m)m.dispose(),s_.current=null}},[r,r_]);let[k0,l_]=R({name:"You",avatar_url:null,avatar_background:null}),K0=k(!1),J0=k(!1),b0=k({}),S0=k({name:null,avatar_url:null}),z0=k({currentHashtag:null,searchQuery:null}),L0=k(null),x_=k(null),H0=k(0),G0=k(0),v_=k(0),R_=k(null),o_=k(null),Z0=k(null),A0=k(0),E0=k({title:null,avatarBase:null}),x0=k(null),t_=I(()=>{if(x0.current)clearTimeout(x0.current),x0.current=null;L(null)},[]);f4(30000),c(()=>{return f3()},[]),c(()=>{T_("workspaceOpen",String(m_))},[m_]),c(()=>{return()=>{t_()}},[t_]),c(()=>{b0.current=y_||{}},[y_]),c(()=>{S0.current=k0||{name:"You",avatar_url:null,avatar_background:null}},[k0]);let u0=I((O,N,w=null)=>{if(typeof document>"u")return;let x=(O||"").trim()||"PiClaw";if(E0.current.title!==x){document.title=x;let S_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(S_&&S_.getAttribute("content")!==x)S_.setAttribute("content",x);E0.current.title=x}let m=document.getElementById("dynamic-favicon");if(!m)return;let S=m.getAttribute("data-default")||m.getAttribute("href")||"/favicon.ico",i=N||S,N_=N?`${i}|${w||""}`:i;if(E0.current.avatarBase!==N_){let S_=N?`${i}${i.includes("?")?"&":"?"}v=${w||Date.now()}`:i;m.setAttribute("href",S_),E0.current.avatarBase=N_}},[]),p0=I((O)=>{if(!O)return;W((N)=>N.includes(O)?N:[...N,O])},[]),h0=I((O)=>{W((N)=>N.filter((w)=>w!==O))},[]);h_.current=h0;let n0=I(()=>{W([])},[]),w0=I((O,N=null,w=3000)=>{t_(),L({title:O,detail:N||null}),x0.current=setTimeout(()=>{L((x)=>x?.title===O?null:x)},w)},[t_]),z=I((O)=>{if(typeof O!=="string")return;let N=O.trim();if(!N){w0("No file selected","Use a valid file path from a file pill.");return}if(!f_){w0("Editor pane is not open","Open the editor pane to open files from pills.");return}if(/^[a-z][a-z0-9+.-]*:/i.test(N)){w0("Cannot open external path from file pill","Use an in-workspace file path.");return}let x={path:N,mode:"edit"};if(!Y0.resolve(x)){w0("No editor available",`No editor can open: ${N}`);return}c_(N)},[f_,c_,w0]),v=I(()=>{let O=r;if(O)p0(O)},[r,p0]),l=I((O)=>{if(!O)return;F((N)=>N.includes(O)?N:[...N,O])},[]),X_=I(async(O)=>{let N=(x)=>{x.scrollIntoView({behavior:"smooth",block:"center"}),x.classList.add("post-highlight"),setTimeout(()=>x.classList.remove("post-highlight"),2000)},w=document.getElementById("post-"+O);if(w){N(w);return}try{let m=(await W3(O))?.thread?.[0];if(!m)return;n_((S)=>{if(!S)return[m];if(S.some((i)=>i.id===m.id))return S;return[...S,m]}),requestAnimationFrame(()=>{setTimeout(()=>{let S=document.getElementById("post-"+O);if(S)N(S)},50)})}catch(x){console.error("[scrollToMessage] Failed to fetch message",O,x)}},[]),L_=I((O)=>{F((N)=>N.filter((w)=>w!==O))},[]),k_=I(()=>{F([])},[]),B_=I((O={})=>{let N=Date.now();if(a.current=N,O.running)__.current=!0;if(O.clearSilence)h.current=0},[]),g_=I(()=>{if(Z0.current)clearTimeout(Z0.current),Z0.current=null;A0.current=0},[]);c(()=>()=>{g_()},[g_]);let V0=I(()=>{g_(),M((O)=>{if(!O)return O;if(!(O.last_activity||O.lastActivity))return O;let{last_activity:N,lastActivity:w,...x}=O;return x})},[g_]),T0=I((O)=>{if(!O)return;g_();let N=Date.now();A0.current=N,M({type:O.type||"active",last_activity:!0}),Z0.current=setTimeout(()=>{if(A0.current!==N)return;M((w)=>{if(!w||!(w.last_activity||w.lastActivity))return w;return null})},S4)},[g_]),A_=I(()=>{__.current=!1,a.current=null,h.current=0,o.current="",t.current="",z_.current=null,o_.current=null,g.current=null,V_.current=null,g_(),Q_(null),Y_(null),G_.current=!1,W_.current=!1},[g_,Q_,Y_]),P_=I((O)=>{if(!O)return;if(g.current===O)return;g.current=O,Q_(O),V_.current=null,Y_(null),o.current="",t.current="",H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),z_.current=null,o_.current=null,G_.current=!1,W_.current=!1},[Q_,Y_]),D0=I((O)=>{if(typeof document<"u"){let S_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&S_)return}let N=o_.current;if(!N||!N.post)return;if(O&&N.turnId&&N.turnId!==O)return;let w=N.post;if(w.id&&R_.current===w.id)return;let x=String(w?.data?.content||"").trim();if(!x)return;R_.current=w.id||R_.current,o_.current=null;let m=x.replace(/\s+/g," ").slice(0,200),S=b0.current||{},N_=(w?.data?.agent_id?S[w.data.agent_id]:null)?.name||"Pi";N0(N_,m)},[N0]),K2=I(async(O,N)=>{if(O!=="thought"&&O!=="draft")return;let w=g.current;if(O==="thought"){if(G_.current=N,w)try{await u4(w,"thought",N)}catch(x){console.warn("Failed to update thought visibility:",x)}if(!N)return;try{let x=w?await R4(w,"thought"):null;if(x?.text)t.current=x.text;T((m)=>({...m||{text:"",totalLines:0},fullText:t.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full thought:",x)}return}if(W_.current=N,w)try{await u4(w,"draft",N)}catch(x){console.warn("Failed to update draft visibility:",x)}if(!N)return;try{let x=w?await R4(w,"draft"):null;if(x?.text)o.current=x.text;H((m)=>({...m||{text:"",totalLines:0},fullText:o.current||m?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:m?.totalLines||0}))}catch(x){console.warn("Failed to fetch full draft:",x)}},[]),G2=k(null),f0=I(()=>{if(L0.current)L0.current.scrollTop=0},[]);G2.current=f0;let V2=I((O)=>{let N=L0.current;if(!N||typeof O!=="function"){O?.();return}let{currentHashtag:w,searchQuery:x}=z0.current||{},m=!(x&&!w),S=m?N.scrollHeight-N.scrollTop:N.scrollTop;O(),requestAnimationFrame(()=>{let i=L0.current;if(!i)return;if(m){let N_=Math.max(i.scrollHeight-S,0);i.scrollTop=N_}else{let N_=Math.max(i.scrollHeight-i.clientHeight,0),S_=Math.min(S,N_);i.scrollTop=S_}})},[]),i0=I((O)=>{let N=L0.current;if(!N||typeof O!=="function"){O?.();return}let w=N.scrollTop;O(),requestAnimationFrame(()=>{let x=L0.current;if(!x)return;let m=Math.max(x.scrollHeight-x.clientHeight,0);x.scrollTop=Math.min(w,m)})},[]),{posts:m0,setPosts:n_,hasMore:o2,setHasMore:n2,hasMoreRef:U2,loadPosts:M0,refreshTimeline:P0,loadMore:d0,loadMoreRef:F2}=A4({preserveTimelineScroll:V2,preserveTimelineScrollTop:i0}),r0=I(()=>{let O=q_.current;if(!O)return;n_((N)=>N?N.filter((w)=>w.id!==O):N),q_.current=null},[n_]),{handleSplitterMouseDown:d2,handleSplitterTouchStart:s0,handleEditorSplitterMouseDown:r2,handleEditorSplitterTouchStart:s2,handleDockSplitterMouseDown:a2,handleDockSplitterTouchStart:t2}=M4({appShellRef:x_,sidebarWidthRef:H0,editorWidthRef:G0,dockHeightRef:v_}),a0=I(()=>{if(!__.current)return;__.current=!1,h.current=0,a.current=null,g.current=null,Q_(null),G_.current=!1,W_.current=!1;let O=(o.current||"").trim();if(o.current="",t.current="",H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),z_.current=null,o_.current=null,!O){M({type:"error",title:"Response stalled — No content received"});return}let w=`${O}${`

⚠️ Response may be incomplete — the model stopped responding`}`,x=Date.now(),m=new Date().toISOString(),S={id:x,timestamp:m,data:{type:"agent_response",content:w,agent_id:"default",is_local_stall:!0}};q_.current=x,n_((i)=>i?H2([...i,S]):[S]),G2.current?.(),M(null)},[Q_]);c(()=>{z0.current={currentHashtag:J,searchQuery:X}},[J,X]),c(()=>{let O=Math.min(1000,Math.max(100,Math.floor(b1/2))),N=setInterval(()=>{if(!__.current)return;if(z_.current)return;let w=a.current;if(!w)return;let x=Date.now(),m=x-w;if(m>=I4){a0();return}if(m>=b1){if(x-h.current>=b4){let S=Math.floor(m/1000);M({type:"waiting",title:`Waiting for model… No events for ${S}s`}),h.current=x}}},O);return()=>clearInterval(N)},[a0]);let W2=I(async()=>{try{let O=await S1();if(O)M_(O)}catch(O){console.warn("Failed to fetch agent context:",O)}},[]),K=I(async()=>{try{let O=await m4("web:default");if(!O||O.status!=="active"||!O.data){if(J0.current){let{currentHashtag:x,searchQuery:m}=z0.current||{};if(!x&&!m)P0()}J0.current=!1,A_(),M(null),H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),z_.current=null;return}J0.current=!0;let N=O.data,w=N.turn_id||N.turnId;if(w)P_(w);if(B_({running:!0,clearSilence:!0}),V0(),M(N),O.thought&&O.thought.text)T((x)=>{if(x&&x.text&&x.text.length>=O.thought.text.length)return x;return t.current=O.thought.text,{text:O.thought.text,totalLines:O.thought.totalLines||0}});if(O.draft&&O.draft.text)H((x)=>{if(x&&x.text&&x.text.length>=O.draft.text.length)return x;return o.current=O.draft.text,{text:O.draft.text,totalLines:O.draft.totalLines||0}})}catch(O){console.warn("Failed to fetch agent status:",O)}},[A_,V0,B_,P0,P_]),B=I((O)=>{if($(O),O!=="connected"){M(null),H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),z_.current=null,A_();return}if(!K0.current){K0.current=!0,K();return}let{currentHashtag:N,searchQuery:w}=z0.current;if(!N&&!w)P0();K()},[A_,P0,K]),y=I(async(O)=>{Z(O),n_(null),await M0(O)},[M0]),C=I(async()=>{Z(null),Y(null),n_(null),await M0()},[M0]),u=I(async(O)=>{if(!O||!O.trim())return;Y(O.trim()),Z(null),n_(null);try{let N=await r8(O.trim());n_(N.results),n2(!1)}catch(N){console.error("Failed to search:",N),n_([])}},[]),p=I(()=>{G(!0),Y(null),Z(null),n_([])},[]),$_=I(()=>{G(!1),Y(null),M0()},[M0]),J_=I(()=>{},[]),n=I(async(O)=>{if(!O)return;let N=O.id,w=m0?.filter((m)=>m?.data?.thread_id===N&&m?.id!==N).length||0;if(w>0){if(!window.confirm(`Delete this message and its ${w} replies?`))return}let x=(m)=>{if(!m.length)return;I_((i)=>{let N_=new Set(i);return m.forEach((S_)=>N_.add(S_)),N_}),setTimeout(()=>{if(i0(()=>{n_((i)=>i?i.filter((N_)=>!m.includes(N_.id)):i)}),I_((i)=>{let N_=new Set(i);return m.forEach((S_)=>N_.delete(S_)),N_}),U2.current)F2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let m=await v4(N,w>0);if(m?.ids?.length)x(m.ids)}catch(m){let S=m?.message||"";if(w===0&&S.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let N_=await v4(N,!0);if(N_?.ids?.length)x(N_.ids);return}console.error("Failed to delete post:",m),alert(`Failed to delete message: ${S}`)}},[m0,i0]),j_=I(async()=>{try{let O=await s8();O_(x4(O));let N=O?.user||{};l_((x)=>{let m=typeof N.name==="string"&&N.name.trim()?N.name.trim():"You",S=typeof N.avatar_url==="string"?N.avatar_url.trim():null,i=typeof N.avatar_background==="string"&&N.avatar_background.trim()?N.avatar_background.trim():null;if(x.name===m&&x.avatar_url===S&&x.avatar_background===i)return x;return{name:m,avatar_url:S,avatar_background:i}});let w=(O?.agents||[]).find((x)=>x.id==="default");if(w?.model)w_(w.model);u0(w?.name,w?.avatar_url)}catch(O){console.warn("Failed to load agents:",O)}try{let O=await S1();if(O)M_(O)}catch{}},[u0]);c(()=>{j_();let O=Y2("sidebarWidth",null),N=Number.isFinite(O)?Math.min(Math.max(O,160),600):280;if(H0.current=N,x_.current)x_.current.style.setProperty("--sidebar-width",`${N}px`)},[j_]);let W0=I((O)=>{if(!O||typeof O!=="object")return;let N=O.agent_id;if(!N)return;let{agent_name:w,agent_avatar:x}=O;if(!w&&x===void 0)return;let m=b0.current?.[N]||{id:N},S=m.name||null,i=m.avatar_url??m.avatarUrl??m.avatar??null,N_=!1,S_=!1;if(w&&w!==m.name)S=w,S_=!0;if(x!==void 0){let e0=typeof x==="string"?x.trim():null,x1=typeof i==="string"?i.trim():null,_2=e0||null;if(_2!==(x1||null))i=_2,N_=!0}if(!S_&&!N_)return;if(O_((e0)=>{let _2={...e0[N]||{id:N}};if(S_)_2.name=S;if(N_)_2.avatar_url=i;return{...e0,[N]:_2}}),N==="default")u0(S,i,N_?Date.now():null)},[u0]),e_=I((O)=>{if(!O||typeof O!=="object")return;let N=O.user_name??O.userName,w=O.user_avatar??O.userAvatar,x=O.user_avatar_background??O.userAvatarBackground;if(N===void 0&&w===void 0&&x===void 0)return;l_((m)=>{let S=typeof N==="string"&&N.trim()?N.trim():m.name||"You",i=w===void 0?m.avatar_url:typeof w==="string"&&w.trim()?w.trim():null,N_=x===void 0?m.avatar_background:typeof x==="string"&&x.trim()?x.trim():null;if(m.name===S&&m.avatar_url===i&&m.avatar_background===N_)return m;return{name:S,avatar_url:i,avatar_background:N_}})},[]),e2=I((O)=>{if(!O||typeof O!=="object")return;let N=O.model??O.current;if(N!==void 0)w_(N);if(O.thinking_level!==void 0)D_(O.thinking_level??null);if(O.supports_thinking!==void 0)C_(Boolean(O.supports_thinking));if(O.provider_usage!==void 0)X0(O.provider_usage??null)},[]),O2=I(()=>{a8().then((O)=>{if(O)e2(O)}).catch(()=>{})},[e2]);c(()=>{O2();let O=setInterval(()=>{O2()},60000);return()=>clearInterval(O)},[O2]);let _1=I((O,N)=>{let w=N?.turn_id;if(W0(N),e_(N),O==="ui_theme"){v3(N);return}if(O?.startsWith("agent_"))V0();if(O==="connected"){M(null),H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),z_.current=null,A_(),m4("web:default").then((S)=>{if(!S||S.status!=="active"||!S.data)return;let i=S.data,N_=i.turn_id||i.turnId;if(N_)P_(N_);if(B_({clearSilence:!0}),T0(i),S.thought&&S.thought.text)t.current=S.thought.text,T({text:S.thought.text,totalLines:S.thought.totalLines||0});if(S.draft&&S.draft.text)o.current=S.draft.text,H({text:S.draft.text,totalLines:S.draft.totalLines||0})}).catch((S)=>{console.warn("Failed to fetch agent status:",S)}),O2();return}if(O==="agent_status"){if(N.type==="done"||N.type==="error"){if(w&&g.current&&w!==g.current)return;if(N.type==="done"){D0(w||g.current);let{currentHashtag:S,searchQuery:i}=z0.current||{};if(!S&&!i)P0();if(N.context_usage)M_(N.context_usage)}if(J0.current=!1,A_(),H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null),N.type==="error")M({type:"error",title:N.title||"Agent error"}),setTimeout(()=>M(null),8000);else M(null)}else{if(w)P_(w);if(B_({running:!0,clearSilence:!0}),N.type==="thinking")o.current="",t.current="",H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0});M(N)}return}if(O==="agent_steer_queued"){if(w&&g.current&&w!==g.current)return;let S=w||g.current;if(!S)return;V_.current=S,Y_(S);return}if(O==="agent_draft_delta"){if(w&&g.current&&w!==g.current)return;if(w&&!g.current)P_(w);if(B_({running:!0,clearSilence:!0}),N?.reset)o.current="";if(N?.delta)o.current+=N.delta;if(W_.current){let S=o.current;H((i)=>({text:i?.text||"",totalLines:l2(S),fullText:S}))}else{let S=o.current,i=l2(S);H({text:S,totalLines:i})}return}if(O==="agent_draft"){if(w&&g.current&&w!==g.current)return;if(w&&!g.current)P_(w);B_({running:!0,clearSilence:!0});let S=N.text||"",i=N.mode||(N.kind==="plan"?"replace":"append"),N_=Number.isFinite(N.total_lines)?N.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(N.kind==="plan")if(i==="replace")f(S);else f((S_)=>(S_||"")+S);else if(!W_.current)o.current=S,H({text:S,totalLines:N_});return}if(O==="agent_thought_delta"){if(w&&g.current&&w!==g.current)return;if(w&&!g.current)P_(w);if(B_({running:!0,clearSilence:!0}),N?.reset)t.current="";if(typeof N?.delta==="string")t.current+=N.delta;if(G_.current){let S=t.current;T((i)=>({text:i?.text||"",totalLines:l2(S),fullText:S}))}return}if(O==="agent_thought"){if(w&&g.current&&w!==g.current)return;if(w&&!g.current)P_(w);B_({running:!0,clearSilence:!0});let S=N.text||"",i=Number.isFinite(N.total_lines)?N.total_lines:S?S.replace(/\r\n/g,`
`).split(`
`).length:0;if(!G_.current)t.current=S,T({text:S,totalLines:i});return}if(O==="agent_request"){if(console.log("Agent request:",N),w&&g.current&&w!==g.current)return;if(w)P_(w);B_({running:!0,clearSilence:!0}),d(N),z_.current=N;return}if(O==="agent_request_timeout"){if(console.log("Agent request timeout:",N),w&&g.current&&w!==g.current)return;d(null),z_.current=null,A_(),M({type:"error",title:"Permission request timed out"});return}if(O==="model_changed"){if(N?.model!==void 0)w_(N.model);if(N?.thinking_level!==void 0)D_(N.thinking_level??null);if(N?.supports_thinking!==void 0)C_(Boolean(N.supports_thinking));S1().then((S)=>{if(S)M_(S)}).catch(()=>{});return}if(O==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:N}));return}let{currentHashtag:x,searchQuery:m}=z0.current;if(O==="agent_response")r0(),o_.current={post:N,turnId:g.current};if(!x&&!m&&(O==="new_post"||O==="agent_response"))n_((S)=>{if(!S)return[N];if(S.some((i)=>i.id===N.id))return S;return[...S,N]}),G2.current?.();if(O==="interaction_updated")n_((S)=>S?S.map((i)=>i.id===N.id?N:i):S);if(O==="interaction_deleted"){let S=N?.ids||[];if(S.length){i0(()=>{n_((S_)=>S_?S_.filter((e0)=>!S.includes(e0.id)):S_)});let{currentHashtag:i,searchQuery:N_}=z0.current;if(U2.current&&!i&&!N_)F2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[A_,V0,B_,D0,i0,P0,r0,P_,T0,W0,e_,O2]);c(()=>{if(typeof window>"u")return;let O=window.__PICLAW_TEST_API||{};return O.emit=_1,O.reset=()=>{r0(),A_(),M(null),H({text:"",totalLines:0}),f(""),T({text:"",totalLines:0}),d(null)},O.finalize=()=>a0(),window.__PICLAW_TEST_API=O,()=>{if(window.__PICLAW_TEST_API===O)window.__PICLAW_TEST_API=void 0}},[A_,a0,_1,r0]),y4({handleSseEvent:_1,handleConnectionStatusChange:B,loadPosts:M0}),c(()=>{if(!m0||m0.length===0)return;let O=location.hash;if(!O||!O.startsWith("#msg-"))return;let N=O.slice(5);X_(N),history.replaceState(null,"",location.pathname+location.search)},[m0,X_]);let $1=E!==null;c(()=>{if(_!=="connected")return;let N=setInterval(()=>{if($1)K(),W2();else{let{currentHashtag:w,searchQuery:x}=z0.current||{};if(!w&&!x)P0();K(),W2()}},$1?15000:60000);return()=>clearInterval(N)},[_,$1,K,W2,P0]);let c4=I(()=>{a_((O)=>!O)},[]);c(()=>{if(!f_)return;if(typeof window>"u")return;let O=x_.current;if(!O)return;if(!G0.current){let N=Y2("editorWidth",null),w=H0.current||280;G0.current=Number.isFinite(N)?N:w}if(O.style.setProperty("--editor-width",`${G0.current}px`),!v_.current){let N=Y2("dockHeight",null);v_.current=Number.isFinite(N)?N:200}O.style.setProperty("--dock-height",`${v_.current}px`)},[f_]);let t0=Y0.getDockPanes().length>0,[J1,p4]=R(!1),L2=I(()=>p4((O)=>!O),[]);c(()=>{if(!t0)return;let O=(N)=>{if(N.ctrlKey&&N.key==="`")N.preventDefault(),L2()};return document.addEventListener("keydown",O),()=>document.removeEventListener("keydown",O)},[L2,t0]);let h4=Boolean(e&&e===(E?.turn_id||Z_));return q`
        <div class=${`app-shell${m_?"":" workspace-collapsed"}${f_?" editor-open":""}`} ref=${x_}>
            <${B4}
                onFileSelect=${p0}
                visible=${m_}
                active=${m_||f_}
                onOpenEditor=${c_}
            />
            <button
                class=${`workspace-toggle-tab${m_?" open":" closed"}`}
                onClick=${c4}
                title=${m_?"Hide workspace":"Show workspace"}
                aria-label=${m_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${d2} onTouchStart=${s0}></div>
            ${f_&&q`
                <div class="editor-pane-container">
                    <${z4}
                        tabs=${P}
                        activeId=${r}
                        onActivate=${C0}
                        onClose=${F0}
                        onCloseOthers=${j0}
                        onCloseAll=${i_}
                        onTogglePin=${y0}
                        onTogglePreview=${B0}
                        previewTabs=${b_}
                        onToggleDock=${t0?L2:void 0}
                        dockVisible=${t0&&J1}
                    />
                    <div class="editor-pane-host" ref=${$0}></div>
                    ${r&&b_.has(r)&&q`
                        <${U4}
                            getContent=${()=>s_.current?.getContent?.()}
                            path=${r}
                            onClose=${()=>B0(r)}
                        />
                    `}
                    ${t0&&J1&&q`<div class="dock-splitter" onMouseDown=${a2} onTouchStart=${t2}></div>`}
                    ${t0&&q`<div class=${`dock-panel${J1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${L2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
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
                <div class="editor-splitter" onMouseDown=${r2} onTouchStart=${s2}></div>
            `}
            <div class="container">
                ${X&&T4()&&q`<div class="search-results-spacer"></div>`}
                ${(J||X)&&q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${C}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${J4}
                    posts=${m0}
                    hasMore=${o2}
                    onLoadMore=${d0}
                    timelineRef=${L0}
                    onHashtagClick=${y}
                    onMessageRef=${l}
                    onScrollToMessage=${X_}
                    onFileRef=${z}
                    onPostClick=${void 0}
                    onDeletePost=${n}
                    emptyMessage=${J?`No posts with #${J}`:X?`No results for "${X}"`:void 0}
                    agents=${y_}
                    user=${k0}
                    reverse=${!(X&&!J)}
                    removingPostIds=${q0}
                    searchQuery=${X}
                />
                <${s3}
                    status=${E}
                    draft=${b}
                    plan=${A}
                    thought=${U}
                    pendingRequest=${s}
                    intent=${D}
                    turnId=${Z_}
                    steerQueued=${h4}
                    onPanelToggle=${K2}
                />
                <${M3}
                    onPost=${()=>{M0(),f0()}}
                    onFocus=${f0}
                    searchMode=${j}
                    onSearch=${u}
                    onEnterSearch=${p}
                    onExitSearch=${$_}
                    fileRefs=${V}
                    onRemoveFileRef=${h0}
                    onClearFileRefs=${n0}
                    messageRefs=${Q}
                    onRemoveMessageRef=${L_}
                    onClearMessageRefs=${k_}
                    activeEditorPath=${r}
                    onAttachEditorFile=${v}
                    onOpenFilePill=${z}
                    activeModel=${H_}
                    modelUsage=${p_}
                    thinkingLevel=${F_}
                    supportsThinking=${u_}
                    contextUsage=${U_}
                    notificationsEnabled=${_0}
                    notificationPermission=${O0}
                    onToggleNotifications=${Q0}
                    onModelChange=${w_}
                    onModelStateChange=${e2}
                />
                <${t3} status=${_} />
                <${a3}
                    request=${s}
                    onRespond=${()=>{d(null),z_.current=null}}
                />
            </div>
        </div>
    `}X3(q`<${e8} />`,document.getElementById("app"));

//# debugId=7DFDCB2E96BE4A3264756E2164756E21
//# sourceMappingURL=app.bundle.js.map
