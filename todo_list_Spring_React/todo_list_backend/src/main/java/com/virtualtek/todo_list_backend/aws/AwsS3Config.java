package com.virtualtek.todo_list_backend.aws;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {
    @Value("${aws.acces_key_id}")
    private String acces_key_id;
    @Value("${aws.secret.acces_key}")
    private String aaccesSecretKey;
    @Value("${aws.s3.bucketRegion}")
    private String region;

    @Bean
    public AmazonS3 s3()
    {
        BasicAWSCredentials awsCredentials=new BasicAWSCredentials(acces_key_id,aaccesSecretKey);
        return AmazonS3ClientBuilder
                .standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
