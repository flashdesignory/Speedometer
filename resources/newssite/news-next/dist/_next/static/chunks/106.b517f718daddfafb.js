"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[106],{6106:function(e,t,r){r.r(t),r.d(t,{defaultParams:function(){return a},params:function(){return h}});class s{viewport={width:800,height:600};developerMode=!1;startAutomatically=!1;iterationCount=10;suites=[];tags=[];useWarmupSuite=!1;measurementMethod="raf";waitBeforeSync=0;warmupBeforeSync=0;shuffleSeed="off";constructor(e){e&&this._copyFromSearchParams(e),this.developerMode||(Object.freeze(this.viewport),Object.freeze(this))}_parseInt(e,t){let r=Number(e);if(!Number.isInteger(r)&&t)throw Error(`Invalid ${t} param: '${e}', expected int.`);return parseInt(r)}_copyFromSearchParams(e){this.viewport=this._parseViewport(e),this.startAutomatically=this._parseBooleanParam(e,"startAutomatically"),this.iterationCount=this._parseIntParam(e,"iterationCount",1),this.suites=this._parseSuites(e),this.tags=this._parseTags(e),this.developerMode=this._parseBooleanParam(e,"developerMode"),this.useWarmupSuite=this._parseBooleanParam(e,"useWarmupSuite"),this.waitBeforeSync=this._parseIntParam(e,"waitBeforeSync",0),this.warmupBeforeSync=this._parseIntParam(e,"warmupBeforeSync",0),this.measurementMethod=this._parseMeasurementMethod(e),this.shuffleSeed=this._parseShuffleSeed(e);let t=Array.from(e.keys());t.length>0&&console.error("Got unused search params",t)}_parseBooleanParam(e,t){return!!e.has(t)&&(e.delete(t),!0)}_parseIntParam(e,t,r){if(!e.has(t))return a[t];let s=this._parseInt(e.get(t),"waitBeforeSync");if(s<r)throw Error(`Invalid ${t} param: '${s}', value must be >= ${r}.`);return e.delete(t),s}_parseViewport(e){if(!e.has("viewport"))return a.viewport;let t=e.get("viewport"),[r,s]=t.split("x"),i={width:this._parseInt(r,"viewport.width"),height:this._parseInt(s,"viewport.height")};if(this.viewport.width<800||this.viewport.height<600)throw Error(`Invalid viewport param: ${t}`);return e.delete("viewport"),i}_parseSuites(e){if(e.has("suite")||e.has("suites")){if(e.has("suite")&&e.has("suites"))throw Error("Params 'suite' and 'suites' can not be used together.");let t=e.get("suite")||e.get("suites"),r=t.split(",");if(0===r.length)throw Error("No suites selected");return e.delete("suite"),e.delete("suites"),r}return a.suites}_parseTags(){if(!i.has("tags"))return a.tags;if(this.suites.length)throw Error("'suites' and 'tags' cannot be used together.");let e=i.get("tags").split(",");return i.delete("tags"),e}_parseMeasurementMethod(e){if(!e.has("measurementMethod"))return a.measurementMethod;let t=e.get("measurementMethod");if("timer"!==t&&"raf"!==t)throw Error(`Invalid measurement method: '${t}', must be either 'raf' or 'timer'.`);return e.delete("measurementMethod"),t}_parseShuffleSeed(e){if(!e.has("shuffleSeed"))return a.shuffleSeed;let t=e.get("shuffleSeed");if("off"!==t&&("generate"===t?console.log(`Generated a random suite order seed: ${t=Math.floor(1*Math.random()<<16)}`):t=parseInt(t),!Number.isInteger(t)))throw Error(`Invalid shuffle seed: '${t}', must be either 'off', 'generate' or an integer.`);return e.delete("shuffleSeed"),t}toSearchParams(e=!1){let t={...this};return t.viewport=`${this.viewport.width}x${this.viewport.height}`,e&&(delete t.suites,delete t.tags),new URLSearchParams(t).toString()}}let a=new s,i=new URLSearchParams(window.location.search),o=new s;try{o=new s(i)}catch(e){console.error("Invalid URL Param",e,"\nUsing defaults as fallback:",o),alert(`Invalid URL Param: ${e}`)}let h=o}}]);