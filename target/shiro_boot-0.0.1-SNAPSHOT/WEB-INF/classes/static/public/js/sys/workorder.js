$(function () {
    $("#jqGrid").jqGrid({
        url: '../workorder/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50,hidden:true, key: true },
			{ label: '标题', name: 'title', index: 'title', width: 30 }, 
			{ label: '内容', name: 'content', index: 'content', width: 30 }, 
		
			{ label: '创建时间', name: 'creattime', index: 'creattime', width: 20 }, 		
			//{ label: '手机号码', name: 'phone', index: 'phone', width: 20 }, 
			{ label: '工单状态', name: 'wostatus', width: 10, formatter: function(value, options, row){
				if(value === 1){
					return '<span class="label label-danger">未解决</span>';
				}
				if(value === 2){
					return '<span class="label label-success">已解决</span>';
				}
			}},
			{label:'回复状态',name:'contenta',width:10,formatter: function(value, options, row){
				if(value != null){
					
					return '<span id='+row.id+' class="label label-success" onclick="reply(this);" >已回复</span>';
				}
				if(value == null){
					return '<span id='+row.id+' class="label label-danger" onclick="notreply(this);">未回复</span>';
				}
			}},
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: false,
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
			title: null
		},
		showList: true,
		title: null,
		workorder: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		sss: function (){
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
			location.href = "workorderdetial.html?id="+id;
		},
		details: function (event) {
			/*var id = getSelectedRow();
			if(id == null){
				return ;
			}*/
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
		   
		    $.get("../workorder/reply/"+id, function(r){
		    	if(r.code == 400){
					alert(r.msg);
					return;
				}else{
					vm.showList = false;
		            vm.title = "工单回复";
		            vm.getInfo(id)
				}
		    });
			
		},
		lookdetails:function(event){
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
		    vm.showList = false;
            vm.title = "工单详情";
            vm.getInfo(id)
		},
		getInfo: function(id){
			
			$.get("../workorder/info/"+id, function(r){
					if(r.workorder.contenta != null && r.workorder.contenta != ""){
						$("#srue").attr("disabled","disabled");
						$("#answer").attr("disabled","disabled");
					}else{
						$("#srue").removeAttr("disabled","disabled");
						$("#answer").removeAttr("disabled","disabled");
					}
					vm.workorder = r.workorder;
            });
		},
	/*	enlargeIsPic: function(){
			 var pic = $("#image").attr("src");
			 if(pic.indexOf("null")>0 || pic ==""){
				 return;
			 }
			 window.open(pic);
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.enterprise = {};
			$("#image").attr("src","");
			$("#image").attr("onclick","file.click()");
			$("#fileNotice").attr("style","display:none");
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            $("#image").removeAttr("onclick");
            $("#fileNotice").removeAttr("style");
            vm.getInfo(id)
		},
		
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../enterprise/delete",
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
		*/
		saveOrUpdate: function (event) {
			//var url = vm.enterprise.id == null ? "../enterprise/save" : "../enterprise/update";
			var answer = $("#answer").val();
			if(answer ==null || answer == ""){
				alert("回复内容不能为空!");
				return;
			}
			$.ajax({
				type: "POST",
			    url: "../workorder/save",
			    data: JSON.stringify(vm.workorder),
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
		tuisong: function (event) {//推送
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
			
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../workorder/tuisong",
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
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
			
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../workorder/tuisongs",
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
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'title': vm.q.title},
                page:page
            }).trigger("reloadGrid");
		},
	}
});

