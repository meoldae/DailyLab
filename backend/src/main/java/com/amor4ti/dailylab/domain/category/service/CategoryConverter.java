package com.amor4ti.dailylab.domain.category.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CategoryConverter {

    public void addCategoryToResult(Map<String, Object> result, String large, String medium, String small, Long categoryId) {
        if (!result.containsKey("large")) {
            result.put("large", new ArrayList<>());
        }

        List<Map<String, Object>> largeList = (List<Map<String, Object>>) result.get("large");
        Map<String, Object> largeMap = getOrCreateLargeMap(largeList, large);

        if (!largeMap.containsKey("medium")) {
            largeMap.put("medium", new ArrayList<>());
        }

        List<Map<String, Object>> mediumList = (List<Map<String, Object>>) largeMap.get("medium");
        Map<String, Object> mediumMap = getOrCreateMediumMap(mediumList, medium);

        if (!mediumMap.containsKey("small")) {
            mediumMap.put("small", new ArrayList<>());
        }

        List<Map<String, Object>> smallList = (List<Map<String, Object>>) mediumMap.get("small");

        Map<String, Object> smallMap = new HashMap<>();
        smallMap.put("name", small);
        smallMap.put("categoryId", categoryId);

        smallList.add(smallMap);
    }

    public Map<String, Object> getOrCreateLargeMap(List<Map<java.lang.String, java.lang.Object>> largeList, java.lang.String large) {
        for (Map<java.lang.String, java.lang.Object> largeMap : largeList) {
            if (largeMap.get("name").equals(large)) {
                return largeMap;
            }
        }

        Map<java.lang.String, java.lang.Object> newLargeMap = new HashMap<>();
        newLargeMap.put("name", large);
        largeList.add(newLargeMap);

        return newLargeMap;
    }

    public Map<String, Object> getOrCreateMediumMap(List<Map<String, Object>> mediumList, String medium) {
        for (Map<String, Object> mediumMap : mediumList) {
            if (mediumMap.get("name").equals(medium)) {
                return mediumMap;
            }
        }

        Map<String, Object> newMediumMap = new HashMap<>();
        newMediumMap.put("name", medium);
        mediumList.add(newMediumMap);

        return newMediumMap;
    }
}
