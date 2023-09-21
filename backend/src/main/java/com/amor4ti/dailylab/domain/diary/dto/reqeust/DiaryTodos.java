package com.amor4ti.dailylab.domain.diary.dto.reqeust;

import com.amor4ti.dailylab.domain.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class DiaryTodos {
    private String task;
    private String content;
    private LocalDateTime date;

}
