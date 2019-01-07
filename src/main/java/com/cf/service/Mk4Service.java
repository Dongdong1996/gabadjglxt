package com.cf.service;

import com.cf.entity.Mk4Entity;

import java.util.List;
import java.util.Map;

/**
 * 模块四 物件管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:18:05
 */
public interface Mk4Service {
	
	Mk4Entity queryObject(Integer id);
	
	List<Mk4Entity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(Mk4Entity mk4);
	
	void update(Mk4Entity mk4);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
