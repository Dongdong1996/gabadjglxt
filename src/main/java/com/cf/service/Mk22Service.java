package com.cf.service;

import com.cf.entity.Mk22Entity;

import java.util.List;
import java.util.Map;

/**
 * 模块二 暂住人员管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:16:20
 */
public interface Mk22Service {
	
	Mk22Entity queryObject(Integer id);
	
	List<Mk22Entity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(Mk22Entity mk22);
	
	void update(Mk22Entity mk22);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
