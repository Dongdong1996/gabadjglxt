package com.cf.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 模块二 常住人员户籍管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 00:55:38
 */
public class Mk21Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	//
	private Integer id;
	//
	private String 身份证号;
	//
	private String 姓名;
	//
	private String 性别;
	//
	private Date 出生日期;
	//
	private String 出生地;
	//
	private String 民族;
	//
	private String 籍贯;
	//
	private String 本市或县地址;
	//
	private String 宗教信仰;
	//
	private Integer 身高;
	//
	private String 血型;
	//
	private String 文化程度;
	//
	private String 兵役状况;
	//
	private String 服务处所;
	//
	private String 职业;
	//
	private Date 何时由何地迁来本市或县;
	//
	private String 何时由何地迁来本址;
	//
	private String 登记派出所;
	//
	private Date 登记日期;
	
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
	public void set性别(String 性别) {
		this.性别 = 性别;
	}
	/**
	 * 获取：
	 */
	public String get性别() {
		return 性别;
	}
	/**
	 * 设置：
	 */
	public void set出生日期(Date 出生日期) {
		this.出生日期 = 出生日期;
	}
	/**
	 * 获取：
	 */
	public Date get出生日期() {
		return 出生日期;
	}
	/**
	 * 设置：
	 */
	public void set出生地(String 出生地) {
		this.出生地 = 出生地;
	}
	/**
	 * 获取：
	 */
	public String get出生地() {
		return 出生地;
	}
	/**
	 * 设置：
	 */
	public void set民族(String 民族) {
		this.民族 = 民族;
	}
	/**
	 * 获取：
	 */
	public String get民族() {
		return 民族;
	}
	/**
	 * 设置：
	 */
	public void set籍贯(String 籍贯) {
		this.籍贯 = 籍贯;
	}
	/**
	 * 获取：
	 */
	public String get籍贯() {
		return 籍贯;
	}
	/**
	 * 设置：
	 */
	public void set本市或县地址(String 本市或县地址) {
		this.本市或县地址 = 本市或县地址;
	}
	/**
	 * 获取：
	 */
	public String get本市或县地址() {
		return 本市或县地址;
	}
	/**
	 * 设置：
	 */
	public void set宗教信仰(String 宗教信仰) {
		this.宗教信仰 = 宗教信仰;
	}
	/**
	 * 获取：
	 */
	public String get宗教信仰() {
		return 宗教信仰;
	}
	/**
	 * 设置：
	 */
	public void set身高(Integer 身高) {
		this.身高 = 身高;
	}
	/**
	 * 获取：
	 */
	public Integer get身高() {
		return 身高;
	}
	/**
	 * 设置：
	 */
	public void set血型(String 血型) {
		this.血型 = 血型;
	}
	/**
	 * 获取：
	 */
	public String get血型() {
		return 血型;
	}
	/**
	 * 设置：
	 */
	public void set文化程度(String 文化程度) {
		this.文化程度 = 文化程度;
	}
	/**
	 * 获取：
	 */
	public String get文化程度() {
		return 文化程度;
	}
	/**
	 * 设置：
	 */
	public void set兵役状况(String 兵役状况) {
		this.兵役状况 = 兵役状况;
	}
	/**
	 * 获取：
	 */
	public String get兵役状况() {
		return 兵役状况;
	}
	/**
	 * 设置：
	 */
	public void set服务处所(String 服务处所) {
		this.服务处所 = 服务处所;
	}
	/**
	 * 获取：
	 */
	public String get服务处所() {
		return 服务处所;
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
	/**
	 * 设置：
	 */
	public void set何时由何地迁来本市或县(Date 何时由何地迁来本市或县) {
		this.何时由何地迁来本市或县 = 何时由何地迁来本市或县;
	}
	/**
	 * 获取：
	 */
	public Date get何时由何地迁来本市或县() {
		return 何时由何地迁来本市或县;
	}
	/**
	 * 设置：
	 */
	public void set何时由何地迁来本址(String 何时由何地迁来本址) {
		this.何时由何地迁来本址 = 何时由何地迁来本址;
	}
	/**
	 * 获取：
	 */
	public String get何时由何地迁来本址() {
		return 何时由何地迁来本址;
	}
	/**
	 * 设置：
	 */
	public void set登记派出所(String 登记派出所) {
		this.登记派出所 = 登记派出所;
	}
	/**
	 * 获取：
	 */
	public String get登记派出所() {
		return 登记派出所;
	}
	/**
	 * 设置：
	 */
	public void set登记日期(Date 登记日期) {
		this.登记日期 = 登记日期;
	}
	/**
	 * 获取：
	 */
	public Date get登记日期() {
		return 登记日期;
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
