package com.cf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.cf.dao.SysDictDao;
import com.cf.entity.SysDictEntity;
import com.cf.service.SysDictService;



@Service("sysDictService")
public class SysDictServiceImpl implements SysDictService {
	@Autowired
	private SysDictDao sysDictDao;
	
	@Override
	public SysDictEntity queryObject(Integer id){
		return sysDictDao.queryObject(id);
	}
	
	@Override
	public List<SysDictEntity> queryList(Map<String, Object> map){
		return sysDictDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysDictDao.queryTotal(map);
	}
	
	@Override
	public void save(SysDictEntity sysDict){
		sysDictDao.save(sysDict);
	}
	
	@Override
	public void update(SysDictEntity sysDict){
		sysDictDao.update(sysDict);
	}
	
	@Override
	public void delete(Integer id){
		sysDictDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		sysDictDao.deleteBatch(ids);
	}
	
}
