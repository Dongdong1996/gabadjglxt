package com.cf.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Base64.Decoder;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cf.entity.Mk4Entity;
import com.cf.service.Mk4Service;
import com.cf.utils.PageUtils;
import com.cf.utils.Query;
import com.cf.utils.R;


/**
 * 模块四 物件管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 01:18:05
 */
@RestController
@RequestMapping("/sys/mk4")
public class Mk4Controller {
	@Autowired
	private Mk4Service mk4Service;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:mk4:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<Mk4Entity> mk4List = mk4Service.queryList(query);
		int total = mk4Service.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(mk4List, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:mk4:info")
	public R info(@PathVariable("id") Integer id){
		Mk4Entity mk4 = mk4Service.queryObject(id);
		
		return R.ok().put("mk4", mk4);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:mk4:save")
	public R save(@RequestBody Mk4Entity mk4){
		String imgUrl = null;
		if(!StringUtils.isEmpty(mk4.getStrimg())){
			//获取base64编码
			String img = mk4.getStrimg();
			//截取base64编码
			String strImg = img.substring(img.indexOf(",")+1);
			//编写文件名
			String endurl = "file_"+new Date().getTime()+".jpg";
			//数据库中的存储字段
			imgUrl = "wjzp\\"+endurl;
			//上传图片
			//GenerateImage(strImg, "D:\\Java\\tomcat-8.0.51\\webapps\\gabadjglxt\\upload\\wjzp\\"+endurl);
			GenerateImage(strImg, "/Users/wxdmbp/boom/apache-tomcat-8.5.30/webapps/gabadjglxt/upload/wjzp/"+endurl);
		}
		mk4.set物件照片(imgUrl);
		mk4Service.save(mk4);
		
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
	@RequiresPermissions("sys:mk4:update")
	public R update(@RequestBody Mk4Entity mk4){
		mk4Service.update(mk4);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:mk4:delete")
	public R delete(@RequestBody Integer[] ids){
		mk4Service.deleteBatch(ids);
		
		return R.ok();
	}
	
}
