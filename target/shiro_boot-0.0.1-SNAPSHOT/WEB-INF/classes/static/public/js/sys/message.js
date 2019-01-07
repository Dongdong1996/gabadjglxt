$(function () {
    $("#jqGrid").jqGrid({
        url: '../message/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
        	{ label: '区域', name: '北京', index: 'id', width: 20 ,hidden:true},
			{ label: '企业名称', name: 'entname', index: 'entcode', width: 30 }, 	
			{ label: '发送时间', name: 'createtime', index: 'createtime', width: 30 }, 
			{ label: '发送内容', name: 'content', index: 'content', width: 80 }, 	
			//{ label: '消息类型', name: 'messagetype', index: 'messagetype', width: 80 },
			//{ label: '消息状态', name: 'messagestatus', index: 'messagestatus', width: 80 },
			{ label: '消息状态', name: 'messagestatus', width: 10,hidden:true, formatter: function(value, options, row){
				if(value === 1){
					return '<span>未发送</span>';
				}
				if(value === 2){
					return '<span>已发送</span>';
				}
			}},
			//{ label: '提问者ID', name: 'quid', index: 'quid', width: 80 }, 			
			//{ label: '回答者ID', name: 'auid', index: 'auid', width: 80 }, 			
			//{ label: '相关ID', name: 'experienceid', index: 'experienceid', width: 80 }, 			
			//{ label: '回答者名字', name: 'aname', index: 'aname', width: 80 }			
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
		//查询条件
		q:{
			content: null
		},
		showList: true,
		title: null,
		message: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.message = {};
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
			var url = vm.message.id == null ? "../message/save" : "../message/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.message),
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
				    url: "../message/delete",
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
			$.get("../message/info/"+id, function(r){
                vm.message = r.message;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'content': vm.q.content},//查询条件
                page:page
            }).trigger("reloadGrid");
		}
	}
});