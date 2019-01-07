package com.cf.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cf.utils.FileUtils;
import com.cf.utils.R;
import com.cf.utils.annotation.IgnoreAuth;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * API文件上传
 *
 */
@RestController
@RequestMapping("/api")
@Api("ApiUploadController")
public class ApiUploadController {
	private static Logger LOG = LoggerFactory.getLogger(ApiUploadController.class);
    
	@Value("${upload.file}")
	private String uploadPath;
    /**
     * 文件上传
     */
    @IgnoreAuth
    @PostMapping("upload")
    @ApiOperation(value = "上传",notes = "上传说明")
    public R upload(HttpServletRequest request,MultipartFile file){
        LOG.info("upload file start,uploadPath:{}",uploadPath);
        List<FileUtils.FileInfo> fileInfos= FileUtils.fileupload(request,uploadPath);
        LOG.info("upload fileInfo:{}",fileInfos);
        return R.ok("上传成功",fileInfos);
    }

}
