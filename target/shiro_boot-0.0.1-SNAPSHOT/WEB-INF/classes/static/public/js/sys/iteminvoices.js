$(function () {
    $("#jqGrid").jqGrid({
        url: '../iteminvoices/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true,hidden:true },
			{ label: '企业名称', name: 'entname', index: 'entname', width: 80 }, 			
		//	{ label: '', name: 'starttime', index: 'starttime', width: 80 }, 			
		//	{ label: '', name: 'endtime', index: 'endtime', width: 80 }, 			
			{ label: '创建时间', name: 'createtime', index: 'createtime', width: 80 }, 			
			{ label: '运营项目', name: 'itemname', index: 'itemname', width: 80 }, 			
			{ label: '用量', name: 'consumption', index: 'consumption', width: 80 }, 			
			{ label: '费用', name: 'invoices', index: 'invoices', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
       // multiselect: true,
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
		iteminvoices: {}
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
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.iteminvoices = {};
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
			var url = vm.iteminvoices.id == null ? "../iteminvoices/save" : "../iteminvoices/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.iteminvoices),
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
				    url: "../iteminvoices/delete",
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
			$.get("../iteminvoices/info/"+id, function(r){
                vm.iteminvoices = r.iteminvoices;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{
					'entcode':$("#entcode").val(),
					'starttime':$("#starttime").val(),
					'endtime':$("#endtime").val()
					},
				page:page
            }).trigger("reloadGrid");
		}
	}
});