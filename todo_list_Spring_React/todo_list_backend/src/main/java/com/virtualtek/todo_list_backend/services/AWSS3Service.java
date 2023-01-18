package com.virtualtek.todo_list_backend.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.virtualtek.todo_list_backend.aws.AWSS3ServiceInterface;
import com.virtualtek.todo_list_backend.model.vm.Asset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
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
    public String putObject(MultipartFile file) {
        String extension= StringUtils.getFilenameExtension(file.getOriginalFilename());
        String key=String.format("%s.%s", UUID.randomUUID(),extension);

        ObjectMetadata objectMetadata=new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        try
        {
            PutObjectRequest putObjectRequest =new PutObjectRequest(bucketName,key,file.getInputStream(),objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);

            s3.putObject(putObjectRequest);
            return key;
        }
        catch(IOException exception)
        {
            throw new RuntimeException(exception);
        }

    }

    @Override
    public Asset getObject(String key) {
        S3Object s3Object=s3.getObject(bucketName,key);
        ObjectMetadata metadata=s3Object.getObjectMetadata();
        try
        {
            S3ObjectInputStream inputStream=s3Object.getObjectContent();
            byte[]bytes=IOUtils.toByteArray(inputStream);
            return new Asset(bytes,metadata.getContentType());
        }
        catch (IOException exception)
        {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public String deleteObject(String key) {
        s3.deleteObject(bucketName,key);
        return "File deleted";
    }
    @Override
    public String getObjectUrl(String key)
    {
        return String.format("https://%s.s3.amazonaws.com/%s",bucketName,key);
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
