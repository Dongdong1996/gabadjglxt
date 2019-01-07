package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 模块二 暂住人员管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:16:20
 */
public class Mk22Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String 身份证号;
	//
	private String 姓名;
	//
	private Integer 联系电话;
	//
	private Date 截至日期;
	//
	private String 暂住处所;
	//
	private String 职业;
	//头像
	private String 头像;
	
	private String strimg;
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
	public void set身份证号(String 身份证号) {
		this.身份证号 = 身份证号;
	}
	/**
	 * 获取：
	 */
	public String get身份证号() {
		return 身份证号;
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
	public void set联系电话(Integer 联系电话) {
		this.联系电话 = 联系电话;
	}
	/**
	 * 获取：
	 */
	public Integer get联系电话() {
		return 联系电话;
	}
	/**
	 * 设置：
	 */
	public void set截至日期(Date 截至日期) {
		this.截至日期 = 截至日期;
	}
	/**
	 * 获取：
	 */
	public Date get截至日期() {
		return 截至日期;
	}
	/**
	 * 设置：
	 */
	public void set暂住处所(String 暂住处所) {
		this.暂住处所 = 暂住处所;
	}
	/**
	 * 获取：
	 */
	public String get暂住处所() {
		return 暂住处所;
	}
	/**
	 * 设置：
	 */
	public void set职业(String 职业) {
		this.职业 = 职业;
	}
	/**
	 * 获取：
	 */
	public String get职业() {
		return 职业;
	}
	public String get头像() {
		return 头像;
	}
	public void set头像(String 头像) {
		this.头像 = 头像;
	}
	public String getStrimg() {
		return strimg;
	}
	public void setStrimg(String strimg) {
		this.strimg = strimg;
	}
}
