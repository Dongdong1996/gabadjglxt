$(function () {
    $("#jqGrid").jqGrid({
        url: '../entdaydata/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true,hidden: true },
			{ label: '企业名称', name: 'entname', index: 'entcode', width: 100 }, 			
			{ label: '检测项目', name: 'itemcode', index: 'itemcode', width: 80 }, 			
			{ label: '项目名称', name: 'itemname', index: 'itemname', width: 80 }, 	
			{ label: '数值', name: 'datavalue', index: 'datavalue', width: 80 }, 			
			{ label: '单位', name: 'dataunit', index: 'dataunit', width: 40 }, 	
			{ label: '检测人', name: 'loginname', index: 'loginname', width: 60 }, 			
			//{ label: '', name: 'plcode', index: 'plcode', width: 80 }, 			
			//{ label: '', name: 'nodecode', index: 'nodecode', width: 80 }, 			
			{ label: '检测时间', name: 'datatime', index: 'datatime', width: 80 }, 			
			//{ label: '', name: 'ifaudit', index: 'ifaudit', width: 80 }, 			
			//{ label: '', name: 'status', index: 'status', width: 80 }, 			
			{ label: '录入终端', name: 'terminal', index: 'terminal', width: 30 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        //multiselect: true,
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
    vm.getLeimu();	//加载类目树
});
//树型构建
var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "entcode",
				pIdKey: "",
				rootPId: -1
			},
			key: {
				name:"entname" //需要指定KEY，如果属性与树的名称不一样。
			}
		}
	};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		//设置查询条件
		q:{
			entcode: null
		},
		showList: true,
		title: null,
		entdaydata: {}
	},
	methods: {
		leimuTree: function(){//声明一个类目树
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-molv',
				title: "选择公司",
				area: ['300px', '450px'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#menuLayer"),//回写到html的标签ID
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					//点击确认按钮时，选择类目
					//vm.entdaydata.entcode = node[0].entcode;
					//vm.entdaydata.entname = node[0].entname;
					$("#entcode").val(node[0].entcode);
					$("#entname").val(node[0].entname);
					layer.close(index);
					vm.queryplcode();
	            }
			});
		},
		getLeimu: function(id){//加载
			//加载类目树
			$.get("../entdaydata/select", function(r){
				ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);//将List转变生成树
				var node = ztree.getNodeByParam("id","");
				ztree.selectNode(node);
				vm.entdaydata.entname = node.entname;//对应字段名称
			})
		},
		queryplcode: function (){
			var entcode = $("#entcode").val();
			$.ajax({
				type:"POST",
				url:"../entprocessline/queryplcode",
				data: entcode,
				success:function(r){
					if(r.code == 0){
						var optionstring = "";
						for(i=0;i<r.entprocesslineList.length;i++){
							optionstring += "<option value=\"" + r.entprocesslineList[i].plcode + "\" >" + r.entprocesslineList[i].plname + "</option>";  
						}
						$("#plcode").html("<option value=''>所有</option> "+optionstring);
					}
				}
			});
		},
		selectplcode: function (){
			var plcode = $("#plcode").val();
			$.ajax({
				type:"POST",
				url:"../entprocessline/querynodecode",
				data:plcode,
				success:function(r){
					if(r.code == 0){
						var optionstring = "";
						for(i=0;i<r.nocodeList.length;i++){
							optionstring += "<option value=\"" + r.nocodeList[i].nodecode + "\" >" + r.nocodeList[i].nodename + "</option>";  
						}
						$("#nodecode").html("<option value=''>所有</option> "+optionstring); 
					}
				}
			});
		},
		selectnodecode: function(){
			vm.entdaydata.entcode = $("#entcode").val();
			vm.entdaydata.plcode = $("#plcode").val();
			vm.entdaydata.nodecode = $("#nodecode").val();
			$.ajax({
				type:"POST",
				url:"../entplitem/queryitemcode",
				data:JSON.stringify(vm.entdaydata),
				//dataType:"json",
				success:function(r){
					if(r.code == 0){
						var optionstring = "";
						for(i=0;i<r.list.length;i++){
							optionstring += "<option value=\"" + r.list[i].itemcode + "\" >" + r.list[i].itemname + "</option>";  
						}
						$("#itemcode").html("<option value=''>所有</option> "+optionstring); 
					}
				}
			});
		},
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.entdaydata = {};
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
			var url = vm.entdaydata.id == null ? "../entdaydata/save" : "../entdaydata/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.entdaydata),
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
				    url: "../entdaydata/delete",
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
			$.get("../entdaydata/info/"+id, function(r){
                vm.entdaydata = r.entdaydata;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
					'entcode':$("#entcode").val(),
					'plcode':$("#plcode").val(),
					'nodecode':$("#nodecode").val(),
					'itemcode':$("#itemcode").val(),
					'starttime':$("#starttime").val(),
					'endtime':$("#endtime").val()
					},
                page:page
            }).trigger("reloadGrid");
		}
	}
});