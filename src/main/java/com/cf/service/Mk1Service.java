package com.cf.service;

import com.cf.entity.Mk1Entity;

import java.util.List;
import java.util.Map;

/**
 * 模块1
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-29 21:28:41
 */
public interface Mk1Service {
	
	Mk1Entity queryObject(Integer 案件编号);
	
	List<Mk1Entity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(Mk1Entity mk1);
	
	void update(Mk1Entity mk1);
	
	void delete(Integer 案件编号);
	
	void deleteBatch(Integer[] 案件编号s);
}
