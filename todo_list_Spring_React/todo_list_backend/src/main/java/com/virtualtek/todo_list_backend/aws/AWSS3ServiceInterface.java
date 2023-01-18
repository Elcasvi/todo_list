package com.virtualtek.todo_list_backend.aws;

import com.virtualtek.todo_list_backend.model.vm.Asset;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AWSS3ServiceInterface {
    String putObject(MultipartFile fileName);
    byte[] downloadFile(String fileName);
    Asset getObject(String key);
    String deleteObject(String fileName);
    String getObjectUrl(String fileName);
    List<String> listAllFiles();
}
