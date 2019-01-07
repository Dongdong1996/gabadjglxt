$(function () {
    $("#jqGrid").jqGrid({
        url: '../funcpool/list',
        datatype: "json",
        colModel: [			
			{ label: '编码', name: 'id', index: 'id', width: 50, key: true,hidden:true },
			{ label: '类型', name: 'ptype', index: 'ptype', width: 80, formatter: function(value, options, row){
				if(value == 1){
					return '<span>物化处理</span>';
				}
				if(value == 2){
					return '<span>生化处理</span>';
				}
				if(value == 3){
					return '<span>高级氧化</span>';
				}
				if(value == 4){
					return '<span>深度处理</span>';
				}
				if(value == 5){
					return '<span>消毒技术</span>';
				}
			}},			
			{ label: '名称', name: 'pname', index: 'pname', width: 80 } 			
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
			pname: null
		},
		showList: true,
		title: null,
		funcpool: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.funcpool = {};
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
			var url = vm.funcpool.id == null ? "../funcpool/save" : "../funcpool/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.funcpool),
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
				    url: "../funcpool/delete",
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
			$.get("../funcpool/info/"+id, function(r){
                vm.funcpool = r.funcpool;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'pname': vm.q.pname},
                page:page
            }).trigger("reloadGrid");
		}
	}
});