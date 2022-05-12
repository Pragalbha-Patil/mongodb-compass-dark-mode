(global.webpackChunkMongoDBCompass=global.webpackChunkMongoDBCompass||[]).push([[164],{8902:()=>{},33068:()=>{},29487:(e,t,n)=>{"use strict";n.r(t),n.d(t,{ConnectionFavoriteOptions:()=>Q.ConnectionFavoriteOptions,ConnectionInfo:()=>Q.ConnectionInfo,ConnectionOptions:()=>X.ConnectionOptions,ConnectionSecrets:()=>s.ConnectionSecrets,ConnectionStorage:()=>he,DataService:()=>Y,connect:()=>J,convertConnectionInfoToModel:()=>ce,convertConnectionModelToInfo:()=>oe,extractSecrets:()=>ne,getConnectionTitle:()=>ge,mergeSecrets:()=>te,promisifyAmpersandMethod:()=>pe});var s={};n.r(s),n.d(s,{c:()=>ne,o:()=>te}),n(67526),n(33354),n(25870),n(10930),n(40574),n(94116),n(43267),n(74614),n(19852),n(44306),n(26077),n(71072),n(50183),n(95682),n(21045),n(17244),n(42068),n(75519),n(39432),n(73574),n(33619),n(53862),n(26881),n(35359),n(98208),n(13608),n(75676),n(5993),n(74456);var i=n(73837),o=n.n(i),a=n(24290),r=n(6909),l=n(82361),c=n.n(l),d=n(76635),u=n.n(d),h=n(91491),p=n(84935),g=n.n(p),m=n(59176),_=n(48761);const f=(e,t,n)=>{const s=e.readPreference??_.ReadPreference.PRIMARY_PREFERRED;return e.command({...t},{readPreference:s,...n})},{debug:y}=(0,r.default)("COMPASS-CONNECT");function C(e,t){const n=e.options.hosts[0]?.host||"";return""!==t.version||/mongodb(-dev)?\.net$/i.test(n)}function w(e,t){const{isGenuine:n,serverName:s}=(0,m.getGenuineMongoDB)(e,t);return{isGenuine:n,dbType:s}}function S(e){const{isDataLake:t,dlVersion:n}=(0,m.getDataLake)(e);return{isDataLake:t,version:n}}function O(e){if(null===e)return{user:null,roles:[],privileges:[]};const{authenticatedUsers:t,authenticatedUserRoles:n,authenticatedUserPrivileges:s}=e.authInfo;return{user:t[0]??null,roles:n,privileges:s}}function v(e=null,t=null){const n=e??[],s=t&&t.length>0?n.filter((({actions:e})=>t.every((t=>e.includes(t))))):n,i={};for(const{resource:e,actions:t}of s)if(void 0!==e.db&&void 0!==e.collection){const{db:n,collection:s}=e;i[n]?Object.assign(i[n],{[s]:t}):i[n]={[s]:t}}return i}function b(e){return t=>function(e){if(!e)return!1;const t=e.message||JSON.stringify(e);return new RegExp("not (authorized|allowed)").test(t)}(t)?(y("ignoring not authorized error and returning fallback value:",{err:t,fallback:e}),Promise.resolve(e)):Promise.reject(t)}function P(e){return{collection_count:e.collections??0,document_count:e.objects??0,index_count:e.indexes??0,storage_size:e.storageSize??0,data_size:e.dataSize??0,index_size:e.indexSize??0}}var T=n(27505),M=n(76672),D=n.n(M),x=n(57147),R=n.n(x),A=n(6113),E=n.n(A),I=n(64853);const k=D()("mongodb-data-service:connect"),{log:z,mongoLogId:F}=(0,r.default)("COMPASS-CONNECT"),L=(0,i.promisify)(E().randomBytes);async function U(e){if(e){z.info(F(1001000008),"SSHTunnel","Closing SSH tunnel");try{await e.close(),k("ssh tunnel stopped")}catch(e){k("ssh tunnel stopped with error",e)}}}async function N(e){const[t]=await(0,l.once)(e||new l.EventEmitter,"error");throw t}const{debug:K,log:V}=(0,r.default)("COMPASS-CONNECT");const{fetch:H}=n(64755),{log:W,mongoLogId:j,debug:$}=(0,r.default)("COMPASS-DATA-SERVICE");function B(e,t){return Array.from(new Map(e.map((e=>[e[t],e]))).values())}let Z=0;const q=Symbol("kSessionClientType");class G extends l.EventEmitter{_isConnecting=!1;_lastSeenTopology=null;_isWritable=!1;_topologyType="Unknown";constructor(e){super(),this._id=Z++,this._connectionOptions=e}getMongoClientConnectionOptions(){return this._mongoClientConnectionOptions}_logCtx(){return`Connection ${this._id}`}getConnectionOptions(){return this._connectionOptions}getConnectionString(){return new h.ZP(this._connectionOptions.connectionString)}getReadPreference(){return this._initializedClient("CRUD").readPreference}collection(e,t,n){a.default.parallel({stats:this.collectionStats.bind(this,this._databaseName(e),this._collectionName(e)),indexes:this.indexes.bind(this,e,t)},((t,s)=>{if(t)return n(this._translateMessage(t));n(null,this._buildCollectionDetail(e,s))}))}collections(e,t){if("system"===e)return t(null,[]);this._collectionNames(e,((n,s)=>{if(n)return t(this._translateMessage(n));a.default.parallel((s||[]).map((t=>n=>{this.collectionStats(e,t,n)})),t)}))}collectionStats(e,t,n){const s=this._startLogOp(j(1001000031),"Fetching collection info",{ns:`${e}.${t}`});this._initializedClient("META").db(e).command({collStats:t,verbose:!0},((i,o)=>{if(s(i),i&&!i.message.includes("is a view, not a collection"))return n(this._translateMessage(i));n(null,this._buildCollectionStats(e,t,o||{}))}))}async collectionInfo(e,t){try{const[n]=await this.listCollections(e,{name:t});return n??null}catch(e){throw this._translateMessage(e)}}command(e,t,n){this._initializedClient("META").db(e).command(t,((e,t)=>{if(e)return n(this._translateMessage(e));n(null,t)}))}isWritable(){return this._isWritable}isMongos(){return"Sharded"===this._topologyType}currentTopologyType(){return this._topologyType}async connectionStatus(){const e=this._startLogOp(j(1001000100),"Running connectionStatus");try{const t=this._initializedClient("META").db("admin"),n=await f(t,{connectionStatus:1,showPrivileges:!0});return e(null),n}catch(t){throw e(t),t}}async _getPrivilegesOrFallback(e=null){if(e)return e;const{authInfo:{authenticatedUserPrivileges:t}}=await this.connectionStatus();return t}async listCollections(e,t={},{nameOnly:n,privileges:s=null}={}){const i=this._startLogOp(j(1001000032),"Running listCollections",{db:e,nameOnly:n??!1}),o=this._initializedClient("CRUD").db(e),a=async()=>{try{return await o.listCollections(t,{nameOnly:n}).toArray()}catch(e){return W.warn(j(1001000099),this._logCtx(),"Failed to run listCollections",{message:e.message}),[]}},r=async()=>{const t=v(await this._getPrivilegesOrFallback(s),["find"]);return Object.keys(t[e]||{}).filter(Boolean).map((e=>({name:e})))};try{const[n,s]=await Promise.all([a(),(l=t,0===Object.keys(l).length?r():[])]),o=B([...s,...n],"name").map((t=>function({db:e,name:t,info:n,options:s,type:i}){const o=g()(`${e}.${t}`),{collection:a,database:r,system:l,oplog:c,command:d,special:u,specialish:h,normal:p}=o,{readOnly:m}=n??{},{collation:_,viewOn:f,pipeline:y,validator:C,validationAction:w,validationLevel:S}=s??{},O=Boolean(C||w||S);return{_id:o.toString(),name:a,database:r,system:l,oplog:c,command:d,special:u,specialish:h,normal:p,type:i??"collection",readonly:m??!1,collation:_??null,view_on:f??null,pipeline:y??null,validation:O?{validator:C,validationAction:w,validationLevel:S}:null}}({db:e,...t})));return i(null,{collectionsCount:o.length}),o}catch(e){throw i(e),e}var l}async listDatabases({nameOnly:e,privileges:t=null}={}){const n=this._startLogOp(j(1001000033),"Running listDatabases",{nameOnly:e??!1}),s=this._initializedClient("CRUD").db("admin"),i=async()=>{try{const{databases:t}=await f(s,{listDatabases:1,nameOnly:e});return t}catch(e){return W.warn(j(1001000098),this._logCtx(),"Failed to run listDatabases",{message:e.message}),[]}},o=async()=>{const e=v(await this._getPrivilegesOrFallback(t),["find"]);return Object.keys(e).filter(Boolean).map((e=>({name:e})))};try{const[e,t]=await Promise.all([i(),o()]),s=B([...t,...e],"name").map((e=>({_id:e.name,name:e.name,...P(e)})));return n(null,{databasesCount:s.length}),s}catch(e){throw n(e),e}}async connect(){if(this._metadataClient)$("already connected");else if(this._isConnecting)$("connect method called more than once");else{$("connecting..."),this._isConnecting=!0,W.info(j(1001000014),this._logCtx(),"Connecting",{url:(0,h.rA)(this._connectionOptions.connectionString)});try{const[e,t,n,s]=await async function(e,t){K("connectMongoClient invoked",function(e){const t=e.sshTunnel?{...e.sshTunnel}:void 0,n={...e,sshTunnel:t};return n.connectionString=(0,h.rA)(e.connectionString),n.sshTunnel?.password&&(n.sshTunnel.password="<redacted>"),n.sshTunnel?.identityKeyPassphrase&&(n.sshTunnel.identityKeyPassphrase="<redacted>"),n}(e));const n=e.connectionString,s={monitorCommands:!0,useSystemCA:e.useSystemCA,autoEncryption:e.fleOptions?.autoEncryption},[i,o]=await async function(e){if(!e)return[void 0,void 0];const t=await L(64),n=t.slice(0,32).toString("base64"),s=t.slice(32).toString("base64"),i={readyTimeout:2e4,forwardTimeout:2e4,keepaliveInterval:2e4,localPort:0,localAddr:"127.0.0.1",socks5Username:n,socks5Password:s,host:e.host,port:e.port,username:e.username,password:e.password,privateKey:e.identityKeyFile?await R().promises.readFile(e.identityKeyFile):void 0,passphrase:e.identityKeyPassphrase},o=function(e){const t={...e};return t.password&&(t.password="<redacted>"),t.privateKey&&(t.privateKey="<redacted>"),t.passphrase&&(t.passphrase="<redacted>"),t}(i);z.info(F(1001000006),"SSHTunnel","Creating SSH tunnel",o),k("creating ssh tunnel with options",o);const a=new I.default(i);return k("ssh tunnel listen ..."),await a.listen(),k("ssh tunnel opened"),z.info(F(1001000007),"SSHTunnel","SSH tunnel opened"),[a,{proxyHost:"localhost",proxyPort:a.config.localPort,proxyUsername:n,proxyPassword:s}]}(e.sshTunnel);o&&Object.assign(s,o);class a extends _.MongoClient{constructor(e,n){super(e,n),t&&t(this)}}const r=new(c());async function l(e){const t=await(0,T.T0)(n,u().cloneDeep({...s,...e}),r,a);return await t.db("admin").command({ping:1}),t}let d,p;(0,T.Tu)(r,V.unbound,"compass",h.rA);try{return K("waiting for MongoClient to connect ..."),[d,p]=await Promise.race([Promise.all([l({autoEncryption:void 0}),s.autoEncryption?l({}):void 0]),N(i)]),[d,p??d,i,{url:n,options:s}]}catch(e){throw K("connection error",e),K("force shutting down ssh tunnel ..."),await Promise.all([U(i),p?.close(),d?.close()]).catch((()=>{})),e}}(this._connectionOptions,this.setupListeners.bind(this)),i={isWritable:this.isWritable(),isMongos:this.isMongos()};W.info(j(1001000015),this._logCtx(),"Connected",i),$("connected!",i),this._metadataClient=e,this._crudClient=t,this._tunnel=n,this._mongoClientConnectionOptions=s}finally{this._isConnecting=!1}}}estimatedCount(e,t,n){const s=this._startLogOp(j(1001000034),"Running estimatedCount",{ns:e});this._collection(e,"CRUD").estimatedDocumentCount(t,((e,t)=>{s(e,t),n(e,t)}))}count(e,t,n,s){const i=this._startLogOp(j(1001000035),"Running countDocuments",{ns:e});this._collection(e,"CRUD").countDocuments(t,n,((e,t)=>{i(e,t),s(e,t)}))}createCollection(e,t,n){const s=this._collectionName(e),i=this._initializedClient("CRUD").db(this._databaseName(e)),o=this._startLogOp(j(1001000036),"Running createCollection",{ns:e,options:t});i.createCollection(s,t,((e,t)=>{if(o(e),e)return n(this._translateMessage(e));n(null,t)}))}createIndex(e,t,n,s){const i=this._startLogOp(j(1001000037),"Running createIndex",{ns:e,spec:t,options:n});this._collection(e,"CRUD").createIndex(t,n,((e,t)=>{if(i(e),e)return s(this._translateMessage(e));s(null,t)}))}database(e,t,n){const s=(0,i.promisify)(this.collections.bind(this));Promise.all([this.databaseStats(e),s(e)]).then((([t,s])=>{n(null,this._buildDatabaseDetail(e,{stats:t,collections:s}))}),(e=>{n(this._translateMessage(e))}))}deleteOne(e,t,n,s){const i=this._startLogOp(j(1001000038),"Running deleteOne",{ns:e});this._collection(e,"CRUD").deleteOne(t,n,((e,t)=>{if(i(e,t),e)return s(this._translateMessage(e));s(null,t)}))}deleteMany(e,t,n,s){const i=this._startLogOp(j(1001000039),"Running deleteMany",{ns:e});this._collection(e,"CRUD").deleteMany(t,n,((e,t)=>{if(i(e,t),e)return s(this._translateMessage(e));s(null,t)}))}async disconnect(){W.info(j(1001000016),this._logCtx(),"Disconnecting");try{await Promise.all([this._metadataClient?.close(!0).catch((e=>$("failed to close MongoClient",e))),this._crudClient!==this._metadataClient&&this._crudClient?.close(!0).catch((e=>$("failed to close MongoClient",e))),this._tunnel?.close().catch((e=>$("failed to close tunnel",e)))])}finally{this._cleanup(),W.info(j(1001000017),this._logCtx(),"Fully closed")}}dropCollection(e,t){const n=this._startLogOp(j(1001000059),"Running dropCollection",{ns:e});this._collection(e,"CRUD").drop(((e,s)=>{if(n(e,s),e)return t(this._translateMessage(e));t(null,s)}))}dropDatabase(e,t){const n=this._startLogOp(j(1001000040),"Running dropDatabase",{db:e});this._initializedClient("CRUD").db(this._databaseName(e)).dropDatabase(((e,s)=>{if(n(e,s),e)return t(this._translateMessage(e));t(null,s)}))}dropIndex(e,t,n){const s=this._startLogOp(j(1001000060),"Running dropIndex",{ns:e,name:t});this._collection(e,"CRUD").dropIndex(t,((e,t)=>{if(s(e,t),e)return n(this._translateMessage(e));n(null,t)}))}aggregate(e,t,n,s){W.info(j(1001000041),this._logCtx(),"Running aggregation",{ns:e,stages:t.map((e=>Object.keys(e)[0]))}),"function"==typeof n&&(s=n,n=void 0);const i=this._collection(e,"CRUD").aggregate(t,n);if(!(0,d.isFunction)(s))return i;process.nextTick(s,null,i)}find(e,t,n,s){const i=this._startLogOp(j(1001000042),"Running find",{ns:e});this._collection(e,"CRUD").find(t,n).toArray(((e,t)=>{if(i(e),e)return s(this._translateMessage(e));s(null,t)}))}fetch(e,t,n){return this._startLogOp(j(1001000043),"Running raw find",{ns:e})(null),this._collection(e,"CRUD").find(t,n)}findOneAndReplace(e,t,n,s,i){const o=this._startLogOp(j(1001000044),"Running findOneAndReplace",{ns:e});this._collection(e,"CRUD").findOneAndReplace(t,n,s,((e,t)=>{if(o(e),e)return i(this._translateMessage(e));i(null,t.value)}))}findOneAndUpdate(e,t,n,s,i){const o=this._startLogOp(j(1001000045),"Running findOneAndUpdate",{ns:e});this._collection(e,"CRUD").findOneAndUpdate(t,n,s,((e,t)=>{if(o(e),e)return i(this._translateMessage(e));i(null,t.value)}))}explain(e,t,n,s){const i=this._startLogOp(j(1001000046),"Running find explain",{ns:e});this._collection(e,"CRUD").find(t,n).explain(((e,t)=>{if(i(e),e)return s(this._translateMessage(e));s(null,t)}))}indexes(e,t,n){const s=this._startLogOp(j(1001000047),"Listing indexes",{ns:e});H(this._initializedClient("CRUD"),e,((e,t)=>{if(s(e),e)return n(this._translateMessage(e));n(null,t)}))}async instance(){try{const e=await async function(e){const t=e.db("admin"),[n,s,i,o,a,r]=await Promise.all([f(t,{connectionStatus:1,showPrivileges:!0}).catch(b(null)),f(t,{getCmdLineOpts:1}).catch((e=>({errmsg:e.message}))),f(t,{hostInfo:1}).catch(b({})),f(t,{buildInfo:1}),f(t,{getParameter:1,featureCompatibilityVersion:1}).catch((()=>null)),f(t,{atlasVersion:1}).catch((()=>({version:"",gitVersion:""})))]);return{auth:O(n),build:(c=o,{version:c.version??"",isEnterprise:(0,m.isEnterprise)(c)}),host:(l=i,{os:l.os?.name,os_family:l.os?.type?l.os.type.toLowerCase():void 0,kernel_version:l.os?.version,kernel_version_string:l.extra?.versionString,arch:l.system?.cpuArch,memory_bits:1024*(l.system?.memSizeMB??0)*1024,cpu_cores:l.system?.numCores,cpu_frequency:1e6*parseInt(l.extra?.cpuFrequencyMHz||"0",10)}),genuineMongoDB:w(o,s),dataLake:S(o),featureCompatibilityVersion:a?.featureCompatibilityVersion.version??null,isAtlas:C(e,r)};var l,c}(this._initializedClient("META"));return W.info(j(1001000024),this._logCtx(),"Fetched instance information",{serverVersion:e.build.version,genuineMongoDB:e.genuineMongoDB,dataLake:e.dataLake,featureCompatibilityVersion:e.featureCompatibilityVersion}),e}catch(e){throw this._translateMessage(e)}}insertOne(e,t,n,s){const i=this._startLogOp(j(1001000048),"Running insertOne",{ns:e});this._collection(e,"CRUD").insertOne(t,n,((e,t)=>{if(i(e,{acknowledged:t?.acknowledged}),e)return s(this._translateMessage(e));s(null,t)}))}insertMany(e,t,n,s){const i=this._startLogOp(j(1001000049),"Running insertOne",{ns:e});this._collection(e,"CRUD").insertMany(t,n,((e,t)=>{if(i(e,{acknowledged:t?.acknowledged,insertedCount:t?.insertedCount}),e)return s(this._translateMessage(e));s(null,t)}))}putMany(e,t,n){return this._collection(e,"CRUD").insertMany(t,n)}updateCollection(e,t,n){const s=this._startLogOp(j(1001000050),"Running updateCollection",{ns:e}),i={collMod:this._collectionName(e),...t};this._initializedClient("CRUD").db(this._databaseName(e)).command(i,((e,t)=>{if(s(e,t),e)return n(this._translateMessage(e));n(null,t)}))}updateOne(e,t,n,s,i){const o=this._startLogOp(j(1001000051),"Running updateOne",{ns:e});this._collection(e,"CRUD").updateOne(t,n,s,((e,t)=>{if(o(e,t),e)return i(this._translateMessage(e));i(null,t)}))}updateMany(e,t,n,s,i){const o=this._startLogOp(j(1001000052),"Running updateMany",{ns:e});this._collection(e,"CRUD").updateMany(t,n,s,((e,t)=>{if(o(e,t),e)return i(this._translateMessage(e));i(null,t)}))}currentOp(e,t){const n=this._startLogOp(j(1001000053),"Running currentOp");this._initializedClient("META").db("admin").command({currentOp:1,$all:e},((s,i)=>{if(n(s),s){const n=this._startLogOp(j(1001000054),"Searching $cmd.sys.inprog manually");this._initializedClient("META").db("admin").collection("$cmd.sys.inprog").findOne({$all:e},((e,s)=>{if(n(e),e)return t(this._translateMessage(e));t(null,s)}))}else t(null,i)}))}getLastSeenTopology(){return this._lastSeenTopology}serverstats(e){const t=this._startLogOp(j(1001000061),"Running serverStats");this._initializedClient("META").db().admin().serverStatus(((n,s)=>{if(t(n),n)return e(this._translateMessage(n));e(null,s)}))}top(e){const t=this._startLogOp(j(1001000062),"Running top");this._initializedClient("META").db().admin().command({top:1},((n,s)=>{if(t(n),n)return e(this._translateMessage(n));e(null,s)}))}createView(e,t,n,s,i){s.viewOn=this._collectionName(t),s.pipeline=n;const o=this._startLogOp(j(1001000055),"Running createView",{name:e,sourceNs:t,stages:n.map((e=>Object.keys(e)[0])),options:s});this._initializedClient("CRUD").db(this._databaseName(t)).createCollection(e,s,((e,t)=>{if(o(e,t),e)return i(this._translateMessage(e));i(null,t)}))}updateView(e,t,n,s,i){s.viewOn=this._collectionName(t),s.pipeline=n;const o={collMod:e,...s},a=this._initializedClient("META").db(this._databaseName(t)),r=this._startLogOp(j(1001000056),"Running updateView",{name:e,sourceNs:t,stages:n.map((e=>Object.keys(e)[0])),options:s});a.command(o,((e,t)=>{if(r(e,t),e)return i(this._translateMessage(e));i(null,t)}))}dropView(e,t){this.dropCollection(e,t)}sample(e,{query:t,size:n,fields:s}={},i={}){const o=[];return t&&Object.keys(t).length>0&&o.push({$match:t}),o.push({$sample:{size:0===n?0:n||1e3}}),s&&Object.keys(s).length>0&&o.push({$project:s}),this.aggregate(e,o,{allowDiskUse:!0,...i})}startSession(e){const t=this._initializedClient(e).startSession();return t[q]=e,t}killSessions(e){const t=Array.isArray(e)?e:[e],n=new Set(t.map((e=>e[q])));if(1!==n.size)throw new Error(`Cannot kill sessions without a specific client type: [${[...n].join(", ")}]`);const[s]=n;return this._initializedClient(s).db("admin").command({killSessions:t.map((e=>e.id))})}isConnected(){return!!this._metadataClient}setupListeners(e){if(e){e.on("serverDescriptionChanged",(e=>{W.info(j(1001000018),this._logCtx(),"Server description changed",{address:e.address,error:e.newDescription.error?.message??null,previousType:e.previousDescription.type,newType:e.newDescription.type}),this.emit("serverDescriptionChanged",e)})),e.on("serverOpening",(e=>{W.info(j(1001000019),this._logCtx(),"Server opening",{address:e.address}),this.emit("serverOpening",e)})),e.on("serverClosed",(e=>{W.info(j(1001000020),this._logCtx(),"Server closed",{address:e.address}),this.emit("serverClosed",e)})),e.on("topologyOpening",(e=>{this.emit("topologyOpening",e)})),e.on("topologyClosed",(e=>{this.emit("topologyClosed",e)})),e.on("topologyDescriptionChanged",(e=>{this._isWritable=this._checkIsWritable(e),this._topologyType=e.newDescription.type;const t={isWritable:this.isWritable(),isMongos:this.isMongos(),previousType:e.previousDescription.type,newType:e.newDescription.type};W.info(j(1001000021),this._logCtx(),"Topology description changed",t),this._lastSeenTopology=e.newDescription,this.emit("topologyDescriptionChanged",e)}));const t=new Map,n=(e,t)=>(e=Math.max(e,200),t=Math.max(t,200),Math.abs(Math.log2(e/t))>=1);e.on("serverHeartbeatSucceeded",(e=>{const s=t.get(e.connectionId);(!s||s.failure||n(s.duration,e.duration))&&(t.set(e.connectionId,{failure:null,duration:e.duration}),W.write({s:"D2",id:j(1001000022),ctx:this._logCtx(),msg:"Server heartbeat succeeded",attr:{connectionId:e.connectionId,duration:e.duration}})),this.emit("serverHeartbeatSucceeded",e)})),e.on("serverHeartbeatFailed",(e=>{const s=t.get(e.connectionId);s&&s.failure&&!n(s.duration,e.duration)||(t.set(e.connectionId,{failure:e.failure.message,duration:e.duration}),W.warn(j(1001000023),this._logCtx(),"Server heartbeat failed",{connectionId:e.connectionId,duration:e.duration,failure:e.failure.message})),this.emit("serverHeartbeatFailed",e)})),e.on("commandSucceeded",(e=>{const{address:t,connectionId:n,duration:s,commandName:i}=e;W.write({s:"D2",id:j(1001000029),ctx:this._logCtx(),msg:"Driver command succeeded",attr:{address:t,serverConnectionId:n,duration:s,commandName:i}})})),e.on("commandFailed",(e=>{const{address:t,connectionId:n,duration:s,commandName:i,failure:o}=e;W.write({s:"D1",id:j(1001000030),ctx:this._logCtx(),msg:"Driver command failed",attr:{address:t,serverConnectionId:n,duration:s,commandName:i,failure:o.message}})}))}}_initializedClient(e){if("CRUD"!==e&&"META"!==e)throw new Error(`Invalid client type: ${e}`);const t="CRUD"===e?this._crudClient:this._metadataClient;if(!t)throw new Error("Client not yet initialized");return t}async databaseStats(e){const t=this._startLogOp(j(1001000057),"Running databaseStats",{db:e});try{const t=this._initializedClient("META").db(e);return{name:e,...P(await f(t,{dbStats:1}))}}catch(e){throw t(e),this._translateMessage(e)}}_buildCollectionDetail(e,t){return{...t.stats,_id:e,name:this._collectionName(e),database:this._databaseName(e),indexes:t.indexes}}_buildCollectionStats(e,t,n){return{ns:e+"."+t,name:t,database:e,is_capped:n.capped,max:n.max,is_power_of_two:1===n.userFlags,index_sizes:n.indexSizes,document_count:n.count??0,document_size:n.size,avg_document_size:n.avgObjSize??0,storage_size:n.storageSize??0,free_storage_size:n.freeStorageSize??0,index_count:n.nindexes??0,index_size:n.totalIndexSize??0,padding_factor:n.paddingFactor,extent_count:n.numExtents,extent_last_size:n.lastExtentSize,flags_user:n.userFlags,max_document_size:n.maxSize,size:n.size,index_details:n.indexDetails||{},wired_tiger:n.wiredTiger||{}}}_buildDatabaseDetail(e,t){return{_id:e,name:e,stats:t.stats,collections:t.collections}}_collection(e,t){return this._initializedClient(t).db(this._databaseName(e)).collection(this._collectionName(e))}_collectionNames(e,t){this.listCollections(e,{},{nameOnly:!0}).then((e=>{const n=e?.map((e=>e.name));t(null,n)}),(e=>{t(this._translateMessage(e))}))}_collectionName(e){return g()(e).collection}_databaseName(e){return g()(e).database}_checkIsWritable(e){return[...e.newDescription.servers.values()].some((e=>e.isWritable))}_translateMessage(e){return"string"==typeof e?e={message:e}:e.message=e.message||e.err||e.errmsg,e}_cleanup(){this._metadataClient?.removeAllListeners?.(),this._crudClient?.removeAllListeners?.(),this._metadataClient=void 0,this._crudClient=void 0,this._tunnel=void 0,this._mongoClientConnectionOptions=void 0,this._isWritable=!1,this._topologyType="Unknown",this._isConnecting=!1}_startLogOp(e,t,n={}){return(s,i)=>{if(s){const{message:e}=this._translateMessage(s);W.error(j(1001000058),this._logCtx(),"Failed to perform data service operation",{op:t,message:e,...n})}else i&&(n={...n,result:i}),Object.keys(n).length>0?W.info(e,this._logCtx(),t,n):W.info(e,this._logCtx(),t)}}}const Y=G;async function J(e){const t=new Y(e);return await t.connect(),t}var Q=n(8902),X=n(33068),ee=n(93936);function te(e,t){const n=u().cloneDeep(e);if(!t)return n;const s=n.connectionOptions,i=new h.ZP(s.connectionString),o=i.typedSearchParams();if(t.password&&(i.password=t.password),t.sshTunnelPassword&&s.sshTunnel&&(s.sshTunnel.password=t.sshTunnelPassword),t.sshTunnelPassphrase&&s.sshTunnel&&(s.sshTunnel.identityKeyPassphrase=t.sshTunnelPassphrase),t.autoEncryption&&s.fleOptions?.autoEncryption&&u().merge(s.fleOptions?.autoEncryption,t.autoEncryption),t.tlsCertificateKeyFilePassword&&o.set("tlsCertificateKeyFilePassword",t.tlsCertificateKeyFilePassword),t.proxyPassword&&o.set("proxyPassword",t.proxyPassword),t.awsSessionToken){const e=new h.yc(o.get("authMechanismProperties"));e.set("AWS_SESSION_TOKEN",t.awsSessionToken),o.set("authMechanismProperties",e.toString())}return n.connectionOptions.connectionString=i.href,n}function ne(e){const t=u().cloneDeep(e),n={},s=t.connectionOptions,i=new h.ZP(s.connectionString),o=i.typedSearchParams();i.password&&(n.password=i.password,i.password=""),s.sshTunnel?.password&&(n.sshTunnelPassword=s.sshTunnel.password,delete s.sshTunnel.password),s.sshTunnel?.identityKeyPassphrase&&(n.sshTunnelPassphrase=s.sshTunnel.identityKeyPassphrase,delete s.sshTunnel.identityKeyPassphrase),o.has("tlsCertificateKeyFilePassword")&&(n.tlsCertificateKeyFilePassword=o.get("tlsCertificateKeyFilePassword")||void 0,o.delete("tlsCertificateKeyFilePassword")),o.has("proxyPassword")&&(n.proxyPassword=o.get("proxyPassword")||void 0,o.delete("proxyPassword"));const a=new h.yc(o.get("authMechanismProperties"));if(a.has("AWS_SESSION_TOKEN")&&(n.awsSessionToken=a.get("AWS_SESSION_TOKEN"),a.delete("AWS_SESSION_TOKEN"),a.toString()?o.set("authMechanismProperties",a.toString()):o.delete("authMechanismProperties")),t.connectionOptions.connectionString=i.href,s.fleOptions?.autoEncryption){const{autoEncryption:e}=s.fleOptions,t=["kmsProviders.aws.secretAccessKey","kmsProviders.aws.sessionToken","kmsProviders.local.key","kmsProviders.azure.clientSecret","kmsProviders.gcp.privateKey",...["aws","local","azure","gcp","kmip"].map((e=>`tlsOptions.${e}.tlsCertificateKeyFilePassword`))];s.fleOptions.autoEncryption=u().omit(e,t),n.autoEncryption=u().pick(e,t)}return{connectionInfo:t,secrets:n}}const se=n(44399);function ie(e){let t;try{t=new h.ZP(e.connectionOptions.connectionString)}catch{return e}return/^mongodb compass/i.exec(t.searchParams.get("appName")||"")&&t.searchParams.delete("appName"),{...e,connectionOptions:{...e.connectionOptions,connectionString:t.href}}}function oe(e){const t=e instanceof se?e:new se(e);if(t.connectionInfo){const e=te(t.connectionInfo,t.secrets??{});return e.lastUsed&&(e.lastUsed=new Date(e.lastUsed)),ie(e)}const n={id:t._id,connectionOptions:{connectionString:t.driverUrl}};!function(e,t){const n=new h.ZP(t.connectionString),s=n.typedSearchParams();!1===e.sslValidate&&s.set("tlsAllowInvalidCertificates","true"),e.tlsAllowInvalidHostnames&&s.set("tlsAllowInvalidHostnames","true");const i=re(e.sslCA),o=re(e.sslCert),a=re(e.sslKey);i&&s.set("tlsCAFile",i),o&&o!==a&&s.set("tlsCertificateFile",o),a&&s.set("tlsCertificateKeyFile",a),e.sslPass&&s.set("tlsCertificateKeyFilePassword",e.sslPass),"true"===s.get("ssl")&&"true"===s.get("tls")&&s.delete("ssl"),t.connectionString=n.toString()}(t.driverOptions,n.connectionOptions);const s=function(e){if("NONE"===e.sshTunnel||!e.sshTunnelHostname||!e.sshTunnelUsername)return;const t={host:e.sshTunnelHostname,port:e.sshTunnelPort,username:e.sshTunnelUsername};return void 0!==e.sshTunnelPassword&&(t.password=e.sshTunnelPassword),void 0!==e.sshTunnelIdentityFile&&(t.identityKeyFile=Array.isArray(e.sshTunnelIdentityFile)?e.sshTunnelIdentityFile[0]:e.sshTunnelIdentityFile),void 0!==e.sshTunnelPassphrase&&(t.identityKeyPassphrase=e.sshTunnelPassphrase),t}(t);return s&&(n.connectionOptions.sshTunnel=s),void 0!==t.driverOptions.directConnection&&ae(n.connectionOptions,"directConnection",t.driverOptions.directConnection?"true":"false"),void 0!==t.driverOptions.readPreference&&ae(n.connectionOptions,"readPreference","string"==typeof t.driverOptions.readPreference?t.driverOptions.readPreference:t.driverOptions.readPreference.preference),t.isFavorite&&(n.favorite={name:t.name,color:t.color}),t.lastUsed&&(n.lastUsed=t.lastUsed),ie(function(e){let t;try{t=new h.ZP(e.connectionOptions.connectionString)}catch{return e}const n="true"===t.searchParams.get("loadBalanced"),s=t.isSRV||t.hosts.length>1||t.searchParams.has("replicaSet"),i=t.searchParams.has("directConnection");return s||n||i||t.searchParams.set("directConnection","true"),{...e,connectionOptions:{...e.connectionOptions,connectionString:t.href}}}(n))}function ae(e,t,n){const s=new h.ZP(e.connectionString);s.typedSearchParams().set(t,n),e.connectionString=s.toString()}function re(e){return Array.isArray(e)?e[0]:e}async function le(e){try{const t={},n=await o().promisify(se.from)(function(e){const t=new h.ZP(e),n=t.typedSearchParams();return"MONGODB-AWS"===n.get("authMechanism")&&(n.delete("authMechanism"),n.delete("authMechanismProperties")),t.href}(e.connectionOptions.connectionString));!function(e,t){const n=new h.ZP(e.connectionString).typedSearchParams(),s=n.get("tlsCAFile"),i=n.get("tlsCertificateKeyFile"),o=n.get("tlsCertificateKeyFilePassword"),a=n.get("tlsCertificateFile");s&&(t.sslCA=[s]),i&&(t.sslKey=i),o&&(t.sslPass=o),a&&(t.sslCert=a),t.sslMethod=function(e){const t=new h.ZP(e.connectionString).typedSearchParams(),n=t.get("tls")||t.get("ssl"),s=t.get("tlsAllowInvalidCertificates"),i=t.get("tlsAllowInvalidHostnames"),o=t.get("tlsInsecure"),a=t.get("tlsCAFile"),r=t.get("tlsCertificateKeyFile");return"false"===n?"NONE":r?"ALL":a?"SERVER":"true"===o||"true"===s&&"true"===i?"UNVALIDATED":"SYSTEMCA"}(e)}(e.connectionOptions,t);const s=e.connectionOptions;return s.sshTunnel&&(t.sshTunnel=s.sshTunnel.identityKeyFile?"IDENTITY_FILE":"USER_PASSWORD",t.sshTunnelPort=s.sshTunnel.port,t.sshTunnelHostname=s.sshTunnel.host,t.sshTunnelUsername=s.sshTunnel.username,t.sshTunnelPassword=s.sshTunnel.password,t.sshTunnelIdentityFile=s.sshTunnel.identityKeyFile,t.sshTunnelPassphrase=s.sshTunnel.identityKeyPassphrase),e.favorite&&(t.isFavorite=!0,t.name=e.favorite.name,t.color=e.favorite.color),e.lastUsed&&(t.lastUsed=e.lastUsed),{...n.toJSON(),...t}}catch(e){return{}}}async function ce(e){return new se({...await le(e),_id:e.id,...ne(e)})}const{log:de,mongoLogId:ue}=(0,r.default)("COMPASS-DATA-SERVICE");class he{async loadAll(){const{ConnectionCollection:e}=n(44399),t=new e,s=pe(t.fetch.bind(t));try{await s()}catch(e){return de.error(ue(1001000101),"Connection Storage","Failed to load connection, error while fetching models",{message:e.message}),[]}return t.map((e=>{try{return oe(e)}catch(e){de.error(ue(1001000102),"Connection Storage","Failed to load connection, error while converting from model",{message:e.message})}})).filter(Boolean)}async save(e){try{if(!e.id)throw new Error("id is required");if(!(0,ee.Z)(e.id))throw new Error("id must be a uuid");const t=await ce(e);await new Promise(((e,n)=>{t.save(void 0,{success:e,error:n})}))}catch(e){throw de.error(ue(1001000103),"Connection Storage","Failed to save connection",{message:e.message}),e}}async delete(e){if(e.id)try{(await ce(e)).destroy()}catch(e){throw de.error(ue(1001000104),"Connection Storage","Failed to delete connection",{message:e.message}),e}}async load(e){if(e)return(await this.loadAll()).find((t=>e===t.id))}}function pe(e){return(...t)=>new Promise(((n,s)=>{e(...t,{success:e=>{n(e)},error:(e,t)=>{s(t)}})}))}function ge(e){if(e.favorite?.name)return e.favorite.name;try{return new h.ZP(e.connectionOptions.connectionString).hosts.join(",")}catch(t){return e.connectionOptions.connectionString||"Connection"}}}}]);