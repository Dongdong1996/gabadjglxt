package com.cf.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Base64.Decoder;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cf.entity.Mk1Entity;
import com.cf.service.Mk1Service;
import com.cf.utils.PageUtils;
import com.cf.utils.Query;
import com.cf.utils.R;


/**
 * 模块1
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-29 21:28:41
 */
@RestController
@RequestMapping("/sys/mk1")
public class Mk1Controller {
	@Autowired
	private Mk1Service mk1Service;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:mk1:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<Mk1Entity> mk1List = mk1Service.queryList(query);
		int total = mk1Service.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(mk1List, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{案件编号}")
	@RequiresPermissions("sys:mk1:info")
	public R info(@PathVariable("案件编号") Integer 案件编号){
		Mk1Entity mk1 = mk1Service.queryObject(案件编号);
		
		return R.ok().put("mk1", mk1);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:mk1:save")
	public R save(@RequestBody Mk1Entity mk1){		
		String imgUrl = null;
		if(!StringUtils.isEmpty(mk1.getStrimg())){
			//获取base64编码
			String img = mk1.getStrimg();
			//截取base64编码
			String strImg = img.substring(img.indexOf(",")+1);
			//编写文件名
			String endurl = "file_"+new Date().getTime()+".jpg";
			//数据库中的存储字段
			imgUrl = "ajxg\\"+endurl;
			//上传图片 
			//GenerateImage(strImg, "D:\\Java\\tomcat-8.0.51\\webapps\\gabadjglxt\\upload\\ajxg\\"+endurl);
			GenerateImage(strImg, "/Users/wxdmbp/boom/apache-tomcat-8.5.30/webapps/gabadjglxt/upload/ajxg/"+endurl);
		}
		mk1.set案件相关照片(imgUrl);
		mk1Service.save(mk1);
		return R.ok();
	}
	/**
	 * base64位编码转图片
	 */
    public static boolean GenerateImage(String imgStr, String imgFilePath) {// 对字节数组字符串进行Base64解码并生成图片
        if (imgStr == null) // 图像数据为空
            return false;
        Decoder decoder = Base64.getDecoder();
        try {
            // Base64解码
            byte[] bytes = decoder.decode(imgStr);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            
            // 生成jpeg图片
            File file = new File(imgFilePath);
            if (!file.exists()) {
                file.createNewFile();
            }
            OutputStream out = new FileOutputStream(file);
            out.write(bytes);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:mk1:update")
	public R update(@RequestBody Mk1Entity mk1){
		mk1Service.update(mk1);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:mk1:delete")
	public R delete(@RequestBody Integer[] 案件编号s){
		mk1Service.deleteBatch(案件编号s);
		
		return R.ok();
	}
	
}
