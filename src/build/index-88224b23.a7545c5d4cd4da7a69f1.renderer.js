(global.webpackChunkMongoDBCompass=global.webpackChunkMongoDBCompass||[]).push([[396],{87295:(n,o,r)=>{n.exports=r(709)},709:(n,o,r)=>{const e=r(97699),t=r(24290),s=r(65705),i=r(73837).format,{log:u,mongoLogId:g}=r(6909).createLoggerAndTelemetry("COMPASS-MIGRATIONS");n.exports=function(n){return function(o,r,a){var l;if(e.lt(o,r))return l=s.pickBy(n,(function(n,t){return e.gt(t,o)&&e.lte(t,r)})),l=s.mapValues(l,(function(n){return n.bind(null,o,r)})),u.info(g(1001000070),"Migrations","Considering upgrade migration",{previousVersion:o,currentVersion:r,tasks:s.keys(l)}),t.series(l,a);if(e.gt(o,r)){l=s.pickBy(n,(function(n,t){return e.gt(t,r)&&e.lte(t,o)}));const t=s.keys(l).length>0;if(u.info(g(1001000071),"Migrations","Encountered version downgrade",{previousVersion:o,currentVersion:r,downgradePossible:t}),t)return a(new Error(i("Downgrade from version %s to %s not possible.",o,r)))}a(null,{})}}}}]);