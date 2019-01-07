package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 模块1
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-29 21:28:41
 */
public class Mk1Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer 案件编号;
	//
	private Date 案件时间;
	//案件发生地点
	private String 案件地点;
	//
	private String 案件任务执行情况;
	//
	private String 案件相关嫌疑人;
	//案件日志  留大空
	private String 案件进展情况;
	
	//案件相关照片
	private String 案件相关照片;
	
	private String strimg;

	/**
	 * 设置：
	 */
	public void set案件编号(Integer 案件编号) {
		this.案件编号 = 案件编号;
	}
	/**
	 * 获取：
	 */
	public Integer get案件编号() {
		return 案件编号;
	}
	/**
	 * 设置：
	 */
	public void set案件时间(Date 案件时间) {
		this.案件时间 = 案件时间;
	}
	/**
	 * 获取：
	 */
	public Date get案件时间() {
		return 案件时间;
	}
	/**
	 * 设置：案件发生地点
	 */
	public void set案件地点(String 案件地点) {
		this.案件地点 = 案件地点;
	}
	/**
	 * 获取：案件发生地点
	 */
	public String get案件地点() {
		return 案件地点;
	}
	/**
	 * 设置：
	 */
	public void set案件任务执行情况(String 案件任务执行情况) {
		this.案件任务执行情况 = 案件任务执行情况;
	}
	/**
	 * 获取：
	 */
	public String get案件任务执行情况() {
		return 案件任务执行情况;
	}
	/**
	 * 设置：
	 */
	public void set案件相关嫌疑人(String 案件相关嫌疑人) {
		this.案件相关嫌疑人 = 案件相关嫌疑人;
	}
	/**
	 * 获取：
	 */
	public String get案件相关嫌疑人() {
		return 案件相关嫌疑人;
	}
	/**
	 * 设置：案件日志  留大空
	 */
	public void set案件进展情况(String 案件进展情况) {
		this.案件进展情况 = 案件进展情况;
	}
	/**
	 * 获取：案件日志  留大空
	 */
	public String get案件进展情况() {
		return 案件进展情况;
	}
	public String get案件相关照片() {
		return 案件相关照片;
	}
	public void set案件相关照片(String 案件相关照片) {
		this.案件相关照片 = 案件相关照片;
	}
	public String getStrimg() {
		return strimg;
	}
	public void setStrimg(String strimg) {
		this.strimg = strimg;
	}
	
	
	
}
