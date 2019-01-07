$(function () {
    $("#jqGrid").jqGrid({
        url: '../question/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true,hidden:true },
			{ label: '标题', name: 'title', index: 'title', width: 80 }, 
			{ label: '内容', name: 'description', index: 'description', width: 80 }, 			
			{ label: '', name: 'commitstatus', index: 'commitstatus', width: 80,hidden:true }, 			
			{ label: '', name: 'kcid', index: 'kcid', width: 80,hidden:true }, 			
			{ label: '', name: 'uid', index: 'uid', width: 80,hidden:true }, 			
			{ label: '创建时间', name: 'createtime', index: 'createtime', width: 80 }, 			
			{ label: '', name: 'videourl', index: 'videourl', width: 80,hidden:true }, 			
			{ label: '', name: 'imgurl', index: 'imgurl', width: 80,hidden:true }			
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
			title: null
		},
		showList: true,
		title: null,
		question: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		lookforquestion:function (){
			/*var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }*/
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			location.href = "questiondetail.html?id="+id;
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.question = {};
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
			var url = vm.question.id == null ? "../question/save" : "../question/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.question),
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
				    url: "../question/delete",
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
			$.get("../question/info/"+id, function(r){
                vm.question = r.question;
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