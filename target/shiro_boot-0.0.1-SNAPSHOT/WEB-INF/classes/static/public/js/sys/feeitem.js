/*$(function () {
    $("#jqGrid").jqGrid({
        url: '../feeitem/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'itemcode', index: 'itemcode', width: 80 }, 			
			{ label: '', name: 'itemname', index: 'itemname', width: 80 }, 			
			{ label: '', name: 'itemunit', index: 'itemunit', width: 80 }, 			
			{ label: '', name: 'fid', index: 'fid', width: 80 }, 			
			{ label: '', name: 'itemsort', index: 'itemsort', width: 80 }			
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
});*/

//加载类目树 by caopengkai
$(function(){
	$("#jqGrid").jqGrid({  
        url:'../feeitem/list', //请求 conllroter的地址路径
        datatype: "json", //返回时的数据类型 
        treeGrid: true,   //是否是树形表格 
        treeGridModel: 'adjacency', //树形表格的模式   
        ExpandColumn : 'itemname', //树形表格定义展开字段 
        colNames:['编码','名称值','费用名称', '单位','父级编码','排序'], //属性表格的表头 
        colModel: [			//属性表格加载的数据映射
       			{ label: '编码', name: 'id', index: 'id', width: 20,key:true,hidden:true },
       			{ label: '名称值', name: 'itemcode', width: 40,hidden:true },
       			{ label: '费用名称', name: 'itemname', width: 40 }, 
       			{ label: '单位', name: 'itemunit', width: 40 }, 
       			{ label: '父级编码', name: 'fid', index: 'fid', width: 80,hidden:true }, 			
       			{ label: '排序', name: 'itemsort', index: 'itemsort', width: 10,hidden:true }			
       		 ],
         pager: "false",  //是否分页
         //multiselect: true,  此东西是名为多选框的属性,因为是树形结构,此处不需要所以注掉
         jsonReader: {    //初始化list数据
              root: "menuList",    
              repeatitems : false    
         },    
         treeReader : {    //初始化树形表格
              level_field: "level",   //数据等级 
              parent_id_field: "fid",   //当前行的父级id 
              leaf_field: "isleaf",    //是否有叶子节点
              expanded_field: "expanded"  //是否默认展开  
         },  
        // sortorder: "desc",  
         height: '100%'  //属性表格的加载高度
       }); 
});

//树型构建
var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "fid",
				rootPId: -1
			},
			key: {
				name:"itemname" //需要指定KEY，如果属性与树的名称不一样。
			}
		}
	};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		feeitem: {
			parentName:null,
			fid:-1,
			itemsort:0
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		leimuTree: function(){//声明一个类目树
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-molv',
				title: "选择类目",
				area: ['300px', '450px'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#menuLayer"),//回写到html的标签ID
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					//点击确认按钮时，选择类目
					vm.feeitem.fid = node[0].id;
					vm.feeitem.parentName = node[0].itemname;
					layer.close(index);
	            }
			});
		},
		getLeimu: function(id){//加载
			//加载类目树
			$.get("../feeitem/select", function(r){
				ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);//将List转变生成树
				var node = ztree.getNodeByParam("id", vm.feeitem.fid);
				ztree.selectNode(node);
				vm.feeitem.parentName = node.itemname;//对应字段名称
			})
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.feeitem = {parentName:null,fid:null,itemsort:0};
			vm.getLeimu();	//加载类目树
		},
		update: function (event) {
			var grid = $("#jqGrid");
		    var id = grid.getGridParam("selrow");
		    if(!id){
		    	alert("请选择一条记录");
		    	return ;
		    }
			if(id == null){
				return ;
			}
            //vm.getInfo(id)
			$.get("../feeitem/info/"+id, function(r){
				vm.showList = false;
                vm.title = "修改";
                vm.feeitem = r.feeitem;
                vm.getLeimu();//加载类目树
            });
		},
		saveOrUpdate: function (event) {
			
			var url = vm.feeitem.id == null ? "../feeitem/save" : "../feeitem/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.feeitem),
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
			//var ids = getSelectedRows();
			var grid = $("#jqGrid");
		    var ids = grid.getGridParam("selrow");
			if(!ids){
				alert("请选择一条记录");
				return;
			}
		    if(ids == null){
				return ;
			}
			vm.feeitem.id = ids;
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../feeitem/delete",
				    data: JSON.stringify(vm.feeitem),
				    contentType:'application/json;charset=utf-8',
				    dataType:"json",
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
			$.get("../feeitem/info/"+id, function(r){
                vm.feeitem = r.feeitem;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});