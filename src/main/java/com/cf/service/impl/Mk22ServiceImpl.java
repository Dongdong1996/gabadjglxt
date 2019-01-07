package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.Mk22Dao;
import com.cf.entity.Mk22Entity;
import com.cf.service.Mk22Service;



@Service("mk22Service")
public class Mk22ServiceImpl implements Mk22Service {
	@Autowired
	private Mk22Dao mk22Dao;
	
	@Override
	public Mk22Entity queryObject(Integer id){
		return mk22Dao.queryObject(id);
	}
	
	@Override
	public List<Mk22Entity> queryList(Map<String, Object> map){
		return mk22Dao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mk22Dao.queryTotal(map);
	}
	
	@Override
	public void save(Mk22Entity mk22){
		mk22Dao.save(mk22);
	}
	
	@Override
	public void update(Mk22Entity mk22){
		mk22Dao.update(mk22);
	}
	
	@Override
	public void delete(Integer id){
		mk22Dao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		mk22Dao.deleteBatch(ids);
	}
	
}
