package com.cf.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * Created by wangshixiu on 2017/8/13.
 */
public class FileUtils {
	private static Logger LOG = LoggerFactory.getLogger(FileUtils.class);
    /**
     *
     * @param request
     * @return 通过前台传过来的id的数组来保存文件，返回id
     */
    public static List<FileInfo> fileupload(HttpServletRequest request,String uploadPath){
        List<FileInfo> fileInfos=new ArrayList<FileInfo>();
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(request.getSession().getServletContext());
        //检查form中是否有enctype="multipart/form-data"
        if(multipartResolver.isMultipart(request)){
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
            //获取multiRequest 中所有的文件名
            Iterator<String> iter=multiRequest.getFileNames();

            while(iter.hasNext()){
                //一次遍历所有文件
                String formFiledName=iter.next();
                List<MultipartFile> fileList=multiRequest.getFiles(formFiledName);
                
                if(null!= fileList && !fileList.isEmpty())
                    for(MultipartFile file:fileList){
                    	FileInfo fileInfo=new FileUtils().new FileInfo();
                    	fileInfo.setFormFiledName(formFiledName);
                    	fileInfo.setFileName(file.getOriginalFilename());
                    	fileInfo.setUploadPath(uploadPath);
                    	
                    	uploadToServer(file,fileInfo);
                    	fileInfo.setDbUploadPath("knowledge/standard/"+fileInfo.getFileName());
                        fileInfos.add(fileInfo);
                    }
                
            }
        }
        return fileInfos;
    }

    private static void uploadToServer(MultipartFile file,FileInfo fileInfo){
    	fileInfo.setRandomFileName(getRandomFileName(file.getOriginalFilename()));
    	//fileInfo.setFileAbsolutePath(fileInfo.getUploadPath()+File.separator+fileInfo.getRandomFileName());
    	fileInfo.setFileAbsolutePath(fileInfo.getUploadPath()+File.separator+fileInfo.getFileName());
    	LOG.info("fileInfo:{}",fileInfo);
    	File targetPath = new File(fileInfo.getUploadPath());
		if(!targetPath.exists() && !targetPath.isDirectory()){
			targetPath.mkdirs();
		}
		
		File targetFile = new File(fileInfo.getFileAbsolutePath());
		try {
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
    }

    public static String getRandomFileName(String fileName){
        String destFileName="";
        // 扩展名
        String ext = fileName.substring(fileName.lastIndexOf("."));
        // 重新命名
        final int randomLength = 4;
        destFileName=new Date().getTime()+RandomStringUtils.randomNumeric(randomLength) + ext;
        return destFileName;
    }

    public class FileInfo{
        private String formFiledName;
        private String fileName;
        private String fileAbsolutePath;
        private String randomFileName;
        private String uploadPath;
        private String dbUploadPath;
        public FileInfo(){}
        public FileInfo(String formFiledName,String fileName,String fileAbsolutePath){
            this.formFiledName=formFiledName;
            this.fileName=fileName;
            this.fileAbsolutePath=fileAbsolutePath;
        }
        public String getFormFiledName() {  return formFiledName; }
        public void setFormFiledName(String formFiledName) { this.formFiledName = formFiledName; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public String getFileAbsolutePath() { return fileAbsolutePath; }
        public void setFileAbsolutePath(String fileAbsolutePath) { this.fileAbsolutePath = fileAbsolutePath; }
		public String getRandomFileName() { return randomFileName; }
		public void setRandomFileName(String randomFileName) { this.randomFileName = randomFileName; }
		public String getUploadPath() { return uploadPath; }
		public void setUploadPath(String uploadPath) { this.uploadPath = uploadPath; }
		@Override
		public String toString() {
			return "FileInfo [formFiledName=" + formFiledName + ", fileName=" + fileName + ", fileAbsolutePath="
					+ fileAbsolutePath + ", randomFileName=" + randomFileName + ", uploadPath=" + uploadPath + "]";
		}
		public String getDbUploadPath() {
			return dbUploadPath;
		}
		public void setDbUploadPath(String dbUploadPath) {
			this.dbUploadPath = dbUploadPath;
		}
		
    }
}
