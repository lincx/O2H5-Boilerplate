/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.spriteSheet=a}var b=createjs.extend(a,createjs.Container);b.addChild=function(a){return null==a?a:arguments.length>1?this.addChildAt.apply(this,Array.prototype.slice.call(arguments).concat([this.children.length])):this.addChildAt(a,this.children.length)},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}if(!(a._spritestage_compatibility>=1))return console&&console.log("Error: You can only add children of type SpriteContainer, Sprite, BitmapText, or DOMElement ["+a.toString()+"]"),a;if(a._spritestage_compatibility<=4){var f=a.spriteSheet;if(!f||!f._images||f._images.length>1||this.spriteSheet&&this.spriteSheet!==f)return console&&console.log("Error: A child's spriteSheet must be equal to its parent spriteSheet and only use one image. ["+a.toString()+"]"),a;this.spriteSheet=f}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a},b.toString=function(){return"[SpriteContainer (name="+this.name+")]"},createjs.SpriteContainer=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Stage_constructor(a),this._preserveDrawingBuffer=b||!1,this._antialias=c||!1,this._viewportWidth=0,this._viewportHeight=0,this._projectionMatrix=null,this._webGLContext=null,this._webGLErrorDetected=!1,this._clearColor=null,this._maxTexturesPerDraw=1,this._maxBoxesPointsPerDraw=null,this._maxBoxesPerDraw=null,this._maxIndicesPerDraw=null,this._shaderProgram=null,this._vertices=null,this._verticesBuffer=null,this._indices=null,this._indicesBuffer=null,this._currentBoxIndex=-1,this._drawTexture=null,this._initializeWebGL()}[createjs.SpriteContainer,createjs.Sprite,createjs.BitmapText,createjs.Bitmap,createjs.DOMElement].forEach(function(a,b){a.prototype._spritestage_compatibility=b+1});var b=createjs.extend(a,createjs.Stage);a.NUM_VERTEX_PROPERTIES=5,a.POINTS_PER_BOX=4,a.NUM_VERTEX_PROPERTIES_PER_BOX=a.POINTS_PER_BOX*a.NUM_VERTEX_PROPERTIES,a.INDICES_PER_BOX=6,a.MAX_INDEX_SIZE=Math.pow(2,16),a.MAX_BOXES_POINTS_INCREMENT=a.MAX_INDEX_SIZE/4,b._get_isWebGL=function(){return!!this._webGLContext};try{Object.defineProperties(b,{isWebGL:{get:b._get_isWebGL}})}catch(c){}b.addChild=function(a){return null==a?a:arguments.length>1?this.addChildAt.apply(this,Array.prototype.slice.call(arguments).concat([this.children.length])):this.addChildAt(a,this.children.length)},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a._spritestage_compatibility>=1?!a.image&&!a.spriteSheet&&a._spritestage_compatibility<=4?(console&&console.log("Error: You can only add children that have an image or spriteSheet defined on them. ["+a.toString()+"]"),a):(a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a):(console&&console.log("Error: You can only add children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement. ["+a.toString()+"]"),a)},b.update=function(a){if(this.canvas){this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart"),this.autoClear&&this.clear();var b=this._setWebGLContext();b?this.draw(b,!1):(b=this.canvas.getContext("2d"),b.save(),this.updateContext(b),this.draw(b,!1),b.restore()),this.dispatchEvent("drawend")}},b.clear=function(){if(this.canvas){var a=this._setWebGLContext();a?a.clear(a.COLOR_BUFFER_BIT):(a=this.canvas.getContext("2d"),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1))}},b.draw=function(a,b){return"undefined"!=typeof WebGLRenderingContext&&(a===this._webGLContext||a instanceof WebGLRenderingContext)?(this._drawWebGLKids(this.children,a),!0):this.Stage_draw(a,b)},b.updateViewport=function(a,b){this._viewportWidth=a,this._viewportHeight=b,this._webGLContext&&(this._webGLContext.viewport(0,0,this._viewportWidth,this._viewportHeight),this._projectionMatrix||(this._projectionMatrix=new Float32Array([0,0,0,0,0,1,-1,1,1])),this._projectionMatrix[0]=2/a,this._projectionMatrix[4]=-2/b)},b.clearImageTexture=function(a){a.__easeljs_texture=null},b.toString=function(){return"[SpriteStage (name="+this.name+")]"},b._initializeWebGL=function(){this._clearColor={r:0,g:0,b:0,a:0},this._setWebGLContext()},b._setWebGLContext=function(){return this.canvas?this._webGLContext&&this._webGLContext.canvas===this.canvas||this._initializeWebGLContext():this._webGLContext=null,this._webGLContext},b._initializeWebGLContext=function(){var a={depth:!1,alpha:!0,preserveDrawingBuffer:this._preserveDrawingBuffer,antialias:this._antialias,premultipliedAlpha:!0},b=this._webGLContext=this.canvas.getContext("webgl",a)||this.canvas.getContext("experimental-webgl",a);if(b){if(this._maxTexturesPerDraw=1,this._setClearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a),b.enable(b.BLEND),b.blendFuncSeparate(b.SRC_ALPHA,b.ONE_MINUS_SRC_ALPHA,b.ONE,b.ONE_MINUS_SRC_ALPHA),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this._createShaderProgram(b),this._webGLErrorDetected)return void(this._webGLContext=null);this._createBuffers(b),this.updateViewport(this._viewportWidth||this.canvas.width||0,this._viewportHeight||this.canvas.height||0)}},b._setClearColor=function(a,b,c,d){this._clearColor.r=a,this._clearColor.g=b,this._clearColor.b=c,this._clearColor.a=d,this._webGLContext&&this._webGLContext.clearColor(a,b,c,d)},b._createShaderProgram=function(a){var b=this._createShader(a,a.FRAGMENT_SHADER,"precision mediump float;uniform sampler2D uSampler0;varying vec3 vTextureCoord;void main(void) {vec4 color = texture2D(uSampler0, vTextureCoord.st);gl_FragColor = vec4(color.rgb, color.a * vTextureCoord.z);}"),c=this._createShader(a,a.VERTEX_SHADER,"attribute vec2 aVertexPosition;attribute vec3 aTextureCoord;uniform mat3 uPMatrix;varying vec3 vTextureCoord;void main(void) {vTextureCoord = aTextureCoord;gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}");if(!this._webGLErrorDetected&&b&&c){var d=a.createProgram();if(a.attachShader(d,b),a.attachShader(d,c),a.linkProgram(d),!a.getProgramParameter(d,a.LINK_STATUS))return void(this._webGLErrorDetected=!0);d.vertexPositionAttribute=a.getAttribLocation(d,"aVertexPosition"),d.textureCoordAttribute=a.getAttribLocation(d,"aTextureCoord"),d.sampler0uniform=a.getUniformLocation(d,"uSampler0"),a.enableVertexAttribArray(d.vertexPositionAttribute),a.enableVertexAttribArray(d.textureCoordAttribute),d.pMatrixUniform=a.getUniformLocation(d,"uPMatrix"),a.useProgram(d),this._shaderProgram=d}},b._createShader=function(a,b,c){var d=a.createShader(b);return a.shaderSource(d,c),a.compileShader(d),a.getShaderParameter(d,a.COMPILE_STATUS)?d:(this._webGLErrorDetected=!0,null)},b._createBuffers=function(b){this._verticesBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer);var c=4*a.NUM_VERTEX_PROPERTIES;b.vertexAttribPointer(this._shaderProgram.vertexPositionAttribute,2,b.FLOAT,b.FALSE,c,0),b.vertexAttribPointer(this._shaderProgram.textureCoordAttribute,3,b.FLOAT,b.FALSE,c,8),this._indicesBuffer=b.createBuffer(),this._setMaxBoxesPoints(b,a.MAX_BOXES_POINTS_INCREMENT)},b._setMaxBoxesPoints=function(b,c){this._maxBoxesPointsPerDraw=c,this._maxBoxesPerDraw=this._maxBoxesPointsPerDraw/a.POINTS_PER_BOX|0,this._maxIndicesPerDraw=this._maxBoxesPerDraw*a.INDICES_PER_BOX,b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer),this._vertices=new Float32Array(this._maxBoxesPerDraw*a.NUM_VERTEX_PROPERTIES_PER_BOX),b.bufferData(b.ARRAY_BUFFER,this._vertices,b.DYNAMIC_DRAW),this._indices=new Uint16Array(this._maxIndicesPerDraw);for(var d=0,e=this._indices.length;e>d;d+=a.INDICES_PER_BOX){var f=d*a.POINTS_PER_BOX/a.INDICES_PER_BOX;this._indices[d]=f,this._indices[d+1]=f+1,this._indices[d+2]=f+2,this._indices[d+3]=f,this._indices[d+4]=f+2,this._indices[d+5]=f+3}b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indicesBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this._indices,b.STATIC_DRAW)},b._setupImageTexture=function(a,b){if(b&&(b.naturalWidth||b.getContext||b.readyState>=2)){var c=b.__easeljs_texture;return c||(c=b.__easeljs_texture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,c),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)),c}},b._drawWebGLKids=function(b,c,d){for(var e,f,g=this.snapToPixelEnabled,h=null,i=0,j=0,k=0,l=0,m=this._vertices,n=a.NUM_VERTEX_PROPERTIES_PER_BOX,o=a.MAX_INDEX_SIZE,p=this._maxBoxesPerDraw-1,q=0,r=b.length;r>q;q++)if(e=b[q],e.isVisible()){var h=e.image||e.spriteSheet&&e.spriteSheet._images[0],s=h.__easeljs_texture;if(s||(s=this._setupImageTexture(c,h))){f=e._props.matrix,f=(d?f.copy(d):f.identity()).appendTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY);var t=0,u=1,v=0,w=1;if(4===e._spritestage_compatibility)i=0,j=0,k=h.width,l=h.height;else if(2===e._spritestage_compatibility){var x=e.spriteSheet.getFrame(e.currentFrame),y=x.rect;i=-x.regX,j=-x.regY,k=i+y.width,l=j+y.height,t=y.x/h.width,v=y.y/h.height,u=t+y.width/h.width,w=v+y.height/h.height}else h=null,3===e._spritestage_compatibility&&e._updateText();if(!d&&e._spritestage_compatibility<=4&&s!==this._drawTexture&&(this._drawToGPU(c),this._drawTexture=s),null!==h){var z=++this._currentBoxIndex*n,A=f.a,B=f.b,C=f.c,D=f.d,E=f.tx,F=f.ty;g&&e.snapToPixel&&(E=E+(0>E?-.5:.5)|0,F=F+(0>F?-.5:.5)|0),m[z]=i*A+j*C+E,m[z+1]=i*B+j*D+F,m[z+5]=i*A+l*C+E,m[z+6]=i*B+l*D+F,m[z+10]=k*A+l*C+E,m[z+11]=k*B+l*D+F,m[z+15]=k*A+j*C+E,m[z+16]=k*B+j*D+F,m[z+2]=m[z+7]=t,m[z+12]=m[z+17]=u,m[z+3]=m[z+18]=v,m[z+8]=m[z+13]=w,m[z+4]=m[z+9]=m[z+14]=m[z+19]=e.alpha,this._currentBoxIndex===p&&(this._drawToGPU(c),this._drawTexture=s,this._maxBoxesPointsPerDraw<o&&(this._setMaxBoxesPoints(c,this._maxBoxesPointsPerDraw+a.MAX_BOXES_POINTS_INCREMENT),p=this._maxBoxesPerDraw-1))}e.children&&(this._drawWebGLKids(e.children,c,f),p=this._maxBoxesPerDraw-1)}}d||this._drawToGPU(c)},b._drawToGPU=function(b){if(this._drawTexture){var c=this._currentBoxIndex+1;b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this._drawTexture),b.uniform1i(this._shaderProgram.sampler0uniform,0),b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indicesBuffer),b.uniformMatrix3fv(this._shaderProgram.pMatrixUniform,!1,this._projectionMatrix),b.bufferSubData(b.ARRAY_BUFFER,0,this._vertices),b.drawElements(b.TRIANGLES,c*a.INDICES_PER_BOX,b.UNSIGNED_SHORT,0),this._currentBoxIndex=-1,this._drawTexture=null}},createjs.SpriteStage=createjs.promote(a,"Stage")}();
