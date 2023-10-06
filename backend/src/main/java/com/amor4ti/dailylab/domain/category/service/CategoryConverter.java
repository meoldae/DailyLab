package com.amor4ti.dailylab.domain.category.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CategoryConverter {

    public void addCategoryToResult(Map<String, Object> result, String large, String medium, String small, Long categoryId) {
        addToList(result, "list", large, medium, small, categoryId);
    }

    private void addToList(Map<String, Object> result, String key, String large, String medium, String small, Long categoryId) {
        if (!result.containsKey(key)) {
            result.put(key, new ArrayList<>());
        }

        List<Map<String, Object>> largeList = (List<Map<String, Object>>) result.get(key);
        Map<String, Object> largeMap = getOrCreateMap(largeList, large);

        if (!largeMap.containsKey(key)) {
            largeMap.put(key, new ArrayList<>());
        }

        List<Map<String, Object>> mediumList = (List<Map<String, Object>>) largeMap.get(key);
        Map<String, Object> mediumMap = getOrCreateMap(mediumList, medium);

        if (!mediumMap.containsKey(key)) {
            mediumMap.put(key, new ArrayList<>());
        }

        List<Map<String, Object>> smallList = (List<Map<String, Object>>) mediumMap.get(key);

        Map<String, Object> smallMap = new HashMap<>();
        smallMap.put("name", small);
        smallMap.put("categoryId", categoryId);

        smallList.add(smallMap);
    }

    private Map<String, Object> getOrCreateMap(List<Map<String, Object>> list, String name) {
        for (Map<String, Object> map : list) {
            if (map.get("name").equals(name)) {
                return map;
            }
        }

        Map<String, Object> newMap = new HashMap<>();
        newMap.put("name", name);
        list.add(newMap);

        return newMap;
    }
}

