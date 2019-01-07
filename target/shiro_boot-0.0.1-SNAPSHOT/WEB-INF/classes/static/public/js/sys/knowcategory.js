/*$(function () {
    $("#jqGrid").jqGrid({
        url: '../knowcategory/list',
        datatype: "json",
        //treeGrid: true,    
        //treeGridModel: 'adjacency',    
        //ExpandColumn : 'kname',  
        //colNames:['id','类目名称','父id', '排序'],
        colModel: [			
			//{ label: '类目ID', name: 'id', index: 'id', width: 20, key: true,hidden:true },
			{ label: '类目名称', name: 'kname', width: 40 }, 	
			//{ label: '所属类目', name: 'parentName', sortable: false, width: 20 },
			//{ label: '创建日期', name: 'createtime', index: 'createtime', width: 20 }, 			
			//{ label: '父ID', name: 'fid', index: 'fid', width: 80,hidden:true }, 			
			{ label: '排序', name: 'ksort', index: 'ksort', width: 10 }			
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
        pager:"false",
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
        url:'../knowcategory/treelist', //请求 conllroter的地址路径
        datatype: "json", //返回时的数据类型 
        treeGrid: true,   //是否是树形表格 
        treeGridModel: 'adjacency', //树形表格的模式   
        ExpandColumn : 'kname', //树形表格定义展开字段 
        colNames:['编码','类目名称','父ID', '排序'], //属性表格的表头 
        colModel: [			//属性表格加载的数据映射
       			{ label: '类目ID', name: 'id', index: 'id', width: 20,key:true },
       			{ label: '类目名称', name: 'kname', width: 40 }, 	
       			{ label: '父ID', name: 'fid', index: 'fid', width: 80,hidden:true }, 			
       			{ label: '排序', name: 'ksort', index: 'ksort', width: 10 }			
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
				name:"kname" //需要指定KEY，如果属性与树的名称不一样。
			}
		}
	};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		//设置查询条件
		q:{
			title: null
		},
		showList: true,
		title: null,
		knowcategory: {
			parentName:null,
			fid:-1,
			ksort:0
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
					vm.knowcategory.fid = node[0].id;
					vm.knowcategory.parentName = node[0].kname;
					layer.close(index);
	            }
			});
		},
		getLeimu: function(id){//加载
			//加载类目树
			$.get("../knowcategory/select", function(r){
				ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);//将List转变生成树
				var node = ztree.getNodeByParam("id", vm.knowcategory.fid);
				ztree.selectNode(node);
				vm.knowcategory.parentName = node.kname;//对应字段名称
			})
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			//vm.knowcategory = {};
			vm.knowcategory = {parentName:null,fid:-1,ksort:0};
			vm.getLeimu();	//加载类目树
		},
		update: function (event) {
			//var id = getSelectedRow();
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
            $.get("../knowcategory/info/"+id, function(r){
				vm.showList = false;
                vm.title = "修改";
                vm.knowcategory = r.knowcategory;
                vm.getLeimu();//加载类目树
            });
		},
		saveOrUpdate: function (event) {
			var url = vm.knowcategory.id == null ? "../knowcategory/save" : "../knowcategory/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.knowcategory),
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
		    	return ;
		    }
			if(ids == null){
				return ;
			}
			vm.knowcategory.id = ids;
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../knowcategory/delete",
				    data: JSON.stringify(vm.knowcategory),
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
			$.get("../knowcategory/info/"+id, function(r){
                vm.knowcategory = r.knowcategory;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'kname': vm.q.kname},//设置查询条件title
                page:page
            }).trigger("reloadGrid");
		}
	}
});