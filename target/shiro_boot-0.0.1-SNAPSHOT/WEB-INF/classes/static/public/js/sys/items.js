$(function () {
    $("#jqGrid").jqGrid({
        url: '../items/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true,hidden:true },
			{ label: '检测项目', name: 'itemcode', index: 'itemcode', width: 80 }, 			
			{ label: '项目名称', name: 'itemname', index: 'itemname', width: 80 }, 			
			{ label: '项目数值', name: 'itemthreshold', index: 'itemthreshold', width: 80 }, 			
			{ label: '单位', name: 'itemunit', index: 'itemunit', width: 80 }, 			
			{ label: '排序', name: 'itemsort', index: 'itemsort', width: 80 }			
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

var vm = new Vue({
	el:'#rrapp',
	data:{
		//设置查询条件
		q:{
			itemname: null
		},
		showList: true,
		title: null,
		items: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.items = {};
			$("#testitems").removeAttr("disabled","disabled");
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            $("#testitems").attr("disabled","disabled");
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.items.id == null ? "../items/save" : "../items/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.items),
			    contentType:'application/json;charset=utf-8',
			    dataType:"json",
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							$("#testitems").removeAttr("disabled","disabled");
							vm.reload();
						});
					}else{
						$("#testitems").removeAttr("disabled","disabled");
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
				    url: "../items/delete",
				    data: JSON.stringify(ids),
				    contentType:'application/json;charset=utf-8',
				    dataType:"json",
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
			$.get("../items/info/"+id, function(r){
                vm.items = r.items;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'itemname': vm.q.itemname},
                page:page
            }).trigger("reloadGrid");
		}
	}
});