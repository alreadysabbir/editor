(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{200:function(e,t,n){},201:function(e,t,n){"use strict";n.r(t);var a=n(25),r=n(8);a.b.add(r.a,r.g,r.p,r.l,r.i,r.j,r.f,r.k,r.h,r.q,r.m,r.n,r.e,r.c,r.d,r.b,r.o)},202:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(23),o=n.n(i),l=(n(92),n(75)),c=n(76),u=n(85),s=n(77),d=n(24),m=n(86),f=n(18),p=n(3),v=n(81),h=n(53),k=n.n(h),y=n(82),g=n.n(y);function b(){return JSON.parse(localStorage.getItem("content"))}function w(e,t,n){n&&e.select(n),e.insertBlock({type:"image",data:{src:t}}).moveFocusToEndOfDocument()}function E(e,t,n){n&&e.select(n),console.log(e),window.editor=e,window.selectedFile={type:"file",data:t},e.insertBlock({type:"file",data:t}).moveFocusToEndOfDocument()}function O(e){return v.includes(function(e){return new URL(e).pathname.split(".").pop()}(e))}function L(e,t,n){var a=Object(f.b)(e,t);n(e.target.files,t,a)}function C(e,t,n){var a=!0,r=!1,i=void 0;try{for(var o,l=function(){var e=o.value,a=new FileReader;a.addEventListener("load",function(){t.command(w,a.result,n)}),a.readAsDataURL(e)},c=e[Symbol.iterator]();!(a=(o=c.next()).done);a=!0)l()}catch(u){r=!0,i=u}finally{try{a||null==c.return||c.return()}finally{if(r)throw i}}}function D(e,t,n){var a=!0,r=!1,i=void 0;try{for(var o,l=function(){var e=o.value,a=new FileReader,r={name:e.name,size:g()(e.size,{round:0}),type:e.type};a.readAsDataURL(e),a.addEventListener("load",function(){r.src=a.result,t.command(E,r,n)})},c=e[Symbol.iterator]();!(a=(o=c.next()).done);a=!0)l()}catch(u){r=!0,i=u}finally{try{a||null==c.return||c.return()}finally{if(r)throw i}}}function B(e,t,n){var a=Object(f.b)(e,t);if(!a&&"drop"===e.type)return n();var r=Object(f.c)(e),i=r.type,o=r.text,l=r.files;if("files"!==i)return"text"===i?k()(o)&&O(o)?void t.command(w,o,a):n():void n();C(l,t,a)}function j(e,t){e.wrapInline({type:"link",data:{href:t}}),e.moveToEnd()}function R(e){e.unwrapInline("link")}function x(e,t,n){if(t.value.selection.isCollapsed)return n();var a=Object(f.c)(e),r=a.type,i=a.text;return"text"!==r&&"html"!==r?n():k()(i)?(this.hasLinks()&&t.command(R),void t.command(j,i)):n()}function I(e){!confirm("Download ".concat(name,"?"))&&e.preventDefault()}var F=n(54);function S(e){var t=e.children;return r.a.createElement("div",{className:"toolbar"},t)}function M(e){var t=e.onClick,n=e.icon,a=e.active?"#000":"#777";return r.a.createElement("button",{title:n,className:"toolbar-button",onMouseDown:t},r.a.createElement(F.a,{icon:n,size:"2x",color:a}))}function N(e){var t=e.src,n=e.name,a=e.size,i="application/pdf"===e.type?"file-pdf":"file";return r.a.createElement("a",{title:"click to download",className:"file",download:n,href:t,onClick:I},r.a.createElement(F.a,{icon:i,size:"2x"})," ",n," (",a,")")}var _=n(83),z={document:{last:{type:"paragraph"},normalize:function(e,t){var n=t.code,a=t.node;if(t.child,"last_child_type_invalid"===n){var r=p.a.create("paragraph");return e.insertNodeByKey(a.key,a.nodes.size,r)}}},blocks:{image:{isVoid:!0},file:{isVoid:!0}}},U=n(12),J=n(84);var K=[function(e){var t=Object(U.isKeyHotkey)("mod+b"),n=Object(U.isKeyHotkey)("mod+i"),a=Object(U.isKeyHotkey)("mod+u"),r=Object(U.isKeyHotkey)("mod+s"),i=Object(U.isHotkey)("tab");return{onKeyDown:function(e,o,l){var c;if(t(e))c="bold";else if(n(e))c="italic";else{if(!a(e))return r(e)?(e.preventDefault(),l()):i(e)?(e.preventDefault(),function(e){var t=e.value,n=t.document,a=t.startBlock,r=n.getParent(a.key),i=n.getDepth(r.key);r&&(i>4||e.increaseListItemDepth())}(o)):l();c="underlined"}e.preventDefault(),o.toggleMark(c)}}}(),{onPaste:x},{onDrop:B,onPaste:B},Object(J.a)({blocks:{ordered_list:"ordered-list",unordered_list:"unordered-list",list_item:"list-item"},classNames:{ordered_list:"ordered-list",unordered_list:"unordered-list",list_item:"list-item"}})];n(200);n(201);var T=b(),q="paragraph",H=["ordered-list","unordered-list"],A=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).state={value:p.m.fromJSON(T||_),limit:10},e.onRedo=function(t){t.preventDefault(),e.editor.redo()},e.onUndo=function(t){t.preventDefault(),e.editor.undo()},e.onSave=function(t){t.preventDefault(),e.isLimitReached()&&alert("Maximum Limit Reached!"),function(e){var t=JSON.stringify(e.toJSON());localStorage.setItem("content",t)}(e.state.value),T=b()},e.onRestore=function(t){if(t.preventDefault(),T){var n,a,r=p.m.fromJSON(T);a=e.state,r.document!==a.value.document&&(n=confirm("Document has changed! Are you sure?")),n&&e.setState({value:r})}},e.onLink=function(t){t.preventDefault();var n=Object(d.a)(e).editor,a=n.value;if(e.hasLinks())n.command(R);else if(a.selection.isExpanded){var r=window.prompt("Enter the URL of the link:");if(null==r)return;n.command(j,r)}else{var i=window.prompt("Enter the URL of the link:");if(null==i)return;var o=window.prompt("Enter the text for the link:");if(null==o)return;n.insertText(o).moveFocusBackward(o.length).command(j,i)}},e.onImage=function(t){t.preventDefault();var n=window.prompt("Enter the URL of the image:");n&&e.editor.command(w,n)},e.onChange=function(t){var n=t.value;e.setState({value:n})},e.onOpenImage=function(t){t.preventDefault(),e.inputImageFile.current.click()},e.onOpenFile=function(t){t.preventDefault(),e.inputFile.current.click()},e.onImageFileSelect=function(t){L(t,e.editor,C)},e.onFileSelect=function(t){L(t,e.editor,D)},e.onClickBlock=function(t,n){t.preventDefault();var a=Object(d.a)(e).editor,r=e.hasBlock(n);H.includes(n)?e.isList()?a.unwrapList():a.wrapList({type:n}):a.setBlocks(r?q:n)},e.onClickMark=function(t,n){t.preventDefault(),e.editor.toggleMark(n)},e.isList=function(){return e.state.value.blocks.some(function(e){return"list-item-child"===e.type})},e.hasMark=function(t){return e.state.value.activeMarks.some(function(e){return e.type===t})},e.hasBlock=function(t){return e.state.value.blocks.some(function(e){return e.type===t})},e.hasLinks=function(){return e.state.value.inlines.some(function(e){return"link"===e.type})},e.ref=function(t){e.editor=t},e.isLimitReached=function(){return e.state.value.document.nodes.size>=e.state.limit},e.onLimitChange=function(t){e.setState({limit:t.target.value})},e.renderToolbar=function(){return r.a.createElement(S,null,r.a.createElement(M,{icon:"save",active:!e.isLimitReached(),onClick:e.onSave}),r.a.createElement(M,{icon:"trash",onClick:e.onRestore}),r.a.createElement(M,{icon:"undo",onClick:e.onUndo}),r.a.createElement(M,{icon:"redo",onClick:e.onRedo}),e.renderMarkButton("bold","bold"),e.renderMarkButton("italic","italic"),e.renderMarkButton("underlined","underline"),e.renderBlockButton("block-quote","quote-right"),e.renderBlockButton("ordered-list","list-ol"),e.renderBlockButton("unordered-list","list-ul"),r.a.createElement(M,{icon:"images",onClick:e.onImage}),r.a.createElement(M,{icon:"file-image",onClick:e.onOpenImage}),r.a.createElement(M,{icon:"file-upload",onClick:e.onOpenFile}),r.a.createElement(M,{icon:"link",onClick:e.onLink}),r.a.createElement("input",{type:"number",style:{width:"35px",padding:"10px"},value:e.state.limit,onChange:e.onLimitChange}),r.a.createElement("span",null,"<-- limit"),e.inputRenderer())},e.inputRenderer=function(){return r.a.createElement("div",null,r.a.createElement("input",{ref:e.inputImageFile,type:"file",style:{display:"none"},onChange:e.onImageFileSelect,accept:"image/*"}),r.a.createElement("input",{ref:e.inputFile,type:"file",style:{display:"none"},onChange:e.onFileSelect,accept:"application/pdf,text/plain"}))},e.nodesRenderer=function(e,t,n){var a=e.attributes,i=e.children,o=e.node,l=e.isFocused;switch(o.type){case"block-quote":return r.a.createElement("blockquote",a,i);case"unorderd-list":return r.a.createElement("ul",a,i);case"ordered-list":return r.a.createElement("ol",a,i);case"list-item":return r.a.createElement("li",a,i);case"image":var c=o.data.get("src");return r.a.createElement("img",Object.assign({src:c,selected:l},a,{alt:"",className:"image-node"}));case"link":var u=o.data.get("href");return r.a.createElement("a",Object.assign({},a,{href:u,onMouseDown:function(e){return window.open(u,"_blank")}}),i);case"file":var s=o.data.toObject();return r.a.createElement(N,s);default:return n()}},e.renderMark=function(e,t,n){var a=e.children,i=e.mark,o=e.attributes;switch(i.type){case"bold":return r.a.createElement("strong",o,a);case"italic":return r.a.createElement("em",o,a);case"underlined":return r.a.createElement("u",o,a);default:return n()}},e.renderMarkButton=function(t,n){var a=e.hasMark(t);return r.a.createElement(M,{icon:n,active:a,onClick:function(n){return e.onClickMark(n,t)}})},e.renderBlockButton=function(t,n){return r.a.createElement(M,{icon:n,active:!1,onClick:function(n){return e.onClickBlock(n,t)}})},e.inputImageFile=r.a.createRef(),e.inputFile=r.a.createRef(),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"appcontainer"},this.renderToolbar(),r.a.createElement("div",{className:"editor"},r.a.createElement(f.a,{spellCheck:!0,autoFocus:!0,plugins:K,schema:z,placeholder:"Start typing...",value:this.state.value,onChange:this.onChange,renderNode:this.nodesRenderer,renderMark:this.renderMark,ref:this.ref})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e){e.exports={document:{nodes:[{object:"block",type:"paragraph",nodes:[{object:"text",leaves:[{text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}]}]}]}}},87:function(e,t,n){e.exports=n(202)},92:function(e,t,n){}},[[87,1,2]]]);
//# sourceMappingURL=main.55b58808.chunk.js.map