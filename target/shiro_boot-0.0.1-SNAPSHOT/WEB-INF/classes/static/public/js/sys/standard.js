$(function () {
    $("#jqGrid").jqGrid({
        url: '../standard/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
        	{ label: '所属类目', name: 'kcid', index: 'kcid', width: 50 , formatter: function(value, options, row){
				if(value === '5'){
					return '<span>大气环境保护</span>';
				}
				if(value === '6'){
					return '<span>水环境保护</span>';
				}
				if(value === '9'){
					return '<span>固体废物污染控制</span>';
				}
			}}, 
			//{ label: '类目', name: 'kcid', index: 'kcid', width: 80 }, 			
			{ label: '文件标题', name: 'title', index: 'title', width: 80 }, 			
			//{ label: '创建时间', name: 'createtime', index: 'createtime', width: 80 }, 			
			//{ label: '链接地址', name: 'linkurl', index: 'linkurl', width: 80 }, 			
			{ label: '添加时间', name: 'createtime', index: 'createtime', width: 50},
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
		standard: {}
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
			vm.standard = {};
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
		saveOrUpdate: function (event) {//确定按钮、保存事件
			//下拉列表
			if(vm.standard.kcid ==3){
				vm.standard.description ='标准方法';
			} 
			if(vm.standard.kcid ==5){
				vm.standard.description ='大气环境保护';
			}
			if(vm.standard.kcid ==6){
				vm.standard.description ='水环境保护';
			}
			//获取选择的类目
			//var nodes = ztree.getCheckedNodes(true);
			//vm.standard.kcid = nodes[0].id;//从树中获取选中的类目ID，并给字段赋值
			//vm.standard.description = nodes[0].kname;//从树中获取选中的类目名称，并给字段赋值，主要是在列表显示使用
			var url = vm.standard.id == null ? "../standard/save" : "../standard/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.standard),
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
		//上传
		uploadfile: function (event) {
			var url = "../standard/upload";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.standard),
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
				    url: "../standard/delete",
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
			$.get("../standard/info/"+id, function(r){
                vm.standard = r.standard;
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