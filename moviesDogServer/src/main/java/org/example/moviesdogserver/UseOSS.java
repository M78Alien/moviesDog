package org.example.moviesdogserver;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class UseOSS {
    //你自己的oss存储的地址
    private final String ENDPOINT="oss-cn-beijing.aliyuncs.com";
    //这两个密钥是用于身份认证
    private static final String ACCESSKEYID="LTAI5tHNQkQ9dSpV8GMp8kHy";
    private static final String ACCESSKEYSECRET="KBFl71TT5SqWLHiGT0SvrAHsEKUPZK";
    //存储空间的名字
    private static final String BUCKETNAME="alien-blog";
    //路径前缀
    private static final String URLPREFIX="http://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog";
    //创建一个oss的示例对象
    private OSS oss = new OSSClient(ENDPOINT, ACCESSKEYID, ACCESSKEYSECRET);
    //创建一个允许上传的格式
    private static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".png"};


}
