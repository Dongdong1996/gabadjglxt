$(function () {
    $("#jqGrid").jqGrid({
        url: '../entuser/list',
        datatype: "json",
        colModel: [			
			//{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
        	{ label: '用户类型', name: 'utype', width: 20, formatter: function(value, options, row){
				if(value === 1){
					return '<span>个人用户</span>';
				}
				if(value === 11||value === 12||value === 13||value === 14||value === 15){
					return '<span>企业用户</span>';
				}
				if(value === 7){
					return '<span>个人专家</span>';
				}
				if(value === null){
					return '<span></span>';
				}
			}},
			{ label: '真实姓名', name: 'realname', index: 'realname', width: 30 },
			{ label: '昵称', name: 'loginname', index: 'loginname', width: 30 }, 			
			//{ label: '密码', name: 'loginpassword', index: 'loginpassword', width: 80 }, 
			{ label: '性别', name: 'sex', width: 10, formatter: function(value, options, row){
				if(value === 1){
					return '<span>男</span>';
				}
				if(value === 2){
					return '<span>女</span>';
				}
				if(value === null){
					return '<span></span>';
				}
			}},
			{ label: '手机号码', name: 'phone', index: 'phone', width: 20 }, 			
			//{ label: 'openid', name: 'openid', index: 'openid', width: 80 }, 			
			{ label: '创建时间', name: 'creattime', index: 'creattime', width: 20 }, 
			{ label: '用户状态', name: 'ustatus', width: 10, formatter: function(value, options, row){
				if(value === 1){
					return '<span>正常</span>';
				}
				if(value === 2){
					return '<span>禁用</span>';
				}
				if(value === null){
					return '<span></span>';
				}
			}},
			{ label: '认证状态', name: 'expertstatus', index: 'expertstatus', width: 20 ,formatter: function(value, options, row){
				if(value == 0){
					return '<span>未认证</span>';
				}
				if(value == 1){
					return '<span>认证中</span>';
				}
				if(value == 2){
					return '<span>已认证</span>';
				}
			}}, 
			//{ label: '更新时间', name: 'updatetime', index: 'updatetime', width: 80 }, 			
			//{ label: '真实姓名', name: 'realname', index: 'realname', width: 80 }, 			
			//{ label: '头像', name: 'headimg', index: 'headimg', width: 80 }, 			
			//{ label: '学历', name: 'grade', index: 'grade', width: 80 }, 			
			//{ label: '', name: 'integral', index: 'integral', width: 80 }, 			
			//{ label: '身份证号', name: 'idnumber', index: 'idnumber', width: 80 }, 			
			//{ label: '企业代码', name: 'entcode', index: 'entcode', width: 80 }, 			
			//{ label: '擅长', name: 'goodat', index: 'goodat', width: 80 }, 			
			//{ label: '资质', name: 'qualificationsurl', index: 'qualificationsurl', width: 80 }, 			
			//{ label: '身份证正面', name: 'inpositive', index: 'inpositive', width: 80 }, 			
			//{ label: '身份证反面', name: 'innegative', index: 'innegative', width: 80 }, 			
			//{ label: '地址', name: 'address', index: 'address', width: 80 }, 			
			//{ label: '职位', name: 'duties', index: 'duties', width: 80 }			
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
			loginname: null
		},
		showList: true,
		title: null,
		entuser: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.entuser = {};
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
			var url = vm.entuser.id == null ? "../entuser/save" : "../entuser/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.entuser),
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
				    url: "../entuser/delete",
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
			$.get("../entuser/info/"+id, function(r){
				if(r.entuser.utype == 1){
					//个人用户
					$("#realname").attr("style","display:none");
					//headimg
					//grade
					//integral
					$("#idnumber").attr("style","display:none");
					//sex
					$("#goodat").attr("style","display:none");
					$("#qualificationsurl").attr("style","display:none");
					//address
					//duties
					//expertstatus
				}else if(r.entuser.utype == 5){
					//企业用户
					$("#realname").attr("style","display:none");
					$("#idnumber").attr("style","display:none");
					//sex
					$("#goodat").attr("style","display:none");
					$("#qualificationsurl").attr("style","display:none");
				}else if(r.entuser.utype == 7){
					//专家用户
					$("#realname").removeAttr("style");
					$("#idnumber").removeAttr("style");
					//sex
					$("#goodat").removeAttr("style");
					$("#qualificationsurl").removeAttr("style");
				}
                vm.entuser = r.entuser;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'phone': vm.q.phone},
                page:page
            }).trigger("reloadGrid");
		},
		change1:function(event){
			$("#realname").attr("style","display:none");
			$("#idnumber").attr("style","display:none");
			$("#goodat").attr("style","display:none");
			$("#qualificationsurl").attr("style","display:none");
		},
		change2:function(event){
			$("#realname").attr("style","display:none");
			$("#idnumber").attr("style","display:none");
			$("#goodat").attr("style","display:none");
			$("#qualificationsurl").attr("style","display:none");
		},
		change3:function(event){
			$("#realname").removeAttr("style");
			$("#idnumber").removeAttr("style");
			$("#goodat").removeAttr("style");
			$("#qualificationsurl").removeAttr("style");
		},
		change4:function(event){
			$("#realname").removeAttr("style");
			$("#idnumber").removeAttr("style");
			$("#goodat").removeAttr("style");
			$("#qualificationsurl").removeAttr("style");
		}
	}
});