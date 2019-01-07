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

import com.cf.entity.Mk21Entity;
import com.cf.service.Mk21Service;
import com.cf.utils.PageUtils;
import com.cf.utils.Query;
import com.cf.utils.R;


/**
 * 模块二 常住人员户籍管理
 * 
 * @author zhangyg
 * @email 22539134@qq.com
 * @date 2018-04-30 00:35:38
 */
@RestController
@RequestMapping("/sys/mk21")
public class Mk21Controller {
	@Autowired
	private Mk21Service mk21Service;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:mk21:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<Mk21Entity> mk21List = mk21Service.queryList(query);
		int total = mk21Service.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(mk21List, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:mk21:info")
	public R info(@PathVariable("id") Integer id){
		Mk21Entity mk21 = mk21Service.queryObject(id);
		
		return R.ok().put("mk21", mk21);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:mk21:save")
	public R save(@RequestBody Mk21Entity mk21){
		String imgUrl = null;
		if(!StringUtils.isEmpty(mk21.getStrimg())){
			//获取base64编码
			String img = mk21.getStrimg();
			//截取base64编码
			String strImg = img.substring(img.indexOf(",")+1);
			//编写文件名
			String endurl = "file_"+new Date().getTime()+".jpg";
			//数据库中的存储字段
			imgUrl = "czrk\\"+endurl;
			//上传图片
			//GenerateImage(strImg, "D:\\Java\\tomcat-8.0.51\\webapps\\gabadjglxt\\upload\\czrk\\"+endurl);
			GenerateImage(strImg, "/Users/wxdmbp/boom/apache-tomcat-8.5.30/webapps/gabadjglxt/upload/czrk/"+endurl);
		}
		mk21.set头像(imgUrl);
		mk21Service.save(mk21);
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
	@RequiresPermissions("sys:mk21:update")
	public R update(@RequestBody Mk21Entity mk21){
		mk21Service.update(mk21);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:mk21:delete")
	public R delete(@RequestBody Integer[] ids){
		mk21Service.deleteBatch(ids);
		
		return R.ok();
	}
	
}
