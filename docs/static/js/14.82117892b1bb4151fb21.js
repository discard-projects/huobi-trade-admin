webpackJsonp([14],{CS1W:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("aA9S"),i=a.n(n),l=a("AISp"),r={mixins:[a("gMjF").a]},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"拼音",prop:"pinyin"}},[a("el-input",{model:{value:e.form.pinyin,callback:function(t){e.$set(e.form,"pinyin",t)},expression:"form.pinyin"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"地区"}},[a("ex-model-select",{attrs:{api:"/dic/areas",labelKey:"name"},model:{value:e.form.dic_area_id,callback:function(t){e.$set(e.form,"dic_area_id",t)},expression:"form.dic_area_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"经度",prop:"lng"}},[a("el-input",{model:{value:e.form.lng,callback:function(t){e.$set(e.form,"lng",t)},expression:"form.lng"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"纬度",prop:"lat"}},[a("el-input",{model:{value:e.form.lat,callback:function(t){e.$set(e.form,"lat",t)},expression:"form.lat"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"地址",prop:"address"}},[a("el-input",{attrs:{type:"textarea",placeholder:"添加描述"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.uploading,disabled:e.fetching},on:{click:function(t){return e.onSubmit("form")}}},[e._v(e._s(e.form.id?"更新":"创建"))]),e._v(" "),e.form.id?e._e():a("el-button",{on:{click:function(t){return e.onReset("form")}}},[e._v("重置")])],1)],1)},staticRenderFns:[]},s=a("C7Lr")(r,o,!1,null,null,null).exports,c={data:function(){return{dialogVisible:!0,form:{name:"",pinyin:"",address:"",dic_area_id:"",lng:"",lat:""}}},methods:{handler:function(){var e=this;return this.api.createDicHospital(this.form).then(function(t){t.data;e.$root.owner.fetchData(),e.$ext.unmount(e)})}},components:{innerForm:s}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"新增",visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("inner-form",{attrs:{form:e.form,handler:e.handler}})],1)},staticRenderFns:[]},d=a("C7Lr")(c,m,!1,null,null,null).exports,u={mixins:[a("gf7+").a],methods:{fetchData:function(){return this._fetchData(this.api.getDicHospital(this.item.id))},handler:function(){return this._handler(this.api.updateDicHospital(this.item.id,this.form))}},components:{innerForm:s}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"编辑",visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("inner-form",{attrs:{form:e.form,handler:e.handler,fetching:e.fetching}})],1)},staticRenderFns:[]},p=a("C7Lr")(u,f,!1,null,null,null).exports,h={mixins:[l.a],methods:{fetchData:function(){this._fetchData(this.api.getDicHospitals(this.mixTableParams))},showNewDialog:function(){this.$ext.mount(d,{onEl:this.$el,data:{owner:this}})},showEditDialog:function(e){this.$ext.mount(p,{onEl:this.$el,props:{item:e},data:{owner:this}})},destroy:function(e){var t=this;this.$confirm("确定要删除该条信息吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",callback:function(a){"confirm"===a&&(t.$set(e,"deleting",!0),t.api.deleteDicHospital(e.id).then(function(a){t.$set(e,"deleting",!1),t.$message.success("删除成功了！"),t.fetchData()}).catch(function(a){console.error(a),t.$message.error("删除报错了！"),t.$set(e,"deleting",!1)}))}})}},created:function(){this.mixTableData=i()(this.mixTableData,{queryIntros:[{control:"input",key:"q_name_cont",placeholder:"名称"},{control:"custom",key:"q_dic_area_id_eq",default:[],placeholder:"地区"}],dataIntros:[{label:"#",key:"id",width:80},{label:"名称",key:"name"},{label:"拼音",key:"pinyin"},{label:"区域",key:"dic_area_name_with_parents"},{label:"经度",key:"lng"},{label:"纬度",key:"lan"},{label:"地址",key:"address"},{label:"创建时间",key:"created_time"},{label:"更新时间",key:"updated_time"}],opIntro:{label:"操作",width:180}})}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ex-table",{attrs:{tableData:e.mixTableData},on:{refetch:e.fetchData},scopedSlots:e._u([{key:"search-bar-item",fn:function(t){var n=t.search;return[a("el-form-item",{key:n.key,attrs:{label:n.label}},[a("ex-model-select",{attrs:{api:"/dic/areas",labelKey:"name",placeholder:"地区"},model:{value:e.mixTableData.query[n.key],callback:function(t){e.$set(e.mixTableData.query,n.key,t)},expression:"mixTableData.query[search.key]"}})],1)]}},{key:"table-operations",fn:function(t){var n=t.row;return t.$index,t.intro,[a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.showEditDialog(n)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",loading:n.deleting},on:{click:function(t){return e.destroy(n)}}},[e._v("删除")])]}}])},[e._v(" "),a("div",{attrs:{slot:"search-bar-operations"},slot:"search-bar-operations"},[a("el-button",{attrs:{size:"small"},on:{click:e.showNewDialog}},[e._v("新增")])],1)])],1)},staticRenderFns:[]},_=a("C7Lr")(h,b,!1,null,null,null);t.default=_.exports}});