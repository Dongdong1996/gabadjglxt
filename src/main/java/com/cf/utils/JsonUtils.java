package com.cf.utils;


import com.alibaba.fastjson.JSON;

public class JsonUtils {
	public static String ObjectToJsonString(Object obj) {
		return JSON.toJSONString(obj); 
	}
}
