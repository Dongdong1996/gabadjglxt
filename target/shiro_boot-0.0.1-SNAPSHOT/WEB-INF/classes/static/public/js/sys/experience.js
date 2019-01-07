$(function () {
    $("#jqGrid").jqGrid({
        url: '../experience/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '经验标题', name: 'title', index: 'title', width: 120 }, 			
			{ label: '经验摘要', name: 'profile', index: 'Profile', width: 40 }, 			
			//{ label: '描述', name: 'description', index: 'description', width: 80 },
			{ label: '来源类型', name: 'sourcetype', width: 20, formatter: function(value, options, row){
				if(value === 1){
					return '<span>知识问答转化</span>';
				}
				if(value === 2){
					return '<span>无忧水管家</span>';
				}
			}},
			{ label: '创建时间', name: 'createtime', index: 'createtime', width: 30 }			
			//{ label: '来源', name: 'source', index: 'source', width: 80 }, 			
						
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

function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
function HTMLDecode(text) { 
	var temp = document.createElement("div"); 
	temp.innerHTML = text; 
	var output = temp.innerText || temp.textContent; 
	temp = null; 
	return output; 
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		//设置查询条件
		q:{
			kname: null
		},
		showList: true,
		title: null,
		experience: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.experience = {};
			editor.setData("");
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
			//回调富文本内容
			var dataCon = HTMLEncode(editor.getData());
			//alert(html2Escape(dataCon));
			//vm.experience.title = HTMLEncode(vm.experience.title);
			//alert(vm.experience.title);
			//vm.experience.description = HTMLEncode(dataCon);
			vm.experience.description = dataCon;
			//upperCase();//回调用
			var url = vm.experience.id == null ? "../experience/save" : "../experience/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.experience),
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
				    url: "../experience/delete",
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
		tuisong: function (event) {//推送
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../experience/tuisong",
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
		tuisongs:function (event){
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			confirm('确定要推送选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../experience/tuisongs",
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
		getInfo: function(id){
			$.get("../experience/info/"+id, function(r){
				editor.setData(HTMLDecode(r.experience.description));
                vm.experience = r.experience;
            });
		},
		reload: function (event) {
			var ss = vm.q.title;
			
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'title': vm.q.title},//设置查询条件title
                page:page
            }).trigger("reloadGrid");
		}
	}
});