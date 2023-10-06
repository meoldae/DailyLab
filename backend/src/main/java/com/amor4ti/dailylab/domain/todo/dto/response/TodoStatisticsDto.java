package com.amor4ti.dailylab.domain.todo.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class TodoStatisticsDto {
    private Long[] count;
    private double percent;
    private String mostCategory;
}
