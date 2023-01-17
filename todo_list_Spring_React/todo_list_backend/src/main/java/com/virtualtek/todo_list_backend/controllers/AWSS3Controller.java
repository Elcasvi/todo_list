package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.services.AWSS3Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static java.net.HttpURLConnection.HTTP_OK;

@RestController
@CrossOrigin("http://localhost:3000")
public class AWSS3Controller {
    private final AWSS3Service awss3Service;

    public AWSS3Controller(AWSS3Service awss3Service)
    {
        this.awss3Service=awss3Service;
    }

    @PostMapping("api/s3/saveFile")
    public String saveFile(@RequestParam("file")MultipartFile file)
    {
        System.out.println("Dentro de savefile");
        return awss3Service.saveFile(file);
    }
    @GetMapping("api/s3/getFile/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("fileName")String fileName)
    {
        HttpHeaders headers=new HttpHeaders();
        headers.add("Content-type", MediaType.ALL_VALUE);
        headers.add("Content-Disposition","attachment; filename="+fileName);
        byte[]bytes=awss3Service.downloadFile(fileName);
        return ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
    }
    @DeleteMapping("api/s3/deleteFile{fileName}")
    public String deleteFile(@PathVariable("fileName")String fileName)
    {
        return awss3Service.deleteFile(fileName);
    }
    @GetMapping("api/s3/getAllFiles")
    public List<String> getAllFiles()
    {
        return awss3Service.listAllFiles();
    }
}
