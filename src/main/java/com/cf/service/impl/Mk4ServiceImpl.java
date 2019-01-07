package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.Mk4Dao;
import com.cf.entity.Mk4Entity;
import com.cf.service.Mk4Service;



@Service("mk4Service")
public class Mk4ServiceImpl implements Mk4Service {
	@Autowired
	private Mk4Dao mk4Dao;
	
	@Override
	public Mk4Entity queryObject(Integer id){
		return mk4Dao.queryObject(id);
	}
	
	@Override
	public List<Mk4Entity> queryList(Map<String, Object> map){
		return mk4Dao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mk4Dao.queryTotal(map);
	}
	
	@Override
	public void save(Mk4Entity mk4){
		mk4Dao.save(mk4);
	}
	
	@Override
	public void update(Mk4Entity mk4){
		mk4Dao.update(mk4);
	}
	
	@Override
	public void delete(Integer id){
		mk4Dao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		mk4Dao.deleteBatch(ids);
	}
	
}
