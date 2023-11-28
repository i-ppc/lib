(function(){function t(t,i,e){this.el=t,t.remember("_paintHandler",this);var s=this,n=this.getPlugin();for(var h in this.parent=t.parent(SVG.Nested)||t.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=null,this.startPoint=null,this.lastUpdateCall=null,this.options={},this.set=new SVG.Set,this.el.draw.defaults)this.options[h]=this.el.draw.defaults[h],void 0!==e[h]&&(this.options[h]=e[h]);for(var h in n.point&&(n.pointPlugin=n.point,delete n.point),n)this[h]=n[h];i||this.parent.on("click",function(t){s.start(t)})}t.prototype.transformPoint=function(t,i){return this.p.x=t,this.p.y=i,this.p.matrixTransform(this.m.native())},t.prototype.isMobile=function(){return void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")},t.prototype.start=function(t){var i=this,e=/touch/;if(this.m=this.el.screenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset},this.options.snapToGrid*=Math.sqrt(this.m.a*this.m.a+this.m.b*this.m.b),e.test(t.type)){var s=t.touches[0].clientX,n=t.touches[0].clientY;this.startPoint=this.transformPoint(s,n)}else{var h=t.clientX-window.pageXOffset,o=t.clientY-window.pageYOffset;this.startPoint=this.transformPoint(h,o)}this.init&&this.init(t),"polyline"!=this.el.type&&this.el.fire("drawstart",{event:t,p:this.p,m:this.m}),e.test(t.type)?SVG.on(window,"touchmove.draw",function(t){i.update(t)}):SVG.on(window,"mousemove.draw",function(t){i.update(t)}),this.start=this.point},t.prototype.point=function(t){return this.point!=this.start?this.start(t):this.pointPlugin?this.pointPlugin(t):void this.stop(t)},t.prototype.stop=function(t){t&&this.update(t),this.clean&&this.clean(),SVG.off(window,"mousemove.draw"),this.parent.off("click.draw"),this.el.forget("_paintHandler"),this.el.draw=function(){},"path"==this.el.node.tagName&&this.smooth(),this.el.fire("drawstop")},t.prototype.update=function(t){!t&&this.lastUpdateCall&&(t=this.lastUpdateCall),this.lastUpdateCall=t,this.m=this.el.screenCTM().inverse(),this.calc(t),this.el.fire("drawupdate",{event:t,p:this.p,m:this.m})},t.prototype.done=function(){this.calc(),this.stop(),this.el.fire("drawdone")},t.prototype.cancel=function(){this.stop(),this.el.remove(),this.el.fire("drawcancel")},t.prototype.snapToGrid=function(t){var i=null;if(t.length)return i=[t[0]%this.options.snapToGrid,t[1]%this.options.snapToGrid],t[0]-=i[0]<this.options.snapToGrid/2?i[0]:i[0]-this.options.snapToGrid,t[1]-=i[1]<this.options.snapToGrid/2?i[1]:i[1]-this.options.snapToGrid,t;for(var e in t)i=t[e]%this.options.snapToGrid,t[e]-=(i<this.options.snapToGrid/2?i:i-this.options.snapToGrid)+(i<0?this.options.snapToGrid:0);return t},t.prototype.param=function(t,i){this.options[t]=null===i?this.el.draw.defaults[t]:i,this.update()},t.prototype.getPlugin=function(){return this.el.draw.plugins[this.el.type]},SVG.extend(SVG.Element,{draw:function(i,e,s){i instanceof Event||"string"==typeof i||(e=i,i=null);var n=this.remember("_paintHandler")||new t(this,i,e||{});return i instanceof Event&&n.start(i),n[i]&&n[i](e,s),this}}),SVG.Element.prototype.draw.defaults={snapToGrid:1,shape:""},SVG.Element.prototype.draw.extend=function(t,i){var e={};for(var s in"string"==typeof t?e[t]=i:e=t,e){var n=s.trim().split(/\s+/);for(var h in n)SVG.Element.prototype.draw.plugins[n[h]]=e[s]}},SVG.Element.prototype.draw.plugins={},SVG.Element.prototype.draw.extend("rect image",{init:function(t){var i=this.startPoint;this.el.attr({x:i.x,y:i.y,height:0,width:0})},calc:function(t){var i;i=/touch/.test(event.type)?"touchend"!=event.type?this.transformPoint(t.touches[0].clientX,t.touches[0].clientY):this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY):this.transformPoint(t.clientX,t.clientY);var e={x:this.startPoint.x,y:this.startPoint.y},s=i;e.width=s.x-e.x,e.height=s.y-e.y,this.snapToGrid(e),e.width<0&&(e.x=e.x+e.width,e.width=-e.width),e.height<0&&(e.y=e.y+e.height,e.height=-e.height),this.el.attr(e)}}),SVG.hightLight=SVG.invent({create:"line",inherit:SVG.Line,construct:{hightLight:function(t,i,e,s){return SVG.hightLight.prototype.plot.apply(this.put(new SVG.hightLight),null!=t?[t,i,e,s]:[0,0,0,0])}}});function i(t,i,e){var s=i[1],n=i[2],h=e[1]-s,o=e[2]-n;if(0!==h||0!==o){var r=((t[1]-s)*h+(t[2]-n)*o)/(h*h+o*o);r>1?(s=e[1],n=e[2]):r>0&&(s+=h*r,n+=o*r)}return(h=t[1]-s)*h+(o=t[2]-n)*o}function e(t,e){var s=t.length-1,n=[t[0]];return function t(e,s,n,h,o){for(var r,a=h,p=s+1;p<n;p++){var l=i(e[p],e[s],e[n]);l>a&&(r=p,a=l)}a>h&&(r-s>1&&t(e,s,r,h,o),o.push(e[r]),n-r>1&&t(e,r,n,h,o))}(t,0,s,e,n),n.push(t[s]),n}SVG.Element.prototype.draw.extend("path",{ppath:"",pointss:[],init:function(t){this.ppath="",this.pointss=[],this.set=new SVG.Set;var i=this.startPoint,e=["M",[i.x,i.y],[i.x,i.y]];this.el.plot(e)},calc:function(t){var i=this.startPoint,e=this.el.array().valueOf();if(/touch/.test(event.type))if("touchend"!=event.type){i=this.transformPoint(t.touches[0].clientX,t.touches[0].clientY);var s=this.snapToGrid([i.x,i.y]);this.pointss.push([s[0],s[1]]),e.push(["L",s[0],s[1]])}else{i=this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY);s=this.snapToGrid([i.x,i.y]);this.pointss.push([s[0],s[1]]),e.push(["L",s[0],s[1]])}else{i=this.transformPoint(t.clientX,t.clientY);s=this.snapToGrid([i.x,i.y]);this.pointss.push([s[0],s[1]]),e.push(["L",s[0],s[1]])}this.el.plot(e)},smooth:function(){var t=document.getElementById("canvas-2");paper.setup(t);var i=function(t,i,s){if(t.length<=2)return t;if(!function(t){for(var i=1;i<t.length;++i)if("l"===t[i][0])t[i][1]=t[i-1][1]+t[i][1],t[i][2]=t[i-1][2]+t[i][2];else if("L"!==t[i][0])return!1;return t}(t))return t;var n=void 0!==i?i*i:1;return t=e(t=s?t:function(t,i){for(var e,s,n,h,o,r=t[0],a=[r],p=1,l=t.length;p<l;p++)e=t[p],s=e,h=void 0,o=void 0,h=(n=r)[1]-s[1],o=n[2]-s[2],h*h+o*o>i&&(a.push(e),r=e);return r!==e&&a.push(e),a}(t,n),n)}(this.el.array().value,1,!0).map(function(t){return t.slice(1)}),s=new paper.Path({segments:i,strokeColor:"black",closed:!1});s.fullySelected=!0,s.simplify(10);var n=s.pathData;this.el.plot(n)},point:function(t){if(this.el.type.indexOf("poly")>-1){var i,e;/touch/.test(event.type)?"touchend"!=event.type?(e=this.transformPoint(t.touches[0].clientX,t.touches[0].clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y])))):(e=this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y])))):(e=this.transformPoint(t.clientX,t.clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y]))));var s=this.el.array().valueOf();return s.push(this.snapToGrid([i.x,i.y])),this.el.plot(s),void this.el.fire("drawpoint",{event:t,p:{x:i.x,y:i.y},m:this.m})}this.stop(t)},clean:function(){this.set.each(function(){this.remove()}),this.set.clear(),delete this.set},drawCircles:function(){var t=this.el.array().valueOf(),i=this.startPoint;this.set.each(function(){this.remove()}),this.set.clear();for(var e=0;e<t.length;++e){this.p.x=t[e][0],this.p.y=t[e][1];i=this.p.matrixTransform(this.parent.node.getScreenCTM().inverse().multiply(this.el.node.getScreenCTM()));this.set.add(this.parent.circle(5).stroke({width:1}).fill("#ccc").center(i.x,i.y))}},undo:function(){this.set.length()&&(this.set.members.splice(-2,1)[0].remove(),this.el.array().value.splice(-2,1),this.el.plot(this.el.array()),this.el.fire("undopoint"))}}),SVG.Element.prototype.draw.extend("line polyline polygon hightLight",{init:function(t){this.set=new SVG.Set;var i=this.startPoint,e=[[i.x,i.y],[i.x,i.y]];this.el.plot(e)},calc:function(t){var i=this.startPoint,e=this.el.array().valueOf();e.pop();var s;/touch/.test(event.type)?"touchend"!=event.type?(s=this.transformPoint(t.touches[0].clientX,t.touches[0].clientY),"hightLight"==this.options.shape?(i.x=s.x,e.push(this.snapToGrid([i.x,i.y]))):(i=s,e.push(this.snapToGrid([i.x,i.y])))):(s=this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY),"hightLight"==this.options.shape?(i.x=s.x,e.push(this.snapToGrid([i.x,i.y]))):(i=s,e.push(this.snapToGrid([i.x,i.y])))):(s=this.transformPoint(t.clientX,t.clientY),"hightLight"==this.options.shape?(i.x=s.x,e.push(this.snapToGrid([i.x,i.y]))):(i=s,e.push(this.snapToGrid([i.x,i.y])))),this.el.plot(e)},point:function(t){if(this.el.type.indexOf("poly")>-1){var i,e;/touch/.test(event.type)?"touchend"!=event.type?(e=this.transformPoint(t.touches[0].clientX,t.touches[0].clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y])))):(e=this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y])))):(e=this.transformPoint(t.clientX,t.clientY),"hightLight"==this.options.shape?(i.x=e.x,s.push(this.snapToGrid([i.x,i.y]))):(i=e,s.push(this.snapToGrid([i.x,i.y]))));var s=this.el.array().valueOf();return s.push(this.snapToGrid([i.x,i.y])),this.el.plot(s),void this.el.fire("drawpoint",{event:t,p:{x:i.x,y:i.y},m:this.m})}this.stop(t)},clean:function(){this.set.each(function(){this.remove()}),this.set.clear(),delete this.set},drawCircles:function(){var t=this.el.array().valueOf(),i=this.startPoint;this.set.each(function(){this.remove()}),this.set.clear();for(var e=0;e<t.length;++e){this.p.x=t[e][0],this.p.y=t[e][1];i=this.p.matrixTransform(this.parent.node.getScreenCTM().inverse().multiply(this.el.node.getScreenCTM()));this.set.add(this.parent.circle(5).stroke({width:1}).fill("#ccc").center(i.x,i.y))}},undo:function(){this.set.length()&&(this.set.members.splice(-2,1)[0].remove(),this.el.array().value.splice(-2,1),this.el.plot(this.el.array()),this.el.fire("undopoint"))}}),SVG.Element.prototype.draw.extend("circle",{init:function(t){var i=this.startPoint;this.el.attr({cx:i.x,cy:i.y,r:1})},calc:function(t){var i=this.transformPoint(t.clientX,t.clientY),e={cx:this.startPoint.x,cy:this.startPoint.y,r:Math.sqrt((i.x-this.startPoint.x)*(i.x-this.startPoint.x)+(i.y-this.startPoint.y)*(i.y-this.startPoint.y))};this.snapToGrid(e),this.el.attr(e)}}),SVG.Element.prototype.draw.extend("ellipse",{init:function(t){var i=this.startPoint;this.el.attr({cx:i.x,cy:i.y,rx:1,ry:1})},calc:function(t){var i;i=/touch/.test(event.type)?"touchend"!=event.type?this.transformPoint(t.touches[0].clientX,t.touches[0].clientY):this.transformPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY):this.transformPoint(t.clientX,t.clientY);var e={cx:this.startPoint.x,cy:this.startPoint.y,rx:Math.abs(i.x-this.startPoint.x),ry:Math.abs(i.y-this.startPoint.y)};this.snapToGrid(e),this.el.attr(e)}})}).call(this);