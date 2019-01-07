package com.cf.service;

import com.cf.entity.Mk3Entity;

import java.util.List;
import java.util.Map;

/**
 * 模块三 工作日志管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:17:24
 */
public interface Mk3Service {
	
	Mk3Entity queryObject(Integer id);
	
	List<Mk3Entity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(Mk3Entity mk3);
	
	void update(Mk3Entity mk3);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
