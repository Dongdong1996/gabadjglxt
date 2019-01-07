package com.cf.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cf.entity.Mk3Entity;
import com.cf.service.Mk3Service;
import com.cf.utils.PageUtils;
import com.cf.utils.Query;
import com.cf.utils.R;


/**
 * 模块三 工作日志管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:17:24
 */
@RestController
@RequestMapping("/sys/mk3")
public class Mk3Controller {
	@Autowired
	private Mk3Service mk3Service;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:mk3:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<Mk3Entity> mk3List = mk3Service.queryList(query);
		int total = mk3Service.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(mk3List, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:mk3:info")
	public R info(@PathVariable("id") Integer id){
		Mk3Entity mk3 = mk3Service.queryObject(id);
		
		return R.ok().put("mk3", mk3);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:mk3:save")
	public R save(@RequestBody Mk3Entity mk3){
		mk3Service.save(mk3);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:mk3:update")
	public R update(@RequestBody Mk3Entity mk3){
		mk3Service.update(mk3);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:mk3:delete")
	public R delete(@RequestBody Integer[] ids){
		mk3Service.deleteBatch(ids);
		
		return R.ok();
	}
	
}
