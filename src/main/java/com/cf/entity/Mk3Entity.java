package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 模块三 工作日志管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:17:24
 */
public class Mk3Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String 部门;
	//
	private String 姓名;
	//
	private String 岗位;
	//
	private Date 填写日期;
	//
	private String 来电登记;
	//
	private String 来访等级;
	//
	private String 外勤任务记录;

	/**
	 * 设置：
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：
	 */
	public void set部门(String 部门) {
		this.部门 = 部门;
	}
	/**
	 * 获取：
	 */
	public String get部门() {
		return 部门;
	}
	/**
	 * 设置：
	 */
	public void set姓名(String 姓名) {
		this.姓名 = 姓名;
	}
	/**
	 * 获取：
	 */
	public String get姓名() {
		return 姓名;
	}
	/**
	 * 设置：
	 */
	public void set岗位(String 岗位) {
		this.岗位 = 岗位;
	}
	/**
	 * 获取：
	 */
	public String get岗位() {
		return 岗位;
	}
	/**
	 * 设置：
	 */
	public void set填写日期(Date 填写日期) {
		this.填写日期 = 填写日期;
	}
	/**
	 * 获取：
	 */
	public Date get填写日期() {
		return 填写日期;
	}
	/**
	 * 设置：
	 */
	public void set来电登记(String 来电登记) {
		this.来电登记 = 来电登记;
	}
	/**
	 * 获取：
	 */
	public String get来电登记() {
		return 来电登记;
	}
	/**
	 * 设置：
	 */
	public void set来访等级(String 来访等级) {
		this.来访等级 = 来访等级;
	}
	/**
	 * 获取：
	 */
	public String get来访等级() {
		return 来访等级;
	}
	/**
	 * 设置：
	 */
	public void set外勤任务记录(String 外勤任务记录) {
		this.外勤任务记录 = 外勤任务记录;
	}
	/**
	 * 获取：
	 */
	public String get外勤任务记录() {
		return 外勤任务记录;
	}
}
