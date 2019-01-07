package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.Mk21Dao;
import com.cf.entity.Mk21Entity;
import com.cf.service.Mk21Service;



@Service("mk21Service")
public class Mk21ServiceImpl implements Mk21Service {
	@Autowired
	private Mk21Dao mk21Dao;
	
	@Override
	public Mk21Entity queryObject(Integer id){
		return mk21Dao.queryObject(id);
	}
	
	@Override
	public List<Mk21Entity> queryList(Map<String, Object> map){
		return mk21Dao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mk21Dao.queryTotal(map);
	}
	
	@Override
	public void save(Mk21Entity mk21){
		mk21Dao.save(mk21);
	}
	
	@Override
	public void update(Mk21Entity mk21){
		mk21Dao.update(mk21);
	}
	
	@Override
	public void delete(Integer id){
		mk21Dao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		mk21Dao.deleteBatch(ids);
	}
	
}
