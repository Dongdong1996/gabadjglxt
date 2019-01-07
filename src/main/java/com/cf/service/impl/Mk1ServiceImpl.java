package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.Mk1Dao;
import com.cf.entity.Mk1Entity;
import com.cf.service.Mk1Service;



@Service("mk1Service")
public class Mk1ServiceImpl implements Mk1Service {
	@Autowired
	private Mk1Dao mk1Dao;
	
	@Override
	public Mk1Entity queryObject(Integer 案件编号){
		return mk1Dao.queryObject(案件编号);
	}
	
	@Override
	public List<Mk1Entity> queryList(Map<String, Object> map){
		return mk1Dao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mk1Dao.queryTotal(map);
	}
	
	@Override
	public void save(Mk1Entity mk1){
		mk1Dao.save(mk1);
	}
	
	@Override
	public void update(Mk1Entity mk1){
		mk1Dao.update(mk1);
	}
	
	@Override
	public void delete(Integer 案件编号){
		mk1Dao.delete(案件编号);
	}
	
	@Override
	public void deleteBatch(Integer[] 案件编号s){
		mk1Dao.deleteBatch(案件编号s);
	}
	
}
