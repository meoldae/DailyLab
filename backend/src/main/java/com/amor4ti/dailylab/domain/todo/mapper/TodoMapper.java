package com.amor4ti.dailylab.domain.todo.mapper;

import com.amor4ti.dailylab.domain.todo.dto.response.TodoStatisticsDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    TodoStatisticsDto todoToTodoStatisticsDto(Long[] count, double percent);
}
