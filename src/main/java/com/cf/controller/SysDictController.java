package com.cf.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cf.entity.SysDictEntity;
import com.cf.service.SysDictService;
import com.cf.utils.PageUtils;
import com.cf.utils.Query;
import com.cf.utils.R;


/**
 * 
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2017-11-16 09:21:39
 */
@RestController
@RequestMapping("sysdict")
public class SysDictController {
	@Autowired
	private SysDictService sysDictService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sysdict:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<SysDictEntity> sysDictList = sysDictService.queryList(query);
		int total = sysDictService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(sysDictList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sysdict:info")
	public R info(@PathVariable("id") Integer id){
		SysDictEntity sysDict = sysDictService.queryObject(id);
		
		return R.ok().put("sysDict", sysDict);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping(value="/save",consumes = "application/json;charset=utf-8")
	@RequiresPermissions("sysdict:save")
	public R save(@RequestBody SysDictEntity sysDict){
		sysDict.setCreatetime(new Date());
		sysDictService.save(sysDict);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping(value="/update",consumes = "application/json;charset=utf-8")
	@RequiresPermissions("sysdict:update")
	public R update(@RequestBody SysDictEntity sysDict){
		sysDict.setCreatetime(new Date());
		sysDictService.update(sysDict);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sysdict:delete")
	public R delete(@RequestBody Integer[] ids){
		sysDictService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
