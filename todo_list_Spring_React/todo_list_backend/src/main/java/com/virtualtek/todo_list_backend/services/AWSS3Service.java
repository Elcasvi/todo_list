package com.virtualtek.todo_list_backend.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.virtualtek.todo_list_backend.aws.AWSS3ServiceInterface;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class AWSS3Service implements AWSS3ServiceInterface {
    @Value("${aws.s3.bucketName}")
    private String bucketName;
    private final AmazonS3 s3;

    public AWSS3Service(AmazonS3 s3)
    {
        this.s3=s3;
    }

    @Override
    public String saveFile(MultipartFile fileName) {
        String originalFileName= fileName.getOriginalFilename();
        try
        {
            File file1=convertMultiPartToFile(fileName);
            PutObjectResult putObjectResult =s3.putObject(bucketName,originalFileName,file1);
            return putObjectResult.getContentMd5();
        }
        catch(IOException exception)
        {
            throw new RuntimeException(exception);
        }

    }

    @Override
    public byte[] downloadFile(String fileName) {

        S3Object s3Object=s3.getObject(bucketName,fileName);
        S3ObjectInputStream objectContent=s3Object.getObjectContent();
        try {
            return IOUtils.toByteArray(objectContent);
        }
        catch(IOException exception)
        {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public String deleteFile(String fileName) {
        s3.deleteObject(bucketName,fileName);
        return "File deleted";
    }

    @Override
    public List<String> listAllFiles() {
        ListObjectsV2Result listObjectsV2Result= s3.listObjectsV2(bucketName);
        return listObjectsV2Result.getObjectSummaries().stream().map(object->object.getKey()).collect(Collectors.toList());
    }

    private File convertMultiPartToFile(MultipartFile file)throws IOException
    {
        File convFile=new File(file.getOriginalFilename());
        FileOutputStream fos=new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
