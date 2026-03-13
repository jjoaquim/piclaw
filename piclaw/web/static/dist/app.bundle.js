var _8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,J)=>(typeof require<"u"?require:$)[J]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var M2,Q_,$3,q2,J3,p1,$8,y2={},Z3=[],J8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function l0(_,$){for(var J in $)_[J]=$[J];return _}function Y3(_){var $=_.parentNode;$&&$.removeChild(_)}function j3(_,$,J){var Z,j,Y,W={};for(Y in $)Y=="key"?Z=$[Y]:Y=="ref"?j=$[Y]:W[Y]=$[Y];if(arguments.length>2&&(W.children=arguments.length>3?M2.call(arguments,2):J),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)W[Y]===void 0&&(W[Y]=_.defaultProps[Y]);return D2(_,W,Z,j,null)}function D2(_,$,J,Z,j){var Y={type:_,props:$,key:J,ref:Z,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:j==null?++$3:j};return Q_.vnode!=null&&Q_.vnode(Y),Y}function P2(_){return _.children}function k2(_,$){this.props=_,this.context=$}function Y2(_,$){if($==null)return _.__?Y2(_.__,_.__.__k.indexOf(_)+1):null;for(var J;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null)return J.__e;return typeof _.type=="function"?Y2(_):null}function X3(_){var $,J;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((J=_.__k[$])!=null&&J.__e!=null){_.__e=_.__c.base=J.__e;break}return X3(_)}}function h1(_){(!_.__d&&(_.__d=!0)&&q2.push(_)&&!A2.__r++||p1!==Q_.debounceRendering)&&((p1=Q_.debounceRendering)||J3)(A2)}function A2(){for(var _;A2.__r=q2.length;)_=q2.sort(function($,J){return $.__v.__b-J.__v.__b}),q2=[],_.some(function($){var J,Z,j,Y,W,K;$.__d&&(W=(Y=(J=$).__v).__e,(K=J.__P)&&(Z=[],(j=l0({},Y)).__v=Y.__v+1,Q1(K,Y,j,J.__n,K.ownerSVGElement!==void 0,Y.__h!=null?[W]:null,Z,W==null?Y2(Y):W,Y.__h),G3(Z,Y),Y.__e!=W&&X3(Y)))})}function W3(_,$,J,Z,j,Y,W,K,G,V){var X,U,C,L,D,M,S,z=Z&&Z.__k||Z3,y=z.length;for(J.__k=[],X=0;X<$.length;X++)if((L=J.__k[X]=(L=$[X])==null||typeof L=="boolean"?null:typeof L=="string"||typeof L=="number"||typeof L=="bigint"?D2(null,L,null,null,L):Array.isArray(L)?D2(P2,{children:L},null,null,null):L.__b>0?D2(L.type,L.props,L.key,null,L.__v):L)!=null){if(L.__=J,L.__b=J.__b+1,(C=z[X])===null||C&&L.key==C.key&&L.type===C.type)z[X]=void 0;else for(U=0;U<y;U++){if((C=z[U])&&L.key==C.key&&L.type===C.type){z[U]=void 0;break}C=null}Q1(_,L,C=C||y2,j,Y,W,K,G,V),D=L.__e,(U=L.ref)&&C.ref!=U&&(S||(S=[]),C.ref&&S.push(C.ref,null,L),S.push(U,L.__c||D,L)),D!=null?(M==null&&(M=D),typeof L.type=="function"&&L.__k!=null&&L.__k===C.__k?L.__d=G=Q3(L,G,_):G=K3(_,L,C,z,D,G),V||J.type!=="option"?typeof J.type=="function"&&(J.__d=G):_.value=""):G&&C.__e==G&&G.parentNode!=_&&(G=Y2(C))}for(J.__e=M,X=y;X--;)z[X]!=null&&(typeof J.type=="function"&&z[X].__e!=null&&z[X].__e==J.__d&&(J.__d=Y2(Z,X+1)),N3(z[X],z[X]));if(S)for(X=0;X<S.length;X++)V3(S[X],S[++X],S[++X])}function Q3(_,$,J){var Z,j;for(Z=0;Z<_.__k.length;Z++)(j=_.__k[Z])&&(j.__=_,$=typeof j.type=="function"?Q3(j,$,J):K3(J,j,j,_.__k,j.__e,$));return $}function K3(_,$,J,Z,j,Y){var W,K,G;if($.__d!==void 0)W=$.__d,$.__d=void 0;else if(J==null||j!=Y||j.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(j),W=null;else{for(K=Y,G=0;(K=K.nextSibling)&&G<Z.length;G+=2)if(K==j)break _;_.insertBefore(j,Y),W=Y}return W!==void 0?W:j.nextSibling}function i1(_,$,J){$[0]==="-"?_.setProperty($,J):_[$]=J==null?"":typeof J!="number"||J8.test($)?J:J+"px"}function C2(_,$,J,Z,j){var Y;_:if($==="style")if(typeof J=="string")_.style.cssText=J;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)J&&$ in J||i1(_.style,$,"");if(J)for($ in J)Z&&J[$]===Z[$]||i1(_.style,$,J[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=J,J?Z||_.addEventListener($,Y?o1:l1,Y):_.removeEventListener($,Y?o1:l1,Y);else if($!=="dangerouslySetInnerHTML"){if(j)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=J==null?"":J;break _}catch(W){}typeof J=="function"||(J!=null&&(J!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,J):_.removeAttribute($))}}function l1(_){this.l[_.type+!1](Q_.event?Q_.event(_):_)}function o1(_){this.l[_.type+!0](Q_.event?Q_.event(_):_)}function Q1(_,$,J,Z,j,Y,W,K,G){var V,X,U,C,L,D,M,S,z,y,u,H=$.type;if($.constructor!==void 0)return null;J.__h!=null&&(G=J.__h,K=$.__e=J.__e,$.__h=null,Y=[K]),(V=Q_.__b)&&V($);try{_:if(typeof H=="function"){if(S=$.props,z=(V=H.contextType)&&Z[V.__c],y=V?z?z.props.value:V.__:Z,J.__c?M=(X=$.__c=J.__c).__=X.__E:(("prototype"in H)&&H.prototype.render?$.__c=X=new H(S,y):($.__c=X=new k2(S,y),X.constructor=H,X.render=Y8),z&&z.sub(X),X.props=S,X.state||(X.state={}),X.context=y,X.__n=Z,U=X.__d=!0,X.__h=[]),X.__s==null&&(X.__s=X.state),H.getDerivedStateFromProps!=null&&(X.__s==X.state&&(X.__s=l0({},X.__s)),l0(X.__s,H.getDerivedStateFromProps(S,X.__s))),C=X.props,L=X.state,U)H.getDerivedStateFromProps==null&&X.componentWillMount!=null&&X.componentWillMount(),X.componentDidMount!=null&&X.__h.push(X.componentDidMount);else{if(H.getDerivedStateFromProps==null&&S!==C&&X.componentWillReceiveProps!=null&&X.componentWillReceiveProps(S,y),!X.__e&&X.shouldComponentUpdate!=null&&X.shouldComponentUpdate(S,X.__s,y)===!1||$.__v===J.__v){X.props=S,X.state=X.__s,$.__v!==J.__v&&(X.__d=!1),X.__v=$,$.__e=J.__e,$.__k=J.__k,$.__k.forEach(function(T){T&&(T.__=$)}),X.__h.length&&W.push(X);break _}X.componentWillUpdate!=null&&X.componentWillUpdate(S,X.__s,y),X.componentDidUpdate!=null&&X.__h.push(function(){X.componentDidUpdate(C,L,D)})}X.context=y,X.props=S,X.state=X.__s,(V=Q_.__r)&&V($),X.__d=!1,X.__v=$,X.__P=_,V=X.render(X.props,X.state,X.context),X.state=X.__s,X.getChildContext!=null&&(Z=l0(l0({},Z),X.getChildContext())),U||X.getSnapshotBeforeUpdate==null||(D=X.getSnapshotBeforeUpdate(C,L)),u=V!=null&&V.type===P2&&V.key==null?V.props.children:V,W3(_,Array.isArray(u)?u:[u],$,J,Z,j,Y,W,K,G),X.base=$.__e,$.__h=null,X.__h.length&&W.push(X),M&&(X.__E=X.__=null),X.__e=!1}else Y==null&&$.__v===J.__v?($.__k=J.__k,$.__e=J.__e):$.__e=Z8(J.__e,$,J,Z,j,Y,W,G);(V=Q_.diffed)&&V($)}catch(T){$.__v=null,(G||Y!=null)&&($.__e=K,$.__h=!!G,Y[Y.indexOf(K)]=null),Q_.__e(T,$,J)}}function G3(_,$){Q_.__c&&Q_.__c($,_),_.some(function(J){try{_=J.__h,J.__h=[],_.some(function(Z){Z.call(J)})}catch(Z){Q_.__e(Z,J.__v)}})}function Z8(_,$,J,Z,j,Y,W,K){var G,V,X,U=J.props,C=$.props,L=$.type,D=0;if(L==="svg"&&(j=!0),Y!=null){for(;D<Y.length;D++)if((G=Y[D])&&(G===_||(L?G.localName==L:G.nodeType==3))){_=G,Y[D]=null;break}}if(_==null){if(L===null)return document.createTextNode(C);_=j?document.createElementNS("http://www.w3.org/2000/svg",L):document.createElement(L,C.is&&C),Y=null,K=!1}if(L===null)U===C||K&&_.data===C||(_.data=C);else{if(Y=Y&&M2.call(_.childNodes),V=(U=J.props||y2).dangerouslySetInnerHTML,X=C.dangerouslySetInnerHTML,!K){if(Y!=null)for(U={},D=0;D<_.attributes.length;D++)U[_.attributes[D].name]=_.attributes[D].value;(X||V)&&(X&&(V&&X.__html==V.__html||X.__html===_.innerHTML)||(_.innerHTML=X&&X.__html||""))}if(function(M,S,z,y,u){var H;for(H in z)H==="children"||H==="key"||H in S||C2(M,H,null,z[H],y);for(H in S)u&&typeof S[H]!="function"||H==="children"||H==="key"||H==="value"||H==="checked"||z[H]===S[H]||C2(M,H,S[H],z[H],y)}(_,C,U,j,K),X)$.__k=[];else if(D=$.props.children,W3(_,Array.isArray(D)?D:[D],$,J,Z,j&&L!=="foreignObject",Y,W,Y?Y[0]:J.__k&&Y2(J,0),K),Y!=null)for(D=Y.length;D--;)Y[D]!=null&&Y3(Y[D]);K||(("value"in C)&&(D=C.value)!==void 0&&(D!==_.value||L==="progress"&&!D)&&C2(_,"value",D,U.value,!1),("checked"in C)&&(D=C.checked)!==void 0&&D!==_.checked&&C2(_,"checked",D,U.checked,!1))}return _}function V3(_,$,J){try{typeof _=="function"?_($):_.current=$}catch(Z){Q_.__e(Z,J)}}function N3(_,$,J){var Z,j;if(Q_.unmount&&Q_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!==_.__e||V3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(Y){Q_.__e(Y,$)}Z.base=Z.__P=null}if(Z=_.__k)for(j=0;j<Z.length;j++)Z[j]&&N3(Z[j],$,typeof _.type!="function");J||_.__e==null||Y3(_.__e),_.__e=_.__d=void 0}function Y8(_,$,J){return this.constructor(_,J)}function q3(_,$,J){var Z,j,Y;Q_.__&&Q_.__(_,$),j=(Z=typeof J=="function")?null:J&&J.__k||$.__k,Y=[],Q1($,_=(!Z&&J||$).__k=j3(P2,null,[_]),j||y2,y2,$.ownerSVGElement!==void 0,!Z&&J?[J]:j?null:$.firstChild?M2.call($.childNodes):null,Y,!Z&&J?J:j?j.__e:$.firstChild,Z),G3(Y,_)}M2=Z3.slice,Q_={__e:function(_,$){for(var J,Z,j;$=$.__;)if((J=$.__c)&&!J.__)try{if((Z=J.constructor)&&Z.getDerivedStateFromError!=null&&(J.setState(Z.getDerivedStateFromError(_)),j=J.__d),J.componentDidCatch!=null&&(J.componentDidCatch(_),j=J.__d),j)return J.__E=J}catch(Y){_=Y}throw _}},$3=0,k2.prototype.setState=function(_,$){var J;J=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=l0({},this.state),typeof _=="function"&&(_=_(l0({},J),this.props)),_&&l0(J,_),_!=null&&this.__v&&($&&this.__h.push($),h1(this))},k2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),h1(this))},k2.prototype.render=P2,q2=[],J3=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,A2.__r=0,$8=0;var b2,L0,n1,O2=0,X1=[],r1=Q_.__b,d1=Q_.__r,s1=Q_.diffed,a1=Q_.__c,t1=Q_.unmount;function K1(_,$){Q_.__h&&Q_.__h(L0,_,O2||$),O2=0;var J=L0.__H||(L0.__H={__:[],__h:[]});return _>=J.__.length&&J.__.push({}),J.__[_]}function f(_){return O2=1,j8(B3,_)}function j8(_,$,J){var Z=K1(b2++,2);return Z.t=_,Z.__c||(Z.__=[J?J($):B3(void 0,$),function(j){var Y=Z.t(Z.__[0],j);Z.__[0]!==Y&&(Z.__=[Y,Z.__[1]],Z.__c.setState({}))}],Z.__c=L0),Z.__}function g(_,$){var J=K1(b2++,3);!Q_.__s&&O3(J.__H,$)&&(J.__=_,J.__H=$,L0.__H.__h.push(J))}function w(_){return O2=5,b0(function(){return{current:_}},[])}function b0(_,$){var J=K1(b2++,7);return O3(J.__H,$)&&(J.__=_(),J.__H=$,J.__h=_),J.__}function b(_,$){return O2=8,b0(function(){return _},$)}function X8(){X1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(w2),_.__H.__h.forEach(W1),_.__H.__h=[]}catch($){_.__H.__h=[],Q_.__e($,_.__v)}}),X1=[]}Q_.__b=function(_){L0=null,r1&&r1(_)},Q_.__r=function(_){d1&&d1(_),b2=0;var $=(L0=_.__c).__H;$&&($.__h.forEach(w2),$.__h.forEach(W1),$.__h=[])},Q_.diffed=function(_){s1&&s1(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(X1.push($)!==1&&n1===Q_.requestAnimationFrame||((n1=Q_.requestAnimationFrame)||function(J){var Z,j=function(){clearTimeout(Y),e1&&cancelAnimationFrame(Z),setTimeout(J)},Y=setTimeout(j,100);e1&&(Z=requestAnimationFrame(j))})(X8)),L0=void 0},Q_.__c=function(_,$){$.some(function(J){try{J.__h.forEach(w2),J.__h=J.__h.filter(function(Z){return!Z.__||W1(Z)})}catch(Z){$.some(function(j){j.__h&&(j.__h=[])}),$=[],Q_.__e(Z,J.__v)}}),a1&&a1(_,$)},Q_.unmount=function(_){t1&&t1(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(w2)}catch(J){Q_.__e(J,$.__v)}};var e1=typeof requestAnimationFrame=="function";function w2(_){var $=L0;typeof _.__c=="function"&&_.__c(),L0=$}function W1(_){var $=L0;_.__c=_.__(),L0=$}function O3(_,$){return!_||_.length!==$.length||$.some(function(J,Z){return J!==_[Z]})}function B3(_,$){return typeof $=="function"?$(_):$}var z3=function(_,$,J,Z){var j;$[0]=0;for(var Y=1;Y<$.length;Y++){var W=$[Y++],K=$[Y]?($[0]|=W?1:2,J[$[Y++]]):$[++Y];W===3?Z[0]=K:W===4?Z[1]=Object.assign(Z[1]||{},K):W===5?(Z[1]=Z[1]||{})[$[++Y]]=K:W===6?Z[1][$[++Y]]+=K+"":W?(j=_.apply(K,z3(_,K,J,["",null])),Z.push(j),K[0]?$[0]|=2:($[Y-2]=0,$[Y]=j)):Z.push(K)}return Z},_3=new Map,B=function(_){var $=_3.get(this);return $||($=new Map,_3.set(this,$)),($=z3(this,$.get(_)||($.set(_,$=function(J){for(var Z,j,Y=1,W="",K="",G=[0],V=function(C){Y===1&&(C||(W=W.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?G.push(0,C,W):Y===3&&(C||W)?(G.push(3,C,W),Y=2):Y===2&&W==="..."&&C?G.push(4,C,0):Y===2&&W&&!C?G.push(5,0,!0,W):Y>=5&&((W||!C&&Y===5)&&(G.push(Y,0,W,j),Y=6),C&&(G.push(Y,C,0,j),Y=6)),W=""},X=0;X<J.length;X++){X&&(Y===1&&V(),V(X));for(var U=0;U<J[X].length;U++)Z=J[X][U],Y===1?Z==="<"?(V(),G=[G],Y=3):W+=Z:Y===4?W==="--"&&Z===">"?(Y=1,W=""):W=Z+W[0]:K?Z===K?K="":W+=Z:Z==='"'||Z==="'"?K=Z:Z===">"?(V(),Y=1):Y&&(Z==="="?(Y=5,j=W,W=""):Z==="/"&&(Y<5||J[X][U+1]===">")?(V(),Y===3&&(G=G[0]),Y=G,(G=G[0]).push(2,0,Y),Y=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(V(),Y=2):W+=Z),Y===3&&W==="!--"&&(Y=4,G=G[0])}return V(),G}(_)),$),arguments,[])).length>1?$:$[0]}.bind(j3);async function d_(_,$={}){let J=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!J.ok){let Z=await J.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function S2(_=10,$=null){let J=`/timeline?limit=${_}`;if($)J+=`&before=${$}`;return d_(J)}async function H3(_,$=50,J=0){return d_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${J}`)}async function U3(_,$=50,J=0){return d_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${J}`)}async function F3(_){return d_(`/thread/${_}`)}async function L3(_,$=!1){let J=`/post/${_}?cascade=${$?"true":"false"}`;return d_(J,{method:"DELETE"})}async function G1(_,$,J=null,Z=[]){return d_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:J,media_ids:Z})})}async function E3(){return d_("/agents")}async function C3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/status${$}`)}async function V1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/context${$}`)}async function s0(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return d_(`/agent/models${$}`)}async function D3(_){let $=new FormData;$.append("file",_);let J=await fetch("/media/upload",{method:"POST",body:$});if(!J.ok){let Z=await J.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function N1(_,$){let J=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function k3(_,$){let J=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${J.status}`)}return J.json()}async function w3(_,$="thought"){let J=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return d_(J)}async function y3(_,$,J){return d_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(J)})})}function j2(_){return`/media/${_}`}function A3(_){return`/media/${_}/thumbnail`}async function I2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function x2(_="",$=2,J=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${J?"1":"0"}`;return d_(Z)}async function M3(_,$=20000,J=null){let Z=J?`&mode=${encodeURIComponent(J)}`:"",j=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return d_(j)}async function P3(_){return d_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function q1(_,$="",J={}){let Z=new FormData;Z.append("file",_);let j=new URLSearchParams;if($)j.set("path",$);if(J.overwrite)j.set("overwrite","1");let Y=j.toString(),W=Y?`/workspace/upload?${Y}`:"/workspace/upload",K=await fetch(""+W,{method:"POST",body:Z});if(!K.ok){let G=await K.json().catch(()=>({error:"Upload failed"})),V=Error(G.error||`HTTP ${K.status}`);throw V.status=K.status,V.code=G.code,V}return K.json()}async function b3(_,$,J=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:J})});if(!Z.ok){let j=await Z.json().catch(()=>({error:"Create failed"})),Y=Error(j.error||`HTTP ${Z.status}`);throw Y.status=Z.status,Y.code=j.code,Y}return Z.json()}async function S3(_,$){let J=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Rename failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function I3(_,$){let J=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!J.ok){let Z=await J.json().catch(()=>({error:"Move failed"})),j=Error(Z.error||`HTTP ${J.status}`);throw j.status=J.status,j.code=Z.code,j}return J.json()}async function x3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return d_($,{method:"DELETE"})}async function T2(_,$=!1){return d_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function O1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function T3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class B1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,J=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,J+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-J,0),j=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},j),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function S0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function f_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function X2(_,$=!1){let J=S0(_);if(J===null)return $;return J==="true"}function W2(_,$=null){let J=S0(_);if(J===null)return $;let Z=parseInt(J,10);return Number.isFinite(Z)?Z:$}function o0({prefix:_="file",label:$,title:J,onRemove:Z,onClick:j,removeTitle:Y="Remove",icon:W="file"}){let K=`${_}-file-pill`,G=`${_}-file-name`,V=`${_}-file-remove`,X=W==="message"?B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return B`
    <span class=${K} title=${J||$} onClick=${j}>
      ${X}
      <span class=${G}>${$}</span>
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
  `}var Q8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function K8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),J=_.tokens,Z=_.contextWindow,j=J!=null?`Context: ${f3(J)} / ${f3(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,W=2*Math.PI*7,K=$/100*W,G=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return B`
        <span class="compose-context-pie icon-btn" title=${j}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${G}
                    stroke-width="2.5"
                    stroke-dasharray=${`${K} ${W}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function f3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function u3({onPost:_,onFocus:$,searchMode:J,onSearch:Z,onEnterSearch:j,onExitSearch:Y,fileRefs:W=[],onRemoveFileRef:K,onClearFileRefs:G,messageRefs:V=[],onRemoveMessageRef:X,onClearMessageRefs:U,activeModel:C=null,modelUsage:L=null,thinkingLevel:D=null,supportsThinking:M=!1,contextUsage:S=null,notificationsEnabled:z=!1,notificationPermission:y="default",onToggleNotifications:u,onModelChange:H,onModelStateChange:T,activeEditorPath:t=null,onAttachEditorFile:a,onOpenFilePill:Z_}){let[W_,$_]=f(""),[j_,e]=f(""),[i,J_]=f(!1),[o,__]=f([]),[B_,q_]=f(!1),[p,G_]=f([]),[K_,V_]=f(0),[k_,H_]=f(!1),[y_,U_]=f(!1),[C_,w_]=f(!1),[c_,l_]=f([]),[h_,I_]=f(!1),P_=w(null),W0=w(null),m_=w(null),x_=w(null),s_=w(0),V0=200,C0=(F)=>{let R=new Set,d=[];for(let X_ of F||[]){if(typeof X_!=="string")continue;let F_=X_.trim();if(!F_||R.has(F_))continue;R.add(F_),d.push(F_)}return d},D0=()=>{let F=S0("piclaw_compose_history");if(!F)return[];try{let R=JSON.parse(F);if(!Array.isArray(R))return[];return C0(R)}catch{return[]}},i_=(F)=>{f_("piclaw_compose_history",JSON.stringify(F))},L_=w(D0()),o_=w(-1),u_=w(""),P=!i&&(W_.trim()||o.length>0||W.length>0||V.length>0),n=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),D_=typeof window<"u"&&typeof Notification<"u",a_=typeof window<"u"?Boolean(window.isSecureContext):!1,k0=D_&&a_&&y!=="denied",w0=y==="granted"&&z,q0=w0?"Disable notifications":"Enable notifications",n_=C||"",O0=M&&D?` (${D})`:"",B0=O0.trim()?`${D}`:"",z0=typeof L?.hint_short==="string"?L.hint_short.trim():"",v_=[B0||null,z0||null].filter(Boolean).join(" • "),Q0=[n_?`Current model: ${n_}${O0}`:null,L?.plan?`Plan: ${L.plan}`:null,z0||null,L?.primary?.reset_description||null,L?.secondary?.reset_description||null].filter(Boolean),I0=y_?"Switching model…":Q0.join(" • ")||`Current model: ${n_}${O0} (tap to open model picker)`,K0=(F)=>{if(!F||typeof F!=="object")return;let R=F.model??F.current;if(typeof T==="function")T({model:R??null,thinking_level:F.thinking_level??null,supports_thinking:F.supports_thinking,provider_usage:F.provider_usage??null});if(R&&typeof H==="function")H(R)},x0=(F)=>{let R=F||P_.current;if(!R)return;R.style.height="auto",R.style.height=`${R.scrollHeight}px`,R.style.overflowY="hidden"},G0=(F)=>{if(!F.startsWith("/")||F.includes(`
`)){H_(!1),G_([]);return}let R=F.toLowerCase().split(" ")[0];if(R.length<1){H_(!1),G_([]);return}let d=Q8.filter((X_)=>X_.name.startsWith(R)||X_.name.replace(/-/g,"").startsWith(R.replace(/-/g,"")));if(d.length>0&&!(d.length===1&&d[0].name===R))G_(d),V_(0),H_(!0);else H_(!1),G_([])},y0=(F)=>{let R=W_,d=R.indexOf(" "),X_=d>=0?R.slice(d):"",F_=F.name+X_;$_(F_),H_(!1),G_([]),requestAnimationFrame(()=>{let A_=P_.current;if(!A_)return;let z_=F_.length;A_.selectionStart=z_,A_.selectionEnd=z_,A_.focus()})},t_=(F)=>{if(J)e(F);else $_(F),G0(F);requestAnimationFrame(()=>x0())},r_=(F)=>{let R=J?j_:W_,d=R&&!R.endsWith(`
`)?`
`:"",X_=`${R}${d}${F}`.trimStart();t_(X_)},Z0=(F)=>{let R=F?.command?.model_label;if(R)return R;let d=F?.command?.message;if(typeof d==="string"){let X_=d.match(/•\s+([^\n]+?)\s+\(current\)/);if(X_?.[1])return X_[1].trim()}return null},e_=async(F)=>{if(J||i||y_)return;U_(!0);try{let R=await G1("default",F,null,[]),d=Z0(R);K0({model:d??C??null,thinking_level:R?.command?.thinking_level,supports_thinking:R?.command?.supports_thinking});try{let X_=await s0();if(X_)K0(X_)}catch{}return _?.(),!0}catch(R){return console.error("Failed to switch model:",R),alert("Failed to switch model: "+R.message),!1}finally{U_(!1)}},c0=async()=>{await e_("/cycle-model")},m0=async(F)=>{if(!F||y_)return;if(await e_(`/model ${F}`))w_(!1)},g0=(F)=>{F.preventDefault(),F.stopPropagation(),w_((R)=>!R)},T0=async(F)=>{let R=typeof F==="string"?F:F&&typeof F?.target?.value==="string"?F.target.value:W_,d=typeof R==="string"?R:"";if(!d.trim()&&o.length===0&&W.length===0&&V.length===0)return;J_(!0);try{let X_=[];for(let M_ of o){let O_=await D3(M_);X_.push(O_.id)}let F_=d.trim(),A_=W.length?`Files:
${W.map((M_)=>`- ${M_}`).join(`
`)}`:"",z_=V.length?`Referenced messages:
${V.map((M_)=>`- message:${M_}`).join(`
`)}`:"",b_=X_.length?`Images:
${X_.map((M_,O_)=>{let V2=o[O_]?.name||`image-${O_+1}`;return`- attachment:${M_} (${V2})`}).join(`
`)}`:"",E0=[F_,A_,z_,b_].filter(Boolean).join(`

`),u0=await G1("default",E0,null,X_);if(u0?.command){K0({model:u0.command.model_label??C??null,thinking_level:u0.command.thinking_level,supports_thinking:u0.command.supports_thinking});try{let M_=await s0();if(M_)K0(M_)}catch{}}if(F_){let M_=L_.current,O_=C0(M_.filter((v0)=>v0!==F_));if(O_.push(F_),O_.length>200)O_.splice(0,O_.length-200);L_.current=O_,i_(O_),o_.current=-1,u_.current=""}$_(""),__([]),G?.(),U?.(),_?.()}catch(X_){console.error("Failed to post:",X_),alert("Failed to post: "+X_.message)}finally{J_(!1)}},T_=(F)=>{if(F.isComposing)return;if(J&&F.key==="Escape"){F.preventDefault(),e(""),Y?.();return}if(k_&&p.length>0){let R=P_.current?.value??(J?j_:W_);if(!String(R||"").startsWith("/"))H_(!1),G_([]);else{if(F.key==="ArrowDown"){F.preventDefault(),V_((d)=>(d+1)%p.length);return}if(F.key==="ArrowUp"){F.preventDefault(),V_((d)=>(d-1+p.length)%p.length);return}if(F.key==="Tab"){F.preventDefault(),y0(p[K_]);return}if(F.key==="Enter"&&!F.shiftKey){if(!(P_.current?.value??(J?j_:W_)).includes(" ")){F.preventDefault();let F_=p[K_];H_(!1),G_([]),T0(F_.name);return}}if(F.key==="Escape"){F.preventDefault(),H_(!1),G_([]);return}}}if(!J&&(F.key==="ArrowUp"||F.key==="ArrowDown")&&!F.metaKey&&!F.ctrlKey&&!F.altKey&&!F.shiftKey){let R=P_.current;if(!R)return;let d=R.value||"",X_=R.selectionStart===0&&R.selectionEnd===0,F_=R.selectionStart===d.length&&R.selectionEnd===d.length;if(F.key==="ArrowUp"&&X_||F.key==="ArrowDown"&&F_){let A_=L_.current;if(!A_.length)return;F.preventDefault();let z_=o_.current;if(F.key==="ArrowUp"){if(z_===-1)u_.current=d,z_=A_.length-1;else if(z_>0)z_-=1;o_.current=z_,t_(A_[z_]||"")}else{if(z_===-1)return;if(z_<A_.length-1)z_+=1,o_.current=z_,t_(A_[z_]||"");else o_.current=-1,t_(u_.current||""),u_.current=""}requestAnimationFrame(()=>{let b_=P_.current;if(!b_)return;let E0=b_.value.length;b_.selectionStart=E0,b_.selectionEnd=E0});return}}if(F.key==="Enter"&&!F.shiftKey){F.preventDefault();let R=P_.current?.value??(J?j_:W_);if(J){if(R.trim())Z?.(R.trim())}else T0(R)}},Y0=(F)=>{let R=Array.from(F||[]).filter((d)=>d&&d.type&&d.type.startsWith("image/"));if(!R.length)return;__((d)=>[...d,...R])},H0=(F)=>{Y0(F.target.files),F.target.value=""},R_=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),s_.current+=1,q_(!0)},g_=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),s_.current=Math.max(0,s_.current-1),s_.current===0)q_(!1)},j0=(F)=>{if(J)return;if(F.preventDefault(),F.stopPropagation(),F.dataTransfer)F.dataTransfer.dropEffect="copy";q_(!0)},U0=(F)=>{if(J)return;F.preventDefault(),F.stopPropagation(),s_.current=0,q_(!1),Y0(F.dataTransfer?.files||[])},A0=(F)=>{if(J)return;let R=F.clipboardData?.items;if(!R||!R.length)return;let d=[];for(let X_ of R){if(X_.kind!=="file")continue;let F_=X_.getAsFile?.();if(F_)d.push(F_)}if(d.length>0)F.preventDefault(),Y0(d)},f0=(F)=>{__((R)=>R.filter((d,X_)=>X_!==F))},a0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((F)=>{let{latitude:R,longitude:d,accuracy:X_}=F.coords,F_=`${R.toFixed(5)}, ${d.toFixed(5)}`,A_=Number.isFinite(X_)?` ±${Math.round(X_)}m`:"",z_=`https://maps.google.com/?q=${R},${d}`,b_=`Location: ${F_}${A_} ${z_}`;r_(b_)},(F)=>{let R=F?.message||"Unable to retrieve location.";alert(`Location error: ${R}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};g(()=>{if(!C_)return;I_(!0),s0().then((F)=>{let R=Array.isArray(F?.models)?F.models.filter((d)=>typeof d==="string"&&d.trim().length>0):[];l_(R),K0(F)}).catch((F)=>{console.warn("Failed to load model list:",F),l_([])}).finally(()=>{I_(!1)})},[C_,C]),g(()=>{if(J)w_(!1)},[J]),g(()=>{if(!C_)return;let F=(R)=>{let d=m_.current,X_=x_.current,F_=R.target;if(d&&d.contains(F_))return;if(X_&&X_.contains(F_))return;w_(!1)};return document.addEventListener("pointerdown",F),()=>document.removeEventListener("pointerdown",F)},[C_]);let _0=(F)=>{let R=F.target.value;x0(F.target),t_(R)};return g(()=>{requestAnimationFrame(()=>x0())},[W_,j_,J]),B`
        <div class="compose-box">
            <div
                class=${`compose-input-wrapper${B_?" drag-active":""}`}
                onDragEnter=${R_}
                onDragOver=${j0}
                onDragLeave=${g_}
                onDrop=${U0}
            >
                <div class="compose-input-main">
                    ${(W.length>0||o.length>0||V.length>0)&&B`
                        <div class="compose-file-refs">
                            ${V.map((F)=>{return B`
                                    <${o0}
                                        key=${"msg-"+F}
                                        prefix="compose"
                                        label=${"msg:"+F}
                                        title=${"Message reference: "+F}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>X?.(F)}
                                    />
                                `})}
                            ${W.map((F)=>{let R=F.split("/").pop()||F;return B`
                                    <${o0}
                                        prefix="compose"
                                        label=${R}
                                        title=${F}
                                        onClick=${()=>Z_?.(F)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>K?.(F)}
                                    />
                                `})}
                            ${o.map((F,R)=>{let d=F?.name||`image-${R+1}`;return B`
                                    <${o0}
                                        key=${d+R}
                                        prefix="compose"
                                        label=${d}
                                        title=${d}
                                        removeTitle="Remove image"
                                        onRemove=${()=>f0(R)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${P_}
                        placeholder=${J?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${J?j_:W_}
                        onInput=${_0}
                        onKeyDown=${T_}
                        onPaste=${A0}
                        onFocus=${$}
                        onClick=${$}
                        disabled=${i}
                        rows="1"
                    />
                    ${k_&&p.length>0&&B`
                        <div class="slash-autocomplete" ref=${W0}>
                            ${p.map((F,R)=>B`
                                <div
                                    key=${F.name}
                                    class=${`slash-item${R===K_?" active":""}`}
                                    onMouseDown=${(d)=>{d.preventDefault(),y0(F)}}
                                    onMouseEnter=${()=>V_(R)}
                                >
                                    <span class="slash-name">${F.name}</span>
                                    <span class="slash-desc">${F.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${C_&&!J&&B`
                        <div class="compose-model-popup" ref=${m_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${h_&&B`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!h_&&c_.length===0&&B`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!h_&&c_.map((F)=>B`
                                    <button
                                        key=${F}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${C===F?" active":""}`}
                                        onClick=${()=>{m0(F)}}
                                        disabled=${y_}
                                    >
                                        ${F}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{c0()}}
                                    disabled=${y_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!J&&C&&B`
                        <div class="compose-meta-row">
                            <div class="compose-model-meta">
                                <button
                                    ref=${x_}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${I0}
                                    aria-label="Open model picker"
                                    onClick=${g0}
                                    disabled=${i||y_}
                                >
                                    ${y_?"Switching…":n_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!y_&&v_&&B`
                                        <span class="compose-model-usage-hint" title=${I0}>
                                            ${v_}
                                        </span>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                    <div class="compose-actions ${J?"search-mode":""}">
                    ${!J&&S&&S.percent!=null&&B`
                        <${K8} usage=${S} />
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
                    ${n&&!J&&B`
                        <button
                            class="icon-btn location-btn"
                            onClick=${a0}
                            title="Share location"
                            type="button"
                            disabled=${i}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${k0&&!J&&B`
                        <button
                            class=${`icon-btn notification-btn${w0?" active":""}`}
                            onClick=${u}
                            title=${q0}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!J&&B`
                        ${t&&a&&B`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${a}
                                title=${`Attach open file: ${t}`}
                                type="button"
                                disabled=${i||W.includes(t)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${H0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{T0()}}
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
    `}var R3="piclaw_theme",U1="piclaw_tint",v2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},G8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},v3={default:{label:"Default",mode:"auto",light:v2,dark:G8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},V8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],R2={theme:"default",tint:null},c3="light",z1=!1;function m3(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function Q2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let J=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(J)&&!/^[0-9a-fA-F]{6}$/.test(J))return null;let Z=J.length===3?J.split("").map((Y)=>Y+Y).join(""):J,j=parseInt(Z,16);return{r:j>>16&255,g:j>>8&255,b:j&255,hex:`#${Z.toLowerCase()}`}}function N8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let J=document.createElement("div");if(J.style.color="",J.style.color=$,!J.style.color)return null;let Z=J.style.color;try{if(document.body)J.style.display="none",document.body.appendChild(J),Z=getComputedStyle(J).color||J.style.color,document.body.removeChild(J)}catch{}let j=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!j)return null;let Y=parseInt(j[1],10),W=parseInt(j[2],10),K=parseInt(j[3],10);if(![Y,W,K].every((V)=>Number.isFinite(V)))return null;let G=`#${[Y,W,K].map((V)=>V.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:W,b:K,hex:G}}function g3(_){return Q2(_)||N8(_)}function B2(_,$,J){let Z=Math.round(_.r+($.r-_.r)*J),j=Math.round(_.g+($.g-_.g)*J),Y=Math.round(_.b+($.b-_.b)*J);return`rgb(${Z} ${j} ${Y})`}function H1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function p3(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function F1(_){return v3[_]||v3.default}function q8(_){return _.mode==="auto"?p3():_.mode}function O8(_,$){let J=F1(_);if($==="dark"&&J.dark)return J.dark;if($==="light"&&J.light)return J.light;return J.dark||J.light||v2}function B8(_,$,J){let Z=g3($);if(!Z)return _;let j=Q2(_.bgPrimary),Y=Q2(_.bgSecondary),W=Q2(_.bgHover),K=Q2(_.borderColor);if(!j||!Y||!W||!K)return _;let V=Q2(J==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:B2(j,Z,0.08),bgSecondary:B2(Y,Z,0.12),bgHover:B2(W,Z,0.16),borderColor:B2(K,Z,0.08),accent:Z.hex,accentHover:V?B2(Z,V,0.18):Z.hex}}function z8(_,$){if(typeof document>"u")return;let J=document.documentElement,Z=_.accent,j=g3(Z),Y=j?H1(j,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,W=j?H1(j,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",K=j?H1(j,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",G={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":W,"--accent-soft-strong":K,"--danger-color":_.danger||v2.danger,"--success-color":_.success||v2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(G).forEach(([V,X])=>{if(X)J.style.setProperty(V,X)})}function H8(){if(typeof document>"u")return;let _=document.documentElement;V8.forEach(($)=>_.style.removeProperty($))}function f2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function U8(_,$){if(typeof document>"u")return;let J=f2("theme-color");if(J&&_)J.setAttribute("content",_);let Z=f2("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let j=f2("msapplication-navbutton-color");if(j&&_)j.setAttribute("content",_);let Y=f2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function F8(){if(typeof window>"u")return;let _={...R2,mode:c3};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function L1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let J=m3(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,j=F1(J),Y=q8(j),W=O8(J,Y);R2={theme:J,tint:Z},c3=Y;let K=document.documentElement;K.dataset.theme=Y,K.dataset.colorTheme=J,K.dataset.tint=Z?String(Z):"",K.style.colorScheme=Y;let G=W;if(J==="default"&&Z)G=B8(W,Z,Y);if(J==="default"&&!Z)H8();else z8(G,Y);if(U8(G.bgPrimary,Y),F8(),$.persist!==!1)if(f_(R3,J),Z)f_(U1,Z);else f_(U1,"")}function u2(){if(F1(R2.theme).mode!=="auto")return;L1(R2,{persist:!1})}function h3(){if(typeof window>"u")return()=>{};let _=m3(S0(R3)||"default"),$=S0(U1),J=$?$.trim():null;if(L1({theme:_,tint:J},{persist:!1}),window.matchMedia&&!z1){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",u2);else if(Z.addListener)Z.addListener(u2);return z1=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",u2);else if(Z.removeListener)Z.removeListener(u2);z1=!1}}return()=>{}}function i3(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let J=_.theme??_.name??_.colorTheme,Z=_.tint??null;L1({theme:J||"default",tint:Z},{persist:!0})}function l3(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return p3()}var c2=/#(\w+)/g,L8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),E8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),C8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),D8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},k8=new Set(["http:","https:","mailto:",""]);function o3(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function K2(_,$={}){if(!_)return null;let J=String(_).trim();if(!J)return null;if(J.startsWith("#")||J.startsWith("/"))return J;if(J.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(J))return J;return null}if(J.startsWith("blob:"))return J;try{let Z=new URL(J,typeof window<"u"?window.location.origin:"http://localhost");if(!k8.has(Z.protocol))return null;return Z.href}catch{return null}}function n3(_,$={}){if(!_)return"";let J=new DOMParser().parseFromString(_,"text/html"),Z=[],j=J.createTreeWalker(J.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=j.nextNode())Z.push(Y);for(let W of Z){let K=W.tagName.toLowerCase();if(!E8.has(K)){let V=W.parentNode;if(!V)continue;while(W.firstChild)V.insertBefore(W.firstChild,W);V.removeChild(W);continue}let G=D8[K]||new Set;for(let V of Array.from(W.attributes)){let X=V.name.toLowerCase(),U=V.value;if(X.startsWith("on")){W.removeAttribute(V.name);continue}if(X.startsWith("data-")||X.startsWith("aria-"))continue;if(G.has(X)||C8.has(X)){if(X==="href"){let C=K2(U);if(!C)W.removeAttribute(V.name);else if(W.setAttribute(V.name,C),K==="a"&&!W.getAttribute("rel"))W.setAttribute("rel","noopener noreferrer")}else if(X==="src"){let C=K==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,L=K2(C,{allowDataImage:K==="img"});if(!L)W.removeAttribute(V.name);else W.setAttribute(V.name,L)}continue}W.removeAttribute(V.name)}}return J.body.innerHTML}function r3(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function m2(_,$=2){if(!_)return _;let J=_;for(let Z=0;Z<$;Z+=1){let j=r3(J);if(j===J)break;J=j}return J}function w8(_){if(!_)return{text:"",blocks:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=[],Y=!1,W=[];for(let K of J){if(!Y&&K.trim().match(/^```mermaid\s*$/i)){Y=!0,W=[];continue}if(Y&&K.trim().match(/^```\s*$/)){let G=Z.length;Z.push(W.join(`
`)),j.push(`@@MERMAID_BLOCK_${G}@@`),Y=!1,W=[];continue}if(Y)W.push(K);else j.push(K)}if(Y)j.push("```mermaid"),j.push(...W);return{text:j.join(`
`),blocks:Z}}function y8(_){if(!_)return _;return m2(_,5)}function A8(_){let $=new TextEncoder().encode(String(_||"")),J="";for(let Z of $)J+=String.fromCharCode(Z);return btoa(J)}function M8(_){let $=atob(String(_||"")),J=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)J[Z]=$.charCodeAt(Z);return new TextDecoder().decode(J)}function P8(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(J,Z)=>{let j=Number(Z),Y=$[j]??"",W=y8(Y);return`<div class="mermaid-container" data-mermaid="${A8(W)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function d3(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,J)=>{if(J.includes(`
`))return`
\`\`\`
${J}
\`\`\`
`;return`\`${J}\``})}function s3(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,J)=>{let Z=J.trim(),j=Z.startsWith("/"),Y=j?Z.slice(1).trim():Z,G=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!G||!L8.has(G))return $;if(G==="br")return j?"":"<br>";if(j)return`</${G}>`;return`<${G}>`})}function a3(_){if(!_)return _;let $=(J)=>J.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(J,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(J,Z)=>`<code>${$(Z)}</code>`)}function t3(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),j;while(j=J.nextNode()){if(!j.nodeValue)continue;let Y=Z(j.nodeValue);if(Y!==j.nodeValue)j.nodeValue=Y}return $.body.innerHTML}function b8(_){if(!window.katex)return _;let $=(W)=>r3(W).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),J=(W)=>{let K=[],G=W.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(V)=>{let X=K.length;return K.push(V),`@@CODE_BLOCK_${X}@@`});return G=G.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(V)=>{let X=K.length;return K.push(V),`@@CODE_INLINE_${X}@@`}),{html:G,blocks:K}},Z=(W,K)=>{if(!K.length)return W;return W.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(G,V)=>{let X=Number(V);return K[X]??""})},j=J(_),Y=j.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(W,K,G)=>{try{let V=katex.renderToString($(G.trim()),{displayMode:!0,throwOnError:!1});return`${K}${V}`}catch(V){return`<span class="math-error" title="${o3(V.message)}">${W}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(W,K,G)=>{if(/\s$/.test(G))return W;try{let V=katex.renderToString($(G),{displayMode:!1,throwOnError:!1});return`${K}${V}`}catch(V){return`${K}<span class="math-error" title="${o3(V.message)}">$${G}$</span>`}}),Z(Y,j.blocks)}function S8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),J=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],j;while(j=J.nextNode())Z.push(j);for(let Y of Z){let W=Y.nodeValue;if(!W)continue;if(c2.lastIndex=0,!c2.test(W))continue;c2.lastIndex=0;let K=Y.parentElement;if(K&&(K.closest("a")||K.closest("code")||K.closest("pre")))continue;let G=W.split(c2);if(G.length<=1)continue;let V=$.createDocumentFragment();G.forEach((X,U)=>{if(U%2===1){let C=$.createElement("a");C.setAttribute("href","#"),C.className="hashtag",C.setAttribute("data-hashtag",X),C.textContent=`#${X}`,V.appendChild(C)}else V.appendChild($.createTextNode(X))}),Y.parentNode?.replaceChild(V,Y)}return $.body.innerHTML}function I8(_){if(!_)return _;let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=!1;for(let Y of J){if(!j&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){j=!0,Z.push("$$");continue}if(j&&Y.trim().match(/^```\s*$/)){j=!1,Z.push("$$");continue}Z.push(Y)}return Z.join(`
`)}function G2(_,$,J={}){if(!_)return"";let Z=I8(_),{text:j,blocks:Y}=w8(Z),W=m2(j,2),G=d3(W).replace(/</g,"&lt;").replace(/>/g,"&gt;"),V=s3(G),X=window.marked?marked.parse(V,{headerIds:!1,mangle:!1}):V.replace(/\n/g,"<br>");return X=a3(X),X=t3(X),X=b8(X),X=S8(X),X=P8(X,Y),X=n3(X,J),X}function e3(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),J=m2($,2),j=d3(J).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=s3(j),W=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return W=a3(W),W=t3(W),W=n3(W),W}async function g2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:J}=window.beautifulMermaid,j=l3()==="dark"?J["tokyo-night"]:J["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let W of Y)try{let K=W.dataset.mermaid,G=M8(K||""),V=m2(G,2),X=await $(V,{...j,transparent:!0});W.innerHTML=X,W.removeAttribute("data-mermaid")}catch(K){console.error("Mermaid render error:",K);let G=document.createElement("pre");G.className="mermaid-error",G.textContent=`Diagram error: ${K.message}`,W.innerHTML="",W.appendChild(G),W.removeAttribute("data-mermaid")}}var _4="PiClaw";function E1(_,$){let J=_||"PiClaw",Z=J.charAt(0).toUpperCase(),j=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=Z.charCodeAt(0)%j.length,W=j[Y],K=J.trim().toLowerCase(),G=typeof $==="string"?$.trim():"",X=(G?G:null)||(K==="PiClaw".toLowerCase()||K==="pi"?"/static/icon-192.png":null);return{letter:Z,color:W,image:X}}function $4(_,$){if(!_)return"PiClaw";let J=$[_]?.name||_;return J?J.charAt(0).toUpperCase()+J.slice(1):"PiClaw"}function J4(_,$){if(!_)return null;let J=$[_]||{};return J.avatar_url||J.avatarUrl||J.avatar||null}function Z4(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,W=Y?.dataset?.colorTheme||"",K=Y?.dataset?.tint||"",G=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(G&&(K||W&&W!=="default"))return G}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],J=String(_),Z=0;for(let Y=0;Y<J.length;Y+=1)Z=(Z*31+J.charCodeAt(Y))%2147483647;let j=Math.abs(Z)%$.length;return $[j]}function Y4({status:_,draft:$,plan:J,thought:Z,pendingRequest:j,intent:Y,turnId:W,steerQueued:K,onPanelToggle:G}){let U=(p)=>{if(!p)return{text:"",totalLines:0,fullText:""};if(typeof p==="string"){let k_=p,H_=k_?k_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:k_,totalLines:H_,fullText:k_}}let G_=p.text||"",K_=p.fullText||p.full_text||G_,V_=Number.isFinite(p.totalLines)?p.totalLines:K_?K_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:G_,totalLines:V_,fullText:K_}},C=160,L=(p)=>{if(!p)return 1;return Math.max(1,Math.ceil(p.length/160))},D=(p,G_,K_)=>{let V_=(p||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!V_)return{text:"",omitted:0,totalLines:Number.isFinite(K_)?K_:0,visibleLines:0};let k_=V_.split(`
`),H_=k_.length>G_?k_.slice(0,G_).join(`
`):V_,y_=Number.isFinite(K_)?K_:k_.reduce((w_,c_)=>w_+L(c_),0),U_=H_?H_.split(`
`).reduce((w_,c_)=>w_+L(c_),0):0,C_=Math.max(y_-U_,0);return{text:H_,omitted:C_,totalLines:y_,visibleLines:U_}},M=U(J),S=U(Z),z=U($),y=Boolean(M.text)||M.totalLines>0,u=Boolean(S.text)||S.totalLines>0,H=Boolean(z.fullText?.trim()||z.text?.trim());if(!_&&!H&&!y&&!u&&!j&&!Y)return null;let[T,t]=f(new Set),a=(p)=>t((G_)=>{let K_=new Set(G_),V_=!K_.has(p);if(V_)K_.add(p);else K_.delete(p);if(typeof G==="function")G(p,V_);return K_});g(()=>{t(new Set)},[W]);let Z_=_?.turn_id||W,W_=Z4(Z_),$_=K?"turn-dot turn-dot-queued":"turn-dot",j_=(p)=>p,e=Boolean(_?.last_activity||_?.lastActivity),i="",J_=_?.title,o=_?.status;if(_?.type==="plan")i=J_?`Planning: ${J_}`:"Planning...";else if(_?.type==="tool_call")i=J_?`Running: ${J_}`:"Running tool...";else if(_?.type==="tool_status")i=J_?`${J_}: ${o||"Working..."}`:o||"Working...";else if(_?.type==="error")i=J_||"Agent error";else i=J_||o||"Working...";if(e)i="Last activity just now";let __=({panelTitle:p,text:G_,fullText:K_,totalLines:V_,maxLines:k_,titleClass:H_,panelKey:y_})=>{let U_=T.has(y_),C_=K_||G_||"",w_=typeof k_==="number",c_=U_&&w_,l_=w_?D(C_,k_,V_):{text:C_||"",omitted:0,totalLines:Number.isFinite(V_)?V_:0};if(!C_&&!(Number.isFinite(l_.totalLines)&&l_.totalLines>0))return null;let h_=`agent-thinking-body${w_?" agent-thinking-body-collapsible":""}`,I_=w_?`--agent-thinking-collapsed-lines: ${k_};`:"";return B`
            <div
                class="agent-thinking"
                data-expanded=${U_?"true":"false"}
                data-collapsible=${w_?"true":"false"}
                style=${W_?`--turn-color: ${W_};`:""}
            >
                <div class="agent-thinking-title ${H_||""}">
                    ${W_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${p}
                    ${c_&&B`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${p} panel`}
                            onClick=${()=>a(y_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${h_}
                    style=${I_}
                    dangerouslySetInnerHTML=${{__html:e3(C_)}}
                />
                ${!U_&&l_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>a(y_)}>
                        ▸ ${l_.omitted} more lines
                    </button>
                `}
                ${U_&&l_.omitted>0&&B`
                    <button class="agent-thinking-truncation" onClick=${()=>a(y_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},B_=j?.tool_call?.title,q_=B_?`Awaiting approval: ${B_}`:"Awaiting approval";return B`
        <div class="agent-status-panel">
            ${Y&&B`
                <div
                    class="agent-status agent-status-intent"
                    aria-live="polite"
                    style=${W_?`--turn-color: ${W_};`:""}
                    title=${Y?.detail||""}
                >
                    <span class="agent-status-text">
                        ${Y.title}
                    </span>
                    ${Y.detail&&B`<span class="agent-status-intent-detail">${Y.detail}</span>`}
                </div>
            `}
            ${j&&B`
                <div class="agent-status agent-status-request" aria-live="polite" style=${W_?`--turn-color: ${W_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${q_}</span>
                </div>
            `}
            ${y&&__({panelTitle:j_("Planning"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,panelKey:"plan"})}
            ${u&&__({panelTitle:j_("Thoughts"),text:S.text,fullText:S.fullText,totalLines:S.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${H&&__({panelTitle:j_("Draft"),text:z.text,fullText:z.fullText,totalLines:z.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&B`
                <div class=${`agent-status${e?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${W_?`--turn-color: ${W_};`:""}>
                    ${W_&&B`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?B`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!e&&B`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${i}</span>
                </div>
            `}
        </div>
    `}function j4({request:_,onRespond:$}){if(!_)return null;let{request_id:J,tool_call:Z,options:j}=_,Y=Z?.title||"Agent Request",W=Z?.kind||"other",K=Z?.rawInput||{},G=K.command||K.commands&&K.commands[0]||null,V=K.diff||null,X=K.fileName||K.path||null,U=Z?.description||K.description||K.explanation||null,L=(Array.isArray(Z?.locations)?Z.locations:[]).map((y)=>y?.path).filter((y)=>Boolean(y)),D=Array.from(new Set([X,...L].filter(Boolean)));console.log("AgentRequestModal:",{request_id:J,tool_call:Z,options:j});let M=async(y)=>{try{await N1(J,y),$()}catch(u){console.error("Failed to respond to agent request:",u)}},S=async()=>{try{await k3(Y,`Auto-approved: ${Y}`),await N1(J,"approved"),$()}catch(y){console.error("Failed to add to whitelist:",y)}},z=j&&j.length>0;return B`
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
                ${(U||G||V||D.length>0)&&B`
                    <div class="agent-request-body">
                        ${U&&B`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${D.length>0&&B`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${D.map((y,u)=>B`<li key=${u}>${y}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${G&&B`
                            <pre class="agent-request-command">${G}</pre>
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
                    ${z?j.map((y)=>B`
                            <button 
                                key=${y.optionId||y.id||String(y)}
                                class="agent-request-btn ${y.kind==="allow_once"||y.kind==="allow_always"?"primary":""}"
                                onClick=${()=>M(y.optionId||y.id||y)}
                            >
                                ${y.name||y.label||y.optionId||y.id||String(y)}
                            </button>
                        `):B`
                        <button class="agent-request-btn primary" onClick=${()=>M("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>M("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${S}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function X4({status:_}){if(_==="connected")return null;return B`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function W4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,j=Z/1000,Y=86400000;if(Z<Y){if(j<60)return"just now";if(j<3600)return`${Math.floor(j/60)}m`;return`${Math.floor(j/3600)}h`}if(Z<5*Y){let G=$.toLocaleDateString(void 0,{weekday:"short"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${G} ${V}`}let W=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),K=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${W} ${K}`}function z2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function R0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function p2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function Q4({src:_,onClose:$}){return g(()=>{let J=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[$]),B`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function x8({mediaId:_}){let[$,J]=f(null);if(g(()=>{I2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size,Y=j?R0(j):"";return B`
        <a href=${j2(_)} download=${Z} class="file-attachment" onClick=${(W)=>W.stopPropagation()}>
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
    `}function T8({block:_}){let $=_.title||_.name||_.uri,J=_.description,Z=_.size?R0(_.size):"",j=_.mime_type||"",Y=u8(j),W=K2(_.uri);return B`
        <a
            href=${W||"#"}
            class="resource-link"
            target=${W?"_blank":void 0}
            rel=${W?"noopener noreferrer":void 0}
            onClick=${(K)=>K.stopPropagation()}>
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
    `}function f8({block:_}){let[$,J]=f(!1),Z=_.uri||"Embedded resource",j=_.text||"",Y=Boolean(_.data),W=_.mime_type||"";return B`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(K)=>{K.preventDefault(),K.stopPropagation(),J(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&B`
                ${j&&B`<pre class="resource-embed-content">${j}</pre>`}
                ${Y&&B`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${W&&B`<span class="resource-embed-blob-meta">${W}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(K)=>{K.preventDefault(),K.stopPropagation();let G=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:W||"application/octet-stream"}),V=URL.createObjectURL(G),X=document.createElement("a");X.href=V,X.download=Z.split("/").pop()||"resource",X.click(),URL.revokeObjectURL(V)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function u8(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function v8({preview:_}){let $=K2(_.url),J=K2(_.image,{allowDataImage:!0}),Z=J?`background-image: url('${J}')`:"",j=_.site_name;if(!j&&$)try{j=new URL($).hostname}catch{j=$}return B`
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
    `}function R8(_,$){return typeof _==="string"?_:""}var c8=1800,m8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,g8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,p8=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function h8(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let J=document.createElement("textarea");J.value=$,J.setAttribute("readonly",""),J.style.position="fixed",J.style.opacity="0",J.style.pointerEvents="none",document.body.appendChild(J),J.select(),J.setSelectionRange(0,J.value.length);let Z=document.execCommand("copy");return document.body.removeChild(J),Z}catch{return!1}}function i8(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let J=new Map,Z=[],j=(Y,W)=>{let K=W||"idle";if(Y.dataset.copyState=K,K==="success")Y.innerHTML=g8,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(K==="error")Y.innerHTML=p8,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=m8,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let W=document.createElement("div");W.className="post-code-block",Y.parentNode?.insertBefore(W,Y),W.appendChild(Y);let K=document.createElement("button");K.type="button",K.className="post-code-copy-btn",j(K,"idle"),W.appendChild(K);let G=async(V)=>{V.preventDefault(),V.stopPropagation();let U=Y.querySelector("code")?.textContent||"",C=await h8(U);j(K,C?"success":"error");let L=J.get(K);if(L)clearTimeout(L);let D=setTimeout(()=>{j(K,"idle"),J.delete(K)},c8);J.set(K,D)};K.addEventListener("click",G),Z.push(()=>{K.removeEventListener("click",G);let V=J.get(K);if(V)clearTimeout(V);if(W.parentNode)W.parentNode.insertBefore(Y,W),W.remove()})}),()=>{Z.forEach((Y)=>Y())}}function l8(_){if(!_)return{content:_,fileRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Files:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,fileRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V))j.push(V.replace(/^\s*-\s+/,"").trim());else if(!V.trim())break;else break}if(j.length===0)return{content:_,fileRefs:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,fileRefs:j}}function o8(_){if(!_)return{content:_,messageRefs:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Referenced messages:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,messageRefs:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let U=V.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)j.push(U[1])}else if(!V.trim())break;else break}if(j.length===0)return{content:_,messageRefs:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,messageRefs:j}}function n8(_){if(!_)return{content:_,attachments:[]};let J=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let V=0;V<J.length;V+=1)if(J[V].trim()==="Images:"&&J[V+1]&&/^\s*-\s+/.test(J[V+1])){Z=V;break}if(Z===-1)return{content:_,attachments:[]};let j=[],Y=Z+1;for(;Y<J.length;Y+=1){let V=J[Y];if(/^\s*-\s+/.test(V)){let X=V.replace(/^\s*-\s+/,"").trim(),U=X.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||X.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let C=U[1],L=(U[2]||"").trim()||C;j.push({id:C,label:L,raw:X})}else j.push({id:null,label:X,raw:X})}else if(!V.trim())break;else break}if(j.length===0)return{content:_,attachments:[]};let W=J.slice(0,Z),K=J.slice(Y),G=[...W,...K].join(`
`);return G=G.replace(/\n{3,}/g,`

`).trim(),{content:G,attachments:j}}function r8(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function d8(_,$){if(!_||!$)return _;let J=String($).trim().split(/\s+/).filter(Boolean);if(J.length===0)return _;let Z=J.map(r8).sort((X,U)=>U.length-X.length),j=new RegExp(`(${Z.join("|")})`,"gi"),Y=new RegExp(`^(${Z.join("|")})$`,"i"),W=new DOMParser().parseFromString(_,"text/html"),K=W.createTreeWalker(W.body,NodeFilter.SHOW_TEXT),G=[],V;while(V=K.nextNode())G.push(V);for(let X of G){let U=X.nodeValue;if(!U||!j.test(U)){j.lastIndex=0;continue}j.lastIndex=0;let C=X.parentElement;if(C&&C.closest("code, pre, script, style"))continue;let L=U.split(j).filter((M)=>M!=="");if(L.length===0)continue;let D=W.createDocumentFragment();for(let M of L)if(Y.test(M)){let S=W.createElement("mark");S.className="search-highlight-term",S.textContent=M,D.appendChild(S)}else D.appendChild(W.createTextNode(M));X.parentNode.replaceChild(D,X)}return W.body.innerHTML}function K4({post:_,onClick:$,onHashtagClick:J,onMessageRef:Z,onScrollToMessage:j,agentName:Y,agentAvatarUrl:W,userName:K,userAvatarUrl:G,userAvatarBackground:V,onDelete:X,isThreadReply:U,isThreadPrev:C,isThreadNext:L,isRemoving:D,highlightQuery:M,onFileRef:S}){let[z,y]=f(null),u=w(null),H=_.data,T=H.type==="agent_response",t=K||"You",a=T?Y||_4:t,Z_=T?E1(Y,W):E1(t,G),W_=typeof V==="string"?V.trim().toLowerCase():"",$_=!T&&Z_.image&&(W_==="clear"||W_==="transparent"),j_=T&&Boolean(Z_.image),e=`background-color: ${$_||j_?"transparent":Z_.color}`,i=H.content_meta,J_=Boolean(i?.truncated),o=Boolean(i?.preview),__=J_&&!o,B_=J_?{originalLength:Number.isFinite(i?.original_length)?i.original_length:H.content?H.content.length:0,maxLength:Number.isFinite(i?.max_length)?i.max_length:0}:null,q_=R8(H.content,H.link_previews),{content:p,fileRefs:G_}=l8(q_),{content:K_,messageRefs:V_}=o8(p),{content:k_,attachments:H_}=n8(K_);q_=k_;let y_=Boolean(q_)&&!__,U_=typeof M==="string"?M.trim():"",C_=b0(()=>{if(!q_)return"";let P=G2(q_,J);return U_?d8(P,U_):P},[q_,U_]),w_=(P,n)=>{P.stopPropagation(),y(j2(n))},c_=(P)=>{P.stopPropagation(),X?.(_)},l_=(P,n)=>{let D_=new Set;if(!P||n.length===0)return{content:P,usedIds:D_};return{content:P.replace(/attachment:([^\s)"']+)/g,(N0,k0,w0,q0)=>{let n_=k0.replace(/^\/+/,""),B0=n.find((v_)=>v_.name&&v_.name.toLowerCase()===n_.toLowerCase()&&!D_.has(v_.id))||n.find((v_)=>!D_.has(v_.id));if(!B0)return N0;if(D_.add(B0.id),q0.slice(Math.max(0,w0-2),w0)==="](")return`/media/${B0.id}`;return B0.name||"attachment"}),usedIds:D_}},h_=[],I_=[],P_=[],W0=[],m_=[],x_=[],s_=H.content_blocks||[],V0=H.media_ids||[],C0=0;if(s_.length>0)s_.forEach((P)=>{if(P?.type==="text"&&P.annotations)x_.push(P.annotations);if(P?.type==="resource_link")W0.push(P);else if(P?.type==="resource")m_.push(P);else if(P?.type==="file"){let n=V0[C0++];if(n)I_.push(n),P_.push({id:n,name:P?.name||P?.filename||P?.title})}else if(P?.type==="image"||!P?.type){let n=V0[C0++];if(n){let D_=typeof P?.mime_type==="string"?P.mime_type:void 0;h_.push({id:n,annotations:P?.annotations,mimeType:D_}),P_.push({id:n,name:P?.name||P?.filename||P?.title})}}});else if(V0.length>0)V0.forEach((P)=>{h_.push({id:P,annotations:null}),P_.push({id:P,name:null})});if(H_.length>0)H_.forEach((P)=>{if(!P?.id)return;let n=P_.find((D_)=>String(D_.id)===String(P.id));if(n&&!n.name)n.name=P.label});let{content:D0,usedIds:i_}=l_(q_,P_);q_=D0;let L_=h_.filter(({id:P})=>!i_.has(P)),o_=I_.filter((P)=>!i_.has(P)),u_=H_.length>0?H_.map((P,n)=>({id:P.id||`attachment-${n+1}`,label:P.label||`attachment-${n+1}`})):P_.map((P,n)=>({id:P.id,label:P.name||`attachment-${n+1}`}));return g(()=>{if(!u.current)return;return g2(u.current),i8(u.current)},[C_]),B`
        <div id=${`post-${_.id}`} class="post ${T?"agent-post":""} ${U?"thread-reply":""} ${C?"thread-prev":""} ${L?"thread-next":""} ${D?"removing":""}" onClick=${$}>
            <div class="post-avatar ${T?"agent-avatar":""} ${Z_.image?"has-image":""}" style=${e}>
                ${Z_.image?B`<img src=${Z_.image} alt=${a} />`:Z_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${c_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${a}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(P)=>{if(P.preventDefault(),P.stopPropagation(),Z)Z(_.id)}}>${W4(_.timestamp)}</a>
                </div>
                ${__&&B_&&B`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${z2(B_.originalLength)} chars
                            ${B_.maxLength?B` • Display limit: ${z2(B_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${o&&B_&&B`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${z2(B_.maxLength)} of ${z2(B_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(G_.length>0||V_.length>0||u_.length>0)&&B`
                    <div class="post-file-refs">
                        ${V_.map((P)=>{let n=(D_)=>{if(D_.preventDefault(),D_.stopPropagation(),j)j(P);else{let a_=document.getElementById("post-"+P);if(a_)a_.scrollIntoView({behavior:"smooth",block:"center"}),a_.classList.add("post-highlight"),setTimeout(()=>a_.classList.remove("post-highlight"),2000)}};return B`
                                <a href=${`#msg-${P}`} class="post-msg-pill-link" onClick=${n}>
                                    <${o0}
                                        prefix="post"
                                        label=${"msg:"+P}
                                        title=${"Message "+P}
                                        icon="message"
                                        onClick=${n}
                                    />
                                </a>
                            `})}
                        ${G_.map((P)=>{let n=P.split("/").pop()||P;return B`
                                <${o0}
                                    prefix="post"
                                    label=${n}
                                    title=${P}
                                    onClick=${()=>S?.(P)}
                                />
                            `})}
                        ${u_.map((P)=>B`
                            <${o0}
                                prefix="post"
                                label=${P.label}
                                title=${P.label}
                            />
                        `)}
                    </div>
                `}
                ${y_&&B`
                    <div 
                        ref=${u}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:C_}}
                        onClick=${(P)=>{if(P.target.classList.contains("hashtag")){P.preventDefault(),P.stopPropagation();let n=P.target.dataset.hashtag;if(n)J?.(n)}else if(P.target.tagName==="IMG")P.preventDefault(),P.stopPropagation(),y(P.target.src)}}
                    />
                `}
                ${x_.length>0&&B`
                    ${x_.map((P,n)=>B`
                        <${h2} key=${n} annotations=${P} />
                    `)}
                `}
                ${L_.length>0&&B`
                    <div class="media-preview">
                        ${L_.map(({id:P,mimeType:n})=>{let a_=typeof n==="string"&&n.toLowerCase().startsWith("image/svg")?j2(P):A3(P);return B`
                                <img 
                                    key=${P} 
                                    src=${a_} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(N0)=>w_(N0,P)}
                                />
                            `})}
                    </div>
                `}
                ${L_.length>0&&B`
                    ${L_.map(({annotations:P},n)=>B`
                        ${P&&B`<${h2} key=${n} annotations=${P} />`}
                    `)}
                `}
                ${o_.length>0&&B`
                    <div class="file-attachments">
                        ${o_.map((P)=>B`
                            <${x8} key=${P} mediaId=${P} />
                        `)}
                    </div>
                `}
                ${W0.length>0&&B`
                    <div class="resource-links">
                        ${W0.map((P,n)=>B`
                            <div key=${n}>
                                <${T8} block=${P} />
                                <${h2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${m_.length>0&&B`
                    <div class="resource-embeds">
                        ${m_.map((P,n)=>B`
                            <div key=${n}>
                                <${f8} block=${P} />
                                <${h2} annotations=${P.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${H.link_previews?.length>0&&B`
                    <div class="link-previews">
                        ${H.link_previews.map((P,n)=>B`
                            <${v8} key=${n} preview=${P} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${z&&B`<${Q4} src=${z} onClose=${()=>y(null)} />`}
    `}function G4({posts:_,hasMore:$,onLoadMore:J,onPostClick:Z,onHashtagClick:j,onMessageRef:Y,onScrollToMessage:W,onFileRef:K,emptyMessage:G,timelineRef:V,agents:X,user:U,onDeletePost:C,reverse:L=!0,removingPostIds:D,searchQuery:M}){let[S,z]=f(!1),y=w(null),u=typeof IntersectionObserver<"u",H=b(async()=>{if(!J||!$||S)return;z(!0);try{await J({preserveScroll:!0,preserveMode:"top"})}finally{z(!1)}},[$,S,J]),T=b((e)=>{let{scrollTop:i,scrollHeight:J_,clientHeight:o}=e.target,__=L?J_-o-i:i,B_=Math.max(300,o);if(__<B_)H()},[L,H]);if(g(()=>{if(!u)return;let e=y.current,i=V?.current;if(!e||!i)return;let J_=300,o=new IntersectionObserver((__)=>{for(let B_ of __){if(!B_.isIntersecting)continue;H()}},{root:i,rootMargin:`${J_}px 0px ${J_}px 0px`,threshold:0});return o.observe(e),()=>o.disconnect()},[u,$,J,V,H]),g(()=>{if(u)return;if(!V?.current)return;let{scrollTop:e,scrollHeight:i,clientHeight:J_}=V.current,o=L?i-J_-e:e,__=Math.max(300,J_);if(o<__)H()},[u,_,$,L,V,H]),g(()=>{if(!V?.current)return;if(!$||S)return;let{scrollTop:e,scrollHeight:i,clientHeight:J_}=V.current,o=L?i-J_-e:e,__=Math.max(300,J_);if(i<=J_+1||o<__)H()},[_,$,S,L,V,H]),!_)return B`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return B`
            <div class="timeline" ref=${V}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${G||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let t=_.slice().sort((e,i)=>e.id-i.id),a=(e)=>{let i=e?.data?.thread_id;if(i===null||i===void 0||i==="")return null;let J_=Number(i);return Number.isFinite(J_)?J_:null},Z_=new Map;for(let e=0;e<t.length;e+=1){let i=t[e],J_=Number(i?.id),o=a(i);if(o!==null){let __=Z_.get(o)||{anchorIndex:-1,replyIndexes:[]};__.replyIndexes.push(e),Z_.set(o,__)}else if(Number.isFinite(J_)){let __=Z_.get(J_)||{anchorIndex:-1,replyIndexes:[]};__.anchorIndex=e,Z_.set(J_,__)}}let W_=new Map;for(let[e,i]of Z_.entries()){let J_=new Set;if(i.anchorIndex>=0)J_.add(i.anchorIndex);for(let o of i.replyIndexes)J_.add(o);W_.set(e,Array.from(J_).sort((o,__)=>o-__))}let $_=t.map((e,i)=>{let J_=a(e);if(J_===null)return{hasThreadPrev:!1,hasThreadNext:!1};let o=W_.get(J_);if(!o||o.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let __=o.indexOf(i);if(__<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:__>0,hasThreadNext:__<o.length-1}}),j_=B`<div class="timeline-sentinel" ref=${y}></div>`;return B`
        <div class="timeline ${L?"reverse":"normal"}" ref=${V} onScroll=${T}>
            <div class="timeline-content">
                ${L?j_:null}
                ${t.map((e,i)=>{let J_=Boolean(e.data?.thread_id&&e.data.thread_id!==e.id),o=D?.has?.(e.id),__=$_[i]||{};return B`
                    <${K4}
                        key=${e.id}
                        post=${e}
                        isThreadReply=${J_}
                        isThreadPrev=${__.hasThreadPrev}
                        isThreadNext=${__.hasThreadNext}
                        isRemoving=${o}
                        highlightQuery=${M}
                        agentName=${$4(e.data?.agent_id,X||{})}
                        agentAvatarUrl=${J4(e.data?.agent_id,X||{})}
                        userName=${U?.name||U?.user_name}
                        userAvatarUrl=${U?.avatar_url||U?.avatarUrl||U?.avatar}
                        userAvatarBackground=${U?.avatar_background||U?.avatarBackground}
                        onClick=${()=>Z?.(e)}
                        onHashtagClick=${j}
                        onMessageRef=${Y}
                        onScrollToMessage=${W}
                        onFileRef=${K}
                        onDelete=${C}
                    />
                `})}
                ${L?null:j_}
            </div>
        </div>
    `}class V4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,J=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let j=Z.canHandle(_);if(j===!1||j===0)continue;let Y=j===!0?0:typeof j==="number"?j:0;if(Y>J)J=Y,$=Z}catch(j){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,j)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var p_=new V4;var i2=null,C1=null;function N4(){if(C1)return Promise.resolve(C1);if(!i2)i2=import("/static/dist/editor.bundle.js").then((_)=>{return C1=_,_}).catch((_)=>{throw i2=null,_});return i2}class q4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await N4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var D1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new q4(_,$)}};function k1(){N4().catch(()=>{})}class O4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let J=document.createElement("div");J.className="terminal-pane-header";let Z=document.createElement("span");Z.className="terminal-pane-title",Z.textContent="Terminal";let j=document.createElement("span");j.className="terminal-pane-status",j.textContent="Not connected",J.append(Z,j);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(J,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var w1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new O4(_,$)}};function B4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s8(_,$){let J=String(_||"").trim();if(!J)return J;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(J)||J.startsWith("#")||J.startsWith("data:")||J.startsWith("blob:"))return J;let Z=J.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),j=Z?.[1]||J,Y=Z?.[2]||"",W=Z?.[3]||"",K=String($||"").split("/").slice(0,-1).join("/"),V=j.startsWith("/")?j:`${K?`${K}/`:""}${j}`,X=[];for(let C of V.split("/")){if(!C||C===".")continue;if(C===".."){if(X.length>0)X.pop();continue}X.push(C)}let U=X.join("/");return`${O1(U)}${Y}${W}`}function H2(_){return _?.preview||null}function a8(_){let $=H2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let J=$.url||($.path?O1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${B4(J)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${G2($.text||"",null,{rewriteImageSrc:(Z)=>s8(Z,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${B4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class y1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=a8(this.context)}getContent(){let _=H2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let J=H2(this.context);if(J&&J.kind==="text"){if(J.text=_,$!==void 0)J.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var A1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=H2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new y1(_,$)}},M1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return H2(_)||_?.path?1:!1},mount(_,$){return new y1(_,$)}};class z4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let J of this.listeners)try{J(_,$)}catch{}}open(_,$){let J=this.tabs.get(_);if(!J)J={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,J);return this.activate(_),J}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,J]of this.tabs)if($!==_&&!J.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((J)=>J!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let J=this.tabs.get(_);if(!J||J.dirty===$)return;J.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let J=this.tabs.get(_);if(J)J.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,J){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=J||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((j)=>j===_?$:j),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($+1)%_.length];this.activate(J.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),J=_[($-1+_.length)%_.length];this.activate(J.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var E_=new z4;var l2="workspaceExplorerScale",t8=["compact","default","comfortable"],e8=new Set(t8),_6={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function H4(_,$="default"){if(typeof _!=="string")return $;let J=_.trim().toLowerCase();return e8.has(J)?J:$}function P1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),J=Boolean(window.matchMedia?.("(hover: none)")?.matches),Z=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||Z&&J}}function $6(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function J6(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function b1(_={}){let $=$6(_),J=_.stored?H4(_.stored,$):$;return J6(J,_)}function U4(_){return _6[H4(_)]}var Z6=60000,C4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function D4(_,$,J,Z=0,j=[]){if(!J&&C4(_))return j;if(!_)return j;if(j.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)D4(Y,$,J,Z+1,j);return j}function F4(_,$,J){if(!_)return"";let Z=[],j=(Y)=>{if(!J&&C4(Y))return;if(Z.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let W of Y.children)j(W)};return j(_),Z.join("|")}function T1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let J=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let j=J?new Map(J.map((K)=>[K?.path,K])):new Map,Y=!J||J.length!==Z.length,W=Z.map((K)=>{let G=T1(j.get(K.path),K);if(G!==j.get(K.path))Y=!0;return G});return Y?{...$,children:W}:_}function I1(_,$,J){if(!_)return _;if(_.path===$)return T1(_,J);if(!Array.isArray(_.children))return _;let Z=!1,j=_.children.map((Y)=>{let W=I1(Y,$,J);if(W!==Y)Z=!0;return W});return Z?{..._,children:j}:_}var k4=4,S1=14,Y6=8,j6=16;function w4(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],J=0;for(let Z of $)J+=w4(Z);return _.__bytes=J,J}function y4(_,$=0){let J=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:J,children:[]};if(!_||_.type!=="dir"||$>=k4)return Z;let j=Array.isArray(_.children)?_.children:[],Y=[];for(let K of j){let G=Math.max(0,Number(K?.__bytes??K?.size??0));if(G<=0)continue;if(K.type==="dir")Y.push({kind:"dir",node:K,size:G});else Y.push({kind:"file",name:K.name,path:K.path,size:G})}Y.sort((K,G)=>G.size-K.size);let W=Y;if(Y.length>S1){let K=Y.slice(0,S1-1),G=Y.slice(S1-1),V=G.reduce((X,U)=>X+U.size,0);K.push({kind:"other",name:`+${G.length} more`,path:`${Z.path}/[other]`,size:V}),W=K}return Z.children=W.map((K)=>{if(K.kind==="dir")return y4(K.node,$+1);return{name:K.name,path:K.path,size:K.size,children:[]}}),Z}function L4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,J=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(J==="dark")return!0;if(J==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function A4(_,$,J){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,j=J?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=J?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${j}% ${Y}%)`}function o2(_,$,J,Z){return{x:_+J*Math.cos(Z),y:$+J*Math.sin(Z)}}function f1(_,$,J,Z,j,Y){let W=Math.PI*2-0.0001,K=Y-j>W?j+W:Y,G=o2(_,$,Z,j),V=o2(_,$,Z,K),X=o2(_,$,J,K),U=o2(_,$,J,j),C=K-j>Math.PI?1:0;return[`M ${G.x.toFixed(3)} ${G.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${C} 1 ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`L ${X.x.toFixed(3)} ${X.y.toFixed(3)}`,`A ${J} ${J} 0 ${C} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var M4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function P4(_,$,J){let Z=[],j=[],Y=Math.max(0,Number($)||0),W=(K,G,V,X)=>{let U=Array.isArray(K?.children)?K.children:[];if(!U.length)return;let C=Math.max(0,Number(K.size)||0);if(C<=0)return;let L=V-G,D=G;U.forEach((M,S)=>{let z=Math.max(0,Number(M.size)||0);if(z<=0)return;let y=z/C,u=D,H=S===U.length-1?V:D+L*y;if(D=H,H-u<0.003)return;let T=M4[X];if(T){let t=A4(u,X,J);if(Z.push({key:M.path,path:M.path,label:M.name,size:z,color:t,depth:X,startAngle:u,endAngle:H,innerRadius:T[0],outerRadius:T[1],d:f1(120,120,T[0],T[1],u,H)}),X===1)j.push({key:M.path,name:M.name,size:z,pct:Y>0?z/Y*100:0,color:t})}if(X<k4)W(M,u,H,X+1)})};return W(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:j}}function x1(_,$){if(!_||!$)return null;if(_.path===$)return _;let J=Array.isArray(_.children)?_.children:[];for(let Z of J){let j=x1(Z,$);if(j)return j}return null}function b4(_,$,J,Z){if(!J||J<=0)return{segments:[],legend:[]};let j=M4[1];if(!j)return{segments:[],legend:[]};let Y=-Math.PI/2,W=Math.PI*3/2,K=A4(Y,1,Z),V=`${$||"."}/[files]`;return{segments:[{key:V,path:V,label:_,size:J,color:K,depth:1,startAngle:Y,endAngle:W,innerRadius:j[0],outerRadius:j[1],d:f1(120,120,j[0],j[1],Y,W)}],legend:[{key:V,name:_,size:J,pct:100,color:K}]}}function E4(_,$=!1,J=!1){if(!_)return null;let Z=w4(_),j=y4(_,0),Y=j.size||Z,{segments:W,legend:K}=P4(j,Y,J);if(!W.length&&Y>0){let G=b4("[files]",j.path,Y,J);W=G.segments,K=G.legend}return{root:j,totalSize:Y,segments:W,legend:K,truncated:$,isDarkTheme:J}}function X6({payload:_}){if(!_)return null;let[$,J]=f(null),[Z,j]=f(_?.root?.path||"."),[Y,W]=f(()=>[_?.root?.path||"."]),[K,G]=f(!1);g(()=>{let $_=_?.root?.path||".";j($_),W([$_]),J(null)},[_?.root?.path,_?.totalSize]),g(()=>{if(!Z)return;G(!0);let $_=setTimeout(()=>G(!1),180);return()=>clearTimeout($_)},[Z]);let V=b0(()=>{return x1(_.root,Z)||_.root},[_?.root,Z]),X=V?.size||_.totalSize||0,{segments:U,legend:C}=b0(()=>{let $_=P4(V,X,_.isDarkTheme);if($_.segments.length>0)return $_;if(X<=0)return $_;let j_=V?.children?.length?"Total":"[files]";return b4(j_,V?.path||_?.root?.path||".",X,_.isDarkTheme)},[V,X,_.isDarkTheme,_?.root?.path]),[L,D]=f(U),M=w(new Map),S=w(0);g(()=>{let $_=M.current,j_=new Map(U.map((o)=>[o.key,o])),e=performance.now(),i=220,J_=(o)=>{let __=Math.min(1,(o-e)/220),B_=__*(2-__),q_=U.map((p)=>{let K_=$_.get(p.key)||{startAngle:p.startAngle,endAngle:p.startAngle,innerRadius:p.innerRadius,outerRadius:p.innerRadius},V_=(C_,w_)=>C_+(w_-C_)*B_,k_=V_(K_.startAngle,p.startAngle),H_=V_(K_.endAngle,p.endAngle),y_=V_(K_.innerRadius,p.innerRadius),U_=V_(K_.outerRadius,p.outerRadius);return{...p,d:f1(120,120,y_,U_,k_,H_)}});if(D(q_),__<1)S.current=requestAnimationFrame(J_)};if(S.current)cancelAnimationFrame(S.current);return S.current=requestAnimationFrame(J_),M.current=j_,()=>{if(S.current)cancelAnimationFrame(S.current)}},[U]);let z=L.length?L:U,y=X>0?R0(X):"0 B",u=V?.name||"",T=(u&&u!=="."?u:"Total")||"Total",t=y,a=Y.length>1,Z_=($_)=>{if(!$_?.path)return;let j_=x1(_.root,$_.path);if(!j_||!Array.isArray(j_.children)||j_.children.length===0)return;W((e)=>[...e,j_.path]),j(j_.path),J(null)},W_=()=>{if(!a)return;W(($_)=>{let j_=$_.slice(0,-1);return j(j_[j_.length-1]||_?.root?.path||"."),j_}),J(null)};return B`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${K?" is-zooming":""}`} role="img"
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
                        <title>${$_.label} — ${R0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${a?" is-drill":""}`}
                    onClick=${W_}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${t}</text>
                </g>
            </svg>
            ${C.length>0&&B`
                <div class="workspace-folder-starburst-legend">
                    ${C.slice(0,8).map(($_)=>B`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${R0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&B`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function W6({mediaId:_}){let[$,J]=f(null);if(g(()=>{if(!_)return;I2(_).then(J).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size?R0($.metadata.size):"";return B`
        <a href=${j2(_)} download=${Z} class="file-attachment"
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
    `}function S4({onFileSelect:_,visible:$=!0,active:J=void 0,onOpenEditor:Z}){let[j,Y]=f(null),[W,K]=f(new Set(["."])),[G,V]=f(null),[X,U]=f(null),[C,L]=f(""),[D,M]=f(null),[S,z]=f(null),[y,u]=f(!0),[H,T]=f(!1),[t,a]=f(null),[Z_,W_]=f(()=>X2("workspaceShowHidden",!1)),[$_,j_]=f(!1),[e,i]=f(null),[J_,o]=f(null),[__,B_]=f(null),[q_,p]=f(!1),[G_,K_]=f(null),[V_,k_]=f(()=>L4()),[H_,y_]=f(()=>b1({stored:S0(l2),...P1()})),U_=w(W),C_=w(""),w_=w(null),c_=w(0),l_=w(new Set),h_=w(null),I_=w(new Map),P_=w(_),W0=w(Z),m_=w(null),x_=w(null),s_=w(null),V0=w(null),C0=w(null),D0=w(null),i_=w("."),L_=w(null),o_=w({path:null,dragging:!1,startX:0,startY:0}),u_=w({path:null,dragging:!1,startX:0,startY:0}),P=w({path:null,timer:0}),n=w(!1),D_=w(0),a_=w(new Map),N0=w(null),k0=w(null),w0=w(null),q0=w(null),n_=w(Z_),O0=w($),B0=w(J??$),z0=w(0),v_=w(__),Q0=w($_),I0=w(e),K0=w(null),x0=w({x:0,y:0}),G0=w(0),y0=w(null),t_=w(G),r_=w(X),Z0=w(null),e_=w(null),c0=w(D);P_.current=_,W0.current=Z,g(()=>{U_.current=W},[W]),g(()=>{n_.current=Z_},[Z_]),g(()=>{O0.current=$},[$]),g(()=>{B0.current=J??$},[J,$]),g(()=>{v_.current=__},[__]),g(()=>{if(typeof window>"u")return;let Q=()=>{y_(b1({stored:S0(l2),...P1()}))};Q();let O=()=>Q(),k=()=>Q(),E=(m)=>{if(!m||m.key===null||m.key===l2)Q()};window.addEventListener("resize",O),window.addEventListener("focus",k),window.addEventListener("storage",E);let v=window.matchMedia?.("(pointer: coarse)"),h=window.matchMedia?.("(hover: none)"),s=(m,Y_)=>{if(!m)return;if(m.addEventListener)m.addEventListener("change",Y_);else if(m.addListener)m.addListener(Y_)},r=(m,Y_)=>{if(!m)return;if(m.removeEventListener)m.removeEventListener("change",Y_);else if(m.removeListener)m.removeListener(Y_)};return s(v,O),s(h,O),()=>{window.removeEventListener("resize",O),window.removeEventListener("focus",k),window.removeEventListener("storage",E),r(v,O),r(h,O)}},[]),g(()=>{let Q=(O)=>{let k=O?.detail?.path;if(!k)return;let E=k.split("/"),v=[];for(let h=1;h<E.length;h++)v.push(E.slice(0,h).join("/"));if(v.length)K((h)=>{let s=new Set(h);s.add(".");for(let r of v)s.add(r);return s});V(k),requestAnimationFrame(()=>{let h=document.querySelector(`[data-path="${CSS.escape(k)}"]`);if(h)h.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",Q),()=>window.removeEventListener("workspace-reveal-path",Q)},[]),g(()=>{Q0.current=$_},[$_]),g(()=>{I0.current=e},[e]),g(()=>{t_.current=G},[G]),g(()=>{r_.current=X},[X]),g(()=>{c0.current=D},[D]),g(()=>{if(typeof window>"u"||typeof document>"u")return;let Q=()=>k_(L4());Q();let O=window.matchMedia?.("(prefers-color-scheme: dark)"),k=()=>Q();if(O?.addEventListener)O.addEventListener("change",k);else if(O?.addListener)O.addListener(k);let E=typeof MutationObserver<"u"?new MutationObserver(()=>Q()):null;if(E?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)E?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(O?.removeEventListener)O.removeEventListener("change",k);else if(O?.removeListener)O.removeListener(k);E?.disconnect()}},[]),g(()=>{if(!X)return;let Q=C0.current;if(!Q)return;let O=requestAnimationFrame(()=>{try{Q.focus(),Q.select()}catch{}});return()=>cancelAnimationFrame(O)},[X]);let m0=async(Q)=>{T(!0),M(null),z(null);try{let O=await M3(Q,20000);M(O)}catch(O){M({error:O.message||"Failed to load preview"})}finally{T(!1)}};m_.current=m0;let g0=async()=>{if(!O0.current)return;try{let Q=await x2("",1,n_.current),O=F4(Q.root,U_.current,n_.current);if(O===C_.current){u(!1);return}if(C_.current=O,w_.current=Q.root,!c_.current)c_.current=requestAnimationFrame(()=>{c_.current=0,Y((k)=>T1(k,w_.current)),u(!1)})}catch(Q){a(Q.message||"Failed to load workspace"),u(!1)}},T0=async(Q)=>{if(!Q)return;if(l_.current.has(Q))return;l_.current.add(Q);try{let O=await x2(Q,1,n_.current);Y((k)=>I1(k,Q,O.root))}catch(O){a(O.message||"Failed to load workspace")}finally{l_.current.delete(Q)}};x_.current=T0;let T_=b(()=>{let Q=G;if(!Q)return".";let O=I_.current?.get(Q);if(O&&O.type==="dir")return O.path;if(Q==="."||!Q.includes("/"))return".";let k=Q.split("/");return k.pop(),k.join("/")||"."},[G]),Y0=b((Q)=>{let O=Q?.closest?.(".workspace-row");if(!O)return null;let k=O.dataset.path,E=O.dataset.type;if(!k)return null;if(E==="dir")return k;if(k.includes("/")){let v=k.split("/");return v.pop(),v.join("/")||"."}return"."},[]),H0=b((Q)=>{return Y0(Q?.target||null)},[Y0]),R_=b((Q)=>{v_.current=Q,B_(Q)},[]),g_=b(()=>{let Q=P.current;if(Q?.timer)clearTimeout(Q.timer);P.current={path:null,timer:0}},[]),j0=b((Q)=>{if(!Q||Q==="."){g_();return}let O=I_.current?.get(Q);if(!O||O.type!=="dir"){g_();return}if(U_.current?.has(Q)){g_();return}if(P.current?.path===Q)return;g_();let k=setTimeout(()=>{P.current={path:null,timer:0},x_.current?.(Q),K((E)=>{let v=new Set(E);return v.add(Q),v})},600);P.current={path:Q,timer:k}},[g_]),U0=b((Q,O)=>{if(x0.current={x:Q,y:O},G0.current)return;G0.current=requestAnimationFrame(()=>{G0.current=0;let k=K0.current;if(!k)return;let E=x0.current;k.style.transform=`translate(${E.x+12}px, ${E.y+12}px)`})},[]),A0=b((Q)=>{if(!Q)return;let k=(I_.current?.get(Q)?.name||Q.split("/").pop()||Q).trim();if(!k)return;o({path:Q,label:k})},[]),f0=b(()=>{if(o(null),G0.current)cancelAnimationFrame(G0.current),G0.current=0;if(K0.current)K0.current.style.transform="translate(-9999px, -9999px)"},[]),a0=b((Q)=>{if(!Q)return".";let O=I_.current?.get(Q);if(O&&O.type==="dir")return O.path;if(Q==="."||!Q.includes("/"))return".";let k=Q.split("/");return k.pop(),k.join("/")||"."},[]),_0=b(()=>{U(null),L("")},[]),F=b((Q)=>{if(!Q)return;let k=(I_.current?.get(Q)?.name||Q.split("/").pop()||Q).trim();if(!k||Q===".")return;U(Q),L(k)},[]),R=b(async()=>{let Q=r_.current;if(!Q)return;let O=(C||"").trim();if(!O){_0();return}let k=I_.current?.get(Q),E=(k?.name||Q.split("/").pop()||Q).trim();if(O===E){_0();return}try{let h=(await S3(Q,O))?.path||Q,s=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(_0(),a(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:Q,newPath:h,type:k?.type||"file"}})),k?.type==="dir")K((r)=>{let m=new Set;for(let Y_ of r)if(Y_===Q)m.add(h);else if(Y_.startsWith(`${Q}/`))m.add(`${h}${Y_.slice(Q.length)}`);else m.add(Y_);return m});if(V(h),k?.type==="dir")M(null),T(!1),z(null);else m_.current?.(h);x_.current?.(s)}catch(v){a(v?.message||"Failed to rename file")}},[_0,C]),d=b(async(Q)=>{let E=Q||".";for(let v=0;v<50;v+=1){let s=`untitled${v===0?"":`-${v}`}.md`;try{let m=(await b3(E,s,""))?.path||(E==="."?s:`${E}/${s}`);if(E&&E!==".")K((Y_)=>new Set([...Y_,E]));V(m),a(null),x_.current?.(E),m_.current?.(m);return}catch(r){if(r?.status===409||r?.code==="file_exists")continue;a(r?.message||"Failed to create file");return}}a("Failed to create file (untitled name already in use).")},[]),X_=b((Q)=>{if(Q?.stopPropagation?.(),q_)return;let O=a0(t_.current);d(O)},[q_,a0,d]);g(()=>{if(typeof window>"u")return;let Q=(O)=>{let k=O?.detail?.updates||[];if(!Array.isArray(k)||k.length===0)return;Y((r)=>{let m=r;for(let Y_ of k){if(!Y_?.root)continue;if(!m||Y_.path==="."||!Y_.path)m=Y_.root;else m=I1(m,Y_.path,Y_.root)}if(m)C_.current=F4(m,U_.current,n_.current);return u(!1),m});let E=t_.current;if(Boolean(E)&&k.some((r)=>{let m=r?.path||"";if(!m||m===".")return!0;return E===m||E.startsWith(`${m}/`)||m.startsWith(`${E}/`)}))a_.current.clear();if(!E||!c0.current)return;let h=I_.current?.get(E);if(h&&h.type==="dir")return;if(k.some((r)=>{let m=r?.path||"";if(!m||m===".")return!0;return E===m||E.startsWith(`${m}/`)}))m_.current?.(E)};return window.addEventListener("workspace-update",Q),()=>window.removeEventListener("workspace-update",Q)},[]),h_.current=g0;let F_=w(()=>{if(typeof window>"u")return;let Q=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),O=B0.current??O0.current,k=document.visibilityState!=="hidden"&&(O||Q.matches&&O0.current);T2(k,n_.current).catch(()=>{})}).current,A_=w(0),z_=w(()=>{if(A_.current)clearTimeout(A_.current);A_.current=setTimeout(()=>{A_.current=0,F_()},250)}).current;g(()=>{if(O0.current)h_.current?.();z_()},[$,J]),g(()=>{h_.current(),F_();let Q=setInterval(()=>h_.current(),Z6),O=W2("previewHeight",null),k=Number.isFinite(O)?Math.min(Math.max(O,80),600):280;if(D_.current=k,s_.current)s_.current.style.setProperty("--preview-height",`${k}px`);let E=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>z_();if(E.addEventListener)E.addEventListener("change",v);else if(E.addListener)E.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(Q),c_.current)cancelAnimationFrame(c_.current),c_.current=0;if(E.removeEventListener)E.removeEventListener("change",v);else if(E.removeListener)E.removeListener(v);if(document.removeEventListener("visibilitychange",v),A_.current)clearTimeout(A_.current),A_.current=0;if(L_.current)clearTimeout(L_.current),L_.current=null;T2(!1,n_.current).catch(()=>{})}},[]);let b_=b0(()=>D4(j,W,Z_),[j,W,Z_]),E0=b0(()=>new Map(b_.map((Q)=>[Q.node.path,Q.node])),[b_]),u0=b0(()=>U4(H_),[H_]);I_.current=E0;let O_=(G?I_.current.get(G):null)?.type==="dir";g(()=>{if(!G||!O_){K_(null),N0.current=null,k0.current=null;return}let Q=G,O=`${Z_?"hidden":"visible"}:${G}`,k=a_.current,E=k.get(O);if(E?.root){k.delete(O),k.set(O,E);let s=E4(E.root,Boolean(E.truncated),V_);if(s)N0.current=s,k0.current=G,K_({loading:!1,error:null,payload:s});return}let v=N0.current,h=k0.current;K_({loading:!0,error:null,payload:h===G?v:null}),x2(G,Y6,Z_).then((s)=>{if(t_.current!==Q)return;let r={root:s?.root,truncated:Boolean(s?.truncated)};k.delete(O),k.set(O,r);while(k.size>j6){let Y_=k.keys().next().value;if(!Y_)break;k.delete(Y_)}let m=E4(r.root,r.truncated,V_);N0.current=m,k0.current=G,K_({loading:!1,error:null,payload:m})}).catch((s)=>{if(t_.current!==Q)return;K_({loading:!1,error:s?.message||"Failed to load folder size chart",payload:h===G?v:null})})},[G,O_,Z_,V_]);let v0=Boolean(D&&D.kind==="text"&&!O_&&(!D.size||D.size<=262144)),V2=v0?"Open in editor":D?.size>262144?"File too large to edit":"File is not editable";g(()=>{let Q=w0.current;if(q0.current)q0.current.dispose(),q0.current=null;if(!Q)return;if(Q.innerHTML="",!G||O_||!D||D.error)return;let O={path:G,content:typeof D.text==="string"?D.text:void 0,mtime:D.mtime,size:D.size,preview:D,mode:"view"},k=p_.resolve(O)||p_.get("workspace-preview-default");if(!k)return;let E=k.mount(Q,O);return q0.current=E,()=>{if(q0.current===E)E.dispose(),q0.current=null;Q.innerHTML=""}},[G,O_,D]);let n0=(Q)=>{let O=Q?.target;if(O instanceof Element)return O;return O?.parentElement||null},N2=w((Q)=>{if(e_.current)clearTimeout(e_.current),e_.current=null;let k=n0(Q)?.closest?.("[data-path]");if(!k)return;let E=k.dataset.path;if(k.dataset.type==="dir"||!E)return;if(r_.current===E)_0();W0.current?.(E)}).current,r2=w((Q)=>{if(n.current){n.current=!1;return}let O=n0(Q),k=O?.closest?.("[data-path]");if(V0.current?.focus?.(),!k)return;let E=k.dataset.path,v=k.dataset.type,h=Boolean(O?.closest?.(".workspace-caret")),s=Boolean(O?.closest?.("button"))||Boolean(O?.closest?.("a"))||Boolean(O?.closest?.("input")),r=t_.current===E,m=r_.current;if(m){if(m===E)return;_0()}let Y_=v==="file"&&Z0.current===E&&!h&&!s;if(r&&!h&&!s&&E!=="."&&!Y_){if(e_.current)clearTimeout(e_.current);e_.current=setTimeout(()=>{e_.current=null,F(E)},350);return}if(v==="dir"){if(Z0.current=null,V(E),M(null),z(null),T(!1),!U_.current.has(E))x_.current?.(E);if(r&&!h)return;K((J0)=>{let i0=new Set(J0);if(i0.has(E))i0.delete(E);else i0.add(E);return i0})}else{Z0.current=null,V(E);let X0=I_.current.get(E);if(X0)P_.current?.(X0.path,X0);m_.current?.(E)}}).current,r0=w(()=>{C_.current="",h_.current(),Array.from(U_.current||[]).filter((O)=>O&&O!==".").forEach((O)=>x_.current?.(O))}).current,F0=w(()=>{Z0.current=null,V(null),M(null),z(null),T(!1)}).current,$0=w(()=>{W_((Q)=>{let O=!Q;if(typeof window<"u")f_("workspaceShowHidden",String(O));return n_.current=O,T2(!0,O).catch(()=>{}),C_.current="",h_.current?.(),Array.from(U_.current||[]).filter((E)=>E&&E!==".").forEach((E)=>x_.current?.(E)),O})}).current,d2=w((Q)=>{if(n0(Q)?.closest?.("[data-path]"))return;F0()}).current,d0=b(async(Q)=>{if(!Q)return;let O=Q.split("/").pop()||Q;if(!window.confirm(`Delete "${O}"? This cannot be undone.`))return;try{await x3(Q);let E=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(t_.current===Q)F0();x_.current?.(E),a(null)}catch(E){M((v)=>({...v||{},error:E.message||"Failed to delete file"}))}},[F0]),t0=b((Q)=>{let O=V0.current;if(!O||!Q||typeof CSS>"u"||typeof CSS.escape!=="function")return;O.querySelector(`[data-path="${CSS.escape(Q)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),M0=b((Q)=>{let O=b_;if(!O||O.length===0)return;let k=G?O.findIndex((E)=>E.node.path===G):-1;if(Q.key==="ArrowDown"){Q.preventDefault();let E=Math.min(k+1,O.length-1),v=O[E];if(!v)return;if(V(v.node.path),v.node.type!=="dir")P_.current?.(v.node.path,v.node),m_.current?.(v.node.path);else M(null),T(!1),z(null);t0(v.node.path);return}if(Q.key==="ArrowUp"){Q.preventDefault();let E=k<=0?0:k-1,v=O[E];if(!v)return;if(V(v.node.path),v.node.type!=="dir")P_.current?.(v.node.path,v.node),m_.current?.(v.node.path);else M(null),T(!1),z(null);t0(v.node.path);return}if(Q.key==="ArrowRight"&&k>=0){let E=O[k];if(E?.node?.type==="dir"&&!W.has(E.node.path))Q.preventDefault(),x_.current?.(E.node.path),K((v)=>new Set([...v,E.node.path]));return}if(Q.key==="ArrowLeft"&&k>=0){let E=O[k];if(E?.node?.type==="dir"&&W.has(E.node.path))Q.preventDefault(),K((v)=>{let h=new Set(v);return h.delete(E.node.path),h});return}if(Q.key==="Enter"&&k>=0){Q.preventDefault();let E=O[k];if(!E)return;let v=E.node.path;if(E.node.type==="dir"){if(!U_.current.has(v))x_.current?.(v);K((s)=>{let r=new Set(s);if(r.has(v))r.delete(v);else r.add(v);return r}),M(null),z(null),T(!1)}else P_.current?.(v,E.node),m_.current?.(v);return}if((Q.key==="Delete"||Q.key==="Backspace")&&k>=0){let E=O[k];if(!E||E.node.type==="dir")return;Q.preventDefault(),d0(E.node.path);return}if(Q.key==="Escape")Q.preventDefault(),F0()},[F0,d0,W,b_,t0,G]),P0=b((Q)=>{let O=Q?.target?.closest?.(".workspace-row");if(!O)return;let k=O.dataset.type,E=O.dataset.path;if(!E||E===".")return;if(r_.current===E)return;let v=Q?.touches?.[0];if(!v)return;if(o_.current={path:E,dragging:!1,startX:v.clientX,startY:v.clientY},k!=="file")return;if(L_.current)clearTimeout(L_.current);L_.current=setTimeout(()=>{if(L_.current=null,o_.current?.dragging)return;d0(E)},600)},[d0]),F2=b(()=>{if(L_.current)clearTimeout(L_.current),L_.current=null;let Q=o_.current;if(Q?.dragging&&Q.path){let O=v_.current||T_(),k=y0.current;if(typeof k==="function")k(Q.path,O)}o_.current={path:null,dragging:!1,startX:0,startY:0},z0.current=0,j_(!1),i(null),R_(null),g_(),f0()},[T_,f0,R_,g_]),L2=b((Q)=>{let O=o_.current,k=Q?.touches?.[0];if(!k||!O?.path){if(L_.current)clearTimeout(L_.current),L_.current=null;return}let E=Math.abs(k.clientX-O.startX),v=Math.abs(k.clientY-O.startY),h=E>8||v>8;if(h&&L_.current)clearTimeout(L_.current),L_.current=null;if(!O.dragging&&h)O.dragging=!0,j_(!0),i("move"),A0(O.path);if(O.dragging){Q.preventDefault(),U0(k.clientX,k.clientY);let s=document.elementFromPoint(k.clientX,k.clientY),r=Y0(s)||T_();if(v_.current!==r)R_(r);j0(r)}},[Y0,T_,A0,U0,R_,j0]),e0=w((Q)=>{Q.preventDefault();let O=s_.current;if(!O)return;let k=Q.clientY,E=D_.current||280,v=Q.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let h=k,s=(m)=>{h=m.clientY;let Y_=O.clientHeight-80,X0=Math.min(Math.max(E-(m.clientY-k),80),Y_);O.style.setProperty("--preview-height",`${X0}px`),D_.current=X0},r=()=>{let m=O.clientHeight-80,Y_=Math.min(Math.max(E-(h-k),80),m);D_.current=Y_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("previewHeight",String(Math.round(Y_))),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",r)}).current,s2=w((Q)=>{Q.preventDefault();let O=s_.current;if(!O)return;let k=Q.touches[0];if(!k)return;let E=k.clientY,v=D_.current||280,h=Q.currentTarget;h.classList.add("dragging"),document.body.style.userSelect="none";let s=(m)=>{let Y_=m.touches[0];if(!Y_)return;m.preventDefault();let X0=O.clientHeight-80,J0=Math.min(Math.max(v-(Y_.clientY-E),80),X0);O.style.setProperty("--preview-height",`${J0}px`),D_.current=J0},r=()=>{h.classList.remove("dragging"),document.body.style.userSelect="",f_("previewHeight",String(Math.round(D_.current||v))),document.removeEventListener("touchmove",s),document.removeEventListener("touchend",r),document.removeEventListener("touchcancel",r)};document.addEventListener("touchmove",s,{passive:!1}),document.addEventListener("touchend",r),document.addEventListener("touchcancel",r)}).current,a2=async()=>{if(!G)return;try{let Q=await P3(G);if(Q.media_id)z(Q.media_id)}catch(Q){M((O)=>({...O||{},error:Q.message||"Failed to attach"}))}},t2=async()=>{if(!G||O_)return;await d0(G)},_2=(Q)=>{return Array.from(Q?.dataTransfer?.types||[]).includes("Files")},e2=b((Q)=>{if(!_2(Q))return;if(Q.preventDefault(),z0.current+=1,!Q0.current)j_(!0);i("upload");let O=H0(Q)||T_();R_(O),j0(O)},[T_,H0,R_,j0]),_1=b((Q)=>{if(!_2(Q))return;if(Q.preventDefault(),Q.dataTransfer)Q.dataTransfer.dropEffect="copy";if(!Q0.current)j_(!0);if(I0.current!=="upload")i("upload");let O=H0(Q)||T_();if(v_.current!==O)R_(O);j0(O)},[T_,H0,R_,j0]),$2=b((Q)=>{if(!_2(Q))return;if(Q.preventDefault(),z0.current=Math.max(0,z0.current-1),z0.current===0)j_(!1),i(null),R_(null),g_()},[R_,g_]),p0=b(async(Q,O=".")=>{let k=Array.from(Q||[]);if(k.length===0)return;let E=O&&O!==""?O:".",v=E!=="."?E:"workspace root";p(!0);try{let h=null;for(let s of k)try{h=await q1(s,E)}catch(r){let m=r?.status,Y_=r?.code;if(m===409||Y_==="file_exists"){let X0=s?.name||"file";if(!window.confirm(`"${X0}" already exists in ${v}. Overwrite?`))continue;h=await q1(s,E,{overwrite:!0})}else throw r}if(h?.path)Z0.current=h.path,V(h.path),m_.current?.(h.path);x_.current?.(E)}catch(h){a(h.message||"Failed to upload file")}finally{p(!1)}},[]),h0=b(async(Q,O)=>{if(!Q)return;let k=I_.current?.get(Q);if(!k)return;let E=O&&O!==""?O:".",v=Q.includes("/")?Q.split("/").slice(0,-1).join("/")||".":".";if(E===v)return;try{let s=(await I3(Q,E))?.path||Q;if(k.type==="dir")K((r)=>{let m=new Set;for(let Y_ of r)if(Y_===Q)m.add(s);else if(Y_.startsWith(`${Q}/`))m.add(`${s}${Y_.slice(Q.length)}`);else m.add(Y_);return m});if(V(s),k.type==="dir")M(null),T(!1),z(null);else m_.current?.(s);x_.current?.(v),x_.current?.(E)}catch(h){a(h?.message||"Failed to move entry")}},[]);y0.current=h0;let $1=b(async(Q)=>{if(!_2(Q))return;Q.preventDefault(),z0.current=0,j_(!1),i(null),B_(null),g_();let O=Array.from(Q?.dataTransfer?.files||[]);if(O.length===0)return;let k=v_.current||H0(Q)||T_();await p0(O,k)},[T_,H0,p0]),J1=b((Q)=>{if(Q?.stopPropagation?.(),q_)return;let O=Q?.currentTarget?.dataset?.uploadTarget||".";i_.current=O,D0.current?.click()},[q_]),Z1=b(()=>{if(q_)return;let Q=t_.current,O=Q?I_.current?.get(Q):null;i_.current=O?.type==="dir"?O.path:".",D0.current?.click()},[q_]),Y1=b((Q)=>{if(!Q||Q.button!==0)return;let O=Q.currentTarget;if(!O||!O.dataset)return;let k=O.dataset.path;if(!k||k===".")return;if(r_.current===k)return;if(Q.target?.closest?.("button, a, input, .workspace-caret"))return;Q.preventDefault(),u_.current={path:k,dragging:!1,startX:Q.clientX,startY:Q.clientY};let E=(h)=>{let s=u_.current;if(!s?.path)return;let r=Math.abs(h.clientX-s.startX),m=Math.abs(h.clientY-s.startY),Y_=r>4||m>4;if(!s.dragging&&Y_)s.dragging=!0,n.current=!0,j_(!0),i("move"),A0(s.path),U0(h.clientX,h.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(s.dragging){h.preventDefault(),U0(h.clientX,h.clientY);let X0=document.elementFromPoint(h.clientX,h.clientY),J0=Y0(X0)||T_();if(v_.current!==J0)R_(J0);j0(J0)}},v=()=>{document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",v);let h=u_.current;if(h?.dragging&&h.path){let s=v_.current||T_(),r=y0.current;if(typeof r==="function")r(h.path,s)}u_.current={path:null,dragging:!1,startX:0,startY:0},z0.current=0,j_(!1),i(null),R_(null),g_(),f0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{n.current=!1},0)};document.addEventListener("mousemove",E),document.addEventListener("mouseup",v)},[Y0,T_,A0,U0,f0,R_,j0,g_]),j1=b(async(Q)=>{let O=Array.from(Q?.target?.files||[]);if(O.length===0)return;let k=i_.current||".";if(await p0(O,k),i_.current=".",Q?.target)Q.target.value=""},[p0]);return B`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            data-workspace-scale=${H_}
            ref=${s_}
            onDragEnter=${e2}
            onDragOver=${_1}
            onDragLeave=${$2}
            onDrop=${$1}
        >
            <input type="file" multiple style="display:none" ref=${D0} onChange=${j1} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${X_} title="New file" disabled=${q_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${r0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Z_?" active":""}`}
                        onClick=${$0}
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
            <div class="workspace-tree" onClick=${d2}>
                ${q_&&B`<div class="workspace-drop-hint">Uploading…</div>`}
                ${y&&B`<div class="workspace-loading">Loading…</div>`}
                ${t&&B`<div class="workspace-error">${t}</div>`}
                ${j&&B`
                    <div
                        class="workspace-tree-list"
                        ref=${V0}
                        tabIndex="0"
                        onClick=${r2}
                        onDblClick=${N2}
                        onKeyDown=${M0}
                        onTouchStart=${P0}
                        onTouchEnd=${F2}
                        onTouchMove=${L2}
                        onTouchCancel=${F2}
                    >
                        ${b_.map(({node:Q,depth:O})=>{let k=Q.type==="dir",E=Q.path===G,v=Q.path===X,h=k&&W.has(Q.path),s=__&&Q.path===__,r=Array.isArray(Q.children)&&Q.children.length>0?Q.children.length:Number(Q.child_count)||0;return B`
                                <div
                                    key=${Q.path}
                                    class=${`workspace-row${E?" selected":""}${s?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+O*u0.indentPx}px`}}
                                    data-path=${Q.path}
                                    data-type=${Q.type}
                                    onMouseDown=${Y1}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${k?h?B`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:B`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${k?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${k?B`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:B`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${v?B`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${C0}
                                                value=${C}
                                                onInput=${(m)=>L(m?.target?.value||"")}
                                                onKeyDown=${(m)=>{if(m.key==="Enter")m.preventDefault(),R();else if(m.key==="Escape")m.preventDefault(),_0()}}
                                                onBlur=${_0}
                                                onClick=${(m)=>m.stopPropagation()}
                                            />
                                        `:B`<span class="workspace-label">${Q.name}</span>`}
                                    ${k&&!h&&r>0&&B`
                                        <span class="workspace-count">${r}</span>
                                    `}
                                    ${k&&B`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${Q.path}
                                            title="Upload files to this folder"
                                            onClick=${J1}
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
            ${G&&B`
                <div class="workspace-preview-splitter-h" onMouseDown=${e0} onTouchStart=${s2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${G}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${X_} title="New file" disabled=${q_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!O_&&B`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>v0&&W0.current?.(G,D)}
                                    title=${V2}
                                    disabled=${!v0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${t2}
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
                            ${O_?B`
                                    <button class="workspace-download" onClick=${Z1}
                                        title="Upload files to this folder" disabled=${q_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${T3(G,Z_)}
                                        title="Download folder as zip" onClick=${(Q)=>Q.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:B`<button class="workspace-download" onClick=${a2} title="Download">
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
                    ${O_&&B`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${G_?.loading&&B`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${G_?.error&&B`<div class="workspace-error">${G_.error}</div>`}
                        ${G_?.payload&&G_.payload.segments?.length>0&&B`
                            <${X6} payload=${G_.payload} />
                        `}
                        ${G_?.payload&&(!G_.payload.segments||G_.payload.segments.length===0)&&B`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${D&&!D.error&&!O_&&B`
                        <div class="workspace-preview-meta">
                            ${D.size?B`<span>${R0(D.size)}</span>`:""}
                            ${D.mtime?B`<span>${p2(D.mtime)}</span>`:""}
                            ${D.truncated?B`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${w0}></div>
                    `}
                    ${S&&B`
                        <div class="workspace-download-card">
                            <${W6} mediaId=${S} />
                        </div>
                    `}
                </div>
            `}
            ${J_&&B`
                <div class="workspace-drag-ghost" ref=${K0}>${J_.label}</div>
            `}
        </aside>
    `}function I4({tabs:_,activeId:$,onActivate:J,onClose:Z,onCloseOthers:j,onCloseAll:Y,onTogglePin:W,onTogglePreview:K,previewTabs:G,onToggleDock:V,dockVisible:X}){let[U,C]=f(null),L=w(null);g(()=>{if(!U)return;let z=(y)=>{if(y.type==="keydown"&&y.key!=="Escape")return;C(null)};return document.addEventListener("click",z),document.addEventListener("keydown",z),()=>{document.removeEventListener("click",z),document.removeEventListener("keydown",z)}},[U]),g(()=>{let z=(y)=>{if(y.ctrlKey&&y.key==="Tab"){if(y.preventDefault(),!_.length)return;let u=_.findIndex((H)=>H.id===$);if(y.shiftKey){let H=_[(u-1+_.length)%_.length];J?.(H.id)}else{let H=_[(u+1)%_.length];J?.(H.id)}return}if((y.ctrlKey||y.metaKey)&&y.key==="w"){let u=document.querySelector(".editor-pane");if(u&&u.contains(document.activeElement)){if(y.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[_,$,J,Z]);let D=b((z,y)=>{if(z.button===1){z.preventDefault(),Z?.(y);return}if(z.button===0)J?.(y)},[J,Z]),M=b((z,y)=>{z.preventDefault(),C({id:y,x:z.clientX,y:z.clientY})},[]),S=b((z,y)=>{z.stopPropagation(),Z?.(y)},[Z]);if(g(()=>{if(!$||!L.current)return;let z=L.current.querySelector(".tab-item.active");if(z)z.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return B`
        <div class="tab-strip" ref=${L} role="tablist">
            ${_.map((z)=>B`
                <div
                    key=${z.id}
                    class=${`tab-item${z.id===$?" active":""}${z.dirty?" dirty":""}${z.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${z.id===$}
                    title=${z.path}
                    onMouseDown=${(y)=>D(y,z.id)}
                    onContextMenu=${(y)=>M(y,z.id)}
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
                        onClick=${(y)=>S(y,z.id)}
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
                <button onClick=${()=>{Z?.(U.id),C(null)}}>Close</button>
                <button onClick=${()=>{j?.(U.id),C(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),C(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{W?.(U.id),C(null)}}>
                    ${_.find((z)=>z.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${K&&/\.(md|mdx|markdown)$/i.test(U.id)&&B`
                    <hr />
                    <button onClick=${()=>{K(U.id),C(null)}}>
                        ${G?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var Q6=400,u1=60,x4=220,v1="mdPreviewHeight";function K6(){try{let _=localStorage.getItem(v1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=u1?$:x4}catch{return x4}}function T4({getContent:_,path:$,onClose:J}){let[Z,j]=f(""),[Y,W]=f(K6),K=w(null),G=w(null),V=w(""),X=w(_);return X.current=_,g(()=>{let L=()=>{let M=X.current?.()||"";if(M===V.current)return;V.current=M;try{let S=G2(M,null,{sanitize:!1});j(S)}catch{j('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};L();let D=setInterval(L,Q6);return()=>clearInterval(D)},[]),g(()=>{if(K.current&&Z)g2(K.current).catch(()=>{})},[Z]),B`
        <div
            class="md-preview-splitter"
            onMouseDown=${(L)=>{L.preventDefault();let D=L.clientY,M=G.current?.offsetHeight||Y,S=G.current?.parentElement,z=S?S.offsetHeight*0.7:500,y=L.currentTarget;y.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let u=(T)=>{let t=Math.min(Math.max(M-(T.clientY-D),u1),z);W(t)},H=()=>{y.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(v1,String(Math.round(G.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",H)}}
            onTouchStart=${(L)=>{L.preventDefault();let D=L.touches[0];if(!D)return;let M=D.clientY,S=G.current?.offsetHeight||Y,z=G.current?.parentElement,y=z?z.offsetHeight*0.7:500,u=L.currentTarget;u.classList.add("dragging"),document.body.style.userSelect="none";let H=(t)=>{let a=t.touches[0];if(!a)return;t.preventDefault();let Z_=Math.min(Math.max(S-(a.clientY-M),u1),y);W(Z_)},T=()=>{u.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(v1,String(Math.round(G.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",H),document.removeEventListener("touchend",T),document.removeEventListener("touchcancel",T)};document.addEventListener("touchmove",H,{passive:!1}),document.addEventListener("touchend",T),document.addEventListener("touchcancel",T)}}
        ></div>
        <div class="md-preview-panel" ref=${G} style=${{height:Y+"px"}}>
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
                ref=${K}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function f4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:J}){g(()=>{J();let Z=new B1(_,$);Z.connect();let j=()=>{Z.reconnectIfNeeded()};return window.addEventListener("focus",j),document.addEventListener("visibilitychange",j),()=>{window.removeEventListener("focus",j),document.removeEventListener("visibilitychange",j),Z.disconnect()}},[$,_,J])}function u4(){let[_,$]=f(!1),[J,Z]=f("default"),j=w(!1);g(()=>{let G=X2("notificationsEnabled",!1);if(j.current=G,$(G),typeof Notification<"u")Z(Notification.permission)},[]),g(()=>{j.current=_},[_]);let Y=b(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let G=Notification.requestPermission();if(G&&typeof G.then==="function")return G;return Promise.resolve(G)}catch{return Promise.resolve("default")}},[]),W=b(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let V=await Y();if(Z(V||"default"),V!=="granted"){j.current=!1,$(!1),f_("notificationsEnabled","false");return}}let G=!j.current;j.current=G,$(G),f_("notificationsEnabled",String(G))},[Y]),K=b((G,V)=>{if(!j.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let X=new Notification(G,{body:V});return X.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:J,toggleNotifications:W,notify:K}}var U2=(_)=>{let $=new Set;return(_||[]).filter((J)=>{if(!J||$.has(J.id))return!1;return $.add(J.id),!0})};function v4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[J,Z]=f(null),[j,Y]=f(!1),W=w(!1),K=w(null),G=w(!1),V=w(null);g(()=>{W.current=j},[j]);let X=b(async(L=null)=>{try{if(L){let D=await H3(L);Z(D.posts),Y(!1)}else{let D=await S2(10);Z(D.posts),Y(D.has_more)}}catch(D){console.error("Failed to load posts:",D)}},[]),U=b(async()=>{try{let L=await S2(10);Z((D)=>{if(!D||D.length===0)return L.posts;return U2([...L.posts,...D])}),Y((D)=>D||L.has_more)}catch(L){console.error("Failed to refresh timeline:",L)}},[]),C=b(async(L={})=>{if(!J||J.length===0)return;if(G.current)return;let{preserveScroll:D=!0,preserveMode:M="top",allowRepeat:S=!1}=L,z=(H)=>{if(!D){H();return}if(M==="top")$(H);else _(H)},u=J.slice().sort((H,T)=>H.id-T.id)[0]?.id;if(!Number.isFinite(u))return;if(!S&&V.current===u)return;G.current=!0,V.current=u;try{let H=await S2(10,u);if(H.posts.length>0)z(()=>{Z((T)=>U2([...H.posts,...T||[]])),Y(H.has_more)});else Y(!1)}catch(H){console.error("Failed to load more posts:",H)}finally{G.current=!1}},[J,_,$]);return g(()=>{K.current=C},[C]),{posts:J,setPosts:Z,hasMore:j,setHasMore:Y,hasMoreRef:W,loadPosts:X,refreshTimeline:U,loadMore:C,loadMoreRef:K,loadingMoreRef:G,lastBeforeIdRef:V}}function R4(){let[_,$]=f(null),[J,Z]=f({text:"",totalLines:0}),[j,Y]=f(""),[W,K]=f({text:"",totalLines:0}),[G,V]=f(null),[X,U]=f(null),[C,L]=f(null),D=w(null),M=w(0),S=w(!1),z=w(""),y=w(""),u=w(null),H=w(null),T=w(null),t=w(null),a=w(!1),Z_=w(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:J,setAgentDraft:Z,agentPlan:j,setAgentPlan:Y,agentThought:W,setAgentThought:K,pendingRequest:G,setPendingRequest:V,currentTurnId:X,setCurrentTurnId:U,steerQueuedTurnId:C,setSteerQueuedTurnId:L,lastAgentEventRef:D,lastSilenceNoticeRef:M,isAgentRunningRef:S,draftBufferRef:z,thoughtBufferRef:y,pendingRequestRef:u,stalledPostIdRef:H,currentTurnIdRef:T,steerQueuedTurnIdRef:t,thoughtExpandedRef:a,draftExpandedRef:Z_}}function c4({appShellRef:_,sidebarWidthRef:$,editorWidthRef:J,dockHeightRef:Z}){let j=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientX,L=$.current||280,D=X.currentTarget;D.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientX;let u=Math.min(Math.max(L+(y.clientX-C),160),600);U.style.setProperty("--sidebar-width",`${u}px`),$.current=u},z=()=>{let y=Math.min(Math.max(L+(M-C),160),600);$.current=y,D.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",f_("sidebarWidth",String(Math.round(y))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,Y=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientX,D=$.current||280,M=X.currentTarget;M.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let S=(y)=>{let u=y.touches[0];if(!u)return;y.preventDefault();let H=Math.min(Math.max(D+(u.clientX-L),160),600);U.style.setProperty("--sidebar-width",`${H}px`),$.current=H},z=()=>{M.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",f_("sidebarWidth",String(Math.round($.current||D))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,W=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientX,L=J.current||$.current||280,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientX;let u=Math.min(Math.max(L+(y.clientX-C),200),800);U.style.setProperty("--editor-width",`${u}px`),J.current=u},z=()=>{let y=Math.min(Math.max(L+(M-C),200),800);J.current=y,D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("editorWidth",String(Math.round(y))),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,K=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientX,D=J.current||$.current||280,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(y)=>{let u=y.touches[0];if(!u)return;y.preventDefault();let H=Math.min(Math.max(D+(u.clientX-L),200),800);U.style.setProperty("--editor-width",`${H}px`),J.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",f_("editorWidth",String(Math.round(J.current||D))),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current,G=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.clientY,L=Z?.current||200,D=X.currentTarget;D.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let M=C,S=(y)=>{M=y.clientY;let u=Math.min(Math.max(L-(y.clientY-C),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${u}px`),Z)Z.current=u},z=()=>{let y=Math.min(Math.max(L-(M-C),100),window.innerHeight*0.5);if(Z)Z.current=y;D.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("dockHeight",String(Math.round(y))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)}).current,V=w((X)=>{X.preventDefault();let U=_.current;if(!U)return;let C=X.touches[0];if(!C)return;let L=C.clientY,D=Z?.current||200,M=X.currentTarget;M.classList.add("dragging"),document.body.style.userSelect="none";let S=(y)=>{let u=y.touches[0];if(!u)return;y.preventDefault();let H=Math.min(Math.max(D-(u.clientY-L),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${H}px`),Z)Z.current=H},z=()=>{M.classList.remove("dragging"),document.body.style.userSelect="",f_("dockHeight",String(Math.round(Z?.current||D))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)};document.addEventListener("touchmove",S,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z)}).current;return{handleSplitterMouseDown:j,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:W,handleEditorSplitterTouchStart:K,handleDockSplitterMouseDown:G,handleDockSplitterTouchStart:V}}function m4({onTabClosed:_}={}){let $=w(_);$.current=_;let[J,Z]=f(()=>E_.getTabs()),[j,Y]=f(()=>E_.getActiveId()),[W,K]=f(()=>E_.getTabs().length>0);g(()=>{return E_.onChange((H,T)=>{Z(H),Y(T),K(H.length>0)})},[]);let[G,V]=f(()=>new Set),X=b((H)=>{V((T)=>{let t=new Set(T);if(t.has(H))t.delete(H);else t.add(H);return t})},[]),U=b((H)=>{V((T)=>{if(!T.has(H))return T;let t=new Set(T);return t.delete(H),t})},[]),C=b((H)=>{if(!H)return;let T={path:H,mode:"edit"};try{if(!p_.resolve(T)){if(!p_.get("editor")){console.warn(`[openEditor] No pane handler for: ${H}`);return}}}catch(t){console.warn(`[openEditor] paneRegistry.resolve() error for "${H}":`,t)}E_.open(H)},[]),L=b(()=>{let H=E_.getActiveId();if(H){let T=E_.get(H);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(H),U(H),$.current?.(H)}},[U]),D=b((H)=>{let T=E_.get(H);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}E_.close(H),U(H),$.current?.(H)},[U]),M=b((H)=>{E_.activate(H)},[]),S=b((H)=>{let T=E_.getTabs().filter((Z_)=>Z_.id!==H&&!Z_.pinned),t=T.filter((Z_)=>Z_.dirty).length;if(t>0){if(!window.confirm(`${t} unsaved tab${t>1?"s":""} will be closed. Continue?`))return}let a=T.map((Z_)=>Z_.id);E_.closeOthers(H),a.forEach((Z_)=>{U(Z_),$.current?.(Z_)})},[U]),z=b(()=>{let H=E_.getTabs().filter((a)=>!a.pinned),T=H.filter((a)=>a.dirty).length;if(T>0){if(!window.confirm(`${T} unsaved tab${T>1?"s":""} will be closed. Continue?`))return}let t=H.map((a)=>a.id);E_.closeAll(),t.forEach((a)=>{U(a),$.current?.(a)})},[U]),y=b((H)=>{E_.togglePin(H)},[]),u=b(()=>{let H=E_.getActiveId();if(H)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:H}}))},[]);return g(()=>{let H=(T)=>{let{oldPath:t,newPath:a,type:Z_}=T.detail||{};if(!t||!a)return;if(Z_==="dir"){for(let W_ of E_.getTabs())if(W_.path===t||W_.path.startsWith(`${t}/`)){let $_=`${a}${W_.path.slice(t.length)}`;E_.rename(W_.id,$_)}}else E_.rename(t,a)};return window.addEventListener("workspace-file-renamed",H),()=>window.removeEventListener("workspace-file-renamed",H)},[]),g(()=>{let H=(T)=>{if(E_.hasUnsaved())T.preventDefault(),T.returnValue=""};return window.addEventListener("beforeunload",H),()=>window.removeEventListener("beforeunload",H)},[]),{editorOpen:W,tabStripTabs:J,tabStripActiveId:j,previewTabs:G,openEditor:C,closeEditor:L,handleTabClose:D,handleTabActivate:M,handleTabCloseOthers:S,handleTabCloseAll:z,handleTabTogglePin:y,handleTabTogglePreview:X,revealInExplorer:u}}function R1(_,$){try{if(typeof window>"u")return $;let J=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,j=J[_]??window[Z],Y=Number(j);return Number.isFinite(Y)?Y:$}catch{return $}}var c1=R1("warning",30000),g4=R1("finalize",120000),p4=R1("refresh",30000),h4=30000;function i4(_){let $={};return(_?.agents||[]).forEach((J)=>{$[J.id]=J}),$}function l4(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function o4(_=30000){let[,$]=f(0);g(()=>{let J=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(J)},[_])}function n2(_,$=160){let J=String(_||"").replace(/\r\n/g,`
`);if(!J)return 0;return J.split(`
`).reduce((Z,j)=>Z+Math.max(1,Math.ceil(j.length/$)),0)}function a4(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var G6=U3,n4=L3,V6=E3,r4=w3,d4=y3,s4=C3,m1=typeof V1==="function"?V1:a4("getAgentContext",null),N6=typeof s0==="function"?s0:a4("getAgentModels",{current:null,models:[]});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});p_.register(D1);p_.register(M1);p_.register(A1);k1();var q6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(q6)p_.register(w1);function O6(){let[_,$]=f("disconnected"),[J,Z]=f(null),[j,Y]=f(null),[W,K]=f(!1),[G,V]=f([]),[X,U]=f([]),[C,L]=f(null),{agentStatus:D,setAgentStatus:M,agentDraft:S,setAgentDraft:z,agentPlan:y,setAgentPlan:u,agentThought:H,setAgentThought:T,pendingRequest:t,setPendingRequest:a,currentTurnId:Z_,setCurrentTurnId:W_,steerQueuedTurnId:$_,setSteerQueuedTurnId:j_,lastAgentEventRef:e,lastSilenceNoticeRef:i,isAgentRunningRef:J_,draftBufferRef:o,thoughtBufferRef:__,pendingRequestRef:B_,stalledPostIdRef:q_,currentTurnIdRef:p,steerQueuedTurnIdRef:G_,thoughtExpandedRef:K_,draftExpandedRef:V_}=R4(),[k_,H_]=f({}),[y_,U_]=f(null),[C_,w_]=f(null),[c_,l_]=f(!1),[h_,I_]=f(null),[P_,W0]=f(null),{notificationsEnabled:m_,notificationPermission:x_,toggleNotifications:s_,notify:V0}=u4(),[C0,D0]=f(()=>new Set),[i_,L_]=f(()=>X2("workspaceOpen",!0)),o_=w(null),{editorOpen:u_,tabStripTabs:P,tabStripActiveId:n,previewTabs:D_,openEditor:a_,closeEditor:N0,handleTabClose:k0,handleTabActivate:w0,handleTabCloseOthers:q0,handleTabCloseAll:n_,handleTabTogglePin:O0,handleTabTogglePreview:B0,revealInExplorer:z0}=m4({onTabClosed:(N)=>o_.current?.(N)}),v_=w(null),Q0=w(null);g(()=>{let N=v_.current;if(!N)return;if(Q0.current)Q0.current.dispose(),Q0.current=null;let q=n;if(!q)return;let A={path:q,mode:"edit"},x=p_.resolve(A)||p_.get("editor");if(!x){N.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=x.mount(N,A);Q0.current=c,c.onDirtyChange?.((l)=>{E_.setDirty(q,l)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{N0()});let I=E_.getViewState(q);if(I&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(I));if(typeof c.onViewStateChange==="function")c.onViewStateChange((l)=>{E_.saveViewState(q,l)});return requestAnimationFrame(()=>c.focus()),()=>{if(Q0.current===c)c.dispose(),Q0.current=null}},[n,N0]);let[I0,K0]=f({name:"You",avatar_url:null,avatar_background:null}),x0=w(!1),G0=w(!1),y0=w({}),t_=w({name:null,avatar_url:null}),r_=w({currentHashtag:null,searchQuery:null}),Z0=w(null),e_=w(null),c0=w(0),m0=w(0),g0=w(0),T0=w(null),T_=w(null),Y0=w(null),H0=w(0),R_=w({title:null,avatarBase:null}),g_=w(null),j0=b(()=>{if(g_.current)clearTimeout(g_.current),g_.current=null;L(null)},[]);o4(30000),g(()=>{return h3()},[]),g(()=>{f_("workspaceOpen",String(i_))},[i_]),g(()=>{return()=>{j0()}},[j0]),g(()=>{y0.current=k_||{}},[k_]),g(()=>{t_.current=I0||{name:"You",avatar_url:null,avatar_background:null}},[I0]);let U0=b((N,q,A=null)=>{if(typeof document>"u")return;let x=(N||"").trim()||"PiClaw";if(R_.current.title!==x){document.title=x;let S_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(S_&&S_.getAttribute("content")!==x)S_.setAttribute("content",x);R_.current.title=x}let c=document.getElementById("dynamic-favicon");if(!c)return;let I=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",l=q||I,N_=q?`${l}|${A||""}`:l;if(R_.current.avatarBase!==N_){let S_=q?`${l}${l.includes("?")?"&":"?"}v=${A||Date.now()}`:l;c.setAttribute("href",S_),R_.current.avatarBase=N_}},[]),A0=b((N)=>{if(!N)return;V((q)=>q.includes(N)?q:[...q,N])},[]),f0=b((N)=>{V((q)=>q.filter((A)=>A!==N))},[]);o_.current=f0;let a0=b(()=>{V([])},[]),_0=b((N,q=null,A=3000)=>{j0(),L({title:N,detail:q||null}),g_.current=setTimeout(()=>{L((x)=>x?.title===N?null:x)},A)},[j0]),F=b((N)=>{if(typeof N!=="string")return;let q=N.trim();if(!q){_0("No file selected","Use a valid file path from a file pill.");return}if(!u_){_0("Editor pane is not open","Open the editor pane to open files from pills.");return}if(/^[a-z][a-z0-9+.-]*:/i.test(q)){_0("Cannot open external path from file pill","Use an in-workspace file path.");return}let x={path:q,mode:"edit"};if(!p_.resolve(x)){_0("No editor available",`No editor can open: ${q}`);return}a_(q)},[u_,a_,_0]),R=b(()=>{let N=n;if(N)A0(N)},[n,A0]),d=b((N)=>{if(!N)return;U((q)=>q.includes(N)?q:[...q,N])},[]),X_=b(async(N)=>{let q=(x)=>{x.scrollIntoView({behavior:"smooth",block:"center"}),x.classList.add("post-highlight"),setTimeout(()=>x.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+N);if(A){q(A);return}try{let c=(await F3(N))?.thread?.[0];if(!c)return;$0((I)=>{if(!I)return[c];if(I.some((l)=>l.id===c.id))return I;return[...I,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+N);if(I)q(I)},50)})}catch(x){console.error("[scrollToMessage] Failed to fetch message",N,x)}},[]),F_=b((N)=>{U((q)=>q.filter((A)=>A!==N))},[]),A_=b(()=>{U([])},[]),z_=b((N={})=>{let q=Date.now();if(e.current=q,N.running)J_.current=!0;if(N.clearSilence)i.current=0},[]),b_=b(()=>{if(Y0.current)clearTimeout(Y0.current),Y0.current=null;H0.current=0},[]);g(()=>()=>{b_()},[b_]);let E0=b(()=>{b_(),M((N)=>{if(!N)return N;if(!(N.last_activity||N.lastActivity))return N;let{last_activity:q,lastActivity:A,...x}=N;return x})},[b_]),u0=b((N)=>{if(!N)return;b_();let q=Date.now();H0.current=q,M({type:N.type||"active",last_activity:!0}),Y0.current=setTimeout(()=>{if(H0.current!==q)return;M((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},h4)},[b_]),M_=b(()=>{J_.current=!1,e.current=null,i.current=0,o.current="",__.current="",B_.current=null,T_.current=null,p.current=null,G_.current=null,b_(),W_(null),j_(null),K_.current=!1,V_.current=!1},[b_,W_,j_]),O_=b((N)=>{if(!N)return;if(p.current===N)return;p.current=N,W_(N),G_.current=null,j_(null),o.current="",__.current="",z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),B_.current=null,T_.current=null,K_.current=!1,V_.current=!1},[W_,j_]),v0=b((N)=>{if(typeof document<"u"){let S_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&S_)return}let q=T_.current;if(!q||!q.post)return;if(N&&q.turnId&&q.turnId!==N)return;let A=q.post;if(A.id&&T0.current===A.id)return;let x=String(A?.data?.content||"").trim();if(!x)return;T0.current=A.id||T0.current,T_.current=null;let c=x.replace(/\s+/g," ").slice(0,200),I=y0.current||{},N_=(A?.data?.agent_id?I[A.data.agent_id]:null)?.name||"Pi";V0(N_,c)},[V0]),V2=b(async(N,q)=>{if(N!=="thought"&&N!=="draft")return;let A=p.current;if(N==="thought"){if(K_.current=q,A)try{await d4(A,"thought",q)}catch(x){console.warn("Failed to update thought visibility:",x)}if(!q)return;try{let x=A?await r4(A,"thought"):null;if(x?.text)__.current=x.text;T((c)=>({...c||{text:"",totalLines:0},fullText:__.current||c?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:c?.totalLines||0}))}catch(x){console.warn("Failed to fetch full thought:",x)}return}if(V_.current=q,A)try{await d4(A,"draft",q)}catch(x){console.warn("Failed to update draft visibility:",x)}if(!q)return;try{let x=A?await r4(A,"draft"):null;if(x?.text)o.current=x.text;z((c)=>({...c||{text:"",totalLines:0},fullText:o.current||c?.fullText||"",totalLines:Number.isFinite(x?.total_lines)?x.total_lines:c?.totalLines||0}))}catch(x){console.warn("Failed to fetch full draft:",x)}},[]),n0=w(null),N2=b(()=>{if(Z0.current)Z0.current.scrollTop=0},[]);n0.current=N2;let r2=b((N)=>{let q=Z0.current;if(!q||typeof N!=="function"){N?.();return}let{currentHashtag:A,searchQuery:x}=r_.current||{},c=!(x&&!A),I=c?q.scrollHeight-q.scrollTop:q.scrollTop;N(),requestAnimationFrame(()=>{let l=Z0.current;if(!l)return;if(c){let N_=Math.max(l.scrollHeight-I,0);l.scrollTop=N_}else{let N_=Math.max(l.scrollHeight-l.clientHeight,0),S_=Math.min(I,N_);l.scrollTop=S_}})},[]),r0=b((N)=>{let q=Z0.current;if(!q||typeof N!=="function"){N?.();return}let A=q.scrollTop;N(),requestAnimationFrame(()=>{let x=Z0.current;if(!x)return;let c=Math.max(x.scrollHeight-x.clientHeight,0);x.scrollTop=Math.min(A,c)})},[]),{posts:F0,setPosts:$0,hasMore:d2,setHasMore:d0,hasMoreRef:t0,loadPosts:M0,refreshTimeline:P0,loadMore:F2,loadMoreRef:L2}=v4({preserveTimelineScroll:r2,preserveTimelineScrollTop:r0}),e0=b(()=>{let N=q_.current;if(!N)return;$0((q)=>q?q.filter((A)=>A.id!==N):q),q_.current=null},[$0]),{handleSplitterMouseDown:s2,handleSplitterTouchStart:a2,handleEditorSplitterMouseDown:t2,handleEditorSplitterTouchStart:_2,handleDockSplitterMouseDown:e2,handleDockSplitterTouchStart:_1}=c4({appShellRef:e_,sidebarWidthRef:c0,editorWidthRef:m0,dockHeightRef:g0}),$2=b(()=>{if(!J_.current)return;J_.current=!1,i.current=0,e.current=null,p.current=null,W_(null),K_.current=!1,V_.current=!1;let N=(o.current||"").trim();if(o.current="",__.current="",z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),B_.current=null,T_.current=null,!N){M({type:"error",title:"Response stalled — No content received"});return}let A=`${N}${`

⚠️ Response may be incomplete — the model stopped responding`}`,x=Date.now(),c=new Date().toISOString(),I={id:x,timestamp:c,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};q_.current=x,$0((l)=>l?U2([...l,I]):[I]),n0.current?.(),M(null)},[W_]);g(()=>{r_.current={currentHashtag:J,searchQuery:j}},[J,j]),g(()=>{let N=Math.min(1000,Math.max(100,Math.floor(c1/2))),q=setInterval(()=>{if(!J_.current)return;if(B_.current)return;let A=e.current;if(!A)return;let x=Date.now(),c=x-A;if(c>=g4){$2();return}if(c>=c1){if(x-i.current>=p4){let I=Math.floor(c/1000);M({type:"waiting",title:`Waiting for model… No events for ${I}s`}),i.current=x}}},N);return()=>clearInterval(q)},[$2]);let p0=b(async()=>{try{let N=await m1();if(N)W0(N)}catch(N){console.warn("Failed to fetch agent context:",N)}},[]),h0=b(async()=>{try{let N=await s4("web:default");if(!N||N.status!=="active"||!N.data){if(G0.current){let{currentHashtag:x,searchQuery:c}=r_.current||{};if(!x&&!c)P0()}G0.current=!1,M_(),M(null),z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),B_.current=null;return}G0.current=!0;let q=N.data,A=q.turn_id||q.turnId;if(A)O_(A);if(z_({running:!0,clearSilence:!0}),E0(),M(q),N.thought&&N.thought.text)T((x)=>{if(x&&x.text&&x.text.length>=N.thought.text.length)return x;return __.current=N.thought.text,{text:N.thought.text,totalLines:N.thought.totalLines||0}});if(N.draft&&N.draft.text)z((x)=>{if(x&&x.text&&x.text.length>=N.draft.text.length)return x;return o.current=N.draft.text,{text:N.draft.text,totalLines:N.draft.totalLines||0}})}catch(N){console.warn("Failed to fetch agent status:",N)}},[M_,E0,z_,P0,O_]),$1=b((N)=>{if($(N),N!=="connected"){M(null),z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),B_.current=null,M_();return}if(!x0.current){x0.current=!0,h0();return}let{currentHashtag:q,searchQuery:A}=r_.current;if(!q&&!A)P0();h0()},[M_,P0,h0]),J1=b(async(N)=>{Z(N),$0(null),await M0(N)},[M0]),Z1=b(async()=>{Z(null),Y(null),$0(null),await M0()},[M0]),Y1=b(async(N)=>{if(!N||!N.trim())return;Y(N.trim()),Z(null),$0(null);try{let q=await G6(N.trim());$0(q.results),d0(!1)}catch(q){console.error("Failed to search:",q),$0([])}},[]),j1=b(()=>{K(!0),Y(null),Z(null),$0([])},[]),Q=b(()=>{K(!1),Y(null),M0()},[M0]),O=b(()=>{},[]),k=b(async(N)=>{if(!N)return;let q=N.id,A=F0?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let x=(c)=>{if(!c.length)return;D0((l)=>{let N_=new Set(l);return c.forEach((S_)=>N_.add(S_)),N_}),setTimeout(()=>{if(r0(()=>{$0((l)=>l?l.filter((N_)=>!c.includes(N_.id)):l)}),D0((l)=>{let N_=new Set(l);return c.forEach((S_)=>N_.delete(S_)),N_}),t0.current)L2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await n4(q,A>0);if(c?.ids?.length)x(c.ids)}catch(c){let I=c?.message||"";if(A===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let N_=await n4(q,!0);if(N_?.ids?.length)x(N_.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${I}`)}},[F0,r0]),E=b(async()=>{try{let N=await V6();H_(i4(N));let q=N?.user||{};K0((x)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",I=typeof q.avatar_url==="string"?q.avatar_url.trim():null,l=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(x.name===c&&x.avatar_url===I&&x.avatar_background===l)return x;return{name:c,avatar_url:I,avatar_background:l}});let A=(N?.agents||[]).find((x)=>x.id==="default");if(A?.model)U_(A.model);U0(A?.name,A?.avatar_url)}catch(N){console.warn("Failed to load agents:",N)}try{let N=await m1();if(N)W0(N)}catch{}},[U0]);g(()=>{E();let N=W2("sidebarWidth",null),q=Number.isFinite(N)?Math.min(Math.max(N,160),600):280;if(c0.current=q,e_.current)e_.current.style.setProperty("--sidebar-width",`${q}px`)},[E]);let v=b((N)=>{if(!N||typeof N!=="object")return;let q=N.agent_id;if(!q)return;let{agent_name:A,agent_avatar:x}=N;if(!A&&x===void 0)return;let c=y0.current?.[q]||{id:q},I=c.name||null,l=c.avatar_url??c.avatarUrl??c.avatar??null,N_=!1,S_=!1;if(A&&A!==c.name)I=A,S_=!0;if(x!==void 0){let J2=typeof x==="string"?x.trim():null,g1=typeof l==="string"?l.trim():null,Z2=J2||null;if(Z2!==(g1||null))l=Z2,N_=!0}if(!S_&&!N_)return;if(H_((J2)=>{let Z2={...J2[q]||{id:q}};if(S_)Z2.name=I;if(N_)Z2.avatar_url=l;return{...J2,[q]:Z2}}),q==="default")U0(I,l,N_?Date.now():null)},[U0]),h=b((N)=>{if(!N||typeof N!=="object")return;let q=N.user_name??N.userName,A=N.user_avatar??N.userAvatar,x=N.user_avatar_background??N.userAvatarBackground;if(q===void 0&&A===void 0&&x===void 0)return;K0((c)=>{let I=typeof q==="string"&&q.trim()?q.trim():c.name||"You",l=A===void 0?c.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,N_=x===void 0?c.avatar_background:typeof x==="string"&&x.trim()?x.trim():null;if(c.name===I&&c.avatar_url===l&&c.avatar_background===N_)return c;return{name:I,avatar_url:l,avatar_background:N_}})},[]),s=b((N)=>{if(!N||typeof N!=="object")return;let q=N.model??N.current;if(q!==void 0)U_(q);if(N.thinking_level!==void 0)w_(N.thinking_level??null);if(N.supports_thinking!==void 0)l_(Boolean(N.supports_thinking));if(N.provider_usage!==void 0)I_(N.provider_usage??null)},[]),r=b(()=>{N6().then((N)=>{if(N)s(N)}).catch(()=>{})},[s]);g(()=>{r();let N=setInterval(()=>{r()},60000);return()=>clearInterval(N)},[r]);let m=b((N,q)=>{let A=q?.turn_id;if(v(q),h(q),N==="ui_theme"){i3(q);return}if(N?.startsWith("agent_"))E0();if(N==="connected"){M(null),z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),B_.current=null,M_(),s4("web:default").then((I)=>{if(!I||I.status!=="active"||!I.data)return;let l=I.data,N_=l.turn_id||l.turnId;if(N_)O_(N_);if(z_({clearSilence:!0}),u0(l),I.thought&&I.thought.text)__.current=I.thought.text,T({text:I.thought.text,totalLines:I.thought.totalLines||0});if(I.draft&&I.draft.text)o.current=I.draft.text,z({text:I.draft.text,totalLines:I.draft.totalLines||0})}).catch((I)=>{console.warn("Failed to fetch agent status:",I)}),r();return}if(N==="agent_status"){if(q.type==="done"||q.type==="error"){if(A&&p.current&&A!==p.current)return;if(q.type==="done"){v0(A||p.current);let{currentHashtag:I,searchQuery:l}=r_.current||{};if(!I&&!l)P0();if(q.context_usage)W0(q.context_usage)}if(G0.current=!1,M_(),z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null),q.type==="error")M({type:"error",title:q.title||"Agent error"}),setTimeout(()=>M(null),8000);else M(null)}else{if(A)O_(A);if(z_({running:!0,clearSilence:!0}),q.type==="thinking")o.current="",__.current="",z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0});M(q)}return}if(N==="agent_steer_queued"){if(A&&p.current&&A!==p.current)return;let I=A||p.current;if(!I)return;G_.current=I,j_(I);return}if(N==="agent_draft_delta"){if(A&&p.current&&A!==p.current)return;if(A&&!p.current)O_(A);if(z_({running:!0,clearSilence:!0}),q?.reset)o.current="";if(q?.delta)o.current+=q.delta;if(V_.current){let I=o.current;z((l)=>({text:l?.text||"",totalLines:n2(I),fullText:I}))}else{let I=o.current,l=n2(I);z({text:I,totalLines:l})}return}if(N==="agent_draft"){if(A&&p.current&&A!==p.current)return;if(A&&!p.current)O_(A);z_({running:!0,clearSilence:!0});let I=q.text||"",l=q.mode||(q.kind==="plan"?"replace":"append"),N_=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(l==="replace")u(I);else u((S_)=>(S_||"")+I);else if(!V_.current)o.current=I,z({text:I,totalLines:N_});return}if(N==="agent_thought_delta"){if(A&&p.current&&A!==p.current)return;if(A&&!p.current)O_(A);if(z_({running:!0,clearSilence:!0}),q?.reset)__.current="";if(typeof q?.delta==="string")__.current+=q.delta;if(K_.current){let I=__.current;T((l)=>({text:l?.text||"",totalLines:n2(I),fullText:I}))}return}if(N==="agent_thought"){if(A&&p.current&&A!==p.current)return;if(A&&!p.current)O_(A);z_({running:!0,clearSilence:!0});let I=q.text||"",l=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!K_.current)__.current=I,T({text:I,totalLines:l});return}if(N==="agent_request"){if(console.log("Agent request:",q),A&&p.current&&A!==p.current)return;if(A)O_(A);z_({running:!0,clearSilence:!0}),a(q),B_.current=q;return}if(N==="agent_request_timeout"){if(console.log("Agent request timeout:",q),A&&p.current&&A!==p.current)return;a(null),B_.current=null,M_(),M({type:"error",title:"Permission request timed out"});return}if(N==="model_changed"){if(q?.model!==void 0)U_(q.model);if(q?.thinking_level!==void 0)w_(q.thinking_level??null);if(q?.supports_thinking!==void 0)l_(Boolean(q.supports_thinking));m1().then((I)=>{if(I)W0(I)}).catch(()=>{});return}if(N==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:x,searchQuery:c}=r_.current;if(N==="agent_response")e0(),T_.current={post:q,turnId:p.current};if(!x&&!c&&(N==="new_post"||N==="agent_response"))$0((I)=>{if(!I)return[q];if(I.some((l)=>l.id===q.id))return I;return[...I,q]}),n0.current?.();if(N==="interaction_updated")$0((I)=>I?I.map((l)=>l.id===q.id?q:l):I);if(N==="interaction_deleted"){let I=q?.ids||[];if(I.length){r0(()=>{$0((S_)=>S_?S_.filter((J2)=>!I.includes(J2.id)):S_)});let{currentHashtag:l,searchQuery:N_}=r_.current;if(t0.current&&!l&&!N_)L2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[M_,E0,z_,v0,r0,P0,e0,O_,u0,v,h,r]);g(()=>{if(typeof window>"u")return;let N=window.__PICLAW_TEST_API||{};return N.emit=m,N.reset=()=>{e0(),M_(),M(null),z({text:"",totalLines:0}),u(""),T({text:"",totalLines:0}),a(null)},N.finalize=()=>$2(),window.__PICLAW_TEST_API=N,()=>{if(window.__PICLAW_TEST_API===N)window.__PICLAW_TEST_API=void 0}},[M_,$2,m,e0]),f4({handleSseEvent:m,handleConnectionStatusChange:$1,loadPosts:M0}),g(()=>{if(!F0||F0.length===0)return;let N=location.hash;if(!N||!N.startsWith("#msg-"))return;let q=N.slice(5);X_(q),history.replaceState(null,"",location.pathname+location.search)},[F0,X_]);let Y_=D!==null;g(()=>{if(_!=="connected")return;let q=setInterval(()=>{if(Y_)h0(),p0();else{let{currentHashtag:A,searchQuery:x}=r_.current||{};if(!A&&!x)P0();h0(),p0()}},Y_?15000:60000);return()=>clearInterval(q)},[_,Y_,h0,p0,P0]);let X0=b(()=>{L_((N)=>!N)},[]);g(()=>{if(!u_)return;if(typeof window>"u")return;let N=e_.current;if(!N)return;if(!m0.current){let q=W2("editorWidth",null),A=c0.current||280;m0.current=Number.isFinite(q)?q:A}if(N.style.setProperty("--editor-width",`${m0.current}px`),!g0.current){let q=W2("dockHeight",null);g0.current=Number.isFinite(q)?q:200}N.style.setProperty("--dock-height",`${g0.current}px`)},[u_]);let J0=p_.getDockPanes().length>0,[i0,t4]=f(!1),E2=b(()=>t4((N)=>!N),[]);g(()=>{if(!J0)return;let N=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),E2()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[E2,J0]);let e4=Boolean($_&&$_===(D?.turn_id||Z_));return B`
        <div class=${`app-shell${i_?"":" workspace-collapsed"}${u_?" editor-open":""}`} ref=${e_}>
            <${S4}
                onFileSelect=${A0}
                visible=${i_}
                active=${i_||u_}
                onOpenEditor=${a_}
            />
            <button
                class=${`workspace-toggle-tab${i_?" open":" closed"}`}
                onClick=${X0}
                title=${i_?"Hide workspace":"Show workspace"}
                aria-label=${i_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${s2} onTouchStart=${a2}></div>
            ${u_&&B`
                <div class="editor-pane-container">
                    <${I4}
                        tabs=${P}
                        activeId=${n}
                        onActivate=${w0}
                        onClose=${k0}
                        onCloseOthers=${q0}
                        onCloseAll=${n_}
                        onTogglePin=${O0}
                        onTogglePreview=${B0}
                        previewTabs=${D_}
                        onToggleDock=${J0?E2:void 0}
                        dockVisible=${J0&&i0}
                    />
                    <div class="editor-pane-host" ref=${v_}></div>
                    ${n&&D_.has(n)&&B`
                        <${T4}
                            getContent=${()=>Q0.current?.getContent?.()}
                            path=${n}
                            onClose=${()=>B0(n)}
                        />
                    `}
                    ${J0&&i0&&B`<div class="dock-splitter" onMouseDown=${e2} onTouchStart=${_1}></div>`}
                    ${J0&&B`<div class=${`dock-panel${i0?"":" hidden"}`}>
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
                <div class="editor-splitter" onMouseDown=${t2} onTouchStart=${_2}></div>
            `}
            <div class="container">
                ${j&&l4()&&B`<div class="search-results-spacer"></div>`}
                ${(J||j)&&B`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${Z1}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${J?`#${J}`:`Search: ${j}`}</span>
                    </div>
                `}
                <${G4}
                    posts=${F0}
                    hasMore=${d2}
                    onLoadMore=${F2}
                    timelineRef=${Z0}
                    onHashtagClick=${J1}
                    onMessageRef=${d}
                    onScrollToMessage=${X_}
                    onFileRef=${F}
                    onPostClick=${void 0}
                    onDeletePost=${k}
                    emptyMessage=${J?`No posts with #${J}`:j?`No results for "${j}"`:void 0}
                    agents=${k_}
                    user=${I0}
                    reverse=${!(j&&!J)}
                    removingPostIds=${C0}
                    searchQuery=${j}
                />
                <${Y4}
                    status=${D}
                    draft=${S}
                    plan=${y}
                    thought=${H}
                    pendingRequest=${t}
                    intent=${C}
                    turnId=${Z_}
                    steerQueued=${e4}
                    onPanelToggle=${V2}
                />
                <${u3}
                    onPost=${()=>{M0(),N2()}}
                    onFocus=${N2}
                    searchMode=${W}
                    onSearch=${Y1}
                    onEnterSearch=${j1}
                    onExitSearch=${Q}
                    fileRefs=${G}
                    onRemoveFileRef=${f0}
                    onClearFileRefs=${a0}
                    messageRefs=${X}
                    onRemoveMessageRef=${F_}
                    onClearMessageRefs=${A_}
                    activeEditorPath=${n}
                    onAttachEditorFile=${R}
                    onOpenFilePill=${F}
                    activeModel=${y_}
                    modelUsage=${h_}
                    thinkingLevel=${C_}
                    supportsThinking=${c_}
                    contextUsage=${P_}
                    notificationsEnabled=${m_}
                    notificationPermission=${x_}
                    onToggleNotifications=${s_}
                    onModelChange=${U_}
                    onModelStateChange=${s}
                />
                <${X4} status=${_} />
                <${j4}
                    request=${t}
                    onRespond=${()=>{a(null),B_.current=null}}
                />
            </div>
        </div>
    `}q3(B`<${O6} />`,document.getElementById("app"));

//# debugId=99468091820444C364756E2164756E21
//# sourceMappingURL=app.bundle.js.map
