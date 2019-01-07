$(function () {
    $("#jqGrid").jqGrid({
        url: '../enterprise/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '企业名称', name: 'entname', index: 'entname', width: 30 }, 
			{ label: '企业所在地', name: 'entareaname', index: 'entareaname', width: 30 }, 
		
			{ label: '联系人', name: 'contacts', index: 'contacts', width: 20 }, 		
			{ label: '手机号码', name: 'phone', index: 'phone', width: 20 }, 
			{ label: '企业状态', name: 'status', width: 10, formatter: function(value, options, row){
				if(value === 1){
					return '<span>认证中</span>';
				}
				if(value === 2){
					return '<span>已认证</span>';
				}
				if(value === null){
					return '<span>未认证</span>';
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
			entname: null
		},
		showList: true,
		title: null,
		enterprise: {}
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
		saveOrUpdate: function (event) {
			var strImg = $("#image").attr("src");
			vm.enterprise.strimg = strImg;
			var url = vm.enterprise.id == null ? "../enterprise/save" : "../enterprise/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.enterprise),
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
		getInfo: function(id){
			$.get("../enterprise/info/"+id, function(r){
				if(r.enterprise.licenseurl != null && r.enterprise.licenseurl != ""){
					$("#image").attr("src","http://www.5uwatermaster.com:8081/"+r.enterprise.licenseurl);
				}else{
					$("#image").attr("src","../public/image/template.png");
				}
                vm.enterprise = r.enterprise;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'entname': vm.q.entname},
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
		},
	/*	enterprisedata: function (){
			var id = getSelectedRow();
			alert(id);
			if(id == null){
				return ;
			}
			return;
			location.href="/sys/entuser.html";
		}*/
	}
});