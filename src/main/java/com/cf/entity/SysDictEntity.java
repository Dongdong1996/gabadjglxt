package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2017-11-16 09:21:39
 */
public class SysDictEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//id
	private Integer id;
	//key值
	private String key;
	//value值
	private String value;
	//创建时间
	private Date createtime;
	//注释说明
	private String notes;

	/**
	 * 设置：id
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：id
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：key值
	 */
	public void setKey(String key) {
		this.key = key;
	}
	/**
	 * 获取：key值
	 */
	public String getKey() {
		return key;
	}
	/**
	 * 设置：value值
	 */
	public void setValue(String value) {
		this.value = value;
	}
	/**
	 * 获取：value值
	 */
	public String getValue() {
		return value;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreatetime() {
		return createtime;
	}
	/**
	 * 设置：注释说明
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
	/**
	 * 获取：注释说明
	 */
	public String getNotes() {
		return notes;
	}
}
