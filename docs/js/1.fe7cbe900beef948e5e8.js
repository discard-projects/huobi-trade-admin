webpackJsonp([1],{GsIs:function(t,e,n){"use strict";var i=n("Mr+r"),r=n("cM3n");t.exports=function(t,e,n){e in t?i.f(t,e,r(0,n)):t[e]=n}},IHPB:function(t,e,n){"use strict";e.__esModule=!0;var i,r=n("kfHR"),o=(i=r)&&i.__esModule?i:{default:i};e.default=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,o.default)(t)}},KvGc:function(t,e,n){"use strict";var i=n("mR54"),r=n("8leu"),o=n("Myb3"),a=n("Bhet"),s=n("kWAb"),l=n("1bUF"),c=n("GsIs"),u=n("d+Iz");r(r.S+r.F*!n("epm+")(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,r,f,d=o(t),h="function"==typeof this?this:Array,m=arguments.length,p=m>1?arguments[1]:void 0,b=void 0!==p,v=0,_=u(d);if(b&&(p=i(p,m>2?arguments[2]:void 0,2)),void 0==_||h==Array&&s(_))for(n=new h(e=l(d.length));e>v;v++)c(n,v,b?p(d[v],v):d[v]);else for(f=_.call(d),n=new h;!(r=f.next()).done;v++)c(n,v,b?a(f,p,[r.value,v],!0):r.value);return n.length=v,n}})},gnKM:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("aA9S"),r=n.n(i),o=n("AISp"),a=n("gMjF"),s={mixins:[a.a]},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"名称",prop:"name"}},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:t.uploading,disabled:t.fetching},on:{click:function(e){return t.onSubmit("form")}}},[t._v(t._s(t.form.id?"更新":"创建"))]),t._v(" "),t.form.id?t._e():n("el-button",{on:{click:function(e){return t.onReset("form")}}},[t._v("重置")])],1)],1)},staticRenderFns:[]},c=n("C7Lr")(s,l,!1,null,null,null).exports,u={data:function(){return{dialogVisible:!0,form:{name:""}}},methods:{handler:function(){var t=this;return this.api.createRole(this.form).then(function(e){e.data;t.$root.owner.fetchData(),t.$ext.unmount(t)})}},components:{innerForm:c}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"新增",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("inner-form",{attrs:{form:t.form,handler:t.handler}})],1)},staticRenderFns:[]},d=n("C7Lr")(u,f,!1,null,null,null).exports,h=n("gf7+"),m={mixins:[h.a],methods:{fetchData:function(){return this._fetchData(this.api.getRole(this.item.id))},handler:function(){return this._handler(this.api.updateRole(this.item.id,this.form))}},components:{innerForm:c}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"编辑",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("inner-form",{attrs:{form:t.form,handler:t.handler,fetching:t.fetching}})],1)},staticRenderFns:[]},b=n("C7Lr")(m,p,!1,null,null,null).exports,v=n("4YfN"),_=n.n(v),g=n("IHPB"),x=n.n(g),y={mixins:[a.a]},k={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"名称",prop:"name"}},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:t.uploading,disabled:t.fetching},on:{click:function(e){return t.onSubmit("form")}}},[t._v(t._s(t.form.id?"更新":"创建"))]),t._v(" "),t.form.id?t._e():n("el-button",{on:{click:function(e){return t.onReset("form")}}},[t._v("重置")])],1)],1)},staticRenderFns:[]},$=n("C7Lr")(y,k,!1,null,null,null).exports,w={data:function(){return{dialogVisible:!0,form:{name:""}}},methods:{handler:function(){var t=this;return this.api.createRole(this.form).then(function(e){e.data;t.$root.owner.fetchData(),t.$ext.unmount(t)})}},components:{innerForm:$}},D={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"新增",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("inner-form",{attrs:{form:t.form,handler:t.handler}})],1)},staticRenderFns:[]},R=n("C7Lr")(w,D,!1,null,null,null).exports,I={mixins:[h.a],methods:{fetchData:function(){return this._fetchData(this.api.getRole(this.item.id))},handler:function(){return this._handler(this.api.updateRole(this.item.id,this.form))}},components:{innerForm:$}},F={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"编辑",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("inner-form",{attrs:{form:t.form,handler:t.handler,fetching:t.fetching}})],1)},staticRenderFns:[]},T=n("C7Lr")(I,F,!1,null,null,null).exports,E={mixins:[o.a],props:{item:{require:!0}},data:function(){return{footprints:[]}},methods:{fetchData:function(){this._fetchData(this.api.getPermissions(r()({},this.mixTableParams,{q_roles_id_in_any:[this.item.id]})))},showNewDialog:function(){this.$ext.mount(R,{onEl:this.$el,data:{owner:this}})},fetchItemFootprints:function(t){var e=this;this.api.getRoleFootprints(t.id).then(function(t){e.footprints=t.data.items})},showEditDialog:function(t){this.$ext.mount(T,{onEl:this.$el,props:{item:t},data:{owner:this}})},destroy:function(t){var e=this;this.$confirm("确定要删除该条信息吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",callback:function(n){"confirm"===n&&(e.$set(t,"deleting",!0),e.api.deleteRole(t.id).then(function(n){e.$set(t,"deleting",!1),e.$message.success("删除成功了！"),e.fetchData()}).catch(function(n){console.error(n),e.$message.error("删除报错了！"),e.$set(t,"deleting",!1)}))}})},updatePosition:function(t,e){console.log(t,e)}},created:function(){this.mixTableData=r()(this.mixTableData,{queryIntros:[{control:"input",key:"q_name_cont",placeholder:"名称"}],dataIntros:[{label:"#",key:"id",width:80},{label:"名称",key:"name"},{label:"创建时间",key:"created_time"},{label:"更新时间",key:"updated_time"}],opIntro:{label:"操作",width:180}})}},C={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ex-table",{attrs:{tableData:t.mixTableData},on:{refetch:t.fetchData},scopedSlots:t._u([{key:"search-bar-item",fn:function(e){var i=e.search;return[n("el-form-item",{key:i.key,attrs:{label:i.label}},[n("ex-options-select",{attrs:{options:[{label:"工作者",value:"category_worker"}]},model:{value:t.mixTableData.query[i.key],callback:function(e){t.$set(t.mixTableData.query,i.key,e)},expression:"mixTableData.query[search.key]"}})],1)]}},{key:"id",fn:function(e){var i=e.row;return e.$index,e.intro,[n("el-button",{attrs:{type:"text"},on:{click:function(e){return t.$refs.footprintRef.showDialog(i)}}},[t._v(t._s(i.id))])]}},{key:"cover",fn:function(t){var e=t.row;return t.$index,t.intro,[n("img",{staticStyle:{"max-width":"50px","max-height":"50px"},attrs:{src:e.cover_link,alt:""}})]}},{key:"table-operations",fn:function(e){var i=e.row;return e.$index,e.intro,[n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.showEditDialog(i)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",loading:i.deleting},on:{click:function(e){return t.destroy(i)}}},[t._v("删除")])]}}])},[t._v(" "),n("div",{attrs:{slot:"search-bar-operations"},slot:"search-bar-operations"},[n("el-button",{attrs:{size:"small"},on:{click:t.showNewDialog}},[t._v("新增")]),t._v(" "),n("footprint",{ref:"footprintRef",attrs:{footprints:t.footprints},on:{fetchItemFootprints:t.fetchItemFootprints,"update:footprints":function(e){t.footprints=e}}})],1)])],1)},staticRenderFns:[]},P=n("C7Lr")(E,C,!1,null,null,null).exports,q={props:{item:{type:Object,required:!0}},data:function(){return{dialogVisible:!0,treeData:null,selectedIds:[]}},methods:{fetchDataTree:function(){var t=this;this.api.getPermissionTree({per_page:99999999999,role_id:this.item.id}).then(function(e){t.treeData=e.data.items,t.selectedIds=e.data.leaf_checked_permission_ids,t.$nextTick(function(){t.$refs.treeRef.setCheckedKeys(t.selectedIds,!1)})})},handleCheckChange:function(t,e,n){e?-1===this.selectedIds.indexOf(t.id)&&this.selectedIds.push(t.id):this.selectedIds=this.selectedIds.filter(function(e){return e!==t.id})},updatePermissions:function(){var t=this,e=[].concat(x()(this.$refs.treeRef.getCheckedKeys()),x()(this.$refs.treeRef.getHalfCheckedKeys()));this.api.updateRole(this.item.id,r()(_()({},this.item),{permission_ids:e})).then(function(e){t.$root.owner.fetchData(),t.$ext.unmount(t)})}},mounted:function(){var t=this;this.$nextTick(function(){t.fetchDataTree()})},components:{PermissionIndex:P}},V={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"权限列表",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-tree",{ref:"treeRef",attrs:{data:t.treeData,"show-checkbox":"","default-expand-all":"","node-key":"id"},scopedSlots:t._u([{key:"default",fn:function(e){e.node;var i=e.data;return n("span",{},[n("span",[t._v(t._s(i.name))])])}}])}),t._v(" "),n("div",{staticStyle:{margin:"40px 20px 0","text-align":"right"}},[n("el-button",{attrs:{type:"success"},on:{click:t.updatePermissions}},[t._v("更新权限")])],1)],1)},staticRenderFns:[]},A=n("C7Lr")(q,V,!1,null,null,null).exports,M={mixins:[o.a],data:function(){return{footprints:[]}},methods:{fetchData:function(){this._fetchData(this.api.getRoles(this.mixTableParams))},showNewDialog:function(){this.$ext.mount(d,{onEl:this.$el,data:{owner:this}})},showPermissionDialog:function(t){this.$ext.mount(A,{onEl:this.$el,props:{item:t},data:{owner:this}})},fetchItemFootprints:function(t){var e=this;this.api.getRoleFootprints(t.id).then(function(t){e.footprints=t.data.items})},showEditDialog:function(t){this.$ext.mount(b,{onEl:this.$el,props:{item:t},data:{owner:this}})},destroy:function(t){var e=this;this.$confirm("确定要删除该条信息吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",callback:function(n){"confirm"===n&&(e.$set(t,"deleting",!0),e.api.deleteRole(t.id).then(function(n){e.$set(t,"deleting",!1),e.$message.success("删除成功了！"),e.fetchData()}).catch(function(n){console.error(n),e.$message.error("删除报错了！"),e.$set(t,"deleting",!1)}))}})},updatePosition:function(t,e){console.log(t,e)}},created:function(){this.mixTableData=r()(this.mixTableData,{queryIntros:[{control:"input",key:"q_name_cont",placeholder:"名称"}],dataIntros:[{label:"#",key:"id",width:80},{label:"名称",key:"name"},{label:"创建时间",key:"created_time"},{label:"更新时间",key:"updated_time"}],opIntro:{label:"操作",width:180}})}},S={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ex-table",{attrs:{tableData:t.mixTableData},on:{refetch:t.fetchData},scopedSlots:t._u([{key:"search-bar-item",fn:function(e){var i=e.search;return[n("el-form-item",{key:i.key,attrs:{label:i.label}},[n("ex-options-select",{attrs:{options:[{label:"工作者",value:"category_worker"}]},model:{value:t.mixTableData.query[i.key],callback:function(e){t.$set(t.mixTableData.query,i.key,e)},expression:"mixTableData.query[search.key]"}})],1)]}},{key:"id",fn:function(e){var i=e.row;return e.$index,e.intro,[n("el-button",{attrs:{type:"text"},on:{click:function(e){return t.$refs.footprintRef.showDialog(i)}}},[t._v(t._s(i.id))])]}},{key:"cover",fn:function(t){var e=t.row;return t.$index,t.intro,[n("img",{staticStyle:{"max-width":"50px","max-height":"50px"},attrs:{src:e.cover_link,alt:""}})]}},{key:"table-operations",fn:function(e){var i=e.row;return e.$index,e.intro,[n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.showEditDialog(i)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.showPermissionDialog(i)}}},[t._v("管理权限")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",loading:i.deleting},on:{click:function(e){return t.destroy(i)}}},[t._v("删除")])]}}])},[t._v(" "),n("div",{attrs:{slot:"search-bar-operations"},slot:"search-bar-operations"},[n("el-button",{attrs:{size:"small"},on:{click:t.showNewDialog}},[t._v("新增")]),t._v(" "),n("footprint",{ref:"footprintRef",attrs:{footprints:t.footprints},on:{fetchItemFootprints:t.fetchItemFootprints,"update:footprints":function(e){t.footprints=e}}})],1)])],1)},staticRenderFns:[]},L=n("C7Lr")(M,S,!1,null,null,null);e.default=L.exports},kfHR:function(t,e,n){t.exports={default:n("lX5M"),__esModule:!0}},lX5M:function(t,e,n){n("mxCW"),n("KvGc"),t.exports=n("Rv9F").Array.from}});