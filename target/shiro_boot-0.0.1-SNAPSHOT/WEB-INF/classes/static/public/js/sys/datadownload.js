$(function () {
    $("#jqGrid").jqGrid({
        url: '../datadownload/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			//{ label: '类目ID', name: 'kcid', index: 'kcid', width: 80 }, 
        	{ label: '所属类目', name: 'dataprofile', index: 'dataProfile', width: 20 },
			{ label: '标题', name: 'title', index: 'title', width: 30 }, 			
			{ label: '创建时间', name: 'createtime', index: 'createtime', width: 20 }, 			
			//{ label: '内容', name: 'datadetail', index: 'dataDetail', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
function HTMLDecode(text) { 
	var temp = document.createElement("div"); 
	temp.innerHTML = text; 
	var output = temp.innerText || temp.textContent; 
	temp = null; 
	return output; 
}
//树型构建
var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "fid",
				rootPId: -1
			},
			key: {
				name:"kname" //需要指定KEY，如果属性与树的名称不一样。
			}
		},
		check:{
			enable:true,
			nocheckInherit:true,
			chkStyle: "radio"// 设置单选
		}
};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		//设置查询条件
		q:{
			title: null
		},
		showList: true,
		title: null,
		datadownload: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		getLeimu: function(id){//加载
			//加载类目树
			$.get("../knowcategory/select", function(r){
				ztree = $.fn.zTree.init($("#leimuTree"), setting, r.menuList);//将List转变生成树
			})
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.datadownload = {};
			editor.setData("");
			vm.getLeimu(null);	//加载类目树
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {//确定按钮
			//回调富文本内容
			vm.datadownload.datadetail = HTMLEncode(editor.getData());
			//下拉列表
			if(vm.datadownload.kcid ==4){
				vm.datadownload.dataprofile ='资料下载';
			} 
			if(vm.datadownload.kcid ==7){
				vm.datadownload.dataprofile ='学术论文';
			}
			if(vm.datadownload.kcid ==8){
				vm.datadownload.dataprofile ='专业书籍';
			}
			
			//获取选择的类目
			//var nodes = ztree.getCheckedNodes(true);
			//vm.datadownload.kcid = nodes[0].id;//从树中获取选中的类目ID，并给字段赋值
			//vm.datadownload.dataprofile = nodes[0].kname;//从树中获取选中的类目名称，并给字段赋值，主要是在列表显示使用
			var url = vm.datadownload.id == null ? "../datadownload/save" : "../datadownload/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.datadownload),
			    contentType:'application/json;charset=utf-8',
			    dataType:"json",
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../datadownload/delete",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get("../datadownload/info/"+id, function(r){
				editor.setData(HTMLDecode(r.datadownload.datadetail));
                vm.datadownload = r.datadownload;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'title': vm.q.title},//设置查询条件title
                page:page
            }).trigger("reloadGrid");
		}
	}
});