$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/mk3/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'Id', width: 50, key: true },
			{ label: '', name: '部门', index: '部门', width: 80 }, 			
			{ label: '', name: '姓名', index: '姓名', width: 80 }, 			
			{ label: '', name: '岗位', index: '岗位', width: 80 }, 			
			{ label: '', name: '填写日期', index: '填写日期', width: 80 }, 			
			{ label: '', name: '来电登记', index: '来电登记', width: 80 }, 			
			{ label: '', name: '来访等级', index: '来访等级', width: 80 }, 			
			{ label: '', name: '外勤任务记录', index: '外勤任务记录', width: 80 }			
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
		q:{
			姓名: null
		},
		showList: true,
		title: null,
		mk3: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mk3 = {};
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
		saveOrUpdate: function (event) {
			var url = vm.mk3.id == null ? "../sys/mk3/save" : "../sys/mk3/update";
			vm.mk3.填写日期=$("#txrq").val()+" 00:00:00";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.mk3),
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
				    url: "../sys/mk3/delete",
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
			$.get("../sys/mk3/info/"+id, function(r){
                vm.mk3 = r.mk3;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'姓名': vm.q.姓名},
                page:page
            }).trigger("reloadGrid");
		}
	}
});