$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/mk21/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: '身份证号', index: '身份证号', width: 80 }, 			
			{ label: '', name: '姓名', index: '姓名', width: 80 }, 			
			{ label: '', name: '性别', index: '性别', width: 80 }, 			
			{ label: '', name: '出生日期', index: '出生日期', width: 80 }, 			
			{ label: '', name: '出生地', index: '出生地', width: 80 }, 			
			{ label: '', name: '民族', index: '民族', width: 80 }, 			
			{ label: '', name: '籍贯', index: '籍贯', width: 80 }, 			
			{ label: '', name: '本市或县地址', index: '本市或县地址', width: 80 }, 			
			{ label: '', name: '宗教信仰', index: '宗教信仰', width: 80 }, 			
			{ label: '', name: '身高', index: '身高', width: 80 }, 			
			{ label: '', name: '血型', index: '血型', width: 80 }, 			
			{ label: '', name: '文化程度', index: '文化程度', width: 80 }, 			
			{ label: '', name: '兵役状况', index: '兵役状况', width: 80 }, 			
			{ label: '', name: '服务处所', index: '服务处所', width: 80 }, 			
			{ label: '', name: '职业', index: '职业', width: 80 }, 			
			{ label: '', name: '何时由何地迁来本市或县', index: '何时由何地迁来本市或县', width: 80 }, 			
			{ label: '', name: '何时由何地迁来本址', index: '何时由何地迁来本址', width: 80 }, 			
			{ label: '', name: '登记派出所', index: '登记派出所', width: 80 }, 			
			{ label: '', name: '登记日期', index: '登记日期', width: 80 }			
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
		mk21: {}
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
			vm.mk21 = {};
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
			var url = vm.mk21.id == null ? "../sys/mk21/save" : "../sys/mk21/update";
			vm.mk21.出生日期=$("#csrq").val()+" 00:00:00";
			vm.mk21.何时由何地迁来本市或县=$("#qlrq").val()+" 00:00:00";
			vm.mk21.登记日期=$("#djrq").val()+" 00:00:00";
			var strImg = $("#image").attr("src");
			vm.mk21.strimg = strImg;
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.mk21),
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
				    url: "../sys/mk21/delete",
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
			$.get("../sys/mk21/info/"+id, function(r){
				if(r.mk21.头像 != null && r.mk21.头像 != ""){
					$("#image").attr("src","http://localhost:8080/gabadjglxt/upload/"+r.mk21.头像);
				}else{
					$("#image").attr("src","../public/image/template.png");
				}
                vm.mk21 = r.mk21;
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