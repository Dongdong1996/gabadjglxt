package com.cf.service;

import com.cf.entity.Mk21Entity;

import java.util.List;
import java.util.Map;

/**
 * 模块二 常住人员户籍管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 00:35:38
 */
public interface Mk21Service {
	
	Mk21Entity queryObject(Integer id);
	
	List<Mk21Entity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(Mk21Entity mk21);
	
	void update(Mk21Entity mk21);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
