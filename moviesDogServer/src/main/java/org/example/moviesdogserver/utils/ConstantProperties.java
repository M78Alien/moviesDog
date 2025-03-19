package org.example.moviesdogserver.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Component
public class ConstantProperties implements InitializingBean {

    //读取配置文件
    @Value("${aliyun.oss.file.endpoint}")
    private String endpoint;

    @Value("${aliyun.oss.file.keyid}")
    private String keyid;

    @Value("${aliyun.oss.file.keysecret}")
    private String keysecret;

    @Value("${aliyun.oss.file.buketname}")
    private String buketname;


    //定义公开的静态的常量
    public static String END_POINT;

    public static String KEY_ID;

    public static String KEY_SECRET;

    public static String BUKET_NAME;

    //在 这个重写方法中 设置常量 别的类中进行调用
    @Override
    public void afterPropertiesSet() throws Exception {
        END_POINT=endpoint;
        KEY_ID=keyid;
        KEY_SECRET=keysecret;
        BUKET_NAME=buketname;
    }

    public String upload(MultipartFile multipartFile) throws IOException {
        // 获取上传文件的输入流
        InputStream inputStream = multipartFile.getInputStream();
        // 避免文件覆盖，生成随机文件名
        String originalFilename = multipartFile.getOriginalFilename();
        String fileName = "moviesDog/" + UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));

        // 创建OSSClient实例
        OSS ossClient = new OSSClientBuilder().build(endpoint, keyid, keysecret);
        // 上传文件
        ossClient.putObject(buketname, fileName, inputStream);
        // 文件访问路径
        String url = endpoint.split("//")[0] + "//" + buketname + "." + endpoint.split("//")[1] + "/" + fileName;
        // 关闭OSSClient
        ossClient.shutdown();
        return url;
    }
}