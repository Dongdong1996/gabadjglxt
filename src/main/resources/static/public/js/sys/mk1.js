$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/mk1/list',
        datatype: "json",
        colModel: [			
			{ label: '案件编号', name: '案件编号', index: '案件编号', width: 50, key: true },
			{ label: '', name: '案件时间', index: '案件时间', width: 80 }, 			
			{ label: '案件发生地点', name: '案件地点', index: '案件地点', width: 80 }, 			
			{ label: '', name: '案件任务执行情况', index: '案件任务执行情况', width: 80 }, 			
			{ label: '', name: '案件相关嫌疑人', index: '案件相关嫌疑人', width: 80 }, 			
			{ label: '案件日志', name: '案件进展情况', index: '案件进展情况', width: 80 }			
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
			案件地点: null
		},
		showList: true,
		title: null,
		mk1: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		enlargeIsPic: function(){
			 var pic = $("#image").attr("src");
			 if(pic.indexOf("null")>0 || pic ==""){
				 return;
			 }
			 window.open(pic);
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mk1 = {};
		},
		update: function (event) {
			var 案件编号 = getSelectedRow();
			if(案件编号 == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            $("#image").removeAttr("onclick");
            vm.getInfo(案件编号)
		},
		saveOrUpdate: function (event) {
			var strImg = $("#image").attr("src");
			vm.mk1.strimg = strImg;
			var url = vm.mk1.案件编号 == null ? "../sys/mk1/save" : "../sys/mk1/update";
			vm.mk1.案件时间=$("#ajsj").val();
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.mk1),
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
			var 案件编号s = getSelectedRows();
			if(案件编号s == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../sys/mk1/delete",
				    data: JSON.stringify(案件编号s),
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
		getInfo: function(案件编号){
			$.get("../sys/mk1/info/"+案件编号, function(r){
				if(r.mk1.案件相关照片 != null && r.mk1.案件相关照片 != ""){
					$("#image").attr("src","http://localhost:8080/gabadjglxt/upload/"+r.mk1.案件相关照片);
				}else{
					$("#image").attr("src","../public/image/template.png");
				}
                vm.mk1 = r.mk1;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'案件地点': vm.q.案件地点},
				page:page
            }).trigger("reloadGrid");
		},
		readAsDataURL :function (event){ 
		    //检验是否为图像文件 
		    var file = document.getElementById("file").files[0]; 
		    if(!/image\/\w+/.test(file.type)){ 
		        alert("看清楚，这个需要图片！"); 
		        return false; 
		    } 
		    var reader = new FileReader(); 
		    //将文件以Data URL形式读入页面 
		    reader.readAsDataURL(file); 
		    reader.onload=function(e){ 
		        var result=document.getElementById("image"); 
		        //显示文件 
		        $(result).attr('src',this.result);
		        $(result).attr('value',"haha");
		    }
		}
	}
});