$(function () {
    $("#jqGrid").jqGrid({
        url: '../information/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'ID', width: 50, key: true },
			/*{ label: '类型', name: 'infotype', width: 10, formatter: function(value, options, row){
				if(value === 1){
					return '<span>新闻</span>';
				}
				if(value === 2){
					return '<span>公告</span>';
				}
			}},*/
			{ label: '新闻标题', name: 'infotitle', index: 'infoTitle', width: 80 }, 			
			//{ label: '图标', name: 'infoicon', index: 'infoIcon', width: 80 }, 			
			//{ label: '摘要', name: 'infoprofile', index: 'infoProfile', width: 80 }, 			
			//{ label: '内容', name: 'infodetail', index: 'infoDetail', width: 80 }, 			
			{ label: '发布人', name: 'infopublisher', index: 'infoPublisher', width: 20 }, 			
			{ label: '发布时间', name: 'publishtime', index: 'publishTime', width: 30 }
			//{ label: '状态', name: 'status', index: 'status', width: 10 } 
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
			infotitle: null
		},
		showList: true,
		title: null,
		information: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.information = {};
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
			//回调富文本内容
			vm.information.infodetail = editor.getData();
			var url = vm.information.id == null ? "../information/save" : "../information/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.information),
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
				    url: "../information/delete",
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
		tuisong: function (event) {//推送
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../information/tuisong",
				    data: JSON.stringify(id),
				    success: function(r){
						if(r.code == 0){
							alert('信息发送成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		tuisongs: function (event) {//推送
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../information/tuisongs",
				    data: JSON.stringify(id),
				    success: function(r){
						if(r.code == 0){
							alert('信息发送成功', function(index){
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
			$.get("../information/info/"+id, function(r){
                vm.information = r.information;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'infotitle': vm.q.infotitle},//查询条件
                page:page
            }).trigger("reloadGrid");
		}
	}
});