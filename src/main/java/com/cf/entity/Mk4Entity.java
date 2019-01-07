package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 模块四 物件管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:18:05
 */
public class Mk4Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String 物品名称;
	//
	private String 相关联案件;
	//
	private String 相关联犯人;
	//
	private String 查看记录;
	//
	private String 是否销毁;
	
	//头像
	private String 物件照片;
	
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
	public void set物品名称(String 物品名称) {
		this.物品名称 = 物品名称;
	}
	/**
	 * 获取：
	 */
	public String get物品名称() {
		return 物品名称;
	}
	/**
	 * 设置：
	 */
	public void set相关联案件(String 相关联案件) {
		this.相关联案件 = 相关联案件;
	}
	/**
	 * 获取：
	 */
	public String get相关联案件() {
		return 相关联案件;
	}
	/**
	 * 设置：
	 */
	public void set相关联犯人(String 相关联犯人) {
		this.相关联犯人 = 相关联犯人;
	}
	/**
	 * 获取：
	 */
	public String get相关联犯人() {
		return 相关联犯人;
	}
	/**
	 * 设置：
	 */
	public void set查看记录(String 查看记录) {
		this.查看记录 = 查看记录;
	}
	/**
	 * 获取：
	 */
	public String get查看记录() {
		return 查看记录;
	}
	/**
	 * 设置：
	 */
	public void set是否销毁(String 是否销毁) {
		this.是否销毁 = 是否销毁;
	}
	/**
	 * 获取：
	 */
	public String get是否销毁() {
		return 是否销毁;
	}
	public String get物件照片() {
		return 物件照片;
	}
	public void set物件照片(String 物件照片) {
		this.物件照片 = 物件照片;
	}
	public String getStrimg() {
		return strimg;
	}
	public void setStrimg(String strimg) {
		this.strimg = strimg;
	}
	
	
}
