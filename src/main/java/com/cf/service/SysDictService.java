package com.cf.service;

import com.cf.entity.SysDictEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2017-11-16 09:21:39
 */
public interface SysDictService {
	
	SysDictEntity queryObject(Integer id);
	
	List<SysDictEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysDictEntity sysDict);
	
	void update(SysDictEntity sysDict);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
