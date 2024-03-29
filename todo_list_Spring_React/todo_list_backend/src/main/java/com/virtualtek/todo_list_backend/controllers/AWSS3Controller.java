package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.vm.Asset;
import com.virtualtek.todo_list_backend.services.AWSS3Service;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.ion.SystemSymbols;

import java.util.HashMap;
import java.util.Map;

import static java.net.HttpURLConnection.HTTP_OK;

@RestController
@RequestMapping("api/s3/")
@CrossOrigin("https://virtualtek-todolist.azurewebsites.net/")
public class AWSS3Controller {
    private final AWSS3Service awss3Service;

    public AWSS3Controller(AWSS3Service awss3Service)
    {
        this.awss3Service=awss3Service;
    }

    @PostMapping("uploadFile")
    public Map<String, String> saveFile(@RequestParam MultipartFile file)
    {
        String key=awss3Service.putObject(file);

        Map<String,String> result=new HashMap<>();
        result.put("key",key);
        result.put("url",awss3Service.getObjectUrl(key));
        return result;
    }

    @GetMapping("downloadFile/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("fileName")String fileName)
    {
        HttpHeaders headers=new HttpHeaders();
        headers.add("Content-type", MediaType.ALL_VALUE);
        headers.add("Content-Disposition","attachment; filename="+fileName);
        byte[]bytes=awss3Service.downloadFile(fileName);
        return ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
    }

    @GetMapping("getFile/{key}")
    public ResponseEntity<ByteArrayResource> getFile(@PathVariable String key)
    {
        Asset asset=awss3Service.getObject(key);
        ByteArrayResource resource=new ByteArrayResource(asset.getContent());
        return  ResponseEntity
                .ok()
                .header("Content-Type",asset.getContentType())
                .contentLength(asset.getContent().length)
                .body(resource);
    }

    @DeleteMapping("deleteFile/{key}")
    public String deleteFile(@PathVariable String key)
    {
        System.out.println("key:");
        System.out.println(key);
        return awss3Service.deleteObject(key);
    }

    @GetMapping("getAllFiles")
    public ResponseEntity<ByteArrayResource> getObject(@RequestParam("fileName")String fileName)
    {
        Asset asset=awss3Service.getObject(fileName);
        ByteArrayResource resource=new ByteArrayResource(asset.getContent());
        return ResponseEntity
                        .ok()
                        .header("Content-Type",asset.getContentType())
                        .contentLength(asset.getContent().length)
                        .body(resource);

    }
}
