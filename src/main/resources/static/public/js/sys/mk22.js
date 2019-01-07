$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/mk22/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: '身份证号', index: '身份证号', width: 80 }, 			
			{ label: '', name: '姓名', index: '姓名', width: 80 }, 			
			{ label: '', name: '联系电话', index: '联系电话', width: 80 }, 			
			{ label: '', name: '截至日期', index: '截至日期', width: 80 }, 			
			{ label: '', name: '暂住处所', index: '暂住处所', width: 80 }, 			
			{ label: '', name: '职业', index: '职业', width: 80 }			
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
		mk22: {}
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
			vm.mk22 = {};
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
			var url = vm.mk22.id == null ? "../sys/mk22/save" : "../sys/mk22/update";
			vm.mk22.截至日期=$("#jzrq").val()+" 00:00:00";
			var strImg = $("#image").attr("src");
			vm.mk22.strimg = strImg;
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.mk22),
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
				    url: "../sys/mk22/delete",
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
			$.get("../sys/mk22/info/"+id, function(r){
				if(r.mk22.头像 != null && r.mk22.头像 != ""){
					$("#image").attr("src","http://localhost:8080/gabadjglxt/upload/"+r.mk22.头像);
				}else{
					$("#image").attr("src","../public/image/template.png");
				}
                vm.mk22 = r.mk22;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'姓名': vm.q.姓名},
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