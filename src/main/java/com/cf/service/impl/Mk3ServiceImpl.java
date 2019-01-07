package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.Mk3Dao;
import com.cf.entity.Mk3Entity;
import com.cf.service.Mk3Service;



@Service("mk3Service")
public class Mk3ServiceImpl implements Mk3Service {
	@Autowired
	private Mk3Dao mk3Dao;
	
	@Override
	public Mk3Entity queryObject(Integer id){
		return mk3Dao.queryObject(id);
	}
	
	@Override
	public List<Mk3Entity> queryList(Map<String, Object> map){
		return mk3Dao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mk3Dao.queryTotal(map);
	}
	
	@Override
	public void save(Mk3Entity mk3){
		mk3Dao.save(mk3);
	}
	
	@Override
	public void update(Mk3Entity mk3){
		mk3Dao.update(mk3);
	}
	
	@Override
	public void delete(Integer id){
		mk3Dao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		mk3Dao.deleteBatch(ids);
	}
	
}
