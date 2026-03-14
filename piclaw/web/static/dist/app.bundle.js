var $6=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,N)=>(typeof require<"u"?require:$)[N]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var s2,P_,I4,N6,J2,y4,f4,u4,c4,w3,C3,b3,Z6,o2={},r2=[],J6=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,a2=Array.isArray;function s0(_,$){for(var N in $)_[N]=$[N];return _}function M3(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function v4(_,$,N){var Z,j,J,K={};for(J in $)J=="key"?Z=$[J]:J=="ref"?j=$[J]:K[J]=$[J];if(arguments.length>2&&(K.children=arguments.length>3?s2.call(arguments,2):N),typeof _=="function"&&_.defaultProps!=null)for(J in _.defaultProps)K[J]===void 0&&(K[J]=_.defaultProps[J]);return i2(_,K,Z,j,null)}function i2(_,$,N,Z,j){var J={type:_,props:$,key:N,ref:Z,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:j==null?++I4:j,__i:-1,__u:0};return j==null&&P_.vnode!=null&&P_.vnode(J),J}function t2(_){return _.children}function n2(_,$){this.props=_,this.context=$}function y2(_,$){if($==null)return _.__?y2(_.__,_.__i+1):null;for(var N;$<_.__k.length;$++)if((N=_.__k[$])!=null&&N.__e!=null)return N.__e;return typeof _.type=="function"?y2(_):null}function j6(_){if(_.__P&&_.__d){var $=_.__v,N=$.__e,Z=[],j=[],J=s0({},$);J.__v=$.__v+1,P_.vnode&&P_.vnode(J),P3(_.__P,J,$,_.__n,_.__P.namespaceURI,32&$.__u?[N]:null,Z,N==null?y2($):N,!!(32&$.__u),j),J.__v=$.__v,J.__.__k[J.__i]=J,h4(Z,J,j),$.__e=$.__=null,J.__e!=N&&m4(J)}}function m4(_){if((_=_.__)!=null&&_.__c!=null)return _.__e=_.__c.base=null,_.__k.some(function($){if($!=null&&$.__e!=null)return _.__e=_.__c.base=$.__e}),m4(_)}function D4(_){(!_.__d&&(_.__d=!0)&&J2.push(_)&&!d2.__r++||y4!=P_.debounceRendering)&&((y4=P_.debounceRendering)||f4)(d2)}function d2(){try{for(var _,$=1;J2.length;)J2.length>$&&J2.sort(u4),_=J2.shift(),$=J2.length,j6(_)}finally{J2.length=d2.__r=0}}function R4(_,$,N,Z,j,J,K,Y,O,z,V){var B,k,D,E,b,m,A,Q=Z&&Z.__k||r2,w=$.length;for(O=K6(N,$,Q,O,w),B=0;B<w;B++)(D=N.__k[B])!=null&&(k=D.__i!=-1&&Q[D.__i]||o2,D.__i=B,m=P3(_,D,k,j,J,K,Y,O,z,V),E=D.__e,D.ref&&k.ref!=D.ref&&(k.ref&&S3(k.ref,null,D),V.push(D.ref,D.__c||E,D)),b==null&&E!=null&&(b=E),(A=!!(4&D.__u))||k.__k===D.__k?O=g4(D,O,_,A):typeof D.type=="function"&&m!==void 0?O=m:E&&(O=E.nextSibling),D.__u&=-7);return N.__e=b,O}function K6(_,$,N,Z,j){var J,K,Y,O,z,V=N.length,B=V,k=0;for(_.__k=Array(j),J=0;J<j;J++)(K=$[J])!=null&&typeof K!="boolean"&&typeof K!="function"?(typeof K=="string"||typeof K=="number"||typeof K=="bigint"||K.constructor==String?K=_.__k[J]=i2(null,K,null,null,null):a2(K)?K=_.__k[J]=i2(t2,{children:K},null,null,null):K.constructor===void 0&&K.__b>0?K=_.__k[J]=i2(K.type,K.props,K.key,K.ref?K.ref:null,K.__v):_.__k[J]=K,O=J+k,K.__=_,K.__b=_.__b+1,Y=null,(z=K.__i=z6(K,N,O,B))!=-1&&(B--,(Y=N[z])&&(Y.__u|=2)),Y==null||Y.__v==null?(z==-1&&(j>V?k--:j<V&&k++),typeof K.type!="function"&&(K.__u|=4)):z!=O&&(z==O-1?k--:z==O+1?k++:(z>O?k--:k++,K.__u|=4))):_.__k[J]=null;if(B)for(J=0;J<V;J++)(Y=N[J])!=null&&(2&Y.__u)==0&&(Y.__e==Z&&(Z=y2(Y)),i4(Y,Y));return Z}function g4(_,$,N,Z){var j,J;if(typeof _.type=="function"){for(j=_.__k,J=0;j&&J<j.length;J++)j[J]&&(j[J].__=_,$=g4(j[J],$,N,Z));return $}_.__e!=$&&(Z&&($&&_.type&&!$.parentNode&&($=y2(_)),N.insertBefore(_.__e,$||null)),$=_.__e);do $=$&&$.nextSibling;while($!=null&&$.nodeType==8);return $}function z6(_,$,N,Z){var j,J,K,Y=_.key,O=_.type,z=$[N],V=z!=null&&(2&z.__u)==0;if(z===null&&Y==null||V&&Y==z.key&&O==z.type)return N;if(Z>(V?1:0)){for(j=N-1,J=N+1;j>=0||J<$.length;)if((z=$[K=j>=0?j--:J++])!=null&&(2&z.__u)==0&&Y==z.key&&O==z.type)return K}return-1}function k4(_,$,N){$[0]=="-"?_.setProperty($,N==null?"":N):_[$]=N==null?"":typeof N!="number"||J6.test($)?N:N+"px"}function p2(_,$,N,Z,j){var J,K;_:if($=="style")if(typeof N=="string")_.style.cssText=N;else{if(typeof Z=="string"&&(_.style.cssText=Z=""),Z)for($ in Z)N&&$ in N||k4(_.style,$,"");if(N)for($ in N)Z&&N[$]==Z[$]||k4(_.style,$,N[$])}else if($[0]=="o"&&$[1]=="n")J=$!=($=$.replace(c4,"$1")),K=$.toLowerCase(),$=K in _||$=="onFocusOut"||$=="onFocusIn"?K.slice(2):$.slice(2),_.l||(_.l={}),_.l[$+J]=N,N?Z?N.u=Z.u:(N.u=w3,_.addEventListener($,J?b3:C3,J)):_.removeEventListener($,J?b3:C3,J);else{if(j=="http://www.w3.org/2000/svg")$=$.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if($!="width"&&$!="height"&&$!="href"&&$!="list"&&$!="form"&&$!="tabIndex"&&$!="download"&&$!="rowSpan"&&$!="colSpan"&&$!="role"&&$!="popover"&&$ in _)try{_[$]=N==null?"":N;break _}catch(Y){}typeof N=="function"||(N==null||N===!1&&$[4]!="-"?_.removeAttribute($):_.setAttribute($,$=="popover"&&N==1?"":N))}}function C4(_){return function($){if(this.l){var N=this.l[$.type+_];if($.t==null)$.t=w3++;else if($.t<N.u)return;return N(P_.event?P_.event($):$)}}}function P3(_,$,N,Z,j,J,K,Y,O,z){var V,B,k,D,E,b,m,A,Q,w,M,T,i,o,__,Y_=$.type;if($.constructor!==void 0)return null;128&N.__u&&(O=!!(32&N.__u),J=[Y=$.__e=N.__e]),(V=P_.__b)&&V($);_:if(typeof Y_=="function")try{if(A=$.props,Q=Y_.prototype&&Y_.prototype.render,w=(V=Y_.contextType)&&Z[V.__c],M=V?w?w.props.value:V.__:Z,N.__c?m=(B=$.__c=N.__c).__=B.__E:(Q?$.__c=B=new Y_(A,M):($.__c=B=new n2(A,M),B.constructor=Y_,B.render=O6),w&&w.sub(B),B.state||(B.state={}),B.__n=Z,k=B.__d=!0,B.__h=[],B._sb=[]),Q&&B.__s==null&&(B.__s=B.state),Q&&Y_.getDerivedStateFromProps!=null&&(B.__s==B.state&&(B.__s=s0({},B.__s)),s0(B.__s,Y_.getDerivedStateFromProps(A,B.__s))),D=B.props,E=B.state,B.__v=$,k)Q&&Y_.getDerivedStateFromProps==null&&B.componentWillMount!=null&&B.componentWillMount(),Q&&B.componentDidMount!=null&&B.__h.push(B.componentDidMount);else{if(Q&&Y_.getDerivedStateFromProps==null&&A!==D&&B.componentWillReceiveProps!=null&&B.componentWillReceiveProps(A,M),$.__v==N.__v||!B.__e&&B.shouldComponentUpdate!=null&&B.shouldComponentUpdate(A,B.__s,M)===!1){$.__v!=N.__v&&(B.props=A,B.state=B.__s,B.__d=!1),$.__e=N.__e,$.__k=N.__k,$.__k.some(function(a){a&&(a.__=$)}),r2.push.apply(B.__h,B._sb),B._sb=[],B.__h.length&&K.push(B);break _}B.componentWillUpdate!=null&&B.componentWillUpdate(A,B.__s,M),Q&&B.componentDidUpdate!=null&&B.__h.push(function(){B.componentDidUpdate(D,E,b)})}if(B.context=M,B.props=A,B.__P=_,B.__e=!1,T=P_.__r,i=0,Q)B.state=B.__s,B.__d=!1,T&&T($),V=B.render(B.props,B.state,B.context),r2.push.apply(B.__h,B._sb),B._sb=[];else do B.__d=!1,T&&T($),V=B.render(B.props,B.state,B.context),B.state=B.__s;while(B.__d&&++i<25);B.state=B.__s,B.getChildContext!=null&&(Z=s0(s0({},Z),B.getChildContext())),Q&&!k&&B.getSnapshotBeforeUpdate!=null&&(b=B.getSnapshotBeforeUpdate(D,E)),o=V!=null&&V.type===t2&&V.key==null?p4(V.props.children):V,Y=R4(_,a2(o)?o:[o],$,N,Z,j,J,K,Y,O,z),B.base=$.__e,$.__u&=-161,B.__h.length&&K.push(B),m&&(B.__E=B.__=null)}catch(a){if($.__v=null,O||J!=null)if(a.then){for($.__u|=O?160:128;Y&&Y.nodeType==8&&Y.nextSibling;)Y=Y.nextSibling;J[J.indexOf(Y)]=null,$.__e=Y}else{for(__=J.length;__--;)M3(J[__]);E3($)}else $.__e=N.__e,$.__k=N.__k,a.then||E3($);P_.__e(a,$,N)}else J==null&&$.__v==N.__v?($.__k=N.__k,$.__e=N.__e):Y=$.__e=Y6(N.__e,$,N,Z,j,J,K,O,z);return(V=P_.diffed)&&V($),128&$.__u?void 0:Y}function E3(_){_&&(_.__c&&(_.__c.__e=!0),_.__k&&_.__k.some(E3))}function h4(_,$,N){for(var Z=0;Z<N.length;Z++)S3(N[Z],N[++Z],N[++Z]);P_.__c&&P_.__c($,_),_.some(function(j){try{_=j.__h,j.__h=[],_.some(function(J){J.call(j)})}catch(J){P_.__e(J,j.__v)}})}function p4(_){return typeof _!="object"||_==null||_.__b>0?_:a2(_)?_.map(p4):s0({},_)}function Y6(_,$,N,Z,j,J,K,Y,O){var z,V,B,k,D,E,b,m=N.props||o2,A=$.props,Q=$.type;if(Q=="svg"?j="http://www.w3.org/2000/svg":Q=="math"?j="http://www.w3.org/1998/Math/MathML":j||(j="http://www.w3.org/1999/xhtml"),J!=null){for(z=0;z<J.length;z++)if((D=J[z])&&"setAttribute"in D==!!Q&&(Q?D.localName==Q:D.nodeType==3)){_=D,J[z]=null;break}}if(_==null){if(Q==null)return document.createTextNode(A);_=document.createElementNS(j,Q,A.is&&A),Y&&(P_.__m&&P_.__m($,J),Y=!1),J=null}if(Q==null)m===A||Y&&_.data==A||(_.data=A);else{if(J=J&&s2.call(_.childNodes),!Y&&J!=null)for(m={},z=0;z<_.attributes.length;z++)m[(D=_.attributes[z]).name]=D.value;for(z in m)D=m[z],z=="dangerouslySetInnerHTML"?B=D:z=="children"||(z in A)||z=="value"&&("defaultValue"in A)||z=="checked"&&("defaultChecked"in A)||p2(_,z,null,D,j);for(z in A)D=A[z],z=="children"?k=D:z=="dangerouslySetInnerHTML"?V=D:z=="value"?E=D:z=="checked"?b=D:Y&&typeof D!="function"||m[z]===D||p2(_,z,D,m[z],j);if(V)Y||B&&(V.__html==B.__html||V.__html==_.innerHTML)||(_.innerHTML=V.__html),$.__k=[];else if(B&&(_.innerHTML=""),R4($.type=="template"?_.content:_,a2(k)?k:[k],$,N,Z,Q=="foreignObject"?"http://www.w3.org/1999/xhtml":j,J,K,J?J[0]:N.__k&&y2(N,0),Y,O),J!=null)for(z=J.length;z--;)M3(J[z]);Y||(z="value",Q=="progress"&&E==null?_.removeAttribute("value"):E!=null&&(E!==_[z]||Q=="progress"&&!E||Q=="option"&&E!=m[z])&&p2(_,z,E,m[z],j),z="checked",b!=null&&b!=_[z]&&p2(_,z,b,m[z],j))}return _}function S3(_,$,N){try{if(typeof _=="function"){var Z=typeof _.__u=="function";Z&&_.__u(),Z&&$==null||(_.__u=_($))}else _.current=$}catch(j){P_.__e(j,N)}}function i4(_,$,N){var Z,j;if(P_.unmount&&P_.unmount(_),(Z=_.ref)&&(Z.current&&Z.current!=_.__e||S3(Z,null,$)),(Z=_.__c)!=null){if(Z.componentWillUnmount)try{Z.componentWillUnmount()}catch(J){P_.__e(J,$)}Z.base=Z.__P=null}if(Z=_.__k)for(j=0;j<Z.length;j++)Z[j]&&i4(Z[j],$,N||typeof _.type!="function");N||M3(_.__e),_.__c=_.__=_.__e=void 0}function O6(_,$,N){return this.constructor(_,N)}function n4(_,$,N){var Z,j,J,K;$==document&&($=document.documentElement),P_.__&&P_.__(_,$),j=(Z=typeof N=="function")?null:N&&N.__k||$.__k,J=[],K=[],P3($,_=(!Z&&N||$).__k=v4(t2,null,[_]),j||o2,o2,$.namespaceURI,!Z&&N?[N]:j?null:$.firstChild?s2.call($.childNodes):null,J,!Z&&N?N:j?j.__e:$.firstChild,Z,K),h4(J,_,K)}s2=r2.slice,P_={__e:function(_,$,N,Z){for(var j,J,K;$=$.__;)if((j=$.__c)&&!j.__)try{if((J=j.constructor)&&J.getDerivedStateFromError!=null&&(j.setState(J.getDerivedStateFromError(_)),K=j.__d),j.componentDidCatch!=null&&(j.componentDidCatch(_,Z||{}),K=j.__d),K)return j.__E=j}catch(Y){_=Y}throw _}},I4=0,N6=function(_){return _!=null&&_.constructor===void 0},n2.prototype.setState=function(_,$){var N;N=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=s0({},this.state),typeof _=="function"&&(_=_(s0({},N),this.props)),_&&s0(N,_),_!=null&&this.__v&&($&&this._sb.push($),D4(this))},n2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),D4(this))},n2.prototype.render=t2,J2=[],f4=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u4=function(_,$){return _.__v.__b-$.__v.__b},d2.__r=0,c4=/(PointerCapture)$|Capture$/i,w3=0,C3=C4(!1),b3=C4(!0),Z6=0;var x2,o_,k3,b4,T2=0,l4=[],l_=P_,E4=l_.__b,A4=l_.__r,w4=l_.diffed,M4=l_.__c,P4=l_.unmount,S4=l_.__;function x3(_,$){l_.__h&&l_.__h(o_,_,T2||$),T2=0;var N=o_.__H||(o_.__H={__:[],__h:[]});return _>=N.__.length&&N.__.push({}),N.__[_]}function f(_){return T2=1,G6(r4,_)}function G6(_,$,N){var Z=x3(x2++,2);if(Z.t=_,!Z.__c&&(Z.__=[N?N($):r4(void 0,$),function(Y){var O=Z.__N?Z.__N[0]:Z.__[0],z=Z.t(O,Y);O!==z&&(Z.__N=[z,Z.__[1]],Z.__c.setState({}))}],Z.__c=o_,!o_.__f)){var j=function(Y,O,z){if(!Z.__c.__H)return!0;var V=Z.__c.__H.__.filter(function(k){return k.__c});if(V.every(function(k){return!k.__N}))return!J||J.call(this,Y,O,z);var B=Z.__c.props!==Y;return V.some(function(k){if(k.__N){var D=k.__[0];k.__=k.__N,k.__N=void 0,D!==k.__[0]&&(B=!0)}}),J&&J.call(this,Y,O,z)||B};o_.__f=!0;var{shouldComponentUpdate:J,componentWillUpdate:K}=o_;o_.componentWillUpdate=function(Y,O,z){if(this.__e){var V=J;J=void 0,j(Y,O,z),J=V}K&&K.call(this,Y,O,z)},o_.shouldComponentUpdate=j}return Z.__N||Z.__}function R(_,$){var N=x3(x2++,3);!l_.__s&&o4(N.__H,$)&&(N.__=_,N.u=$,o_.__H.__h.push(N))}function H(_){return T2=5,j0(function(){return{current:_}},[])}function j0(_,$){var N=x3(x2++,7);return o4(N.__H,$)&&(N.__=_(),N.__H=$,N.__h=_),N.__}function S(_,$){return T2=8,j0(function(){return _},$)}function L6(){for(var _;_=l4.shift();){var $=_.__H;if(_.__P&&$)try{$.__h.some(l2),$.__h.some(A3),$.__h=[]}catch(N){$.__h=[],l_.__e(N,_.__v)}}}l_.__b=function(_){o_=null,E4&&E4(_)},l_.__=function(_,$){_&&$.__k&&$.__k.__m&&(_.__m=$.__k.__m),S4&&S4(_,$)},l_.__r=function(_){A4&&A4(_),x2=0;var $=(o_=_.__c).__H;$&&(k3===o_?($.__h=[],o_.__h=[],$.__.some(function(N){N.__N&&(N.__=N.__N),N.u=N.__N=void 0})):($.__h.some(l2),$.__h.some(A3),$.__h=[],x2=0)),k3=o_},l_.diffed=function(_){w4&&w4(_);var $=_.__c;$&&$.__H&&($.__H.__h.length&&(l4.push($)!==1&&b4===l_.requestAnimationFrame||((b4=l_.requestAnimationFrame)||B6)(L6)),$.__H.__.some(function(N){N.u&&(N.__H=N.u),N.u=void 0})),k3=o_=null},l_.__c=function(_,$){$.some(function(N){try{N.__h.some(l2),N.__h=N.__h.filter(function(Z){return!Z.__||A3(Z)})}catch(Z){$.some(function(j){j.__h&&(j.__h=[])}),$=[],l_.__e(Z,N.__v)}}),M4&&M4(_,$)},l_.unmount=function(_){P4&&P4(_);var $,N=_.__c;N&&N.__H&&(N.__H.__.some(function(Z){try{l2(Z)}catch(j){$=j}}),N.__H=void 0,$&&l_.__e($,N.__v))};var x4=typeof requestAnimationFrame=="function";function B6(_){var $,N=function(){clearTimeout(Z),x4&&cancelAnimationFrame($),setTimeout(_)},Z=setTimeout(N,35);x4&&($=requestAnimationFrame(N))}function l2(_){var $=o_,N=_.__c;typeof N=="function"&&(_.__c=void 0,N()),o_=$}function A3(_){var $=o_;_.__c=_.__(),o_=$}function o4(_,$){return!_||_.length!==$.length||$.some(function(N,Z){return N!==_[Z]})}function r4(_,$){return typeof $=="function"?$(_):$}var d4=function(_,$,N,Z){var j;$[0]=0;for(var J=1;J<$.length;J++){var K=$[J++],Y=$[J]?($[0]|=K?1:2,N[$[J++]]):$[++J];K===3?Z[0]=Y:K===4?Z[1]=Object.assign(Z[1]||{},Y):K===5?(Z[1]=Z[1]||{})[$[++J]]=Y:K===6?Z[1][$[++J]]+=Y+"":K?(j=_.apply(Y,d4(_,Y,N,["",null])),Z.push(j),Y[0]?$[0]|=2:($[J-2]=0,$[J]=j)):Z.push(Y)}return Z},T4=new Map;function q6(_){var $=T4.get(this);return $||($=new Map,T4.set(this,$)),($=d4(this,$.get(_)||($.set(_,$=function(N){for(var Z,j,J=1,K="",Y="",O=[0],z=function(k){J===1&&(k||(K=K.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?O.push(0,k,K):J===3&&(k||K)?(O.push(3,k,K),J=2):J===2&&K==="..."&&k?O.push(4,k,0):J===2&&K&&!k?O.push(5,0,!0,K):J>=5&&((K||!k&&J===5)&&(O.push(J,0,K,j),J=6),k&&(O.push(J,k,0,j),J=6)),K=""},V=0;V<N.length;V++){V&&(J===1&&z(),z(V));for(var B=0;B<N[V].length;B++)Z=N[V][B],J===1?Z==="<"?(z(),O=[O],J=3):K+=Z:J===4?K==="--"&&Z===">"?(J=1,K=""):K=Z+K[0]:Y?Z===Y?Y="":K+=Z:Z==='"'||Z==="'"?Y=Z:Z===">"?(z(),J=1):J&&(Z==="="?(J=5,j=K,K=""):Z==="/"&&(J<5||N[V][B+1]===">")?(z(),J===3&&(O=O[0]),J=O,(O=O[0]).push(2,0,J),J=0):Z===" "||Z==="\t"||Z===`
`||Z==="\r"?(z(),J=2):K+=Z),J===3&&K==="!--"&&(J=4,O=O[0])}return z(),O}(_)),$),arguments,[])).length>1?$:$[0]}var X=q6.bind(v4);async function s_(_,$={}){let N=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!N.ok){let Z=await N.json().catch(()=>({error:"Unknown error"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function e2(_=10,$=null){let N=`/timeline?limit=${_}`;if($)N+=`&before=${$}`;return s_(N)}async function s4(_,$=50,N=0){return s_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${N}`)}async function a4(_,$=50,N=0){return s_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${N}`)}async function t4(_){return s_(`/thread/${_}`)}async function e4(_,$=!1){let N=`/post/${_}?cascade=${$?"true":"false"}`;return s_(N,{method:"DELETE"})}async function T3(_,$,N=null,Z=[],j=null){return s_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:N,media_ids:Z,mode:j})})}async function _8(){return s_("/agents")}async function $8(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/status${$}`)}async function I3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/context${$}`)}async function f3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/queue-state${$}`)}async function u3(_,$=null){let N=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function c3(_,$=null){let N=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function Q2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return s_(`/agent/models${$}`)}async function N8(_){let $=new FormData;$.append("file",_);let N=await fetch("/media/upload",{method:"POST",body:$});if(!N.ok){let Z=await N.json().catch(()=>({error:"Upload failed"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function v3(_,$){let N=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to respond"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function Z8(_,$){let N=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(Z.error||`HTTP ${N.status}`)}return N.json()}async function J8(_,$="thought"){let N=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return s_(N)}async function j8(_,$,N){return s_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(N)})})}function m0(_){return`/media/${_}`}function K8(_){return`/media/${_}/thumbnail`}async function I2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function z8(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media text");return $.text()}async function Y8(_){let $=await fetch(`/media/${_}`);if(!$.ok)throw Error("Failed to load media blob");return $.blob()}async function _3(_="",$=2,N=!1){let Z=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${N?"1":"0"}`;return s_(Z)}async function O8(_=""){let $=`/workspace/branch?path=${encodeURIComponent(_||"")}`;return s_($)}async function G8(_,$=20000,N=null){let Z=N?`&mode=${encodeURIComponent(N)}`:"",j=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${Z}`;return s_(j)}async function L8(_){return s_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function m3(_,$="",N={}){let Z=new FormData;Z.append("file",_);let j=new URLSearchParams;if($)j.set("path",$);if(N.overwrite)j.set("overwrite","1");let J=j.toString(),K=J?`/workspace/upload?${J}`:"/workspace/upload",Y=await fetch(""+K,{method:"POST",body:Z});if(!Y.ok){let O=await Y.json().catch(()=>({error:"Upload failed"})),z=Error(O.error||`HTTP ${Y.status}`);throw z.status=Y.status,z.code=O.code,z}return Y.json()}async function B8(_,$,N=""){let Z=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:N})});if(!Z.ok){let j=await Z.json().catch(()=>({error:"Create failed"})),J=Error(j.error||`HTTP ${Z.status}`);throw J.status=Z.status,J.code=j.code,J}return Z.json()}async function q8(_,$){let N=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Rename failed"})),j=Error(Z.error||`HTTP ${N.status}`);throw j.status=N.status,j.code=Z.code,j}return N.json()}async function V8(_,$){let N=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!N.ok){let Z=await N.json().catch(()=>({error:"Move failed"})),j=Error(Z.error||`HTTP ${N.status}`);throw j.status=N.status,j.code=Z.code,j}return N.json()}async function X8(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return s_($,{method:"DELETE"})}async function $3(_,$=!1){return s_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function R3(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function Q8(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class g3{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,N=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,N+$),this.reconnectAttempts=0;let Z=Math.max(this.cooldownUntil-N,0),j=Math.max(this.reconnectDelay,Z);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},j),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function R0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function R_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function D2(_,$=!1){let N=R0(_);if(N===null)return $;return N==="true"}function k2(_,$=null){let N=R0(_);if(N===null)return $;let Z=parseInt(N,10);return Number.isFinite(Z)?Z:$}function a0({prefix:_="file",label:$,title:N,onRemove:Z,onClick:j,removeTitle:J="Remove",icon:K="file"}){let Y=`${_}-file-pill`,O=`${_}-file-name`,z=`${_}-file-remove`,V=K==="message"?X`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:X`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return X`
    <span class=${Y} title=${N||$} onClick=${j}>
      ${V}
      <span class=${O}>${$}</span>
      ${Z&&X`
        <button
          class=${z}
          onClick=${(B)=>{B.preventDefault(),B.stopPropagation(),Z()}}
          title=${J}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var X6=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function Q6({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),N=_.tokens,Z=_.contextWindow,j=N!=null?`Context: ${W8(N)} / ${W8(Z)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,J=7,K=2*Math.PI*7,Y=$/100*K,O=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return X`
        <span class="compose-context-pie icon-btn" title=${j}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${O}
                    stroke-width="2.5"
                    stroke-dasharray=${`${Y} ${K}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function W8(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function U8({onPost:_,onFocus:$,searchMode:N,onSearch:Z,onEnterSearch:j,onExitSearch:J,fileRefs:K=[],onRemoveFileRef:Y,onClearFileRefs:O,messageRefs:z=[],onRemoveMessageRef:V,onClearMessageRefs:B,activeModel:k=null,modelUsage:D=null,thinkingLevel:E=null,supportsThinking:b=!1,contextUsage:m=null,currentBranch:A=null,currentBranchRepoPath:Q=null,notificationsEnabled:w=!1,notificationPermission:M="default",onToggleNotifications:T,onModelChange:i,onModelStateChange:o,activeEditorPath:__=null,onAttachEditorFile:Y_,onOpenFilePill:a,followupQueueItems:G_=[],onInjectQueuedFollowup:F_,onRemoveQueuedFollowup:d,onMessageResponse:Z_,isAgentActive:e=!1}){let[s,N_]=f(""),[O_,J_]=f(""),[Q_,X_]=f([]),[S_,t_]=f(!1),[E_,r_]=f([]),[A_,g_]=f(0),[j_,B_]=f(!1),[L_,y_]=f(!1),[q_,f_]=f(!1),[T_,k_]=f([]),[V_,w_]=f(!1),C_=H(null),h_=H(null),x_=H(null),K0=H(null),U_=H(0),f0=200,k0=(U)=>{let u=new Set,n=[];for(let z_ of U||[]){if(typeof z_!=="string")continue;let H_=z_.trim();if(!H_||u.has(H_))continue;u.add(H_),n.push(H_)}return n},H0=()=>{let U=R0("piclaw_compose_history");if(!U)return[];try{let u=JSON.parse(U);if(!Array.isArray(u))return[];return k0(u)}catch{return[]}},N0=(U)=>{R_("piclaw_compose_history",JSON.stringify(U))},e_=H(H0()),x=H(-1),$_=H(""),u_=s.trim()||Q_.length>0||K.length>0||z.length>0,Y0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),y0=typeof window<"u"&&typeof Notification<"u",O0=typeof window<"u"?Boolean(window.isSecureContext):!1,e0=y0&&O0&&M!=="denied",G0=M==="granted"&&w,c_=G0?"Disable notifications":"Enable notifications",L0=k||"",p_=b&&E?` (${E})`:"",B0=p_.trim()?`${E}`:"",g0=typeof D?.hint_short==="string"?D.hint_short.trim():"",D0=typeof A==="string"?A.trim():"",z2=Q&&Q!=="."?`Git branch: ${D0} (${Q})`:`Git branch: ${D0}`,C0=[B0||null,g0||null].filter(Boolean).join(" • "),u0=[L0?`Current model: ${L0}${p_}`:null,D?.plan?`Plan: ${D.plan}`:null,g0||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),c0=L_?"Switching model…":u0.join(" • ")||`Current model: ${L0}${p_} (tap to open model picker)`,q0=(U)=>{if(!U||typeof U!=="object")return;let u=U.model??U.current;if(typeof o==="function")o({model:u??null,thinking_level:U.thinking_level??null,supports_thinking:U.supports_thinking,provider_usage:U.provider_usage??null});if(u&&typeof i==="function")i(u)},h0=(U)=>{let u=U||C_.current;if(!u)return;u.style.height="auto",u.style.height=`${u.scrollHeight}px`,u.style.overflowY="hidden"},g2=(U)=>{if(!U.startsWith("/")||U.includes(`
`)){B_(!1),r_([]);return}let u=U.toLowerCase().split(" ")[0];if(u.length<1){B_(!1),r_([]);return}let n=X6.filter((z_)=>z_.name.startsWith(u)||z_.name.replace(/-/g,"").startsWith(u.replace(/-/g,"")));if(n.length>0&&!(n.length===1&&n[0].name===u))r_(n),g_(0),B_(!0);else B_(!1),r_([])},Y2=(U)=>{let u=s,n=u.indexOf(" "),z_=n>=0?u.slice(n):"",H_=U.name+z_;N_(H_),B_(!1),r_([]),requestAnimationFrame(()=>{let M_=C_.current;if(!M_)return;let b_=H_.length;M_.selectionStart=b_,M_.selectionEnd=b_,M_.focus()})},V0=(U)=>{if(N)J_(U);else N_(U),g2(U);requestAnimationFrame(()=>h0())},$0=(U)=>{let u=N?O_:s,n=u&&!u.endsWith(`
`)?`
`:"",z_=`${u}${n}${U}`.trimStart();V0(z_)},X0=(U)=>{let u=U?.command?.model_label;if(u)return u;let n=U?.command?.message;if(typeof n==="string"){let z_=n.match(/•\s+([^\n]+?)\s+\(current\)/);if(z_?.[1])return z_[1].trim()}return null},d_=async(U)=>{if(N||L_)return;y_(!0);try{let u=await T3("default",U,null,[]),n=X0(u);q0({model:n??k??null,thinking_level:u?.command?.thinking_level,supports_thinking:u?.command?.supports_thinking});try{let z_=await Q2();if(z_)q0(z_)}catch{}return _?.(),!0}catch(u){return console.error("Failed to switch model:",u),alert("Failed to switch model: "+u.message),!1}finally{y_(!1)}},v_=async()=>{await d_("/cycle-model")},z0=async(U)=>{if(!U||L_)return;if(await d_(`/model ${U}`))f_(!1)},Q0=(U)=>{U.preventDefault(),U.stopPropagation(),f_((u)=>!u)},p0=(U)=>{if(U==="queue"||U==="steer"||U==="auto")return U;return e?"queue":null},b0=async(U,u,n={})=>{let{includeMedia:z_=!0,includeFileRefs:H_=!0,includeMessageRefs:M_=!0,clearAfterSubmit:b_=!0,recordHistory:W0=!0}=n||{},A0=typeof U==="string"?U:U&&typeof U?.target?.value==="string"?U.target.value:s,l0=typeof A0==="string"?A0:"";if(!l0.trim()&&(z_?Q_.length===0:!0)&&(H_?K.length===0:!0)&&(M_?z.length===0:!0))return;B_(!1),r_([]);let w0=z_?[...Q_]:[],B2=H_?[...K]:[],U2=M_?[...z]:[],J0=l0.trim();if(W0&&J0){let U0=e_.current,M0=k0(U0.filter((q2)=>q2!==J0));if(M0.push(J0),M0.length>200)M0.splice(0,M0.length-200);e_.current=M0,N0(M0),x.current=-1,$_.current=""}if(b_)N_(""),X_([]),O?.(),B?.();(async()=>{try{let U0=[];for(let I_ of w0){let F0=await N8(I_);U0.push(F0.id)}let M0=B2.length?`Files:
${B2.map((I_)=>`- ${I_}`).join(`
`)}`:"",q2=U2.length?`Referenced messages:
${U2.map((I_)=>`- message:${I_}`).join(`
`)}`:"",N2=U0.length?`Images:
${U0.map((I_,F0)=>{let r0=w0[F0]?.name||`image-${F0+1}`;return`- attachment:${I_} (${r0})`}).join(`
`)}`:"",w2=[J0,M0,q2,N2].filter(Boolean).join(`

`),o0=await T3("default",w2,null,U0,p0(u));if(Z_?.(o0),o0?.command){q0({model:o0.command.model_label??k??null,thinking_level:o0.command.thinking_level,supports_thinking:o0.command.supports_thinking});try{let I_=await Q2();if(I_)q0(I_)}catch{}}_?.()}catch(U0){console.error("Failed to post:",U0)}})()},i0=(U)=>{F_?.(U)},O2=(U)=>{if(U.isComposing)return;if(N&&U.key==="Escape"){U.preventDefault(),J_(""),J?.();return}if(j_&&E_.length>0){let u=C_.current?.value??(N?O_:s);if(!String(u||"").startsWith("/"))B_(!1),r_([]);else{if(U.key==="ArrowDown"){U.preventDefault(),g_((n)=>(n+1)%E_.length);return}if(U.key==="ArrowUp"){U.preventDefault(),g_((n)=>(n-1+E_.length)%E_.length);return}if(U.key==="Tab"){U.preventDefault(),Y2(E_[A_]);return}if(U.key==="Enter"&&!U.shiftKey){if(!(C_.current?.value??(N?O_:s)).includes(" ")){U.preventDefault();let H_=E_[A_];B_(!1),r_([]),b0(H_.name);return}}if(U.key==="Escape"){U.preventDefault(),B_(!1),r_([]);return}}}if(!N&&(U.key==="ArrowUp"||U.key==="ArrowDown")&&!U.metaKey&&!U.ctrlKey&&!U.altKey&&!U.shiftKey){let u=C_.current;if(!u)return;let n=u.value||"",z_=u.selectionStart===0&&u.selectionEnd===0,H_=u.selectionStart===n.length&&u.selectionEnd===n.length;if(U.key==="ArrowUp"&&z_||U.key==="ArrowDown"&&H_){let M_=e_.current;if(!M_.length)return;U.preventDefault();let b_=x.current;if(U.key==="ArrowUp"){if(b_===-1)$_.current=n,b_=M_.length-1;else if(b_>0)b_-=1;x.current=b_,V0(M_[b_]||"")}else{if(b_===-1)return;if(b_<M_.length-1)b_+=1,x.current=b_,V0(M_[b_]||"");else x.current=-1,V0($_.current||""),$_.current=""}requestAnimationFrame(()=>{let W0=C_.current;if(!W0)return;let A0=W0.value.length;W0.selectionStart=A0,W0.selectionEnd=A0});return}}if(U.key==="Enter"&&!U.shiftKey&&(U.ctrlKey||U.metaKey)){U.preventDefault();let u=C_.current?.value??(N?O_:s);if(N){if(u.trim())Z?.(u.trim())}else b0(u,"steer");return}if(U.key==="Enter"&&!U.shiftKey){U.preventDefault();let u=C_.current?.value??(N?O_:s);if(N){if(u.trim())Z?.(u.trim())}else b0(u)}},Z0=(U)=>{let u=Array.from(U||[]).filter((n)=>n&&n.type&&n.type.startsWith("image/"));if(!u.length)return;X_((n)=>[...n,...u])},n0=(U)=>{Z0(U.target.files),U.target.value=""},G2=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),U_.current+=1,t_(!0)},_2=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),U_.current=Math.max(0,U_.current-1),U_.current===0)t_(!1)},$2=(U)=>{if(N)return;if(U.preventDefault(),U.stopPropagation(),U.dataTransfer)U.dataTransfer.dropEffect="copy";t_(!0)},W2=(U)=>{if(N)return;U.preventDefault(),U.stopPropagation(),U_.current=0,t_(!1),Z0(U.dataTransfer?.files||[])},i_=(U)=>{if(N)return;let u=U.clipboardData?.items;if(!u||!u.length)return;let n=[];for(let z_ of u){if(z_.kind!=="file")continue;let H_=z_.getAsFile?.();if(H_)n.push(H_)}if(n.length>0)U.preventDefault(),Z0(n)},I0=(U)=>{X_((u)=>u.filter((n,z_)=>z_!==U))},E0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((U)=>{let{latitude:u,longitude:n,accuracy:z_}=U.coords,H_=`${u.toFixed(5)}, ${n.toFixed(5)}`,M_=Number.isFinite(z_)?` ±${Math.round(z_)}m`:"",b_=`https://maps.google.com/?q=${u},${n}`,W0=`Location: ${H_}${M_} ${b_}`;$0(W0)},(U)=>{let u=U?.message||"Unable to retrieve location.";alert(`Location error: ${u}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};R(()=>{if(!q_)return;w_(!0),Q2().then((U)=>{let u=Array.isArray(U?.models)?U.models.filter((n)=>typeof n==="string"&&n.trim().length>0):[];k_(u),q0(U)}).catch((U)=>{console.warn("Failed to load model list:",U),k_([])}).finally(()=>{w_(!1)})},[q_,k]),R(()=>{if(N)f_(!1)},[N]),R(()=>{if(!q_)return;let U=(u)=>{let n=x_.current,z_=K0.current,H_=u.target;if(n&&n.contains(H_))return;if(z_&&z_.contains(H_))return;f_(!1)};return document.addEventListener("pointerdown",U),()=>document.removeEventListener("pointerdown",U)},[q_]);let L2=(U)=>{let u=U.target.value;h0(U.target),V0(u)};return R(()=>{requestAnimationFrame(()=>h0())},[s,O_,N]),X`
        <div class="compose-box">
            ${!N&&G_.length>0&&X`
                <div class="compose-queue-stack">
                    ${G_.map((U)=>{let u=typeof U?.content==="string"?U.content:"";if(!u.trim())return null;return X`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${u}>
                                    ${u}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>i0(U)}
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
                                    onClick=${()=>d?.(U)}
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
                class=${`compose-input-wrapper${S_?" drag-active":""}`}
                onDragEnter=${G2}
                onDragOver=${$2}
                onDragLeave=${_2}
                onDrop=${W2}
            >
                <div class="compose-input-main">
                    ${(K.length>0||Q_.length>0||z.length>0)&&X`
                        <div class="compose-file-refs">
                            ${z.map((U)=>{return X`
                                    <${a0}
                                        key=${"msg-"+U}
                                        prefix="compose"
                                        label=${"msg:"+U}
                                        title=${"Message reference: "+U}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>V?.(U)}
                                    />
                                `})}
                            ${K.map((U)=>{let u=U.split("/").pop()||U;return X`
                                    <${a0}
                                        prefix="compose"
                                        label=${u}
                                        title=${U}
                                        onClick=${()=>a?.(U)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>Y?.(U)}
                                    />
                                `})}
                            ${Q_.map((U,u)=>{let n=U?.name||`image-${u+1}`;return X`
                                    <${a0}
                                        key=${n+u}
                                        prefix="compose"
                                        label=${n}
                                        title=${n}
                                        removeTitle="Remove image"
                                        onRemove=${()=>I0(u)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${C_}
                        placeholder=${N?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${N?O_:s}
                        onInput=${L2}
                        onKeyDown=${O2}
                        onPaste=${i_}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${j_&&E_.length>0&&X`
                        <div class="slash-autocomplete" ref=${h_}>
                            ${E_.map((U,u)=>X`
                                <div
                                    key=${U.name}
                                    class=${`slash-item${u===A_?" active":""}`}
                                    onMouseDown=${(n)=>{n.preventDefault(),Y2(U)}}
                                    onMouseEnter=${()=>g_(u)}
                                >
                                    <span class="slash-name">${U.name}</span>
                                    <span class="slash-desc">${U.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${q_&&!N&&X`
                        <div class="compose-model-popup" ref=${x_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${V_&&X`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!V_&&T_.length===0&&X`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!V_&&T_.map((U)=>X`
                                    <button
                                        key=${U}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${k===U?" active":""}`}
                                        onClick=${()=>{z0(U)}}
                                        disabled=${L_}
                                    >
                                        ${U}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{v_()}}
                                    disabled=${L_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!N&&k&&X`
                    <div class="compose-meta-row">
                        ${!N&&k&&X`
                            <div class="compose-model-meta">
                                <button
                                    ref=${K0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${c0}
                                    aria-label="Open model picker"
                                    onClick=${Q0}
                                    disabled=${L_}
                                >
                                    ${L_?"Switching…":L0}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!L_&&C0&&X`
                                        <span class="compose-model-usage-hint" title=${c0}>
                                            ${C0}
                                        </span>
                                    `}
                                    ${D0&&X`
                                        <span class="compose-branch-hint" title=${z2}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M6 3v12"/>
                                                <circle cx="18" cy="6" r="3"/>
                                                <circle cx="6" cy="18" r="3"/>
                                                <path d="M18 9a9 9 0 0 1-9 9"/>
                                            </svg>
                                            <span class="compose-branch-label">${D0}</span>
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${N?"search-mode":""}">
                    ${!N&&m&&m.percent!=null&&X`
                        <${Q6} usage=${m} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${N?J:j}
                        title=${N?"Close search":"Search"}
                    >
                        ${N?X`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:X`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${Y0&&!N&&X`
                        <button
                            class="icon-btn location-btn"
                            onClick=${E0}
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
                    ${e0&&!N&&X`
                        <button
                            class=${`icon-btn notification-btn${G0?" active":""}`}
                            onClick=${T}
                            title=${c_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!N&&X`
                        ${__&&Y_&&X`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${Y_}
                                title=${`Attach open file: ${__}`}
                                type="button"
                                disabled=${K.includes(__)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${n0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{b0()}}
                            disabled=${!u_}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var H8="piclaw_theme",i3="piclaw_tint",J3={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},W6={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},F8={default:{label:"Default",mode:"auto",light:J3,dark:W6},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},U6=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],j3={theme:"default",tint:null},y8="light",h3=!1;function D8(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function C2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let N=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(N)&&!/^[0-9a-fA-F]{6}$/.test(N))return null;let Z=N.length===3?N.split("").map((J)=>J+J).join(""):N,j=parseInt(Z,16);return{r:j>>16&255,g:j>>8&255,b:j&255,hex:`#${Z.toLowerCase()}`}}function F6(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let N=document.createElement("div");if(N.style.color="",N.style.color=$,!N.style.color)return null;let Z=N.style.color;try{if(document.body)N.style.display="none",document.body.appendChild(N),Z=getComputedStyle(N).color||N.style.color,document.body.removeChild(N)}catch{}let j=Z.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!j)return null;let J=parseInt(j[1],10),K=parseInt(j[2],10),Y=parseInt(j[3],10);if(![J,K,Y].every((z)=>Number.isFinite(z)))return null;let O=`#${[J,K,Y].map((z)=>z.toString(16).padStart(2,"0")).join("")}`;return{r:J,g:K,b:Y,hex:O}}function k8(_){return C2(_)||F6(_)}function f2(_,$,N){let Z=Math.round(_.r+($.r-_.r)*N),j=Math.round(_.g+($.g-_.g)*N),J=Math.round(_.b+($.b-_.b)*N);return`rgb(${Z} ${j} ${J})`}function p3(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function C8(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function n3(_){return F8[_]||F8.default}function H6(_){return _.mode==="auto"?C8():_.mode}function y6(_,$){let N=n3(_);if($==="dark"&&N.dark)return N.dark;if($==="light"&&N.light)return N.light;return N.dark||N.light||J3}function D6(_,$,N){let Z=k8($);if(!Z)return _;let j=C2(_.bgPrimary),J=C2(_.bgSecondary),K=C2(_.bgHover),Y=C2(_.borderColor);if(!j||!J||!K||!Y)return _;let z=C2(N==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:f2(j,Z,0.08),bgSecondary:f2(J,Z,0.12),bgHover:f2(K,Z,0.16),borderColor:f2(Y,Z,0.08),accent:Z.hex,accentHover:z?f2(Z,z,0.18):Z.hex}}function k6(_,$){if(typeof document>"u")return;let N=document.documentElement,Z=_.accent,j=k8(Z),J=j?p3(j,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,K=j?p3(j,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",Y=j?p3(j,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",O={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":Z,"--accent-hover":_.accentHover||Z,"--accent-soft":K,"--accent-soft-strong":Y,"--danger-color":_.danger||J3.danger,"--success-color":_.success||J3.success,"--search-highlight-color":J||"rgba(29, 155, 240, 0.2)"};Object.entries(O).forEach(([z,V])=>{if(V)N.style.setProperty(z,V)})}function C6(){if(typeof document>"u")return;let _=document.documentElement;U6.forEach(($)=>_.style.removeProperty($))}function N3(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function b6(_,$){if(typeof document>"u")return;let N=N3("theme-color");if(N&&_)N.setAttribute("content",_);let Z=N3("msapplication-TileColor");if(Z&&_)Z.setAttribute("content",_);let j=N3("msapplication-navbutton-color");if(j&&_)j.setAttribute("content",_);let J=N3("apple-mobile-web-app-status-bar-style");if(J)J.setAttribute("content",$==="dark"?"black-translucent":"default")}function E6(){if(typeof window>"u")return;let _={...j3,mode:y8};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function l3(_,$={}){if(typeof window>"u"||typeof document>"u")return;let N=D8(_?.theme||"default"),Z=_?.tint?String(_.tint).trim():null,j=n3(N),J=H6(j),K=y6(N,J);j3={theme:N,tint:Z},y8=J;let Y=document.documentElement;Y.dataset.theme=J,Y.dataset.colorTheme=N,Y.dataset.tint=Z?String(Z):"",Y.style.colorScheme=J;let O=K;if(N==="default"&&Z)O=D6(K,Z,J);if(N==="default"&&!Z)C6();else k6(O,J);if(b6(O.bgPrimary,J),E6(),$.persist!==!1)if(R_(H8,N),Z)R_(i3,Z);else R_(i3,"")}function Z3(){if(n3(j3.theme).mode!=="auto")return;l3(j3,{persist:!1})}function b8(){if(typeof window>"u")return()=>{};let _=D8(R0(H8)||"default"),$=R0(i3),N=$?$.trim():null;if(l3({theme:_,tint:N},{persist:!1}),window.matchMedia&&!h3){let Z=window.matchMedia("(prefers-color-scheme: dark)");if(Z.addEventListener)Z.addEventListener("change",Z3);else if(Z.addListener)Z.addListener(Z3);return h3=!0,()=>{if(Z.removeEventListener)Z.removeEventListener("change",Z3);else if(Z.removeListener)Z.removeListener(Z3);h3=!1}}return()=>{}}function E8(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let N=_.theme??_.name??_.colorTheme,Z=_.tint??null;l3({theme:N||"default",tint:Z},{persist:!0})}function A8(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return C8()}var K3=/#(\w+)/g,A6=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),w6=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),M6=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),P6={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},S6=new Set(["http:","https:","mailto:",""]);function w8(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function b2(_,$={}){if(!_)return null;let N=String(_).trim();if(!N)return null;if(N.startsWith("#")||N.startsWith("/"))return N;if(N.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(N))return N;return null}if(N.startsWith("blob:"))return N;try{let Z=new URL(N,typeof window<"u"?window.location.origin:"http://localhost");if(!S6.has(Z.protocol))return null;return Z.href}catch{return null}}function M8(_,$={}){if(!_)return"";let N=new DOMParser().parseFromString(_,"text/html"),Z=[],j=N.createTreeWalker(N.body,NodeFilter.SHOW_ELEMENT),J;while(J=j.nextNode())Z.push(J);for(let K of Z){let Y=K.tagName.toLowerCase();if(!w6.has(Y)){let z=K.parentNode;if(!z)continue;while(K.firstChild)z.insertBefore(K.firstChild,K);z.removeChild(K);continue}let O=P6[Y]||new Set;for(let z of Array.from(K.attributes)){let V=z.name.toLowerCase(),B=z.value;if(V.startsWith("on")){K.removeAttribute(z.name);continue}if(V.startsWith("data-")||V.startsWith("aria-"))continue;if(O.has(V)||M6.has(V)){if(V==="href"){let k=b2(B);if(!k)K.removeAttribute(z.name);else if(K.setAttribute(z.name,k),Y==="a"&&!K.getAttribute("rel"))K.setAttribute("rel","noopener noreferrer")}else if(V==="src"){let k=Y==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(B):B,D=b2(k,{allowDataImage:Y==="img"});if(!D)K.removeAttribute(z.name);else K.setAttribute(z.name,D)}continue}K.removeAttribute(z.name)}}return N.body.innerHTML}function P8(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function z3(_,$=2){if(!_)return _;let N=_;for(let Z=0;Z<$;Z+=1){let j=P8(N);if(j===N)break;N=j}return N}function x6(_){if(!_)return{text:"",blocks:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=[],J=!1,K=[];for(let Y of N){if(!J&&Y.trim().match(/^```mermaid\s*$/i)){J=!0,K=[];continue}if(J&&Y.trim().match(/^```\s*$/)){let O=Z.length;Z.push(K.join(`
`)),j.push(`@@MERMAID_BLOCK_${O}@@`),J=!1,K=[];continue}if(J)K.push(Y);else j.push(Y)}if(J)j.push("```mermaid"),j.push(...K);return{text:j.join(`
`),blocks:Z}}function T6(_){if(!_)return _;return z3(_,5)}function I6(_){let $=new TextEncoder().encode(String(_||"")),N="";for(let Z of $)N+=String.fromCharCode(Z);return btoa(N)}function f6(_){let $=atob(String(_||"")),N=new Uint8Array($.length);for(let Z=0;Z<$.length;Z+=1)N[Z]=$.charCodeAt(Z);return new TextDecoder().decode(N)}function u6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(N,Z)=>{let j=Number(Z),J=$[j]??"",K=T6(J);return`<div class="mermaid-container" data-mermaid="${I6(K)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function S8(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,N)=>{if(N.includes(`
`))return`
\`\`\`
${N}
\`\`\`
`;return`\`${N}\``})}function x8(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,N)=>{let Z=N.trim(),j=Z.startsWith("/"),J=j?Z.slice(1).trim():Z,O=(J.endsWith("/")?J.slice(0,-1).trim():J).split(/\s+/)[0]?.toLowerCase();if(!O||!A6.has(O))return $;if(O==="br")return j?"":"<br>";if(j)return`</${O}>`;return`<${O}>`})}function T8(_){if(!_)return _;let $=(N)=>N.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(N,Z)=>`<pre><code>${$(Z)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(N,Z)=>`<code>${$(Z)}</code>`)}function I8(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=(J)=>J.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),j;while(j=N.nextNode()){if(!j.nodeValue)continue;let J=Z(j.nodeValue);if(J!==j.nodeValue)j.nodeValue=J}return $.body.innerHTML}function c6(_){if(!window.katex)return _;let $=(K)=>P8(K).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),N=(K)=>{let Y=[],O=K.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_BLOCK_${V}@@`});return O=O.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(z)=>{let V=Y.length;return Y.push(z),`@@CODE_INLINE_${V}@@`}),{html:O,blocks:Y}},Z=(K,Y)=>{if(!Y.length)return K;return K.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(O,z)=>{let V=Number(z);return Y[V]??""})},j=N(_),J=j.html;return J=J.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(K,Y,O)=>{try{let z=katex.renderToString($(O.trim()),{displayMode:!0,throwOnError:!1});return`${Y}${z}`}catch(z){return`<span class="math-error" title="${w8(z.message)}">${K}</span>`}}),J=J.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(K,Y,O)=>{if(/\s$/.test(O))return K;try{let z=katex.renderToString($(O),{displayMode:!1,throwOnError:!1});return`${Y}${z}`}catch(z){return`${Y}<span class="math-error" title="${w8(z.message)}">$${O}$</span>`}}),Z(J,j.blocks)}function v6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),N=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),Z=[],j;while(j=N.nextNode())Z.push(j);for(let J of Z){let K=J.nodeValue;if(!K)continue;if(K3.lastIndex=0,!K3.test(K))continue;K3.lastIndex=0;let Y=J.parentElement;if(Y&&(Y.closest("a")||Y.closest("code")||Y.closest("pre")))continue;let O=K.split(K3);if(O.length<=1)continue;let z=$.createDocumentFragment();O.forEach((V,B)=>{if(B%2===1){let k=$.createElement("a");k.setAttribute("href","#"),k.className="hashtag",k.setAttribute("data-hashtag",V),k.textContent=`#${V}`,z.appendChild(k)}else z.appendChild($.createTextNode(V))}),J.parentNode?.replaceChild(z,J)}return $.body.innerHTML}function m6(_){if(!_)return _;let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=[],j=!1;for(let J of N){if(!j&&J.trim().match(/^```(?:math|katex|latex)\s*$/i)){j=!0,Z.push("$$");continue}if(j&&J.trim().match(/^```\s*$/)){j=!1,Z.push("$$");continue}Z.push(J)}return Z.join(`
`)}function j2(_,$,N={}){if(!_)return"";let Z=m6(_),{text:j,blocks:J}=x6(Z),K=z3(j,2),O=S8(K).replace(/</g,"&lt;").replace(/>/g,"&gt;"),z=x8(O),V=window.marked?marked.parse(z,{headerIds:!1,mangle:!1}):z.replace(/\n/g,"<br>");return V=T8(V),V=I8(V),V=c6(V),V=v6(V),V=u6(V,J),V=M8(V,N),V}function f8(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),N=z3($,2),j=S8(N).replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=x8(j),K=window.marked?marked.parse(J):J.replace(/\n/g,"<br>");return K=T8(K),K=I8(K),K=M8(K),K}async function E2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:N}=window.beautifulMermaid,j=A8()==="dark"?N["tokyo-night"]:N["github-light"],J=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let K of J)try{let Y=K.dataset.mermaid,O=f6(Y||""),z=z3(O,2),V=await $(z,{...j,transparent:!0});K.innerHTML=V,K.removeAttribute("data-mermaid")}catch(Y){console.error("Mermaid render error:",Y);let O=document.createElement("pre");O.className="mermaid-error",O.textContent=`Diagram error: ${Y.message}`,K.innerHTML="",K.appendChild(O),K.removeAttribute("data-mermaid")}}var u8="PiClaw";function o3(_,$){let N=_||"PiClaw",Z=N.charAt(0).toUpperCase(),j=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],J=Z.charCodeAt(0)%j.length,K=j[J],Y=N.trim().toLowerCase(),O=typeof $==="string"?$.trim():"",V=(O?O:null)||(Y==="PiClaw".toLowerCase()||Y==="pi"?"/static/icon-192.png":null);return{letter:Z,color:K,image:V}}function c8(_,$){if(!_)return"PiClaw";let N=$[_]?.name||_;return N?N.charAt(0).toUpperCase()+N.slice(1):"PiClaw"}function v8(_,$){if(!_)return null;let N=$[_]||{};return N.avatar_url||N.avatarUrl||N.avatar||null}function m8(_){if(!_)return null;if(typeof document<"u"){let J=document.documentElement,K=J?.dataset?.colorTheme||"",Y=J?.dataset?.tint||"",O=getComputedStyle(J).getPropertyValue("--accent-color")?.trim();if(O&&(Y||K&&K!=="default"))return O}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],N=String(_),Z=0;for(let J=0;J<N.length;J+=1)Z=(Z*31+N.charCodeAt(J))%2147483647;let j=Math.abs(Z)%$.length;return $[j]}function R6(_){if(!_||typeof _!=="object")return null;let $=_.started_at??_.startedAt;if(typeof $!=="string"||!$)return null;let N=Date.parse($);return Number.isFinite(N)?N:null}function Y3(_){if(!_||typeof _!=="object")return!1;let $=_.intent_key??_.intentKey;return _.type==="intent"&&$==="compaction"}function g6(_){let $=Math.max(0,Math.floor(_/1000)),N=$%60,Z=Math.floor($/60)%60,j=Math.floor($/3600);if(j>0)return`${j}:${String(Z).padStart(2,"0")}:${String(N).padStart(2,"0")}`;return`${Z}:${String(N).padStart(2,"0")}`}function R8(_,$=Date.now()){let N=R6(_);if(N===null)return null;return g6(Math.max(0,$-N))}function g8({status:_,draft:$,plan:N,thought:Z,pendingRequest:j,intent:J,turnId:K,steerQueued:Y,onPanelToggle:O}){let B=(j_)=>{if(!j_)return{text:"",totalLines:0,fullText:""};if(typeof j_==="string"){let q_=j_,f_=q_?q_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:q_,totalLines:f_,fullText:q_}}let B_=j_.text||"",L_=j_.fullText||j_.full_text||B_,y_=Number.isFinite(j_.totalLines)?j_.totalLines:L_?L_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:B_,totalLines:y_,fullText:L_}},k=160,D=(j_)=>{if(!j_)return 1;return Math.max(1,Math.ceil(j_.length/160))},E=(j_,B_,L_)=>{let y_=(j_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!y_)return{text:"",omitted:0,totalLines:Number.isFinite(L_)?L_:0,visibleLines:0};let q_=y_.split(`
`),f_=q_.length>B_?q_.slice(0,B_).join(`
`):y_,T_=Number.isFinite(L_)?L_:q_.reduce((w_,C_)=>w_+D(C_),0),k_=f_?f_.split(`
`).reduce((w_,C_)=>w_+D(C_),0):0,V_=Math.max(T_-k_,0);return{text:f_,omitted:V_,totalLines:T_,visibleLines:k_}},b=B(N),m=B(Z),A=B($),Q=Boolean(b.text)||b.totalLines>0,w=Boolean(m.text)||m.totalLines>0,M=Boolean(A.fullText?.trim()||A.text?.trim());if(!_&&!M&&!Q&&!w&&!j&&!J)return null;let[T,i]=f(new Set),[o,__]=f(()=>Date.now()),Y_=(j_)=>i((B_)=>{let L_=new Set(B_),y_=!L_.has(j_);if(y_)L_.add(j_);else L_.delete(j_);if(typeof O==="function")O(j_,y_);return L_});R(()=>{i(new Set)},[K]);let a=Y3(_);R(()=>{if(!a)return;__(Date.now());let j_=setInterval(()=>__(Date.now()),1000);return()=>clearInterval(j_)},[a,_?.started_at,_?.startedAt]);let G_=_?.turn_id||K,F_=m8(G_),d=Y?"turn-dot turn-dot-queued":"turn-dot",Z_=(j_)=>j_,e=Boolean(_?.last_activity||_?.lastActivity),s=(j_)=>j_==="warning"?"#f59e0b":j_==="error"?"var(--danger-color)":j_==="success"?"var(--success-color)":F_,N_=J?.kind||"info",O_=s(N_),J_=s(_?.kind||(a?"warning":"info")),Q_="",X_=_?.title,S_=_?.status;if(_?.type==="plan")Q_=X_?`Planning: ${X_}`:"Planning...";else if(_?.type==="tool_call")Q_=X_?`Running: ${X_}`:"Running tool...";else if(_?.type==="tool_status")Q_=X_?`${X_}: ${S_||"Working..."}`:S_||"Working...";else if(_?.type==="error")Q_=X_||"Agent error";else Q_=X_||S_||"Working...";if(e)Q_="Last activity just now";let t_=({panelTitle:j_,text:B_,fullText:L_,totalLines:y_,maxLines:q_,titleClass:f_,panelKey:T_})=>{let k_=T.has(T_),V_=L_||B_||"",w_=typeof q_==="number",C_=k_&&w_,h_=w_?E(V_,q_,y_):{text:V_||"",omitted:0,totalLines:Number.isFinite(y_)?y_:0};if(!V_&&!(Number.isFinite(h_.totalLines)&&h_.totalLines>0))return null;let x_=`agent-thinking-body${w_?" agent-thinking-body-collapsible":""}`,K0=w_?`--agent-thinking-collapsed-lines: ${q_};`:"";return X`
            <div
                class="agent-thinking"
                data-expanded=${k_?"true":"false"}
                data-collapsible=${w_?"true":"false"}
                style=${F_?`--turn-color: ${F_};`:""}
            >
                <div class="agent-thinking-title ${f_||""}">
                    ${F_&&X`<span class=${d} aria-hidden="true"></span>`}
                    ${j_}
                    ${C_&&X`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${j_} panel`}
                            onClick=${()=>Y_(T_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${x_}
                    style=${K0}
                    dangerouslySetInnerHTML=${{__html:f8(V_)}}
                />
                ${!k_&&h_.omitted>0&&X`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(T_)}>
                        ▸ ${h_.omitted} more lines
                    </button>
                `}
                ${k_&&h_.omitted>0&&X`
                    <button class="agent-thinking-truncation" onClick=${()=>Y_(T_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},E_=j?.tool_call?.title,r_=E_?`Awaiting approval: ${E_}`:"Awaiting approval",A_=a?R8(_,o):null,g_=(j_,B_,L_=null)=>X`
        <div
            class="agent-thinking agent-thinking-intent"
            aria-live="polite"
            style=${B_?`--turn-color: ${B_};`:""}
            title=${j_?.detail||""}
        >
            <div class="agent-thinking-title intent">
                ${B_&&X`<span class=${d} aria-hidden="true"></span>`}
                <span class="agent-thinking-title-text">${j_.title}</span>
                ${L_&&X`<span class="agent-status-elapsed">${L_}</span>`}
            </div>
            ${j_.detail&&X`<div class="agent-thinking-body">${j_.detail}</div>`}
        </div>
    `;return X`
        <div class="agent-status-panel">
            ${J&&g_(J,O_)}
            ${_?.type==="intent"&&g_(_,J_,A_)}
            ${j&&X`
                <div class="agent-status agent-status-request" aria-live="polite" style=${F_?`--turn-color: ${F_};`:""}>
                    <span class=${d} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${r_}</span>
                </div>
            `}
            ${Q&&t_({panelTitle:Z_("Planning"),text:b.text,fullText:b.fullText,totalLines:b.totalLines,panelKey:"plan"})}
            ${w&&t_({panelTitle:Z_("Thoughts"),text:m.text,fullText:m.fullText,totalLines:m.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${M&&t_({panelTitle:Z_("Draft"),text:A.text,fullText:A.fullText,totalLines:A.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&_?.type!=="intent"&&X`
                <div class=${`agent-status${e?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${F_?`--turn-color: ${F_};`:""}>
                    ${F_&&X`<span class=${d} aria-hidden="true"></span>`}
                    ${_?.type==="error"?X`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!e&&X`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${Q_}</span>
                </div>
            `}
        </div>
    `}function h8({request:_,onRespond:$}){if(!_)return null;let{request_id:N,tool_call:Z,options:j}=_,J=Z?.title||"Agent Request",K=Z?.kind||"other",Y=Z?.rawInput||{},O=Y.command||Y.commands&&Y.commands[0]||null,z=Y.diff||null,V=Y.fileName||Y.path||null,B=Z?.description||Y.description||Y.explanation||null,D=(Array.isArray(Z?.locations)?Z.locations:[]).map((Q)=>Q?.path).filter((Q)=>Boolean(Q)),E=Array.from(new Set([V,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:N,tool_call:Z,options:j});let b=async(Q)=>{try{await v3(N,Q),$()}catch(w){console.error("Failed to respond to agent request:",w)}},m=async()=>{try{await Z8(J,`Auto-approved: ${J}`),await v3(N,"approved"),$()}catch(Q){console.error("Failed to add to whitelist:",Q)}},A=j&&j.length>0;return X`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${J}</div>
                </div>
                ${(B||O||z||E.length>0)&&X`
                    <div class="agent-request-body">
                        ${B&&X`
                            <div class="agent-request-description">${B}</div>
                        `}
                        ${E.length>0&&X`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${E.map((Q,w)=>X`<li key=${w}>${Q}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${O&&X`
                            <pre class="agent-request-command">${O}</pre>
                        `}
                        ${z&&X`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${z}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${A?j.map((Q)=>X`
                            <button 
                                key=${Q.optionId||Q.id||String(Q)}
                                class="agent-request-btn ${Q.kind==="allow_once"||Q.kind==="allow_always"?"primary":""}"
                                onClick=${()=>b(Q.optionId||Q.id||Q)}
                            >
                                ${Q.name||Q.label||Q.optionId||Q.id||String(Q)}
                            </button>
                        `):X`
                        <button class="agent-request-btn primary" onClick=${()=>b("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>b("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${m}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function p8({status:_}){if(_==="connected")return null;return X`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function i8(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let Z=new Date-$,j=Z/1000,J=86400000;if(Z<J){if(j<60)return"just now";if(j<3600)return`${Math.floor(j/60)}m`;return`${Math.floor(j/3600)}h`}if(Z<5*J){let O=$.toLocaleDateString(void 0,{weekday:"short"}),z=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${O} ${z}`}let K=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),Y=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${K} ${Y}`}function u2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function T0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function A2(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}var h6=new Set(["application/json","application/xml","text/csv","text/html","text/markdown","text/plain","text/xml"]),p6=new Set(["text/markdown"]);function c2(_){let $=typeof _==="string"?_.trim().toLowerCase():"";if(!$)return"unsupported";if($.startsWith("image/"))return"image";if($==="application/pdf")return"pdf";if(h6.has($)||$.startsWith("text/"))return"text";return"unsupported"}function n8(_){let $=typeof _==="string"?_.trim().toLowerCase():"";return p6.has($)}function l8(_){switch(_){case"image":return"Image preview";case"pdf":return"PDF preview";case"text":return"Text preview";default:return"Preview unavailable"}}function i6(_){let $=_?.metadata?.size;return[{label:"Type",value:_?.content_type||"application/octet-stream"},{label:"Size",value:typeof $==="number"?T0($):null},{label:"Added",value:_?.created_at?A2(_.created_at):null}].filter((Z)=>Z.value)}function o8({mediaId:_,info:$,onClose:N}){let Z=$?.filename||`attachment-${_}`,j=j0(()=>c2($?.content_type),[$?.content_type]),J=l8(j),K=j0(()=>n8($?.content_type),[$?.content_type]),[Y,O]=f(j==="text"||j==="pdf"),[z,V]=f(""),[B,k]=f(null),[D,E]=f(null),b=H(null),m=j0(()=>i6($),[$]),A=j0(()=>{if(!K||!z)return"";return j2(z)},[K,z]);return R(()=>{let Q=(w)=>{if(w.key==="Escape")N()};return document.addEventListener("keydown",Q),()=>document.removeEventListener("keydown",Q)},[N]),R(()=>{if(!b.current||!A)return;E2(b.current);return},[A]),R(()=>{let Q=!1,w=null;async function M(){if(j==="text"){O(!0),E(null);try{let T=await z8(_);if(!Q)V(T)}catch{if(!Q)E("Failed to load text preview.")}finally{if(!Q)O(!1)}return}if(j==="pdf"){O(!0),E(null);try{let T=await Y8(_);if(w=URL.createObjectURL(T),!Q)k(w)}catch{if(!Q)E("Failed to load PDF preview.")}finally{if(!Q)O(!1)}return}O(!1)}return M(),()=>{if(Q=!0,w)URL.revokeObjectURL(w)}},[_,j]),X`
        <div class="image-modal attachment-preview-modal" onClick=${N}>
            <div class="attachment-preview-shell" onClick=${(Q)=>{Q.stopPropagation()}}>
                <div class="attachment-preview-header">
                    <div class="attachment-preview-heading">
                        <div class="attachment-preview-title">${Z}</div>
                        <div class="attachment-preview-subtitle">${J}</div>
                    </div>
                    <div class="attachment-preview-header-actions">
                        <a
                            href=${m0(_)}
                            download=${Z}
                            class="attachment-preview-download"
                            onClick=${(Q)=>Q.stopPropagation()}
                        >
                            Download
                        </a>
                        <button class="attachment-preview-close" type="button" onClick=${N}>Close</button>
                    </div>
                </div>
                <div class="attachment-preview-body">
                    ${Y&&X`<div class="attachment-preview-state">Loading preview…</div>`}
                    ${!Y&&D&&X`<div class="attachment-preview-state">${D}</div>`}
                    ${!Y&&!D&&j==="image"&&X`
                        <img class="attachment-preview-image" src=${m0(_)} alt=${Z} />
                    `}
                    ${!Y&&!D&&j==="pdf"&&B&&X`
                        <iframe class="attachment-preview-frame" src=${B} title=${Z}></iframe>
                    `}
                    ${!Y&&!D&&j==="text"&&K&&X`
                        <div
                            ref=${b}
                            class="attachment-preview-markdown post-content"
                            dangerouslySetInnerHTML=${{__html:A}}
                        />
                    `}
                    ${!Y&&!D&&j==="text"&&!K&&X`
                        <pre class="attachment-preview-text">${z}</pre>
                    `}
                    ${!Y&&!D&&j==="unsupported"&&X`
                        <div class="attachment-preview-state">
                            Preview is not available for this file type yet. You can still download it directly.
                        </div>
                    `}
                </div>
                <div class="attachment-preview-meta">
                    ${m.map((Q)=>X`
                        <div class="attachment-preview-meta-item" key=${Q.label}>
                            <span class="attachment-preview-meta-label">${Q.label}</span>
                            <span class="attachment-preview-meta-value">${Q.value}</span>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `}function r8({src:_,onClose:$}){return R(()=>{let N=(Z)=>{if(Z.key==="Escape")$()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[$]),X`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function n6({mediaId:_,onPreview:$}){let[N,Z]=f(null);if(R(()=>{I2(_).then(Z).catch(()=>{})},[_]),!N)return null;let j=N.filename||"file",J=N.metadata?.size,K=J?T0(J):"",O=c2(N.content_type)==="unsupported"?"Details":"Preview";return X`
        <div class="file-attachment" onClick=${(z)=>z.stopPropagation()}>
            <a href=${m0(_)} download=${j} class="file-attachment-main">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <div class="file-info">
                    <span class="file-name">${j}</span>
                    <span class="file-meta-row">
                        ${K&&X`<span class="file-size">${K}</span>`}
                        ${N.content_type&&X`<span class="file-size">${N.content_type}</span>`}
                    </span>
                </div>
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </a>
            <button
                class="file-attachment-preview"
                type="button"
                onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:_,info:N})}}
            >
                ${O}
            </button>
        </div>
    `}function l6({attachment:_,onPreview:$}){let N=Number(_?.id),[Z,j]=f(null);R(()=>{if(!Number.isFinite(N))return;I2(N).then(j).catch(()=>{});return},[N]);let J=Z?.filename||_.label||`attachment-${_.id}`,K=Number.isFinite(N)?m0(N):null,O=c2(Z?.content_type)==="unsupported"?"Details":"Preview";return X`
        <span class="attachment-pill" title=${J}>
            ${K?X`
                    <a href=${K} download=${J} class="attachment-pill-main" onClick=${(z)=>z.stopPropagation()}>
                        <${a0}
                            prefix="post"
                            label=${_.label}
                            title=${J}
                        />
                    </a>
                `:X`
                    <${a0}
                        prefix="post"
                        label=${_.label}
                        title=${J}
                    />
                `}
            ${Number.isFinite(N)&&Z&&X`
                <button
                    class="attachment-pill-preview"
                    type="button"
                    title=${O}
                    onClick=${(z)=>{z.preventDefault(),z.stopPropagation(),$?.({mediaId:N,info:Z})}}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            `}
        </span>
    `}function O3({annotations:_}){if(!_)return null;let{audience:$,priority:N,lastModified:Z}=_,j=Z?A2(Z):null;return X`
        <div class="content-annotations">
            ${$&&$.length>0&&X`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof N==="number"&&X`
                <span class="content-annotation">Priority: ${N}</span>
            `}
            ${j&&X`
                <span class="content-annotation">Updated: ${j}</span>
            `}
        </div>
    `}function o6({block:_}){let $=_.title||_.name||_.uri,N=_.description,Z=_.size?T0(_.size):"",j=_.mime_type||"",J=d6(j),K=b2(_.uri);return X`
        <a
            href=${K||"#"}
            class="resource-link"
            target=${K?"_blank":void 0}
            rel=${K?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${J}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${N&&X`<div class="resource-link-description">${N}</div>`}
                <div class="resource-link-meta">
                    ${j&&X`<span>${j}</span>`}
                    ${Z&&X`<span>${Z}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function r6({block:_}){let[$,N]=f(!1),Z=_.uri||"Embedded resource",j=_.text||"",J=Boolean(_.data),K=_.mime_type||"";return X`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation(),N(!$)}}>
                ${$?"▼":"▶"} ${Z}
            </button>
            ${$&&X`
                ${j&&X`<pre class="resource-embed-content">${j}</pre>`}
                ${J&&X`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${K&&X`<span class="resource-embed-blob-meta">${K}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(Y)=>{Y.preventDefault(),Y.stopPropagation();let O=new Blob([Uint8Array.from(atob(_.data),(B)=>B.charCodeAt(0))],{type:K||"application/octet-stream"}),z=URL.createObjectURL(O),V=document.createElement("a");V.href=z,V.download=Z.split("/").pop()||"resource",V.click(),URL.revokeObjectURL(z)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function d6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function s6({preview:_}){let $=b2(_.url),N=b2(_.image,{allowDataImage:!0}),Z=N?`background-image: url('${N}')`:"",j=_.site_name;if(!j&&$)try{j=new URL($).hostname}catch{j=$}return X`
        <a
            href=${$||"#"}
            class="link-preview ${N?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(J)=>J.stopPropagation()}
            style=${Z}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${j||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&X`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function a6(_,$){return typeof _==="string"?_:""}var t6=1800,e6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,_$=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,$$=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function N$(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let N=document.createElement("textarea");N.value=$,N.setAttribute("readonly",""),N.style.position="fixed",N.style.opacity="0",N.style.pointerEvents="none",document.body.appendChild(N),N.select(),N.setSelectionRange(0,N.value.length);let Z=document.execCommand("copy");return document.body.removeChild(N),Z}catch{return!1}}function Z$(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((J)=>J.querySelector("code"));if($.length===0)return()=>{};let N=new Map,Z=[],j=(J,K)=>{let Y=K||"idle";if(J.dataset.copyState=Y,Y==="success")J.innerHTML=_$,J.setAttribute("aria-label","Copied"),J.setAttribute("title","Copied"),J.classList.add("is-success"),J.classList.remove("is-error");else if(Y==="error")J.innerHTML=$$,J.setAttribute("aria-label","Copy failed"),J.setAttribute("title","Copy failed"),J.classList.add("is-error"),J.classList.remove("is-success");else J.innerHTML=e6,J.setAttribute("aria-label","Copy code"),J.setAttribute("title","Copy code"),J.classList.remove("is-success","is-error")};return $.forEach((J)=>{let K=document.createElement("div");K.className="post-code-block",J.parentNode?.insertBefore(K,J),K.appendChild(J);let Y=document.createElement("button");Y.type="button",Y.className="post-code-copy-btn",j(Y,"idle"),K.appendChild(Y);let O=async(z)=>{z.preventDefault(),z.stopPropagation();let B=J.querySelector("code")?.textContent||"",k=await N$(B);j(Y,k?"success":"error");let D=N.get(Y);if(D)clearTimeout(D);let E=setTimeout(()=>{j(Y,"idle"),N.delete(Y)},t6);N.set(Y,E)};Y.addEventListener("click",O),Z.push(()=>{Y.removeEventListener("click",O);let z=N.get(Y);if(z)clearTimeout(z);if(K.parentNode)K.parentNode.insertBefore(J,K),K.remove()})}),()=>{Z.forEach((J)=>J())}}function J$(_){if(!_)return{content:_,fileRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Files:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,fileRefs:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z))j.push(z.replace(/^\s*-\s+/,"").trim());else if(!z.trim())break;else break}if(j.length===0)return{content:_,fileRefs:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,fileRefs:j}}function j$(_){if(!_)return{content:_,messageRefs:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Referenced messages:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,messageRefs:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z)){let B=z.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(B)j.push(B[1])}else if(!z.trim())break;else break}if(j.length===0)return{content:_,messageRefs:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,messageRefs:j}}function K$(_){if(!_)return{content:_,attachments:[]};let N=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),Z=-1;for(let z=0;z<N.length;z+=1)if(N[z].trim()==="Images:"&&N[z+1]&&/^\s*-\s+/.test(N[z+1])){Z=z;break}if(Z===-1)return{content:_,attachments:[]};let j=[],J=Z+1;for(;J<N.length;J+=1){let z=N[J];if(/^\s*-\s+/.test(z)){let V=z.replace(/^\s*-\s+/,"").trim(),B=V.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||V.match(/^attachment:([^\s]+)\s+(.+)$/i);if(B){let k=B[1],D=(B[2]||"").trim()||k;j.push({id:k,label:D,raw:V})}else j.push({id:null,label:V,raw:V})}else if(!z.trim())break;else break}if(j.length===0)return{content:_,attachments:[]};let K=N.slice(0,Z),Y=N.slice(J),O=[...K,...Y].join(`
`);return O=O.replace(/\n{3,}/g,`

`).trim(),{content:O,attachments:j}}function z$(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Y$(_,$){if(!_||!$)return _;let N=String($).trim().split(/\s+/).filter(Boolean);if(N.length===0)return _;let Z=N.map(z$).sort((V,B)=>B.length-V.length),j=new RegExp(`(${Z.join("|")})`,"gi"),J=new RegExp(`^(${Z.join("|")})$`,"i"),K=new DOMParser().parseFromString(_,"text/html"),Y=K.createTreeWalker(K.body,NodeFilter.SHOW_TEXT),O=[],z;while(z=Y.nextNode())O.push(z);for(let V of O){let B=V.nodeValue;if(!B||!j.test(B)){j.lastIndex=0;continue}j.lastIndex=0;let k=V.parentElement;if(k&&k.closest("code, pre, script, style"))continue;let D=B.split(j).filter((b)=>b!=="");if(D.length===0)continue;let E=K.createDocumentFragment();for(let b of D)if(J.test(b)){let m=K.createElement("mark");m.className="search-highlight-term",m.textContent=b,E.appendChild(m)}else E.appendChild(K.createTextNode(b));V.parentNode.replaceChild(E,V)}return K.body.innerHTML}function d8({post:_,onClick:$,onHashtagClick:N,onMessageRef:Z,onScrollToMessage:j,agentName:J,agentAvatarUrl:K,userName:Y,userAvatarUrl:O,userAvatarBackground:z,onDelete:V,isThreadReply:B,isThreadPrev:k,isThreadNext:D,isRemoving:E,highlightQuery:b,onFileRef:m}){let[A,Q]=f(null),w=H(null),M=_.data,T=M.type==="agent_response",i=Y||"You",o=T?J||u8:i,__=T?o3(J,K):o3(i,O),Y_=typeof z==="string"?z.trim().toLowerCase():"",a=!T&&__.image&&(Y_==="clear"||Y_==="transparent"),G_=T&&Boolean(__.image),F_=`background-color: ${a||G_?"transparent":__.color}`,d=M.content_meta,Z_=Boolean(d?.truncated),e=Boolean(d?.preview),s=Z_&&!e,N_=Z_?{originalLength:Number.isFinite(d?.original_length)?d.original_length:M.content?M.content.length:0,maxLength:Number.isFinite(d?.max_length)?d.max_length:0}:null,O_=a6(M.content,M.link_previews),{content:J_,fileRefs:Q_}=J$(O_),{content:X_,messageRefs:S_}=j$(J_),{content:t_,attachments:E_}=K$(X_);O_=t_;let r_=Boolean(O_)&&!s,A_=typeof b==="string"?b.trim():"",g_=j0(()=>{if(!O_)return"";let x=j2(O_,N);return A_?Y$(x,A_):x},[O_,A_]),j_=(x,$_)=>{x.stopPropagation(),Q(m0($_))},[B_,L_]=f(null),y_=(x)=>{L_(x)},q_=(x)=>{x.stopPropagation(),V?.(_)},f_=(x,$_)=>{let u_=new Set;if(!x||$_.length===0)return{content:x,usedIds:u_};return{content:x.replace(/attachment:([^\s)"']+)/g,(y0,O0,_0,e0)=>{let G0=O0.replace(/^\/+/,""),L0=$_.find((B0)=>B0.name&&B0.name.toLowerCase()===G0.toLowerCase()&&!u_.has(B0.id))||$_.find((B0)=>!u_.has(B0.id));if(!L0)return y0;if(u_.add(L0.id),e0.slice(Math.max(0,_0-2),_0)==="](")return`/media/${L0.id}`;return L0.name||"attachment"}),usedIds:u_}},T_=[],k_=[],V_=[],w_=[],C_=[],h_=[],x_=M.content_blocks||[],K0=M.media_ids||[],U_=0;if(x_.length>0)x_.forEach((x)=>{if(x?.type==="text"&&x.annotations)h_.push(x.annotations);if(x?.type==="resource_link")w_.push(x);else if(x?.type==="resource")C_.push(x);else if(x?.type==="file"){let $_=K0[U_++];if($_)k_.push($_),V_.push({id:$_,name:x?.name||x?.filename||x?.title})}else if(x?.type==="image"||!x?.type){let $_=K0[U_++];if($_){let u_=typeof x?.mime_type==="string"?x.mime_type:void 0;T_.push({id:$_,annotations:x?.annotations,mimeType:u_}),V_.push({id:$_,name:x?.name||x?.filename||x?.title})}}});else if(K0.length>0)K0.forEach((x)=>{T_.push({id:x,annotations:null}),V_.push({id:x,name:null})});if(E_.length>0)E_.forEach((x)=>{if(!x?.id)return;let $_=V_.find((u_)=>String(u_.id)===String(x.id));if($_&&!$_.name)$_.name=x.label});let{content:f0,usedIds:k0}=f_(O_,V_);O_=f0;let H0=T_.filter(({id:x})=>!k0.has(x)),N0=k_.filter((x)=>!k0.has(x)),e_=E_.length>0?E_.map((x,$_)=>({id:x.id||`attachment-${$_+1}`,label:x.label||`attachment-${$_+1}`})):V_.map((x,$_)=>({id:x.id,label:x.name||`attachment-${$_+1}`}));return R(()=>{if(!w.current)return;return E2(w.current),Z$(w.current)},[g_]),X`
        <div id=${`post-${_.id}`} class="post ${T?"agent-post":""} ${B?"thread-reply":""} ${k?"thread-prev":""} ${D?"thread-next":""} ${E?"removing":""}" onClick=${$}>
            <div class="post-avatar ${T?"agent-avatar":""} ${__.image?"has-image":""}" style=${F_}>
                ${__.image?X`<img src=${__.image} alt=${o} />`:__.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${q_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${o}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(x)=>{if(x.preventDefault(),x.stopPropagation(),Z)Z(_.id)}}>${i8(_.timestamp)}</a>
                </div>
                ${s&&N_&&X`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${u2(N_.originalLength)} chars
                            ${N_.maxLength?X` • Display limit: ${u2(N_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${e&&N_&&X`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${u2(N_.maxLength)} of ${u2(N_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(Q_.length>0||S_.length>0||e_.length>0)&&X`
                    <div class="post-file-refs">
                        ${S_.map((x)=>{let $_=(u_)=>{if(u_.preventDefault(),u_.stopPropagation(),j)j(x);else{let Y0=document.getElementById("post-"+x);if(Y0)Y0.scrollIntoView({behavior:"smooth",block:"center"}),Y0.classList.add("post-highlight"),setTimeout(()=>Y0.classList.remove("post-highlight"),2000)}};return X`
                                <a href=${`#msg-${x}`} class="post-msg-pill-link" onClick=${$_}>
                                    <${a0}
                                        prefix="post"
                                        label=${"msg:"+x}
                                        title=${"Message "+x}
                                        icon="message"
                                        onClick=${$_}
                                    />
                                </a>
                            `})}
                        ${Q_.map((x)=>{let $_=x.split("/").pop()||x;return X`
                                <${a0}
                                    prefix="post"
                                    label=${$_}
                                    title=${x}
                                    onClick=${()=>m?.(x)}
                                />
                            `})}
                        ${e_.map((x)=>X`
                            <${l6}
                                key=${x.id}
                                attachment=${x}
                                onPreview=${y_}
                            />
                        `)}
                    </div>
                `}
                ${r_&&X`
                    <div 
                        ref=${w}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:g_}}
                        onClick=${(x)=>{if(x.target.classList.contains("hashtag")){x.preventDefault(),x.stopPropagation();let $_=x.target.dataset.hashtag;if($_)N?.($_)}else if(x.target.tagName==="IMG")x.preventDefault(),x.stopPropagation(),Q(x.target.src)}}
                    />
                `}
                ${h_.length>0&&X`
                    ${h_.map((x,$_)=>X`
                        <${O3} key=${$_} annotations=${x} />
                    `)}
                `}
                ${H0.length>0&&X`
                    <div class="media-preview">
                        ${H0.map(({id:x,mimeType:$_})=>{let Y0=typeof $_==="string"&&$_.toLowerCase().startsWith("image/svg")?m0(x):K8(x);return X`
                                <img 
                                    key=${x} 
                                    src=${Y0} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(y0)=>j_(y0,x)}
                                />
                            `})}
                    </div>
                `}
                ${H0.length>0&&X`
                    ${H0.map(({annotations:x},$_)=>X`
                        ${x&&X`<${O3} key=${$_} annotations=${x} />`}
                    `)}
                `}
                ${N0.length>0&&X`
                    <div class="file-attachments">
                        ${N0.map((x)=>X`
                            <${n6} key=${x} mediaId=${x} onPreview=${y_} />
                        `)}
                    </div>
                `}
                ${w_.length>0&&X`
                    <div class="resource-links">
                        ${w_.map((x,$_)=>X`
                            <div key=${$_}>
                                <${o6} block=${x} />
                                <${O3} annotations=${x.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${C_.length>0&&X`
                    <div class="resource-embeds">
                        ${C_.map((x,$_)=>X`
                            <div key=${$_}>
                                <${r6} block=${x} />
                                <${O3} annotations=${x.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M.link_previews?.length>0&&X`
                    <div class="link-previews">
                        ${M.link_previews.map((x,$_)=>X`
                            <${s6} key=${$_} preview=${x} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${A&&X`<${r8} src=${A} onClose=${()=>Q(null)} />`}
        ${B_&&X`
            <${o8}
                mediaId=${B_.mediaId}
                info=${B_.info}
                onClose=${()=>L_(null)}
            />
        `}
    `}function s8({posts:_,hasMore:$,onLoadMore:N,onPostClick:Z,onHashtagClick:j,onMessageRef:J,onScrollToMessage:K,onFileRef:Y,emptyMessage:O,timelineRef:z,agents:V,user:B,onDeletePost:k,reverse:D=!0,removingPostIds:E,searchQuery:b}){let[m,A]=f(!1),Q=H(null),w=typeof IntersectionObserver<"u",M=S(async()=>{if(!N||!$||m)return;A(!0);try{await N({preserveScroll:!0,preserveMode:"top"})}finally{A(!1)}},[$,m,N]),T=S((d)=>{let{scrollTop:Z_,scrollHeight:e,clientHeight:s}=d.target,N_=D?e-s-Z_:Z_,O_=Math.max(300,s);if(N_<O_)M()},[D,M]);R(()=>{if(!w)return;let d=Q.current,Z_=z?.current;if(!d||!Z_)return;let e=300,s=new IntersectionObserver((N_)=>{for(let O_ of N_){if(!O_.isIntersecting)continue;M()}},{root:Z_,rootMargin:`${e}px 0px ${e}px 0px`,threshold:0});return s.observe(d),()=>s.disconnect()},[w,$,N,z,M]);let i=H(M);if(i.current=M,R(()=>{if(w)return;if(!z?.current)return;let{scrollTop:d,scrollHeight:Z_,clientHeight:e}=z.current,s=D?Z_-e-d:d,N_=Math.max(300,e);if(s<N_)i.current?.()},[w,_,$,D,z]),R(()=>{if(!z?.current)return;if(!$||m)return;let{scrollTop:d,scrollHeight:Z_,clientHeight:e}=z.current,s=D?Z_-e-d:d,N_=Math.max(300,e);if(Z_<=e+1||s<N_)i.current?.()},[_,$,m,D,z]),!_)return X`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return X`
            <div class="timeline" ref=${z}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${O||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let o=_.slice().sort((d,Z_)=>d.id-Z_.id),__=(d)=>{let Z_=d?.data?.thread_id;if(Z_===null||Z_===void 0||Z_==="")return null;let e=Number(Z_);return Number.isFinite(e)?e:null},Y_=new Map;for(let d=0;d<o.length;d+=1){let Z_=o[d],e=Number(Z_?.id),s=__(Z_);if(s!==null){let N_=Y_.get(s)||{anchorIndex:-1,replyIndexes:[]};N_.replyIndexes.push(d),Y_.set(s,N_)}else if(Number.isFinite(e)){let N_=Y_.get(e)||{anchorIndex:-1,replyIndexes:[]};N_.anchorIndex=d,Y_.set(e,N_)}}let a=new Map;for(let[d,Z_]of Y_.entries()){let e=new Set;if(Z_.anchorIndex>=0)e.add(Z_.anchorIndex);for(let s of Z_.replyIndexes)e.add(s);a.set(d,Array.from(e).sort((s,N_)=>s-N_))}let G_=o.map((d,Z_)=>{let e=__(d);if(e===null)return{hasThreadPrev:!1,hasThreadNext:!1};let s=a.get(e);if(!s||s.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let N_=s.indexOf(Z_);if(N_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:N_>0,hasThreadNext:N_<s.length-1}}),F_=X`<div class="timeline-sentinel" ref=${Q}></div>`;return X`
        <div class="timeline ${D?"reverse":"normal"}" ref=${z} onScroll=${T}>
            <div class="timeline-content">
                ${D?F_:null}
                ${o.map((d,Z_)=>{let e=Boolean(d.data?.thread_id&&d.data.thread_id!==d.id),s=E?.has?.(d.id),N_=G_[Z_]||{};return X`
                    <${d8}
                        key=${d.id}
                        post=${d}
                        isThreadReply=${e}
                        isThreadPrev=${N_.hasThreadPrev}
                        isThreadNext=${N_.hasThreadNext}
                        isRemoving=${s}
                        highlightQuery=${b}
                        agentName=${c8(d.data?.agent_id,V||{})}
                        agentAvatarUrl=${v8(d.data?.agent_id,V||{})}
                        userName=${B?.name||B?.user_name}
                        userAvatarUrl=${B?.avatar_url||B?.avatarUrl||B?.avatar}
                        userAvatarBackground=${B?.avatar_background||B?.avatarBackground}
                        onClick=${()=>Z?.(d)}
                        onHashtagClick=${j}
                        onMessageRef=${J}
                        onScrollToMessage=${K}
                        onFileRef=${Y}
                        onDelete=${k}
                    />
                `})}
                ${D?null:F_}
            </div>
        </div>
    `}class a8{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,N=-1/0;for(let Z of this.extensions.values()){if(Z.placement!=="tabs")continue;if(!Z.canHandle)continue;try{let j=Z.canHandle(_);if(j===!1||j===0)continue;let J=j===!0?0:typeof j==="number"?j:0;if(J>N)N=J,$=Z}catch(j){console.warn(`[PaneRegistry] canHandle() error for "${Z.id}":`,j)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var a_=new a8;var G3=null,r3=null;function t8(){if(r3)return Promise.resolve(r3);if(!G3)G3=import("/static/dist/editor.bundle.js").then((_)=>{return r3=_,_}).catch((_)=>{throw G3=null,_});return G3}class e8{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await t8();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){this.queuedViewStateCb=_,this.real?.onViewStateChange?.(_)}restoreViewState(_){this.queuedViewState=_,this.real?.restoreViewState?.(_)}getPath(){return this.real?.getPath?.()??this.context.path??""}setPath(_){this.real?.setPath?.(_)}}var d3={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new e8(_,$)}};function s3(){t8().catch(()=>{})}var O$={yellow:"#9a6700",magenta:"#8250df",cyan:"#1b7c83",brightBlack:"#57606a",brightRed:"#cf222e",brightGreen:"#1a7f37",brightYellow:"#bf8700",brightBlue:"#0550ae",brightMagenta:"#6f42c1",brightCyan:"#0a7b83"},G$={yellow:"#d29922",magenta:"#bc8cff",cyan:"#39c5cf",brightBlack:"#8b949e",brightRed:"#ff7b72",brightGreen:"#7ee787",brightYellow:"#e3b341",brightBlue:"#79c0ff",brightMagenta:"#d2a8ff",brightCyan:"#56d4dd"},L3=null,a3=null;function L$(_){if(!_)return!1;return _.startsWith("data:application/wasm")||/(^|\/)ghostty-vt\.wasm(?:[?#].*)?$/.test(_)}async function B$(_){let $=globalThis.fetch?.bind(globalThis);if(!$)return await _();let N=new URL("/static/js/vendor/ghostty-vt.wasm",window.location.origin).href,Z=(j,J)=>{let K=j instanceof Request?j.url:j instanceof URL?j.href:String(j);if(!L$(K))return $(j,J);if(j instanceof Request)return $(new Request(N,j));return $(N,J)};globalThis.fetch=Z;try{return await _()}finally{globalThis.fetch=$}}async function q$(){let $=await import(new URL("/static/js/vendor/ghostty-web.js",window.location.origin).href);if(!L3)L3=B$(()=>Promise.resolve($.init?.())).catch((N)=>{throw L3=null,N});return await L3,$}async function V$(){if(typeof document>"u"||!("fonts"in document)||!document.fonts)return;if(!a3)a3=Promise.allSettled([document.fonts.load('400 13px "FiraCode Nerd Font Mono"'),document.fonts.load('700 13px "FiraCode Nerd Font Mono"'),document.fonts.ready]).then(()=>{return}).catch(()=>{return});await a3}async function X$(){let _=await fetch("/terminal/session",{method:"GET",credentials:"same-origin"}),$=await _.json().catch(()=>({}));if(!_.ok)throw Error($?.error||`HTTP ${_.status}`);return $}function Q$(_){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${_}`}function W$(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function t0(_,$=""){if(typeof document>"u")return $;return getComputedStyle(document.documentElement).getPropertyValue(_)?.trim()||$}function U$(_,$){if(!_||!_.startsWith("#"))return _;let N=_.slice(1);if(N.length===3)return`#${N[0]}${N[0]}${N[1]}${N[1]}${N[2]}${N[2]}${$}`;if(N.length===6)return`#${N}${$}`;return _}function _1(){let _=W$(),$=_?G$:O$,N=t0("--bg-primary",_?"#000000":"#ffffff"),Z=t0("--text-primary",_?"#e7e9ea":"#0f1419"),j=t0("--text-secondary",_?"#71767b":"#536471"),J=t0("--accent-color","#1d9bf0"),K=t0("--danger-color",_?"#ff7b72":"#cf222e"),Y=t0("--success-color",_?"#7ee787":"#1a7f37"),O=t0("--bg-hover",_?"#1d1f23":"#e8ebed"),z=t0("--border-color",_?"#2f3336":"#eff3f4"),V=t0("--accent-soft-strong",U$(J,_?"47":"33"));return{background:N,foreground:Z,cursor:J,cursorAccent:N,selectionBackground:V,selectionForeground:Z,black:O,red:K,green:Y,yellow:$.yellow,blue:J,magenta:$.magenta,cyan:$.cyan,white:Z,brightBlack:$.brightBlack,brightRed:$.brightRed,brightGreen:$.brightGreen,brightYellow:$.brightYellow,brightBlue:$.brightBlue,brightMagenta:$.brightMagenta,brightCyan:$.brightCyan,brightWhite:z}}class $1{container;disposed=!1;termEl;bodyEl;statusEl;terminal=null;fitAddon=null;socket=null;themeObserver=null;themeChangeListener=null;mediaQuery=null;mediaQueryListener=null;resizeObserver=null;dockResizeListener=null;windowResizeListener=null;resizeFrame=0;lastAppliedThemeSignature=null;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0"),this.statusEl=document.createElement("span"),this.statusEl.className="terminal-pane-status",this.statusEl.textContent="Loading terminal…",this.bodyEl=document.createElement("div"),this.bodyEl.className="terminal-pane-body",this.bodyEl.innerHTML='<div class="terminal-placeholder">Bootstrapping ghostty-web…</div>',this.termEl.append(this.bodyEl),_.appendChild(this.termEl),this.bootstrapGhostty()}setStatus(_){this.statusEl.textContent=_,this.termEl.dataset.connectionStatus=_,this.termEl.setAttribute("aria-label",`Terminal ${_}`)}scheduleResize(){if(this.disposed)return;if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame);this.resizeFrame=requestAnimationFrame(()=>{this.resizeFrame=0,this.resize()})}async bootstrapGhostty(){try{let _=await q$();if(await V$(),this.disposed)return;this.bodyEl.innerHTML="";let $=document.createElement("div");$.className="terminal-live-host",this.bodyEl.appendChild($);let N=new _.Terminal({cols:120,rows:30,cursorBlink:!0,fontFamily:'FiraCode Nerd Font Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',fontSize:13,theme:_1()}),Z=null;if(typeof _.FitAddon==="function")Z=new _.FitAddon,N.loadAddon?.(Z);await N.open($),N.loadFonts?.(),Z?.observeResize?.(),this.terminal=N,this.fitAddon=Z,this.installThemeSync(),this.installResizeSync(),this.scheduleResize(),await this.connectBackend()}catch(_){if(console.error("[terminal-pane] Failed to bootstrap ghostty-web:",_),this.disposed)return;this.bodyEl.innerHTML='<div class="terminal-placeholder">Terminal failed to load. Check vendored assets and backend wiring.</div>',this.setStatus("Load failed")}}applyTheme(){if(!this.terminal)return;let _=_1(),$=JSON.stringify(_),N=this.lastAppliedThemeSignature!==null&&this.lastAppliedThemeSignature!==$;try{this.termEl.style.backgroundColor=_.background,this.bodyEl.style.backgroundColor=_.background;let Z=this.bodyEl.querySelector(".terminal-live-host");if(Z instanceof HTMLElement)Z.style.backgroundColor=_.background,Z.style.color=_.foreground;let j=this.bodyEl.querySelector("canvas");if(j instanceof HTMLElement)j.style.backgroundColor=_.background,j.style.color=_.foreground}catch{}try{if(this.terminal.options)this.terminal.options.theme=_}catch{}try{if(N&&this.terminal.reset)this.terminal.reset()}catch{}try{this.terminal.renderer?.setTheme?.(_),this.terminal.renderer?.clear?.()}catch{}try{this.terminal.loadFonts?.()}catch{}try{this.terminal.renderer?.remeasureFont?.()}catch{}try{if(this.terminal.wasmTerm&&this.terminal.renderer?.render)this.terminal.renderer.render(this.terminal.wasmTerm,!0,this.terminal.viewportY||0,this.terminal),this.terminal.renderer.render(this.terminal.wasmTerm,!1,this.terminal.viewportY||0,this.terminal)}catch{}try{this.resize()}catch{}try{if(N&&this.socket?.readyState===WebSocket.OPEN)this.socket.send(JSON.stringify({type:"input",data:"\f"}))}catch{}try{this.terminal.refresh?.()}catch{}this.lastAppliedThemeSignature=$}installThemeSync(){if(typeof window>"u"||typeof document>"u")return;let _=()=>requestAnimationFrame(()=>this.applyTheme());_();let $=()=>_();window.addEventListener("piclaw-theme-change",$),this.themeChangeListener=$;let N=window.matchMedia?.("(prefers-color-scheme: dark)"),Z=()=>_();if(N?.addEventListener)N.addEventListener("change",Z);else if(N?.addListener)N.addListener(Z);this.mediaQuery=N,this.mediaQueryListener=Z;let j=typeof MutationObserver<"u"?new MutationObserver(()=>_()):null;if(j?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]}),document.body)j?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});this.themeObserver=j}installResizeSync(){if(typeof window>"u")return;let _=()=>this.scheduleResize(),$=()=>this.scheduleResize();if(window.addEventListener("dock-resize",_),window.addEventListener("resize",$),this.dockResizeListener=_,this.windowResizeListener=$,typeof ResizeObserver<"u"){let N=new ResizeObserver(()=>this.scheduleResize());N.observe(this.container),N.observe(this.bodyEl),this.resizeObserver=N}}async connectBackend(){let _=this.terminal;if(!_)return;try{let $=await X$();if(this.disposed)return;if(!$?.enabled){_.write?.(`Terminal backend unavailable: ${$?.error||"disabled"}\r
`),this.setStatus("Unavailable");return}let N=new WebSocket(Q$($.ws_path||"/terminal/ws"));this.socket=N,this.setStatus("Connecting…"),_.onData?.((Z)=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"input",data:Z}))}),_.onResize?.(({cols:Z,rows:j})=>{if(N.readyState===WebSocket.OPEN)N.send(JSON.stringify({type:"resize",cols:Z,rows:j}))}),N.addEventListener("open",()=>{if(this.disposed)return;this.setStatus("Connected"),this.scheduleResize()}),N.addEventListener("message",(Z)=>{if(this.disposed)return;let j=null;try{j=JSON.parse(String(Z.data))}catch{j={type:"output",data:String(Z.data)}}if(j?.type==="output"&&typeof j.data==="string"){_.write?.(j.data);return}if(j?.type==="exit")_.write?.(`\r
[terminal exited]\r
`),this.setStatus("Exited")}),N.addEventListener("close",()=>{if(this.disposed)return;this.setStatus("Disconnected")}),N.addEventListener("error",()=>{if(this.disposed)return;this.setStatus("Connection error")})}catch($){_.write?.(`Terminal backend unavailable: ${$ instanceof Error?$.message:String($)}\r
`),this.setStatus("Unavailable")}}sendResize(){if(!this.socket||this.socket.readyState!==WebSocket.OPEN||!this.fitAddon?.proposeDimensions)return;let _=this.fitAddon.proposeDimensions();if(!_)return;this.socket.send(JSON.stringify({type:"resize",cols:_.cols,rows:_.rows}))}getContent(){return}isDirty(){return!1}focus(){if(this.terminal?.focus){this.terminal.focus();return}this.termEl?.focus()}resize(){try{this.terminal?.renderer?.remeasureFont?.()}catch{}try{this.fitAddon?.fit?.()}catch{}try{this.terminal?.refresh?.()}catch{}this.sendResize()}dispose(){if(this.disposed)return;this.disposed=!0;try{if(this.resizeFrame)cancelAnimationFrame(this.resizeFrame),this.resizeFrame=0}catch{}try{if(this.themeChangeListener)window.removeEventListener("piclaw-theme-change",this.themeChangeListener)}catch{}try{if(this.mediaQuery&&this.mediaQueryListener){if(this.mediaQuery.removeEventListener)this.mediaQuery.removeEventListener("change",this.mediaQueryListener);else if(this.mediaQuery.removeListener)this.mediaQuery.removeListener(this.mediaQueryListener)}}catch{}try{if(this.dockResizeListener)window.removeEventListener("dock-resize",this.dockResizeListener);if(this.windowResizeListener)window.removeEventListener("resize",this.windowResizeListener)}catch{}try{this.themeObserver?.disconnect?.()}catch{}try{this.resizeObserver?.disconnect?.()}catch{}try{this.socket?.close?.()}catch{}try{this.fitAddon?.dispose?.()}catch{}try{this.terminal?.dispose?.()}catch{}this.termEl?.remove()}}var t3={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new $1(_,$)}};function K2(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function F$(_,$){let N=String(_||"").trim();if(!N)return N;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(N)||N.startsWith("#")||N.startsWith("data:")||N.startsWith("blob:"))return N;let Z=N.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),j=Z?.[1]||N,J=Z?.[2]||"",K=Z?.[3]||"",Y=String($||"").split("/").slice(0,-1).join("/"),z=j.startsWith("/")?j:`${Y?`${Y}/`:""}${j}`,V=[];for(let k of z.split("/")){if(!k||k===".")continue;if(k===".."){if(V.length>0)V.pop();continue}V.push(k)}let B=V.join("/");return`${R3(B)}${J}${K}`}function v2(_){return _?.preview||null}function H$(_){let $=String(_||""),N=Math.max($.lastIndexOf("/"),$.lastIndexOf("\\")),Z=N>=0?$.slice(N+1):$,j=Z.lastIndexOf(".");if(j<=0||j===Z.length-1)return"none";return Z.slice(j+1)}function y$(_){if(!_)return"unknown";if(_.kind==="image")return"image";if(_.kind==="text")return _.content_type==="text/markdown"?"markdown":"text";if(_.kind==="binary")return"binary";return String(_.kind||"unknown")}function D$(_,$){let N=$?.path||_?.path||"",Z=[];if($?.content_type)Z.push(`<span><strong>type:</strong> ${K2($.content_type)}</span>`);if(typeof $?.size==="number")Z.push(`<span><strong>size:</strong> ${K2(T0($.size))}</span>`);if($?.mtime)Z.push(`<span><strong>modified:</strong> ${K2(A2($.mtime))}</span>`);if(Z.push(`<span><strong>kind:</strong> ${K2(y$($))}</span>`),Z.push(`<span><strong>extension:</strong> ${K2(H$(N))}</span>`),N)Z.push(`<span><strong>path:</strong> ${K2(N)}</span>`);if($?.truncated)Z.push("<span><strong>content:</strong> truncated</span>");return`<div class="workspace-preview-meta workspace-preview-meta-inline">${Z.join("")}</div>`}function k$(_){let $=v2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';let N=D$(_,$);if($.kind==="image"){let Z=$.url||($.path?R3($.path):"");return`${N}
            <div class="workspace-preview-image">
                <img src="${K2(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown"){let Z=j2($.text||"",null,{rewriteImageSrc:(j)=>F$(j,$.path||_?.path)});return`${N}<div class="workspace-preview-text">${Z}</div>`}return`${N}<pre class="workspace-preview-text"><code>${K2($.text||"")}</code></pre>`}if($.kind==="binary")return`${N}<div class="workspace-preview-text">Binary file — download to view.</div>`;return`${N}<div class="workspace-preview-text">No preview available.</div>`}class e3{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=k$(this.context)}getContent(){let _=v2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let N=v2(this.context);if(N&&N.kind==="text"){if(N.text=_,$!==void 0)N.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var _4={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=v2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new e3(_,$)}},$4={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return v2(_)||_?.path?1:!1},mount(_,$){return new e3(_,$)}};class N1{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let N of this.listeners)try{N(_,$)}catch{}}open(_,$){let N=this.tabs.get(_);if(!N)N={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,N);return this.activate(_),N}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,N]of this.tabs)if($!==_&&!N.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((Z)=>Z!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((N)=>N!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let N=this.tabs.get(_);if(!N||N.dirty===$)return;N.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let N=this.tabs.get(_);if(N)N.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,N){let Z=this.tabs.get(_);if(!Z)return;if(this.tabs.delete(_),Z.id=$,Z.path=$,Z.label=N||$.split("/").pop()||$,this.tabs.set($,Z),this.mruOrder=this.mruOrder.map((j)=>j===_?$:j),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($+1)%_.length];this.activate(N.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((Z)=>Z.id===this.activeId),N=_[($-1+_.length)%_.length];this.activate(N.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var D_=new N1;var B3="workspaceExplorerScale",C$=["compact","default","comfortable"],b$=new Set(C$),E$={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function Z1(_,$="default"){if(typeof _!=="string")return $;let N=_.trim().toLowerCase();return b$.has(N)?N:$}function N4(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),N=Boolean(window.matchMedia?.("(hover: none)")?.matches),Z=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||Z&&N}}function A$(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function w$(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function Z4(_={}){let $=A$(_),N=_.stored?Z1(_.stored,$):$;return w$(N,_)}function J1(_){return E$[Z1(_)]}var M$=60000,Y1=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function O1(_,$,N,Z=0,j=[]){if(!N&&Y1(_))return j;if(!_)return j;if(j.push({node:_,depth:Z}),_.type==="dir"&&_.children&&$.has(_.path))for(let J of _.children)O1(J,$,N,Z+1,j);return j}function j1(_,$,N){if(!_)return"";let Z=[],j=(J)=>{if(!N&&Y1(J))return;if(Z.push(J.type==="dir"?`d:${J.path}`:`f:${J.path}`),J.children&&$?.has(J.path))for(let K of J.children)j(K)};return j(_),Z.join("|")}function z4(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let N=Array.isArray(_.children)?_.children:null,Z=Array.isArray($.children)?$.children:null;if(!Z)return _;let j=N?new Map(N.map((Y)=>[Y?.path,Y])):new Map,J=!N||N.length!==Z.length,K=Z.map((Y)=>{let O=z4(j.get(Y.path),Y);if(O!==j.get(Y.path))J=!0;return O});return J?{...$,children:K}:_}function j4(_,$,N){if(!_)return _;if(_.path===$)return z4(_,N);if(!Array.isArray(_.children))return _;let Z=!1,j=_.children.map((J)=>{let K=j4(J,$,N);if(K!==J)Z=!0;return K});return Z?{..._,children:j}:_}var G1=4,J4=14,P$=8,S$=16;function L1(_){if(!_)return 0;if(_.type==="file"){let Z=Math.max(0,Number(_.size)||0);return _.__bytes=Z,Z}let $=Array.isArray(_.children)?_.children:[],N=0;for(let Z of $)N+=L1(Z);return _.__bytes=N,N}function B1(_,$=0){let N=Math.max(0,Number(_?.__bytes??_?.size??0)),Z={name:_?.name||_?.path||".",path:_?.path||".",size:N,children:[]};if(!_||_.type!=="dir"||$>=G1)return Z;let j=Array.isArray(_.children)?_.children:[],J=[];for(let Y of j){let O=Math.max(0,Number(Y?.__bytes??Y?.size??0));if(O<=0)continue;if(Y.type==="dir")J.push({kind:"dir",node:Y,size:O});else J.push({kind:"file",name:Y.name,path:Y.path,size:O})}J.sort((Y,O)=>O.size-Y.size);let K=J;if(J.length>J4){let Y=J.slice(0,J4-1),O=J.slice(J4-1),z=O.reduce((V,B)=>V+B.size,0);Y.push({kind:"other",name:`+${O.length} more`,path:`${Z.path}/[other]`,size:z}),K=Y}return Z.children=K.map((Y)=>{if(Y.kind==="dir")return B1(Y.node,$+1);return{name:Y.name,path:Y.path,size:Y.size,children:[]}}),Z}function K1(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,N=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(N==="dark")return!0;if(N==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function q1(_,$,N){let Z=((_+Math.PI/2)*180/Math.PI+360)%360,j=N?Math.max(30,70-$*10):Math.max(34,66-$*8),J=N?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${Z.toFixed(1)} ${j}% ${J}%)`}function q3(_,$,N,Z){return{x:_+N*Math.cos(Z),y:$+N*Math.sin(Z)}}function Y4(_,$,N,Z,j,J){let K=Math.PI*2-0.0001,Y=J-j>K?j+K:J,O=q3(_,$,Z,j),z=q3(_,$,Z,Y),V=q3(_,$,N,Y),B=q3(_,$,N,j),k=Y-j>Math.PI?1:0;return[`M ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${k} 1 ${z.x.toFixed(3)} ${z.y.toFixed(3)}`,`L ${V.x.toFixed(3)} ${V.y.toFixed(3)}`,`A ${N} ${N} 0 ${k} 0 ${B.x.toFixed(3)} ${B.y.toFixed(3)}`,"Z"].join(" ")}var V1={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function X1(_,$,N){let Z=[],j=[],J=Math.max(0,Number($)||0),K=(Y,O,z,V)=>{let B=Array.isArray(Y?.children)?Y.children:[];if(!B.length)return;let k=Math.max(0,Number(Y.size)||0);if(k<=0)return;let D=z-O,E=O;B.forEach((b,m)=>{let A=Math.max(0,Number(b.size)||0);if(A<=0)return;let Q=A/k,w=E,M=m===B.length-1?z:E+D*Q;if(E=M,M-w<0.003)return;let T=V1[V];if(T){let i=q1(w,V,N);if(Z.push({key:b.path,path:b.path,label:b.name,size:A,color:i,depth:V,startAngle:w,endAngle:M,innerRadius:T[0],outerRadius:T[1],d:Y4(120,120,T[0],T[1],w,M)}),V===1)j.push({key:b.path,name:b.name,size:A,pct:J>0?A/J*100:0,color:i})}if(V<G1)K(b,w,M,V+1)})};return K(_,-Math.PI/2,Math.PI*3/2,1),{segments:Z,legend:j}}function K4(_,$){if(!_||!$)return null;if(_.path===$)return _;let N=Array.isArray(_.children)?_.children:[];for(let Z of N){let j=K4(Z,$);if(j)return j}return null}function Q1(_,$,N,Z){if(!N||N<=0)return{segments:[],legend:[]};let j=V1[1];if(!j)return{segments:[],legend:[]};let J=-Math.PI/2,K=Math.PI*3/2,Y=q1(J,1,Z),z=`${$||"."}/[files]`;return{segments:[{key:z,path:z,label:_,size:N,color:Y,depth:1,startAngle:J,endAngle:K,innerRadius:j[0],outerRadius:j[1],d:Y4(120,120,j[0],j[1],J,K)}],legend:[{key:z,name:_,size:N,pct:100,color:Y}]}}function z1(_,$=!1,N=!1){if(!_)return null;let Z=L1(_),j=B1(_,0),J=j.size||Z,{segments:K,legend:Y}=X1(j,J,N);if(!K.length&&J>0){let O=Q1("[files]",j.path,J,N);K=O.segments,Y=O.legend}return{root:j,totalSize:J,segments:K,legend:Y,truncated:$,isDarkTheme:N}}function x$({payload:_}){if(!_)return null;let[$,N]=f(null),[Z,j]=f(_?.root?.path||"."),[J,K]=f(()=>[_?.root?.path||"."]),[Y,O]=f(!1);R(()=>{let a=_?.root?.path||".";j(a),K([a]),N(null)},[_?.root?.path,_?.totalSize]),R(()=>{if(!Z)return;O(!0);let a=setTimeout(()=>O(!1),180);return()=>clearTimeout(a)},[Z]);let z=j0(()=>{return K4(_.root,Z)||_.root},[_?.root,Z]),V=z?.size||_.totalSize||0,{segments:B,legend:k}=j0(()=>{let a=X1(z,V,_.isDarkTheme);if(a.segments.length>0)return a;if(V<=0)return a;let G_=z?.children?.length?"Total":"[files]";return Q1(G_,z?.path||_?.root?.path||".",V,_.isDarkTheme)},[z,V,_.isDarkTheme,_?.root?.path]),[D,E]=f(B),b=H(new Map),m=H(0);R(()=>{let a=b.current,G_=new Map(B.map((e)=>[e.key,e])),F_=performance.now(),d=220,Z_=(e)=>{let s=Math.min(1,(e-F_)/220),N_=s*(2-s),O_=B.map((J_)=>{let X_=a.get(J_.key)||{startAngle:J_.startAngle,endAngle:J_.startAngle,innerRadius:J_.innerRadius,outerRadius:J_.innerRadius},S_=(g_,j_)=>g_+(j_-g_)*N_,t_=S_(X_.startAngle,J_.startAngle),E_=S_(X_.endAngle,J_.endAngle),r_=S_(X_.innerRadius,J_.innerRadius),A_=S_(X_.outerRadius,J_.outerRadius);return{...J_,d:Y4(120,120,r_,A_,t_,E_)}});if(E(O_),s<1)m.current=requestAnimationFrame(Z_)};if(m.current)cancelAnimationFrame(m.current);return m.current=requestAnimationFrame(Z_),b.current=G_,()=>{if(m.current)cancelAnimationFrame(m.current)}},[B]);let A=D.length?D:B,Q=V>0?T0(V):"0 B",w=z?.name||"",T=(w&&w!=="."?w:"Total")||"Total",i=Q,o=J.length>1,__=(a)=>{if(!a?.path)return;let G_=K4(_.root,a.path);if(!G_||!Array.isArray(G_.children)||G_.children.length===0)return;K((F_)=>[...F_,G_.path]),j(G_.path),N(null)},Y_=()=>{if(!o)return;K((a)=>{let G_=a.slice(0,-1);return j(G_[G_.length-1]||_?.root?.path||"."),G_}),N(null)};return X`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${Y?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${z?.path||_?.root?.path||"."}`}
                data-segments=${A.length}
                data-base-size=${V}>
                ${A.map((a)=>X`
                    <path
                        key=${a.key}
                        d=${a.d}
                        fill=${a.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===a.key?" is-hovered":""}`}
                        onMouseEnter=${()=>N(a)}
                        onMouseLeave=${()=>N(null)}
                        onTouchStart=${()=>N(a)}
                        onTouchEnd=${()=>N(null)}
                        onClick=${()=>__(a)}
                    >
                        <title>${a.label} — ${T0(a.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${o?" is-drill":""}`}
                    onClick=${Y_}
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
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${i}</text>
                </g>
            </svg>
            ${k.length>0&&X`
                <div class="workspace-folder-starburst-legend">
                    ${k.slice(0,8).map((a)=>X`
                        <div key=${a.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${a.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${a.name}>${a.name}</span>
                            <span class="workspace-folder-starburst-size">${T0(a.size)}</span>
                            <span class="workspace-folder-starburst-pct">${a.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&X`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function T$({mediaId:_}){let[$,N]=f(null);if(R(()=>{if(!_)return;I2(_).then(N).catch(()=>{})},[_]),!$)return null;let Z=$.filename||"file",j=$.metadata?.size?T0($.metadata.size):"";return X`
        <a href=${m0(_)} download=${Z} class="file-attachment"
            onClick=${(J)=>J.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${Z}</span>
                ${j&&X`<span class="file-size">${j}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function W1({onFileSelect:_,visible:$=!0,active:N=void 0,onOpenEditor:Z}){let[j,J]=f(null),[K,Y]=f(new Set(["."])),[O,z]=f(null),[V,B]=f(null),[k,D]=f(""),[E,b]=f(null),[m,A]=f(null),[Q,w]=f(!0),[M,T]=f(!1),[i,o]=f(null),[__,Y_]=f(()=>D2("workspaceShowHidden",!1)),[a,G_]=f(!1),[F_,d]=f(null),[Z_,e]=f(null),[s,N_]=f(null),[O_,J_]=f(!1),[Q_,X_]=f(null),[S_,t_]=f(()=>K1()),[E_,r_]=f(()=>Z4({stored:R0(B3),...N4()})),A_=H(K),g_=H(""),j_=H(null),B_=H(0),L_=H(new Set),y_=H(null),q_=H(new Map),f_=H(_),T_=H(Z),k_=H(null),V_=H(null),w_=H(null),C_=H(null),h_=H(null),x_=H(null),K0=H("."),U_=H(null),f0=H({path:null,dragging:!1,startX:0,startY:0}),k0=H({path:null,dragging:!1,startX:0,startY:0}),H0=H({path:null,timer:0}),N0=H(!1),e_=H(0),x=H(new Map),$_=H(null),u_=H(null),Y0=H(null),y0=H(null),O0=H(__),_0=H($),e0=H(N??$),G0=H(0),c_=H(s),L0=H(a),p_=H(F_),B0=H(null),g0=H({x:0,y:0}),D0=H(0),z2=H(null),C0=H(O),u0=H(V),c0=H(null),q0=H(null),h0=H(E);f_.current=_,T_.current=Z,R(()=>{A_.current=K},[K]),R(()=>{O0.current=__},[__]),R(()=>{_0.current=$},[$]),R(()=>{e0.current=N??$},[N,$]),R(()=>{c_.current=s},[s]),R(()=>{if(typeof window>"u")return;let L=()=>{r_(Z4({stored:R0(B3),...N4()}))};L();let W=()=>L(),F=()=>L(),C=(g)=>{if(!g||g.key===null||g.key===B3)L()};window.addEventListener("resize",W),window.addEventListener("focus",F),window.addEventListener("storage",C);let v=window.matchMedia?.("(pointer: coarse)"),r=window.matchMedia?.("(hover: none)"),l=(g,K_)=>{if(!g)return;if(g.addEventListener)g.addEventListener("change",K_);else if(g.addListener)g.addListener(K_)},p=(g,K_)=>{if(!g)return;if(g.removeEventListener)g.removeEventListener("change",K_);else if(g.removeListener)g.removeListener(K_)};return l(v,W),l(r,W),()=>{window.removeEventListener("resize",W),window.removeEventListener("focus",F),window.removeEventListener("storage",C),p(v,W),p(r,W)}},[]),R(()=>{let L=(W)=>{let F=W?.detail?.path;if(!F)return;let C=F.split("/"),v=[];for(let r=1;r<C.length;r++)v.push(C.slice(0,r).join("/"));if(v.length)Y((r)=>{let l=new Set(r);l.add(".");for(let p of v)l.add(p);return l});z(F),requestAnimationFrame(()=>{let r=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(r)r.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",L),()=>window.removeEventListener("workspace-reveal-path",L)},[]),R(()=>{L0.current=a},[a]),R(()=>{p_.current=F_},[F_]),R(()=>{C0.current=O},[O]),R(()=>{u0.current=V},[V]),R(()=>{h0.current=E},[E]),R(()=>{if(typeof window>"u"||typeof document>"u")return;let L=()=>t_(K1());L();let W=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>L();if(W?.addEventListener)W.addEventListener("change",F);else if(W?.addListener)W.addListener(F);let C=typeof MutationObserver<"u"?new MutationObserver(()=>L()):null;if(C?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)C?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(W?.removeEventListener)W.removeEventListener("change",F);else if(W?.removeListener)W.removeListener(F);C?.disconnect()}},[]),R(()=>{if(!V)return;let L=h_.current;if(!L)return;let W=requestAnimationFrame(()=>{try{L.focus(),L.select()}catch{}});return()=>cancelAnimationFrame(W)},[V]);let g2=async(L)=>{T(!0),b(null),A(null);try{let W=await G8(L,20000);b(W)}catch(W){b({error:W.message||"Failed to load preview"})}finally{T(!1)}};k_.current=g2;let Y2=async()=>{if(!_0.current)return;try{let L=await _3("",1,O0.current),W=j1(L.root,A_.current,O0.current);if(W===g_.current){w(!1);return}if(g_.current=W,j_.current=L.root,!B_.current)B_.current=requestAnimationFrame(()=>{B_.current=0,J((F)=>z4(F,j_.current)),w(!1)})}catch(L){o(L.message||"Failed to load workspace"),w(!1)}},V0=async(L)=>{if(!L)return;if(L_.current.has(L))return;L_.current.add(L);try{let W=await _3(L,1,O0.current);J((F)=>j4(F,L,W.root))}catch(W){o(W.message||"Failed to load workspace")}finally{L_.current.delete(L)}};V_.current=V0;let $0=S(()=>{let L=O;if(!L)return".";let W=q_.current?.get(L);if(W&&W.type==="dir")return W.path;if(L==="."||!L.includes("/"))return".";let F=L.split("/");return F.pop(),F.join("/")||"."},[O]),X0=S((L)=>{let W=L?.closest?.(".workspace-row");if(!W)return null;let F=W.dataset.path,C=W.dataset.type;if(!F)return null;if(C==="dir")return F;if(F.includes("/")){let v=F.split("/");return v.pop(),v.join("/")||"."}return"."},[]),d_=S((L)=>{return X0(L?.target||null)},[X0]),v_=S((L)=>{c_.current=L,N_(L)},[]),z0=S(()=>{let L=H0.current;if(L?.timer)clearTimeout(L.timer);H0.current={path:null,timer:0}},[]),Q0=S((L)=>{if(!L||L==="."){z0();return}let W=q_.current?.get(L);if(!W||W.type!=="dir"){z0();return}if(A_.current?.has(L)){z0();return}if(H0.current?.path===L)return;z0();let F=setTimeout(()=>{H0.current={path:null,timer:0},V_.current?.(L),Y((C)=>{let v=new Set(C);return v.add(L),v})},600);H0.current={path:L,timer:F}},[z0]),p0=S((L,W)=>{if(g0.current={x:L,y:W},D0.current)return;D0.current=requestAnimationFrame(()=>{D0.current=0;let F=B0.current;if(!F)return;let C=g0.current;F.style.transform=`translate(${C.x+12}px, ${C.y+12}px)`})},[]),b0=S((L)=>{if(!L)return;let F=(q_.current?.get(L)?.name||L.split("/").pop()||L).trim();if(!F)return;e({path:L,label:F})},[]),i0=S(()=>{if(e(null),D0.current)cancelAnimationFrame(D0.current),D0.current=0;if(B0.current)B0.current.style.transform="translate(-9999px, -9999px)"},[]),O2=S((L)=>{if(!L)return".";let W=q_.current?.get(L);if(W&&W.type==="dir")return W.path;if(L==="."||!L.includes("/"))return".";let F=L.split("/");return F.pop(),F.join("/")||"."},[]),Z0=S(()=>{B(null),D("")},[]),n0=S((L)=>{if(!L)return;let F=(q_.current?.get(L)?.name||L.split("/").pop()||L).trim();if(!F||L===".")return;B(L),D(F)},[]),G2=S(async()=>{let L=u0.current;if(!L)return;let W=(k||"").trim();if(!W){Z0();return}let F=q_.current?.get(L),C=(F?.name||L.split("/").pop()||L).trim();if(W===C){Z0();return}try{let r=(await q8(L,W))?.path||L,l=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(Z0(),o(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:L,newPath:r,type:F?.type||"file"}})),F?.type==="dir")Y((p)=>{let g=new Set;for(let K_ of p)if(K_===L)g.add(r);else if(K_.startsWith(`${L}/`))g.add(`${r}${K_.slice(L.length)}`);else g.add(K_);return g});if(z(r),F?.type==="dir")b(null),T(!1),A(null);else k_.current?.(r);V_.current?.(l)}catch(v){o(v?.message||"Failed to rename file")}},[Z0,k]),_2=S(async(L)=>{let C=L||".";for(let v=0;v<50;v+=1){let l=`untitled${v===0?"":`-${v}`}.md`;try{let g=(await B8(C,l,""))?.path||(C==="."?l:`${C}/${l}`);if(C&&C!==".")Y((K_)=>new Set([...K_,C]));z(g),o(null),V_.current?.(C),k_.current?.(g);return}catch(p){if(p?.status===409||p?.code==="file_exists")continue;o(p?.message||"Failed to create file");return}}o("Failed to create file (untitled name already in use).")},[]),$2=S((L)=>{if(L?.stopPropagation?.(),O_)return;let W=O2(C0.current);_2(W)},[O_,O2,_2]);R(()=>{if(typeof window>"u")return;let L=(W)=>{let F=W?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;J((p)=>{let g=p;for(let K_ of F){if(!K_?.root)continue;if(!g||K_.path==="."||!K_.path)g=K_.root;else g=j4(g,K_.path,K_.root)}if(g)g_.current=j1(g,A_.current,O0.current);return w(!1),g});let C=C0.current;if(Boolean(C)&&F.some((p)=>{let g=p?.path||"";if(!g||g===".")return!0;return C===g||C.startsWith(`${g}/`)||g.startsWith(`${C}/`)}))x.current.clear();if(!C||!h0.current)return;let r=q_.current?.get(C);if(r&&r.type==="dir")return;if(F.some((p)=>{let g=p?.path||"";if(!g||g===".")return!0;return C===g||C.startsWith(`${g}/`)}))k_.current?.(C)};return window.addEventListener("workspace-update",L),()=>window.removeEventListener("workspace-update",L)},[]),y_.current=Y2;let W2=H(()=>{if(typeof window>"u")return;let L=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),W=e0.current??_0.current,F=document.visibilityState!=="hidden"&&(W||L.matches&&_0.current);$3(F,O0.current).catch(()=>{})}).current,i_=H(0),I0=H(()=>{if(i_.current)clearTimeout(i_.current);i_.current=setTimeout(()=>{i_.current=0,W2()},250)}).current;R(()=>{if(_0.current)y_.current?.();I0()},[$,N]),R(()=>{y_.current(),W2();let L=setInterval(()=>y_.current(),M$),W=k2("previewHeight",null),F=Number.isFinite(W)?Math.min(Math.max(W,80),600):280;if(e_.current=F,w_.current)w_.current.style.setProperty("--preview-height",`${F}px`);let C=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),v=()=>I0();if(C.addEventListener)C.addEventListener("change",v);else if(C.addListener)C.addListener(v);return document.addEventListener("visibilitychange",v),()=>{if(clearInterval(L),B_.current)cancelAnimationFrame(B_.current),B_.current=0;if(C.removeEventListener)C.removeEventListener("change",v);else if(C.removeListener)C.removeListener(v);if(document.removeEventListener("visibilitychange",v),i_.current)clearTimeout(i_.current),i_.current=0;if(U_.current)clearTimeout(U_.current),U_.current=null;$3(!1,O0.current).catch(()=>{})}},[]);let E0=j0(()=>O1(j,K,__),[j,K,__]),L2=j0(()=>new Map(E0.map((L)=>[L.node.path,L.node])),[E0]),U=j0(()=>J1(E_),[E_]);q_.current=L2;let n=(O?q_.current.get(O):null)?.type==="dir";R(()=>{if(!O||!n){X_(null),$_.current=null,u_.current=null;return}let L=O,W=`${__?"hidden":"visible"}:${O}`,F=x.current,C=F.get(W);if(C?.root){F.delete(W),F.set(W,C);let l=z1(C.root,Boolean(C.truncated),S_);if(l)$_.current=l,u_.current=O,X_({loading:!1,error:null,payload:l});return}let v=$_.current,r=u_.current;X_({loading:!0,error:null,payload:r===O?v:null}),_3(O,P$,__).then((l)=>{if(C0.current!==L)return;let p={root:l?.root,truncated:Boolean(l?.truncated)};F.delete(W),F.set(W,p);while(F.size>S$){let K_=F.keys().next().value;if(!K_)break;F.delete(K_)}let g=z1(p.root,p.truncated,S_);$_.current=g,u_.current=O,X_({loading:!1,error:null,payload:g})}).catch((l)=>{if(C0.current!==L)return;X_({loading:!1,error:l?.message||"Failed to load folder size chart",payload:r===O?v:null})})},[O,n,__,S_]);let z_=Boolean(E&&E.kind==="text"&&!n&&(!E.size||E.size<=262144)),H_=z_?"Open in editor":E?.size>262144?"File too large to edit":"File is not editable";R(()=>{let L=Y0.current;if(y0.current)y0.current.dispose(),y0.current=null;if(!L)return;if(L.innerHTML="",!O||n||!E||E.error)return;let W={path:O,content:typeof E.text==="string"?E.text:void 0,mtime:E.mtime,size:E.size,preview:E,mode:"view"},F=a_.resolve(W)||a_.get("workspace-preview-default");if(!F)return;let C=F.mount(L,W);return y0.current=C,()=>{if(y0.current===C)C.dispose(),y0.current=null;L.innerHTML=""}},[O,n,E]);let M_=(L)=>{let W=L?.target;if(W instanceof Element)return W;return W?.parentElement||null},b_=(L)=>{return Boolean(L?.closest?.(".workspace-node-icon, .workspace-label-text"))},W0=H((L)=>{if(q0.current)clearTimeout(q0.current),q0.current=null;let F=M_(L)?.closest?.("[data-path]");if(!F)return;let C=F.dataset.path;if(F.dataset.type==="dir"||!C)return;if(u0.current===C)Z0();T_.current?.(C)}).current,A0=H((L)=>{if(N0.current){N0.current=!1;return}let W=M_(L),F=W?.closest?.("[data-path]");if(C_.current?.focus?.(),!F)return;let C=F.dataset.path,v=F.dataset.type,r=Boolean(W?.closest?.(".workspace-caret")),l=Boolean(W?.closest?.("button"))||Boolean(W?.closest?.("a"))||Boolean(W?.closest?.("input")),p=C0.current===C,g=u0.current;if(g){if(g===C)return;Z0()}let K_=v==="file"&&c0.current===C&&!r&&!l;if(p&&!r&&!l&&C!=="."&&!K_){if(q0.current)clearTimeout(q0.current);q0.current=setTimeout(()=>{q0.current=null,n0(C)},350);return}if(v==="dir"){if(c0.current=null,z(C),b(null),A(null),T(!1),!A_.current.has(C))V_.current?.(C);if(p&&!r)return;Y((x0)=>{let v0=new Set(x0);if(v0.has(C))v0.delete(C);else v0.add(C);return v0})}else{c0.current=null,z(C);let n_=q_.current.get(C);if(n_)f_.current?.(n_.path,n_);k_.current?.(C)}}).current,l0=H(()=>{g_.current="",y_.current(),Array.from(A_.current||[]).filter((W)=>W&&W!==".").forEach((W)=>V_.current?.(W))}).current,w0=H(()=>{c0.current=null,z(null),b(null),A(null),T(!1)}).current,B2=H(()=>{Y_((L)=>{let W=!L;if(typeof window<"u")R_("workspaceShowHidden",String(W));return O0.current=W,$3(!0,W).catch(()=>{}),g_.current="",y_.current?.(),Array.from(A_.current||[]).filter((C)=>C&&C!==".").forEach((C)=>V_.current?.(C)),W})}).current,U2=H((L)=>{if(M_(L)?.closest?.("[data-path]"))return;w0()}).current,J0=S(async(L)=>{if(!L)return;let W=L.split("/").pop()||L;if(!window.confirm(`Delete "${W}"? This cannot be undone.`))return;try{await X8(L);let C=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(C0.current===L)w0();V_.current?.(C),o(null)}catch(C){b((v)=>({...v||{},error:C.message||"Failed to delete file"}))}},[w0]),U0=S((L)=>{let W=C_.current;if(!W||!L||typeof CSS>"u"||typeof CSS.escape!=="function")return;W.querySelector(`[data-path="${CSS.escape(L)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),M0=S((L)=>{let W=E0;if(!W||W.length===0)return;let F=O?W.findIndex((C)=>C.node.path===O):-1;if(L.key==="ArrowDown"){L.preventDefault();let C=Math.min(F+1,W.length-1),v=W[C];if(!v)return;if(z(v.node.path),v.node.type!=="dir")f_.current?.(v.node.path,v.node),k_.current?.(v.node.path);else b(null),T(!1),A(null);U0(v.node.path);return}if(L.key==="ArrowUp"){L.preventDefault();let C=F<=0?0:F-1,v=W[C];if(!v)return;if(z(v.node.path),v.node.type!=="dir")f_.current?.(v.node.path,v.node),k_.current?.(v.node.path);else b(null),T(!1),A(null);U0(v.node.path);return}if(L.key==="ArrowRight"&&F>=0){let C=W[F];if(C?.node?.type==="dir"&&!K.has(C.node.path))L.preventDefault(),V_.current?.(C.node.path),Y((v)=>new Set([...v,C.node.path]));return}if(L.key==="ArrowLeft"&&F>=0){let C=W[F];if(C?.node?.type==="dir"&&K.has(C.node.path))L.preventDefault(),Y((v)=>{let r=new Set(v);return r.delete(C.node.path),r});return}if(L.key==="Enter"&&F>=0){L.preventDefault();let C=W[F];if(!C)return;let v=C.node.path;if(C.node.type==="dir"){if(!A_.current.has(v))V_.current?.(v);Y((l)=>{let p=new Set(l);if(p.has(v))p.delete(v);else p.add(v);return p}),b(null),A(null),T(!1)}else f_.current?.(v,C.node),k_.current?.(v);return}if((L.key==="Delete"||L.key==="Backspace")&&F>=0){let C=W[F];if(!C||C.node.type==="dir")return;L.preventDefault(),J0(C.node.path);return}if(L.key==="Escape")L.preventDefault(),w0()},[w0,J0,K,E0,U0,O]),q2=S((L)=>{let W=M_(L),F=W?.closest?.(".workspace-row");if(!F)return;let C=F.dataset.type,v=F.dataset.path;if(!v||v===".")return;if(u0.current===v)return;let r=L?.touches?.[0];if(!r)return;if(f0.current={path:b_(W)?v:null,dragging:!1,startX:r.clientX,startY:r.clientY},C!=="file")return;if(U_.current)clearTimeout(U_.current);U_.current=setTimeout(()=>{if(U_.current=null,f0.current?.dragging)return;J0(v)},600)},[J0]),N2=S(()=>{if(U_.current)clearTimeout(U_.current),U_.current=null;let L=f0.current;if(L?.dragging&&L.path){let W=c_.current||$0(),F=z2.current;if(typeof F==="function")F(L.path,W)}f0.current={path:null,dragging:!1,startX:0,startY:0},G0.current=0,G_(!1),d(null),v_(null),z0(),i0()},[$0,i0,v_,z0]),w2=S((L)=>{let W=f0.current,F=L?.touches?.[0];if(!F||!W?.path){if(U_.current)clearTimeout(U_.current),U_.current=null;return}let C=Math.abs(F.clientX-W.startX),v=Math.abs(F.clientY-W.startY),r=C>8||v>8;if(r&&U_.current)clearTimeout(U_.current),U_.current=null;if(!W.dragging&&r)W.dragging=!0,G_(!0),d("move"),b0(W.path);if(W.dragging){L.preventDefault(),p0(F.clientX,F.clientY);let l=document.elementFromPoint(F.clientX,F.clientY),p=X0(l)||$0();if(c_.current!==p)v_(p);Q0(p)}},[X0,$0,b0,p0,v_,Q0]),o0=H((L)=>{L.preventDefault();let W=w_.current;if(!W)return;let F=L.clientY,C=e_.current||280,v=L.currentTarget;v.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let r=F,l=(g)=>{r=g.clientY;let K_=W.clientHeight-80,n_=Math.min(Math.max(C-(g.clientY-F),80),K_);W.style.setProperty("--preview-height",`${n_}px`),e_.current=n_},p=()=>{let g=W.clientHeight-80,K_=Math.min(Math.max(C-(r-F),80),g);e_.current=K_,v.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",R_("previewHeight",String(Math.round(K_))),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",p)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",p)}).current,I_=H((L)=>{L.preventDefault();let W=w_.current;if(!W)return;let F=L.touches[0];if(!F)return;let C=F.clientY,v=e_.current||280,r=L.currentTarget;r.classList.add("dragging"),document.body.style.userSelect="none";let l=(g)=>{let K_=g.touches[0];if(!K_)return;g.preventDefault();let n_=W.clientHeight-80,x0=Math.min(Math.max(v-(K_.clientY-C),80),n_);W.style.setProperty("--preview-height",`${x0}px`),e_.current=x0},p=()=>{r.classList.remove("dragging"),document.body.style.userSelect="",R_("previewHeight",String(Math.round(e_.current||v))),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",p),document.removeEventListener("touchcancel",p)};document.addEventListener("touchmove",l,{passive:!1}),document.addEventListener("touchend",p),document.addEventListener("touchcancel",p)}).current,F0=async()=>{if(!O)return;try{let L=await L8(O);if(L.media_id)A(L.media_id)}catch(L){b((W)=>({...W||{},error:L.message||"Failed to attach"}))}},V2=async()=>{if(!O||n)return;await J0(O)},r0=(L)=>{return Array.from(L?.dataTransfer?.types||[]).includes("Files")},P0=S((L)=>{if(!r0(L))return;if(L.preventDefault(),G0.current+=1,!L0.current)G_(!0);d("upload");let W=d_(L)||$0();v_(W),Q0(W)},[$0,d_,v_,Q0]),S0=S((L)=>{if(!r0(L))return;if(L.preventDefault(),L.dataTransfer)L.dataTransfer.dropEffect="copy";if(!L0.current)G_(!0);if(p_.current!=="upload")d("upload");let W=d_(L)||$0();if(c_.current!==W)v_(W);Q0(W)},[$0,d_,v_,Q0]),h2=S((L)=>{if(!r0(L))return;if(L.preventDefault(),G0.current=Math.max(0,G0.current-1),G0.current===0)G_(!1),d(null),v_(null),z0()},[v_,z0]),F2=S(async(L,W=".")=>{let F=Array.from(L||[]);if(F.length===0)return;let C=W&&W!==""?W:".",v=C!=="."?C:"workspace root";J_(!0);try{let r=null;for(let l of F)try{r=await m3(l,C)}catch(p){let g=p?.status,K_=p?.code;if(g===409||K_==="file_exists"){let n_=l?.name||"file";if(!window.confirm(`"${n_}" already exists in ${v}. Overwrite?`))continue;r=await m3(l,C,{overwrite:!0})}else throw p}if(r?.path)c0.current=r.path,z(r.path),k_.current?.(r.path);V_.current?.(C)}catch(r){o(r.message||"Failed to upload file")}finally{J_(!1)}},[]),M2=S(async(L,W)=>{if(!L)return;let F=q_.current?.get(L);if(!F)return;let C=W&&W!==""?W:".",v=L.includes("/")?L.split("/").slice(0,-1).join("/")||".":".";if(C===v)return;try{let l=(await V8(L,C))?.path||L;if(F.type==="dir")Y((p)=>{let g=new Set;for(let K_ of p)if(K_===L)g.add(l);else if(K_.startsWith(`${L}/`))g.add(`${l}${K_.slice(L.length)}`);else g.add(K_);return g});if(z(l),F.type==="dir")b(null),T(!1),A(null);else k_.current?.(l);V_.current?.(v),V_.current?.(C)}catch(r){o(r?.message||"Failed to move entry")}},[]);z2.current=M2;let P2=S(async(L)=>{if(!r0(L))return;L.preventDefault(),G0.current=0,G_(!1),d(null),N_(null),z0();let W=Array.from(L?.dataTransfer?.files||[]);if(W.length===0)return;let F=c_.current||d_(L)||$0();await F2(W,F)},[$0,d_,F2]),V3=S((L)=>{if(L?.stopPropagation?.(),O_)return;let W=L?.currentTarget?.dataset?.uploadTarget||".";K0.current=W,x_.current?.click()},[O_]),X2=S(()=>{if(O_)return;let L=C0.current,W=L?q_.current?.get(L):null;K0.current=W?.type==="dir"?W.path:".",x_.current?.click()},[O_]),X3=S((L)=>{if(!L||L.button!==0)return;let W=L.currentTarget;if(!W||!W.dataset)return;let F=W.dataset.path;if(!F||F===".")return;if(u0.current===F)return;let C=M_(L);if(C?.closest?.("button, a, input, .workspace-caret"))return;if(!b_(C))return;L.preventDefault(),k0.current={path:F,dragging:!1,startX:L.clientX,startY:L.clientY};let v=(l)=>{let p=k0.current;if(!p?.path)return;let g=Math.abs(l.clientX-p.startX),K_=Math.abs(l.clientY-p.startY),n_=g>4||K_>4;if(!p.dragging&&n_)p.dragging=!0,N0.current=!0,G_(!0),d("move"),b0(p.path),p0(l.clientX,l.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(p.dragging){l.preventDefault(),p0(l.clientX,l.clientY);let x0=document.elementFromPoint(l.clientX,l.clientY),v0=X0(x0)||$0();if(c_.current!==v0)v_(v0);Q0(v0)}},r=()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",r);let l=k0.current;if(l?.dragging&&l.path){let p=c_.current||$0(),g=z2.current;if(typeof g==="function")g(l.path,p)}k0.current={path:null,dragging:!1,startX:0,startY:0},G0.current=0,G_(!1),d(null),v_(null),z0(),i0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{N0.current=!1},0)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",r)},[X0,$0,b0,p0,i0,v_,Q0,z0]),Q3=S(async(L)=>{let W=Array.from(L?.target?.files||[]);if(W.length===0)return;let F=K0.current||".";if(await F2(W,F),K0.current=".",L?.target)L.target.value=""},[F2]);return X`
        <aside
            class=${`workspace-sidebar${a?" workspace-drop-active":""}`}
            data-workspace-scale=${E_}
            ref=${w_}
            onDragEnter=${P0}
            onDragOver=${S0}
            onDragLeave=${h2}
            onDrop=${P2}
        >
            <input type="file" multiple style="display:none" ref=${x_} onChange=${Q3} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${$2} title="New file" disabled=${O_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${l0} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${__?" active":""}`}
                        onClick=${B2}
                        title=${__?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!__&&X`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${U2}>
                ${O_&&X`<div class="workspace-drop-hint">Uploading…</div>`}
                ${Q&&X`<div class="workspace-loading">Loading…</div>`}
                ${i&&X`<div class="workspace-error">${i}</div>`}
                ${j&&X`
                    <div
                        class="workspace-tree-list"
                        ref=${C_}
                        tabIndex="0"
                        onClick=${A0}
                        onDblClick=${W0}
                        onKeyDown=${M0}
                        onTouchStart=${q2}
                        onTouchEnd=${N2}
                        onTouchMove=${w2}
                        onTouchCancel=${N2}
                    >
                        ${E0.map(({node:L,depth:W})=>{let F=L.type==="dir",C=L.path===O,v=L.path===V,r=F&&K.has(L.path),l=s&&L.path===s,p=Array.isArray(L.children)&&L.children.length>0?L.children.length:Number(L.child_count)||0;return X`
                                <div
                                    key=${L.path}
                                    class=${`workspace-row${C?" selected":""}${l?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+W*U.indentPx}px`}}
                                    data-path=${L.path}
                                    data-type=${L.type}
                                    onMouseDown=${X3}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${F?r?X`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:X`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${F?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${F?X`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:X`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${v?X`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${h_}
                                                value=${k}
                                                onInput=${(g)=>D(g?.target?.value||"")}
                                                onKeyDown=${(g)=>{if(g.key==="Enter")g.preventDefault(),G2();else if(g.key==="Escape")g.preventDefault(),Z0()}}
                                                onBlur=${Z0}
                                                onClick=${(g)=>g.stopPropagation()}
                                            />
                                        `:X`<span class="workspace-label"><span class="workspace-label-text">${L.name}</span></span>`}
                                    ${F&&!r&&p>0&&X`
                                        <span class="workspace-count">${p}</span>
                                    `}
                                    ${F&&X`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${L.path}
                                            title="Upload files to this folder"
                                            onClick=${V3}
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
            ${O&&X`
                <div class="workspace-preview-splitter-h" onMouseDown=${o0} onTouchStart=${I_}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${O}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${$2} title="New file" disabled=${O_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!n&&X`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>z_&&T_.current?.(O,E)}
                                    title=${H_}
                                    disabled=${!z_}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${V2}
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
                            ${n?X`
                                    <button class="workspace-download" onClick=${X2}
                                        title="Upload files to this folder" disabled=${O_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${Q8(O,__)}
                                        title="Download folder as zip" onClick=${(L)=>L.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:X`<button class="workspace-download" onClick=${F0} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${M&&X`<div class="workspace-loading">Loading preview…</div>`}
                    ${E?.error&&X`<div class="workspace-error">${E.error}</div>`}
                    ${n&&X`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${Q_?.loading&&X`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${Q_?.error&&X`<div class="workspace-error">${Q_.error}</div>`}
                        ${Q_?.payload&&Q_.payload.segments?.length>0&&X`
                            <${x$} payload=${Q_.payload} />
                        `}
                        ${Q_?.payload&&(!Q_.payload.segments||Q_.payload.segments.length===0)&&X`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${E&&!E.error&&!n&&X`
                        <div class="workspace-preview-body" ref=${Y0}></div>
                    `}
                    ${m&&X`
                        <div class="workspace-download-card">
                            <${T$} mediaId=${m} />
                        </div>
                    `}
                </div>
            `}
            ${Z_&&X`
                <div class="workspace-drag-ghost" ref=${B0}>${Z_.label}</div>
            `}
        </aside>
    `}function U1({tabs:_,activeId:$,onActivate:N,onClose:Z,onCloseOthers:j,onCloseAll:J,onTogglePin:K,onTogglePreview:Y,previewTabs:O,onToggleDock:z,dockVisible:V}){let[B,k]=f(null),D=H(null);R(()=>{if(!B)return;let Q=(w)=>{if(w.type==="keydown"&&w.key!=="Escape")return;k(null)};return document.addEventListener("click",Q),document.addEventListener("keydown",Q),()=>{document.removeEventListener("click",Q),document.removeEventListener("keydown",Q)}},[B]),R(()=>{let Q=(w)=>{if(w.ctrlKey&&w.key==="Tab"){if(w.preventDefault(),!_.length)return;let M=_.findIndex((T)=>T.id===$);if(w.shiftKey){let T=_[(M-1+_.length)%_.length];N?.(T.id)}else{let T=_[(M+1)%_.length];N?.(T.id)}return}if((w.ctrlKey||w.metaKey)&&w.key==="w"){let M=document.querySelector(".editor-pane");if(M&&M.contains(document.activeElement)){if(w.preventDefault(),$)Z?.($)}}};return document.addEventListener("keydown",Q),()=>document.removeEventListener("keydown",Q)},[_,$,N,Z]);let E=S((Q,w)=>{if(Q.button===1){Q.preventDefault(),Z?.(w);return}if(Q.button===0)N?.(w)},[N,Z]),b=S((Q,w)=>{Q.preventDefault(),k({id:w,x:Q.clientX,y:Q.clientY})},[]),m=S((Q)=>{Q.preventDefault(),Q.stopPropagation()},[]),A=S((Q,w)=>{Q.preventDefault(),Q.stopPropagation(),Z?.(w)},[Z]);if(R(()=>{if(!$||!D.current)return;let Q=D.current.querySelector(".tab-item.active");if(Q)Q.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return X`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((Q)=>X`
                <div
                    key=${Q.id}
                    class=${`tab-item${Q.id===$?" active":""}${Q.dirty?" dirty":""}${Q.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${Q.id===$}
                    title=${Q.path}
                    onMouseDown=${(w)=>E(w,Q.id)}
                    onContextMenu=${(w)=>b(w,Q.id)}
                >
                    ${Q.pinned&&X`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${Q.label}</span>
                    <button
                        type="button"
                        class="tab-close"
                        onMouseDown=${m}
                        onClick=${(w)=>A(w,Q.id)}
                        title=${Q.dirty?"Unsaved changes":"Close"}
                        aria-label=${Q.dirty?"Unsaved changes":`Close ${Q.label}`}
                    >
                        ${Q.dirty?X`<span class="tab-dirty-dot" aria-hidden="true"></span>`:X`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </button>
                </div>
            `)}
            ${z&&X`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${V?" active":""}`}
                    onClick=${z}
                    title=${`${V?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${V?"Hide":"Show"} terminal`}
                    aria-pressed=${V?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="2"/>
                        <polyline points="4.5 5.25 7 7.75 4.5 10.25"/>
                        <line x1="8.5" y1="10.25" x2="11.5" y2="10.25"/>
                    </svg>
                </button>
            `}
        </div>
        ${B&&X`
            <div class="tab-context-menu" style=${{left:B.x+"px",top:B.y+"px"}}>
                <button onClick=${()=>{Z?.(B.id),k(null)}}>Close</button>
                <button onClick=${()=>{j?.(B.id),k(null)}}>Close Others</button>
                <button onClick=${()=>{J?.(),k(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{K?.(B.id),k(null)}}>
                    ${_.find((Q)=>Q.id===B.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${Y&&/\.(md|mdx|markdown)$/i.test(B.id)&&X`
                    <hr />
                    <button onClick=${()=>{Y(B.id),k(null)}}>
                        ${O?.has(B.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var I$=400,O4=60,F1=220,G4="mdPreviewHeight";function f$(){try{let _=localStorage.getItem(G4),$=_?Number(_):NaN;return Number.isFinite($)&&$>=O4?$:F1}catch{return F1}}function H1({getContent:_,path:$,onClose:N}){let[Z,j]=f(""),[J,K]=f(f$),Y=H(null),O=H(null),z=H(""),V=H(_);return V.current=_,R(()=>{let D=()=>{let b=V.current?.()||"";if(b===z.current)return;z.current=b;try{let m=j2(b,null,{sanitize:!1});j(m)}catch{j('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let E=setInterval(D,I$);return()=>clearInterval(E)},[]),R(()=>{if(Y.current&&Z)E2(Y.current).catch(()=>{})},[Z]),X`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let E=D.clientY,b=O.current?.offsetHeight||J,m=O.current?.parentElement,A=m?m.offsetHeight*0.7:500,Q=D.currentTarget;Q.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=(T)=>{let i=Math.min(Math.max(b-(T.clientY-E),O4),A);K(i)},M=()=>{Q.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(G4,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",M)}}
            onTouchStart=${(D)=>{D.preventDefault();let E=D.touches[0];if(!E)return;let b=E.clientY,m=O.current?.offsetHeight||J,A=O.current?.parentElement,Q=A?A.offsetHeight*0.7:500,w=D.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let M=(i)=>{let o=i.touches[0];if(!o)return;i.preventDefault();let __=Math.min(Math.max(m-(o.clientY-b),O4),Q);K(__)},T=()=>{w.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(G4,String(Math.round(O.current?.offsetHeight||J)))}catch{}document.removeEventListener("touchmove",M),document.removeEventListener("touchend",T),document.removeEventListener("touchcancel",T)};document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("touchend",T),document.addEventListener("touchcancel",T)}}
        ></div>
        <div class="md-preview-panel" ref=${O} style=${{height:J+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${N} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${Y}
                dangerouslySetInnerHTML=${{__html:Z}}
            />
        </div>
    `}function y1({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:N}){let Z=H(_);Z.current=_;let j=H($);j.current=$;let J=H(N);J.current=N,R(()=>{J.current();let K=new g3((O,z)=>Z.current(O,z),(O)=>j.current(O));K.connect();let Y=()=>{K.reconnectIfNeeded()};return window.addEventListener("focus",Y),document.addEventListener("visibilitychange",Y),()=>{window.removeEventListener("focus",Y),document.removeEventListener("visibilitychange",Y),K.disconnect()}},[])}function D1(){let[_,$]=f(!1),[N,Z]=f("default"),j=H(!1);R(()=>{let O=D2("notificationsEnabled",!1);if(j.current=O,$(O),typeof Notification<"u")Z(Notification.permission)},[]),R(()=>{j.current=_},[_]);let J=S(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let O=Notification.requestPermission();if(O&&typeof O.then==="function")return O;return Promise.resolve(O)}catch{return Promise.resolve("default")}},[]),K=S(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){Z("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let z=await J();if(Z(z||"default"),z!=="granted"){j.current=!1,$(!1),R_("notificationsEnabled","false");return}}let O=!j.current;j.current=O,$(O),R_("notificationsEnabled",String(O))},[J]),Y=S((O,z)=>{if(!j.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let V=new Notification(O,{body:z});return V.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:N,toggleNotifications:K,notify:Y}}var m2=(_)=>{let $=new Set;return(_||[]).filter((N)=>{if(!N||$.has(N.id))return!1;return $.add(N.id),!0})};function k1({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[N,Z]=f(null),[j,J]=f(!1),K=H(!1),Y=H(null),O=H(!1),z=H(null),V=H(null);R(()=>{K.current=j},[j]),R(()=>{V.current=N},[N]);let B=S(async(E=null)=>{try{if(E){let b=await s4(E);Z(b.posts),J(!1)}else{let b=await e2(10);Z(b.posts),J(b.has_more)}}catch(b){console.error("Failed to load posts:",b)}},[]),k=S(async()=>{try{let E=await e2(10);Z((b)=>{if(!b||b.length===0)return E.posts;return m2([...E.posts,...b])}),J((b)=>b||E.has_more)}catch(E){console.error("Failed to refresh timeline:",E)}},[]),D=S(async(E={})=>{let b=V.current;if(!b||b.length===0)return;if(O.current)return;let{preserveScroll:m=!0,preserveMode:A="top",allowRepeat:Q=!1}=E,w=(i)=>{if(!m){i();return}if(A==="top")$(i);else _(i)},T=b.slice().sort((i,o)=>i.id-o.id)[0]?.id;if(!Number.isFinite(T))return;if(!Q&&z.current===T)return;O.current=!0,z.current=T;try{let i=await e2(10,T);if(i.posts.length>0)w(()=>{Z((o)=>m2([...i.posts,...o||[]])),J(i.has_more)});else J(!1)}catch(i){console.error("Failed to load more posts:",i)}finally{O.current=!1}},[_,$]);return R(()=>{Y.current=D},[D]),{posts:N,setPosts:Z,hasMore:j,setHasMore:J,hasMoreRef:K,loadPosts:B,refreshTimeline:k,loadMore:D,loadMoreRef:Y,loadingMoreRef:O,lastBeforeIdRef:z}}function C1(){let[_,$]=f(null),[N,Z]=f({text:"",totalLines:0}),[j,J]=f(""),[K,Y]=f({text:"",totalLines:0}),[O,z]=f(null),[V,B]=f(null),[k,D]=f(null),E=H(null),b=H(0),m=H(!1),A=H(""),Q=H(""),w=H(null),M=H(null),T=H(null),i=H(null),o=H(!1),__=H(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:N,setAgentDraft:Z,agentPlan:j,setAgentPlan:J,agentThought:K,setAgentThought:Y,pendingRequest:O,setPendingRequest:z,currentTurnId:V,setCurrentTurnId:B,steerQueuedTurnId:k,setSteerQueuedTurnId:D,lastAgentEventRef:E,lastSilenceNoticeRef:b,isAgentRunningRef:m,draftBufferRef:A,thoughtBufferRef:Q,pendingRequestRef:w,stalledPostIdRef:M,currentTurnIdRef:T,steerQueuedTurnIdRef:i,thoughtExpandedRef:o,draftExpandedRef:__}}function b1({appShellRef:_,sidebarWidthRef:$,editorWidthRef:N,dockHeightRef:Z}){let j=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.clientX,D=$.current||280,E=V.currentTarget;E.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=k,m=(Q)=>{b=Q.clientX;let w=Math.min(Math.max(D+(Q.clientX-k),160),600);B.style.setProperty("--sidebar-width",`${w}px`),$.current=w},A=()=>{let Q=Math.min(Math.max(D+(b-k),160),600);$.current=Q,E.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",R_("sidebarWidth",String(Math.round(Q))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,J=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.touches[0];if(!k)return;let D=k.clientX,E=$.current||280,b=V.currentTarget;b.classList.add("dragging"),B.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let m=(Q)=>{let w=Q.touches[0];if(!w)return;Q.preventDefault();let M=Math.min(Math.max(E+(w.clientX-D),160),600);B.style.setProperty("--sidebar-width",`${M}px`),$.current=M},A=()=>{b.classList.remove("dragging"),B.classList.remove("sidebar-resizing"),document.body.style.userSelect="",R_("sidebarWidth",String(Math.round($.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,K=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.clientX,D=N.current||$.current||280,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let b=k,m=(Q)=>{b=Q.clientX;let w=Math.min(Math.max(D+(Q.clientX-k),200),800);B.style.setProperty("--editor-width",`${w}px`),N.current=w},A=()=>{let Q=Math.min(Math.max(D+(b-k),200),800);N.current=Q,E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",R_("editorWidth",String(Math.round(Q))),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,Y=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.touches[0];if(!k)return;let D=k.clientX,E=N.current||$.current||280,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(Q)=>{let w=Q.touches[0];if(!w)return;Q.preventDefault();let M=Math.min(Math.max(E+(w.clientX-D),200),800);B.style.setProperty("--editor-width",`${M}px`),N.current=M},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",R_("editorWidth",String(Math.round(N.current||E))),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current,O=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.clientY,D=Z?.current||200,E=V.currentTarget;E.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let b=k,m=(Q)=>{b=Q.clientY;let w=Math.min(Math.max(D-(Q.clientY-k),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${w}px`),Z)Z.current=w;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{let Q=Math.min(Math.max(D-(b-k),100),window.innerHeight*0.5);if(Z)Z.current=Q;E.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",R_("dockHeight",String(Math.round(Q))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",A)}).current,z=H((V)=>{V.preventDefault();let B=_.current;if(!B)return;let k=V.touches[0];if(!k)return;let D=k.clientY,E=Z?.current||200,b=V.currentTarget;b.classList.add("dragging"),document.body.style.userSelect="none";let m=(Q)=>{let w=Q.touches[0];if(!w)return;Q.preventDefault();let M=Math.min(Math.max(E-(w.clientY-D),100),window.innerHeight*0.5);if(B.style.setProperty("--dock-height",`${M}px`),Z)Z.current=M;window.dispatchEvent(new CustomEvent("dock-resize"))},A=()=>{b.classList.remove("dragging"),document.body.style.userSelect="",R_("dockHeight",String(Math.round(Z?.current||E))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",A),document.removeEventListener("touchcancel",A)};document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("touchend",A),document.addEventListener("touchcancel",A)}).current;return{handleSplitterMouseDown:j,handleSplitterTouchStart:J,handleEditorSplitterMouseDown:K,handleEditorSplitterTouchStart:Y,handleDockSplitterMouseDown:O,handleDockSplitterTouchStart:z}}function E1({onTabClosed:_}={}){let $=H(_);$.current=_;let[N,Z]=f(()=>D_.getTabs()),[j,J]=f(()=>D_.getActiveId()),[K,Y]=f(()=>D_.getTabs().length>0);R(()=>{return D_.onChange((M,T)=>{Z(M),J(T),Y(M.length>0)})},[]);let[O,z]=f(()=>new Set),V=S((M)=>{z((T)=>{let i=new Set(T);if(i.has(M))i.delete(M);else i.add(M);return i})},[]),B=S((M)=>{z((T)=>{if(!T.has(M))return T;let i=new Set(T);return i.delete(M),i})},[]),k=S((M)=>{if(!M)return;let T={path:M,mode:"edit"};try{if(!a_.resolve(T)){if(!a_.get("editor")){console.warn(`[openEditor] No pane handler for: ${M}`);return}}}catch(i){console.warn(`[openEditor] paneRegistry.resolve() error for "${M}":`,i)}D_.open(M)},[]),D=S(()=>{let M=D_.getActiveId();if(M){let T=D_.get(M);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}D_.close(M),B(M),$.current?.(M)}},[B]),E=S((M)=>{let T=D_.get(M);if(T?.dirty){if(!window.confirm(`"${T.label}" has unsaved changes. Close anyway?`))return}D_.close(M),B(M),$.current?.(M)},[B]),b=S((M)=>{D_.activate(M)},[]),m=S((M)=>{let T=D_.getTabs().filter((__)=>__.id!==M&&!__.pinned),i=T.filter((__)=>__.dirty).length;if(i>0){if(!window.confirm(`${i} unsaved tab${i>1?"s":""} will be closed. Continue?`))return}let o=T.map((__)=>__.id);D_.closeOthers(M),o.forEach((__)=>{B(__),$.current?.(__)})},[B]),A=S(()=>{let M=D_.getTabs().filter((o)=>!o.pinned),T=M.filter((o)=>o.dirty).length;if(T>0){if(!window.confirm(`${T} unsaved tab${T>1?"s":""} will be closed. Continue?`))return}let i=M.map((o)=>o.id);D_.closeAll(),i.forEach((o)=>{B(o),$.current?.(o)})},[B]),Q=S((M)=>{D_.togglePin(M)},[]),w=S(()=>{let M=D_.getActiveId();if(M)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:M}}))},[]);return R(()=>{let M=(T)=>{let{oldPath:i,newPath:o,type:__}=T.detail||{};if(!i||!o)return;if(__==="dir"){for(let Y_ of D_.getTabs())if(Y_.path===i||Y_.path.startsWith(`${i}/`)){let a=`${o}${Y_.path.slice(i.length)}`;D_.rename(Y_.id,a)}}else D_.rename(i,o)};return window.addEventListener("workspace-file-renamed",M),()=>window.removeEventListener("workspace-file-renamed",M)},[]),R(()=>{let M=(T)=>{if(D_.hasUnsaved())T.preventDefault(),T.returnValue=""};return window.addEventListener("beforeunload",M),()=>window.removeEventListener("beforeunload",M)},[]),{editorOpen:K,tabStripTabs:N,tabStripActiveId:j,previewTabs:O,openEditor:k,closeEditor:D,handleTabClose:E,handleTabActivate:b,handleTabCloseOthers:m,handleTabCloseAll:A,handleTabTogglePin:Q,handleTabTogglePreview:V,revealInExplorer:w}}function L4(_,$){try{if(typeof window>"u")return $;let N=window.__PICLAW_SILENCE||{},Z=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,j=N[_]??window[Z],J=Number(j);return Number.isFinite(J)?J:$}catch{return $}}var B4=L4("warning",30000),A1=L4("finalize",120000),q4=L4("refresh",30000),w1=30000;function M1(_){let $={};return(_?.agents||[]).forEach((N)=>{$[N.id]=N}),$}function P1(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function S1(_=30000){let[,$]=f(0);R(()=>{let N=setInterval(()=>$((Z)=>Z+1),_);return()=>clearInterval(N)},[_])}function V4(_,$=160){let N=String(_||"").replace(/\r\n/g,`
`);if(!N)return 0;return N.split(`
`).reduce((Z,j)=>Z+Math.max(1,Math.ceil(j.length/$)),0)}function x1(_,$){if(typeof _!=="string")return{kind:"ignore"};let N=_.trim();if(!N)return{kind:"toast",title:"No file selected",detail:"Use a valid file path from a file pill.",level:"warning"};if(!$.editorOpen)return{kind:"toast",title:"Editor pane is not open",detail:"Open the editor pane to open files from pills.",level:"warning"};if(/^[a-z][a-z0-9+.-]*:/i.test(N))return{kind:"toast",title:"Cannot open external path from file pill",detail:"Use an in-workspace file path.",level:"warning"};try{if(!$.resolvePane({path:N,mode:"edit"}))return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}catch{return{kind:"toast",title:"No editor available",detail:`No editor can open: ${N}`,level:"warning"}}return{kind:"open",path:N}}function R2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var u$=a4,T1=e4,c$=_8,I1=J8,f1=j8,u1=$8,X4=typeof I3==="function"?I3:R2("getAgentContext",null),v$=typeof Q2==="function"?Q2:R2("getAgentModels",{current:null,models:[]}),m$=typeof f3==="function"?f3:R2("getAgentQueueState",{count:0}),R$=typeof c3==="function"?c3:R2("steerAgentQueueItem",{removed:!1,queued:"steer"}),g$=typeof u3==="function"?u3:R2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});a_.register(d3);a_.register($4);a_.register(_4);s3();a_.register(t3);function h$(){let[_,$]=f("disconnected"),[N,Z]=f(null),[j,J]=f(null),[K,Y]=f(!1),[O,z]=f([]),[V,B]=f([]),[k,D]=f(null),{agentStatus:E,setAgentStatus:b,agentDraft:m,setAgentDraft:A,agentPlan:Q,setAgentPlan:w,agentThought:M,setAgentThought:T,pendingRequest:i,setPendingRequest:o,currentTurnId:__,setCurrentTurnId:Y_,steerQueuedTurnId:a,setSteerQueuedTurnId:G_,lastAgentEventRef:F_,lastSilenceNoticeRef:d,isAgentRunningRef:Z_,draftBufferRef:e,thoughtBufferRef:s,pendingRequestRef:N_,stalledPostIdRef:O_,currentTurnIdRef:J_,steerQueuedTurnIdRef:Q_,thoughtExpandedRef:X_,draftExpandedRef:S_}=C1(),[t_,E_]=f({}),[r_,A_]=f(null),[g_,j_]=f(null),[B_,L_]=f(!1),[y_,q_]=f(null),[f_,T_]=f(null),[k_,V_]=f(null),[w_,C_]=f(null),[h_,x_]=f([]),[K0,U_]=f(!1),f0=h_.length,k0=H(new Set),H0=H([]),N0=H(new Set),e_=H({inFlight:!1,lastAttemptAt:0,turnId:null});k0.current=new Set(h_.map((G)=>G.row_id)),H0.current=h_;let{notificationsEnabled:x,notificationPermission:$_,toggleNotifications:u_,notify:Y0}=D1(),[y0,O0]=f(()=>new Set),[_0,e0]=f(()=>D2("workspaceOpen",!0)),G0=H(null),{editorOpen:c_,tabStripTabs:L0,tabStripActiveId:p_,previewTabs:B0,openEditor:g0,closeEditor:D0,handleTabClose:z2,handleTabActivate:C0,handleTabCloseOthers:u0,handleTabCloseAll:c0,handleTabTogglePin:q0,handleTabTogglePreview:h0,revealInExplorer:g2}=E1({onTabClosed:(G)=>G0.current?.(G)}),Y2=H(null),V0=H(null),$0=H(null),X0=H(null),d_=a_.getDockPanes().length>0,[v_,z0]=f(!1),Q0=S(()=>z0((G)=>!G),[]),p0=c_||d_&&v_;R(()=>{let G=!1;async function q(){try{let y=await O8(p_||"");if(G)return;V_(y?.branch||null),C_(y?.repo_path||null)}catch{if(G)return;V_(null),C_(null)}}return q(),()=>{G=!0}},[p_]),R(()=>{let G=Y2.current;if(!G)return;if(V0.current)V0.current.dispose(),V0.current=null;let q=p_;if(!q)return;let y={path:q,mode:"edit"},P=a_.resolve(y)||a_.get("editor");if(!P){G.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let c=P.mount(G,y);V0.current=c,c.onDirtyChange?.((h)=>{D_.setDirty(q,h)}),c.onSaveRequest?.(()=>{}),c.onClose?.(()=>{D0()});let I=D_.getViewState(q);if(I&&typeof c.restoreViewState==="function")requestAnimationFrame(()=>c.restoreViewState(I));if(typeof c.onViewStateChange==="function")c.onViewStateChange((h)=>{D_.saveViewState(q,h)});return requestAnimationFrame(()=>c.focus()),()=>{if(V0.current===c)c.dispose(),V0.current=null}},[p_,D0]),R(()=>{let G=$0.current;if(X0.current)X0.current.dispose(),X0.current=null;if(!G||!d_||!v_)return;let q=a_.getDockPanes()[0];if(!q){G.innerHTML='<div class="terminal-placeholder">No dock pane available.</div>';return}let y=q.mount(G,{mode:"view"});return X0.current=y,requestAnimationFrame(()=>y.focus?.()),()=>{if(X0.current===y)y.dispose(),X0.current=null}},[d_,v_]);let[b0,i0]=f({name:"You",avatar_url:null,avatar_background:null}),O2=H(!1),Z0=H(!1),n0=H(null),G2=H(0),_2=H(0),$2=H({}),W2=H({name:null,avatar_url:null}),i_=H({currentHashtag:null,searchQuery:null}),I0=H(null),E0=H(null),L2=H(0),U=H(0),u=H(0),n=H(null),z_=H(null),H_=H(null),M_=H(0),b_=H({title:null,avatarBase:null}),W0=H(null),A0=S(()=>{if(W0.current)clearTimeout(W0.current),W0.current=null;D(null)},[]);S1(30000),R(()=>{return b8()},[]),R(()=>{R_("workspaceOpen",String(_0))},[_0]),R(()=>{return()=>{A0()}},[A0]),R(()=>{$2.current=t_||{}},[t_]),R(()=>{W2.current=b0||{name:"You",avatar_url:null,avatar_background:null}},[b0]);let l0=S((G,q,y=null)=>{if(typeof document>"u")return;let P=(G||"").trim()||"PiClaw";if(b_.current.title!==P){document.title=P;let W_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(W_&&W_.getAttribute("content")!==P)W_.setAttribute("content",P);b_.current.title=P}let c=document.getElementById("dynamic-favicon");if(!c)return;let I=c.getAttribute("data-default")||c.getAttribute("href")||"/favicon.ico",h=q||I,t=q?`${h}|${y||""}`:h;if(b_.current.avatarBase!==t){let W_=q?`${h}${h.includes("?")?"&":"?"}v=${y||Date.now()}`:h;c.setAttribute("href",W_),b_.current.avatarBase=t}},[]),w0=S((G)=>{if(!G)return;z((q)=>q.includes(G)?q:[...q,G])},[]),B2=S((G)=>{z((q)=>q.filter((y)=>y!==G))},[]);G0.current=B2;let U2=S(()=>{z([])},[]),J0=S((G,q=null,y="info",P=3000)=>{A0(),D({title:G,detail:q||null,kind:y||"info"}),W0.current=setTimeout(()=>{D((c)=>c?.title===G?null:c)},P)},[A0]),U0=S((G)=>{let q=x1(G,{editorOpen:c_,resolvePane:(y)=>a_.resolve(y)});if(q.kind==="open"){g0(q.path);return}if(q.kind==="toast")J0(q.title,q.detail,q.level)},[c_,g0,J0]),M0=S(()=>{let G=p_;if(G)w0(G)},[p_,w0]),q2=S((G)=>{if(!G)return;B((q)=>q.includes(G)?q:[...q,G])},[]),N2=S(async(G)=>{let q=(P)=>{P.scrollIntoView({behavior:"smooth",block:"center"}),P.classList.add("post-highlight"),setTimeout(()=>P.classList.remove("post-highlight"),2000)},y=document.getElementById("post-"+G);if(y){q(y);return}try{let c=(await t4(G))?.thread?.[0];if(!c)return;F((I)=>{if(!I)return[c];if(I.some((h)=>h.id===c.id))return I;return[...I,c]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+G);if(I)q(I)},50)})}catch(P){console.error("[scrollToMessage] Failed to fetch message",G,P)}},[]),w2=S((G)=>{B((q)=>q.filter((y)=>y!==G))},[]),o0=S(()=>{B([])},[]),I_=S((G={})=>{let q=Date.now();if(F_.current=q,G.running)Z_.current=!0,U_((y)=>y?y:!0);if(G.clearSilence)d.current=0},[U_]),F0=S(()=>{if(H_.current)clearTimeout(H_.current),H_.current=null;M_.current=0},[]);R(()=>()=>{F0()},[F0]);let V2=S(()=>{F0(),b((G)=>{if(!G)return G;if(!(G.last_activity||G.lastActivity))return G;let{last_activity:q,lastActivity:y,...P}=G;return P})},[F0]),r0=S((G)=>{if(!G)return;F0();let q=Date.now();M_.current=q,b({type:G.type||"active",last_activity:!0}),H_.current=setTimeout(()=>{if(M_.current!==q)return;b((y)=>{if(!y||!(y.last_activity||y.lastActivity))return y;return null})},w1)},[F0]),P0=S(()=>{Z_.current=!1,U_(!1),F_.current=null,d.current=0,e.current="",s.current="",N_.current=null,z_.current=null,J_.current=null,Q_.current=null,n0.current=null,e_.current={inFlight:!1,lastAttemptAt:0,turnId:null},F0(),Y_(null),G_(null),X_.current=!1,S_.current=!1},[F0,Y_,G_,U_]),S0=S((G)=>{if(!G)return;if(J_.current===G)return;J_.current=G,e_.current={inFlight:!1,lastAttemptAt:0,turnId:G},Y_(G),Q_.current=null,G_(null),e.current="",s.current="",A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),N_.current=null,z_.current=null,X_.current=!1,S_.current=!1},[Y_,G_]),h2=S((G)=>{if(typeof document<"u"){let W_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&W_)return}let q=z_.current;if(!q||!q.post)return;if(G&&q.turnId&&q.turnId!==G)return;let y=q.post;if(y.id&&n.current===y.id)return;let P=String(y?.data?.content||"").trim();if(!P)return;n.current=y.id||n.current,z_.current=null;let c=P.replace(/\s+/g," ").slice(0,200),I=$2.current||{},t=(y?.data?.agent_id?I[y.data.agent_id]:null)?.name||"Pi";Y0(t,c)},[Y0]),F2=S(async(G,q)=>{if(G!=="thought"&&G!=="draft")return;let y=J_.current;if(G==="thought"){if(X_.current=q,y)try{await f1(y,"thought",q)}catch(P){console.warn("Failed to update thought visibility:",P)}if(!q)return;try{let P=y?await I1(y,"thought"):null;if(P?.text)s.current=P.text;T((c)=>({...c||{text:"",totalLines:0},fullText:s.current||c?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:c?.totalLines||0}))}catch(P){console.warn("Failed to fetch full thought:",P)}return}if(S_.current=q,y)try{await f1(y,"draft",q)}catch(P){console.warn("Failed to update draft visibility:",P)}if(!q)return;try{let P=y?await I1(y,"draft"):null;if(P?.text)e.current=P.text;A((c)=>({...c||{text:"",totalLines:0},fullText:e.current||c?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:c?.totalLines||0}))}catch(P){console.warn("Failed to fetch full draft:",P)}},[]),M2=H(null),P2=S(()=>{let G=I0.current;if(!G)return;if(!(Math.abs(G.scrollTop)>150))G.scrollTop=0},[]);M2.current=P2;let V3=S((G)=>{let q=I0.current;if(!q||typeof G!=="function"){G?.();return}let{currentHashtag:y,searchQuery:P}=i_.current||{},c=!(P&&!y),I=c?q.scrollHeight-q.scrollTop:q.scrollTop;G(),requestAnimationFrame(()=>{let h=I0.current;if(!h)return;if(c){let t=Math.max(h.scrollHeight-I,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),W_=Math.min(I,t);h.scrollTop=W_}})},[]),X2=S((G)=>{let q=I0.current;if(!q||typeof G!=="function"){G?.();return}let y=q.scrollTop;G(),requestAnimationFrame(()=>{let P=I0.current;if(!P)return;let c=Math.max(P.scrollHeight-P.clientHeight,0);P.scrollTop=Math.min(y,c)})},[]),X3="Queued as a follow-up (one-at-a-time).",Q3="⁣",L=S((G)=>{if(!G||!Array.isArray(G))return G;let q=k0.current,y=new Set(q),P=G.filter((c)=>{if(y.has(c?.id))return!1;if(c?.data?.is_bot_message){let I=c?.data?.content;if(I===X3||I===Q3)return!1}return!0});return P.length===G.length?G:P},[]),{posts:W,setPosts:F,hasMore:C,setHasMore:v,hasMoreRef:r,loadPosts:l,refreshTimeline:p,loadMore:g,loadMoreRef:K_}=k1({preserveTimelineScroll:V3,preserveTimelineScrollTop:X2}),n_=j0(()=>L(W),[W,h_,L]),x0=S(()=>{let G=O_.current;if(!G)return;F((q)=>q?q.filter((y)=>y.id!==G):q),O_.current=null},[F]),{handleSplitterMouseDown:v0,handleSplitterTouchStart:c1,handleEditorSplitterMouseDown:v1,handleEditorSplitterTouchStart:m1,handleDockSplitterMouseDown:R1,handleDockSplitterTouchStart:g1}=b1({appShellRef:E0,sidebarWidthRef:L2,editorWidthRef:U,dockHeightRef:u}),Q4=S(()=>{if(!Z_.current)return;Z_.current=!1,d.current=0,F_.current=null,J_.current=null,Y_(null),X_.current=!1,S_.current=!1;let G=(e.current||"").trim();if(e.current="",s.current="",A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),N_.current=null,z_.current=null,!G){b({type:"error",title:"Response stalled - No content received"});return}let y=`${G}${`

⚠️ Response may be incomplete - the model stopped responding`}`,P=Date.now(),c=new Date().toISOString(),I={id:P,timestamp:c,data:{type:"agent_response",content:y,agent_id:"default",is_local_stall:!0}};O_.current=P,F((h)=>h?m2([...h,I]):[I]),M2.current?.(),b(null)},[Y_]);R(()=>{i_.current={currentHashtag:N,searchQuery:j}},[N,j]);let m_=S(()=>{m$().then((G)=>{let q=N0.current,y=Array.isArray(G?.items)?G.items.map((P)=>({...P})).filter((P)=>!q.has(P.row_id)):[];if(y.length){x_((P)=>{if(P.length===y.length&&P.every((c,I)=>c.row_id===y[I].row_id))return P;return y});return}q.clear(),x_((P)=>P.length===0?P:[])}).catch(()=>{x_((G)=>G.length===0?G:[])})},[x_]),W3=S(async()=>{try{let G=await X4();if(G)T_(G)}catch(G){console.warn("Failed to fetch agent context:",G)}},[]),Z2=S(async()=>{try{let G=await u1("web:default");if(!G||G.status!=="active"||!G.data){if(Z0.current){let{currentHashtag:P,searchQuery:c}=i_.current||{};if(!P&&!c)p()}return Z0.current=!1,P0(),n0.current=null,b(null),A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),N_.current=null,G??null}Z0.current=!0;let q=G.data;n0.current=q;let y=q.turn_id||q.turnId;if(y)S0(y);if(I_({running:!0,clearSilence:!0}),V2(),b(q),G.thought&&G.thought.text)T((P)=>{if(P&&P.text&&P.text.length>=G.thought.text.length)return P;return s.current=G.thought.text,{text:G.thought.text,totalLines:G.thought.totalLines||0}});if(G.draft&&G.draft.text)A((P)=>{if(P&&P.text&&P.text.length>=G.draft.text.length)return P;return e.current=G.draft.text,{text:G.draft.text,totalLines:G.draft.totalLines||0}});return G}catch(G){return console.warn("Failed to fetch agent status:",G),null}},[P0,V2,I_,p,S0]),U3=S(async()=>{if(!Z_.current)return null;if(N_.current)return null;let G=J_.current||null,q=e_.current,y=Date.now();if(q.inFlight)return null;if(q.turnId===G&&y-q.lastAttemptAt<q4)return null;q.inFlight=!0,q.lastAttemptAt=y,q.turnId=G;try{let{currentHashtag:P,searchQuery:c}=i_.current||{};if(!P&&!c)await p();return await m_(),await Z2()}finally{q.inFlight=!1}},[Z2,m_,p]);R(()=>{let G=Math.min(1000,Math.max(100,Math.floor(B4/2))),q=setInterval(()=>{if(!Z_.current)return;if(N_.current)return;let y=F_.current;if(!y)return;let P=Date.now(),c=P-y,I=Y3(n0.current);if(c>=A1){if(!I)b({type:"waiting",title:"Re-syncing after a quiet period…"});U3();return}if(c>=B4){if(P-d.current>=q4){if(!I){let h=Math.floor(c/1000);b({type:"waiting",title:`Waiting for model… No events for ${h}s`})}d.current=P,U3()}}},G);return()=>clearInterval(q)},[U3]);let h1=S((G)=>{if($(G),G!=="connected"){b(null),A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),N_.current=null,P0();return}if(!O2.current){O2.current=!0,Z2();return}let{currentHashtag:q,searchQuery:y}=i_.current;if(!q&&!y)p();Z2()},[P0,p,Z2]),p1=S(async(G)=>{Z(G),F(null),await l(G)},[l]),i1=S(async()=>{Z(null),J(null),F(null),await l()},[l]),n1=S(async(G)=>{if(!G||!G.trim())return;J(G.trim()),Z(null),F(null);try{let q=await u$(G.trim());F(q.results),v(!1)}catch(q){console.error("Failed to search:",q),F([])}},[]),l1=S(()=>{Y(!0),J(null),Z(null),F([])},[]),o1=S(()=>{Y(!1),J(null),l()},[l]),p$=S(()=>{},[]),r1=S(async(G)=>{if(!G)return;let q=G.id,y=n_?.filter((c)=>c?.data?.thread_id===q&&c?.id!==q).length||0;if(y>0){if(!window.confirm(`Delete this message and its ${y} replies?`))return}let P=(c)=>{if(!c.length)return;O0((h)=>{let t=new Set(h);return c.forEach((W_)=>t.add(W_)),t}),setTimeout(()=>{if(X2(()=>{F((h)=>h?h.filter((t)=>!c.includes(t.id)):h)}),O0((h)=>{let t=new Set(h);return c.forEach((W_)=>t.delete(W_)),t}),r.current)K_.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let c=await T1(q,y>0);if(c?.ids?.length)P(c.ids)}catch(c){let I=c?.message||"";if(y===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await T1(q,!0);if(t?.ids?.length)P(t.ids);return}console.error("Failed to delete post:",c),alert(`Failed to delete message: ${I}`)}},[n_,X2]),W4=S(async()=>{try{let G=await c$();E_(M1(G));let q=G?.user||{};i0((P)=>{let c=typeof q.name==="string"&&q.name.trim()?q.name.trim():"You",I=typeof q.avatar_url==="string"?q.avatar_url.trim():null,h=typeof q.avatar_background==="string"&&q.avatar_background.trim()?q.avatar_background.trim():null;if(P.name===c&&P.avatar_url===I&&P.avatar_background===h)return P;return{name:c,avatar_url:I,avatar_background:h}});let y=(G?.agents||[]).find((P)=>P.id==="default");if(y?.model)A_(y.model);l0(y?.name,y?.avatar_url)}catch(G){console.warn("Failed to load agents:",G)}try{let G=await X4();if(G)T_(G)}catch{}},[l0]);R(()=>{W4();let G=k2("sidebarWidth",null),q=Number.isFinite(G)?Math.min(Math.max(G,160),600):280;if(L2.current=q,E0.current)E0.current.style.setProperty("--sidebar-width",`${q}px`)},[W4]);let d1=K0||E!==null,U4=S((G)=>{if(!G||typeof G!=="object")return;let q=G.agent_id;if(!q)return;let{agent_name:y,agent_avatar:P}=G;if(!y&&P===void 0)return;let c=$2.current?.[q]||{id:q},I=c.name||null,h=c.avatar_url??c.avatarUrl??c.avatar??null,t=!1,W_=!1;if(y&&y!==c.name)I=y,W_=!0;if(P!==void 0){let d0=typeof P==="string"?P.trim():null,H4=typeof h==="string"?h.trim():null,H2=d0||null;if(H2!==(H4||null))h=H2,t=!0}if(!W_&&!t)return;if(E_((d0)=>{let H2={...d0[q]||{id:q}};if(W_)H2.name=I;if(t)H2.avatar_url=h;return{...d0,[q]:H2}}),q==="default")l0(I,h,t?Date.now():null)},[l0]),F4=S((G)=>{if(!G||typeof G!=="object")return;let q=G.user_name??G.userName,y=G.user_avatar??G.userAvatar,P=G.user_avatar_background??G.userAvatarBackground;if(q===void 0&&y===void 0&&P===void 0)return;i0((c)=>{let I=typeof q==="string"&&q.trim()?q.trim():c.name||"You",h=y===void 0?c.avatar_url:typeof y==="string"&&y.trim()?y.trim():null,t=P===void 0?c.avatar_background:typeof P==="string"&&P.trim()?P.trim():null;if(c.name===I&&c.avatar_url===h&&c.avatar_background===t)return c;return{name:I,avatar_url:h,avatar_background:t}})},[]),F3=S((G)=>{if(!G||typeof G!=="object")return;let q=G.model??G.current;if(q!==void 0)A_(q);if(G.thinking_level!==void 0)j_(G.thinking_level??null);if(G.supports_thinking!==void 0)L_(Boolean(G.supports_thinking));if(G.provider_usage!==void 0)q_(G.provider_usage??null)},[]),S2=S(()=>{v$().then((G)=>{if(G)F3(G)}).catch(()=>{})},[F3]),s1=S((G)=>{let q=G?.row_id;if(q==null)return;N0.current.add(q),x_((y)=>y.filter((P)=>P?.row_id!==q)),R$(q).then(()=>{m_()}).catch((y)=>{console.warn("[queue] Failed to steer queued item:",y),J0("Failed to steer message","The queued message could not be sent as steering.","warning"),N0.current.delete(q),m_()})},[m_,x_,J0]),a1=S((G)=>{let q=G?.row_id;if(q==null)return;N0.current.add(q),x_((y)=>y.filter((P)=>P?.row_id!==q)),g$(q).then(()=>{m_()}).catch((y)=>{console.warn("[queue] Failed to remove queued item:",y),J0("Failed to remove message","The queued message could not be removed.","warning"),N0.current.delete(q),m_()})},[m_,x_,J0]),t1=S((G)=>{if(!G||typeof G!=="object")return;if(G?.queued==="followup"||G?.queued==="steer"){m_();return}let q=G?.command;if(q&&typeof q==="object"&&(q?.queued_followup||q?.queued_steer))m_()},[m_]),H3=S(()=>{S2(),m_()},[S2,m_]);R(()=>{H3();let G=setInterval(()=>{S2(),m_()},60000);return()=>clearInterval(G)},[H3,S2,m_]);let y3=S((G,q)=>{let y=q?.turn_id;if(U4(q),F4(q),G==="ui_theme"){E8(q);return}if(G?.startsWith("agent_")){if(!(G==="agent_draft_delta"||G==="agent_thought_delta"||G==="agent_draft"||G==="agent_thought"))V2()}if(G==="connected"){b(null),A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),N_.current=null,P0(),u1("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let W_=t.data,d0=W_.turn_id||W_.turnId;if(d0)S0(d0);if(I_({clearSilence:!0}),r0(W_),t.thought&&t.thought.text)s.current=t.thought.text,T({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)e.current=t.draft.text,A({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:I,searchQuery:h}=i_.current||{};if(!I&&!h)p();H3();return}if(G==="agent_status"){if(q.type==="done"||q.type==="error"){if(y&&J_.current&&y!==J_.current)return;if(q.type==="done"){h2(y||J_.current);let{currentHashtag:I,searchQuery:h}=i_.current||{};if(!I&&!h)p();if(q.context_usage)T_(q.context_usage)}if(Z0.current=!1,P0(),N0.current.clear(),m_(),A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null),q.type==="error")b({type:"error",title:q.title||"Agent error"}),setTimeout(()=>b(null),8000);else b(null)}else{if(y)S0(y);if(I_({running:!0,clearSilence:!0}),q.type==="thinking")e.current="",s.current="",A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0});n0.current=q,b((I)=>{if(I&&I.type===q.type&&I.title===q.title)return I;return q})}return}if(G==="agent_steer_queued"){if(y&&J_.current&&y!==J_.current)return;let I=y||J_.current;if(!I)return;Q_.current=I,G_(I);return}if(G==="agent_followup_queued"){let I=q?.row_id,h=q?.content;if(I!=null&&typeof h==="string"&&h.trim())x_((t)=>{if(t.some((W_)=>W_?.row_id===I))return t;return[...t,{row_id:I,content:h,timestamp:q?.timestamp||null,thread_id:q?.thread_id??null}]});m_();return}if(G==="agent_followup_consumed"){let I=q?.row_id;if(I!=null)x_((h)=>h.filter((t)=>t.row_id!==I));m_(),p();return}if(G==="agent_followup_removed"){let I=q?.row_id;if(I!=null)N0.current.add(I),x_((h)=>h.filter((t)=>t.row_id!==I));m_();return}if(G==="agent_draft_delta"){if(y&&J_.current&&y!==J_.current)return;if(y&&!J_.current)S0(y);if(I_({running:!0,clearSilence:!0}),q?.reset)e.current="";if(q?.delta)e.current+=q.delta;let I=Date.now();if(!G2.current||I-G2.current>=100){G2.current=I;let h=e.current,t=V4(h);if(S_.current)A((W_)=>({text:W_?.text||"",totalLines:t,fullText:h}));else A({text:h,totalLines:t})}return}if(G==="agent_draft"){if(y&&J_.current&&y!==J_.current)return;if(y&&!J_.current)S0(y);I_({running:!0,clearSilence:!0});let I=q.text||"",h=q.mode||(q.kind==="plan"?"replace":"append"),t=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(q.kind==="plan")if(h==="replace")w(I);else w((W_)=>(W_||"")+I);else if(!S_.current)e.current=I,A({text:I,totalLines:t});return}if(G==="agent_thought_delta"){if(y&&J_.current&&y!==J_.current)return;if(y&&!J_.current)S0(y);if(I_({running:!0,clearSilence:!0}),q?.reset)s.current="";if(typeof q?.delta==="string")s.current+=q.delta;let I=Date.now();if(X_.current&&(!_2.current||I-_2.current>=100)){_2.current=I;let h=s.current;T((t)=>({text:t?.text||"",totalLines:V4(h),fullText:h}))}return}if(G==="agent_thought"){if(y&&J_.current&&y!==J_.current)return;if(y&&!J_.current)S0(y);I_({running:!0,clearSilence:!0});let I=q.text||"",h=Number.isFinite(q.total_lines)?q.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!X_.current)s.current=I,T({text:I,totalLines:h});return}if(G==="agent_request"){if(console.log("Agent request:",q),y&&J_.current&&y!==J_.current)return;if(y)S0(y);I_({running:!0,clearSilence:!0}),o(q),N_.current=q;return}if(G==="agent_request_timeout"){if(console.log("Agent request timeout:",q),y&&J_.current&&y!==J_.current)return;o(null),N_.current=null,P0(),b({type:"error",title:"Permission request timed out"});return}if(G==="model_changed"){if(q?.model!==void 0)A_(q.model);if(q?.thinking_level!==void 0)j_(q.thinking_level??null);if(q?.supports_thinking!==void 0)L_(Boolean(q.supports_thinking));X4().then((I)=>{if(I)T_(I)}).catch(()=>{});return}if(G==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:q}));return}let{currentHashtag:P,searchQuery:c}=i_.current;if(G==="agent_response")x0(),z_.current={post:q,turnId:J_.current};if(!P&&!c&&(G==="new_post"||G==="agent_response"))F((I)=>{if(!I)return[q];if(I.some((h)=>h.id===q.id))return I;return[...I,q]}),M2.current?.();if(G==="interaction_updated")F((I)=>{if(!I)return I;if(!I.some((h)=>h.id===q.id))return I;return I.map((h)=>h.id===q.id?q:h)});if(G==="interaction_deleted"){let I=q?.ids||[];if(I.length){X2(()=>{F((W_)=>W_?W_.filter((d0)=>!I.includes(d0.id)):W_)});let{currentHashtag:h,searchQuery:t}=i_.current;if(r.current&&!h&&!t)K_.current?.({preserveScroll:!0,preserveMode:"top"})}}},[P0,V2,K_,I_,h2,X2,p,x0,S0,r0,U4,F4,S2,m_,x_]);R(()=>{if(typeof window>"u")return;let G=window.__PICLAW_TEST_API||{};return G.emit=y3,G.reset=()=>{x0(),P0(),b(null),A({text:"",totalLines:0}),w(""),T({text:"",totalLines:0}),o(null)},G.finalize=()=>Q4(),window.__PICLAW_TEST_API=G,()=>{if(window.__PICLAW_TEST_API===G)window.__PICLAW_TEST_API=void 0}},[P0,Q4,y3,x0]),y1({handleSseEvent:y3,handleConnectionStatusChange:h1,loadPosts:l}),R(()=>{if(!n_||n_.length===0)return;let G=location.hash;if(!G||!G.startsWith("#msg-"))return;let q=G.slice(5);N2(q),history.replaceState(null,"",location.pathname+location.search)},[n_,N2]);let D3=E!==null;R(()=>{if(_!=="connected")return;let q=setInterval(()=>{let{currentHashtag:y,searchQuery:P}=i_.current||{},c=!y&&!P;if(D3){if(c)p();m_(),Z2(),W3()}else{if(c)p();Z2(),W3()}},D3?15000:60000);return()=>clearInterval(q)},[_,D3,Z2,W3,m_,p]);let e1=S(()=>{e0((G)=>!G)},[]);R(()=>{if(!c_)return;if(typeof window>"u")return;let G=E0.current;if(!G)return;if(!U.current){let q=k2("editorWidth",null),y=L2.current||280;U.current=Number.isFinite(q)?q:y}if(G.style.setProperty("--editor-width",`${U.current}px`),!u.current){let q=k2("dockHeight",null);u.current=Number.isFinite(q)?q:200}G.style.setProperty("--dock-height",`${u.current}px`)},[c_]),R(()=>{if(!d_)return;let G=(q)=>{if(q.ctrlKey&&q.key==="`")q.preventDefault(),Q0()};return document.addEventListener("keydown",G),()=>document.removeEventListener("keydown",G)},[Q0,d_]);let _6=Boolean(a&&a===(E?.turn_id||__));return X`
        <div class=${`app-shell${_0?"":" workspace-collapsed"}${c_?" editor-open":""}`} ref=${E0}>
            <${W1}
                onFileSelect=${w0}
                visible=${_0}
                active=${_0||c_}
                onOpenEditor=${g0}
            />
            <button
                class=${`workspace-toggle-tab${_0?" open":" closed"}`}
                onClick=${e1}
                title=${_0?"Hide workspace":"Show workspace"}
                aria-label=${_0?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${v0} onTouchStart=${c1}></div>
            ${p0&&X`
                <div class="editor-pane-container">
                    ${c_&&X`
                        <${U1}
                            tabs=${L0}
                            activeId=${p_}
                            onActivate=${C0}
                            onClose=${z2}
                            onCloseOthers=${u0}
                            onCloseAll=${c0}
                            onTogglePin=${q0}
                            onTogglePreview=${h0}
                            previewTabs=${B0}
                            onToggleDock=${d_?Q0:void 0}
                            dockVisible=${d_&&v_}
                        />
                    `}
                    ${c_&&X`<div class="editor-pane-host" ref=${Y2}></div>`}
                    ${c_&&p_&&B0.has(p_)&&X`
                        <${H1}
                            getContent=${()=>V0.current?.getContent?.()}
                            path=${p_}
                            onClose=${()=>h0(p_)}
                        />
                    `}
                    ${d_&&v_&&X`<div class="dock-splitter" onMouseDown=${R1} onTouchStart=${g1}></div>`}
                    ${d_&&X`<div class=${`dock-panel${v_?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${Q0} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body" ref=${$0}></div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${v1} onTouchStart=${m1}></div>
            `}
            <div class="container">
                ${j&&P1()&&X`<div class="search-results-spacer"></div>`}
                ${(N||j)&&X`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${i1}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${N?`#${N}`:`Search: ${j}`}</span>
                    </div>
                `}
                <${s8}
                    posts=${n_}
                    hasMore=${C}
                    onLoadMore=${g}
                    timelineRef=${I0}
                    onHashtagClick=${p1}
                    onMessageRef=${q2}
                    onScrollToMessage=${N2}
                    onFileRef=${U0}
                    onPostClick=${void 0}
                    onDeletePost=${r1}
                    emptyMessage=${N?`No posts with #${N}`:j?`No results for "${j}"`:void 0}
                    agents=${t_}
                    user=${b0}
                    reverse=${!(j&&!N)}
                    removingPostIds=${y0}
                    searchQuery=${j}
                />
                <${g8}
                    status=${E}
                    draft=${m}
                    plan=${Q}
                    thought=${M}
                    pendingRequest=${i}
                    intent=${k}
                    turnId=${__}
                    steerQueued=${_6}
                    onPanelToggle=${F2}
                />
                <${U8}
                    onPost=${()=>{l(),P2()}}
                    onFocus=${P2}
                    searchMode=${K}
                    onSearch=${n1}
                    onEnterSearch=${l1}
                    onExitSearch=${o1}
                    fileRefs=${O}
                    onRemoveFileRef=${B2}
                    onClearFileRefs=${U2}
                    messageRefs=${V}
                    onRemoveMessageRef=${w2}
                    onClearMessageRefs=${o0}
                    activeEditorPath=${p_}
                    onAttachEditorFile=${M0}
                    onOpenFilePill=${U0}
                    followupQueueCount=${f0}
                    followupQueueItems=${h_}
                    onInjectQueuedFollowup=${s1}
                    onRemoveQueuedFollowup=${a1}
                    onMessageResponse=${t1}
                    isAgentActive=${d1}
                    activeModel=${r_}
                    modelUsage=${y_}
                    thinkingLevel=${g_}
                    supportsThinking=${B_}
                    contextUsage=${f_}
                    currentBranch=${k_}
                    currentBranchRepoPath=${w_}
                    notificationsEnabled=${x}
                    notificationPermission=${$_}
                    onToggleNotifications=${u_}
                    onModelChange=${A_}
                    onModelStateChange=${F3}
                />
                <${p8} status=${_} />
                <${h8}
                    request=${i}
                    onRespond=${()=>{o(null),N_.current=null}}
                />
            </div>
        </div>
    `}n4(X`<${h$} />`,document.getElementById("app"));

//# debugId=7E5703E3D79BE28D64756E2164756E21
//# sourceMappingURL=app.bundle.js.map
